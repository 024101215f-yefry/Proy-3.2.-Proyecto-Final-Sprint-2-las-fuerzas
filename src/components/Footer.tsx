import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full py-8 border-t border-purple-100 text-center text-xs text-[#64748B] mt-12 bg-white/70 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <span>MusicStore Web © 2025 | Universidad Andina del Cusco</span>
        <div className="flex gap-6">
          <a href="#privacy" className="hover:text-purple-600 transition-colors font-medium">Privacidad</a>
          <a href="#terms" className="hover:text-purple-600 transition-colors font-medium">Términos de Servicio</a>
          <a href="#support" className="hover:text-purple-600 transition-colors font-medium">Soporte</a>
        </div>
      </div>
    </footer>
  );
}
