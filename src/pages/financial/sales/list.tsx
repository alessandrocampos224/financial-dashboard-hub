import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { DataTable } from "./data-table";
import { columns } from "./list-columns";
import { Order } from "@/types/order";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export default function SalesListPage() {
  const navigate = useNavigate();

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["sales"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select(`
          *,
          customer:profiles (
            id,
            name,
            email
          )
        `)
        .order("created_at", { ascending: false });

      if (error) {
        toast.error("Erro ao carregar vendas");
        throw error;
      }

      return data as Order[];
    },
  });

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Vendas</h1>
        <Button onClick={() => navigate("/financial/sales/new")}>
          <Plus className="mr-2 h-4 w-4" />
          Nova Venda
        </Button>
      </div>
      {isLoading ? (
        <div>Carregando...</div>
      ) : (
        <DataTable columns={columns} data={orders} />
      )}
    </div>
  );
}