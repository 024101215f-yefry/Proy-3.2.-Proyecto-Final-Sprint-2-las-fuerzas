import React from 'react';
import { DollarSign, Music, Play, Disc, ArrowRight, Sparkles, HeartPulse, User } from 'lucide-react';
import { Album, Playlist } from '../types';

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
      <div className="relative w-full rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-[#17153B]/60 via-[#2E236C]/40 to-[#433D8B]/10 border border-purple-500/20 overflow-hidden shadow-[0_4px_30px_rgba(132,43,210,0.15)] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#A855F7]/10 rounded-full blur-[60px] -z-10" />
        <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-[#EC4899]/10 rounded-full blur-[40px] -z-10" />

        <div className="flex flex-col gap-1.5 z-10">
          <div className="flex items-center gap-2 text-purple-300 text-xs font-mono font-medium tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Portal del Estudiante • UAC</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-semibold text-white tracking-tight">
            ¡Hola de nuevo, <span className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">{userName}</span>!
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm max-w-lg font-sans">
            Explora el catálogo premium oficial de MusicStore Web. Obtén facturas en tiempo real y gestiona tus playlists.
          </p>
        </div>

        <div className="flex gap-3 bg-[#080d1a]/60 backdrop-blur-md p-4 rounded-2xl border border-purple-500/10 self-stretch sm:self-auto items-center">
          <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
            <User className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-white text-xs font-bold font-mono">Socio Platinum</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <p className="text-gray-400 text-xxs">ID: #C-8239 • Cusco, PE</p>
          </div>
        </div>
      </div>

      {/* Dynamic Summary Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1 */}
        <div className="bg-[#0F172A]/50 border border-purple-500/10 p-5 rounded-2xl flex flex-col gap-2 relative group hover:border-[#A855F7]/30 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
          <div className="flex justify-between items-center text-gray-400">
            <span className="text-xs font-medium uppercase tracking-wider font-mono">Total Gastado</span>
            <div className="p-2 bg-purple-500/10 rounded-xl text-purple-400 group-hover:bg-purple-500/20 transition-colors">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <span className="text-xl sm:text-2xl font-bold font-display text-white">
            S/. {totalSpent.toFixed(2)}
          </span>
          <p className="text-[10px] text-purple-300 flex items-center gap-1">
            <span>• Cuenta Premium Soles</span>
          </p>
        </div>

        {/* Metric 2 */}
        <div className="bg-[#0F172A]/50 border border-purple-500/10 p-5 rounded-2xl flex flex-col gap-2 relative group hover:border-[#A855F7]/30 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
          <div className="flex justify-between items-center text-gray-400">
            <span className="text-xs font-medium uppercase tracking-wider font-mono">Canciones</span>
            <div className="p-2 bg-pink-500/10 rounded-xl text-pink-400 group-hover:bg-pink-500/20 transition-colors">
              <Music className="w-4 h-4" />
            </div>
          </div>
          <span className="text-xl sm:text-2xl font-bold font-display text-white">
            23 Canciones
          </span>
          <p className="text-[10px] text-pink-300">
            • En tus Playlists activas
          </p>
        </div>

        {/* Metric 3 */}
        <div className="bg-[#0F172A]/50 border border-purple-500/10 p-5 rounded-2xl flex flex-col gap-2 relative group hover:border-[#A855F7]/30 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
          <div className="flex justify-between items-center text-gray-400">
            <span className="text-xs font-medium uppercase tracking-wider font-mono">Mis Playlists</span>
            <div className="p-2 bg-indigo-500/10 rounded-xl text-indigo-400 group-hover:bg-indigo-500/20 transition-colors">
              <Disc className="w-4 h-4 animate-spin-slow" />
            </div>
          </div>
          <span className="text-xl sm:text-2xl font-bold font-display text-white">
            {playlists.length} Playlists
          </span>
          <p className="text-[10px] text-indigo-300">
            • Sincronizadas localmente
          </p>
        </div>

        {/* Metric 4 */}
        <div className="bg-[#0F172A]/50 border border-purple-500/10 p-5 rounded-2xl flex flex-col gap-2 relative group hover:border-[#A855F7]/30 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
          <div className="flex justify-between items-center text-gray-400">
            <span className="text-xs font-medium uppercase tracking-wider font-mono">Nivel de Socio</span>
            <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-400 group-hover:bg-emerald-500/20 transition-colors">
              <HeartPulse className="w-4 h-4" />
            </div>
          </div>
          <span className="text-xl sm:text-2xl font-bold font-display text-white">
            PLATINUM
          </span>
          <p className="text-[10px] text-emerald-300 flex items-center gap-1">
            <span>• 3 cupones disponibles</span>
          </p>
        </div>
      </div>

      {/* Popular Genres Row */}
      <div className="flex flex-col gap-4">
        <div>
          <h3 className="text-lg font-display font-medium text-white">Géneros Populares</h3>
          <p className="text-gray-400 text-xs">Acceso directo para filtrar y descubrir el ritmo ideal</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          <button
            onClick={() => onNavigateToCatalog('Reggaetón')}
            className="group relative h-28 rounded-2xl overflow-hidden text-left border border-purple-500/10 hover:border-purple-500/30 transition-all hover:-translate-y-1 shadow-lg cursor-pointer"
          >
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.2),rgba(13,13,26,0.9))] z-10" />
            <img
              src="https://images.unsplash.com/photo-1484876065684-b683cf17d276?w=500&q=80"
              alt="Reggaetón"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute bottom-4 left-4 z-20">
              <span className="text-white text-md font-bold block font-display tracking-wide drop-shadow-md">Reggaetón 🔥</span>
              <span className="text-purple-300 text-xxs block font-mono">Ver 4 Álbumes</span>
            </div>
          </button>

          <button
            onClick={() => onNavigateToCatalog('Rock Latino')}
            className="group relative h-28 rounded-2xl overflow-hidden text-left border border-purple-500/10 hover:border-purple-500/30 transition-all hover:-translate-y-1 shadow-lg cursor-pointer"
          >
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.2),rgba(13,13,26,0.9))] z-10" />
            <img
              src="https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=500&q=80"
              alt="Rock Latino"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute bottom-4 left-4 z-20">
              <span className="text-white text-md font-bold block font-display tracking-wide drop-shadow-md">Rock Latino 🎸</span>
              <span className="text-purple-300 text-xxs block font-mono">Ver Canciones Clásicas</span>
            </div>
          </button>

          <button
            onClick={() => onNavigateToCatalog('Salsa')}
            className="group relative h-28 rounded-2xl overflow-hidden text-left border border-purple-500/10 hover:border-purple-500/30 transition-all hover:-translate-y-1 shadow-lg cursor-pointer"
          >
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.2),rgba(13,13,26,0.9))] z-10" />
            <img
              src="https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=500&q=80"
              alt="Salsa"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute bottom-4 left-4 z-20">
              <span className="text-white text-md font-bold block font-display tracking-wide drop-shadow-md">Salsa & Caribe 💃</span>
              <span className="text-purple-300 text-xxs block font-mono">Ver Listados</span>
            </div>
          </button>
        </div>
      </div>

      {/* Latam Trends: Horizontal Scroll list of albums */}
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-end">
          <div>
            <h3 className="text-lg font-display font-medium text-white">Novedades Latinas</h3>
            <p className="text-gray-400 text-xs">Álbumes que lideran las listas esta semana</p>
          </div>
          <button
            onClick={() => onNavigateToCatalog()}
            className="text-xs text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1.5 font-medium group"
          >
            <span>Ver todo el catálogo</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {trendingAlbums.map((album) => (
            <div
              key={album.id}
              className="bg-[#0F172A]/40 border border-purple-500/10 rounded-2xl p-4 flex flex-col gap-3 group hover:border-[#A855F7]/30 transition-all relative"
            >
              <div className="absolute top-6 left-6 z-20 pointer-events-none">
                <span className="bg-purple-600/90 text-white text-[9px] font-bold font-mono px-2 py-0.5 rounded-full uppercase tracking-wider backdrop-blur-md shadow-lg">
                  TENDENCIA
                </span>
              </div>

              {/* Cover with Play hover filter overlay */}
              <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-slate-800">
                <img
                  src={album.coverUrl}
                  alt={album.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-[#080d1a]/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    onClick={() => onSelectAlbum(album)}
                    className="p-3 bg-purple-600 text-white rounded-full hover:scale-110 transition-transform duration-200 shadow-lg cursor-pointer"
                  >
                    <Play className="w-5 h-5 fill-white ml-0.5" />
                  </button>
                </div>
              </div>

              {/* Text metadata */}
              <div className="flex flex-col gap-1 min-h-[50px]">
                <h4
                  onClick={() => onSelectAlbum(album)}
                  className="text-white text-xs sm:text-sm font-semibold truncate hover:text-purple-400 transition-colors cursor-pointer"
                  title={album.title}
                >
                  {album.title}
                </h4>
                <p className="text-gray-400 text-xxs truncate">{album.artist}</p>
              </div>

              {/* Purchase summary banner info */}
              <div className="flex justify-between items-center pt-2 border-t border-purple-500/10">
                <span className="text-purple-300 text-xs font-mono font-semibold">
                  S/. {album.price.toFixed(2)}
                </span>
                <button
                  onClick={() => onSelectAlbum(album)}
                  className="text-[10px] text-white bg-purple-600/20 hover:bg-purple-600/40 border border-purple-500/20 px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer"
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
        <h3 className="text-lg font-display font-medium text-white">Listas recomendadas para hoy</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {playlists.map((pl) => (
            <button
              key={pl.id}
              onClick={() => onSelectPlaylistIndex(pl.id)}
              className="p-4 bg-[#0F172A]/30 border border-purple-500/10 hover:border-[#A855F7]/30 text-left rounded-2xl flex items-center gap-4 transition-all hover:-translate-y-0.5 group cursor-pointer"
            >
              <div className="w-12 h-12 bg-purple-500/10 text-white rounded-xl flex items-center justify-center text-xl group-hover:bg-purple-500/20 border border-purple-500/15">
                {pl.emoji}
              </div>
              <div className="flex-1 overflow-hidden">
                <span className="text-white text-sm font-semibold truncate block group-hover:text-purple-300 transition-colors">{pl.name}</span>
                <span className="text-gray-400 text-xxs">{pl.trackCount} temas • {pl.duration}</span>
              </div>
              <Play className="w-4 h-4 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity ml-2" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
