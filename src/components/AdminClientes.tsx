import React, { useState, useMemo } from 'react';
import { Search, Mail, Phone, Users, DollarSign, Edit, Check, Globe, X, Plus, Trash2 } from 'lucide-react';
import { ClientData } from '../types';

interface AdminClientesProps {
  clients: ClientData[];
  onUpdateClient: (id: string, updated: Partial<ClientData>) => void;
  onAddClient: (client: Omit<ClientData, 'id'>) => void;
}

export default function AdminClientes({ clients, onUpdateClient, onAddClient }: AdminClientesProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('Todos');
  const [editingClient, setEditingClient] = useState<ClientData | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  // Form Fields for Edit or Create
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formCountry, setFormCountry] = useState('Perú');
  const [formSpent, setFormSpent] = useState(0);

  // Search filter
  const filteredClients = useMemo(() => {
    return clients.filter((cl) => {
      const matchesSearch =
        cl.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cl.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cl.id.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCountry = selectedCountry === 'Todos' || cl.country === selectedCountry;

      return matchesSearch && matchesCountry;
    });
  }, [clients, searchQuery, selectedCountry]);

  // Unique countries for quick filter pills
  const countryList = useMemo(() => {
    const list = new Set(clients.map((c) => c.country));
    return ['Todos', ...Array.from(list)];
  }, [clients]);

  // Open Edit Modal
  const startEdit = (client: ClientData) => {
    setEditingClient(client);
    setFormName(client.name);
    setFormEmail(client.email);
    setFormPhone(client.phone);
    setFormCountry(client.country);
    setFormSpent(client.totalSpent);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingClient) return;

    onUpdateClient(editingClient.id, {
      name: formName,
      email: formEmail,
      phone: formPhone,
      country: formCountry,
      totalSpent: Number(formSpent),
    });

    setEditingClient(null);
  };

  // Open Add Form
  const startAdd = () => {
    setIsAdding(true);
    setFormName('');
    setFormEmail('');
    setFormPhone('');
    setFormCountry('Perú');
    setFormSpent(0);
  };

  const handleSaveAdd = (e: React.FormEvent) => {
    e.preventDefault();
    onAddClient({
      name: formName,
      email: formEmail,
      phone: formPhone,
      country: formCountry,
      totalSpent: Number(formSpent),
      avatarColor: ['#A855F7', '#EC4899', '#10B981', '#F59E0B', '#3B82F6', '#EF4444'][Math.floor(Math.random() * 6)]
    });
    setIsAdding(false);
  };

  // Calculate high-fidelity metrics
  const totalSpentAll = clients.reduce((sum, c) => sum + c.totalSpent, 0);
  const averageSpent = clients.length ? totalSpentAll / clients.length : 0;

  return (
    <div className="w-full flex flex-col gap-6 animate-fadeIn">
      
      {/* Top action block */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-display font-medium text-white mb-0.5">Control de Clientes</h2>
          <p className="text-gray-400 text-xs">Directorio y auditoría de consumos de cuentas registradas</p>
        </div>

        <button
          onClick={startAdd}
          className="bg-[#A855F7] hover:bg-purple-600 text-white font-semibold text-xs px-4 py-2.5 rounded-xl transition-all shadow-md active:scale-95 flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Agregar Cliente</span>
        </button>
      </div>

      {/* Metrics Header bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#0F172A]/50 border border-purple-500/10 p-4 rounded-xl flex justify-between items-center">
          <div>
            <span className="text-gray-400 text-xxs font-mono uppercase tracking-wider block">Total Clientes</span>
            <span className="text-xl font-bold font-display text-white">{clients.length} Miembros</span>
          </div>
          <Users className="w-5 h-5 text-purple-400" />
        </div>

        <div className="bg-[#0F172A]/50 border border-purple-500/10 p-4 rounded-xl flex justify-between items-center">
          <div>
            <span className="text-gray-400 text-xxs font-mono uppercase tracking-wider block">Gasto Promedio</span>
            <span className="text-xl font-bold font-display text-white">S/. {averageSpent.toFixed(2)}</span>
          </div>
          <DollarSign className="w-5 h-5 text-pink-400" />
        </div>

        <div className="bg-[#0F172A]/50 border border-purple-500/10 p-4 rounded-xl flex justify-between items-center">
          <div>
            <span className="text-gray-400 text-xxs font-mono uppercase tracking-wider block">Recaudado</span>
            <span className="text-xl font-bold font-display text-white">S/. {totalSpentAll.toFixed(2)}</span>
          </div>
          <Globe className="w-5 h-5 text-indigo-400" />
        </div>
      </div>

      {/* Search and Quick Filters bar */}
      <div className="bg-[#0F172A]/40 border border-purple-500/10 rounded-2xl p-5 flex flex-col md:flex-row gap-4 justify-between items-center">
        
        {/* Country filter pills */}
        <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
          {countryList.map((country) => {
            const active = selectedCountry === country;
            return (
              <button
                key={country}
                onClick={() => setSelectedCountry(country)}
                className={`py-1 px-3 text-xxs font-mono uppercase tracking-wide rounded-lg border transition-all cursor-pointer ${
                  active
                    ? 'bg-purple-600/20 text-purple-300 border-purple-500/40'
                    : 'bg-transparent text-gray-400 border-transparent hover:text-white hover:bg-slate-800/40'
                }`}
              >
                {country === 'Todos' ? 'Cualquier País 🌎' : country}
              </button>
            );
          })}
        </div>

        {/* Real-time search controller */}
        <div className="relative w-full md:w-80 shrink-0">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-purple-400/80" />
          <input
            type="text"
            placeholder="Buscar por ID, nombre o correo..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#1e293b]/50 border border-purple-500/15 rounded-xl py-2 pl-11 pr-4 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Client Table Grid matching SCREEN 8 exactly! */}
      <div className="bg-[#0F172A]/40 border border-purple-500/10 rounded-2xl overflow-hidden shadow-xl font-sans">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-purple-500/10 bg-[#080d1a]/50 text-gray-400 font-mono text-xxs uppercase tracking-wider">
                <th className="py-3.5 px-4 w-24">ID Registro</th>
                <th className="py-3.5 px-4 text-center w-12"></th>
                <th className="py-3.5 px-4">Cliente / Afiliado</th>
                <th className="py-3.5 px-4 hidden md:table-cell">Correo Electrónico</th>
                <th className="py-3.5 px-4 text-center w-28">País</th>
                <th className="py-3.5 px-4 text-right w-36">Total Gastado</th>
                <th className="py-3.5 px-4 text-center w-20">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-500/5">
              {filteredClients.map((cl) => {
                const partsName = cl.name.split(' ');
                const initials = partsName.map((n) => n.charAt(0)).join('').substring(0, 2);
                return (
                  <tr key={cl.id} className="hover:bg-purple-500/5 transition-colors">
                    
                    {/* Client ID */}
                    <td className="py-3.5 px-4 font-mono text-xs text-purple-300">
                      {cl.id}
                    </td>

                    {/* Client Avatar initials */}
                    <td className="py-3.5 px-2 text-center">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center font-mono font-bold text-xs text-white uppercase shadow-inner"
                        style={{ backgroundColor: cl.avatarColor }}
                      >
                        {initials}
                      </div>
                    </td>

                    {/* Client Name with mobile contact */}
                    <td className="py-3.5 px-3">
                      <div className="font-semibold text-white text-xs sm:text-sm">
                        {cl.name}
                      </div>
                      <div className="text-gray-400 font-mono text-[10px] mt-0.5">
                        {cl.phone}
                      </div>
                    </td>

                    {/* Client Email */}
                    <td className="py-3.5 px-4 font-mono text-gray-300 text-xs hidden md:table-cell">
                      {cl.email}
                    </td>

                    {/* Country Badge */}
                    <td className="py-3.5 px-4 text-center">
                      <span className="inline-flex items-center gap-1 bg-[#1e293b]/70 border border-purple-500/10 px-2.5 py-1 rounded-lg text-xxs text-gray-300">
                        {cl.country}
                      </span>
                    </td>

                    {/* Total spent in S/. */}
                    <td className="py-3.5 px-4 text-right font-mono text-pink-400 font-bold text-xs sm:text-sm">
                      S/. {cl.totalSpent.toFixed(2)}
                    </td>

                    {/* Edit trigger action */}
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => startEdit(cl)}
                        className="p-1 px-2.5 bg-purple-600/20 hover:bg-[#A855F7] text-white rounded-lg text-xxs transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <Edit className="w-3 h-3" />
                        <span>Editar</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit or Add Client Modal Popup */}
      {(editingClient || isAdding) && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form
            onSubmit={editingClient ? handleSaveEdit : handleSaveAdd}
            className="bg-[#0F172A] border border-[#A855F7]/30 rounded-3xl p-6 max-w-md w-full flex flex-col gap-4 animate-scaleUp"
          >
            <div className="flex justify-between items-center pb-3 border-b border-purple-500/10">
              <h3 className="text-white text-sm font-semibold font-display">
                {editingClient ? `Editar Cliente ${editingClient.id}` : 'Registrar Nuevo Cliente'}
              </h3>
              <button
                type="button"
                onClick={() => {
                  setEditingClient(null);
                  setIsAdding(false);
                }}
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
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full bg-[#1e293b] border border-purple-500/15 rounded-xl px-3.5 py-2 text-xs text-white"
                  required
                />
              </div>

              <div>
                <label className="text-gray-400 text-xxs font-mono uppercase tracking-wider block mb-1">Correo Electrónico</label>
                <input
                  type="email"
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  className="w-full bg-[#1e293b] border border-purple-500/15 rounded-xl px-3.5 py-2 text-xs text-white"
                  required
                />
              </div>

              <div>
                <label className="text-gray-400 text-xxs font-mono uppercase tracking-wider block mb-1">Teléfono</label>
                <input
                  type="text"
                  value={formPhone}
                  onChange={(e) => setFormPhone(e.target.value)}
                  className="w-full bg-[#1e293b] border border-purple-500/15 rounded-xl px-3.5 py-2 text-xs text-white"
                  placeholder="+51..."
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-gray-400 text-xxs font-mono uppercase tracking-wider block mb-1">País</label>
                  <select
                    value={formCountry}
                    onChange={(e) => setFormCountry(e.target.value)}
                    className="w-full bg-[#1e293b] border border-purple-500/15 rounded-xl px-2.5 py-2 text-xs text-white"
                  >
                    <option value="Perú">Perú</option>
                    <option value="Colombia">Colombia</option>
                    <option value="México">México</option>
                    <option value="Chile">Chile</option>
                    <option value="Argentina">Argentina</option>
                  </select>
                </div>

                <div>
                  <label className="text-gray-400 text-xxs font-mono uppercase tracking-wider block mb-1">Total Gastado (S/.)</label>
                  <input
                    type="number"
                    value={formSpent}
                    onChange={(e) => setFormSpent(Number(e.target.value))}
                    className="w-full bg-[#1e293b] border border-purple-500/15 rounded-xl px-3.5 py-2 text-xs text-white"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-purple-500/10">
              <button
                type="button"
                onClick={() => {
                  setEditingClient(null);
                  setIsAdding(false);
                }}
                className="text-gray-400 hover:text-white text-xs px-4 py-2 font-medium"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs px-4 py-2 rounded-xl flex items-center gap-1 cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>{editingClient ? 'Guardar Cambios' : 'Registrar'}</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
