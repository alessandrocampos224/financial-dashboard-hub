import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Carrier } from "@/types/carrier";

const data: Carrier[] = []; // TODO: Integrar com API

export default function CarriersPage() {
  const navigate = useNavigate();

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
        <DataTable columns={columns} data={data} />
      </Card>
    </div>
  );
}