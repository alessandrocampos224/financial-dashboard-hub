import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Customer } from "@/types/customer";
import { supabase } from "@/integrations/supabase/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
      const queryClient = useQueryClient();
      const customer = row.original;

      const deleteMutation = useMutation({
        mutationFn: async () => {
          console.log("Iniciando processo de exclusão do cliente:", customer.id);
          
          const { data, error } = await supabase
            .from("profiles")
            .delete()
            .eq("id", customer.id)
            .select()
            .single();

          if (error) {
            console.error("Erro ao deletar perfil:", error);
            throw error;
          }

          console.log("Cliente excluído com sucesso:", data);
          return data;
        },
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["customers"] });
          toast.success("Cliente excluído com sucesso!");
        },
        onError: (error) => {
          console.error("Erro completo ao excluir cliente:", error);
          toast.error("Erro ao excluir cliente. Por favor, tente novamente.");
        },
      });

      const handleDelete = () => {
        if (window.confirm("Tem certeza que deseja excluir este cliente?")) {
          deleteMutation.mutate();
        }
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