import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
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
  const [orders] = useState<Order[]>(mockOrders);

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
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id} className="cursor-pointer hover:bg-muted/50" onClick={() => navigate(`/financial/sales/${order.id}`)}>
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
                {new Date(order.created_at).toLocaleDateString("pt-BR")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}