export interface Category {
  id: string;
  tenant_id: string;
  name: string;
  url: string;
  description?: string;
  cover?: string;
  status: boolean;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}