import { useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export default function CashierPage() {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  // Busca o saldo do dia anterior
  const { data: previousSafe } = useQuery({
    queryKey: ["safe", "previous"],
    queryFn: async () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStart = yesterday.toISOString().split('T')[0];
      const yesterdayEnd = yesterdayStart + "T23:59:59.999Z";

      const { data, error } = await supabase
        .from("safes")
        .select("*")
        .gte("created_at", yesterdayStart)
        .lte("created_at", yesterdayEnd)
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      return data;
    },
  });

  const { data: currentSafe } = useQuery({
    queryKey: ["safe", "current"],
    queryFn: async () => {
      const today = new Date().toISOString().split('T')[0];
      const { data, error } = await supabase
        .from("safes")
        .select("*")
        .eq("status", true)
        .gte("created_at", today)
        .lte("created_at", today + "T23:59:59.999Z")
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // Nenhum caixa encontrado para hoje, criar um novo com o saldo anterior
          const initialAmount = previousSafe?.amount || 0;
          
          const { data: newSafe, error: createError } = await supabase
            .from("safes")
            .insert({
              description: `Caixa do dia ${format(new Date(), "dd/MM/yyyy")}`,
              status: true,
              amount: initialAmount, // Inicializa com o saldo anterior
            })
            .select()
            .single();

          if (createError) throw createError;
          return newSafe;
        }
        throw error;
      }

      return data;
    },
    enabled: !!previousSafe || previousSafe === null, // Executa após buscar o saldo anterior
  });

  const { data: payments } = useQuery({
    queryKey: ["payments", currentSafe?.id],
    queryFn: async () => {
      if (!currentSafe?.id) return [];

      const { data, error } = await supabase
        .from("payments")
        .select(`
          *,
          order:orders (
            *,
            customer:profiles (
              name
            )
          )
        `)
        .eq("safe_id", currentSafe.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!currentSafe?.id,
  });

  const handleOpenCashier = async () => {
    try {
      const { error } = await supabase
        .from("safes")
        .update({ status: true })
        .eq("id", currentSafe?.id);

      if (error) throw error;

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
      const { error } = await supabase
        .from("safes")
        .update({ status: false })
        .eq("id", currentSafe?.id);

      if (error) throw error;

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
              {currentSafe?.amount?.toLocaleString("pt-BR", {
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
              {currentSafe?.positive?.toLocaleString("pt-BR", {
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
              {currentSafe?.negative?.toLocaleString("pt-BR", {
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
                  <th className="px-6 py-3">Cliente</th>
                  <th className="px-6 py-3">Valor</th>
                  <th className="px-6 py-3">Hora</th>
                </tr>
              </thead>
              <tbody>
                {payments?.map((payment) => (
                  <tr key={payment.id} className="border-b">
                    <td className="px-6 py-4">{payment.description}</td>
                    <td className="px-6 py-4">{payment.order?.customer?.name}</td>
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
