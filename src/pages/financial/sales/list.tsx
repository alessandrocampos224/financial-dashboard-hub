import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Eye, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Order } from "@/types/order";
import { format, isToday } from "date-fns";
import { useToast } from "@/components/ui/use-toast";

// Mock data for example
const mockOrders: Order[] = [
  {
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
  },
];

export default function SalesListPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [orders] = useState<Order[]>(mockOrders);

  const handleDelete = (orderId: string) => {
    // Aqui você implementaria a lógica de exclusão
    toast({
      title: "Venda excluída",
      description: "A venda foi excluída com sucesso",
    });
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Vendas</h1>
        <Button onClick={() => navigate("/financial/sales/new")}>
          <Plus className="mr-2 h-4 w-4" />
          Nova Venda
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Fatura</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => {
            const orderDate = new Date(order.created_at);
            const isCurrentDay = isToday(orderDate);

            return (
              <TableRow key={order.id}>
                <TableCell>{order.invoice}</TableCell>
                <TableCell>{order.customer?.name}</TableCell>
                <TableCell>
                  {order.amount?.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </TableCell>
                <TableCell>
                  <Badge variant={order.status ? "default" : "destructive"}>
                    {order.status ? "Ativo" : "Inativo"}
                  </Badge>
                </TableCell>
                <TableCell>
                  {format(orderDate, "dd/MM/yyyy")}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => navigate(`/financial/sales/${order.id}`)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    {isCurrentDay && (
                      <>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => navigate(`/financial/sales/${order.id}/edit`)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(order.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}