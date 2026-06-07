import React, { useState } from 'react';
import { Receipt, FileText, Download, CheckCircle2, ChevronLeft, ChevronRight, Gift, Tag, Award, Sparkles } from 'lucide-react';
import { Invoice } from '../types';

interface MisFacturasViewProps {
  invoices: Invoice[];
  totalSpent: number;
}

export default function MisFacturasView({ invoices, totalSpent }: MisFacturasViewProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [couponModalOpen, setCouponModalOpen] = useState(false);
  const [activePromoCode, setActivePromoCode] = useState('');
  const itemsPerPage = 5;

  const totalPages = Math.ceil(invoices.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentInvoices = invoices.slice(indexOfFirstItem, indexOfLastItem);

  const handleClaimPromo = (code: string) => {
    setActivePromoCode(code);
    setCouponModalOpen(true);
  };

  return (
    <div className="w-full flex flex-col gap-6 animate-fadeIn">
      
      {/* Upper Meta blocks header */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Dynamic Cumulative Spending Card */}
        <div className="bg-[#0F172A]/70 border border-purple-500/10 rounded-2xl p-5 flex items-center justify-between shadow-xl">
          <div className="flex flex-col gap-1">
            <span className="text-gray-400 text-xxs font-mono uppercase tracking-wider">Historial de Consumo</span>
            <span className="text-2xl font-bold font-display text-white">S/. {totalSpent.toFixed(2)}</span>
            <span className="text-[10px] text-purple-300">Cuenta Premium Autorizada 🛡️</span>
          </div>
          <div className="p-3 bg-purple-500/10 rounded-2xl text-purple-400">
            <Receipt className="w-6 h-6" />
          </div>
        </div>

        {/* Benefits Info Panel Banner */}
        <div className="bg-gradient-to-r from-purple-950/40 to-pink-950/20 border border-pink-500/10 rounded-2xl p-5 md:col-span-2 flex flex-col sm:flex-row justify-between items-center gap-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-12 bg-pink-500/10 rounded-full blur-2xl" />
          
          <div className="flex items-start gap-3">
            <Gift className="w-6 h-6 text-pink-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-white text-xs sm:text-sm font-semibold">¡Ahorra S/. 50.00 en tu próximo pedido!</h4>
              <p className="text-gray-400 text-xxs sm:text-xs">
                Usa el código promocional de estudiantes de la UAC y recibe rebajas exclusivas en el catálogo.
              </p>
            </div>
          </div>

          <button
            onClick={() => handleClaimPromo('UAC-ESTUDIANTE-2025')}
            className="bg-pink-600 hover:bg-pink-500 text-white font-mono font-medium text-xxs px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap active:scale-95 shadow-[0_0_15px_rgba(236,72,153,0.3)]"
          >
            Ver Cupón
          </button>
        </div>
      </div>

      {/* Main Billing Table card */}
      <div className="bg-[#0F172A]/40 border border-purple-500/10 rounded-2xl p-5 sm:p-6 shadow-xl backdrop-blur-md">
        <div className="flex justify-between items-center pb-4 mb-4 border-b border-purple-500/10">
          <div>
            <h3 className="text-white text-sm sm:text-base font-semibold">Comprobantes de Pago Electrónico</h3>
            <p className="text-gray-400 text-xxs">Cada transacción emite una factura legal local consultable</p>
          </div>
          <Tag className="w-4 h-4 text-purple-400" />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-purple-500/10 bg-[#080d1a]/40 text-gray-400 font-mono text-xxs uppercase tracking-wider">
                <th className="py-3 px-4 w-28">Nº Comprobante</th>
                <th className="py-3 px-4 w-28">Fecha de Pago</th>
                <th className="py-3 px-4">Concepto / Pistas Adquiridas</th>
                <th className="py-3 px-4 text-right w-24">Monto total</th>
                <th className="py-3 px-4 text-center w-28">Estado</th>
                <th className="py-3 px-4 text-center w-20"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-500/5">
              {currentInvoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-purple-500/5 transition-colors">
                  <td className="py-4 px-4 font-mono text-xs text-white">
                    {invoice.id}
                  </td>
                  <td className="py-4 px-4 text-gray-400">
                    {invoice.date}
                  </td>
                  <td className="py-4 px-4 text-gray-300 font-medium">
                    {invoice.itemsSummary}
                  </td>
                  <td className="py-4 px-4 text-right text-purple-300 font-mono font-semibold">
                    S/. {invoice.total.toFixed(2)}
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="inline-flex items-center gap-1.5 bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 px-2 py-0.5 rounded-full text-xxs font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      {invoice.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <button
                      onClick={() => handleClaimPromo(invoice.id)}
                      className="p-1.5 bg-purple-600/10 hover:bg-purple-600/30 text-purple-300 hover:text-white rounded-lg transition-all cursor-pointer"
                      title="Ver Detalles"
                    >
                      <FileText className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination bar controls */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center mt-6 pt-4 border-t border-purple-500/10 text-xs text-gray-400">
            <span>Mostrando {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, invoices.length)} de {invoices.length} facturas</span>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-1 px-2.5 bg-[#1e293b]/50 border border-purple-500/10 text-gray-300 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg hover:text-white transition-opacity cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="font-mono text-white text-xs">{currentPage} / {totalPages}</span>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-1 px-2.5 bg-[#1e293b]/50 border border-purple-500/10 text-gray-300 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg hover:text-white transition-opacity cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Coupon check Modal popup overlay */}
      {couponModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0F172A] border border-[#A855F7]/30 rounded-3xl p-6 max-w-sm w-full text-center flex flex-col items-center gap-4 animate-scaleUp">
            <div className="w-14 h-14 bg-gradient-to-tr from-purple-600 to-pink-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-purple-500/20">
              <Award className="w-7 h-7" />
            </div>

            <div>
              <h3 className="text-white text-md font-semibold font-display">Comprobante / Detalle del Cupón</h3>
              <p className="text-gray-400 text-xxs font-mono mt-1 uppercase tracking-wider">Código: {activePromoCode}</p>
            </div>

            <div className="bg-purple-500/5 border border-purple-500/10 p-3 rounded-xl w-full text-xs text-left text-gray-300 flex flex-col gap-1.5 font-mono">
              <div className="flex justify-between border-b border-purple-500/10 pb-1 text-xxs uppercase text-gray-400">
                <span>Concepto</span>
                <span>UAC Web Portal</span>
              </div>
              <div className="flex justify-between">
                <span>Tipo:</span>
                <span className="text-purple-300">Estudiante UAC</span>
              </div>
              <div className="flex justify-between">
                <span>Descuento:</span>
                <span className="text-pink-400">- S/. 50.00</span>
              </div>
              <div className="flex justify-between font-bold pt-1 border-t border-purple-500/10">
                <span>Estado:</span>
                <span className="text-emerald-400 font-sans">Activo & Canjeable</span>
              </div>
            </div>

            <div className="w-full flex gap-2">
              <button
                onClick={() => setCouponModalOpen(false)}
                className="w-full bg-[#1e293b]/70 hover:bg-[#1e293b] border border-purple-500/15 px-4 py-2 text-xs rounded-xl text-gray-300 hover:text-white transition-all cursor-pointer"
              >
                Cerrar consulta
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
