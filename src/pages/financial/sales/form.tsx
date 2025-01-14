import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Search, X, Minus, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Item } from "@/types/item";
import { Product } from "@/types/product";
import { CustomerSelector } from "./components/CustomerSelector";
import { ProductSearch } from "./components/ProductSearch";
import { OrderSummary } from "./components/OrderSummary";

// Mock de produtos para exemplo
const mockProducts: Product[] = [
  {
    id: "1",
    tenant_id: "1",
    code: "PROD001",
    name: "iPhone 15",
    subtitle: "128GB Preto",
    price: 5999.99,
    status: true,
    categories_id: "1",
    brands_id: "1",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export default function SalesForm() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCustomerDialogOpen, setIsCustomerDialogOpen] = useState(false);
  const [items, setItems] = useState<Item[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = mockProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            setSearchTerm={setSearchTerm}
            filteredProducts={filteredProducts}
            onProductSelect={addItem}
          />

          <OrderSummary
            items={items}
            updateQuantity={updateQuantity}
            removeItem={removeItem}
            total={total}
            selectedCustomer={selectedCustomer}
          />
        </div>
      </div>
    </div>
  );
}