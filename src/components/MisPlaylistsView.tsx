import React, { useState } from 'react';
import { Plus, ListMusic, Play, Trash2, HelpCircle, AlertCircle, Sparkles, Check } from 'lucide-react';
import { Playlist, Track } from '../types';

interface MisPlaylistsViewProps {
  playlists: Playlist[];
  selectedPlaylistId: string;
  onSelectPlaylistId: (id: string) => void;
  onCreatePlaylist: (name: string, emoji: string) => void;
  onDeletePlaylist: (id: string) => void;
  onRemoveTrackFromPlaylist: (playlistId: string, trackId: string) => void;
  onPlayTrack: (track: Track) => void;
}

export default function MisPlaylistsView({
  playlists,
  selectedPlaylistId,
  onSelectPlaylistId,
  onCreatePlaylist,
  onDeletePlaylist,
  onRemoveTrackFromPlaylist,
  onPlayTrack,
}: MisPlaylistsViewProps) {
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [newPlaylistEmoji, setNewPlaylistEmoji] = useState('🎶');
  const [isCreating, setIsCreating] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const currentPlaylist = playlists.find((p) => p.id === selectedPlaylistId) || playlists[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlaylistName.trim()) return;

    onCreatePlaylist(newPlaylistName.trim(), newPlaylistEmoji);
    setNewPlaylistName('');
    setIsCreating(false);
    setSuccessMsg('¡Nueva playlist creada con éxito localmente!');
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  const handlePlayAll = () => {
    if (currentPlaylist && currentPlaylist.tracks.length > 0) {
      onPlayTrack(currentPlaylist.tracks[0]);
    }
  };

  const emojiList = ['🔥', '💃', '🎸', '🌙', '🎶', '⚡', '🎧', '👾', '🌈', '🥂', '🔮'];

  return (
    <div className="w-full flex flex-col gap-6 animate-fadeIn">
      
      {/* View Headers */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-display font-semibold text-[#0F172A] mb-0.5">Mis Playlists</h2>
          <p className="text-[#64748B] text-xs">Organiza, reproduce y sincroniza tus listas de pistas preferidas</p>
        </div>

        <button
          onClick={() => setIsCreating(!isCreating)}
          className="bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-95 text-white px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Nueva Playlist</span>
        </button>
      </div>

      {successMsg && (
        <div className="bg-emerald-50 border border-emerald-100 text-emerald-800 p-4 rounded-xl text-xs flex items-center gap-2.5">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Playlist Creation Inline Form */}
      {isCreating && (
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-purple-100 p-5 rounded-2xl flex flex-col gap-4 animate-fadeIn shadow-sm"
        >
          <div className="flex items-center gap-2 pb-2 border-b border-purple-100">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <h3 className="text-[#0F172A] text-xs font-mono font-bold uppercase">Configurar Nueva Playlist</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col gap-1.5 col-span-2">
              <label className="text-[#64748B] text-xxs font-mono uppercase tracking-wider font-semibold">Nombre de la Playlist</label>
              <input
                type="text"
                value={newPlaylistName}
                onChange={(e) => setNewPlaylistName(e.target.value)}
                placeholder="Ej. Reggaeton Antiguo, Lofi para Estudiar..."
                className="w-full bg-white border border-purple-100 focus:border-purple-300 rounded-xl px-4 py-2.5 text-sm text-[#0F172A] outline-none"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[#64748B] text-xxs font-mono uppercase tracking-wider font-semibold">Emoji Icono</label>
              <div className="flex gap-1 overflow-x-auto pb-1 max-w-full">
                {emojiList.map((em) => (
                  <button
                    key={em}
                    type="button"
                    onClick={() => setNewPlaylistEmoji(em)}
                    className={`p-2 rounded-lg text-lg aspect-square transition-all ${
                      newPlaylistEmoji === em ? 'bg-purple-100 border border-purple-300 text-purple-700 font-bold scale-105' : 'bg-slate-50 border border-slate-100 hover:bg-slate-100 text-[#0F172A]'
                    }`}
                  >
                    {em}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-1">
            <button
              type="button"
              onClick={() => setIsCreating(false)}
              className="text-slate-400 hover:text-slate-600 px-4 py-2 text-xs font-semibold"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl text-xs font-semibold"
            >
              Crear Playlist
            </button>
          </div>
        </form>
      )}

      {/* Main Grid View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Side Playlists Navigation sidebar drawer */}
        <div className="lg:col-span-4 flex flex-col gap-3">
          <span className="text-[#64748B] text-xxs font-mono uppercase tracking-widest px-1 font-semibold">Tus Listas ({playlists.length})</span>
          
          <div className="flex flex-col gap-2">
            {playlists.map((pl) => {
              const worksActive = pl.id === selectedPlaylistId;
              return (
                <div
                  key={pl.id}
                  className={`group/item flex items-center justify-between rounded-xl p-3 border transition-all ${
                    worksActive
                      ? 'bg-purple-50 border-purple-200 text-purple-950 shadow-sm'
                      : 'bg-white border border-purple-100/50 text-[#334155] hover:border-purple-200 hover:bg-purple-50/20'
                  }`}
                >
                  <button
                    onClick={() => onSelectPlaylistId(pl.id)}
                    className="flex-1 flex items-center gap-3 text-left cursor-pointer"
                  >
                    <div className="w-10 h-10 bg-purple-50 text-xl flex items-center justify-center rounded-lg border border-purple-100">
                      {pl.emoji}
                    </div>
                    <div className="overflow-hidden">
                      <span className="font-semibold text-xs sm:text-sm block truncate pr-2 text-[#0F172A]">{pl.name}</span>
                      <span className="text-[#64748B] text-xxs block">{pl.tracks.length} temas integrados</span>
                    </div>
                  </button>

                  <button
                    onClick={() => onDeletePlaylist(pl.id)}
                    className="p-1 px-1.5 opacity-0 group-hover/item:opacity-100 text-slate-400 hover:text-pink-600 transition-all rounded-lg hover:bg-pink-50 cursor-pointer"
                    title="Eliminar Playlist"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right side Detail List display */}
        <div className="lg:col-span-8 bg-white border border-purple-100 rounded-2xl p-5 sm:p-6 shadow-sm">
          {currentPlaylist ? (
            <div className="flex flex-col gap-5">
              
              {/* Selected Playlist Meta row */}
              <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start gap-4 pb-4 border-b border-purple-100">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
                  <div className="w-16 h-16 rounded-xl bg-purple-50 flex items-center justify-center text-4xl border border-purple-100">
                    {currentPlaylist.emoji}
                  </div>
                  <div>
                    <h3 className="text-[#0F172A] text-base sm:text-lg font-bold font-display">{currentPlaylist.name}</h3>
                    <p className="text-[#64748B] text-xs mt-0.5">
                      Contiene {currentPlaylist.tracks.length} pistas de audio • Sincronización local activa
                    </p>
                  </div>
                </div>

                {currentPlaylist.tracks.length > 0 && (
                  <button
                    onClick={handlePlayAll}
                    className="p-2.5 px-5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    <span>Reproducir Todo</span>
                  </button>
                )}
              </div>

              {/* Table of Songs */}
              {currentPlaylist.tracks.length === 0 ? (
                <div className="py-12 text-center text-[#64748B] flex flex-col items-center justify-center gap-2">
                  <ListMusic className="w-10 h-10 text-purple-400 animate-pulse" />
                  <p className="text-xs font-semibold text-[#0F172A]">Esta playlist está vacía</p>
                  <p className="text-xxs text-[#64748B] max-w-xs">
                    Busca canciones en el Catálogo, haz clic en el icono "más" al lado de cada tema, y agrégalas aquí.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm bg-white">
                    <thead>
                      <tr className="border-b border-purple-100 bg-[#FBFBFF] text-[#475569] font-mono text-xxs uppercase tracking-wider">
                        <th className="py-3 px-3 w-10 text-center">#</th>
                        <th className="py-3 px-3">Título</th>
                        <th className="py-3 px-3 hidden sm:table-cell">Artista</th>
                        <th className="py-3 px-3 text-center w-16">Dur.</th>
                        <th className="py-3 px-3 text-right">Precio</th>
                        <th className="py-3 px-3 text-center w-16"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-purple-50/50">
                      {currentPlaylist.tracks.map((tr, index) => (
                        <tr key={tr.id} className="hover:bg-purple-50/20 group/row animate-fadeIn">
                          <td className="py-3 px-3 text-center text-slate-400 font-mono">
                            {String(index + 1).padStart(2, '0')}
                          </td>
                          <td className="py-3 px-3">
                            <span className="font-semibold text-[#0F172A] group-hover/row:text-purple-700 transition-colors block text-xs sm:text-sm">
                              {tr.title}
                            </span>
                            <span className="text-[#64748B] text-xxs sm:hidden block mt-0.5">{tr.artist}</span>
                          </td>
                          <td className="py-3 px-3 text-[#334155] font-medium hidden sm:table-cell">{tr.artist}</td>
                          <td className="py-3 px-3 text-center text-[#64748B] font-mono">{tr.duration}</td>
                          <td className="py-3 px-3 text-right text-purple-700 font-bold font-mono">
                            S/. {tr.price.toFixed(2)}
                          </td>
                          <td className="py-3 px-3 text-center">
                            <div className="flex justify-center items-center gap-1.5">
                              <button
                                onClick={() => onPlayTrack(tr)}
                                className="p-1 px-2.5 bg-purple-50 hover:bg-purple-100 rounded text-xxs text-purple-700 font-semibold cursor-pointer border border-purple-100"
                              >
                                Oír
                              </button>
                              <button
                                onClick={() => onRemoveTrackFromPlaylist(currentPlaylist.id, tr.id)}
                                className="p-1.5 text-slate-400 hover:text-pink-600 transition-colors hover:bg-pink-50 rounded"
                                title="Eliminar de playlist"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12 text-[#64748B]">
              <AlertCircle className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <span>Selecciona una playlist a la izquierda</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
