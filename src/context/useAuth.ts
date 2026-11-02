import type { User, UserCredential } from 'firebase/auth';
import { createContext, useContext } from 'react';

interface UserAuthContextType {
  user: User | null;
  signUp: (email: string, password: string) => Promise<UserCredential>;
  logIn: (email: string, password: string) => Promise<UserCredential>;
  logOut: () => Promise<void>;
}

export const AuthContext = createContext<UserAuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthContextProvider');
  }
  return context;
};
