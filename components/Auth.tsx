import React, { useState } from 'react';
import { User, UserRole } from '../types';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, User as UserIcon, CheckSquare, Square, CheckCircle } from 'lucide-react';
import { HomePage } from './PublicPages';

interface LoginProps {
  users: User[];
  onLogin: (u: User) => void;
}

export const Login: React.FC<LoginProps> = ({ users, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Removed Captcha Check

    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      onLogin(user);
      if (user.role === UserRole.ADMIN) {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } else {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Page */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-50 grayscale transition-all duration-1000 blur-[2px]">
         <HomePage />
      </div>
      
      {/* Modal Overlay */}
      <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-slate-900 p-8 rounded-2xl shadow-2xl w-full max-w-md border border-slate-700 relative z-10 animate-scale-in">
            <h2 className="text-3xl font-bold text-center text-white mb-8">Iniciar Sesión</h2>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="relative">
                 <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                 <input 
                    type="email" 
                    placeholder="Email" 
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg py-3 pl-10 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                 />
              </div>
              <div className="relative">
                 <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
                 <input 
                    type="password" 
                    placeholder="Contraseña" 
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg py-3 pl-10 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                 />
              </div>
              
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors shadow-lg shadow-blue-500/30">
                Entrar al Nodo
              </button>
            </form>
            <p className="mt-6 text-center text-gray-400">
                ¿No tienes cuenta? <Link to="/register" className="text-blue-400 hover:underline">Regístrate gratis</Link>
            </p>
          </div>
      </div>
    </div>
  );
};

interface RegisterProps {
  onRegister: (u: User) => void;
}

export const Register: React.FC<RegisterProps> = ({ onRegister }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [captcha, setCaptcha] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!captcha) {
        alert("Completa el captcha.");
        return;
    }

    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      password,
      role: UserRole.USER,
      balance: 0,
      joinedDate: new Date().toISOString(),
      referralCode: Math.random().toString(36).substring(7).toUpperCase(),
      referralLevel: 'Bronce',
      xp: 0
    };

    onRegister(newUser);
    setShowSuccess(true);
    
    // Redirect after 2 seconds
    setTimeout(() => {
        navigate('/dashboard');
    }, 2000);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Page */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-50 grayscale transition-all duration-1000 blur-[2px]">
         <HomePage />
      </div>

      {/* Modal Overlay */}
      <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-slate-900 p-8 rounded-2xl shadow-2xl w-full max-w-md border border-slate-700 relative z-10 animate-scale-in">
            
            {showSuccess ? (
                <div className="flex flex-col items-center justify-center py-10 animate-fade-in-up">
                    <CheckCircle className="w-20 h-20 text-green-500 mb-6 animate-bounce" />
                    <h2 className="text-3xl font-bold text-white mb-2">¡Registro Exitoso!</h2>
                    <p className="text-gray-400 mb-6 text-center">Bienvenido al futuro de la minería, {name}.</p>
                    <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                        <div className="h-full bg-green-500 animate-[width_2s_ease-in-out_forwards]" style={{width: '0%'}}></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Redirigiendo al panel...</p>
                </div>
            ) : (
                <>
                    <h2 className="text-3xl font-bold text-center text-white mb-2">Crear Cuenta</h2>
                    <p className="text-center text-gray-400 mb-8 text-sm">Únete a +50,000 mineros activos</p>
                    
                    <form onSubmit={handleRegister} className="space-y-4">
                    <div className="relative">
                        <UserIcon className="absolute left-3 top-3 text-gray-400" size={20} />
                        <input 
                            type="text" 
                            placeholder="Nombre Completo" 
                            className="w-full bg-slate-800 border border-slate-600 rounded-lg py-3 pl-10 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="relative">
                        <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                        <input 
                            type="email" 
                            placeholder="Email" 
                            className="w-full bg-slate-800 border border-slate-600 rounded-lg py-3 pl-10 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="relative">
                        <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
                        <input 
                            type="password" 
                            placeholder="Contraseña" 
                            className="w-full bg-slate-800 border border-slate-600 rounded-lg py-3 pl-10 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div 
                        className="flex items-center gap-3 p-4 bg-slate-800 rounded-lg border border-slate-600 cursor-pointer select-none"
                        onClick={() => setCaptcha(!captcha)}
                    >
                        {captcha ? <CheckSquare className="text-green-500" /> : <Square className="text-gray-500" />}
                        <span className="text-sm text-gray-300">Verificación de Humano</span>
                    </div>

                    <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-colors shadow-lg shadow-green-500/30">
                        Registrarse y Empezar
                    </button>
                    </form>
                    <p className="mt-6 text-center text-gray-400">
                        ¿Ya tienes cuenta? <Link to="/login" className="text-blue-400 hover:underline">Inicia Sesión</Link>
                    </p>
                </>
            )}
          </div>
      </div>
    </div>
  );
};