import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search, User } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface CustomerSelectorProps {
  selectedCustomer: any;
  setSelectedCustomer: (customer: any) => void;
  isCustomerDialogOpen: boolean;
  setIsCustomerDialogOpen: (open: boolean) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export function CustomerSelector({
  selectedCustomer,
  setSelectedCustomer,
  isCustomerDialogOpen,
  setIsCustomerDialogOpen,
  searchTerm,
  setSearchTerm,
}: CustomerSelectorProps) {
  const { data: customers = [] } = useQuery({
    queryKey: ["customers", searchTerm],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .ilike("name", `%${searchTerm}%`);

      if (error) throw error;
      return data;
    },
  });

  return (
    <Dialog open={isCustomerDialogOpen} onOpenChange={setIsCustomerDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-[300px] justify-start text-left font-normal"
        >
          <User className="mr-2 h-4 w-4" />
          {selectedCustomer ? (
            <span>{selectedCustomer.name}</span>
          ) : (
            <span>Selecionar cliente</span>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[475px]">
        <DialogHeader>
          <DialogTitle>Selecionar Cliente</DialogTitle>
        </DialogHeader>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar cliente..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="mt-4 max-h-[300px] overflow-y-auto">
          {customers.map((customer) => (
            <div
              key={customer.id}
              className="flex items-center justify-between p-2 hover:bg-accent cursor-pointer rounded-md"
              onClick={() => {
                setSelectedCustomer(customer);
                setIsCustomerDialogOpen(false);
              }}
            >
              <div>
                <p className="font-medium">{customer.name}</p>
                <p className="text-sm text-muted-foreground">{customer.email}</p>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}