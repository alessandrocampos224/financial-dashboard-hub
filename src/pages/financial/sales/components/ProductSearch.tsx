import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Product } from "@/types/product";

interface ProductSearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filteredProducts: Product[];
  onProductSelect: (product: Product) => void;
}

export function ProductSearch({
  searchTerm,
  setSearchTerm,
  filteredProducts,
  onProductSelect,
}: ProductSearchProps) {
  return (
    <Card className="p-4">
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar produto por nome ou código..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>

        {searchTerm && (
          <div className="border rounded-md mt-2">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="p-2 hover:bg-accent cursor-pointer flex justify-between items-center"
                onClick={() => onProductSelect(product)}
              >
                <div>
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-muted-foreground">{product.code}</p>
                </div>
                <p className="font-medium">
                  {product.price.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}