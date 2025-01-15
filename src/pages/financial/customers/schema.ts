import { z } from "zod";

export const customerFormSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
  description: z.string().optional(),
  status: z.boolean().default(true),
});

export type CustomerFormValues = z.infer<typeof customerFormSchema>;