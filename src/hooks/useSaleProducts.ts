import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/types/product";
import { Item } from "@/types/item";
import { useToast } from "@/components/ui/use-toast";

export function useSaleProducts() {
  const { toast } = useToast();
  const [items, setItems] = useState<Item[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const searchProducts = async (term: string) => {
    if (!term) {
      setFilteredProducts([]);
      return;
    }

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .or(`name.ilike.%${term}%,code.ilike.%${term}%`)
      .eq('status', true)
      .limit(5);

    if (error) {
      console.error("Erro ao buscar produtos:", error);
      return;
    }

    setFilteredProducts(data || []);
  };

  const addItem = (product: Product) => {
    const existingItem = items.find((item) => item.product_id === product.id);

    if (existingItem) {
      setItems(
        items.map((item) =>
          item.product_id === product.id
            ? {
                ...item,
                quantity: (item.quantity || 0) + 1,
                amount: ((item.quantity || 0) + 1) * (item.unitary || 0),
              }
            : item
        )
      );
    } else {
      const newItem: Item = {
        id: Math.random().toString(),
        tenant_id: "1",
        order_id: "1",
        product_id: product.id,
        quantity: 1,
        unitary: product.price,
        amount: product.price,
        status: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        product: {
          name: product.name,
          code: product.code,
        },
      };
      setItems([...items, newItem]);
    }
    setSelectedProduct(null);
    toast({
      title: "Produto adicionado",
      description: `${product.name} foi adicionado ao pedido`,
    });
  };

  const updateQuantity = (itemId: string, increment: boolean) => {
    setItems(
      items.map((item) => {
        if (item.id === itemId) {
          const newQuantity = increment
            ? (item.quantity || 0) + 1
            : Math.max((item.quantity || 0) - 1, 1);
          return {
            ...item,
            quantity: newQuantity,
            amount: newQuantity * (item.unitary || 0),
          };
        }
        return item;
      })
    );
  };

  const removeItem = (itemId: string) => {
    setItems(items.filter((item) => item.id !== itemId));
    toast({
      title: "Produto removido",
      description: "Item removido do pedido",
    });
  };

  const total = items.reduce((sum, item) => sum + (item.amount || 0), 0);

  return {
    items,
    filteredProducts,
    selectedProduct,
    total,
    searchProducts,
    addItem,
    updateQuantity,
    removeItem,
  };
}