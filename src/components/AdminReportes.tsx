import React, { useState } from 'react';
import { Sparkles, TrendingUp, DollarSign, ArrowUpRight, BarChart3, Download, RefreshCw, Layers, SlidersHorizontal, Check } from 'lucide-react';
import { recentTransactions } from '../data';

export default function AdminReportes() {
  const [reportRange, setReportRange] = useState('Últimos 30 días');
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setSuccessMsg('¡Reporte exportado correctamente a formato PDF / Excel!');
      setTimeout(() => setSuccessMsg(''), 4000);
    }, 1500);
  };

  const salesData = [
    { day: 'Día 05', value: 3400, label: 'S/. 3,400' },
    { day: 'Día 10', value: 4800, label: 'S/. 4,800' },
    { day: 'Día 15', value: 6200, label: 'S/. 6,200' },
    { day: 'Día 20', value: 5120, label: 'S/. 5,120' },
    { day: 'Día 25', value: 9240, label: 'S/. 9,240' },
    { day: 'Día 30', value: 12450, label: 'S/. 12,450' },
  ];

  const topCategories = [
    { name: 'Bad Bunny - Nadie Sabe...', count: 18, share: 42, color: 'bg-purple-500' },
    { name: 'Karol G - Mañana Será...', count: 12, share: 28, color: 'bg-pink-500' },
    { name: 'Shakira - Las Mujeres...', count: 8, share: 18, color: 'bg-blue-500' },
    { name: 'Peso Pluma - Génesis', count: 5, share: 12, color: 'bg-emerald-500' },
  ];

  return (
    <div className="w-full flex flex-col gap-6 animate-fadeIn">
      
      {/* Top row */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-display font-medium text-white mb-0.5 font-sans">Reportes Financieros</h2>
          <p className="text-gray-400 text-xs">Análisis mensual de ventas, gastos académicos e ingresos consolidados</p>
        </div>

        <div className="flex items-center gap-2">
          {/* Range dropdown */}
          <select
            value={reportRange}
            onChange={(e) => setReportRange(e.target.value)}
            className="appearance-none bg-[#0F172A] border border-purple-500/15 text-white text-xs rounded-xl px-4 py-2.5 outline-none font-mono cursor-pointer shadow-md pr-8"
          >
            <option value="Últimos 30 días">Últimos 30 días</option>
            <option value="Este Trimestre">Este Trimestre</option>
            <option value="Histórico Completo">Histórico Completo</option>
          </select>

          <button
            onClick={handleExport}
            className="bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs px-4 py-2.5 rounded-xl transition-all shadow-md active:scale-95 flex items-center gap-1.5 cursor-pointer"
            disabled={isExporting}
          >
            <Download className="w-4 h-4" />
            <span>{isExporting ? 'Exportando...' : 'Exportar Reporte'}</span>
          </button>
        </div>
      </div>

      {successMsg && (
        <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 p-4 rounded-xl text-xs flex items-center gap-2">
          <Check className="w-4 h-4 bg-emerald-500/20 p-0.5 rounded-full" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Highlights Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#0F172A]/50 border border-purple-500/10 p-5 rounded-2xl">
          <span className="text-gray-400 text-xxs font-mono uppercase tracking-wider block">Ingreso Bruto Promedio</span>
          <span className="text-xl sm:text-2xl font-bold text-white font-display mt-1 block">S/. 12,450.00</span>
          <span className="text-emerald-400 font-mono text-xxs font-bold flex items-center gap-0.5 mt-2">
            <TrendingUp className="w-3.5 h-3.5" />
            +18.3% mensual
          </span>
        </div>

        <div className="bg-[#0F172A]/50 border border-purple-500/10 p-5 rounded-2xl">
          <span className="text-gray-400 text-xxs font-mono uppercase tracking-wider block">Costos de Licenciamiento</span>
          <span className="text-xl sm:text-2xl font-bold text-white font-display mt-1 block">S/. 3,240.20</span>
          <span className="text-purple-300 font-mono text-xxs flex items-center gap-0.5 mt-2">
            • 24% del ingreso bruto total
          </span>
        </div>

        <div className="bg-[#0F172A]/50 border border-purple-500/10 p-5 rounded-2xl">
          <span className="text-gray-400 text-xxs font-mono uppercase tracking-wider block">Margen Operativo Neto</span>
          <span className="text-xl sm:text-2xl font-bold text-white font-display mt-1 block">S/. 9,209.80</span>
          <span className="text-emerald-400 font-mono text-xxs font-bold flex items-center gap-0.5 mt-2">
            🛡️ 74% de rentabilidad neta
          </span>
        </div>
      </div>

      {/* Main Split Layout: Historic curve left, Top sales right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left curve container */}
        <div className="lg:col-span-8 bg-[#0F172A]/40 border border-purple-500/10 rounded-2xl p-5 shadow-xl">
          <div className="flex justify-between items-center pb-3 border-b border-purple-500/10 mb-5">
            <div>
              <span className="text-white text-xs font-semibold uppercase tracking-wider font-mono">Histórico de Ventas</span>
              <p className="text-gray-400 text-xxs">Curva acumulada de ingresos mensuales del portal</p>
            </div>
            <BarChart3 className="w-4 h-4 text-purple-400" />
          </div>

          {/* Majestic Custom Line Chart SVG Vector rendering */}
          <div className="relative w-full h-64 pt-8">
            <div className="absolute inset-x-0 top-8 bottom-6 flex flex-col justify-between pointer-events-none">
              <div className="border-b border-purple-500/5 w-full h-[1px]" />
              <div className="border-b border-purple-500/5 w-full h-[1px]" />
              <div className="border-b border-purple-500/5 w-full h-[1px]" />
            </div>

            {/* SVG Vectors */}
            <svg
              className="w-full h-48 overflow-visible"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              {/* Curve gradient shading */}
              <defs>
                <linearGradient id="curveGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#A855F7" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#842BD2" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Shaded Area */}
              <path
                d="M 0,100 L 0,80 L 20,70 L 40,60 L 60,65 L 80,45 L 100,20 L 100,100 Z"
                fill="url(#curveGrad)"
                className="transition-all"
              />

              {/* Main glowing line */}
              <path
                d="M 0,80 L 20,70 L 40,60 L 60,65 L 80,45 L 100,20"
                fill="none"
                stroke="url(#lineGrad)"
                strokeWidth="1.5"
                className="stroke-purple-500 shadow-xl"
                style={{ stroke: '#EC4899', strokeWidth: '1.5px' }}
              />

              {/* Specific Points */}
              <circle cx="0" cy="80" r="1.5" fill="#A855F7" />
              <circle cx="20" cy="70" r="1.5" fill="#A855F7" />
              <circle cx="40" cy="60" r="1.5" fill="#EC4899" />
              <circle cx="60" cy="65" r="1.5" fill="#EC4899" />
              <circle cx="80" cy="45" r="1.5" fill="#EC4899" />
              <circle cx="100" cy="20" r="1.5" fill="#3B82F6" />
            </svg>

            {/* Labels overlay */}
            <div className="absolute inset-x-0 bottom-0 flex justify-between px-1 text-xxs font-mono text-gray-400">
              {salesData.map((d, index) => {
                const active = hoveredPoint === index;
                return (
                  <button
                    key={index}
                    onMouseEnter={() => setHoveredPoint(index)}
                    onMouseLeave={() => setHoveredPoint(null)}
                    className={`flex flex-col items-center transition-colors relative focus:outline-none ${
                      active ? 'text-white' : 'text-gray-500'
                    }`}
                  >
                    <span>{d.day}</span>
                    {active && (
                      <div className="absolute bottom-[200%] bg-[#080d1a] border border-pink-500/30 text-white font-mono p-1 px-2 rounded text-xxs z-10 whitespace-nowrap shadow-xl">
                        {d.label}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right side Category Share list */}
        <div className="lg:col-span-4 bg-[#0F172A]/40 border border-purple-500/10 rounded-2xl p-5 shadow-xl flex flex-col justify-between self-stretch">
          <div className="pb-3 border-b border-purple-500/10 mb-4">
            <span className="text-white text-xs font-semibold uppercase tracking-wider font-mono">Distribución por Álbumes</span>
            <p className="text-gray-400 text-xxs">Ventas de mayor rendimiento acumuladas</p>
          </div>

          <div className="flex flex-col gap-4">
            {topCategories.map((cat, idx) => (
              <div key={idx} className="flex flex-col gap-1.5 font-sans">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-white font-medium truncate max-w-[200px]">{cat.name}</span>
                  <span className="text-gray-400 font-mono text-xxs">{cat.share}% ({cat.count} uds)</span>
                </div>
                {/* Custom inline progress segment */}
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`${cat.color} h-full rounded-full transition-all duration-1000`}
                    style={{ width: `${cat.share}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-purple-500/10 mt-6 text-xxs text-gray-500 text-center">
            Muestra total de 43 unidades auditadas
          </div>
        </div>
      </div>

      {/* Recents Transaction Table list */}
      <div className="bg-[#0F172A]/40 border border-purple-500/10 rounded-2xl p-5 sm:p-6 shadow-xl">
        <div className="pb-3 border-b border-purple-500/10 mb-4 text-left">
          <span className="text-white text-xs font-semibold uppercase tracking-wider font-mono">Historial Completo de Transacciones Recientes</span>
          <p className="text-gray-400 text-xxs">Detalle tributario emitido del mes actual</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-purple-500/10 text-gray-400 font-mono text-[9px] uppercase tracking-wider bg-[#080d1a]/30">
                <th className="py-2.5 px-3">Código Factura</th>
                <th className="py-2.5 px-3">Cliente</th>
                <th className="py-2.5 px-3">Fecha y Hora</th>
                <th className="py-2.5 px-3">Items</th>
                <th className="py-2.5 px-3 text-right">Monto</th>
                <th className="py-2.5 px-3 text-center">Tributación / Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-500/5">
              {recentTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-purple-500/5 transition-colors">
                  <td className="py-2.5 px-3 font-mono text-white text-xxs">{tx.id}</td>
                  <td className="py-2.5 px-3 text-gray-300 font-bold">{tx.client}</td>
                  <td className="py-2.5 px-3 text-gray-400">{tx.date}</td>
                  <td className="py-2.5 px-3 text-gray-400">{tx.items}</td>
                  <td className="py-2.5 px-3 text-right font-mono text-purple-300">S/. {tx.total.toFixed(2)}</td>
                  <td className="py-2.5 px-3 text-center">
                    <span className="inline-block bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[9px] font-mono px-2 py-0.5 rounded-full uppercase">
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
