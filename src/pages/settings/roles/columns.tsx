import { ColumnDef } from "@tanstack/react-table";
import { Role } from "@/types/role";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import { Link } from "react-router-dom";

export const columns: ColumnDef<Role>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "alias",
    header: "Alias",
  },
  {
    accessorKey: "is_admin",
    header: "Admin",
    cell: ({ row }) => (
      <Badge variant={row.original.is_admin ? "default" : "secondary"}>
        {row.original.is_admin ? "Sim" : "Não"}
      </Badge>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={row.original.status ? "default" : "destructive"}>
        {row.original.status ? "Ativo" : "Inativo"}
      </Badge>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const role = row.original;

      return (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link to={`/settings/roles/${role.id}/edit`}>
              <Edit className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" className="text-destructive">
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
];