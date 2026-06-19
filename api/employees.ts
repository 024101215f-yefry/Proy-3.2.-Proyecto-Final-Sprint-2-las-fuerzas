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
    `;
    
    const avatars = [
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop'
    ];
    
    const formattedEmployees = data.map((e: any, index: number) => {
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
    
    return res.status(200).json({
      success: true,
      count: formattedEmployees.length,
      data: formattedEmployees
    });
  } catch (error: any) {
    console.error("Vercel Serverless Function Employees Error:", error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Error al obtener empleados de PostgreSQL.'
    });
  }
}
