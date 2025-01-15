import { ColumnDef } from "@tanstack/react-table";
import { Order } from "@/types/order";
import { Button } from "@/components/ui/button";
import { ArrowRight, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "created_at",
    header: "Data",
    cell: ({ row }) => {
      const date = new Date(row.getValue("created_at"));
      return date.toLocaleDateString("pt-BR");
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
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(amount);
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status");
      return status ? "Em aberto" : "Pago";
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const order = row.original;
      const isPaid = !order.status;

      return (
        <div className="flex gap-2">
          <Link to={`/financial/sales/${order.id}`}>
            <Button variant="ghost" size="icon">
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          {!isPaid && (
            <Link to={`/financial/payments/new?order_id=${order.id}`}>
              <Button variant="ghost" size="icon">
                <DollarSign className="h-4 w-4" />
              </Button>
            </Link>
          )}
        </div>
      );
    },
  },
];