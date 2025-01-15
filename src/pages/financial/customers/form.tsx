import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustomerBasicInfo } from "./components/CustomerBasicInfo";
import { CustomerContact } from "./components/CustomerContact";
import { customerFormSchema, type CustomerFormValues } from "./schema";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export default function CustomerForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const { data: customer, isLoading } = useQuery({
    queryKey: ["customer", id],
    queryFn: async () => {
      if (!id) return null;
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (error) {
        console.error("Erro ao buscar cliente:", error);
        throw error;
      }
      return data;
    },
    enabled: !!id,
  });

  const form = useForm<CustomerFormValues>({
    resolver: zodResolver(customerFormSchema),
    defaultValues: {
      name: customer?.name || "",
      fantasia: customer?.fantasia || "",
      document: customer?.document || "",
      rg: customer?.rg || "",
      ie: customer?.ie || "ISENTO",
      phone: customer?.phone || "",
      email: customer?.email || "",
      password: "",
      description: customer?.description || "",
      status: customer?.status ?? true,
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: CustomerFormValues) => {
      try {
        console.log("Iniciando criação do cliente...");
        console.log("Dados do formulário:", data);
        
        // 1. Primeiro criar o usuário no auth
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

        // 2. Buscar o ID do perfil 'customer'
        const { data: roleData, error: roleError } = await supabase
          .from("roles")
          .select("id")
          .eq("alias", "customer")
          .single();

        if (roleError) {
          console.error("Erro ao buscar role:", roleError);
          throw roleError;
        }

        // 3. Criar o perfil do cliente
        const { data: newCustomer, error } = await supabase
          .from("profiles")
          .update([{
            id: authData.user.id,
            name: data.name,
            fantasia: data.fantasia,
            document: data.document,
            rg: data.rg,
            ie: data.ie,
            phone: data.phone,
            email: data.email,
            type: "customer",
            roles_id: roleData.id,
            tenant_id: user?.profile?.tenant_id || "1",
            description: data.description,
            status: data.status
          }])
          .eq('id', authData.user.id)
          .select();

        if (error) {
          console.error("Erro ao criar cliente:", error);
          throw error;
        }

        console.log("Cliente criado com sucesso:", newCustomer);
        return newCustomer;
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
    onError: (error) => {
      console.error("Erro ao criar cliente:", error);
      toast.error("Erro ao criar cliente. Por favor, verifique os dados e tente novamente.");
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: CustomerFormValues) => {
      if (!id) return;
      const { error } = await supabase
        .from("profiles")
        .update({
          name: data.name,
          fantasia: data.fantasia,
          document: data.document,
          rg: data.rg,
          ie: data.ie,
          phone: data.phone,
          email: data.email,
          type: "customer",
          description: data.description,
          status: data.status,
          tenant_id: user?.profile?.tenant_id || "1",
        })
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      toast.success("Cliente atualizado com sucesso!");
      navigate("/financial/customers");
    },
    onError: (error) => {
      console.error("Erro ao atualizar cliente:", error);
      toast.error("Erro ao atualizar cliente");
    },
  });

  const onSubmit = async (data: CustomerFormValues) => {
    console.log("Dados do formulário:", data);
    if (isEditing) {
      updateMutation.mutate(data);
    } else {
      createMutation.mutate(data);
    }
  };

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          {isEditing ? "Editar Cliente" : "Novo Cliente"}
        </h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CustomerBasicInfo form={form} />
            <CustomerContact form={form} />

            <div className="col-span-2">
              <Textarea
                placeholder="Descrição"
                {...form.register("description")}
              />
            </div>

            <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <Checkbox
                checked={Boolean(form.watch("status"))}
                onCheckedChange={(checked) => form.setValue("status", !!checked)}
              />
              <div className="space-y-1 leading-none">
                <span>Ativo</span>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/financial/customers")}
            >
              Cancelar
            </Button>
            <Button type="submit">Salvar</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}