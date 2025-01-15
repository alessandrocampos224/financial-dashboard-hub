import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Eye, CreditCard, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Order } from "@/types/order";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "invoice",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nota Fiscal
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "customer.name",
    header: "Cliente",
  },
  {
    accessorKey: "amount",
    header: "Valor",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(amount);
      return formatted;
    },
  },
  {
    accessorKey: "created_at",
    header: "Data",
    cell: ({ row }) => {
      return new Date(row.getValue("created_at")).toLocaleDateString("pt-BR");
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as boolean;
      return (
        <Badge variant={status ? "default" : "secondary"}>
          {status ? "Em Aberto" : "Pago"}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const navigate = useNavigate();
      const order = row.original;
      const status = row.getValue("status") as boolean;
      const createdAt = new Date(order.created_at);
      const today = new Date();
      const isToday = createdAt.toDateString() === today.toDateString();

      const handleDelete = async () => {
        try {
          // Primeiro, excluir os itens do pedido
          const { error: itemsError } = await supabase
            .from("order_items")
            .delete()
            .eq("order_id", order.id);

          if (itemsError) throw itemsError;

          // Depois, excluir o pedido
          const { error: orderError } = await supabase
            .from("orders")
            .delete()
            .eq("id", order.id);

          if (orderError) throw orderError;

          toast.success("Venda excluída com sucesso!");
          // Recarregar a página para atualizar a lista
          window.location.reload();
        } catch (error) {
          console.error("Erro ao excluir venda:", error);
          toast.error("Erro ao excluir venda. Tente novamente.");
        }
      };

      return (
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(`/financial/sales/${order.id}`)}
          >
            <Eye className="h-4 w-4" />
          </Button>
          {status && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(`/financial/payments/new?order_id=${order.id}`)}
            >
              <CreditCard className="h-4 w-4" />
            </Button>
          )}
          {isToday && status && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleDelete}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      );
    },
  },
];