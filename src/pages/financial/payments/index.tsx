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
      const { data, error } = await supabase
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

      if (error) {
        console.error("Erro ao buscar pagamentos:", error);
        throw error;
      }

      return data || [];
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