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
  const connectionString = process.env.VITE_POSTGRES_URL || process.env.DATABASE_URL;
  if (!connectionString) {
    console.warn("ADVERTENCIA: No se detectó VITE_POSTGRES_URL en las variables de entorno.");
  }

  const pool = new Pool({
    connectionString,
    ssl: {
      rejectUnauthorized: false
    }
  });

  const coverImages = [
    'https://images.unsplash.com/photo-1614680376593-902f74fa0d41?w=500&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=500&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=500&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=500&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1484876065684-b683cf17d276?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=800&auto=format&fit=crop&q=80'
  ];

  const genres = ['Rock', 'Jazz', 'Metal', 'Latin', 'Pop', 'Classical', 'Blues', 'Salsa', 'Reggaeton'];
  const countries = ['Perú', 'Chile', 'México', 'Argentina', 'Colombia'];

  // API Route - Get Albums (Chinook fully joined with Artists and Tracks)
  app.get("/api/albums", async (req, res) => {
    try {
      const dbClient = await pool.connect();
      try {
        // 1. Fetch albums and artists query
        const albumsResult = await dbClient.query(`
          SELECT 
            al.album_id, 
            al.title, 
            al.artist_id, 
            ar.name AS artist_name 
          FROM album al 
          LEFT JOIN artist ar ON al.artist_id = ar.artist_id 
          ORDER BY al.album_id ASC 
          LIMIT 35;
        `);

        if (albumsResult.rowCount === 0) {
          return res.json({ success: true, count: 0, data: [] });
        }

        const albumIds = albumsResult.rows.map((a: any) => a.album_id);

        // 2. Fetch tracks for these albums
        const tracksResult = await dbClient.query(`
          SELECT 
            t.track_id, 
            t.name AS title, 
            t.album_id, 
            t.milliseconds, 
            t.unit_price, 
            g.name AS genre_name
          FROM track t
          LEFT JOIN genre g ON t.genre_id = g.genre_id
          WHERE t.album_id = ANY($1)
          ORDER BY t.track_id ASC;
        `, [albumIds]);

        // 3. Group tracks by album_id
        const tracksByAlbum: Record<string, any[]> = {};
        tracksResult.rows.forEach((row: any) => {
          const albId = String(row.album_id);
          if (!tracksByAlbum[albId]) {
            tracksByAlbum[albId] = [];
          }
          
          const totalSeconds = Math.floor((row.milliseconds || 0) / 1000);
          const minutes = Math.floor(totalSeconds / 60);
          const seconds = totalSeconds % 60;
          const durationStr = `${minutes}:${seconds.toString().padStart(2, '0')}`;
          
          tracksByAlbum[albId].push({
            id: String(row.track_id),
            title: row.title || 'Tema Sin Título',
            artist: '', // populated below
            duration: durationStr,
            price: Number(row.unit_price) || 0.99,
            genre: row.genre_name || 'Rock'
          });
        });

        // 4. Construct complete Album objects matching types.ts
        const formattedAlbums = albumsResult.rows.map((alb: any) => {
          const idNum = Number(alb.album_id) || 1;
          const artistName = alb.artist_name || `Artist #${alb.artist_id}`;
          const albIdStr = String(alb.album_id);
          
          const albumTracks = (tracksByAlbum[albIdStr] || []).map(tr => ({
            ...tr,
            artist: artistName
          }));

          const mainGenre = albumTracks.length > 0 && albumTracks[0].genre 
            ? albumTracks[0].genre 
            : genres[idNum % genres.length];

          const calculatedPrice = albumTracks.length > 0 
            ? Math.min(24.99, Number((albumTracks.reduce((sum, t) => sum + t.price, 0) * 0.75).toFixed(2)))
            : Number((9.99 + (idNum % 16)).toFixed(2));

          return {
            id: albIdStr,
            title: alb.title || 'Álbum Sin Título',
            artist: artistName,
            year: 1970 + (idNum % 54),
            genre: mainGenre,
            price: calculatedPrice || 14.99,
            coverUrl: coverImages[idNum % coverImages.length],
            country: countries[idNum % countries.length],
            isTrending: idNum % 6 === 0,
            tracks: albumTracks
          };
        });

        res.json({
          success: true,
          count: formattedAlbums.length,
          data: formattedAlbums
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

  // API Route - Get Artists
  app.get("/api/artists", async (req, res) => {
    try {
      const dbClient = await pool.connect();
      try {
        const result = await dbClient.query("SELECT artist_id, name FROM artist ORDER BY artist_id ASC LIMIT 50;");
        res.json({
          success: true,
          count: result.rowCount,
          data: result.rows
        });
      } finally {
        dbClient.release();
      }
    } catch (err: any) {
      console.error("Error al consultar artistas:", err);
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // API Route - Get Tracks
  app.get("/api/tracks", async (req, res) => {
    try {
      const dbClient = await pool.connect();
      try {
        const result = await dbClient.query(`
          SELECT 
            t.track_id, 
            t.name AS title, 
            ar.name AS artist, 
            t.milliseconds, 
            t.unit_price AS price, 
            al.title AS album_title 
          FROM track t 
          LEFT JOIN album al ON t.album_id = al.album_id 
          LEFT JOIN artist ar ON al.artist_id = ar.artist_id 
          ORDER BY t.track_id ASC 
          LIMIT 100;
        `);

        const formattedTracks = result.rows.map((t: any) => {
          const totalSeconds = Math.floor((t.milliseconds || 0) / 1000);
          const minutes = Math.floor(totalSeconds / 60);
          const seconds = totalSeconds % 60;
          const durationStr = `${minutes}:${seconds.toString().padStart(2, '0')}`;
          
          return {
            id: String(t.track_id),
            title: t.title || 'Tema Sin Título',
            artist: t.artist || 'Artista Desconocido',
            duration: durationStr,
            price: Number(t.price) || 0.99,
            albumTitle: t.album_title || 'Álbum Desconocido'
          };
        });

        res.json({
          success: true,
          count: formattedTracks.length,
          data: formattedTracks
        });
      } finally {
        dbClient.release();
      }
    } catch (err: any) {
      console.error("Error al consultar canciones:", err);
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // API Route - Get Clients (Customers with aggregated spending)
  app.get("/api/clients", async (req, res) => {
    try {
      const dbClient = await pool.connect();
      try {
        const result = await dbClient.query(`
          SELECT 
            c.customer_id, 
            c.first_name, 
            c.last_name, 
            c.email, 
            c.country, 
            c.phone, 
            COALESCE(SUM(i.total), 0) as total_spent
          FROM customer c 
          LEFT JOIN invoice i ON c.customer_id = i.customer_id 
          GROUP BY c.customer_id, c.first_name, c.last_name, c.email, c.country, c.phone
          ORDER BY total_spent DESC, c.customer_id ASC
          LIMIT 40;
        `);

        const colors = ['#A855F7', '#EC4899', '#10B981', '#F59E0B', '#3B82F6', '#842BD2', '#EF4444', '#6366F1'];
        const formattedClients = result.rows.map((c: any, index: number) => ({
          id: `#C-80${c.customer_id}`,
          name: `${c.first_name || ''} ${c.last_name || ''}`.trim(),
          email: c.email || 'correo@music.com',
          country: c.country || 'Desconocido',
          phone: c.phone || 'Sin número',
          totalSpent: parseFloat(c.total_spent) || 0,
          avatarColor: colors[index % colors.length]
        }));

        res.json({
          success: true,
          count: formattedClients.length,
          data: formattedClients
        });
      } finally {
        dbClient.release();
      }
    } catch (err: any) {
      console.error("Error al consultar clientes:", err);
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // API Route - Get Employees
  app.get("/api/employees", async (req, res) => {
    try {
      const dbClient = await pool.connect();
      try {
        const result = await dbClient.query(`
          SELECT 
            e.employee_id, 
            e.first_name, 
            e.last_name, 
            e.title AS role, 
            e.hire_date, 
            e.email, 
            e.phone, 
            (SELECT COUNT(*) FROM customer WHERE support_rep_id = e.employee_id) AS clients_assigned
          FROM employee e 
          ORDER BY e.employee_id ASC
          LIMIT 20;
        `);

        const avatars = [
          'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
          'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop'
        ];

        const formattedEmployees = result.rows.map((e: any, index: number) => {
          let hireDateStr = 'Unknown';
          if (e.hire_date) {
            try {
              const dateObj = new Date(e.hire_date);
              hireDateStr = dateObj.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });
            } catch (_) {}
          }
          
          return {
            id: `#EMP-20${e.employee_id}`,
            name: `${e.first_name || ''} ${e.last_name || ''}`.trim(),
            role: e.role || 'Soporte General',
            clientsAssigned: parseInt(e.clients_assigned) || 0,
            joinedDate: hireDateStr,
            email: e.email || 'emp@musicstore.com',
            phone: e.phone || 'Sin número',
            avatarUrl: avatars[index % avatars.length]
          };
        });

        res.json({
          success: true,
          count: formattedEmployees.length,
          data: formattedEmployees
        });
      } finally {
        dbClient.release();
      }
    } catch (err: any) {
      console.error("Error al consultar empleados:", err);
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // API Route - Get Invoices
  app.get("/api/invoices", async (req, res) => {
    try {
      const dbClient = await pool.connect();
      try {
        const result = await dbClient.query(`
          SELECT 
            i.invoice_id, 
            i.invoice_date, 
            i.total, 
            c.first_name, 
            c.last_name,
            (
              SELECT string_agg(t.name, ', ') 
              FROM (
                SELECT name 
                FROM invoice_line il 
                JOIN track t ON il.track_id = t.track_id 
                WHERE il.invoice_id = i.invoice_id 
                LIMIT 2
              ) AS sub
            ) AS items_summary
          FROM invoice i 
          JOIN customer c ON i.customer_id = c.customer_id 
          ORDER BY i.invoice_date DESC
          LIMIT 40;
        `);

        const formattedInvoices = result.rows.map((inv: any) => {
          let invDateStr = 'Unknown';
          if (inv.invoice_date) {
            try {
              const dateObj = new Date(inv.invoice_date);
              invDateStr = dateObj.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });
            } catch (_) {}
          }
          
          return {
            id: `#MS-90${inv.invoice_id}`,
            date: invDateStr,
            itemsSummary: inv.items_summary || 'Music Albums Compilation & Tracks',
            total: parseFloat(inv.total) || 5.99,
            status: parseFloat(inv.total) > 15 ? 'Completada' : 'Pendiente'
          };
        });

        res.json({
          success: true,
          count: formattedInvoices.length,
          data: formattedInvoices
        });
      } finally {
        dbClient.release();
      }
    } catch (err: any) {
      console.error("Error al consultar facturas:", err);
      res.status(500).json({ success: false, error: err.message });
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
