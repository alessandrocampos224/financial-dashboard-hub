import { useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { Safe } from "@/types/safe";
import { Payment } from "@/types/payment";

// Mock data - substituir por chamadas reais à API
const mockSafe: Safe = {
  id: "1",
  tenant_id: "1",
  positive: 1000,
  negative: 200,
  amount: 800,
  description: "Caixa do dia",
  status: true,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  deleted_at: null,
};

const mockPayments: Payment[] = [
  {
    id: "1",
    tenant_id: "1",
    safe_id: "1",
    user_id: "1",
    parcela: 1,
    amount: 500,
    discount: 0,
    affix: 0,
    price: 500,
    description: "Venda #1",
    number: "001",
    status: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    deleted_at: null,
  },
];

export default function CashierPage() {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const { data: currentSafe } = useQuery({
    queryKey: ["safe", "current"],
    queryFn: async () => mockSafe,
  });

  const { data: payments } = useQuery({
    queryKey: ["payments", currentSafe?.id],
    queryFn: async () => mockPayments,
    enabled: !!currentSafe?.id,
  });

  const handleOpenCashier = async () => {
    try {
      // Implementar lógica para abrir o caixa
      toast({
        title: "Caixa aberto com sucesso!",
        description: "O saldo inicial foi definido com base no fechamento anterior.",
      });
      setIsOpen(true);
    } catch (error) {
      toast({
        title: "Erro ao abrir o caixa",
        description: "Ocorreu um erro ao tentar abrir o caixa.",
        variant: "destructive",
      });
    }
  };

  const handleCloseCashier = async () => {
    try {
      // Implementar lógica para fechar o caixa
      toast({
        title: "Caixa fechado com sucesso!",
        description: "O fechamento foi realizado e o saldo foi contabilizado.",
      });
      setIsOpen(false);
    } catch (error) {
      toast({
        title: "Erro ao fechar o caixa",
        description: "Ocorreu um erro ao tentar fechar o caixa.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Caixa</h1>
          <p className="text-muted-foreground">
            {format(new Date(), "EEEE, dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
          </p>
        </div>
        <Button onClick={isOpen ? handleCloseCashier : handleOpenCashier}>
          {isOpen ? "Fechar Caixa" : "Abrir Caixa"}
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Saldo Atual</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {currentSafe?.amount.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Entradas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {currentSafe?.positive.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Saídas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {currentSafe?.negative.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      <Separator className="my-8" />

      <Card>
        <CardHeader>
          <CardTitle>Movimentações do Dia</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-muted">
                <tr>
                  <th className="px-6 py-3">Descrição</th>
                  <th className="px-6 py-3">Número</th>
                  <th className="px-6 py-3">Valor</th>
                  <th className="px-6 py-3">Hora</th>
                </tr>
              </thead>
              <tbody>
                {payments?.map((payment) => (
                  <tr key={payment.id} className="border-b">
                    <td className="px-6 py-4">{payment.description}</td>
                    <td className="px-6 py-4">{payment.number}</td>
                    <td className="px-6 py-4">
                      {payment.amount?.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </td>
                    <td className="px-6 py-4">
                      {format(new Date(payment.created_at), "HH:mm")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}