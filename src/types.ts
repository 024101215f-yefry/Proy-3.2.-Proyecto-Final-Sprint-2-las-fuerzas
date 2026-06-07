export interface Track {
  id: string;
  title: string;
  artist: string;
  duration: string; // e.g. "4:27"
  price: number;
}

export interface Album {
  id: string;
  title: string;
  artist: string;
  year: number;
  genre: string;
  price: number;
  coverUrl: string;
  country: string;
  isTrending?: boolean;
  tracks: Track[];
}

export interface Invoice {
  id: string;
  date: string;
  itemsSummary: string;
  total: number;
  status: 'Completada' | 'Pendiente';
}

export interface Playlist {
  id: string;
  name: string;
  emoji: string;
  trackCount: number;
  duration: string;
  tracks: Track[];
}

export interface ClientData {
  id: string;
  name: string;
  email: string;
  country: string;
  phone: string;
  totalSpent: number;
  avatarColor: string; // custom avatar background color code
}

export interface EmployeeData {
  id: string;
  name: string;
  role: string;
  clientsAssigned: number;
  joinedDate: string;
  email: string;
  phone: string;
  avatarUrl: string;
}

export type UserRole = 'guest' | 'client' | 'admin';
