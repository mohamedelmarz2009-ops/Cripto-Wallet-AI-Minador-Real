import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { HomePage, TechPage, AboutPage, LegalPage } from './components/PublicPages';
import { Dashboard } from './components/Dashboard';
import { AdminPanel } from './components/Admin';
import { Login, Register } from './components/Auth';
import { User, AppState, UserRole, WithdrawalRequest } from './types';

const INITIAL_STATE: AppState = {
  users: [
    { 
        id: 'admin-001', 
        name: 'Administrador', 
        email: 'admin@criptowallet.com', 
        password: 'admincriptowallet', 
        role: UserRole.ADMIN, 
        balance: 0, 
        joinedDate: new Date().toISOString(),
        referralCode: 'ADMIN',
        referralLevel: 'Oro',
        xp: 9999
    }
  ],
  currentUser: null,
  withdrawals: [],
  adminConfig: {
    nigeriaProxy: false,
    maintenanceMode: false
  }
};

const Layout: React.FC<{children: React.ReactNode}> = ({ children }) => {
    return (
        <div className="font-sans antialiased text-white">
            <nav className="fixed w-full z-50 bg-slate-900/90 backdrop-blur-md border-b border-white/10 shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        <div className="flex items-center gap-2">
                             <div className="w-8 h-8 bg-gradient-to-tr from-blue-500 to-emerald-400 rounded-lg flex items-center justify-center font-bold text-slate-900">AI</div>
                            <Link to="/" className="text-2xl font-bold tracking-tighter hover:text-blue-400 transition-colors">
                                CriptoWallet<span className="text-blue-500">AI</span>
                            </Link>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-center space-x-8">
                                <Link to="/" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors">Inicio</Link>
                                <Link to="/tech" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors">Tecnología</Link>
                                <Link to="/about" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors">Sobre Nosotros</Link>
                                <Link to="/login" className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 px-6 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-blue-500/30 transition-all transform hover:scale-105">
                                    Área Clientes
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <div className="pt-20">
                {children}
            </div>
            <footer className="bg-slate-950 border-t border-gray-800 py-16 text-sm">
                <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-12 mb-12">
                    <div className="space-y-4">
                        <h4 className="text-2xl font-bold text-white">CriptoWallet<span className="text-blue-500">AI</span></h4>
                        <p className="text-gray-400 leading-relaxed">
                            Infraestructura de minería descentralizada operada por inteligencia artificial cuántica.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-6 text-lg">Legal</h4>
                        <ul className="space-y-3 text-gray-400">
                            <li><Link to="/legal" className="hover:text-blue-400 transition-colors">Aviso Legal</Link></li>
                            <li><Link to="/legal" className="hover:text-blue-400 transition-colors">Política de Privacidad</Link></li>
                            <li><Link to="/legal" className="hover:text-blue-400 transition-colors">Cumplimiento AML/KYC</Link></li>
                            <li><Link to="/legal" className="hover:text-blue-400 transition-colors">Términos de Uso</Link></li>
                        </ul>
                    </div>
                     <div>
                        <h4 className="text-white font-bold mb-6 text-lg">Empresa</h4>
                        <ul className="space-y-3 text-gray-400">
                            <li><Link to="/about" className="hover:text-blue-400 transition-colors">Equipo</Link></li>
                            <li><Link to="/tech" className="hover:text-blue-400 transition-colors">Nuestros Nodos</Link></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Prensa</a></li>
                        </ul>
                    </div>
                     <div>
                        <h4 className="text-white font-bold mb-6 text-lg">Comunidad</h4>
                        <ul className="space-y-3 text-gray-400">
                            <li><a href="https://t.me/jorgecybersec10" target="_blank" className="hover:text-blue-400 transition-colors flex items-center gap-2">Telegram Oficial</a></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-800 pt-8 text-center text-gray-500">
                    <p>© 2025 CriptoWallet AI Technologies S.L. Todos los derechos reservados.</p>
                    <p className="mt-2 text-xs">Sede Fiscal: Paseo de la Castellana 259, Madrid, España - NIF: 55008726R</p>
                </div>
            </footer>
        </div>
    );
};

// Moved outside App to prevent recreation and fix type inference issues
interface RouteProps {
    user: User | null;
}

const ProtectedRoute = ({ children, user }: React.PropsWithChildren<RouteProps>) => {
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

const AdminRoute = ({ children, user }: React.PropsWithChildren<RouteProps>) => {
  if (!user || user.role !== UserRole.ADMIN) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

// Security Simulation Helper
const sanitizeInput = (input: string) => {
    return input.replace(/[<>&'"]/g, ""); // Basic XSS sanitization simulation
}

export default function App() {
  const [appState, setAppState] = useState<AppState>(INITIAL_STATE);

  const login = (u: User) => {
    setAppState(prev => ({ ...prev, currentUser: u }));
  };

  const logout = () => {
    setAppState(prev => ({ ...prev, currentUser: null }));
  };

  const registerUser = (newUser: User) => {
    // SECURITY: Sanitize inputs before adding to state to prevent stored XSS
    const sanitizedUser = {
        ...newUser,
        name: sanitizeInput(newUser.name),
        email: sanitizeInput(newUser.email)
    };

    setAppState(prev => ({
        ...prev,
        users: [...prev.users, sanitizedUser],
        currentUser: sanitizedUser // Auto login
    }));
  };

  const updateUser = (updatedUser: User) => {
    // Update current user and the user in the main array
    setAppState(prev => ({
        ...prev,
        currentUser: updatedUser,
        users: prev.users.map(u => u.id === updatedUser.id ? updatedUser : u)
    }));
  };

  const addWithdrawal = (w: WithdrawalRequest) => {
    setAppState(prev => ({
        ...prev,
        withdrawals: [w, ...prev.withdrawals]
    }));
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><HomePage /></Layout>} />
        <Route path="/tech" element={<Layout><TechPage /></Layout>} />
        <Route path="/about" element={<Layout><AboutPage /></Layout>} />
        <Route path="/legal" element={<Layout><LegalPage /></Layout>} />
        
        <Route path="/login" element={<Login users={appState.users} onLogin={login} />} />
        <Route path="/register" element={<Register onRegister={registerUser} />} />
        
        <Route 
            path="/dashboard" 
            element={
                <ProtectedRoute user={appState.currentUser}>
                    <Dashboard 
                        user={appState.currentUser!} 
                        appState={appState}
                        updateUser={updateUser}
                        addWithdrawal={addWithdrawal}
                        logout={logout}
                    />
                </ProtectedRoute>
            } 
        />
        
        <Route 
            path="/admin" 
            element={
                <AdminRoute user={appState.currentUser}>
                    <AdminPanel appState={appState} setAppState={setAppState} />
                </AdminRoute>
            } 
        />
      </Routes>
    </Router>
  );
}