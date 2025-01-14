import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft } from "lucide-react";
import { PermissionFormData } from "@/types/permission";

const formSchema = z.object({
  tenant_id: z.string().min(1, "ID do tenant é obrigatório"),
  roles_id: z.string().min(1, "ID do perfil é obrigatório"),
  name: z.string().min(1, "Nome é obrigatório"),
  alias: z.string().min(1, "Alias é obrigatório"),
  description: z.string().optional(),
  status: z.boolean().default(true),
});

export default function PermissionForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEditing = !!id;

  const form = useForm<PermissionFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tenant_id: "",
      roles_id: "",
      name: "",
      alias: "",
      description: "",
      status: true,
    },
  });

  useEffect(() => {
    if (isEditing) {
      // Replace with actual API call
      const mockPermission = {
        tenant_id: "01HNX5Y7JVWQ8C9D2Z3F4K5M7",
        roles_id: "01HNX5Y7JVWQ8C9D2Z3F4K5M8",
        name: "Create User",
        alias: "create_user",
        description: "Permission to create new users",
        status: true,
      };
      form.reset(mockPermission);
    }
  }, [isEditing, form]);

  const onSubmit = async (data: PermissionFormData) => {
    try {
      // Replace with actual API call
      console.log("Form data:", data);
      
      toast({
        title: `Permissão ${isEditing ? "atualizada" : "criada"} com sucesso!`,
        description: `A permissão foi ${
          isEditing ? "atualizada" : "criada"
        } com sucesso.`,
      });
      
      navigate("/settings/permissions");
    } catch (error) {
      toast({
        variant: "destructive",
        title: `Erro ao ${isEditing ? "atualizar" : "criar"} permissão`,
        description: `Ocorreu um erro ao ${
          isEditing ? "atualizar" : "criar"
        } a permissão.`,
      });
    }
  };

  return (
    <div className="container mx-auto py-6">
      <Button
        variant="ghost"
        className="mb-6"
        onClick={() => navigate("/settings/permissions")}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Voltar
      </Button>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          {isEditing ? "Editar Permissão" : "Nova Permissão"}
        </h1>
      </div>

      <div className="max-w-2xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    Nome descritivo da permissão
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="alias"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alias</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    Identificador único da permissão (ex: create_user)
                  </FormDescription>
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
                    <Textarea {...field} />
                  </FormControl>
                  <FormDescription>
                    Descrição detalhada da permissão
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Status</FormLabel>
                    <FormDescription>
                      Ativar ou desativar esta permissão
                    </FormDescription>
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

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/settings/permissions")}
              >
                Cancelar
              </Button>
              <Button type="submit">
                {isEditing ? "Atualizar" : "Criar"} Permissão
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}