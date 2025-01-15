import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Order } from "@/types/order";

export default function SalesViewPage() {
  const { id } = useParams();

  const { data: order, isLoading } = useQuery({
    queryKey: ["sale", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select(`
          *,
          customer:profiles!orders_customer_id_fkey (
            name,
            email
          )
        `)
        .eq("id", id)
        .single();

      if (error) throw error;
      return data as Order;
    },
  });

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (!order) {
    return <div>Venda não encontrada</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Detalhes da Venda</h1>

      <div className="grid gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Informações Gerais</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Número da Fatura</p>
              <p className="font-medium">{order.invoice}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Data</p>
              <p className="font-medium">
                {format(new Date(order.created_at), "dd/MM/yyyy HH:mm")}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Cliente</p>
              <p className="font-medium">{order.customer?.name}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{order.customer?.email}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Valores</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Valor Total</p>
              <p className="font-medium">
                {order.price?.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Desconto</p>
              <p className="font-medium">
                {order.discount?.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Juros</p>
              <p className="font-medium">
                {order.interest?.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Valor Final</p>
              <p className="font-medium text-lg text-green-600">
                {order.amount?.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>
            </div>
          </div>
        </Card>

        {order.description && (
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Observações</h2>
            <p>{order.description}</p>
          </Card>
        )}
      </div>
    </div>
  );
}