import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { Card } from "@/components/ui/card";
import { Order } from "@/types/order";

// Mock data for example
const mockOrder: Order = {
  id: "1",
  tenant_id: "1",
  invoice: "INV001",
  type: "sale",
  user_id: "1",
  interest: 0,
  discount: 10,
  price: 1000,
  amount: 990,
  description: "First sale",
  link: null,
  status: true,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  deleted_at: null,
  customer: {
    name: "John Doe",
    email: "john@example.com",
  },
};

export default function SalesViewPage() {
  const { id } = useParams();
  // Aqui você buscaria os dados da venda usando o ID
  const order = mockOrder;

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