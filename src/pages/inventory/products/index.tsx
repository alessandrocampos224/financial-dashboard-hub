import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { useProducts } from "@/hooks/useProducts";

export default function ProductsPage() {
  const { toast } = useToast();
  const { products, isLoading } = useProducts();

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