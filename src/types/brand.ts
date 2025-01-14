export interface Brand {
  id: string;
  tenant_id: string;
  name: string;
  cover?: string;
  description?: string;
  status: boolean;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}