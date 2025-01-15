import { useState } from "react";
import { Plus, Minus, Trash2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Item } from "@/types/item";
import { Product } from "@/types/product";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export default function SalesPage() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [items, setItems] = useState<Item[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Buscar produtos do Supabase
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      console.log("Buscando produtos...");
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("status", true);

      if (error) {
        console.error("Erro ao buscar produtos:", error);
        throw error;
      }

      console.log("Produtos encontrados:", data);
      return data as Product[];  // Adicionado type assertion aqui
    },
  });

  const filteredProducts = products.filter(
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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">PDV - Nova Venda</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Coluna da esquerda - Produtos */}
        <Card className="p-4">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar produto por nome ou código..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>

            {searchTerm && (
              <div className="border rounded-md mt-2">
                {isLoading ? (
                  <div className="p-4 text-center">Carregando produtos...</div>
                ) : filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      className="p-2 hover:bg-accent cursor-pointer flex justify-between items-center"
                      onClick={() => addItem(product)}
                    >
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {product.code}
                        </p>
                      </div>
                      <p className="font-medium">
                        {product.price.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-muted-foreground">
                    Nenhum produto encontrado
                  </div>
                )}
              </div>
            )}
          </div>
        </Card>

        {/* Coluna da direita - Carrinho */}
        <Card className="p-4">
          <div className="space-y-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produto</TableHead>
                  <TableHead>Qtd</TableHead>
                  <TableHead>Valor Unit.</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.product?.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, false)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span>{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, true)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      {item.unitary?.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </TableCell>
                    <TableCell>
                      {item.amount?.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-medium">Total do Pedido:</span>
                <span className="text-2xl font-bold">
                  {total.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Forma de Pagamento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="money">Dinheiro</SelectItem>
                    <SelectItem value="credit">Cartão de Crédito</SelectItem>
                    <SelectItem value="debit">Cartão de Débito</SelectItem>
                    <SelectItem value="pix">PIX</SelectItem>
                  </SelectContent>
                </Select>

                <Button className="w-full" disabled={items.length === 0}>
                  Finalizar Venda
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}