import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { customerFormSchema, type CustomerFormValues } from "./schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { CustomerForm } from "./components/CustomerForm";
import { customerService } from "@/services/customer.service";

export default function CustomerFormPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const form = useForm<CustomerFormValues>({
    resolver: zodResolver(customerFormSchema),
    defaultValues: {
      name: "",
      fantasia: "",
      document: "",
      rg: "",
      ie: "ISENTO",
      phone: "",
      email: "",
      password: "",
      description: "",
      status: true,
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: CustomerFormValues) => {
      try {
        console.log("Iniciando criação do cliente...");
        console.log("Dados do formulário:", data);
        
        // 1. Verificar se o usuário já existe
        const { error: checkError } = await supabase.auth.signInWithPassword({
          email: data.email,
          password: data.password,
        });

        if (!checkError) {
          throw new Error("Um usuário com este email já existe no sistema.");
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
          console.error("Erro ao criar usuário:", authError);
          throw authError;
        }

        if (!authData.user) {
          throw new Error("Usuário não foi criado");
        }

        // 3. Buscar o ID do perfil 'customer'
        const roleId = await customerService.getRoleIdByAlias("customer");
        
        // 4. Criar o perfil do cliente
        const customer = await customerService.createCustomer(
          data,
          authData.user.id,
          roleId,
          user?.profile?.tenant_id || "1"
        );

        console.log("Cliente criado com sucesso:", customer);
        return customer;
      } catch (error) {
        console.error("Erro completo:", error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      toast.success("Cliente criado com sucesso!");
      navigate("/financial/customers");
    },
    onError: (error: any) => {
      console.error("Erro ao criar cliente:", error);
      const errorMessage = error.message || "Erro ao criar cliente. Por favor, verifique os dados e tente novamente.";
      toast.error(errorMessage);
    },
  });

  const onSubmit = async (data: CustomerFormValues) => {
    createMutation.mutate(data);
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Novo Cliente</h1>
      </div>

      <CustomerForm
        form={form}
        isSubmitting={createMutation.isPending}
        onSubmit={onSubmit}
        onCancel={() => navigate("/financial/customers")}
      />
    </div>
  );
}