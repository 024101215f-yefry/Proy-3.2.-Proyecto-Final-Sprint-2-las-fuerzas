import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full py-8 border-t border-purple-500/10 text-center text-xs text-gray-400 mt-12 bg-[#080f14]/50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <span>MusicStore Web © 2025 | Universidad Andina del Cusco</span>
        <div className="flex gap-6">
          <a href="#privacy" className="hover:text-primary transition-colors">Privacidad</a>
          <a href="#terms" className="hover:text-primary transition-colors">Términos de Servicio</a>
          <a href="#support" className="hover:text-primary transition-colors">Soporte</a>
        </div>
      </div>
    </footer>
  );
}
