import { z } from "zod";

export const customerFormSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  fantasia: z.string().optional(),
  document: z.string().min(1, "CPF/CNPJ é obrigatório"),
  rg: z.string().optional(),
  ie: z.string().default("ISENTO"),
  phone: z.string().optional(),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
  roles_id: z.string().min(1, "Perfil é obrigatório"),
  description: z.string().optional(),
  status: z.boolean().default(true),
});

export type CustomerFormValues = z.infer<typeof customerFormSchema>;