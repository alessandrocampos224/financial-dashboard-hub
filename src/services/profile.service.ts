import { supabase } from "@/integrations/supabase/client";

export const profileService = {
  async createProfile(userId: string, data: { name?: string; email?: string; avatar_url?: string }) {
    try {
      const { error } = await supabase
        .from('profiles')
        .insert([
          {
            id: userId,
            ...data
          }
        ]);

      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error('Erro ao criar perfil:', error);
      throw error;
    }
  },

  async getProfile(userId: string) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Erro ao buscar perfil:', error);
      throw error;
    }
  },

  async updateProfile(userId: string, updates: { name?: string; email?: string; avatar_url?: string }) {
    try {
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', userId);

      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      throw error;
    }
  }
};