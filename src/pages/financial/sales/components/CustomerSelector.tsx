import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface CustomerSelectorProps {
  selectedCustomer: any;
  setSelectedCustomer: (customer: any) => void;
  isCustomerDialogOpen: boolean;
  setIsCustomerDialogOpen: (isOpen: boolean) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export const CustomerSelector = ({
  selectedCustomer,
  setSelectedCustomer,
  isCustomerDialogOpen,
  setIsCustomerDialogOpen,
  searchTerm,
  setSearchTerm,
}: CustomerSelectorProps) => {
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .ilike("name", `%${searchTerm}%`);

        if (error) throw error;
        setCustomers(data || []);
      } catch (error) {
        console.error("Erro ao buscar clientes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, [searchTerm]);

  return (
    <Dialog open={isCustomerDialogOpen} onOpenChange={setIsCustomerDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-[200px]">
          {selectedCustomer ? (
            <>
              <span>{selectedCustomer.name}</span>
              <X
                className="ml-2 h-4 w-4"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedCustomer(null);
                }}
              />
            </>
          ) : (
            <>
              <Search className="mr-2 h-4 w-4" />
              Selecionar Cliente
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Selecionar Cliente</DialogTitle>
        </DialogHeader>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar cliente por nome ou email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={2} className="text-center">
                  Carregando...
                </TableCell>
              </TableRow>
            ) : customers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={2} className="text-center">
                  Nenhum cliente encontrado
                </TableCell>
              </TableRow>
            ) : (
              customers.map((customer) => (
                <TableRow
                  key={customer.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => {
                    setSelectedCustomer(customer);
                    setIsCustomerDialogOpen(false);
                  }}
                >
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
};