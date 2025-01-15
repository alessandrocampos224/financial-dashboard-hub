export interface Customer {
  id: string;
  tenant_id?: string | null;
  name: string | null;
  avatar_url?: string | null;
  email: string | null;
  created_at: string;
  updated_at: string;
}