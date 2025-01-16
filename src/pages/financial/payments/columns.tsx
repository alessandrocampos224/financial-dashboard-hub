import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Eye, Trash, Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Payment } from "@/types/payment";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "number",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Número
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "order.customer.name",
    header: "Cliente",
  },
  {
    accessorKey: "order.invoice",
    header: "Nota Fiscal",
  },
  {
    accessorKey: "description",
    header: "Descrição",
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
      const payment = row.original;
      const isToday = new Date(payment.created_at).toDateString() === new Date().toDateString();
      const status = payment.status;

      let variant = "secondary";
      let label = "Em Aberto";

      if (status === true) {
        variant = "default";
        label = "Pago";
      } else if (status === false) {
        variant = "destructive";
        label = "Cancelado";
      }

      return (
        <Badge variant={variant as any}>
          {label}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const navigate = useNavigate();
      const payment = row.original;
      const isToday = new Date(payment.created_at).toDateString() === new Date().toDateString();

      const handleDelete = async () => {
        try {
          const { error } = await supabase
            .from('payments')
            .delete()
            .eq('id', payment.id);

          if (error) throw error;
          toast.success('Pagamento excluído com sucesso!');
          window.location.reload();
        } catch (error) {
          console.error('Erro ao excluir pagamento:', error);
          toast.error('Erro ao excluir pagamento');
        }
      };

      return (
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(`/financial/payments/${payment.id}`)}
          >
            <Eye className="h-4 w-4" />
          </Button>
          {isToday && (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate(`/financial/payments/edit/${payment.id}`)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleDelete}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      );
    },
  },
];