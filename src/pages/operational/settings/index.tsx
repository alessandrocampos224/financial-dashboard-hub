import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

// Simula uma API
const api = {
  getTenants: async () => mockTenants,
  createTenant: async (tenant: Omit<Tenant, "id">) => {
    const newTenant = {
      ...tenant,
      id: Math.random().toString(36).substr(2, 9),
    };
    mockTenants.push(newTenant);
    return newTenant;
  },
  updateTenant: async (tenant: Tenant) => {
    const index = mockTenants.findIndex((t) => t.id === tenant.id);
    if (index !== -1) {
      mockTenants[index] = tenant;
    }
    return tenant;
  },
  deleteTenant: async (id: string) => {
    const index = mockTenants.findIndex((t) => t.id === id);
    if (index !== -1) {
      mockTenants.splice(index, 1);
    }
    return id;
  },
};

export default function OperationalSettings() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);
  const [formData, setFormData] = useState<Partial<Tenant>>({
    name: "",
    fantasia: "",
    document: "",
    email: "",
    phone: "",
    status: true,
  });

  const queryClient = useQueryClient();

  const { data: tenants, isLoading } = useQuery({
    queryKey: ["tenants"],
    queryFn: api.getTenants,
  });

  const createMutation = useMutation({
    mutationFn: api.createTenant,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tenants"] });
      toast.success("Tenant criado com sucesso!");
      handleCloseDialog();
    },
  });

  const updateMutation = useMutation({
    mutationFn: api.updateTenant,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tenants"] });
      toast.success("Tenant atualizado com sucesso!");
      handleCloseDialog();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: api.deleteTenant,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tenants"] });
      toast.success("Tenant excluído com sucesso!");
    },
  });

  const handleCreate = () => {
    setSelectedTenant(null);
    setFormData({
      name: "",
      fantasia: "",
      document: "",
      email: "",
      phone: "",
      status: true,
    });
    setIsDialogOpen(true);
  };

  const handleEdit = (tenant: Tenant) => {
    setSelectedTenant(tenant);
    setFormData(tenant);
    setIsDialogOpen(true);
  };

  const handleDelete = async (tenant: Tenant) => {
    if (window.confirm("Tem certeza que deseja excluir este tenant?")) {
      await deleteMutation.mutateAsync(tenant.id);
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedTenant(null);
    setFormData({
      name: "",
      fantasia: "",
      document: "",
      email: "",
      phone: "",
      status: true,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedTenant) {
      await updateMutation.mutateAsync({ ...formData, id: selectedTenant.id } as Tenant);
    } else {
      await createMutation.mutateAsync(formData as Omit<Tenant, "id">);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="p-6 space-y-6 bg-gdrive-background min-h-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gdrive-text">Configurações Operacionais</h1>
        <Button onClick={handleCreate} variant="outline" className="bg-gdrive-surface text-gdrive-text hover:bg-gdrive-hover">
          <Plus className="h-4 w-4 mr-2" />
          Novo Tenant
        </Button>
      </div>

      <div className="border border-gdrive-border rounded-lg overflow-hidden">
        <Table>
          <TableHeader className="bg-gdrive-surface">
            <TableRow className="border-gdrive-border hover:bg-gdrive-hover">
              <TableHead className="text-gdrive-text">Nome</TableHead>
              <TableHead className="text-gdrive-text">Nome Fantasia</TableHead>
              <TableHead className="text-gdrive-text">CNPJ/CPF</TableHead>
              <TableHead className="text-gdrive-text">Email</TableHead>
              <TableHead className="text-gdrive-text">Telefone</TableHead>
              <TableHead className="text-gdrive-text">Status</TableHead>
              <TableHead className="text-gdrive-text">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tenants?.map((tenant) => (
              <TableRow 
                key={tenant.id} 
                className="border-gdrive-border hover:bg-gdrive-hover"
              >
                <TableCell className="text-gdrive-text">{tenant.name}</TableCell>
                <TableCell className="text-gdrive-text">{tenant.fantasia}</TableCell>
                <TableCell className="text-gdrive-text">{tenant.document}</TableCell>
                <TableCell className="text-gdrive-text">{tenant.email}</TableCell>
                <TableCell className="text-gdrive-text">{tenant.phone}</TableCell>
                <TableCell className="text-gdrive-text">
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
                      className="text-gdrive-text hover:bg-gdrive-hover"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(tenant)}
                      className="text-gdrive-text hover:bg-gdrive-hover"
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

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-gdrive-surface border-gdrive-border">
          <DialogHeader>
            <DialogTitle className="text-gdrive-text">
              {selectedTenant ? "Editar Tenant" : "Novo Tenant"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gdrive-text">Nome</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="bg-gdrive-background border-gdrive-border text-gdrive-text"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fantasia" className="text-gdrive-text">Nome Fantasia</Label>
              <Input
                id="fantasia"
                name="fantasia"
                value={formData.fantasia}
                onChange={handleInputChange}
                required
                className="bg-gdrive-background border-gdrive-border text-gdrive-text"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="document" className="text-gdrive-text">CNPJ/CPF</Label>
              <Input
                id="document"
                name="document"
                value={formData.document}
                onChange={handleInputChange}
                required
                className="bg-gdrive-background border-gdrive-border text-gdrive-text"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gdrive-text">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="bg-gdrive-background border-gdrive-border text-gdrive-text"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-gdrive-text">Telefone</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="bg-gdrive-background border-gdrive-border text-gdrive-text"
              />
            </div>
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleCloseDialog}
                className="bg-gdrive-surface text-gdrive-text hover:bg-gdrive-hover"
              >
                Cancelar
              </Button>
              <Button 
                type="submit"
                className="bg-gdrive-surface text-gdrive-text hover:bg-gdrive-hover"
              >
                {selectedTenant ? "Salvar" : "Criar"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}