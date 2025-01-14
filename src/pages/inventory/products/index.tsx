import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { DataTable } from "./data-table";
import { columns } from "./columns";

const mockProducts = [
  {
    id: "1",
    tenant_id: "1",
    code: "PROD001",
    name: "iPhone 15",
    subtitle: "128GB Preto",
    categories_id: "1",
    brands_id: "1",
    price: 5999.99,
    stock: 10,
    status: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export default function ProductsPage() {
  const { toast } = useToast();
  const [products] = useState(mockProducts);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Produtos</h1>
        <Link to="/inventory/products/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Novo Produto
          </Button>
        </Link>
      </div>

      <DataTable columns={columns} data={products} />
    </div>
  );
}