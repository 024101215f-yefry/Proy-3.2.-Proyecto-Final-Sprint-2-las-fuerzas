import React from 'react';
import { LogOut, Disc, LayoutDashboard, Users, CreditCard, Sparkles, User, Briefcase, ListMusic, Music } from 'lucide-react';
import { UserRole } from '../types';

interface NavbarProps {
  role: UserRole;
  activeTab: string;
  onSelectTab: (tab: string) => void;
  userName: string;
  onLogout: () => void;
}

export default function Navbar({ role, activeTab, onSelectTab, userName, onLogout }: NavbarProps) {
  
  const clientTabs = [
    { id: 'inicio', label: 'Inicio', icon: Music },
    { id: 'catalogo', label: 'Catálogo', icon: Disc },
    { id: 'playlists', label: 'Mis Playlists', icon: ListMusic },
    { id: 'facturas', label: 'Mis Facturas', icon: CreditCard },
  ];

  const adminTabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'clientes', label: 'Clientes', icon: Users },
    { id: 'empleados', label: 'Empleados', icon: Briefcase },
    { id: 'reportes', label: 'Reportes', icon: CreditCard },
  ];

  const tabs = role === 'admin' ? adminTabs : clientTabs;

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-[#080d1a]/85 backdrop-blur-xl border-b border-purple-500/10 z-40 px-6 flex items-center justify-between">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-4">
        
        {/* Brand logo & name */}
        <div className="flex items-center gap-2.5 shrink-0 select-none">
          <div className="p-2 bg-gradient-to-tr from-purple-600 to-pink-500 rounded-xl shadow-lg shadow-purple-500/25">
            <Disc className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-white font-bold font-display text-sm tracking-tight block">MusicStore Web</span>
            <span className="text-[9px] text-purple-400 font-mono block tracking-widest uppercase">
              {role === 'admin' ? 'Admin Portal' : 'Premium Client'}
            </span>
          </div>
        </div>

        {/* Center: Tabs list */}
        <nav className="flex items-center gap-1 sm:gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  active
                    ? 'bg-purple-600/15 text-[#ddb7ff] border border-purple-500/20 shadow-inner'
                    : 'text-gray-400 hover:text-white hover:bg-slate-800/45'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="hidden md:inline">{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right: user and power logout trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden sm:flex items-center gap-2 bg-[#1e293b]/40 border border-purple-500/10 rounded-xl p-1.5 px-3">
            <div className={`w-2 h-2 rounded-full ${role === 'admin' ? 'bg-pink-500' : 'bg-[#A855F7]'}`} />
            <span className="text-gray-200 text-xs font-mono font-medium truncate max-w-[100px]" title={userName}>
              {userName}
            </span>
          </div>

          <button
            onClick={onLogout}
            className="p-2 rounded-xl text-gray-400 hover:text-pink-500 hover:bg-pink-500/10 transition-all cursor-pointer"
            title="Cerrar sesión"
          >
            <LogOut className="w-4.5 h-4.5" />
          </button>
        </div>

      </div>
    </header>
  );
}
