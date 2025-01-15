import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Carrier } from "@/types/carrier";

export function useCarriers() {
  const queryClient = useQueryClient();

  const { data: carriers = [], isLoading } = useQuery({
    queryKey: ["carriers"],
    queryFn: async () => {
      console.log("Buscando transportadoras...");
      const { data, error } = await supabase
        .from("carriers")
        .select("*")
        .is("deleted_at", null)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Erro ao buscar transportadoras:", error);
        toast.error("Erro ao carregar transportadoras");
        throw error;
      }

      return data as Carrier[];
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (carrierId: string) => {
      console.log("Iniciando exclusão da transportadora:", carrierId);
      
      const { error } = await supabase.functions.invoke('delete-carrier', {
        body: { carrierId }
      });

      if (error) {
        console.error("Erro ao excluir transportadora:", error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["carriers"] });
      toast.success("Transportadora excluída com sucesso!");
    },
    onError: (error: Error) => {
      console.error("Erro ao excluir transportadora:", error);
      toast.error(`Erro ao excluir transportadora: ${error.message}`);
    },
  });

  return {
    carriers,
    isLoading,
    deleteCarrier: deleteMutation.mutate,
    isDeletingCarrier: deleteMutation.isPending,
  };
}