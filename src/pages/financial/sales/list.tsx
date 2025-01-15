import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { DataTable } from "./data-table";
import { columns } from "./list-columns";
import { Order } from "@/types/order";

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
      <DataTable columns={columns} data={orders} />
    </div>
  );
}