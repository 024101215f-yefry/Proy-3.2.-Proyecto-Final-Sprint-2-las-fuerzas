import { neon } from '@neondatabase/serverless';

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
    
    // 1. Fetch first 35 albums with their artists from Neon PostgreSQL
    const albumsQuery = await sql`
      SELECT 
        al.album_id, 
        al.title, 
        al.artist_id, 
        ar.name AS artist_name 
      FROM album al 
      LEFT JOIN artist ar ON al.artist_id = ar.artist_id 
      ORDER BY al.album_id ASC 
      LIMIT 35;
    `;

    if (albumsQuery.length === 0) {
      return res.status(200).json({
        success: true,
        count: 0,
        data: []
      });
    }

    const albumIds = albumsQuery.map((a: any) => a.album_id);
    
    // 2. Fetch tracks for these specific albums
    const tracksQuery = await sql`
      SELECT 
        t.track_id, 
        t.name AS title, 
        t.album_id, 
        t.milliseconds, 
        t.unit_price, 
        g.name AS genre_name
      FROM track t
      LEFT JOIN genre g ON t.genre_id = g.genre_id
      WHERE t.album_id = ANY(${albumIds})
      ORDER BY t.track_id ASC;
    `;

    // 3. Group tracks by album_id
    const tracksByAlbum: Record<string, any[]> = {};
    tracksQuery.forEach((row: any) => {
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
        artist: '', // Will be matched with the album's artist name below
        duration: durationStr,
        price: Number(row.unit_price) || 0.99,
        genre: row.genre_name || 'Rock'
      });
    });

    // 4. Construct complete Album objects matching frontend types
    const formattedAlbums = albumsQuery.map((alb: any) => {
      const idNum = Number(alb.album_id) || 1;
      const artistName = alb.artist_name || `Artist #${alb.artist_id}`;
      const albIdStr = String(alb.album_id);
      
      // Get tracks of this album and populate artist
      const albumTracks = (tracksByAlbum[albIdStr] || []).map(tr => ({
        ...tr,
        artist: artistName
      }));

      // Determine main genre based on the first track's genre, fallback to a deterministic formula
      const mainGenre = albumTracks.length > 0 && albumTracks[0].genre 
        ? albumTracks[0].genre 
        : genres[idNum % genres.length];

      // Sum unit price for album, or dynamic formula
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

    return res.status(200).json({
      success: true,
      count: formattedAlbums.length,
      data: formattedAlbums
    });
  } catch (error: any) {
    console.error("Vercel Serverless Function Error /api/albums:", error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Error al obtener datos de PostgreSQL.'
    });
  }
}
