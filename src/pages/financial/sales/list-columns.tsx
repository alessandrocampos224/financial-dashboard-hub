import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Eye, Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Order } from "@/types/order";
import { format, isToday } from "date-fns";
import { supabase } from "@/integrations/supabase/client";

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "invoice",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Fatura
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
      const amount = parseFloat(row.getValue("amount") || "0");
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
      return format(new Date(row.getValue("created_at")), "dd/MM/yyyy");
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const navigate = useNavigate();
      const order = row.original;
      const isTodaySale = isToday(new Date(order.created_at));

      const handleDelete = async () => {
        try {
          const { error } = await supabase
            .from("orders")
            .delete()
            .eq("id", order.id);

          if (error) throw error;
          toast.success("Venda excluída com sucesso!");
        } catch (error) {
          toast.error("Erro ao excluir venda");
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
          {isTodaySale && (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate(`/financial/sales/${order.id}/edit`)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={handleDelete}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      );
    },
  },
];