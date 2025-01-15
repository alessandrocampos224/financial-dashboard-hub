export interface Customer {
  id: string;
  tenant_id: string;
  type: string;
  name: string;
  fantasia: string | null;
  cover: string | null;
  document: string;
  rg: string | null;
  ie: string;
  phone: string | null;
  email: string;
  password: string;
  roles_id: string;
  description: string | null;
  status: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}