import { Album, Invoice, Playlist, ClientData, EmployeeData, Track } from './types';

// High Quality Music-focused Unsplash Images conforming to nocturnal blue-purple aesthetic
export const images = {
  nadieSabe: 'https://images.unsplash.com/photo-1614680376593-902f74fa0d41?w=500&auto=format&fit=crop&q=80', // neon decks
  mananaSera: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80', // magenta portrait
  genesis: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=500&auto=format&fit=crop&q=80', // futuristic neon cubics
  lasMujeres: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&auto=format&fit=crop&q=80', // mic with glowing lights
  saturno: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=500&auto=format&fit=crop&q=80', // cybernetic violet ring lights
  ferxxo: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&auto=format&fit=crop&q=80', // concert cyan glow
  vibrasNocturnas: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=500&auto=format&fit=crop&q=80', // violet abstract circle
  reggaetonBg: 'https://images.unsplash.com/photo-1484876065684-b683cf17d276?w=800&auto=format&fit=crop&q=80', // pink concert stage
  rockLatinoBg: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800&auto=format&fit=crop&q=80', // guitars and band
  salsaBg: 'https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=800&auto=format&fit=crop&q=80', // vinyl rotation disc
  relajacionBg: 'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=800&auto=format&fit=crop&q=80', // moon reflection lake
};

export const initialAlbums: Album[] = [
  {
    id: 'alb-1',
    title: 'Nadie Sabe Lo Que Va A Pasar Mañana',
    artist: 'Bad Bunny',
    year: 2023,
    genre: 'Reggaetón',
    price: 59.90,
    coverUrl: images.nadieSabe,
    country: 'Puerto Rico',
    isTrending: true,
    tracks: [
      { id: 'tr-101', title: 'MONACO', artist: 'Bad Bunny', duration: '4:27', price: 3.99 },
      { id: 'tr-102', title: 'MR. OCTOBER', artist: 'Bad Bunny', duration: '3:09', price: 2.99 },
      { id: 'tr-103', title: 'HIBIKI', artist: 'Bad Bunny ft. Mora', duration: '3:28', price: 2.99 },
      { id: 'tr-104', title: 'FINA', artist: 'Bad Bunny ft. Young Miko', duration: '3:36', price: 3.50 },
      { id: 'tr-105', title: 'CYBERTRUCK', artist: 'Bad Bunny', duration: '3:11', price: 1.99 },
    ]
  },
  {
    id: 'alb-2',
    title: 'Mañana Será Bonito',
    artist: 'Karol G',
    year: 2023,
    genre: 'Urban Pop',
    price: 45.00,
    coverUrl: images.mananaSera,
    country: 'Colombia',
    isTrending: true,
    tracks: [
      { id: 'tr-201', title: 'TQG', artist: 'Karol G ft. Shakira', duration: '3:19', price: 3.99 },
      { id: 'tr-202', title: 'Mientras Me Curo del Cora', artist: 'Karol G', duration: '2:44', price: 2.99 },
      { id: 'tr-203', title: 'Cairo', artist: 'Karol G ft. Ovy On The Drums', duration: '3:18', price: 2.50 },
      { id: 'tr-204', title: 'Gucci Los Paños', artist: 'Karol G', duration: '3:06', price: 2.99 },
      { id: 'tr-205', title: 'Amargura', artist: 'Karol G', duration: '2:50', price: 3.50 },
    ]
  },
  {
    id: 'alb-3',
    title: 'Génesis',
    artist: 'Peso Pluma',
    year: 2023,
    genre: 'Corridos Tumbados',
    price: 48.00,
    coverUrl: images.genesis,
    country: 'México',
    isTrending: false,
    tracks: [
      { id: 'tr-301', title: 'LADY GAGA', artist: 'Peso Pluma ft. Gabito Ballesteros', duration: '3:32', price: 3.50 },
      { id: 'tr-302', title: 'PRADA', artist: 'Peso Pluma ft. Junior H', duration: '3:45', price: 2.99 },
      { id: 'tr-303', title: 'RUBICON', artist: 'Peso Pluma', duration: '3:10', price: 2.50 },
      { id: 'tr-304', title: 'LAGUNAS', artist: 'Peso Pluma ft. Jasiel Nuñez', duration: '3:50', price: 2.99 },
    ]
  },
  {
    id: 'alb-4',
    title: 'Las Mujeres Ya No Lloran',
    artist: 'Shakira',
    year: 2024,
    genre: 'Salsa & Pop',
    price: 65.00,
    coverUrl: images.lasMujeres,
    country: 'Colombia',
    isTrending: true,
    tracks: [
      { id: 'tr-401', title: 'Puntería', artist: 'Shakira ft. Cardi B', duration: '3:01', price: 3.99 },
      { id: 'tr-402', title: 'Shakira: Bzrp Music Sessions, Vol. 53', artist: 'Bizarrap & Shakira', duration: '3:33', price: 3.99 },
      { id: 'tr-403', title: 'Copa Vacía', artist: 'Shakira ft. Manuel Turizo', duration: '3:00', price: 2.50 },
      { id: 'tr-404', title: 'Acróstico', artist: 'Shakira ft. Milan y Sasha', duration: '2:51', price: 3.99 },
      { id: 'tr-405', title: 'La Fuerte', artist: 'Shakira ft. Bizarrap', duration: '2:44', price: 2.99 },
    ]
  },
  {
    id: 'alb-5',
    title: 'Saturno',
    artist: 'Rauw Alejandro',
    year: 2022,
    genre: 'Reggaetón Alternativo',
    price: 52.50,
    coverUrl: images.saturno,
    country: 'Puerto Rico',
    isTrending: true,
    tracks: [
      { id: 'tr-501', title: 'PUNTO 40', artist: 'Rauw Alejandro ft. Baby Rasta', duration: '3:10', price: 2.99 },
      { id: 'tr-502', title: 'LOKERA', artist: 'Rauw Alejandro ft. Lyanno', duration: '3:15', price: 3.20 },
      { id: 'tr-503', title: 'DIME QUIÉN???', artist: 'Rauw Alejandro', duration: '3:03', price: 2.50 },
      { id: 'tr-504', title: 'RON COLA', artist: 'Rauw Alejandro', duration: '3:05', price: 2.75 },
    ]
  },
  {
    id: 'alb-6',
    title: 'Ferxxocalipsis',
    artist: 'Feid',
    year: 2023,
    genre: 'Reggaetón',
    price: 48.90,
    coverUrl: images.ferxxo,
    country: 'Colombia',
    isTrending: true,
    tracks: [
      { id: 'tr-601', title: 'ALAKRAN', artist: 'Feid', duration: '2:55', price: 2.99 },
      { id: 'tr-602', title: '50 PALOS', artist: 'Feid', duration: '3:12', price: 2.50 },
      { id: 'tr-603', title: 'LUNA', artist: 'Feid ft. ATL Jacob', duration: '3:16', price: 3.99 },
      { id: 'tr-604', title: 'YO AKI', artist: 'Feid ft. Jhayco', duration: '3:02', price: 2.99 },
    ]
  },
  {
    id: 'alb-7',
    title: 'Vibras Nocturnas',
    artist: 'Bad Bunny & Tainy',
    year: 2024,
    genre: 'Reggaetón Alternativo',
    price: 38.50,
    coverUrl: images.vibrasNocturnas,
    country: 'Puerto Rico',
    isTrending: false,
    tracks: [
      { id: 'tr-701', title: 'Mónaco Nocturno', artist: 'Bad Bunny', duration: '4:27', price: 3.99 },
      { id: 'tr-702', title: 'Sinfonía del Barrio', artist: 'Bad Bunny ft. Tainy', duration: '3:15', price: 1.50 },
      { id: 'tr-703', title: 'Efecto Especial', artist: 'Bad Bunny', duration: '3:52', price: 2.99 },
      { id: 'tr-704', title: 'Luz de Neón', artist: 'Bad Bunny', duration: '2:48', price: 1.99 },
      { id: 'tr-705', title: 'Eco Digital', artist: 'Tainy', duration: '3:10', price: 1.50 },
      { id: 'tr-706', title: 'Gravedad Cero', artist: 'Rauw Alejandro ft. Tainy', duration: '2:59', price: 2.50 },
    ]
  }
];

export const initialInvoices: Invoice[] = [
  { id: '#MS-90210', date: '12 Oct 2024', itemsSummary: 'Vaporwave Dreams (Album)', total: 120.00, status: 'Completada' },
  { id: '#MS-89122', date: '28 Set 2024', itemsSummary: 'Sample Pack: Midnight Keys', total: 85.50, status: 'Completada' },
  { id: '#MS-87551', date: '15 Ago 2024', itemsSummary: 'Suscripción Anual Individual', total: 139.70, status: 'Completada' }
];

export const initialPlaylists: Playlist[] = [
  {
    id: 'pl-1',
    name: 'Reggaeton 🔥',
    emoji: '🔥',
    trackCount: 24,
    duration: '1h 15m',
    tracks: [
      { id: 'tr-101', title: 'MONACO', artist: 'Bad Bunny', duration: '4:27', price: 3.99 },
      { id: 'tr-603', title: 'LUNA', artist: 'Feid ft. ATL Jacob', duration: '3:16', price: 3.99 },
      { id: 'tr-201', title: 'TQG', artist: 'Karol G ft. Shakira', duration: '3:19', price: 3.99 },
      { id: 'tr-502', title: 'LOKERA', artist: 'Rauw Alejandro ft. Lyanno', duration: '3:15', price: 3.20 },
    ]
  },
  {
    id: 'pl-2',
    name: 'Salsa 💃',
    emoji: '💃',
    trackCount: 18,
    duration: '58m',
    tracks: [
      { id: 'tr-s1', title: 'Llorarás', artist: 'Oscar D\'León', duration: '3:45', price: 1.29 },
      { id: 'tr-s2', title: 'Valió la Pena', artist: 'Marc Anthony', duration: '4:52', price: 1.29 },
      { id: 'tr-s3', title: 'La Rebelión', artist: 'Joe Arroyo', duration: '4:44', price: 1.29 },
      { id: 'tr-s4', title: 'Cali Pachanguero', artist: 'Grupo Niche', duration: '5:10', price: 1.29 },
    ]
  },
  {
    id: 'pl-3',
    name: 'Rock Latino 🎸',
    emoji: '🎸',
    trackCount: 32,
    duration: '2h 05m',
    tracks: [
      { id: 'tr-r1', title: 'Lamento Boliviano', artist: 'Enanitos Verdes', duration: '3:45', price: 1.29 },
      { id: 'tr-r2', title: 'Persiana Americana', artist: 'Soda Stereo', duration: '4:52', price: 1.49 },
      { id: 'tr-r3', title: 'Música Ligera', artist: 'Soda Stereo', duration: '3:33', price: 1.29 },
      { id: 'tr-r4', title: 'Flaca', artist: 'Andrés Calamaro', duration: '4:47', price: 1.29 },
    ]
  },
  {
    id: 'pl-4',
    name: 'Relajación 🌙',
    emoji: '🌙',
    trackCount: 15,
    duration: '45m',
    tracks: [
      { id: 'tr-rl1', title: 'Brisa de Mar', artist: 'Lofi Latam', duration: '2:45', price: 0.99 },
      { id: 'tr-rl2', title: 'Atardecer', artist: 'Chill Beats', duration: '3:10', price: 0.99 },
      { id: 'tr-rl3', title: 'Noche de Lluvia', artist: 'Sounds of Cusco', duration: '4:00', price: 0.99 },
    ]
  }
];

export const initialClients: ClientData[] = [
  { id: '#C-8234', name: 'Alejandro Vargas', email: 'a.vargas@email.pe', country: 'Perú', phone: '+51 987 654 321', totalSpent: 2450.00, avatarColor: '#A855F7' },
  { id: '#C-8235', name: 'Mariana Castro', email: 'm.castro@music.cl', country: 'Chile', phone: '+56 9 1234 5678', totalSpent: 1890.50, avatarColor: '#EC4899' },
  { id: '#C-8236', name: 'Roberto López', email: 'r.lopez@gmail.com', country: 'México', phone: '+52 55 8765 4321', totalSpent: 4120.00, avatarColor: '#10B981' },
  { id: '#C-8237', name: 'Elena Gómez', email: 'egomez.art@outlook.com', country: 'Argentina', phone: '+54 11 2345 6789', totalSpent: 980.25, avatarColor: '#F59E0B' },
  { id: '#C-8238', name: 'Juan Rodríguez', email: 'j.rodriguez@empresa.co', country: 'Colombia', phone: '+57 310 555 1234', totalSpent: 3560.40, avatarColor: '#3B82F6' },
  { id: '#C-8239', name: 'Carlos Mamani', email: 'cmamani@uandina.edu.pe', country: 'Perú', phone: '+51 912 345 678', totalSpent: 345.20, avatarColor: '#842BD2' }
];

export const initialEmployees: EmployeeData[] = [
  { id: '#EMP-2041', name: 'Javier Ortiz', role: 'Specialist Curator', clientsAssigned: 142, joinedDate: '15 Mar 2022', email: 'j.ortiz@musicstore.com', phone: '+51 984 123 456', avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop' },
  { id: '#EMP-2055', name: 'Valentina Rojas', role: 'Account Manager', clientsAssigned: 89, joinedDate: '10 Ene 2023', email: 'v.rojas@musicstore.com', phone: '+51 912 345 678', avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
  { id: '#EMP-2088', name: 'Mateo Silva', role: 'Sales Lead', clientsAssigned: 210, joinedDate: '04 Feb 2021', email: 'm.silva@musicstore.com', phone: '+51 998 765 432', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' },
  { id: '#EMP-2102', name: 'Camila Morales', role: 'Catalog Admin', clientsAssigned: 54, joinedDate: '22 Nov 2023', email: 'c.morales@musicstore.com', phone: '+51 955 667 788', avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop' }
];

export const topSoldSongs = [
  { id: 'ts-1', title: 'Neon Nights', artist: 'The Midnight Crew', sales: 842, price: 4.50, status: 'POPULAR' },
  { id: 'ts-2', title: 'Solar Flare', artist: 'Aura Blaze', sales: 612, price: 5.90, status: 'TENDENCIA' },
  { id: 'ts-3', title: 'Deep Echo', artist: 'Bass Pulse', sales: 545, price: 3.20, status: 'ESTABLE' },
  { id: 'ts-4', title: 'City Jazz', artist: 'Smooth Vibe', sales: 490, price: 7.50, status: 'PREMIUM' },
  { id: 'ts-5', title: 'Wild Beat', artist: 'Thunder Drummers', sales: 420, price: 4.00, status: 'BAJANDO' }
];

export const recentTransactions = [
  { id: '#MS-9021', client: 'Andrea Lopez', date: '24 May, 15:30', items: '4 items', status: 'COMPLETADO', total: 120.00 },
  { id: '#MS-9020', client: 'Ricardo Mendoza', date: '24 May, 14:12', items: '1 item', status: 'COMPLETADO', total: 45.00 },
  { id: '#MS-9019', client: 'Juan Perez', date: '24 May, 11:45', items: '12 items', status: 'PENDIENTE', total: 580.00 },
];
