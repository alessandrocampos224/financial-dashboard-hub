import { supabase } from "@/integrations/supabase/client";
import { CustomerFormValues } from "@/pages/financial/customers/schema";

export const customerService = {
  async checkExistingUser(email: string) {
    try {
      console.log('Verificando existência do usuário:', email);
      
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('id, email')
        .eq('email', email)
        .maybeSingle();

      if (profileError) {
        console.error('Erro ao verificar perfil existente:', profileError);
        throw profileError;
      }
      
      return !!profileData;
    } catch (error) {
      console.error('Erro ao verificar usuário:', error);
      return false;
    }
  },

  async getRoleIdByAlias(alias: string) {
    try {
      const { data, error } = await supabase
        .from('roles')
        .select('id')
        .eq('alias', alias)
        .maybeSingle();

      if (error) {
        console.error('Erro ao buscar role:', error);
        throw new Error('Erro ao buscar role');
      }

      return data?.id;
    } catch (error) {
      console.error('Erro ao buscar role:', error);
      throw error;
    }
  },

  async createCustomer(data: CustomerFormValues, roleId: string, tenantId: string) {
    try {
      console.log('Iniciando criação do cliente...');
      console.log('Dados do formulário:', data);

      // 1. Verificar se o usuário já existe
      const userExists = await this.checkExistingUser(data.email);
      if (userExists) {
        throw new Error('Um usuário com este email já existe no sistema.');
      }

      // 2. Criar o usuário no auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            name: data.name,
          },
        },
      });

      if (authError) {
        console.error('Erro ao criar usuário:', authError);
        throw authError;
      }

      if (!authData.user) {
        throw new Error('Usuário não foi criado');
      }

      // 3. Aguardar um momento para garantir que o trigger criou o perfil
      await new Promise(resolve => setTimeout(resolve, 1000));

      // 4. Atualizar o perfil do cliente com informações adicionais
      const profileData = {
        name: data.name,
        fantasia: data.fantasia,
        document: data.document,
        rg: data.rg,
        ie: data.ie,
        phone: data.phone,
        type: 'customer',
        roles_id: roleId,
        tenant_id: tenantId,
        description: data.description,
        status: data.status,
      };

      console.log('Dados do perfil a serem atualizados:', profileData);

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .update(profileData)
        .eq('id', authData.user.id)
        .select()
        .single();

      if (profileError) {
        console.error('Erro ao atualizar perfil:', profileError);
        throw profileError;
      }

      console.log('Perfil atualizado com sucesso:', profile);
      return profile;
    } catch (error) {
      console.error('Erro completo:', error);
      throw error;
    }
  }
};