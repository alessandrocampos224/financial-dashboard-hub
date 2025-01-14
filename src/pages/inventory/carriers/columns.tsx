import { ColumnDef } from "@tanstack/react-table";
import { Carrier } from "@/types/carrier";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

export const columns: ColumnDef<Carrier>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "fantasia",
    header: "Nome Fantasia",
  },
  {
    accessorKey: "document",
    header: "CNPJ",
  },
  {
    accessorKey: "phone",
    header: "Telefone",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as boolean;
      return (
        <Badge variant={status ? "success" : "destructive"}>
          {status ? "Ativo" : "Inativo"}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const carrier = row.original;
      const navigate = useNavigate();
      const { toast } = useToast();

      const handleDelete = async () => {
        try {
          // TODO: Implementar chamada à API para excluir
          toast({
            title: "Sucesso",
            description: "Transportadora excluída com sucesso!",
          });
        } catch (error) {
          toast({
            variant: "destructive",
            title: "Erro",
            description: "Erro ao excluir transportadora",
          });
        }
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigate(`/inventory/carriers/${carrier.id}/edit`)}
            >
              <Pencil className="mr-2 h-4 w-4" />
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleDelete} className="text-red-600">
              <Trash className="mr-2 h-4 w-4" />
              Excluir
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];