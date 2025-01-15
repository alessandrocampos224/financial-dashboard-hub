export interface Carrier {
  id: string;
  tenant_id: string | null;
  name: string;
  document: string | null;
  ie: string | null;
  phone: string | null;
  email: string | null;
  zip: string | null;
  street: string | null;
  number: string | null;
  district: string | null;
  city: string | null;
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