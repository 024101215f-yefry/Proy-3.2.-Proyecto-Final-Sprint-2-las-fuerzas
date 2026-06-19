import React, { useState } from 'react';
import { Sparkles, TrendingUp, Users, ArrowUpRight, ArrowDownRight, Music, Layers, Calendar, ChevronDown, Award } from 'lucide-react';
import { topSoldSongs, recentTransactions } from '../data';
import PostgresAlbumTable from './PostgresAlbumTable';

interface AdminDashboardProps {
  onNavigateToView: (view: string) => void;
}

export default function AdminDashboard({ onNavigateToView }: AdminDashboardProps) {
  const [selectedMonth, setSelectedMonth] = useState('Mayo 2025');
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  const [hoveredSlice, setHoveredSlice] = useState<number | null>(null);

  // Month data simulator multiplier
  const multiplier = selectedMonth === 'Mayo 2025' ? 1 : selectedMonth === 'Abril 2025' ? 0.9 : 0.85;

  const stats = [
    { label: 'Ingresos Totales', value: `S/. ${(12450 * multiplier).toFixed(2)}`, trend: '+12.5%', isUp: true, desc: 'vs mes anterior' },
    { label: 'Clientes Premium', value: Math.floor(145 * multiplier), trend: '+8.2%', isUp: true, desc: 'miembros VIP' },
    { label: 'Canciones Vendidas', value: Math.floor(1240 * multiplier), trend: '+25.0%', isUp: true, desc: 'licencias digitales' },
    { label: 'Tasa Conversión', value: '42.1%', trend: '-1.5%', isUp: false, desc: 'visitas a compras' }
  ];

  return (
    <div className="w-full flex flex-col gap-6 animate-fadeIn">
      
      {/* Upper meta control bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-display font-semibold text-[#0F172A] mb-0.5">Dashboard del Administrador</h2>
          <p className="text-[#64748B] text-xs">Métricas en tiempo real sobre distribución, ingresos y ventas digitales</p>
        </div>

        {/* Dynamic Month Selector */}
        <div className="relative">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="appearance-none bg-white border border-purple-100 text-[#0F172A] text-xs rounded-xl pl-4 pr-10 py-2.5 outline-none focus:border-purple-500 transition-colors w-40 cursor-pointer shadow-sm"
          >
            <option value="Mayo 2025">Mayo 2025</option>
            <option value="Abril 2025">Abril 2025</option>
            <option value="Marzo 2025">Marzo 2025</option>
          </select>
          <Calendar className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-600 pointer-events-none" />
        </div>
      </div>

      {/* Grid Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((st, i) => (
          <div key={i} className="bg-white border border-purple-100/75 p-5 rounded-2xl flex flex-col gap-2 shadow-sm hover:shadow-md hover:border-purple-200 transition-all relative">
            <span className="text-[#64748B] text-xxs uppercase tracking-wider font-mono">{st.label}</span>
            <span className="text-xl sm:text-2xl font-bold text-[#0F172A] font-display tracking-tight">{st.value}</span>
            
            <div className="flex justify-between items-center text-xxs mt-1">
              <span className={`flex items-center gap-0.5 font-bold font-mono ${st.isUp ? 'text-emerald-600' : 'text-pink-600'}`}>
                {st.isUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {st.trend}
              </span>
              <span className="text-[#64748B] text-[10px]">{st.desc}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Real-time PostgreSQL Database integration */}
      <PostgresAlbumTable />

      {/* Graphical Chart Division - Custom SVGs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Ventas por Mes SVG Bar Chart */}
        <div className="lg:col-span-7 bg-white border border-purple-100/75 rounded-2xl p-5 shadow-sm flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-[#0F172A] text-xs font-semibold uppercase tracking-wider font-mono">Tendencia de Ventas (S/.)</span>
              <p className="text-[#64748B] text-xxs">Ingresos consolidados por el portal académico</p>
            </div>
            <span className="text-xxs text-purple-600 font-mono font-semibold">Ene - May 2025</span>
          </div>

          {/* SVG Custom Bar Chart */}
          <div className="relative w-full h-56 flex items-end justify-between pt-6">
            <div className="absolute inset-x-0 top-6 bottom-4 flex flex-col justify-between pointer-events-none">
              <div className="border-b border-purple-100/60 w-full h-[1px]" />
              <div className="border-b border-purple-100/60 w-full h-[1px]" />
              <div className="border-b border-purple-100/60 w-full h-[1px]" />
              <div className="border-b border-purple-100/60 w-full h-[1px]" />
            </div>

            {/* Custom Interactive Bars representing data */}
            {[
              { month: 'Ene', value: 4500, heightMultiplier: 0.35, color: '#A855F7' },
              { month: 'Feb', value: 8900, heightMultiplier: 0.65, color: '#C084FC' },
              { month: 'Mar', value: 7200, heightMultiplier: 0.52, color: '#F472B6' },
              { month: 'Abr', value: 11200, heightMultiplier: 0.82, color: '#3B82F6' },
              { month: 'May', value: 12450, heightMultiplier: 0.92, color: '#EC4899' },
            ].map((d, index) => {
              const active = hoveredBar === index;
              const h = `${d.heightMultiplier * 100}%`;
              return (
                <div
                  key={index}
                  className="flex flex-col items-center flex-1 relative group"
                  onMouseEnter={() => setHoveredBar(index)}
                  onMouseLeave={() => setHoveredBar(null)}
                >
                  {/* Hover tooltip */}
                  {active && (
                    <div className="absolute bottom-[105%] bg-white border border-purple-250 text-[#0F172A] font-mono text-xxs p-2 rounded-lg text-center shadow-md z-10 w-24">
                      <p className="font-bold text-purple-600">S/. {d.value}</p>
                      <p className="text-[#64748B] text-[9px]">Ingresos netos</p>
                    </div>
                  )}

                  {/* Glass bar background */}
                  <div className="w-12 bg-[#F1F5F9]/80 hover:bg-purple-50/40 h-44 rounded-xl flex items-end justify-center pb-1 transition-all">
                    {/* Active dynamic filled bar */}
                    <div
                      className={`w-7 rounded-t-lg transition-all duration-500 ${
                        active
                          ? 'shadow-[0_0_20px_rgba(168,85,247,0.3)] scale-x-105'
                          : 'shadow-[0_0_10px_rgba(236,72,153,0.1)]'
                      }`}
                      style={{
                        height: h,
                        background: `linear-gradient(to top, #842BD2, ${d.color})`,
                        opacity: active ? 1 : 0.8,
                      }}
                    />
                  </div>
                  <span className="text-xxs text-[#64748B] mt-2 font-mono">{d.month}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Géneros SVG Donut Chart */}
        <div className="lg:col-span-5 bg-white border border-purple-100/75 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-[#0F172A] text-xs font-semibold uppercase tracking-wider font-mono">Géneros Preferidos</span>
            <p className="text-[#64748B] text-xxs">Porcentaje de tracks adquiridos por clientes digitales</p>
          </div>

          <div className="flex items-center justify-center gap-4 py-4">
            
            {/* Interactive SVG Donut Chart with glowing wedges */}
            <svg width="150" height="150" viewBox="0 0 42 42" className="transform -rotate-90">
              <circle cx="21" cy="21" r="15.91" fill="transparent" stroke="#E2E8F0" strokeWidth="4" />
              
              {/* Reggaetón 45% (cyan) */}
              <circle
                cx="21"
                cy="21"
                r="15.91"
                fill="transparent"
                stroke="#A855F7"
                strokeWidth="4.5"
                strokeDasharray="45 55"
                strokeDashoffset="0"
                className="transition-all hover:stroke-purple-400 cursor-pointer"
                onMouseEnter={() => setHoveredSlice(0)}
                onMouseLeave={() => setHoveredSlice(null)}
              />
              {/* Rock Latino 30% (pink) */}
              <circle
                cx="21"
                cy="21"
                r="15.91"
                fill="transparent"
                stroke="#EC4899"
                strokeWidth="4.5"
                strokeDasharray="30 70"
                strokeDashoffset="-45"
                className="transition-all hover:stroke-pink-400 cursor-pointer"
                onMouseEnter={() => setHoveredSlice(1)}
                onMouseLeave={() => setHoveredSlice(null)}
              />
              {/* Salsa 25% (indigo) */}
              <circle
                cx="21"
                cy="21"
                r="15.91"
                fill="transparent"
                stroke="#3B82F6"
                strokeWidth="4.5"
                strokeDasharray="25 75"
                strokeDashoffset="-75"
                className="transition-all hover:stroke-blue-400 cursor-pointer"
                onMouseEnter={() => setHoveredSlice(2)}
                onMouseLeave={() => setHoveredSlice(null)}
              />
            </svg>

            {/* Custom legends and numbers list */}
            <div className="flex flex-col gap-2 font-mono text-[10px]">
              <div className={`flex items-center gap-2 ${hoveredSlice === 0 ? 'text-[#0F172A] font-bold' : 'text-[#64748B]'}`}>
                <span className="w-2.5 h-2.5 rounded bg-[#A855F7]" />
                <span>Reggaetón (45%)</span>
              </div>
              <div className={`flex items-center gap-2 ${hoveredSlice === 1 ? 'text-[#0F172A] font-bold' : 'text-[#64748B]'}`}>
                <span className="w-2.5 h-2.5 rounded bg-[#EC4899]" />
                <span>Rock Latino (30%)</span>
              </div>
              <div className={`flex items-center gap-2 ${hoveredSlice === 2 ? 'text-[#0F172A] font-bold' : 'text-[#64748B]'}`}>
                <span className="w-2.5 h-2.5 rounded bg-[#3B82F6]" />
                <span>Salsa Caribe (25%)</span>
              </div>
            </div>
          </div>

          <div className="border-t border-purple-100 pt-3 flex justify-between items-center">
            <span className="text-[10px] text-[#64748B]">Muestreo: Mayo 2025</span>
            <button
              onClick={() => onNavigateToView('reportes')}
              className="text-xxs text-purple-600 hover:text-purple-700 font-semibold hover:underline"
            >
              Ver reporte detallado
            </button>
          </div>
        </div>
      </div>

      {/* Lower Top Sold Table & Recents list split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Top 5 sold songs table panel */}
        <div className="lg:col-span-8 bg-white border border-purple-100/75 rounded-2xl p-5 shadow-sm">
          <div className="flex justify-between items-center pb-3 border-b border-purple-100 mb-4">
            <div>
              <span className="text-[#0F172A] text-xs font-semibold uppercase tracking-wider font-mono">Canciones Más Vendidas</span>
              <p className="text-[#64748B] text-xxs">Clasificadas de acuerdo a licencias emitidas</p>
            </div>
            <Award className="w-4 h-4 text-purple-600 animate-bounce" />
          </div>

          <div className="overflow-x-auto font-sans">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-purple-100 text-[#475569] font-mono text-[9px] uppercase tracking-wider">
                  <th className="py-2.5 px-3">Título</th>
                  <th className="py-2.5 px-3">Artista</th>
                  <th className="py-2.5 px-3 text-right">Licencias</th>
                  <th className="py-2.5 px-3 text-right">Precio unit.</th>
                  <th className="py-2.5 px-3 text-center">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-50/40">
                {topSoldSongs.map((sn, i) => (
                  <tr key={sn.id} className="hover:bg-purple-50/20 transition-colors">
                    <td className="py-2.5 px-3 font-semibold text-[#0F172A]">
                      {sn.title}
                    </td>
                    <td className="py-2.5 px-3 text-[#64748B]">
                      {sn.artist}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono text-purple-600 font-bold">
                      {sn.sales}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono text-[#334155]">
                      S/. {sn.price.toFixed(2)}
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <span className={`inline-block text-[8px] font-bold font-mono px-2 py-0.5 rounded-full ${
                        sn.status === 'POPULAR' ? 'bg-purple-500/10 text-purple-600 border border-purple-500/20' :
                        sn.status === 'TENDENCIA' ? 'bg-pink-500/10 text-pink-600 border border-pink-500/20' :
                        sn.status === 'PREMIUM' ? 'bg-blue-500/10 text-blue-600 border border-blue-500/20' :
                        sn.status === 'ESTABLE' ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20' :
                        'bg-gray-500/10 text-gray-600 border border-gray-500/20'
                      }`}>
                        {sn.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Transactions List Card */}
        <div className="lg:col-span-4 bg-white border border-purple-100/75 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
          <div className="pb-3 border-b border-purple-100 mb-3">
            <span className="text-[#0F172A] text-xs font-semibold uppercase tracking-wider font-mono">Últimas Compras</span>
            <p className="text-[#64748B] text-xxs">Comprobantes emitidos en el portal</p>
          </div>

          <div className="flex flex-col gap-3">
            {recentTransactions.map((tx) => (
              <div key={tx.id} className="flex justify-between items-center text-left text-xxs border-l-2 border-purple-500 pl-3 py-1 bg-purple-50/30 rounded-r-lg hover:bg-purple-50/70 transition-colors">
                <div>
                  <h4 className="text-[#0F172A] font-bold">{tx.client}</h4>
                  <p className="text-[#64748B] font-mono text-[9px]">{tx.id} • {tx.date}</p>
                </div>
                <div className="text-right font-mono">
                  <span className="text-purple-600 font-bold block">S/. {tx.total.toFixed(2)}</span>
                  <span className="text-emerald-600 text-[8px] tracking-wider uppercase font-sans font-semibold">Aprobada</span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-purple-100 text-center">
            <button
              onClick={() => onNavigateToView('reportes')}
              className="text-xxs text-pink-600 hover:text-pink-700 font-mono font-bold uppercase transition-colors"
            >
              Consultar Auditoría Completa →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
