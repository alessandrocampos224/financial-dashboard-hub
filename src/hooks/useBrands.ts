import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Brand } from "@/types/brand";

export function useBrands() {
  const queryClient = useQueryClient();

  const { data: brands = [], isLoading } = useQuery({
    queryKey: ["brands"],
    queryFn: async () => {
      console.log("Buscando marcas...");
      const { data, error } = await supabase
        .from("brands")
        .select("*")
        .is("deleted_at", null)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Erro ao buscar marcas:", error);
        toast.error("Erro ao carregar marcas");
        throw error;
      }

      return data as Brand[];
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (brandId: string) => {
      console.log("Iniciando exclusão da marca:", brandId);
      
      const { error } = await supabase.functions.invoke('delete-brand', {
        body: { brandId }
      });

      if (error) {
        console.error("Erro ao excluir marca:", error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brands"] });
      toast.success("Marca excluída com sucesso!");
    },
    onError: (error: Error) => {
      console.error("Erro ao excluir marca:", error);
      toast.error(`Erro ao excluir marca: ${error.message}`);
    },
  });

  return {
    brands,
    isLoading,
    deleteBrand: deleteMutation.mutate,
    isDeletingBrand: deleteMutation.isPending,
  };
}