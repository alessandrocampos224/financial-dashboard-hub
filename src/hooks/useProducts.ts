import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Product } from "@/types/product";

// Função auxiliar para validar UUID
const isValidUUID = (uuid: string) => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
};

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
      
      const cleanProduct = {
        ...product,
        category_id: product.category_id && isValidUUID(product.category_id) ? product.category_id : undefined,
        brand_id: product.brand_id && isValidUUID(product.brand_id) ? product.brand_id : undefined,
      };

      const { data, error } = await supabase
        .from("products")
        .insert([cleanProduct])
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

  const updateMutation = useMutation({
    mutationFn: async ({ id, ...product }: Product) => {
      console.log("Atualizando produto:", { id, ...product });
      
      const cleanProduct = {
        ...product,
        category_id: product.category_id && isValidUUID(product.category_id) ? product.category_id : undefined,
        brand_id: product.brand_id && isValidUUID(product.brand_id) ? product.brand_id : undefined,
      };

      const { data, error } = await supabase
        .from("products")
        .update(cleanProduct)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error("Erro ao atualizar produto:", error);
        throw error;
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Produto atualizado com sucesso!");
    },
    onError: (error: Error) => {
      console.error("Erro ao atualizar produto:", error);
      toast.error(`Erro ao atualizar produto: ${error.message}`);
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
    updateProduct: updateMutation.mutate,
    isCreatingProduct: createMutation.isPending,
    isUpdatingProduct: updateMutation.isPending,
    deleteProduct: deleteMutation.mutate,
    isDeletingProduct: deleteMutation.isPending,
  };
}