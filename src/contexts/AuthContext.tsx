import React, { createContext, useContext } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { User } from '@supabase/supabase-js';
import { Database } from '@/integrations/supabase/types';
import { useAuthState } from '@/hooks/useAuthState';

type Profile = Database['public']['Tables']['profiles']['Row'];

interface AuthContextType {
  user: (User & { profile?: Profile }) | null;
  loading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user, loading, setUser } = useAuthState();

  async function logout() {
    try {
      // Primeiro, limpar o estado local
      setUser(null);
      localStorage.clear();
      
      // Tentar fazer signOut no Supabase
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('Erro durante signOut:', error);
        throw error;
      }

      toast.success('Logout realizado com sucesso!');
      window.location.href = '/login';
    } catch (error) {
      console.error('Erro no logout:', error);
      // Mesmo com erro, garantimos que o usuário está deslogado localmente
      window.location.href = '/login';
      throw error;
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}