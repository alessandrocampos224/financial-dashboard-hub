import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Product } from "@/types/product";

export function useProducts() {
  const queryClient = useQueryClient();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      console.log("Buscando produtos...");
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .is("deleted_at", null)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Erro ao buscar produtos:", error);
        toast.error("Erro ao carregar produtos");
        throw error;
      }

      return data as Product[];
    },
  });

  const createMutation = useMutation({
    mutationFn: async (product: Pick<Product, "code" | "name" | "price"> & Partial<Omit<Product, "code" | "name" | "price">>) => {
      console.log("Criando produto:", product);
      const { data, error } = await supabase
        .from("products")
        .insert([product])
        .select()
        .single();

      if (error) {
        console.error("Erro ao criar produto:", error);
        throw error;
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Produto criado com sucesso!");
    },
    onError: (error: Error) => {
      console.error("Erro ao criar produto:", error);
      toast.error(`Erro ao criar produto: ${error.message}`);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (productId: string) => {
      console.log("Iniciando exclusão do produto:", productId);
      
      const { error } = await supabase.functions.invoke('delete-product', {
        body: { productId }
      });

      if (error) {
        console.error("Erro ao excluir produto:", error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Produto excluído com sucesso!");
    },
    onError: (error: Error) => {
      console.error("Erro ao excluir produto:", error);
      toast.error(`Erro ao excluir produto: ${error.message}`);
    },
  });

  return {
    products,
    isLoading,
    createProduct: createMutation.mutate,
    isCreatingProduct: createMutation.isPending,
    deleteProduct: deleteMutation.mutate,
    isDeletingProduct: deleteMutation.isPending,
  };
}