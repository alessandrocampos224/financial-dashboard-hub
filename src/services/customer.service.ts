import { supabase } from "@/integrations/supabase/client";
import { CustomerFormValues } from "@/pages/financial/customers/schema";

export const customerService = {
  async checkExistingUser(email: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: "dummy-password", // apenas para verificar se o usuário existe
    });

    // Se não houver erro de credenciais inválidas, significa que o usuário existe
    return !error || error.message !== "Invalid login credentials";
  },

  async createCustomer(data: CustomerFormValues, roleId: string, tenantId: string) {
    try {
      console.log("Iniciando criação do cliente...");
      console.log("Dados do formulário:", data);

      // 1. Criar o usuário no auth
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
        console.error("Erro ao criar usuário:", authError);
        throw authError;
      }

      if (!authData.user) {
        throw new Error("Usuário não foi criado");
      }

      // 2. Criar o perfil do cliente
      const profileData = {
        id: authData.user.id,
        name: data.name,
        fantasia: data.fantasia,
        document: data.document,
        rg: data.rg,
        ie: data.ie,
        phone: data.phone,
        email: data.email,
        type: "customer",
        roles_id: roleId,
        tenant_id: tenantId,
        description: data.description,
        status: data.status,
      };

      const { data: customer, error: profileError } = await supabase
        .from("profiles")
        .insert(profileData)
        .select()
        .single();

      if (profileError) {
        console.error("Erro ao criar perfil:", profileError);
        // Tentar remover o usuário auth se falhar ao criar o perfil
        await supabase.auth.admin.deleteUser(authData.user.id);
        throw profileError;
      }

      return customer;
    } catch (error) {
      console.error("Erro completo:", error);
      throw error;
    }
  },

  async getRoleIdByAlias(alias: string) {
    const { data, error } = await supabase
      .from("roles")
      .select("id")
      .eq("alias", alias)
      .single();

    if (error) throw error;
    return data.id;
  }
};