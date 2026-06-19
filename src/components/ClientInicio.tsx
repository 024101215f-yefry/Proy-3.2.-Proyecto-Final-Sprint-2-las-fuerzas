import React from 'react';
import { DollarSign, Music, Play, Disc, ArrowRight, Sparkles, HeartPulse, User } from 'lucide-react';
import { Album, Playlist } from '../types';
import PostgresAlbumTable from './PostgresAlbumTable';

interface ClientInicioProps {
  albums: Album[];
  playlists: Playlist[];
  totalSpent: number;
  userName: string;
  onSelectAlbum: (album: Album) => void;
  onSelectPlaylistIndex: (playlistId: string) => void;
  onNavigateToCatalog: (genreFilter?: string) => void;
}

export default function ClientInicio({
  albums,
  playlists,
  totalSpent,
  userName,
  onSelectAlbum,
  onSelectPlaylistIndex,
  onNavigateToCatalog,
}: ClientInicioProps) {
  
  // Latin trends filters (subset of albums)
  const trendingAlbums = albums.filter((alb) => alb.isTrending);

  return (
    <div className="w-full flex flex-col gap-8 animate-fadeIn">
      
      {/* Header Welcome Card with dynamic background gradient */}
      <div className="relative w-full rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-purple-900 to-[#4F46E5] overflow-hidden shadow-lg shadow-purple-500/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 text-white">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[60px] -z-10" />
        <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-pink-500/10 rounded-full blur-[40px] -z-10" />

        <div className="flex flex-col gap-1.5 z-10">
          <div className="flex items-center gap-2 text-purple-200 text-xs font-mono font-medium tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Portal del Estudiante • UAC</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-semibold text-white tracking-tight">
            ¡Hola de nuevo, <span className="bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">{userName}</span>!
          </h2>
          <p className="text-purple-100 text-xs sm:text-sm max-w-lg font-sans">
            Explora el catálogo premium oficial de MusicStore Web. Obtén facturas en tiempo real y gestiona tus playlists.
          </p>
        </div>

        <div className="flex gap-3 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 self-stretch sm:self-auto items-center">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white">
            <User className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-white text-xs font-bold font-mono">Socio Platinum</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <p className="text-purple-200 text-xxs">ID: #C-8239 • Cusco, PE</p>
          </div>
        </div>
      </div>

      {/* Dynamic Summary Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1 */}
        <div className="bg-white border border-purple-100/75 p-5 rounded-2xl flex flex-col gap-2 relative group hover:border-purple-355 transition-all shadow-sm">
          <div className="flex justify-between items-center text-[#64748B]">
            <span className="text-xs font-semibold uppercase tracking-wider font-mono">Total Gastado</span>
            <div className="p-2 bg-purple-50 rounded-xl text-purple-600 group-hover:bg-purple-100 transition-colors">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <span className="text-xl sm:text-2xl font-bold font-display text-[#0F172A]">
            S/. {totalSpent.toFixed(2)}
          </span>
          <p className="text-[10px] text-purple-600 font-semibold flex items-center gap-1">
            <span>• Cuenta Premium Soles</span>
          </p>
        </div>

        {/* Metric 2 */}
        <div className="bg-white border border-purple-100/75 p-5 rounded-2xl flex flex-col gap-2 relative group hover:border-purple-355 transition-all shadow-sm">
          <div className="flex justify-between items-center text-[#64748B]">
            <span className="text-xs font-semibold uppercase tracking-wider font-mono">Canciones</span>
            <div className="p-2 bg-pink-50 rounded-xl text-pink-600 group-hover:bg-pink-100 transition-colors">
              <Music className="w-4 h-4" />
            </div>
          </div>
          <span className="text-xl sm:text-2xl font-bold font-display text-[#0F172A]">
            23 Canciones
          </span>
          <p className="text-[10px] text-pink-600 font-semibold">
            • En tus Playlists activas
          </p>
        </div>

        {/* Metric 3 */}
        <div className="bg-white border border-purple-100/75 p-5 rounded-2xl flex flex-col gap-2 relative group hover:border-purple-355 transition-all shadow-sm">
          <div className="flex justify-between items-center text-[#64748B]">
            <span className="text-xs font-semibold uppercase tracking-wider font-mono">Mis Playlists</span>
            <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600 group-hover:bg-indigo-100 transition-colors">
              <Disc className="w-4 h-4 animate-spin-slow" />
            </div>
          </div>
          <span className="text-xl sm:text-2xl font-bold font-display text-[#0F172A]">
            {playlists.length} Playlists
          </span>
          <p className="text-[10px] text-indigo-600 font-semibold">
            • Sincronizadas localmente
          </p>
        </div>

        {/* Metric 4 */}
        <div className="bg-white border border-purple-100/75 p-5 rounded-2xl flex flex-col gap-2 relative group hover:border-purple-355 transition-all shadow-sm">
          <div className="flex justify-between items-center text-[#64748B]">
            <span className="text-xs font-semibold uppercase tracking-wider font-mono">Nivel de Socio</span>
            <div className="p-2 bg-emerald-50 rounded-xl text-emerald-600 group-hover:bg-emerald-100 transition-colors">
              <HeartPulse className="w-4 h-4" />
            </div>
          </div>
          <span className="text-xl sm:text-2xl font-bold font-display text-[#0F172A]">
            PLATINUM
          </span>
          <p className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
            <span>• 3 cupones disponibles</span>
          </p>
        </div>
      </div>

      {/* Real-time PostgreSQL Database integration */}
      <PostgresAlbumTable />

      {/* Popular Genres Row */}
      <div className="flex flex-col gap-4">
        <div>
          <h3 className="text-lg font-display font-semibold text-[#0F172A]">Géneros Populares</h3>
          <p className="text-[#64748B] text-xs">Acceso directo para filtrar y descubrir el ritmo ideal</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          <button
            onClick={() => onNavigateToCatalog('Reggaetón')}
            className="group relative h-28 rounded-2xl overflow-hidden text-left border border-purple-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 cursor-pointer"
          >
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.15),rgba(15,23,42,0.85))] z-10" />
            <img
              src="https://images.unsplash.com/photo-1484876065684-b683cf17d276?w=500&q=80"
              alt="Reggaetón"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute bottom-4 left-4 z-20">
              <span className="text-white text-md font-bold block font-display tracking-wide drop-shadow-md">Reggaetón 🔥</span>
              <span className="text-purple-200 text-xxs block font-mono font-medium">Ver 4 Álbumes</span>
            </div>
          </button>

          <button
            onClick={() => onNavigateToCatalog('Rock Latino')}
            className="group relative h-28 rounded-2xl overflow-hidden text-left border border-purple-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 cursor-pointer"
          >
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.15),rgba(15,23,42,0.85))] z-10" />
            <img
              src="https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=500&q=80"
              alt="Rock Latino"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute bottom-4 left-4 z-20">
              <span className="text-white text-md font-bold block font-display tracking-wide drop-shadow-md">Rock Latino 🎸</span>
              <span className="text-purple-200 text-xxs block font-mono font-medium">Ver Canciones Clásicas</span>
            </div>
          </button>

          <button
            onClick={() => onNavigateToCatalog('Salsa')}
            className="group relative h-28 rounded-2xl overflow-hidden text-left border border-purple-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 cursor-pointer"
          >
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.15),rgba(15,23,42,0.85))] z-10" />
            <img
              src="https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=500&q=80"
              alt="Salsa"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute bottom-4 left-4 z-20">
              <span className="text-white text-md font-bold block font-display tracking-wide drop-shadow-md">Salsa & Caribe 💃</span>
              <span className="text-purple-200 text-xxs block font-mono font-medium">Ver Listados</span>
            </div>
          </button>
        </div>
      </div>

      {/* Latam Trends: Horizontal Scroll list of albums */}
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-end">
          <div>
            <h3 className="text-lg font-display font-semibold text-[#0F172A]">Novedades Latinas</h3>
            <p className="text-[#64748B] text-xs">Álbumes que lideran las listas esta semana</p>
          </div>
          <button
            onClick={() => onNavigateToCatalog()}
            className="text-xs text-purple-600 hover:text-purple-700 font-semibold transition-colors flex items-center gap-1.5 group"
          >
            <span>Ver todo el catálogo</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {trendingAlbums.map((album) => (
            <div
              key={album.id}
              className="bg-white border border-purple-100/75 rounded-2xl p-4 flex flex-col gap-3 group hover:border-purple-300 transition-all relative shadow-sm hover:shadow-md"
            >
              <div className="absolute top-6 left-6 z-20 pointer-events-none">
                <span className="bg-purple-600 text-white text-[9px] font-bold font-mono px-2 py-0.5 rounded-full uppercase tracking-wider shadow-md">
                  TENDENCIA
                </span>
              </div>

              {/* Cover with Play hover filter overlay */}
              <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-slate-100">
                <img
                  src={album.coverUrl}
                  alt={album.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-[#0F172A]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    onClick={() => onSelectAlbum(album)}
                    className="p-3 bg-purple-600 text-white rounded-full hover:scale-110 transition-transform duration-200 shadow-lg cursor-pointer animate-scaleUp"
                  >
                    <Play className="w-5 h-5 fill-white ml-0.5" />
                  </button>
                </div>
              </div>

              {/* Text metadata */}
              <div className="flex flex-col gap-1 min-h-[50px]">
                <h4
                  onClick={() => onSelectAlbum(album)}
                  className="text-[#0F172A] text-xs sm:text-sm font-semibold truncate hover:text-purple-600 transition-colors cursor-pointer"
                  title={album.title}
                >
                  {album.title}
                </h4>
                <p className="text-[#64748B] text-xxs truncate">{album.artist}</p>
              </div>

              {/* Purchase summary banner info */}
              <div className="flex justify-between items-center pt-2 border-t border-purple-100">
                <span className="text-purple-600 text-xs font-mono font-bold">
                  S/. {album.price.toFixed(2)}
                </span>
                <button
                  onClick={() => onSelectAlbum(album)}
                  className="text-[10px] text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200/50 px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer"
                >
                  Ver Álbum
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Suggested Quick Playlist cards */}
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-display font-semibold text-[#0F172A]">Listas recomendadas para hoy</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {playlists.map((pl) => (
            <button
              key={pl.id}
              onClick={() => onSelectPlaylistIndex(pl.id)}
              className="p-4 bg-white border border-purple-100/70 hover:border-purple-300 text-left rounded-2xl flex items-center gap-4 transition-all hover:-translate-y-0.5 group cursor-pointer shadow-sm hover:shadow-md"
            >
              <div className="w-12 h-12 bg-purple-50 text-white rounded-xl flex items-center justify-center text-xl group-hover:bg-purple-100 border border-purple-100/50">
                {pl.emoji}
              </div>
              <div className="flex-1 overflow-hidden">
                <span className="text-[#0F172A] text-sm font-semibold truncate block group-hover:text-purple-600 transition-colors">{pl.name}</span>
                <span className="text-[#64748B] text-xxs font-medium">{pl.trackCount} temas • {pl.duration}</span>
              </div>
              <Play className="w-4 h-4 text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity ml-2" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
