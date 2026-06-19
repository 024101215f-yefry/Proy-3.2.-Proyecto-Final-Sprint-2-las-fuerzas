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
    `;
    
    const formattedInvoices = data.map((inv: any) => {
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
    
    return res.status(200).json({
      success: true,
      count: formattedInvoices.length,
      data: formattedInvoices
    });
  } catch (error: any) {
    console.error("Vercel Serverless Function Invoices Error:", error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Error al obtener facturas de PostgreSQL.'
    });
  }
}
