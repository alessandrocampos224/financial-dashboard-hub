import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
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
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";

interface FormData {
  amount: number;
  description: string;
  paymentMethod: string;
}

export default function PaymentForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('order_id');
  const { user } = useAuth();

  const { data: orderDetails, isLoading } = useQuery({
    queryKey: ['order', orderId],
    queryFn: async () => {
      if (!orderId) return null;

      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          customer:profiles(*)
        `)
        .eq('id', orderId)
        .single();

      if (error) {
        console.error('Erro ao buscar detalhes do pedido:', error);
        toast.error('Erro ao carregar detalhes do pedido');
        throw error;
      }

      return data;
    },
    enabled: !!orderId,
  });

  const form = useForm<FormData>({
    defaultValues: {
      amount: 0,
      description: "",
      paymentMethod: "",
    },
  });

  useEffect(() => {
    if (orderDetails) {
      form.setValue('amount', orderDetails.amount || 0);
      form.setValue('description', `Pagamento da venda #${orderDetails.id}`);
    }
  }, [orderDetails, form]);

  const onSubmit = async (data: FormData) => {
    try {
      if (!user) {
        toast.error('Você precisa estar logado para registrar um pagamento');
        return;
      }

      if (!orderId) {
        toast.error('Venda não encontrada');
        return;
      }

      // Primeiro, busca ou cria o caixa do dia
      const { data: existingSafe, error: safeError } = await supabase
        .from('safes')
        .select('*')
        .eq('status', true)
        .gte('created_at', new Date().toISOString().split('T')[0])
        .lte('created_at', new Date().toISOString().split('T')[0] + 'T23:59:59.999Z')
        .single();

      let safeId;

      if (safeError) {
        // Criar novo caixa para o dia
        const { data: newSafe, error: createSafeError } = await supabase
          .from('safes')
          .insert({
            description: `Caixa do dia ${new Date().toLocaleDateString()}`,
            status: true,
          })
          .select()
          .single();

        if (createSafeError) throw createSafeError;
        safeId = newSafe.id;
      } else {
        safeId = existingSafe.id;
      }

      // Registrar o pagamento
      const { error: paymentError } = await supabase
        .from('payments')
        .insert({
          safe_id: safeId,
          user_id: user.id,
          order_id: orderId,
          amount: data.amount,
          price: data.amount,
          description: data.description,
          number: new Date().getTime().toString(),
          status: true,
        });

      if (paymentError) throw paymentError;

      // Atualizar o status da venda
      const { error: orderError } = await supabase
        .from('orders')
        .update({ status: false })
        .eq('id', orderId);

      if (orderError) throw orderError;

      toast.success('Pagamento registrado com sucesso!');
      navigate('/financial/payments');
    } catch (error) {
      console.error('Erro ao registrar pagamento:', error);
      toast.error('Erro ao registrar pagamento');
    }
  };

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (!orderDetails) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex flex-col items-center justify-center space-y-4">
          <h1 className="text-2xl font-bold">Venda não encontrada</h1>
          <Button onClick={() => navigate('/financial/sales')}>
            Voltar para Vendas
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Novo Pagamento</h1>
      </div>

      <Card className="bg-muted p-4 rounded-lg mb-6">
        <h3 className="font-semibold mb-2">Detalhes da Venda</h3>
        <p className="text-lg mb-2">
          Cliente: {orderDetails.customer?.name}
        </p>
        <p className="text-lg mb-2">
          Total: {orderDetails.amount?.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </p>
      </Card>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
            <Button type="submit">Registrar Pagamento</Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/financial/sales')}
            >
              Voltar para Vendas
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}