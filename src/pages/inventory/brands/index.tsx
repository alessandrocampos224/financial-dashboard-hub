import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { DataTable } from "./data-table";
import { columns } from "./columns";

const mockBrands = [
  {
    id: "1",
    tenant_id: "1",
    name: "Apple",
    description: "Produtos Apple",
    status: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export default function BrandsPage() {
  const { toast } = useToast();
  const [brands] = useState(mockBrands);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Marcas</h1>
        <Link to="/inventory/brands/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nova Marca
          </Button>
        </Link>
      </div>

      <DataTable columns={columns} data={brands} />
    </div>
  );
}