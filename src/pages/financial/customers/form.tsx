import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustomerBasicInfo } from "./components/CustomerBasicInfo";
import { CustomerDocuments } from "./components/CustomerDocuments";
import { CustomerContact } from "./components/CustomerContact";
import { customerFormSchema, type CustomerFormValues } from "./schema";

export default function CustomerForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  const form = useForm<CustomerFormValues>({
    resolver: zodResolver(customerFormSchema),
    defaultValues: {
      type: "customer",
      name: "",
      fantasia: "",
      document: "",
      rg: "",
      ie: "ISENTO",
      phone: "",
      email: "",
      password: "",
      roles_id: "",
      description: "",
      status: true,
    },
  });

  const onSubmit = async (data: CustomerFormValues) => {
    try {
      console.log(data);
      toast.success(
        isEditing
          ? "Cliente atualizado com sucesso!"
          : "Cliente criado com sucesso!"
      );
      navigate("/financial/customers");
    } catch (error) {
      toast.error("Erro ao salvar cliente");
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          {isEditing ? "Editar Cliente" : "Novo Cliente"}
        </h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CustomerBasicInfo form={form} />
            <CustomerDocuments form={form} />
            <CustomerContact form={form} />

            <div className="col-span-2">
              <Textarea
                placeholder="Descrição"
                {...form.register("description")}
              />
            </div>

            <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <Checkbox
                checked={form.watch("status")}
                onCheckedChange={(checked) => form.setValue("status", checked)}
              />
              <div className="space-y-1 leading-none">
                <span>Ativo</span>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/financial/customers")}
            >
              Cancelar
            </Button>
            <Button type="submit">Salvar</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}