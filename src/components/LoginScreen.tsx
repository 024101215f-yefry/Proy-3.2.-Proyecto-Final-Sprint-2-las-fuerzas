import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, User, ShieldCheck, Loader2 } from 'lucide-react';
import { UserRole } from '../types';

interface LoginScreenProps {
  onLogin: (role: UserRole, customName?: string) => void;
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [currentTab, setCurrentTab] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Submit main credentials form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setErrorMessage('Por favor, ingrese su correo electrónico.');
      return;
    }
    setErrorMessage('');
    setIsLoading(true);

    // Simulate authenticating behavior
    setTimeout(() => {
      setIsLoading(false);
      const isCandidateAdmin = email.toLowerCase().includes('admin');
      const matchedRole: UserRole = isCandidateAdmin ? 'admin' : 'client';
      const emailPrefix = email.split('@')[0];
      const displayName = emailPrefix.charAt(0).toUpperCase() + emailPrefix.slice(1);
      onLogin(matchedRole, displayName);
    }, 1200);
  };

  // Immediate login helpers matching the Quick Access section
  const handleQuickLogin = (role: UserRole) => {
    setIsLoading(true);
    setErrorMessage('');
    setTimeout(() => {
      setIsLoading(false);
      if (role === 'admin') {
        onLogin('admin', 'Lucía Vargas');
      } else {
        onLogin('client', 'Carlos Mamani');
      }
    }, 1000);
  };

  return (
    <div className="w-full min-h-screen bg-[#0D0D1A] flex flex-col justify-center items-center px-6 py-12 relative overflow-hidden font-sans select-none">
      
      {/* Subtle ambient lighting for background elegance */}
      <div className="absolute top-[15%] right-[20%] w-[350px] h-[350px] rounded-full bg-[#A855F7]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[15%] left-[20%] w-[350px] h-[350px] rounded-full bg-[#EC4899]/5 blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#A855F701_1px,transparent_1px),linear-gradient(to_bottom,#A855F701_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* Main Container - cleanly centered without container cards or borders */}
      <div className="w-full max-w-sm flex flex-col items-stretch z-10 animate-fadeIn">
        
        {/* SELECTOR TABS EN LA PARTE SUPERIOR */}
        <div className="flex border-b border-[#2D2D4E] mb-8">
          <button
            type="button"
            onClick={() => {
              setCurrentTab('login');
              setErrorMessage('');
            }}
            className={`flex-1 text-center pb-3 text-sm font-semibold transition-all relative cursor-pointer ${
              currentTab === 'login'
                ? 'text-[#FFFFFF]'
                : 'text-[#6B7280]'
            }`}
          >
            Iniciar Sesión
            {currentTab === 'login' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#A855F7] animate-fadeIn" />
            )}
          </button>
          
          <button
            type="button"
            onClick={() => {
              setCurrentTab('register');
              setErrorMessage('');
            }}
            className={`flex-1 text-center pb-3 text-sm font-semibold transition-all relative cursor-pointer ${
              currentTab === 'register'
                ? 'text-[#FFFFFF]'
                : 'text-[#6B7280]'
            }`}
          >
            Registrarse
            {currentTab === 'register' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#A855F7] animate-fadeIn" />
            )}
          </button>
        </div>

        {currentTab === 'login' ? (
          /* FORMULARIO DE INICIO DE SESIÓN */
          <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
            
            {/* Campo Correo Electrónico */}
            <div className="flex flex-col gap-1.5">
              <label className="text-white text-xs font-semibold">
                Correo Electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  placeholder="nombre@ejemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#1A1A2E] border border-[#2D2D4E] focus:border-[#A855F7]/60 rounded-xl py-3 pl-11 pr-4 text-xs text-white placeholder-gray-500 focus:outline-none transition-colors"
                  disabled={isLoading}
                  required
                />
              </div>
            </div>

            {/* Campo Contraseña */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center">
                <label className="text-white text-xs font-semibold">
                  Contraseña
                </label>
                <a 
                  href="#olvide" 
                  onClick={(e) => {
                    e.preventDefault();
                    setErrorMessage('Se ha enviado un enlace de recuperación simulado.');
                  }}
                  className="text-[#A855F7] hover:text-purple-400 text-xs font-medium transition-colors"
                >
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#1A1A2E] border border-[#2D2D4E] focus:border-[#A855F7]/60 rounded-xl py-3 pl-11 pr-11 text-xs text-white placeholder-gray-500 focus:outline-none transition-colors"
                  disabled={isLoading}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  title={showPassword ? "Ocultar Contraseña" : "Mostrar Contraseña"}
                >
                  {showPassword ? (
                    <EyeOff className="w-4.5 h-4.5" />
                  ) : (
                    <Eye className="w-4.5 h-4.5" />
                  )}
                </button>
              </div>
            </div>

            {/* Fila Recordarme Checkbox */}
            <div className="flex items-center gap-2 px-1 py-0.5">
              <input
                type="checkbox"
                id="remember"
                defaultChecked
                className="w-4 h-4 rounded bg-[#1A1A2E] border border-[#2D2D4E] text-[#A855F7] focus:ring-0 cursor-pointer accent-[#A855F7]"
              />
              <label 
                htmlFor="remember" 
                className="text-gray-400 text-xs font-medium cursor-pointer select-none hover:text-gray-300 transition-colors"
              >
                Recordar mi sesión
              </label>
            </div>

            {errorMessage && (
              <p className="text-pink-500 text-xs text-center font-semibold mt-1 animate-fadeIn">
                {errorMessage}
              </p>
            )}

            {/* BOTÓN PRINCIPAL */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#A855F7] to-[#EC4899] hover:opacity-95 text-white font-bold py-3.5 rounded-full transition-all duration-300 shadow-[0_4px_20px_rgba(168,85,247,0.25)] active:scale-95 flex justify-center items-center gap-2 mt-2 cursor-pointer select-none text-xs tracking-wider"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Cargando...</span>
                </>
              ) : (
                <span>Entrar y Escuchar 🎧</span>
              )}
            </button>

          </form>
        ) : (
          /* FORMULARIO SIMULADO DE REGISTRO */
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              setIsLoading(true);
              setTimeout(() => {
                setIsLoading(false);
                onLogin('client', 'Nuevo Miembro');
              }, 1200);
            }} 
            className="flex flex-col gap-4 w-full animate-fadeIn"
          >
            <div className="flex flex-col gap-1.5">
              <label className="text-white text-xs font-semibold">Nombre Completo</label>
              <input
                type="text"
                placeholder="Ingresa tu nombre"
                className="w-full bg-[#1A1A2E] border border-[#2D2D4E] rounded-xl py-3 px-4 text-xs text-white placeholder-gray-500 focus:outline-none"
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-white text-xs font-semibold">Correo Electrónico</label>
              <input
                type="email"
                placeholder="correo@ejemplo.com"
                className="w-full bg-[#1A1A2E] border border-[#2D2D4E] rounded-xl py-3 px-4 text-xs text-white placeholder-gray-500 focus:outline-none"
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-white text-xs font-semibold">Contraseña Nueva</label>
              <input
                type="password"
                placeholder="Mínimo 6 caracteres"
                className="w-full bg-[#1A1A2E] border border-[#2D2D4E] rounded-xl py-3 px-4 text-xs text-white placeholder-gray-500 focus:outline-none"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#A855F7] to-[#EC4899] hover:opacity-95 text-white font-bold py-3.5 rounded-full transition-all duration-300 shadow-[0_4px_20px_rgba(168,85,247,0.25)] active:scale-95 flex justify-center items-center gap-2 mt-2 cursor-pointer select-none text-xs"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin text-white" /> : "Crear Cuenta Estudiante 🎧"}
            </button>
          </form>
        )}

        {/* SECCIÓN ACCESO RÁPIDO */}
        <div className="w-full flex items-center justify-between my-7 text-gray-500">
          <div className="h-[1px] bg-[#2D2D4E] flex-1" />
          <span className="px-3 text-[#6B7280] text-[10px] font-semibold tracking-wider uppercase whitespace-nowrap">
            COMO QUIERE ENTRAR
          </span>
          <div className="h-[1px] bg-[#2D2D4E] flex-1" />
        </div>

        {/* DOS BOTONES LADO A LADO ACCESO RÁPIDO */}
        <div className="grid grid-cols-2 gap-3 mb-7">
          {/* Cliente option */}
          <button
            type="button"
            onClick={() => handleQuickLogin('client')}
            className="flex items-center justify-center gap-2 bg-[#1A1A2E] hover:bg-[#1A1A2E]/80 border border-[#2D2D4E] hover:border-[#A855F7]/40 rounded-xl py-3 px-2.5 transition-all text-xs font-semibold text-white cursor-pointer active:scale-95"
            disabled={isLoading}
          >
            <User className="w-4.5 h-4.5 text-[#A855F7]" />
            <span>Entrar como Cliente</span>
          </button>

          {/* Admin option with design-centric gradient icon */}
          <button
            type="button"
            onClick={() => handleQuickLogin('admin')}
            className="flex items-center justify-center gap-2 bg-[#1A1A2E] hover:bg-[#1A1A2E]/80 border border-[#2D2D4E] hover:border-[#EC4899]/40 rounded-xl py-3 px-2.5 transition-all text-xs font-semibold text-white cursor-pointer active:scale-95"
            disabled={isLoading}
          >
            <ShieldCheck className="w-4.5 h-4.5 text-pink-400" />
            <span>Entrar como Admin</span>
          </button>
        </div>

        {/* SECCIÓN REDES SOCIALES */}
        <div className="w-full flex flex-col items-center mb-6">
          <p className="text-[#6B7280] text-[11px] font-semibold tracking-wider mb-3 uppercase">
            O continúa con
          </p>
          <div className="flex gap-4">
            
            {/* Google circular with color G logo */}
            <button
              type="button"
              onClick={() => {
                setErrorMessage('El inicio de sesión con Google estará disponible en producción.');
              }}
              className="w-11 h-11 rounded-full bg-[#1A1A2E] border border-[#2D2D4E] hover:border-gray-500/30 flex items-center justify-center transition-all cursor-pointer hover:bg-[#1E1E38] active:scale-95"
              title="Iniciar sesión con Google"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M12.24 10.285V14.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.859-3.579-7.859-8s3.529-8 7.859-8c2.46 0 4.105 1.025 5.047 1.926l3.227-3.111C18.281 1.764 15.503 1 12.24 1c-6.075 0-11 4.925-11 11s4.925 11 11 11c6.34 0 10.556-4.456 10.556-10.745 0-.72-.078-1.266-.173-1.685H12.24z"
                />
              </svg>
            </button>

            {/* Facebook circular with blue F logo */}
            <button
              type="button"
              onClick={() => {
                setErrorMessage('El inicio de sesión con Facebook estará disponible en producción.');
              }}
              className="w-11 h-11 rounded-full bg-[#1A1A2E] border border-[#2D2D4E] hover:border-gray-500/30 flex items-center justify-center transition-all cursor-pointer hover:bg-[#1E1E38] active:scale-95"
              title="Iniciar sesión con Facebook"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#1877F2"
                  d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                />
              </svg>
            </button>

          </div>
        </div>

        {/* PIE DE PÁGINA */}
        <div className="mt-8 text-center text-[10px] text-gray-500 font-mono tracking-widest uppercase">
          <span>UAC • INGENIERÍA DE SISTEMAS</span>
        </div>

      </div>
    </div>
  );
}
