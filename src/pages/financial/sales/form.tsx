import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Search, X, Minus, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Item } from "@/types/item";
import { Product } from "@/types/product";
import { CustomerSelector } from "./components/CustomerSelector";
import { ProductSearch } from "./components/ProductSearch";
import { OrderSummary } from "./components/OrderSummary";
import { supabase } from "@/integrations/supabase/client";

export default function SalesForm() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCustomerDialogOpen, setIsCustomerDialogOpen] = useState(false);
  const [items, setItems] = useState<Item[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  // Função para buscar produtos baseado no termo de busca
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

  // Atualiza a busca quando o termo muda
  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    searchProducts(term);
  };

  const handleSave = async () => {
    try {
      if (!selectedCustomer) {
        toast({
          variant: "destructive",
          title: "Erro",
          description: "Selecione um cliente para continuar",
        });
        return;
      }

      if (items.length === 0) {
        toast({
          variant: "destructive",
          title: "Erro",
          description: "Adicione pelo menos um item ao pedido",
        });
        return;
      }

      const total = items.reduce((sum, item) => sum + (item.amount || 0), 0);

      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          customer_id: selectedCustomer.id,
          amount: total,
          price: total,
          status: true,
        })
        .select()
        .single();

      if (orderError) throw orderError;

      const orderItems = items.map((item) => ({
        order_id: order.id,
        product_id: item.product_id,
        quantity: item.quantity,
        unitary: item.unitary,
        amount: item.amount,
        status: true,
      }));

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItems);

      if (itemsError) throw itemsError;

      toast({
        title: "Sucesso",
        description: "Venda realizada com sucesso",
      });

      navigate("/financial/sales");
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Erro ao salvar venda",
      });
    }
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
    setSearchTerm("");
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

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Nova Venda</h1>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <CustomerSelector
            selectedCustomer={selectedCustomer}
            setSelectedCustomer={setSelectedCustomer}
            isCustomerDialogOpen={isCustomerDialogOpen}
            setIsCustomerDialogOpen={setIsCustomerDialogOpen}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ProductSearch
            searchTerm={searchTerm}
            setSearchTerm={handleSearchChange}
            filteredProducts={filteredProducts}
            onProductSelect={addItem}
          />

          <OrderSummary
            items={items}
            updateQuantity={updateQuantity}
            removeItem={removeItem}
            total={total}
            selectedCustomer={selectedCustomer}
            onSave={handleSave}
          />
        </div>
      </div>
    </div>
  );
}
