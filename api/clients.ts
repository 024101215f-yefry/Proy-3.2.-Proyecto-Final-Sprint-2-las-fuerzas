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
    `;
    
    const colors = ['#A855F7', '#EC4899', '#10B981', '#F59E0B', '#3B82F6', '#842BD2', '#EF4444', '#6366F1'];
    
    const formattedClients = data.map((c: any, index: number) => ({
      id: `#C-80${c.customer_id}`,
      name: `${c.first_name || ''} ${c.last_name || ''}`.trim(),
      email: c.email || 'correo@music.com',
      country: c.country || 'Desconocido',
      phone: c.phone || 'Sin número',
      totalSpent: parseFloat(c.total_spent) || 0,
      avatarColor: colors[index % colors.length]
    }));
    
    return res.status(200).json({
      success: true,
      count: formattedClients.length,
      data: formattedClients
    });
  } catch (error: any) {
    console.error("Vercel Serverless Function Clients Error:", error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Error al obtener clientes de PostgreSQL.'
    });
  }
}
