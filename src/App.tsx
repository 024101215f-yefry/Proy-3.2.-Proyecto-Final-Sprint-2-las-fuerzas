import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BottomPlayer from './components/BottomPlayer';
import LoginScreen from './components/LoginScreen';

// Client Screens
import ClientInicio from './components/ClientInicio';
import ClientCatalogo from './components/ClientCatalogo';
import AlbumDetailView from './components/AlbumDetailView';
import MisPlaylistsView from './components/MisPlaylistsView';
import MisFacturasView from './components/MisFacturasView';

// Admin Screens
import AdminDashboard from './components/AdminDashboard';
import AdminClientes from './components/AdminClientes';
import AdminReportes from './components/AdminReportes';
import AdminEmpleados from './components/AdminEmpleados';

// Data Sources and types
import {
  initialAlbums,
  initialInvoices,
  initialPlaylists,
  initialClients,
  initialEmployees,
} from './data';
import { Album, Playlist, Invoice, ClientData, EmployeeData, Track, UserRole } from './types';

export default function App() {
  // Session States
  const [role, setRole] = useState<UserRole>('guest');
  const [userName, setUserName] = useState('');
  const [activeTab, setActiveTab] = useState('inicio'); // client: inicio, catalogo, playlists, facturas. admin: dashboard, clientes, empleados, reportes

  // Database States (for real interactive state transformations!)
  const [albums, setAlbums] = useState<Album[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>(initialPlaylists);
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);
  const [clients, setClients] = useState<ClientData[]>(initialClients);
  const [employees, setEmployees] = useState<EmployeeData[]>(initialEmployees);

  // Fetch and convert real-time PostgreSQL record rows
  React.useEffect(() => {
    const fetchPgAlbums = async () => {
      try {
        const response = await fetch('/api/albums');
        if (!response.ok) throw new Error('Fallo al obtener álbumes');
        const jsonResult = await response.json();
        
        if (jsonResult.success && Array.isArray(jsonResult.data)) {
          const parsed: Album[] = jsonResult.data.map((row: any) => {
            const idNum = parseInt(row.album_id) || 1;
            return {
              id: String(row.album_id),
              title: row.title,
              artist: `Artist #${row.artist_id}`,
              year: 1970 + (idNum % 54),
              genre: ['Rock', 'Jazz', 'Metal', 'Latin', 'Pop', 'Classical', 'Blues'][idNum % 7],
              price: 9.99 + (idNum % 16),
              coverUrl: `https://images.unsplash.com/photo-${[
                '1514525253161-7a46d19cd819', // vinyl/concert
                '1511671782779-c97d3d27a1d4', // mic
                '1470225620780-dba8ba36b745', // dj
                '1505740420928-5e560c06d30e', // headphone
                '1459749411175-04bf5292ceea', // concert
                '1511379938547-c1f69419868d', // piano
                '1506157786151-b8491531f063', // guitar
              ][idNum % 7]}?w=300&h=300&fit=crop`,
              country: ['USA', 'UK', 'Perú', 'Germany', 'Canada', 'Mexico'][idNum % 6],
              isTrending: idNum % 3 === 0,
              tracks: [
                {
                  id: `tr-${row.album_id}-1`,
                  title: `Track 01 - ${row.title} Remasterizado`,
                  artist: `Artist #${row.artist_id}`,
                  duration: '3:45',
                  price: 0.99
                },
                {
                  id: `tr-${row.album_id}-2`,
                  title: `Track 02 - ${row.title} Acoustic Version`,
                  artist: `Artist #${row.artist_id}`,
                  duration: '4:12',
                  price: 0.99
                }
              ]
            };
          });
          setAlbums(parsed);
        }
      } catch (err) {
        console.error('Error al poblar base de datos en tiempo real:', err);
      }
    };
    fetchPgAlbums();
  }, []);

  // Music Player States
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeCoverUrl, setActiveCoverUrl] = useState<string>('');

  // Routing details inside Client Catalog
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [catalogGenreFilter, setCatalogGenreFilter] = useState('');
  const [purchasedAlbumIds, setPurchasedAlbumIds] = useState<string[]>(['alb-1']); // Bad Bunny pre-purchased

  // Calculate dynamic spendings based on invoices
  const dynamicTotalSpent = useMemo(() => {
    return invoices.reduce((sum, inv) => sum + inv.total, 0);
  }, [invoices]);

  // Auth operations
  const handleLogin = (selectedRole: UserRole, loginName?: string) => {
    setRole(selectedRole);
    setUserName(loginName || (selectedRole === 'admin' ? 'Lucía Vargas' : 'Carlos Mamani'));
    setActiveTab(selectedRole === 'admin' ? 'dashboard' : 'inicio');
  };

  const handleLogout = () => {
    setRole('guest');
    setUserName('');
    setSelectedAlbum(null);
  };

  // Music controls
  const handlePlayTrack = (track: Track, coverUrl?: string) => {
    setCurrentTrack(track);
    setIsPlaying(true);
    if (coverUrl) {
      setActiveCoverUrl(coverUrl);
    }
  };

  const handleNextTrack = () => {
    // Basic progression logic - plays random track from database
    const allTracks = albums.flatMap((a) => a.tracks);
    const randomTrack = allTracks[Math.floor(Math.random() * allTracks.length)];
    if (randomTrack) {
      const albumOfTrack = albums.find((a) => a.tracks.some((t) => t.id === randomTrack.id));
      setCurrentTrack(randomTrack);
      setIsPlaying(true);
      if (albumOfTrack) setActiveCoverUrl(albumOfTrack.coverUrl);
    }
  };

  const handlePrevTrack = () => {
    handleNextTrack(); // simple loop for immersive simulation
  };

  // Client Purchase action (alters billing history & total spent instantly!)
  const handleBuyAlbum = (albumToBuy: Album) => {
    if (purchasedAlbumIds.includes(albumToBuy.id)) return;

    // Append invoice
    const newInvoice: Invoice = {
      id: `#MS-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toLocaleDateString('es-PE', { day: 'numeric', month: 'short', year: 'numeric' }),
      itemsSummary: `${albumToBuy.title} (Álbum completo)`,
      total: albumToBuy.price,
      status: 'Completada',
    };

    setInvoices([newInvoice, ...invoices]);
    setPurchasedAlbumIds([...purchasedAlbumIds, albumToBuy.id]);

    // Also update client totals if they match the active client "Carlos Mamani" in master directory
    setClients(
      clients.map((c) => {
        if (c.name === 'Carlos Mamani' || c.name === userName) {
          return { ...c, totalSpent: c.totalSpent + albumToBuy.price };
        }
        return c;
      })
    );
  };

  // Client Playlists actions
  const handleAddTrackToPlaylist = (playlistId: string, track: Track) => {
    setPlaylists(
      playlists.map((pl) => {
        if (pl.id === playlistId) {
          // Check if already exists in target
          if (pl.tracks.some((t) => t.id === track.id)) return pl;
          return {
            ...pl,
            trackCount: pl.trackCount + 1,
            tracks: [...pl.tracks, track],
          };
        }
        return pl;
      })
    );
  };

  const handleAddAlbumToPlaylist = (playlistId: string, albumToAdd: Album) => {
    setPlaylists(
      playlists.map((pl) => {
        if (pl.id === playlistId) {
          // Add all unique tracks
          const filteredTracks = albumToAdd.tracks.filter((t) => !pl.tracks.some((pt) => pt.id === t.id));
          return {
            ...pl,
            trackCount: pl.trackCount + filteredTracks.length,
            tracks: [...pl.tracks, ...filteredTracks],
          };
        }
        return pl;
      })
    );
  };

  const handleCreatePlaylist = (name: string, emoji: string) => {
    const newPl: Playlist = {
      id: `pl-${Date.now()}`,
      name,
      emoji,
      trackCount: 0,
      duration: '0m',
      tracks: [],
    };
    setPlaylists([...playlists, newPl]);
  };

  const handleDeletePlaylist = (id: string) => {
    setPlaylists(playlists.filter((p) => p.id !== id));
  };

  const handleRemoveTrackFromPlaylist = (playlistId: string, trackId: string) => {
    setPlaylists(
      playlists.map((pl) => {
        if (pl.id === playlistId) {
          const updatedTracks = pl.tracks.filter((t) => t.id !== trackId);
          return {
            ...pl,
            trackCount: updatedTracks.length,
            tracks: updatedTracks,
          };
        }
        return pl;
      })
    );
  };

  // Admin section updates callbacks
  const handleUpdateClient = (id: string, updated: Partial<ClientData>) => {
    setClients(clients.map((c) => (c.id === id ? { ...c, ...updated } : c)));
  };

  const handleAddClient = (clientParam: Omit<ClientData, 'id'>) => {
    const newCl: ClientData = {
      id: `#C-${Math.floor(8000 + Math.random() * 2000)}`,
      ...clientParam,
    };
    setClients([newCl, ...clients]);
  };

  const handleAddEmployee = (empParam: Omit<EmployeeData, 'id'>) => {
    const newEmp: EmployeeData = {
      id: `#EMP-${Math.floor(2000 + Math.random() * 500)}`,
      ...empParam,
    };
    setEmployees([newEmp, ...employees]);
  };

  const handleRemoveEmployee = (id: string) => {
    setEmployees(employees.filter((e) => e.id !== id));
  };

  // Triggering route inside catalog view
  const handleNavigateToCatalogWithGenre = (genreFilter?: string) => {
    setSelectedAlbum(null);
    setCatalogGenreFilter(genreFilter || '');
    setActiveTab('catalogo');
  };

  // Decide current view to render
  const renderContent = () => {
    if (role === 'client') {
      if (selectedAlbum) {
        return (
          <AlbumDetailView
            album={selectedAlbum}
            playlists={playlists}
            onBack={() => setSelectedAlbum(null)}
            onPlayTrack={handlePlayTrack}
            onBuyAlbum={handleBuyAlbum}
            onAddTrackToPlaylist={handleAddTrackToPlaylist}
            onAddAlbumToPlaylist={handleAddAlbumToPlaylist}
            purchasedAlbumIdList={purchasedAlbumIds}
          />
        );
      }

      switch (activeTab) {
        case 'inicio':
          return (
            <ClientInicio
              albums={albums}
              playlists={playlists}
              totalSpent={dynamicTotalSpent}
              userName={userName}
              onSelectAlbum={setSelectedAlbum}
              onSelectPlaylistIndex={(id) => {
                setActiveTab('playlists');
              }}
              onNavigateToCatalog={handleNavigateToCatalogWithGenre}
            />
          );
        case 'catalogo':
          return (
            <ClientCatalogo
              albums={albums}
              onSelectAlbum={setSelectedAlbum}
              initialGenreFilter={catalogGenreFilter}
            />
          );
        case 'playlists':
          return (
            <MisPlaylistsView
              playlists={playlists}
              selectedPlaylistId={playlists[0]?.id || ''}
              onSelectPlaylistId={() => {}}
              onCreatePlaylist={handleCreatePlaylist}
              onDeletePlaylist={handleDeletePlaylist}
              onRemoveTrackFromPlaylist={handleRemoveTrackFromPlaylist}
              onPlayTrack={(tr) => {
                const albOfTrack = albums.find((a) => a.tracks.some((t) => t.id === tr.id));
                handlePlayTrack(tr, albOfTrack?.coverUrl);
              }}
            />
          );
        case 'facturas':
          return <MisFacturasView invoices={invoices} totalSpent={dynamicTotalSpent} />;
        default:
          return <div className="text-white">Sección no encontrada</div>;
      }
    } else if (role === 'admin') {
      switch (activeTab) {
        case 'dashboard':
          return <AdminDashboard onNavigateToView={setActiveTab} />;
        case 'clientes':
          return (
            <AdminClientes
              clients={clients}
              onUpdateClient={handleUpdateClient}
              onAddClient={handleAddClient}
            />
          );
        case 'empleados':
          return (
            <AdminEmpleados
              employees={employees}
              onAddEmployee={handleAddEmployee}
              onRemoveEmployee={handleRemoveEmployee}
            />
          );
        case 'reportes':
          return <AdminReportes />;
        default:
          return <div className="text-white">Sección Admin no encontrada</div>;
      }
    }
    return null;
  };

  // Rendering main structure
  if (role === 'guest') {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1E293B] flex flex-col font-sans transition-colors duration-300">
      
      {/* Background glowing gradients */}
      <div className="fixed top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/5 blur-[130px] -z-10 pointer-events-none" />
      <div className="fixed bottom-0 left-[-10%] w-[35%] h-[35%] rounded-full bg-pink-500/3 blur-[120px] -z-10 pointer-events-none" />

      {/* Global Header */}
      <Navbar
        role={role}
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setSelectedAlbum(null); // click in tab resets album drill down
          setCatalogGenreFilter('');
          setActiveTab(tab);
        }}
        userName={userName}
        onLogout={handleLogout}
      />

      {/* Main Container screen with transition spacing */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-36">
        {renderContent()}
      </main>

      {/* Persistent Audio player */}
      <BottomPlayer
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        onTogglePlay={() => setIsPlaying(!isPlaying)}
        onNext={handleNextTrack}
        onPrev={handlePrevTrack}
        activeCoverUrl={activeCoverUrl}
      />

      {/* Persistent Footer */}
      <Footer />
    </div>
  );
}
