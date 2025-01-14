import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CustomerSelector } from "@/pages/financial/sales/components/CustomerSelector";
import { useState } from "react";

// Mock de débitos do cliente
const mockCustomerDebts = {
  total: 1500.0,
  items: [
    {
      id: "1",
      description: "Venda #123",
      amount: 1000.0,
      date: "2024-01-10",
    },
    {
      id: "2",
      description: "Venda #124",
      amount: 500.0,
      date: "2024-01-12",
    },
  ],
};

interface FormData {
  type: "entrada" | "saida";
  amount: number;
  description: string;
  paymentMethod: string;
}

export default function PaymentForm() {
  const navigate = useNavigate();
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [isCustomerDialogOpen, setIsCustomerDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const form = useForm<FormData>({
    defaultValues: {
      type: "entrada",
      amount: 0,
      description: "",
      paymentMethod: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      // Implementar lógica de salvamento
      console.log("Dados do formulário:", data);
      toast.success("Pagamento registrado com sucesso!");
      navigate("/financial/payments");
    } catch (error) {
      toast.error("Erro ao registrar pagamento");
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Novo Pagamento</h1>
      </div>

      <div className="grid gap-6 mb-6">
        <div>
          <h2 className="text-lg font-semibold mb-2">Selecionar Cliente</h2>
          <CustomerSelector
            selectedCustomer={selectedCustomer}
            setSelectedCustomer={setSelectedCustomer}
            isCustomerDialogOpen={isCustomerDialogOpen}
            setIsCustomerDialogOpen={setIsCustomerDialogOpen}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </div>

        {selectedCustomer && mockCustomerDebts.total > 0 && (
          <div className="bg-muted p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Débitos Pendentes</h3>
            <p className="text-lg mb-2">
              Total: {mockCustomerDebts.total.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
            <div className="space-y-2">
              {mockCustomerDebts.items.map((debt) => (
                <div
                  key={debt.id}
                  className="flex justify-between items-center bg-background p-2 rounded"
                >
                  <div>
                    <p className="font-medium">{debt.description}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(debt.date).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                  <p className="font-medium">
                    {debt.amount.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Operação</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="entrada">Entrada</SelectItem>
                      <SelectItem value="saida">Saída</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="0,00"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Forma de Pagamento</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a forma de pagamento" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="dinheiro">Dinheiro</SelectItem>
                      <SelectItem value="pix">PIX</SelectItem>
                      <SelectItem value="cartao">Cartão</SelectItem>
                      <SelectItem value="boleto">Boleto</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Digite uma descrição para o pagamento"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-4">
              <Button type="submit">Salvar</Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/financial/payments")}
              >
                Cancelar
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}