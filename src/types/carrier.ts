export interface Carrier {
  id: string;
  tenant_id: string;
  name: string;
  fantasia: string;
  document: string | null;
  ie: string;
  description: string;
  phone: string | null;
  email: string | null;
  city: number | null;
  zip: string | null;
  district: string | null;
  street: string | null;
  state: string;
  status: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export type CarrierFormData = Omit<
  Carrier,
  "id" | "tenant_id" | "created_at" | "updated_at" | "deleted_at"
>;