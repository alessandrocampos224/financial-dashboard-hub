import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useQuery } from "@tanstack/react-query";
import { Carrier } from "@/types/carrier";

// TODO: Implementar função de busca na API
const fetchCarriers = async (): Promise<Carrier[]> => {
  return [];
};

export default function CarriersPage() {
  const navigate = useNavigate();
  
  const { data: carriers = [], isLoading } = useQuery({
    queryKey: ["carriers"],
    queryFn: fetchCarriers,
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Transportadoras</h1>
        <Button onClick={() => navigate("/inventory/carriers/new")}>
          <Plus className="mr-2 h-4 w-4" />
          Nova Transportadora
        </Button>
      </div>

      <Card className="p-6">
        <DataTable columns={columns} data={carriers} />
      </Card>
    </div>
  );
}