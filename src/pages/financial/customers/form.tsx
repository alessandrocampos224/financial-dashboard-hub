import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { customerFormSchema, type CustomerFormValues } from "./schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
        // 1. Verificar se o usuário já existe
        const userExists = await customerService.checkExistingUser(data.email);
        if (userExists) {
          throw new Error("Um usuário com este email já existe no sistema.");
        }

        // 2. Buscar o ID do perfil 'customer'
        const roleId = await customerService.getRoleIdByAlias("customer");
        if (!roleId) {
          throw new Error("Perfil 'customer' não encontrado.");
        }
        
        // 3. Criar o cliente
        const customer = await customerService.createCustomer(
          data,
          roleId,
          user?.profile?.tenant_id || "1"
        );

        return customer;
      } catch (error: any) {
        console.error("Erro ao criar cliente:", error);
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