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
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

// Mock customer data
const mockCustomers = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    document: "123.456.789-00",
    type: "customer",
    status: true,
  },
];

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
  const filteredCustomers = mockCustomers.filter(
    (customer) =>
      customer.type === "customer" &&
      (customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.document.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <Dialog open={isCustomerDialogOpen} onOpenChange={setIsCustomerDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
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
            placeholder="Buscar cliente por nome ou CPF/CNPJ..."
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
              <TableHead>CPF/CNPJ</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.map((customer) => (
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
                <TableCell>{customer.document}</TableCell>
                <TableCell>
                  <Badge variant={customer.status ? "default" : "destructive"}>
                    {customer.status ? "Ativo" : "Inativo"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
};