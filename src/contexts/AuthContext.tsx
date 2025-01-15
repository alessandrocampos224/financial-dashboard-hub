import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { User } from '@supabase/supabase-js';
import { Database } from '@/integrations/supabase/types';

type Profile = Database['public']['Tables']['profiles']['Row'];

interface AuthContextType {
  user: (User & { profile?: Profile }) | null;
  loading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<(User & { profile?: Profile }) | null>(null);
  const [loading, setLoading] = useState(true);

  async function getProfile(userId: string) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (error) {
        console.error('Erro ao buscar perfil:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Erro ao buscar perfil:', error);
      return null;
    }
  }

  useEffect(() => {
    // Função para atualizar o usuário com seu perfil
    async function updateUserWithProfile(session: { user: User } | null) {
      try {
        if (session?.user) {
          const profile = await getProfile(session.user.id);
          setUser({ ...session.user, profile });
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Erro ao atualizar perfil do usuário:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    // Verificar sessão inicial e configurar listener
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Sessão inicial:', session);
      updateUserWithProfile(session);

      // Configurar listener para mudanças de autenticação
      const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
        console.log('Mudança de estado de autenticação:', event, session);
        
        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          await updateUserWithProfile(session);
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setLoading(false);
        }
      });

      return () => {
        subscription.unsubscribe();
      };
    });
  }, []);

  async function logout() {
    try {
      // Primeiro, limpar o estado local e localStorage
      setUser(null);
      localStorage.clear();
      
      // Tentar fazer signOut no Supabase
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('Erro durante signOut:', error);
        // Mesmo com erro no signOut, já limpamos o estado local
        throw error;
      }

      toast.success('Logout realizado com sucesso!');
      
      // Redirecionar para a página de login
      window.location.href = '/login';
    } catch (error) {
      console.error('Erro no logout:', error);
      // Mesmo com erro, já garantimos que o usuário está deslogado localmente
      // Forçar redirecionamento para login
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