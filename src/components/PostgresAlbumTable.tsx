import React, { useState, useEffect } from 'react';
import { Database, RefreshCw, Search, CheckCircle, AlertTriangle, Disc, Loader2, Server } from 'lucide-react';
import { neon } from '@neondatabase/serverless';

interface PostgresAlbum {
  album_id: number | string;
  title: string;
  artist_id: number | string;
}

export default function PostgresAlbumTable() {
  const [albums, setAlbums] = useState<PostgresAlbum[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  // Load database metadata variables from .env via Vite config
  const dbUrl = import.meta.env.VITE_POSTGRES_URL || '';
  
  let parsedHost = import.meta.env.VITE_POSTGRES_HOST || '';
  let parsedUser = import.meta.env.VITE_POSTGRES_USER || '';
  let parsedName = import.meta.env.VITE_POSTGRES_DATABASE || '';
  
  if (dbUrl && (!parsedHost || !parsedUser || !parsedName)) {
    try {
      // Parse format: postgres://user:password@host/database
      const cleanUrl = dbUrl.replace('postgres://', '').replace('postgresql://', '');
      const [credentialsAndHost, dbAndParams] = cleanUrl.split('/');
      const [credentials, host] = credentialsAndHost.split('@');
      const [user] = credentials.split(':');
      const [dbNameOnly] = dbAndParams.split('?');
      
      if (!parsedHost) parsedHost = host;
      if (!parsedUser) parsedUser = user;
      if (!parsedName) parsedName = dbNameOnly;
    } catch (e) {
      console.error("Error parsing VITE_POSTGRES_URL:", e);
    }
  }

  const dbHost = parsedHost || 'ep-bitter-cloud-ainz249l-pooler.c-4.us-east-1.aws.neon.tech';
  const dbUser = parsedUser || 'neondb_owner';
  const dbName = parsedName || 'neondb';

  const fetchPostgresData = async (manual = false) => {
    if (manual) setIsRefreshing(true);
    else setLoading(true);
    
    setError('');
    let dataLoaded = false;

    // First try: Fetch via Vercel / Express Backend Serverless API (hides secrets, recommended)
    try {
      const response = await fetch('/api/albums');
      if (response.ok) {
        const jsonResult = await response.json();
        if (jsonResult.success && Array.isArray(jsonResult.data)) {
          const parsedData = jsonResult.data.map((row: any) => ({
            album_id: row.album_id ?? row.id ?? '',
            title: row.title ?? '',
            artist_id: row.artist ?? row.artist_id ?? ''
          }));
          setAlbums(parsedData);
          dataLoaded = true;
        }
      }
    } catch (apiErr) {
      console.warn("Could not fetch from serverless API, trying browser direct neon connection:", apiErr);
    }

    // Second try: Client-side direct connection if environment variables exist at runtime in client
    if (!dataLoaded) {
      try {
        const url = import.meta.env.VITE_POSTGRES_URL;
        if (!url) {
          throw new Error('La variable de entorno VITE_POSTGRES_URL no está configurada.');
        }
        const sql = neon(url);
        const data = await sql`SELECT album_id, title, artist_id FROM album LIMIT 20;`;
        
        // Map the results to match our PostgresAlbum interface and ensure any potential formatting issues are structured
        const parsedData = (data || []).map((row: any) => ({
          album_id: row.album_id ?? '',
          title: row.title ?? '',
          artist_id: row.artist_id ?? ''
        }));
        
        setAlbums(parsedData);
      } catch (err: any) {
        console.error("Neon PostgreSQL direct client fetch error:", err);
        setError(
          err.message || 
          'No se pudo establecer conexión con PostgreSQL. Por favor, asegúrate de que el servidor o la API estén activos.'
        );
      }
    }

    setLoading(false);
    setIsRefreshing(false);
  };

  useEffect(() => {
    fetchPostgresData();
  }, []);

  // Filter records in real-time
  const filteredAlbums = albums.filter((album) => {
    const term = searchQuery.toLowerCase();
    return (
      String(album.album_id).toLowerCase().includes(term) ||
      album.title.toLowerCase().includes(term) ||
      String(album.artist_id).toLowerCase().includes(term)
    );
  });

  return (
    <div className="w-full flex flex-col gap-5 bg-white border border-purple-100/80 rounded-3xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden animate-fadeIn">
      {/* Background neon glows */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-[#A855F7]/3 rounded-full blur-[50px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#EC4899]/3 rounded-full blur-[40px] pointer-events-none" />

      {/* Header and status control bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 z-10">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-purple-50 rounded-xl text-purple-600 border border-purple-100 shrink-0">
            <Database className="w-5 h-5 animate-bounce-short" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-display font-semibold text-[#0F172A]">
                Base de Datos PostgreSQL (Tabla: album)
              </h3>
              <span className={`flex items-center gap-1 text-[9px] font-bold font-mono px-2 py-0.5 rounded-full ${
                error 
                  ? 'bg-pink-100 text-pink-700 border border-pink-200' 
                  : 'bg-emerald-100 text-emerald-700 border border-emerald-200'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${error ? 'bg-pink-500' : 'bg-emerald-500 animate-pulse'}`} />
                {error ? 'Desconectado' : 'Conectado Live'}
              </span>
            </div>
            <p className="text-[#64748B] text-xxs mt-0.5 font-sans">
              Consultando remotamente mediante el pooler de Neon con sslmode=require
            </p>
          </div>
        </div>

        <button
          onClick={() => fetchPostgresData(true)}
          disabled={loading || isRefreshing}
          className="bg-purple-50 hover:bg-purple-100/90 border border-purple-200/60 text-xs text-purple-700 font-semibold py-2 px-4 rounded-xl flex items-center gap-2 transition-all active:scale-95 cursor-pointer disabled:opacity-50 select-none shadow-sm"
        >
          {isRefreshing ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin text-purple-600" />
          ) : (
            <RefreshCw className="w-3.5 h-3.5 text-purple-600" />
          )}
          <span>Sincronizar en Tiempo Real</span>
        </button>
      </div>

      {/* Database Connection metadata display to satisfy VITE_POSTGRES_HOST instruction */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-slate-50 border border-slate-100 rounded-2xl p-3.5 font-mono text-[10px] text-[#64748B] z-10">
        <div className="flex items-center gap-2 truncate">
          <Server className="w-3.5 h-3.5 text-purple-600 shrink-0" />
          <span className="text-[#64748B] font-semibold">HOST:</span>
          <span className="text-[#0F172A] truncate" title={dbHost}>{dbHost}</span>
        </div>
        <div className="flex items-center gap-2 truncate">
          <Database className="w-3.5 h-3.5 text-pink-500 shrink-0" />
          <span className="text-[#64748B] font-semibold">DB:</span>
          <span className="text-[#0F172A] truncate" title={dbName}>{dbName}</span>
        </div>
        <div className="flex items-center gap-2 truncate">
          <svg className="w-3.5 h-3.5 text-blue-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0M4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
          </svg>
          <span className="text-[#64748B] font-semibold">USER:</span>
          <span className="text-[#0F172A] truncate" title={dbUser}>{dbUser}</span>
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="relative z-10">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
        <input
          type="text"
          placeholder="Buscar álbum en PostgreSQL por id, título o id de artista..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white border border-purple-100 focus:border-purple-300/80 rounded-xl py-2 px-10 text-xs text-[#0F172A] placeholder-slate-400 focus:outline-none transition-colors shadow-sm"
        />
      </div>

      {/* Main Table Display */}
      <div className="bg-white border border-purple-100/70 rounded-2xl overflow-hidden z-10 shadow-sm">
        {loading ? (
          /* Loading State */
          <div className="w-full py-16 flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
            <p className="text-[#64748B] text-xs font-semibold">Cargando registros de PostgreSQL (Vercel / Neon)...</p>
          </div>
        ) : error ? (
          /* Error feedback card */
          <div className="p-6 flex flex-col items-center gap-3 text-center">
            <AlertTriangle className="w-8 h-8 text-pink-500" />
            <p className="text-pink-600 text-xs max-w-sm font-semibold">{error}</p>
            <p className="text-[#64748B] text-xxs">
              Intenta registrar las variables nuevamente o verifica que la tabla "album" exista en tu base de datos de Vercel/Neon.
            </p>
          </div>
        ) : filteredAlbums.length === 0 ? (
          /* Empty rows display */
          <div className="w-full py-12 text-center text-[#64748B] text-xs">
            <Disc className="w-7 h-7 mx-auto mb-2 text-slate-300 animate-spin-slow" />
            No se encontraron registros de álbumes en PostgreSQL {searchQuery && 'con ese filtro'}.
          </div>
        ) : (
          /* Rich Table Render showing: album_id, title, artist_id */
          <div className="overflow-x-auto text-left">
            <table className="w-full text-left text-xs bg-white">
              <thead>
                <tr className="border-b border-purple-100 bg-[#FBFBFF] text-[#475569] font-mono text-xxxs uppercase tracking-widest">
                  <th className="py-3 px-4 w-28">ALBUM_ID</th>
                  <th className="py-3 px-4">TÍTULO DEL ÁLBUM (TITLE)</th>
                  <th className="py-3 px-4 w-32 text-center">ARTIST_ID</th>
                  <th className="py-3 px-4 w-24 text-center">TIPO</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-50/50">
                {filteredAlbums.map((album, idx) => (
                  <tr key={idx} className="hover:bg-purple-50/20 transition-all group">
                    {/* ID */}
                    <td className="py-3 px-4 font-mono text-xs font-bold text-purple-600">
                      {album.album_id}
                    </td>
                    
                    {/* Title */}
                    <td className="py-3 px-4 text-[#0F172A] font-medium flex items-center gap-2">
                      <Disc className="w-3.5 h-3.5 text-pink-500 shrink-0 group-hover:rotate-45 transition-transform" />
                      <span>{album.title}</span>
                    </td>
                    
                    {/* Artist ID */}
                    <td className="py-3 px-4 text-center font-mono text-[#334155] font-semibold">
                      {album.artist_id}
                    </td>

                    {/* Badge */}
                    <td className="py-3 px-4 text-center">
                      <span className="bg-[#10B981]/15 text-[#047857] border border-[#10B981]/25 font-mono text-[9px] px-2 py-0.5 rounded font-semibold">
                        PG_ROW
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Inline footer details */}
      <div className="flex justify-between items-center text-xxs text-[#64748B] font-mono px-1 z-10">
        <span>Sincronizando mediante Pool Seguro</span>
        <span>{filteredAlbums.length} filas mostradas</span>
      </div>
    </div>
  );
}
