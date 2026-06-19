import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // PostgreSQL Connection Pool Setup
  const connectionString = process.env.VITE_POSTGRES_URL;
  if (!connectionString) {
    console.warn("ADVERTENCIA: No se detectó VITE_POSTGRES_URL en las variables de entorno.");
  }

  const pool = new Pool({
    connectionString,
    ssl: {
      rejectUnauthorized: false
    }
  });

  // API Route - Fetch real-time records from PostgreSQL "album" table
  app.get("/api/albums", async (req, res) => {
    try {
      const dbClient = await pool.connect();
      try {
        // Query requested fields: album_id, title, artist_id
        const queryText = "SELECT album_id, title, artist_id FROM album ORDER BY album_id ASC LIMIT 20;";
        const result = await dbClient.query(queryText);
        res.json({
          success: true,
          count: result.rowCount,
          data: result.rows
        });
      } finally {
        dbClient.release();
      }
    } catch (err: any) {
      console.error("Error al consultar la base de datos PostgreSQL:", err);
      res.status(500).json({
        success: false,
        error: err.message || "Error al conectar y obtener datos de la base de datos PostgreSQL."
      });
    }
  });

  // Serve static files / Vite middleware
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[MusicStore Server] Listo y escuchando en http://0.0.0.0:${PORT}`);
  });
}

startServer();
