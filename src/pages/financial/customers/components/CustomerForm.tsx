import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { CustomerBasicInfo } from "./CustomerBasicInfo";
import { CustomerContact } from "./CustomerContact";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { UseFormReturn } from "react-hook-form";
import { CustomerFormValues } from "../schema";

interface CustomerFormProps {
  form: UseFormReturn<CustomerFormValues>;
  isSubmitting: boolean;
  onSubmit: (data: CustomerFormValues) => Promise<void>;
  onCancel: () => void;
}

export function CustomerForm({ form, isSubmitting, onSubmit, onCancel }: CustomerFormProps) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CustomerBasicInfo form={form} />
          <CustomerContact form={form} />

          <div className="col-span-2">
            <Textarea
              placeholder="Descrição"
              {...form.register("description")}
            />
          </div>

          <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
            <Checkbox
              checked={Boolean(form.watch("status"))}
              onCheckedChange={(checked) => form.setValue("status", !!checked)}
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
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            Salvar
          </Button>
        </div>
      </form>
    </Form>
  );
}