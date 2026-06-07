import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Filter, X, Disc, Play, Globe, Sparkles } from 'lucide-react';
import { Album } from '../types';

interface ClientCatalogoProps {
  albums: Album[];
  onSelectAlbum: (album: Album) => void;
  initialGenreFilter?: string;
}

export default function ClientCatalogo({ albums, onSelectAlbum, initialGenreFilter = '' }: ClientCatalogoProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState(initialGenreFilter);
  const [priceMax, setPriceMax] = useState(100);
  const [selectedCountry, setSelectedCountry] = useState<string>('Todos');

  // Sync initial genre filter changes
  React.useEffect(() => {
    setSelectedGenre(initialGenreFilter);
  }, [initialGenreFilter]);

  // Extract unique genres & countries
  const genres = useMemo(() => {
    const list = new Set(albums.map((a) => a.genre));
    return ['Todos', ...Array.from(list)];
  }, [albums]);

  const countries = useMemo(() => {
    const list = new Set(albums.map((a) => a.country));
    return ['Todos', ...Array.from(list)];
  }, [albums]);

  // Clean filters
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedGenre('Todos');
    setPriceMax(100);
    setSelectedCountry('Todos');
  };

  const filteredAlbums = useMemo(() => {
    return albums.filter((album) => {
      const matchSearch =
        album.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        album.artist.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchGenre = selectedGenre === 'Todos' || !selectedGenre || album.genre === selectedGenre;
      const matchCountry = selectedCountry === 'Todos' || album.country === selectedCountry;
      const matchPrice = album.price <= priceMax;

      return matchSearch && matchGenre && matchCountry && matchPrice;
    });
  }, [albums, searchQuery, selectedGenre, selectedCountry, priceMax]);

  return (
    <div className="w-full flex flex-col gap-6 animate-fadeIn">
      
      {/* Top Search bar wrapper */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-display font-medium text-white mb-0.5">Catálogo Digital</h2>
          <p className="text-gray-400 text-xs">Busca y adquiere pistas premium con licencias válidas</p>
        </div>

        {/* Real-time search controller */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-purple-400/80" />
          <input
            type="text"
            placeholder="Buscar por álbum o artista..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0F172A]/70 border border-purple-500/15 rounded-xl py-2.5 pl-11 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all shadow-md focus:ring-1 focus:ring-purple-500/25"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        
        {/* Left Side Filter drawer box */}
        <div className="w-full lg:w-64 bg-[#0F172A]/60 border border-purple-500/10 rounded-2xl p-5 sticky top-24 shrink-0 flex flex-col gap-5 backdrop-blur-xl">
          <div className="flex justify-between items-center pb-3 border-b border-purple-500/10">
            <span className="text-white text-xs font-mono font-semibold flex items-center gap-1.5 uppercase">
              <SlidersHorizontal className="w-4 h-4 text-purple-400" />
              Filtros Avanzados
            </span>
            <button
              onClick={resetFilters}
              className="text-xxs text-pink-400 hover:text-pink-300 transition-colors uppercase font-mono"
            >
              Limpiar
            </button>
          </div>

          {/* Genre interactive lists */}
          <div className="flex flex-col gap-2">
            <label className="text-gray-400 text-xxs font-mono uppercase tracking-widest block">Géneros</label>
            <div className="flex flex-wrap lg:flex-col gap-1.5">
              {genres.map((g) => {
                const isActive = selectedGenre === g || (g === 'Todos' && !selectedGenre);
                return (
                  <button
                    key={g}
                    onClick={() => setSelectedGenre(g === 'Todos' ? '' : g)}
                    className={`px-3 py-1.5 rounded-lg text-left text-xs transition-all w-fit lg:w-full cursor-pointer ${
                      isActive
                        ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30'
                        : 'bg-transparent text-gray-400 hover:bg-purple-500/5 hover:text-white border border-transparent'
                    }`}
                  >
                    {g}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Max Price Slider */}
          <div className="flex flex-col gap-2.5 pt-2 border-t border-purple-500/10">
            <div className="flex justify-between items-center text-xxs font-mono uppercase tracking-widest text-gray-400">
              <span>Precio Máximo</span>
              <span className="text-purple-300 font-bold">S/. {priceMax}.00</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              value={priceMax}
              onChange={(e) => setPriceMax(Number(e.target.value))}
              className="w-full h-1 bg bg-[#1d2433] rounded-lg appearance-none cursor-pointer accent-[#ddb7ff]"
            />
            <div className="flex justify-between items-center text-[10px] text-gray-500">
              <span>S/. 10</span>
              <span>S/. 100</span>
            </div>
          </div>

          {/* Origin Country check list */}
          <div className="flex flex-col gap-2 pt-2 border-t border-purple-500/10">
            <label className="text-gray-400 text-xxs font-mono uppercase tracking-widest block">País de Origen</label>
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-full bg-[#1e293b]/50 border border-purple-500/15 rounded-lg px-2.5 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
            >
              {countries.map((c) => (
                <option key={c} value={c} className="bg-[#0b0f19]">
                  {c === 'Todos' ? 'Cualquier país' : c}
                </option>
              ))}
            </select>
          </div>

          {/* Decorative tag informational */}
          <div className="bg-purple-500/5 border border-purple-500/10 p-3 rounded-xl flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
            <span className="text-[10px] text-purple-200/80 leading-relaxed font-sans">
              Cada compra de álbum genera un comprobante de pago oficial emitido automáticamente.
            </span>
          </div>
        </div>

        {/* Right side Album Card lists */}
        <div className="flex-1 w-full">
          {filteredAlbums.length === 0 ? (
            <div className="w-full py-16 text-center border border-dashed border-purple-500/15 rounded-3xl bg-[#0F172A]/20 flex flex-col items-center justify-center gap-3">
              <Disc className="w-12 h-12 text-gray-500 animate-spin-slow" />
              <h3 className="text-white text-md font-medium font-display">Sin resultados para tu búsqueda</h3>
              <p className="text-gray-400 text-xs max-w-sm">
                No encontramos álbumes que coincidan con los filtros seleccionados. Intenta restablecer los parámetros.
              </p>
              <button
                onClick={resetFilters}
                className="mt-2 bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500/30 px-4 py-2 rounded-xl text-xs text-white cursor-pointer"
              >
                Limpiar Filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
              {filteredAlbums.map((album) => (
                <div
                  key={album.id}
                  className="bg-[#0F172A]/40 border border-purple-500/10 rounded-2xl p-4 flex flex-col gap-3 group hover:border-[#A855F7]/30 hover:shadow-[0_4px_25px_rgba(168,85,247,0.08)] transition-all duration-300 relative"
                >
                  {album.isTrending && (
                    <span className="absolute top-6 left-6 z-10 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-[8px] font-bold font-mono px-2 py-0.5 rounded-full uppercase tracking-wider shadow-md">
                      TENDENCIA
                    </span>
                  )}

                  {/* Album Card cover image */}
                  <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-slate-800">
                    <img
                      src={album.coverUrl}
                      alt={album.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-[#080d1a]/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        onClick={() => onSelectAlbum(album)}
                        className="p-3.5 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full hover:scale-110 transition-transform duration-200 shadow-xl cursor-pointer"
                      >
                        <Play className="w-5 h-5 fill-white ml-0.5" />
                      </button>
                    </div>
                  </div>

                  {/* Title & info description */}
                  <div className="flex flex-col gap-1 min-h-[50px]">
                    <h3
                      onClick={() => onSelectAlbum(album)}
                      className="text-white text-xs sm:text-sm font-semibold truncate hover:text-purple-400 transition-colors cursor-pointer"
                      title={album.title}
                    >
                      {album.title}
                    </h3>
                    <p className="text-gray-400 text-xxs flex justify-between items-center gap-1">
                      <span className="truncate">{album.artist}</span>
                      <span className="text-gray-500 shrink-0">{album.year}</span>
                    </p>
                  </div>

                  {/* Flag row + direct detail routing */}
                  <div className="flex items-center justify-between text-xxs text-gray-400 pt-2 border-t border-purple-500/10">
                    <span className="flex items-center gap-1 font-mono">
                      <Globe className="w-3 h-3 text-purple-400/80" />
                      {album.country}
                    </span>
                    <span className="text-gray-500">{album.genre}</span>
                  </div>

                  <div className="flex justify-between items-center mt-1">
                    <span className="text-purple-300 text-xs font-mono font-semibold">
                      S/. {album.price.toFixed(2)}
                    </span>
                    <button
                      onClick={() => onSelectAlbum(album)}
                      className="text-[10px] text-white bg-purple-600/20 hover:bg-purple-600/40 border border-purple-500/20 px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer"
                    >
                      Ver Álbum
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
