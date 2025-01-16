import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export default function PaymentsPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const { data: payments = [] } = useQuery({
    queryKey: ["payments", user?.id],
    queryFn: async () => {
      // Primeiro, busca todas as vendas que não têm pagamento
      const { data: orders, error: ordersError } = await supabase
        .from("orders")
        .select(`
          *,
          customer:profiles(*)
        `)
        .eq("user_id", user?.id)
        .eq("status", true)
        .is("deleted_at", null);

      if (ordersError) throw ordersError;

      // Depois, busca os pagamentos existentes
      const { data: existingPayments, error: paymentsError } = await supabase
        .from("payments")
        .select(`
          *,
          order:orders(
            *,
            customer:profiles(*)
          )
        `)
        .eq("user_id", user?.id)
        .order("created_at", { ascending: false });

      if (paymentsError) throw paymentsError;

      // Cria pagamentos pendentes para vendas sem pagamento
      const pendingPayments = orders
        ?.filter(order => !existingPayments?.some(payment => payment.order_id === order.id))
        .map(order => ({
          id: `pending-${order.id}`,
          order_id: order.id,
          amount: order.amount,
          status: false,
          created_at: order.created_at,
          order: {
            ...order,
            customer: order.customer
          }
        }));

      return [...(existingPayments || []), ...(pendingPayments || [])];
    },
    enabled: !!user?.id,
  });

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Pagamentos</h1>
        <Button onClick={() => navigate("/financial/sales")}>
          <Plus className="mr-2 h-4 w-4" />
          Nova Venda
        </Button>
      </div>
      <DataTable columns={columns} data={payments} />
    </div>
  );
}