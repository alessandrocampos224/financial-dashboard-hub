import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";

interface Tenant {
  id: string;
  name: string;
  fantasia: string;
  document: string;
  email: string;
  phone: string;
  status: boolean;
}

// Simulação de dados
const mockTenants: Tenant[] = [
  {
    id: "01HN5GVXP8J6RJKWM9Q2Y3Z4A5",
    name: "Empresa Exemplo",
    fantasia: "Nome Fantasia",
    document: "00.000.000/0001-00",
    email: "exemplo@email.com",
    phone: "(00) 0000-0000",
    status: true,
  },
];

export default function OperationalSettings() {
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);

  const { data: tenants, isLoading } = useQuery({
    queryKey: ["tenants"],
    queryFn: async () => {
      // Simular chamada à API
      return mockTenants;
    },
  });

  const handleCreate = () => {
    toast.success("Funcionalidade de criação será implementada");
  };

  const handleEdit = (tenant: Tenant) => {
    setSelectedTenant(tenant);
    toast.success("Funcionalidade de edição será implementada");
  };

  const handleDelete = (tenant: Tenant) => {
    toast.success("Funcionalidade de exclusão será implementada");
  };

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Configurações Operacionais</h1>
        <Button onClick={handleCreate}>
          <Plus className="h-4 w-4 mr-2" />
          Novo Tenant
        </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Nome Fantasia</TableHead>
              <TableHead>CNPJ/CPF</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tenants?.map((tenant) => (
              <TableRow key={tenant.id}>
                <TableCell>{tenant.name}</TableCell>
                <TableCell>{tenant.fantasia}</TableCell>
                <TableCell>{tenant.document}</TableCell>
                <TableCell>{tenant.email}</TableCell>
                <TableCell>{tenant.phone}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      tenant.status
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {tenant.status ? "Ativo" : "Inativo"}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(tenant)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(tenant)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}