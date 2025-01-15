import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/components/ui/use-toast";
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
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { useProducts } from "@/hooks/useProducts";

const formSchema = z.object({
  code: z.string().min(1, "Código é obrigatório"),
  name: z.string().min(1, "Nome é obrigatório"),
  subtitle: z.string().optional(),
  category_id: z.string().optional(),
  brand_id: z.string().optional(),
  price: z.coerce.number().min(0.01, "Preço deve ser maior que zero"),
  stock: z.coerce.number().int().min(0, "Estoque não pode ser negativo").optional(),
  description: z.string().optional(),
  status: z.boolean().default(true),
});

type FormValues = z.infer<typeof formSchema>;

export default function ProductForm() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { createProduct, isCreatingProduct } = useProducts();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
      name: "",
      subtitle: "",
      category_id: "",
      brand_id: "",
      price: 0,
      stock: 0,
      description: "",
      status: true,
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      await createProduct({
        code: values.code,
        name: values.name,
        price: values.price,
        subtitle: values.subtitle,
        category_id: values.category_id || undefined,
        brand_id: values.brand_id || undefined,
        stock: values.stock,
        description: values.description,
        status: values.status,
      });
      navigate("/inventory/products");
    } catch (error) {
      console.error("Erro ao salvar produto:", error);
      toast({
        variant: "destructive",
        title: "Erro!",
        description: "Ocorreu um erro ao salvar o produto.",
      });
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Novo Produto</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Código</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="subtitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subtítulo</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="category_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="brand_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Marca</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preço</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      onChange={(e) => field.onChange(parseFloat(e.target.value))}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estoque</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/inventory/products")}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isCreatingProduct}>
              Salvar
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}