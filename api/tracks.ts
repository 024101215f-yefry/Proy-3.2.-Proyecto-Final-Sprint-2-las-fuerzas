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
    const data = await sql`
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
    `;
    
    // Format track response so that duration is formatted nicely as "mm:ss"
    const formattedTracks = data.map((t: any) => {
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
    
    return res.status(200).json({
      success: true,
      count: formattedTracks.length,
      data: formattedTracks
    });
  } catch (error: any) {
    console.error("Vercel Serverless Function Tracks Error:", error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Error al obtener canciones de PostgreSQL.'
    });
  }
}
