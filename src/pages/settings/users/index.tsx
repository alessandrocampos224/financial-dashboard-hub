import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { DataTable } from "./data-table";
import { columns } from "./columns";

const mockUsers = [
  {
    id: "01HGY5RZ8YKWJ6XZXH8Q9X8C1N",
    tenant_id: "01HGY5RZ8YKWJ6XZXH8Q9X8C1N",
    type: "admin",
    name: "John Doe",
    fantasia: "John",
    cover: null,
    document: "123.456.789-00",
    rg: "12.345.678-9",
    ie: "ISENTO",
    phone: "(11) 99999-9999",
    email: "john@example.com",
    roles_id: "01HGY5RZ8YKWJ6XZXH8Q9X8C1N",
    description: "Administrator user",
    status: true,
    created_at: "2024-01-15T00:00:00.000Z",
    updated_at: "2024-01-15T00:00:00.000Z",
    deleted_at: null,
  },
];

export default function UsersPage() {
  const navigate = useNavigate();
  const [users] = useState(mockUsers);

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Usuários</h1>
        <Button onClick={() => navigate("/settings/users/new")}>
          <Plus className="mr-2 h-4 w-4" />
          Novo Usuário
        </Button>
      </div>
      <DataTable columns={columns} data={users} />
    </div>
  );
}