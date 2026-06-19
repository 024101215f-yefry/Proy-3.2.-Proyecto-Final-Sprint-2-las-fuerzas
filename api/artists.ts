import { neon } from '@neondatabase/serverless';

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const url = process.env.VITE_POSTGRES_URL || process.env.DATABASE_URL || '';
    if (!url) {
      throw new Error('La variable de entorno VITE_POSTGRES_URL o DATABASE_URL no está establecida.');
    }
    
    const sql = neon(url);
    const data = await sql`SELECT artist_id, name FROM artist ORDER BY artist_id ASC LIMIT 50;`;
    
    return res.status(200).json({
      success: true,
      count: data.length,
      data: data
    });
  } catch (error: any) {
    console.error("Vercel Serverless Function Artists Error:", error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Error al obtener artistas de PostgreSQL.'
    });
  }
}
