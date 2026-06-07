import React, { useState } from 'react';
import { Sparkles, Users, Award, Shield, Plus, X, Check, Mail, Phone, Briefcase, Calendar } from 'lucide-react';
import { EmployeeData } from '../types';

interface AdminEmpleadosProps {
  employees: EmployeeData[];
  onAddEmployee: (emp: Omit<EmployeeData, 'id'>) => void;
  onRemoveEmployee: (id: string) => void;
}

export default function AdminEmpleados({ employees, onAddEmployee, onRemoveEmployee }: AdminEmpleadosProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  // Form Fields
  const [name, setName] = useState('');
  const [role, setRole] = useState('Assistant Curator');
  const [clients, setClients] = useState(10);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    onAddEmployee({
      name: name.trim(),
      role,
      clientsAssigned: Number(clients),
      joinedDate: new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' }),
      email: email.trim(),
      phone: phone.trim() || '+51 900 000 000',
      avatarUrl: `https://images.unsplash.com/photo-${[
        '1535713875002-d1d0cf377fde', // boy
        '1494790108377-be9c29b29330', // lady
        '1570295999919-56ceb5ecca61', // man
        '1438761681033-6461ffad8d80', // girl
        '1507003211169-0a1dd7228f2d', // executive boy
      ][Math.floor(Math.random() * 5)]}?w=100&h=100&fit=crop`,
    });

    // Reset
    setName('');
    setRole('Assistant Curator');
    setClients(10);
    setEmail('');
    setPhone('');
    setIsAdding(false);

    setSuccessMsg('¡Nuevo empleado contratado e incorporado a la nómina con éxito!');
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  const totalClientsServed = employees.reduce((acc, e) => acc + e.clientsAssigned, 0);

  return (
    <div className="w-full flex flex-col gap-6 animate-fadeIn">
      
      {/* Top action wrapper */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-display font-medium text-white mb-0.5">Gestión de Personal</h2>
          <p className="text-gray-400 text-xs">Directorio oficial, contrataciones y responsabilidades curriculares</p>
        </div>

        <button
          onClick={() => setIsAdding(true)}
          className="bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs px-4 py-2.5 rounded-xl transition-all shadow-md active:scale-95 flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Contratar Personal (+ Planilla)</span>
        </button>
      </div>

      {successMsg && (
        <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 p-4 rounded-xl text-xs flex items-center gap-2">
          <Check className="w-4 h-4 bg-emerald-500/20 p-0.5 rounded-full" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Dynamic Summary Cards matching Screen 10 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#0F172A]/50 border border-purple-500/10 p-5 rounded-2xl flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-gray-400 text-xxs font-mono uppercase tracking-wider">Planilla Activa</span>
            <span className="text-xl sm:text-2xl font-bold text-white font-display mt-0.5">{employees.length} Curadores</span>
            <span className="text-emerald-400 text-xxs font-mono font-bold mt-1">+5 Nuevas vacantes</span>
          </div>
          <Users className="w-6 h-6 text-purple-400" />
        </div>

        <div className="bg-[#0F172A]/50 border border-purple-500/10 p-5 rounded-2xl flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-gray-400 text-xxs font-mono uppercase tracking-wider">Atención de Cuentas</span>
            <span className="text-xl sm:text-2xl font-bold text-white font-display mt-0.5">{totalClientsServed} Clientes</span>
            <span className="text-purple-300 text-xxs font-mono mt-1">Soporte técnico integrado</span>
          </div>
          <Shield className="w-6 h-6 text-pink-400" />
        </div>

        <div className="bg-[#0F172A]/50 border border-purple-500/10 p-5 rounded-2xl flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-gray-400 text-xxs font-mono uppercase tracking-wider">Eficiencia Operativa</span>
            <span className="text-xl sm:text-2xl font-bold text-white font-display mt-0.5">98.2%</span>
            <span className="text-emerald-400 text-xxs opacity-90 mt-1">Meta mensual superada</span>
          </div>
          <Award className="w-6 h-6 text-indigo-400" />
        </div>
      </div>

      {/* Employees tabular layout matching SCREEN 10 exactly! */}
      <div className="bg-[#0F172A]/40 border border-purple-500/10 rounded-2xl overflow-hidden shadow-xl text-left">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-purple-500/10 bg-[#080d1a]/50 text-gray-400 font-mono text-xxs uppercase tracking-wider">
                <th className="py-3.5 px-4 w-28">ID Empleado</th>
                <th className="py-3.5 px-4">Personal de Curaduría</th>
                <th className="py-3.5 px-4">Cargo / Función</th>
                <th className="py-3.5 px-4 text-center w-36">Cuentas Asignadas</th>
                <th className="py-3.5 px-4 text-center w-28">Fecha de Alta</th>
                <th className="py-3.5 px-4 text-center w-20"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-500/5">
              {employees.map((emp) => (
                <tr key={emp.id} className="hover:bg-purple-500/5 transition-colors group">
                  
                  {/* ID */}
                  <td className="py-3.5 px-4 font-mono text-purple-300 text-xs text-left">
                    {emp.id}
                  </td>

                  {/* Curador / Personal with avatar image */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={emp.avatarUrl}
                        alt={emp.name}
                        className="w-9 h-9 rounded-full object-cover border border-purple-500/25"
                      />
                      <div>
                        <div className="font-semibold text-white text-xs sm:text-sm">{emp.name}</div>
                        <div className="text-[10px] text-gray-400 font-mono mt-0.5">{emp.email} • {emp.phone}</div>
                      </div>
                    </div>
                  </td>

                  {/* Role */}
                  <td className="py-3.5 px-4 text-gray-300 font-medium">
                    {emp.role}
                  </td>

                  {/* Clients assigned */}
                  <td className="py-3.5 px-4 text-center">
                    <span className="font-semibold font-mono text-purple-300">
                      {emp.clientsAssigned} clientes
                    </span>
                  </td>

                  {/* Joined Date */}
                  <td className="py-3.5 px-4 text-center font-mono text-gray-400 text-xs">
                    {emp.joinedDate}
                  </td>

                  {/* Remove action */}
                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={() => onRemoveEmployee(emp.id)}
                      className="p-1.5 opacity-0 group-hover:opacity-100 text-gray-500 hover:text-pink-500 hover:bg-pink-500/10 rounded-lg transition-all cursor-pointer"
                      title="Dar de Baja"
                    >
                      Dar Baja
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Hire employee modal popup overlay */}
      {isAdding && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form
            onSubmit={handleSubmit}
            className="bg-[#0F172A] border border-[#A855F7]/30 rounded-3xl p-6 max-w-md w-full flex flex-col gap-4 animate-scaleUp text-left"
          >
            <div className="flex justify-between items-center pb-3 border-b border-purple-500/10">
              <h3 className="text-white text-sm font-semibold font-display flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-purple-400" />
                Registrar Nuevo Curador
              </h3>
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>

            <div className="flex flex-col gap-3">
              <div>
                <label className="text-gray-400 text-xxs font-mono uppercase tracking-wider block mb-1">Nombre Completo</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ej. Martín De la Torre"
                  className="w-full bg-[#1e293b] border border-purple-500/15 rounded-xl px-3.5 py-2 text-xs text-white"
                  required
                />
              </div>

              <div>
                <label className="text-gray-400 text-xxs font-mono uppercase tracking-wider block mb-1">Puesto / Cargo</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full bg-[#1e293b] border border-purple-500/15 rounded-xl px-2.5 py-2 text-xs text-white"
                >
                  <option value="Specialist Curator">Specialist Curator</option>
                  <option value="Account Manager">Account Manager</option>
                  <option value="Sales Lead">Sales Lead</option>
                  <option value="Catalog Admin">Catalog Admin</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-gray-400 text-xxs font-mono uppercase tracking-wider block mb-1">Cuentas Asig.</label>
                  <input
                    type="number"
                    value={clients}
                    onChange={(e) => setClients(Number(e.target.value))}
                    className="w-full bg-[#1e293b] border border-purple-500/15 rounded-xl px-3.5 py-2 text-xs text-white"
                    required
                  />
                </div>

                <div>
                  <label className="text-gray-400 text-xxs font-mono uppercase tracking-wider block mb-1">Teléfono</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+51..."
                    className="w-full bg-[#1e293b] border border-purple-500/15 rounded-xl px-3.5 py-2 text-xs text-white"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-gray-400 text-xxs font-mono uppercase tracking-wider block mb-1">Email Corporativo</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ejemplo@musicstore.com"
                  className="w-full bg-[#1e293b] border border-purple-500/15 rounded-xl px-3.5 py-2 text-xs text-white"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-purple-500/10">
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="text-gray-400 hover:text-white text-xs px-4 py-2 font-medium"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs px-4 py-2 rounded-xl flex items-center gap-1 cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>Incorporar a Nómina</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
