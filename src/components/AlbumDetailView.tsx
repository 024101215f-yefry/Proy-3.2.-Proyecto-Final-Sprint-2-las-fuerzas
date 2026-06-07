import React, { useState } from 'react';
import { ArrowLeft, Play, Disc, Sparkles, Check, ChevronDown, PlusCircle, CreditCard, ShoppingBag, Radio } from 'lucide-react';
import { Album, Track, Playlist } from '../types';

interface AlbumDetailViewProps {
  album: Album;
  playlists: Playlist[];
  onBack: () => void;
  onPlayTrack: (track: Track, coverUrl: string) => void;
  onBuyAlbum: (album: Album) => void;
  onAddTrackToPlaylist: (playlistId: string, track: Track) => void;
  onAddAlbumToPlaylist: (playlistId: string, album: Album) => void;
  purchasedAlbumIdList: string[];
}

export default function AlbumDetailView({
  album,
  playlists,
  onBack,
  onPlayTrack,
  onBuyAlbum,
  onAddTrackToPlaylist,
  onAddAlbumToPlaylist,
  purchasedAlbumIdList,
}: AlbumDetailViewProps) {
  const [successMsg, setSuccessMsg] = useState('');
  const [activeDropdownIndex, setActiveDropdownIndex] = useState<number | null>(null); // track tracks dropdowns
  const [albumDropdownOpen, setAlbumDropdownOpen] = useState(false);

  const isPurchased = purchasedAlbumIdList.includes(album.id);

  const handleBuy = () => {
    onBuyAlbum(album);
    setSuccessMsg('¡Álbum adquirido con éxito! Factura emitida e incorporada a tu historial.');
    setTimeout(() => setSuccessMsg(''), 5000);
  };

  const handleAddTrack = (playlistId: string, track: Track, index: number) => {
    onAddTrackToPlaylist(playlistId, track);
    setActiveDropdownIndex(null);
    setSuccessMsg(`"${track.title}" agregada con éxito de forma local.`);
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  const handleAddAlbumPlaylist = (playlistId: string) => {
    onAddAlbumToPlaylist(playlistId, album);
    setAlbumDropdownOpen(false);
    setSuccessMsg(`Se agregaron todos los temas de "${album.title}" a la playlist.`);
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  return (
    <div className="w-full flex flex-col gap-6 animate-fadeIn">
      
      {/* Back button link */}
      <div>
        <button
          onClick={onBack}
          className="text-gray-400 hover:text-white text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al Catálogo
        </button>
      </div>

      {successMsg && (
        <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 p-4 rounded-xl text-xs flex items-center gap-2.5 animate-bounce-short">
          <Check className="w-4.5 h-4.5 bg-emerald-500/20 p-0.5 rounded-full" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Main Album Header Card */}
      <div className="bg-[#0F172A]/70 border border-purple-500/10 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row gap-6 items-center md:items-start relative overflow-hidden">
        <div className="absolute top-[-30%] right-[-10%] w-[40%] h-[60%] rounded-full bg-purple-600/10 blur-[100px]" />
        
        {/* Large rotating/pulsing cover */}
        <div className="w-48 sm:w-56 aspect-square rounded-2xl overflow-hidden shrink-0 bg-slate-800 shadow-[0_0_30px_rgba(132,43,210,0.25)] border border-purple-500/20">
          <img
            src={album.coverUrl}
            alt={album.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Text descriptions */}
        <div className="flex-1 flex flex-col gap-4 self-stretch justify-between relative z-10 text-center md:text-left">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-xxs font-mono uppercase tracking-widest text-[#ddb7ff] justify-center md:justify-start">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{album.genre} • Lanzado en {album.year}</span>
            </div>
            
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-display font-semibold text-white tracking-tight leading-tight">
              {album.title}
            </h1>
            
            <p className="text-gray-300 text-sm font-medium">
              Por <span className="text-[#ffb0cd] font-semibold">{album.artist}</span> • {album.country}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 justify-center md:justify-start pt-3 border-t border-purple-500/10">
            {/* Purchase Control */}
            {isPurchased ? (
              <span className="bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 py-2.5 px-5 rounded-xl text-xs font-semibold flex items-center gap-2">
                <Check className="w-4 h-4" />
                Álbum Adquirido
              </span>
            ) : (
              <button
                onClick={handleBuy}
                className="bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-95 text-white py-2.5 px-5 rounded-xl text-xs font-semibold shadow-lg shadow-purple-500/20 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                Comprar álbum completo (S/. {album.price.toFixed(2)})
              </button>
            )}

            {/* Add whole album to custom user playlist */}
            <div className="relative">
              <button
                onClick={() => setAlbumDropdownOpen(!albumDropdownOpen)}
                className="bg-[#1e293b]/70 border border-purple-500/15 hover:border-purple-500/30 text-white py-2.5 px-4 rounded-xl text-xs font-medium transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer"
              >
                <span>Sincronizar a Playlist</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {albumDropdownOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-[#0b0f19] border border-purple-500/20 rounded-xl py-1.5 shadow-2xl z-20">
                  <span className="block px-3 py-1 text-[9px] uppercase tracking-wider font-mono text-gray-500">
                    Elegir Destino
                  </span>
                  {playlists.map((pl) => (
                    <button
                      key={pl.id}
                      onClick={() => handleAddAlbumPlaylist(pl.id)}
                      className="w-full text-left px-3 py-2 text-xs text-gray-300 hover:bg-purple-600/20 hover:text-white transition-colors flex items-center gap-1.5"
                    >
                      <span>{pl.emoji}</span>
                      <span className="truncate">{pl.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tracklist List */}
      <div className="flex flex-col gap-4">
        <div>
          <h2 className="text-md sm:text-lg font-display font-medium text-white">Lista de Temas</h2>
          <p className="text-gray-400 text-xs">Reproduce canciones individuales o agrégalas a tus listas de reproducción personales</p>
        </div>

        <div className="bg-[#0F172A]/40 border border-purple-500/10 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-purple-500/10 bg-[#080d1a]/50 text-gray-400 font-mono text-xxs uppercase tracking-wider">
                  <th className="py-3.5 px-4 text-center w-12">#</th>
                  <th className="py-3.5 px-4">Título</th>
                  <th className="py-3.5 px-4 hidden md:table-cell">Artista/Colaboradores</th>
                  <th className="py-3.5 px-4 text-center w-20">Duración</th>
                  <th className="py-3.5 px-4 text-right w-24">Precio</th>
                  <th className="py-3.5 px-4 text-center w-28">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-500/5">
                {album.tracks.map((track, i) => (
                  <tr
                    key={track.id}
                    className="hover:bg-purple-500/5 group/row transition-colors"
                  >
                    {/* Index or Play trigger hover */}
                    <td className="py-3.5 px-4 text-center text-gray-500 font-mono relative">
                      <span className="group-hover/row:opacity-0 transition-opacity">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <button
                        onClick={() => onPlayTrack(track, album.coverUrl)}
                        className="absolute inset-0 m-auto w-7 h-7 bg-purple-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity transform active:scale-95 cursor-pointer"
                      >
                        <Play className="w-3 h-3 fill-white ml-0.5" />
                      </button>
                    </td>

                    {/* Title */}
                    <td className="py-3.5 px-4">
                      <div className="font-medium text-white group-hover/row:text-purple-300 transition-colors">
                        {track.title}
                      </div>
                      <div className="text-gray-400 text-xxs md:hidden mt-0.5">
                        {track.artist}
                      </div>
                    </td>

                    {/* Artists Collaboration */}
                    <td className="py-3.5 px-4 text-gray-300 hidden md:table-cell">
                      {track.artist}
                    </td>

                    {/* Duration */}
                    <td className="py-3.5 px-4 text-center font-mono text-gray-400">
                      {track.duration}
                    </td>

                    {/* Price in Soles */}
                    <td className="py-3.5 px-4 text-right font-mono text-purple-300">
                      S/. {track.price.toFixed(2)}
                    </td>

                    {/* Actions panel */}
                    <td className="py-3.5 px-4 text-center relative">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => onPlayTrack(track, album.coverUrl)}
                          className="p-1 px-2.5 bg-purple-600/20 hover:bg-purple-600/40 text-purple-200 text-xxs rounded-lg font-mono border border-purple-500/20 hover:border-purple-500/40 transition-all cursor-pointer"
                        >
                          Sonar
                        </button>

                        <div className="relative">
                          <button
                            onClick={() => {
                              setActiveDropdownIndex(activeDropdownIndex === i ? null : i);
                            }}
                            className="p-1 rounded-lg text-gray-400 hover:text-white transition-colors cursor-pointer"
                            title="Agregar a..."
                          >
                            <PlusCircle className="w-4 h-4" />
                          </button>

                          {activeDropdownIndex === i && (
                            <div className="absolute right-0 mt-2 w-48 bg-[#0b0f19] border border-purple-500/20 rounded-xl py-1.5 shadow-2xl z-30">
                              <span className="block px-3 py-1 text-[9px] uppercase tracking-wider font-mono text-gray-500">
                                Guardar en playlist
                              </span>
                              {playlists.map((pl) => (
                                <button
                                  key={pl.id}
                                  onClick={() => handleAddTrack(pl.id, track, i)}
                                  className="w-full text-left px-3 py-2 text-xs text-gray-300 hover:bg-purple-600/20 hover:text-white transition-colors flex items-center gap-1.5"
                                >
                                  <span>{pl.emoji}</span>
                                  <span className="truncate">{pl.name}</span>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
