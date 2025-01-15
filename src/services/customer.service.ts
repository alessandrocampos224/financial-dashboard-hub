import { supabase } from "@/integrations/supabase/client";
import { CustomerFormValues } from "@/pages/financial/customers/schema";

export const customerService = {
  async createCustomer(data: CustomerFormValues, userId: string, roleId: string, tenantId: string) {
    const profileData = {
      id: userId,
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
      status: data.status
    };

    const { data: customer, error } = await supabase
      .from("profiles")
      .insert(profileData)
      .select()
      .single();

    if (error) throw error;
    return customer;
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