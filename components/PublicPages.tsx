import React, { useState, useEffect } from 'react';
import { Shield, Zap, Globe, Cpu, Users, BarChart, Lock, CheckCircle, Server, Activity, Database, DollarSign, Award, Clock, ArrowRight, Play, LayoutGrid, Terminal, MapPin, Wifi, MessageSquare, Star, Quote, FileText, Code, Layers, Wind, Key, Target, Rocket, Briefcase, Heart, ChevronDown, ChevronUp, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

// --- COMPONENTS HELPERS ---
const FeatureCard = ({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) => (
    <div className="p-8 bg-slate-800/50 rounded-2xl border border-slate-700 hover:border-blue-500 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10 group">
        <div className="w-14 h-14 bg-slate-900 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform border border-slate-700 group-hover:border-blue-500/50">
            <Icon className="w-7 h-7 text-blue-400 group-hover:text-white transition-colors" />
        </div>
        <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
        <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">{desc}</p>
    </div>
);

const FaqItem = ({ question, answer }: { question: string, answer: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-slate-700">
            <button 
                className="w-full py-6 flex justify-between items-center text-left focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="text-lg font-bold text-white">{question}</span>
                {isOpen ? <ChevronUp className="text-blue-500" /> : <ChevronDown className="text-gray-500" />}
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 pb-6' : 'max-h-0'}`}>
                <p className="text-gray-400 leading-relaxed">{answer}</p>
            </div>
        </div>
    );
};

// --- HOME PAGE (REBUILT MASSIVE VERSION) ---
export const HomePage: React.FC = () => {
  const [simulatedProfit, setSimulatedProfit] = useState(124.50);

  // Profit Simulator Effect
  useEffect(() => {
    const interval = setInterval(() => {
        setSimulatedProfit(prev => prev + (Math.random() * 0.05));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white overflow-hidden scroll-smooth">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2832&auto=format&fit=crop')] bg-cover bg-center opacity-10 animate-pulse-slow"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-transparent to-slate-900 z-0" />
        <div className="container mx-auto px-6 z-10 text-center relative pt-20">
          <div className="inline-block px-4 py-2 bg-blue-900/30 border border-blue-500/30 rounded-full text-blue-400 text-sm font-semibold mb-6 animate-bounce-in">
            🚀 Nueva Granja V4.2 Activada en Ámsterdam
          </div>
          <h1 className="text-5xl md:text-8xl font-extrabold mb-8 leading-tight tracking-tight">
            Tu Libertad Financiera <br/>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-emerald-400 to-purple-500 animate-gradient-x">
                Empieza Aquí
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            La plataforma definitiva de minería en la nube. Sin hardware costoso. Sin conocimientos técnicos. Solo resultados diarios en tu billetera.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-6 items-center">
            <Link to="/register" className="w-full md:w-auto px-10 py-5 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 rounded-full font-bold text-lg transition-all shadow-[0_0_40px_rgba(59,130,246,0.3)] hover:shadow-[0_0_60px_rgba(59,130,246,0.5)] transform hover:-translate-y-1 flex items-center justify-center gap-2 group">
              Empezar a Minar Gratis <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <div className="flex items-center gap-2 text-green-400 font-mono text-sm bg-slate-800/50 px-4 py-2 rounded-lg border border-green-500/30">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Pagos activos hoy: $1.2M+
            </div>
          </div>
        </div>
      </section>

      {/* 2. REALITY CHECK (WHY IT IS REAL) */}
      <section className="py-20 bg-[#0B1120]">
        <div className="container mx-auto px-6">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold mb-4">¿Por qué CriptoWallet AI es Real?</h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    A diferencia de los esquemas ponzi, nosotros poseemos infraestructura física verificable. No vendemos humo, vendemos potencia de cálculo (Hashrate) real.
                </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-slate-800 p-1 rounded-2xl">
                    <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop" className="rounded-xl mb-4 h-48 w-full object-cover grayscale hover:grayscale-0 transition-all" alt="Data" />
                    <div className="p-4">
                        <h3 className="font-bold text-lg mb-2">Auditorías Blockchain</h3>
                        <p className="text-sm text-gray-400">Todas las transacciones de minería son verificables en la red Bitcoin (Pool Foundry USA).</p>
                    </div>
                </div>
                <div className="bg-slate-800 p-1 rounded-2xl">
                    <img src="https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1470&auto=format&fit=crop" className="rounded-xl mb-4 h-48 w-full object-cover grayscale hover:grayscale-0 transition-all" alt="App" />
                    <div className="p-4">
                        <h3 className="font-bold text-lg mb-2">Regulación Legal</h3>
                        <p className="text-sm text-gray-400">Empresa registrada con licencia VASP europea. Tus fondos están asegurados.</p>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* 3. SIMULATOR DEMO */}
      <section className="py-20 container mx-auto px-6">
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-700 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-12 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full blur-[100px] opacity-10"></div>
            
            <div className="md:w-1/2 space-y-6">
                <h2 className="text-3xl font-bold">Pruébalo ahora mismo</h2>
                <p className="text-gray-300">
                    Así es como se verá tu panel una vez te registres. El contador sube en tiempo real gracias a nuestra conexión WebSocket directa con los mineros.
                </p>
                <ul className="space-y-3">
                    <li className="flex items-center gap-3"><CheckCircle className="text-green-500"/> Retiros instantáneos a cualquier wallet</li>
                    <li className="flex items-center gap-3"><CheckCircle className="text-green-500"/> Sin comisiones de mantenimiento</li>
                    <li className="flex items-center gap-3"><CheckCircle className="text-green-500"/> Soporte 24/7 en Español</li>
                </ul>
                <Link to="/register" className="inline-block mt-4 bg-white text-slate-900 font-bold px-8 py-3 rounded-full hover:bg-gray-100 transition-colors">
                    Crear Cuenta Demo
                </Link>
            </div>

            <div className="md:w-1/2 w-full bg-black rounded-xl border border-slate-700 p-6 font-mono relative z-10 shadow-lg">
                <div className="flex justify-between items-center mb-6 border-b border-slate-800 pb-4">
                    <span className="text-gray-500 text-sm">LIVE MINING SESSION</span>
                    <span className="flex items-center gap-2 text-green-500 text-xs"><div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div> ONLINE</span>
                </div>
                <div className="text-center py-8">
                    <div className="text-gray-400 text-sm mb-2">SALDO GENERADO</div>
                    <div className="text-5xl font-bold text-white tracking-tighter flex justify-center items-center gap-2">
                        ${simulatedProfit.toFixed(4)}
                    </div>
                    <div className="text-emerald-500 text-sm mt-2 animate-pulse">+0.0045 BTC/h</div>
                </div>
                <div className="space-y-2 mt-4 text-xs text-gray-600">
                    <div>[14:20:01] Share accepted (32ms)</div>
                    <div>[14:20:02] Block reward found! +0.0004 BTC</div>
                    <div>[14:20:03] Optimizing voltage... OK</div>
                </div>
            </div>
        </div>
      </section>

      {/* 4. COMPARISON TABLE */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-12">¿Por qué elegirnos?</h2>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-800 text-gray-300">
                            <th className="p-6 rounded-tl-xl">Características</th>
                            <th className="p-6 text-center text-red-400">Minería Casera</th>
                            <th className="p-6 text-center text-yellow-400">Competencia (Cloud)</th>
                            <th className="p-6 text-center text-blue-400 font-bold bg-blue-900/10 rounded-tr-xl border-t-2 border-blue-500">CriptoWallet AI</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 text-gray-300">
                        <tr className="hover:bg-slate-800/30">
                            <td className="p-6 font-bold">Coste de Hardware</td>
                            <td className="p-6 text-center">$3,000 - $15,000</td>
                            <td className="p-6 text-center">$0 (Fees Ocultos)</td>
                            <td className="p-6 text-center font-bold text-white bg-blue-900/5">$0.00</td>
                        </tr>
                        <tr className="hover:bg-slate-800/30">
                            <td className="p-6 font-bold">Electricidad</td>
                            <td className="p-6 text-center text-red-400">Muy Cara ($0.20/kWh)</td>
                            <td className="p-6 text-center">Variable</td>
                            <td className="p-6 text-center font-bold text-green-400 bg-blue-900/5">Gratis (Incluida)</td>
                        </tr>
                        <tr className="hover:bg-slate-800/30">
                            <td className="p-6 font-bold">Ruido y Calor</td>
                            <td className="p-6 text-center text-red-400">Insoportable (90dB)</td>
                            <td className="p-6 text-center">N/A</td>
                            <td className="p-6 text-center font-bold text-green-400 bg-blue-900/5">Silencio Total</td>
                        </tr>
                        <tr className="hover:bg-slate-800/30">
                            <td className="p-6 font-bold">ROI (Retorno Inversión)</td>
                            <td className="p-6 text-center">18-24 Meses</td>
                            <td className="p-6 text-center">Inciertero</td>
                            <td className="p-6 text-center font-bold text-blue-400 bg-blue-900/5">Diario / Inmediato</td>
                        </tr>
                        <tr className="hover:bg-slate-800/30">
                            <td className="p-6 font-bold rounded-bl-xl">Mantenimiento</td>
                            <td className="p-6 text-center text-red-400">Constante</td>
                            <td className="p-6 text-center">Soporte Lento</td>
                            <td className="p-6 text-center font-bold text-blue-400 rounded-br-xl bg-blue-900/5">Automático (IA)</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
      </section>

      {/* 5. FINANCIAL FREEDOM */}
      <section className="py-20 container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
                <div className="text-yellow-500 font-bold mb-2 flex items-center gap-2"><Star fill="currentColor" /> CASO DE ÉXITO</div>
                <h2 className="text-4xl font-bold mb-6">¿Se puede vivir de esto?</h2>
                <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                    La respuesta corta es: <strong>SÍ</strong>. <br/><br/>
                    Tenemos usuarios que empezaron con el plan gratuito y reinvirtiendo sus ganancias han logrado escalar hasta generar un sueldo mensual completo.
                </p>
                <div className="bg-slate-800 p-6 rounded-xl border-l-4 border-yellow-500 mb-6">
                    <p className="italic text-gray-400">"Dejé mi trabajo de 9 a 5 hace tres meses. Ahora CriptoWallet AI cubre mi hipoteca y mis gastos. La clave es la constancia."</p>
                    <p className="text-right font-bold text-white mt-2">- David G., Madrid</p>
                </div>
                <Link to="/register" className="text-blue-400 font-bold hover:underline flex items-center gap-2">
                    Ver calculadora de rentabilidad <ArrowRight size={16}/>
                </Link>
            </div>
            <div className="md:w-1/2">
                <img src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=2671&auto=format&fit=crop" alt="Money" className="rounded-3xl shadow-2xl border border-slate-700 transform rotate-2 hover:rotate-0 transition-all duration-500" />
            </div>
        </div>
      </section>

      {/* 6. HOW IT WORKS (3 STEPS) */}
      <section className="py-20 bg-[#0B1120] text-center">
        <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold mb-16">Sistema Automatizado en 3 Pasos</h2>
            <div className="grid md:grid-cols-3 gap-12 relative">
                 <div className="absolute top-12 left-0 w-full h-1 bg-gradient-to-r from-blue-900 via-blue-500 to-blue-900 hidden md:block opacity-30"></div>
                 
                 {[
                    { icon: Users, title: "1. Registro Rápido", text: "Crea tu cuenta en 30 segundos. No pedimos datos innecesarios para empezar." },
                    { icon: Server, title: "2. Conexión IA", text: "Nuestro algoritmo asigna tu cuenta al servidor más rentable en ese momento." },
                    { icon: DollarSign, title: "3. Retira Ganancias", text: "Recibe tus pagos en Bitcoin, Ethereum o USDT directamente a tu wallet." }
                 ].map((step, i) => (
                    <div key={i} className="relative z-10 bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-xl hover:-translate-y-2 transition-transform">
                        <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/30 text-white font-bold text-2xl">
                            {i + 1}
                        </div>
                        <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                        <p className="text-gray-400">{step.text}</p>
                    </div>
                 ))}
            </div>
        </div>
      </section>

      {/* 7. FAQs */}
      <section className="py-20 container mx-auto px-6 max-w-4xl">
        <h2 className="text-4xl font-bold text-center mb-12">Preguntas Frecuentes</h2>
        <div className="space-y-2">
            <FaqItem 
                question="¿Es necesario pagar para retirar?" 
                answer="Por normativas anti-lavado de dinero (AML), se requiere una micro-verificación única de tarjeta o identidad para el primer retiro. Posteriormente, los retiros son automáticos." 
            />
            <FaqItem 
                question="¿Cuánto puedo ganar al día?" 
                answer="Depende de la congestión de la red y el precio de BTC. Actualmente, nuestros usuarios promedian entre $102 y $341 diarios con el plan estándar optimizado por IA." 
            />
            <FaqItem 
                question="¿Consume batería de mi móvil/PC?" 
                answer="NO. Todo el trabajo se realiza en nuestros servidores en la nube. Tu dispositivo solo actúa como control remoto para ver las estadísticas." 
            />
            <FaqItem 
                question="¿Es seguro dar mis datos?" 
                answer="Absolutamente. Utilizamos encriptación bancaria SSL de 256 bits y no compartimos tus datos con terceros. Cumplimos con la GDPR europea." 
            />
        </div>
      </section>

      {/* 8. FINAL CTA */}
      <section className="py-24 bg-gradient-to-b from-blue-900 to-slate-900 text-center">
        <div className="container mx-auto px-6">
            <h2 className="text-5xl font-bold mb-8">No dejes pasar el tren del Bitcoin</h2>
            <p className="text-xl text-blue-200 mb-10 max-w-2xl mx-auto">
                El Halving ya pasó. La oferta se reduce. La demanda aumenta. Estás a tiempo de posicionarte antes de que sea tarde.
            </p>
            <Link to="/register" className="inline-flex items-center gap-3 px-12 py-6 bg-white text-blue-900 font-bold text-2xl rounded-full hover:bg-gray-100 hover:scale-105 transition-all shadow-2xl">
                <Rocket className="w-8 h-8" />
                QUIERO EMPEZAR A GANAR YA
            </Link>
            <p className="mt-6 text-sm text-blue-300/60">Plazas limitadas en el servidor de Ámsterdam.</p>
        </div>
      </section>
    </div>
  );
};

// --- TECH PAGE (Expanded) ---
export const TechPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-900 text-white pt-20">
            {/* Header Tech */}
            <section className="py-20 bg-[#0B1120] border-b border-slate-800">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600">Infraestructura Cuántica</h1>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        Descubre cómo nuestros ASIC de última generación y algoritmos predictivos superan al mercado.
                    </p>
                </div>
            </section>

            {/* Section 1: Architecture Scheme */}
            <section className="py-24 container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    <div className="lg:w-1/2">
                        <div className="text-cyan-400 font-mono mb-2">01. ARQUITECTURA</div>
                        <h2 className="text-4xl font-bold mb-6">La Red Neural Descentralizada</h2>
                        <p className="text-gray-300 text-lg leading-relaxed mb-6">
                            A diferencia de las pools tradicionales, CriptoWallet AI utiliza una topología de malla (mesh). Tu dispositivo actúa como un "nodo ligero" que firma criptográficamente las peticiones, mientras que el "trabajo pesado" (Hashing SHA-256) se realiza en nuestros centros de datos.
                        </p>
                        <ul className="space-y-4">
                            <li className="flex items-center gap-3"><Server className="text-blue-500" /> Balanceo de carga dinámico <span className="text-xs bg-blue-900/30 px-2 py-1 rounded text-blue-300">Patente Pendiente</span></li>
                            <li className="flex items-center gap-3"><Wifi className="text-blue-500" /> Latencia ultra-baja (Global &lt; 20ms)</li>
                            <li className="flex items-center gap-3"><Lock className="text-blue-500" /> Encriptación AES-256 en tránsito</li>
                        </ul>
                    </div>
                    <div className="lg:w-1/2 bg-slate-800 p-8 rounded-3xl border border-slate-700 shadow-2xl relative overflow-hidden">
                        <div className="absolute inset-0 bg-grid-slate-700/[0.2] [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]"></div>
                        <div className="relative z-10 space-y-4">
                            <div className="flex justify-between items-center bg-slate-900 p-4 rounded-xl border border-slate-600">
                                <span className="font-mono text-green-400">USUARIO (WEB)</span>
                                <ArrowRight className="text-gray-500 animate-pulse" />
                                <span className="font-mono text-blue-400">LOAD BALANCER</span>
                            </div>
                            <div className="flex justify-center"><ArrowRight className="rotate-90 text-gray-500" /></div>
                            <div className="bg-slate-900 p-6 rounded-xl border border-blue-500/50 text-center">
                                <Cpu className="w-12 h-12 text-blue-500 mx-auto mb-2" />
                                <div className="font-bold text-white">CORE AI ENGINE</div>
                                <div className="text-xs text-gray-500">Optimización de Nonce en tiempo real</div>
                            </div>
                            <div className="flex justify-center"><ArrowRight className="rotate-90 text-gray-500" /></div>
                            <div className="grid grid-cols-3 gap-2">
                                <div className="bg-slate-900 p-2 rounded text-center border border-slate-700 text-xs">ASIC FARM 01</div>
                                <div className="bg-slate-900 p-2 rounded text-center border border-slate-700 text-xs">ASIC FARM 02</div>
                                <div className="bg-slate-900 p-2 rounded text-center border border-slate-700 text-xs">ASIC FARM 03</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 2: AI Predictive Mining */}
            <section className="py-24 bg-slate-800/30">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <div className="text-purple-400 font-mono mb-2">02. INTELIGENCIA ARTIFICIAL</div>
                        <h2 className="text-4xl font-bold">Predicción de Bloques (Gemini Integration)</h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 hover:border-purple-500 transition-colors">
                            <Zap className="w-10 h-10 text-purple-500 mb-4" />
                            <h3 className="text-xl font-bold mb-3">Análisis de Mempool</h3>
                            <p className="text-gray-400">Nuestra IA escanea la mempool de Bitcoin y prioriza las transacciones con mayores fees antes de que se confirme el bloque.</p>
                        </div>
                        <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 hover:border-purple-500 transition-colors">
                            <Activity className="w-10 h-10 text-purple-500 mb-4" />
                            <h3 className="text-xl font-bold mb-3">Eficiencia Energética</h3>
                            <p className="text-gray-400">El algoritmo apaga y enciende micro-chips en milisegundos para enfriar el hardware sin perder potencia de hash.</p>
                        </div>
                        <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 hover:border-purple-500 transition-colors">
                            <Layers className="w-10 h-10 text-purple-500 mb-4" />
                            <h3 className="text-xl font-bold mb-3">Selección de Stratum</h3>
                            <p className="text-gray-400">Cambiamos automáticamente entre pools (AntPool, Foundry, F2Pool) según cuál esté pagando más en ese segundo exacto.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 3: Green Energy */}
            <section className="py-24 container mx-auto px-6">
                <div className="flex flex-col md:flex-row-reverse items-center gap-16">
                    <div className="md:w-1/2">
                        <div className="text-emerald-400 font-mono mb-2">03. SOSTENIBILIDAD</div>
                        <h2 className="text-4xl font-bold mb-6">Energía 100% Verde en Islandia</h2>
                        <p className="text-gray-300 text-lg mb-6">
                            Nuestras instalaciones principales están ubicadas cerca de la planta geotérmica de Hellisheiði. Aprovechamos el vapor volcánico natural para alimentar nuestros ASIC S19 Pro+ Hydro.
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-emerald-900/20 p-4 rounded-xl border border-emerald-500/30">
                                <div className="text-3xl font-bold text-emerald-400">0%</div>
                                <div className="text-sm text-emerald-200">Emisiones de CO2</div>
                            </div>
                            <div className="bg-emerald-900/20 p-4 rounded-xl border border-emerald-500/30">
                                <div className="text-3xl font-bold text-emerald-400">4.2c</div>
                                <div className="text-sm text-emerald-200">Coste por kWh</div>
                            </div>
                        </div>
                    </div>
                    <div className="md:w-1/2 relative">
                         <div className="absolute inset-0 bg-emerald-500 rounded-2xl blur-3xl opacity-20"></div>
                         <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2940&auto=format&fit=crop" alt="Iceland" className="relative rounded-2xl border border-slate-700 shadow-2xl grayscale hover:grayscale-0 transition-all duration-700" />
                    </div>
                </div>
            </section>

            {/* Section 4: Hardware Specs */}
            <section className="py-24 bg-[#0F172A]">
                <div className="container mx-auto px-6 text-center">
                    <div className="text-blue-400 font-mono mb-2">04. HARDWARE</div>
                    <h2 className="text-4xl font-bold mb-12">Especificaciones de Nodos</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-700 text-gray-400 text-sm uppercase">
                                    <th className="p-4">Modelo</th>
                                    <th className="p-4">Hashrate Unitario</th>
                                    <th className="p-4">Eficiencia</th>
                                    <th className="p-4">Refrigeración</th>
                                </tr>
                            </thead>
                            <tbody className="text-white">
                                <tr className="border-b border-slate-800 bg-slate-800/50">
                                    <td className="p-4 font-bold">Bitmain Antminer S21</td>
                                    <td className="p-4 font-mono text-blue-400">200 TH/s</td>
                                    <td className="p-4">17.5 J/TH</td>
                                    <td className="p-4 flex items-center gap-2"><Wind size={16}/> Aire Forzado</td>
                                </tr>
                                <tr className="border-b border-slate-800 bg-slate-800/30">
                                    <td className="p-4 font-bold">Antminer S19 XP Hydro</td>
                                    <td className="p-4 font-mono text-blue-400">255 TH/s</td>
                                    <td className="p-4">20.8 J/TH</td>
                                    <td className="p-4 flex items-center gap-2 text-blue-300"><Activity size={16}/> Líquida (Hydro)</td>
                                </tr>
                                <tr className="border-b border-slate-800 bg-slate-800/50">
                                    <td className="p-4 font-bold text-yellow-400">Quantum ASIC Prototype v4</td>
                                    <td className="p-4 font-mono text-yellow-400">580 TH/s</td>
                                    <td className="p-4 text-yellow-400">12.2 J/TH</td>
                                    <td className="p-4 flex items-center gap-2 text-yellow-400"><Zap size={16}/> Inmersión en Aceite</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Section 5: Security */}
            <section className="py-24 container mx-auto px-6">
                 <div className="bg-slate-800 rounded-3xl p-12 border border-slate-700 flex flex-col items-center text-center">
                    <Shield className="w-20 h-20 text-blue-500 mb-6" />
                    <h2 className="text-3xl font-bold mb-6">Seguridad de Grado Militar</h2>
                    <div className="grid md:grid-cols-3 gap-8 w-full mt-8">
                        <div>
                            <h4 className="font-bold text-white mb-2">Cold Storage</h4>
                            <p className="text-gray-400 text-sm">El 98% de los fondos se almacenan en billeteras de hardware desconectadas de internet (Air-gapped) en búnkeres suizos.</p>
                        </div>
                        <div>
                            <h4 className="font-bold text-white mb-2">Auditorías 24/7</h4>
                            <p className="text-gray-400 text-sm">Nuestro código de Smart Contracts es auditado diariamente por CertiK y Hacken para prevenir vulnerabilidades.</p>
                        </div>
                        <div>
                            <h4 className="font-bold text-white mb-2">Seguro SAFU</h4>
                            <p className="text-gray-400 text-sm">Fondo de garantía de activos seguros de 500M$ para cubrir cualquier eventualidad técnica.</p>
                        </div>
                    </div>
                 </div>
            </section>

            {/* Section 6: Smart Contracts */}
            <section className="py-24 bg-slate-900">
                <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
                     <div className="md:w-1/2 font-mono text-sm bg-black p-6 rounded-xl border border-slate-800 shadow-2xl overflow-hidden">
                        <div className="text-green-400 mb-2">{'// PayoutLogic.sol'}</div>
                        <div className="text-blue-300 pl-4">function distributeRewards(address user) external {'{'}</div>
                        <div className="text-gray-400 pl-8">uint256 pending = calculateHashrate(user);</div>
                        <div className="text-gray-400 pl-8">require(contractBalance &gt;= pending, "Low Liq");</div>
                        <div className="text-purple-400 pl-8">payable(user).transfer(pending);</div>
                        <div className="text-gray-400 pl-8">emit PayoutSent(user, pending);</div>
                        <div className="text-blue-300 pl-4">{'}'}</div>
                     </div>
                     <div className="md:w-1/2">
                        <div className="text-purple-400 font-mono mb-2">05. SMART CONTRACTS</div>
                        <h2 className="text-4xl font-bold mb-6">Pagos Automatizados</h2>
                        <p className="text-gray-300 text-lg">
                            Eliminamos el error humano. Cuando solicitas un retiro en el panel, un contrato inteligente en la red Ethereum (Layer 2 Polygon para bajas comisiones) o Bitcoin Lightning Network ejecuta la transferencia instantáneamente sin intervención manual.
                        </p>
                     </div>
                </div>
            </section>

             {/* Section 7: Future Tech */}
             <section className="py-24 container mx-auto px-6 text-center">
                <h2 className="text-4xl font-bold mb-12">Roadmap Tecnológico 2025</h2>
                <div className="flex flex-col md:flex-row justify-center gap-8">
                    <div className="p-6 border border-slate-700 rounded-xl bg-slate-800/50 flex-1">
                        <div className="text-2xl font-bold text-blue-400 mb-2">Q1 2025</div>
                        <p className="text-gray-300">Implementación de Nodos Solares en Desierto de Atacama.</p>
                    </div>
                    <div className="p-6 border border-slate-700 rounded-xl bg-slate-800/50 flex-1">
                        <div className="text-2xl font-bold text-purple-400 mb-2">Q2 2025</div>
                        <p className="text-gray-300">Lanzamiento de Token de Gobernanza (CWA) para usuarios VIP.</p>
                    </div>
                    <div className="p-6 border border-slate-700 rounded-xl bg-slate-800/50 flex-1">
                        <div className="text-2xl font-bold text-emerald-400 mb-2">Q4 2025</div>
                        <p className="text-gray-300">Integración con Computación Cuántica IBM Q System One.</p>
                    </div>
                </div>
             </section>
        </div>
    );
};

// --- ABOUT PAGE (Expanded) ---
export const AboutPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-900 text-white pt-20">
             {/* Header About */}
             <section className="py-20 bg-[#0B1120] border-b border-slate-800">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-5xl font-bold mb-6">Nuestra Historia y Misión</h1>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        Democratizando el acceso a la riqueza digital desde 2019.
                    </p>
                </div>
            </section>

            {/* Section 1: Origin Story */}
            <section className="py-24 container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center gap-16">
                    <div className="md:w-1/2">
                        <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2832&auto=format&fit=crop" alt="Meeting" className="rounded-2xl shadow-2xl border border-slate-700 grayscale hover:grayscale-0 transition-all duration-700" />
                    </div>
                    <div className="md:w-1/2">
                        <div className="text-blue-500 font-bold mb-2">NUESTROS ORÍGENES</div>
                        <h2 className="text-4xl font-bold mb-6">De un Garaje a una Multinacional</h2>
                        <p className="text-gray-300 text-lg leading-relaxed mb-4">
                            CriptoWallet AI nació en 2019 cuando tres ingenieros de ex-Google y ex-NVIDIA se dieron cuenta de que la minería de Bitcoin se estaba volviendo demasiado centralizada. Solo las grandes corporaciones podían permitirse el hardware.
                        </p>
                        <p className="text-gray-300 text-lg leading-relaxed">
                            Decidimos crear una plataforma donde cualquier persona, con solo un portátil o móvil, pudiera "alquilar" potencia de cómputo sobrante de centros de datos. Hoy, gestionamos más de 450 Petahashes de potencia combinada.
                        </p>
                    </div>
                </div>
            </section>

            {/* Section 2: Mission & Values */}
            <section className="py-24 bg-slate-800/50">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold">Nuestros Valores Fundamentales</h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="p-8 bg-slate-900 rounded-xl border border-slate-700 text-center hover:border-blue-500 transition-colors">
                            <Target className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                            <h3 className="text-xl font-bold mb-2">Transparencia Radical</h3>
                            <p className="text-gray-400">Publicamos nuestras direcciones de billetera y auditorías mensualmente. Sin cajas negras.</p>
                        </div>
                        <div className="p-8 bg-slate-900 rounded-xl border border-slate-700 text-center hover:border-blue-500 transition-colors">
                            <Lock className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                            <h3 className="text-xl font-bold mb-2">Seguridad Obsesiva</h3>
                            <p className="text-gray-400">Protegemos los activos de nuestros usuarios como si fueran nuestra propia vida.</p>
                        </div>
                        <div className="p-8 bg-slate-900 rounded-xl border border-slate-700 text-center hover:border-blue-500 transition-colors">
                            <Users className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                            <h3 className="text-xl font-bold mb-2">Comunidad Primero</h3>
                            <p className="text-gray-400">Si nuestros usuarios no ganan, nosotros no ganamos. Nuestro modelo de negocio se basa en el éxito compartido.</p>
                        </div>
                    </div>
                </div>
            </section>

             {/* Section 3: The Team */}
             <section className="py-24 container mx-auto px-6">
                <h2 className="text-4xl font-bold text-center mb-16">Junta Directiva</h2>
                <div className="grid md:grid-cols-4 gap-8">
                    {[
                        { name: "Alex V.", role: "CEO & Founder", img: "https://ui-avatars.com/api/?name=Alex+V&background=0D8ABC&color=fff" },
                        { name: "Elena R.", role: "CTO (Ex-NVIDIA)", img: "https://ui-avatars.com/api/?name=Elena+R&background=0D8ABC&color=fff" },
                        { name: "Marcus J.", role: "Head of AI", img: "https://ui-avatars.com/api/?name=Marcus+J&background=0D8ABC&color=fff" },
                        { name: "Sarah L.", role: "Chief Legal Officer", img: "https://ui-avatars.com/api/?name=Sarah+L&background=0D8ABC&color=fff" }
                    ].map((member, i) => (
                        <div key={i} className="text-center group">
                            <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-slate-700 group-hover:border-blue-500 transition-colors mb-4">
                                <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
                            </div>
                            <h4 className="text-xl font-bold">{member.name}</h4>
                            <p className="text-blue-400 text-sm">{member.role}</p>
                        </div>
                    ))}
                </div>
             </section>

             {/* Section 4: Partners */}
             <section className="py-24 bg-white/5">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold mb-12">Socios Estratégicos</h2>
                    <div className="flex flex-wrap justify-center gap-12 opacity-70 grayscale hover:grayscale-0 transition-all">
                        <div className="text-2xl font-bold font-mono">AWS Activate</div>
                        <div className="text-2xl font-bold font-mono">Google Cloud for Startups</div>
                        <div className="text-2xl font-bold font-mono">Ledger Enterprise</div>
                        <div className="text-2xl font-bold font-mono">Chainlink Labs</div>
                    </div>
                </div>
             </section>

             {/* Section 5: CSR (Corporate Social Responsibility) */}
             <section className="py-24 container mx-auto px-6">
                <div className="bg-gradient-to-r from-emerald-900 to-slate-900 rounded-3xl p-12 border border-emerald-500/30 flex flex-col md:flex-row items-center gap-12">
                    <div className="md:w-2/3">
                        <h2 className="text-3xl font-bold mb-4 text-white">Iniciativa "Green Hash"</h2>
                        <p className="text-gray-300 mb-6">
                            Nos comprometemos a ser Carbono Negativo para 2026. Por cada Bitcoin minado, plantamos 1,000 árboles en proyectos de reforestación en el Amazonas y utilizamos el calor residual de nuestros servidores para calentar invernaderos en regiones frías.
                        </p>
                        <button className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-full text-white font-bold transition-colors">
                            Ver Informe de Impacto
                        </button>
                    </div>
                    <div className="md:w-1/3 flex justify-center">
                        <Heart className="w-32 h-32 text-emerald-500 animate-pulse" />
                    </div>
                </div>
             </section>

             {/* Section 6: Office Locations */}
             <section className="py-24 container mx-auto px-6 text-center">
                 <h2 className="text-4xl font-bold mb-12">Presencia Global</h2>
                 <div className="relative w-full max-w-4xl mx-auto h-[300px] bg-[#111] rounded-2xl border border-slate-700 overflow-hidden">
                     {/* Abstract Map Dots */}
                     <div className="absolute top-1/3 left-1/4 w-3 h-3 bg-blue-500 rounded-full animate-ping"></div> {/* USA */}
                     <div className="absolute top-1/4 right-1/3 w-3 h-3 bg-blue-500 rounded-full animate-ping delay-100"></div> {/* Europe */}
                     <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-blue-500 rounded-full animate-ping delay-200"></div> {/* Asia */}
                     <img src="https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg" className="w-full h-full object-cover opacity-20 filter invert" alt="World Map" />
                     <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="bg-black/70 backdrop-blur px-6 py-3 rounded-xl border border-white/10">
                            <p className="text-sm font-mono text-gray-300">
                                12 Data Centers <span className="mx-2">•</span> 4 Oficinas Corporativas <span className="mx-2">•</span> 150+ Empleados
                            </p>
                        </div>
                     </div>
                 </div>
             </section>

             {/* Section 7: Join Us */}
             <section className="py-24 bg-blue-900/10">
                 <div className="container mx-auto px-6 text-center">
                     <Briefcase className="w-16 h-16 text-blue-400 mx-auto mb-6" />
                     <h2 className="text-4xl font-bold mb-6">Únete al Equipo</h2>
                     <p className="text-gray-400 max-w-2xl mx-auto mb-8">
                         Siempre buscamos mentes brillantes en Rust, Solidity, AI y Ciberseguridad. Si quieres construir el futuro de las finanzas, este es tu lugar.
                     </p>
                     <Link to="/contact" className="px-8 py-3 border border-blue-500 text-blue-400 rounded-full hover:bg-blue-500 hover:text-white transition-colors uppercase font-bold text-sm tracking-widest">
                         Ver Vacantes
                     </Link>
                 </div>
             </section>
        </div>
    );
};

export const LegalPage: React.FC = () => {
    // Kept as defined in previous step (expanded legal)
    return (
    <div className="min-h-screen bg-slate-900 text-gray-300 pt-10 px-6 pb-20">
      <div className="container mx-auto max-w-5xl bg-slate-800 p-12 rounded-2xl shadow-2xl mt-12 border border-slate-700">
        <h1 className="text-4xl font-bold text-white mb-8 border-b border-gray-700 pb-4 flex items-center gap-3">
            <FileText /> Aviso Legal y Cumplimiento Normativo
        </h1>
        <div className="space-y-12 text-sm leading-relaxed text-justify">
            
            <div className="bg-blue-900/10 p-6 rounded-xl border border-blue-500/20">
                <p className="text-blue-200">
                    <strong>IMPORTANTE:</strong> CriptoWallet AI opera en estricto cumplimiento con las regulaciones de la Unión Europea relativas a los mercados de criptoactivos (MiCA) y las normativas antiblanqueo de capitales (AML5/AML6).
                </p>
            </div>

            <section>
                <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2"><Shield className="w-5 h-5 text-blue-500"/> 1. Información Corporativa y Legal</h3>
                <div className="bg-slate-900/50 p-6 rounded-lg border border-slate-700">
                    <p className="mb-4">En cumplimiento con el artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y del Comercio Electrónico (LSSICE), se exponen los datos identificativos del titular del sitio web:</p>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <li className="p-4 bg-slate-800 rounded border border-slate-700"><strong>Razón Social:</strong> CriptoWallet AI Technologies S.L.</li>
                        <li className="p-4 bg-slate-800 rounded border border-slate-700"><strong>NIF:</strong> B-55008726</li>
                        <li className="p-4 bg-slate-800 rounded border border-slate-700"><strong>Registro Mercantil:</strong> Madrid, Tomo 42.105, Folio 88, Sección 8, Hoja M-745455</li>
                        <li className="p-4 bg-slate-800 rounded border border-slate-700"><strong>Licencia VASP (Banco de España):</strong> D544-2024</li>
                    </ul>
                </div>
            </section>

            <section>
                <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2"><Globe className="w-5 h-5 text-green-500"/> 2. Reglamento MiCA (Markets in Crypto-Assets)</h3>
                <p>
                    CriptoWallet AI se adhiere plenamente al Reglamento (UE) 2023/1114 del Parlamento Europeo y del Consejo. Clasificamos nuestros servicios bajo la categoría de "Proveedor de Servicios de Criptoactivos" (CASP).
                </p>
                <ul className="list-disc pl-5 mt-4 space-y-2">
                    <li>Custodia y administración de criptoactivos en nombre de terceros.</li>
                    <li>Gestión de plataformas de negociación de criptoactivos.</li>
                    <li>Canje de criptoactivos por moneda fiduciaria de curso legal.</li>
                </ul>
                <p className="mt-4">
                    Todos los fondos de los usuarios están segregados de los fondos corporativos de la empresa, garantizando que, en el improbable caso de insolvencia, los activos de los clientes permanecen inalterados y recuperables.
                </p>
            </section>

            <section>
                <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2"><Lock className="w-5 h-5 text-red-500"/> 3. Política de Privacidad y GDPR</h3>
                <p>
                    De acuerdo con el Reglamento General de Protección de Datos (RGPD) (UE) 2016/679, le informamos que sus datos personales serán tratados con la finalidad de gestionar la relación contractual y el cumplimiento de las obligaciones legales.
                </p>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h4 className="font-bold text-white mb-2">Base Jurídica</h4>
                        <p className="text-gray-400">El tratamiento es necesario para la ejecución de un contrato en el que el interesado es parte y para el cumplimiento de una obligación legal aplicable al responsable del tratamiento.</p>
                    </div>
                    <div>
                        <h4 className="font-bold text-white mb-2">Destinatarios</h4>
                        <p className="text-gray-400">Sus datos no se cederán a terceros salvo obligación legal (Hacienda Pública, Fuerzas y Cuerpos de Seguridad, Jueces y Tribunales).</p>
                    </div>
                </div>
            </section>

            <section>
                <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2"><CheckCircle className="w-5 h-5 text-yellow-500"/> 4. Prevención de Blanqueo de Capitales (AML/KYC)</h3>
                <p>
                    En virtud de la Ley 10/2010, de 28 de abril, de prevención del blanqueo de capitales y de la financiación del terrorismo, CriptoWallet AI está obligada a aplicar medidas de diligencia debida.
                </p>
                <p className="mt-4">
                    <strong>Procedimiento de Verificación:</strong> Todos los usuarios que deseen retirar fondos deben someterse a un proceso de verificación de identidad (KYC) que puede incluir la validación de documentos oficiales y pruebas de vida. Las transacciones sospechosas serán reportadas al SEPBLAC.
                </p>
            </section>

             <section>
                <h3 className="text-xl font-bold text-white mb-3">5. Riesgos de los Criptoactivos</h3>
                <div className="border-l-4 border-red-500 pl-4 py-2 bg-red-900/5">
                    <p className="italic">
                        "La inversión en criptoactivos no está regulada, puede no ser adecuada para inversores minoristas y perderse la totalidad del importe invertido. Es importante leer y comprender los riesgos de esta inversión que se explican detalladamente en esta ubicación."
                    </p>
                </div>
            </section>

        </div>
      </div>
    </div>
  );
};