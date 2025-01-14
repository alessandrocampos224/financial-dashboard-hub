import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Permission } from "@/types/permission";

// Mock data - replace with actual API call
const mockPermissions: Permission[] = [
  {
    id: "01HNX5Y7JVWQ8C9D2Z3F4K5M6",
    tenant_id: "01HNX5Y7JVWQ8C9D2Z3F4K5M7",
    roles_id: "01HNX5Y7JVWQ8C9D2Z3F4K5M8",
    name: "Create User",
    alias: "create_user",
    description: "Permission to create new users",
    status: true,
    created_at: "2024-02-20T10:00:00Z",
    updated_at: "2024-02-20T10:00:00Z",
  },
];

export default function PermissionsPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPermissions = mockPermissions.filter(
    (permission) =>
      permission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      permission.alias.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    try {
      // Replace with actual API call
      console.log("Deleting permission:", id);
      toast({
        title: "Permissão excluída com sucesso!",
        description: "A permissão foi removida permanentemente.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao excluir permissão",
        description: "Ocorreu um erro ao tentar excluir a permissão.",
      });
    }
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Permissões</h1>
        <Button onClick={() => navigate("/settings/permissions/new")}>
          <Plus className="mr-2 h-4 w-4" /> Nova Permissão
        </Button>
      </div>

      <div className="mb-4">
        <Input
          placeholder="Buscar permissões..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Alias</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Criado em</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPermissions.map((permission) => (
              <TableRow key={permission.id}>
                <TableCell>{permission.name}</TableCell>
                <TableCell>{permission.alias}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      permission.status
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {permission.status ? "Ativo" : "Inativo"}
                  </span>
                </TableCell>
                <TableCell>
                  {new Date(permission.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      navigate(`/settings/permissions/${permission.id}/edit`)
                    }
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(permission.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}