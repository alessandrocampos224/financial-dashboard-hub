import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Customer } from "@/types/customer";

export const columns: ColumnDef<Customer>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nome
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "document",
    header: "CPF/CNPJ",
  },
  {
    accessorKey: "phone",
    header: "Telefone",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as boolean;
      return (
        <Badge variant={status ? "default" : "destructive"}>
          {status ? "Ativo" : "Inativo"}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const navigate = useNavigate();
      const customer = row.original;

      const handleDelete = () => {
        toast.success("Cliente excluído com sucesso!");
      };

      return (
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(`/financial/customers/${customer.id}/edit`)}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleDelete}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
];