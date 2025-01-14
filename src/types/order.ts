export interface Order {
  id: string;
  tenant_id: string;
  invoice?: string;
  type?: string;
  user_id: string;
  interest?: number;
  discount?: number;
  price?: number;
  amount?: number;
  description?: string;
  link?: string;
  status: boolean;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}