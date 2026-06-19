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
        <div className="bg-white border border-purple-100/75 rounded-2xl p-5 flex items-center justify-between shadow-sm">
          <div className="flex flex-col gap-1">
            <span className="text-[#64748B] text-xxs font-mono uppercase tracking-wider font-semibold">Historial de Consumo</span>
            <span className="text-2xl font-bold font-display text-[#0F172A]">S/. {totalSpent.toFixed(2)}</span>
            <span className="text-[10px] text-purple-600 font-semibold">Cuenta Premium Autorizada 🛡️</span>
          </div>
          <div className="p-3 bg-purple-50 rounded-2xl text-purple-600 border border-purple-100">
            <Receipt className="w-6 h-6" />
          </div>
        </div>

        {/* Benefits Info Panel Banner */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100 rounded-2xl p-5 md:col-span-2 flex flex-col sm:flex-row justify-between items-center gap-4 relative overflow-hidden shadow-sm">
          <div className="absolute top-0 right-0 w-24 h-12 bg-pink-500/5 rounded-full blur-2xl" />
          
          <div className="flex items-start gap-3">
            <Gift className="w-6 h-6 text-pink-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-[#0F172A] text-xs sm:text-sm font-bold">¡Ahorra S/. 50.00 en tu próximo pedido!</h4>
              <p className="text-[#64748B] text-xxs sm:text-xs">
                Usa el código promocional de estudiantes de la UAC y recibe rebajas exclusivas en el catálogo.
              </p>
            </div>
          </div>

          <button
            onClick={() => handleClaimPromo('UAC-ESTUDIANTE-2025')}
            className="bg-pink-600 hover:bg-pink-700 text-white font-mono font-medium text-xxs px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap active:scale-95 shadow-md"
          >
            Ver Cupón
          </button>
        </div>
      </div>

      {/* Main Billing Table card */}
      <div className="bg-white border border-purple-100 rounded-2xl p-5 sm:p-6 shadow-sm">
        <div className="flex justify-between items-center pb-4 mb-4 border-b border-purple-100">
          <div>
            <h3 className="text-[#0F172A] text-sm sm:text-base font-bold">Comprobantes de Pago Electrónico</h3>
            <p className="text-[#64748B] text-xxs">Cada transacción emite una factura legal local consultable</p>
          </div>
          <Tag className="w-4 h-4 text-purple-600" />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm bg-white">
            <thead>
              <tr className="border-b border-purple-100 bg-[#FBFBFF] text-[#475569] font-mono text-xxs uppercase tracking-wider">
                <th className="py-3 px-4 w-28">Nº Comprobante</th>
                <th className="py-3 px-4 w-28">Fecha de Pago</th>
                <th className="py-3 px-4">Concepto / Pistas Adquiridas</th>
                <th className="py-3 px-4 text-right w-24">Monto total</th>
                <th className="py-3 px-4 text-center w-28">Estado</th>
                <th className="py-3 px-4 text-center w-20"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-50/50">
              {currentInvoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-purple-50/20 transition-colors">
                  <td className="py-4 px-4 font-mono text-xs text-purple-600 font-bold">
                    {invoice.id}
                  </td>
                  <td className="py-4 px-4 text-[#64748B] font-medium">
                    {invoice.date}
                  </td>
                  <td className="py-4 px-4 text-[#334155] font-semibold">
                    {invoice.itemsSummary}
                  </td>
                  <td className="py-4 px-4 text-right text-purple-700 font-mono font-bold">
                    S/. {invoice.total.toFixed(2)}
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 rounded-full text-xxs font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      {invoice.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <button
                      onClick={() => handleClaimPromo(invoice.id)}
                      className="p-1.5 bg-[#F1F5F9] hover:bg-purple-100 text-[#475569] hover:text-purple-700 rounded-lg transition-all cursor-pointer border border-[#E2E8F0] hover:border-purple-200"
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
          <div className="flex justify-between items-center mt-6 pt-4 border-t border-purple-100 text-xs text-[#64748B]">
            <span>Mostrando {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, invoices.length)} de {invoices.length} facturas</span>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-1 px-2.5 bg-[#F1F5F9] border border-slate-200 text-[#475569] disabled:opacity-40 disabled:cursor-not-allowed rounded-lg hover:border-purple-200 transition-opacity cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="font-mono text-[#0F172A] text-xs font-bold">{currentPage} / {totalPages}</span>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-1 px-2.5 bg-[#F1F5F9] border border-slate-200 text-[#475569] disabled:opacity-40 disabled:cursor-not-allowed rounded-lg hover:border-purple-200 transition-opacity cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Coupon check Modal popup overlay */}
      {couponModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-purple-100 rounded-3xl p-6 max-w-sm w-full text-center flex flex-col items-center gap-4 animate-scaleUp shadow-xl">
            <div className="w-14 h-14 bg-gradient-to-tr from-purple-600 to-pink-500 rounded-2xl flex items-center justify-center text-white shadow-lg">
              <Award className="w-7 h-7" />
            </div>

            <div>
              <h3 className="text-[#0F172A] text-md font-bold font-display">Comprobante / Detalle del Cupón</h3>
              <p className="text-[#64748B] text-xxs font-mono mt-1 uppercase tracking-wider font-semibold">Código: {activePromoCode}</p>
            </div>

            <div className="bg-purple-50/50 border border-purple-100 p-3 rounded-xl w-full text-xs text-left text-[#334155] flex flex-col gap-1.5 font-mono">
              <div className="flex justify-between border-b border-purple-100 pb-1 text-xxs uppercase text-[#64748B] font-semibold">
                <span>Concepto</span>
                <span>UAC Web Portal</span>
              </div>
              <div className="flex justify-between">
                <span>Tipo:</span>
                <span className="text-purple-700 font-bold">Estudiante UAC</span>
              </div>
              <div className="flex justify-between">
                <span>Descuento:</span>
                <span className="text-pink-600 font-bold">- S/. 50.00</span>
              </div>
              <div className="flex justify-between font-bold pt-1 border-t border-purple-100">
                <span>Estado:</span>
                <span className="text-emerald-600 font-sans font-bold">Activo & Canjeable</span>
              </div>
            </div>

            <div className="w-full flex gap-2">
              <button
                onClick={() => setCouponModalOpen(false)}
                className="w-full bg-[#F1F5F9] hover:bg-[#E2E8F0] border border-slate-200 px-4 py-2 text-xs font-bold rounded-xl text-[#475569] transition-all cursor-pointer"
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
