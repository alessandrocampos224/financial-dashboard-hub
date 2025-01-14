import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Role } from "@/types/role";

// Dados mockados para exemplo
const mockRoles: Role[] = [
  {
    id: "01HN5GVXP8J6RJHW2X4KQYF3Z5",
    tenant_id: "01HN5GVXP8J6RJHW2X4KQYF3Z5",
    name: "Administrador",
    alias: "admin",
    is_admin: true,
    description: "Acesso total ao sistema",
    status: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    deleted_at: null,
  },
  {
    id: "01HN5GVXP8J6RJHW2X4KQYF3Z6",
    tenant_id: "01HN5GVXP8J6RJHW2X4KQYF3Z5",
    name: "Vendedor",
    alias: "seller",
    is_admin: false,
    description: "Acesso às funcionalidades de vendas",
    status: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    deleted_at: null,
  },
];

export default function RolesPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Perfis</h1>
        <Button asChild>
          <Link to="/settings/roles/new">
            <Plus className="mr-2 h-4 w-4" />
            Novo Perfil
          </Link>
        </Button>
      </div>
      <DataTable columns={columns} data={mockRoles} />
    </div>
  );
}