import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Customer } from "@/types/customer";

export function useCustomers() {
  const queryClient = useQueryClient();

  const { data: customers = [], isLoading } = useQuery({
    queryKey: ["customers"],
    queryFn: async () => {
      console.log("Buscando clientes...");
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Erro ao buscar clientes:", error);
        toast.error("Erro ao carregar clientes");
        throw error;
      }

      return data as Customer[];
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (customerId: string) => {
      console.log("Iniciando exclusão do cliente:", customerId);
      
      const { error } = await supabase
        .from("profiles")
        .delete()
        .eq("id", customerId);

      if (error) {
        console.error("Erro ao excluir cliente:", error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      toast.success("Cliente excluído com sucesso!");
    },
    onError: (error: Error) => {
      console.error("Erro ao excluir cliente:", error);
      toast.error(`Erro ao excluir cliente: ${error.message}`);
    },
  });

  return {
    customers,
    isLoading,
    deleteCustomer: deleteMutation.mutate,
    isDeletingCustomer: deleteMutation.isPending,
  };
}