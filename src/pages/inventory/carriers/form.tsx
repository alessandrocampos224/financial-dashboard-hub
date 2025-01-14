import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { CarrierFormData } from "@/types/carrier";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { CarrierBasicInfo } from "./components/CarrierBasicInfo";
import { CarrierContactInfo } from "./components/CarrierContactInfo";
import { CarrierAddressInfo } from "./components/CarrierAddressInfo";

export default function CarrierForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<CarrierFormData>({
    defaultValues: {
      name: "",
      fantasia: "",
      document: "",
      ie: "",
      description: "",
      phone: "",
      email: "",
      city: null,
      zip: "",
      district: "",
      street: "",
      state: "SC",
      status: true,
    },
  });

  const onSubmit = async (data: CarrierFormData) => {
    try {
      // TODO: Implementar integração com API
      toast({
        title: "Sucesso",
        description: "Transportadora salva com sucesso!",
      });
      navigate("/inventory/carriers");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Erro ao salvar transportadora",
      });
    }
  };

  return (
    <div className="p-6 space-y-6 bg-background">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-foreground">
          {id ? "Editar" : "Nova"} Transportadora
        </h1>
      </div>

      <Card className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-6">
              <CarrierBasicInfo form={form} />
              <CarrierContactInfo form={form} />
              <CarrierAddressInfo form={form} />

              <div className="grid grid-cols-1 gap-6">
                <div className="col-span-1">
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
                </div>

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Status</FormLabel>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                type="button"
                onClick={() => navigate("/inventory/carriers")}
              >
                Cancelar
              </Button>
              <Button type="submit">Salvar</Button>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
}