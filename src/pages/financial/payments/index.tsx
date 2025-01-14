import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "./data-table";
import { columns } from "./columns";

const mockPayments = [
  {
    id: "01HGY5RZ8YKWJ6XZXH8Q9X8C1N",
    tenant_id: "01HGY5RZ8YKWJ6XZXH8Q9X8C1N",
    safe_id: "01HGY5RZ8YKWJ6XZXH8Q9X8C1N",
    user_id: "01HGY5RZ8YKWJ6XZXH8Q9X8C1N",
    parcela: 1,
    amount: 150.00,
    discount: 0,
    affix: 0,
    price: 150.00,
    description: "Pagamento de venda #123",
    number: "PAY123",
    status: true,
    created_at: "2024-01-15T00:00:00.000Z",
    updated_at: "2024-01-15T00:00:00.000Z",
    deleted_at: null,
  },
];

export default function PaymentsPage() {
  const navigate = useNavigate();
  const [payments] = useState(mockPayments);

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Pagamentos</h1>
        <Button onClick={() => navigate("/financial/payments/new")}>
          <Plus className="mr-2 h-4 w-4" />
          Novo Pagamento
        </Button>
      </div>
      <DataTable columns={columns} data={payments} />
    </div>
  );
}