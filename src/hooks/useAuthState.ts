import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

type Profile = Database['public']['Tables']['profiles']['Row'];

export function useAuthState() {
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

    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Sessão inicial:', session);
      updateUserWithProfile(session);

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

  return { user, loading, setUser };
}