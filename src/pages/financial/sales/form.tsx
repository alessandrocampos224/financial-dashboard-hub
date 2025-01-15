import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { CustomerSelector } from "./components/CustomerSelector";
import { ProductSearch } from "./components/ProductSearch";
import { OrderSummary } from "./components/OrderSummary";
import { supabase } from "@/integrations/supabase/client";
import { useSaleProducts } from "@/hooks/useSaleProducts";
import { useAuth } from "@/contexts/AuthContext";

export default function SalesForm() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCustomerDialogOpen, setIsCustomerDialogOpen] = useState(false);
  
  const {
    items,
    filteredProducts,
    total,
    searchProducts,
    addItem,
    updateQuantity,
    removeItem,
  } = useSaleProducts();

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

      if (!user) {
        toast({
          variant: "destructive",
          title: "Erro",
          description: "Você precisa estar logado para criar uma venda",
        });
        return;
      }

      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          customer_id: selectedCustomer.id,
          user_id: user.id, // Adicionando o user_id do usuário logado
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