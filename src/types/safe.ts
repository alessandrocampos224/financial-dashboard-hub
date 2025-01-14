export interface Safe {
  id: string;
  tenant_id: string;
  positive: number;
  negative: number;
  amount: number;
  description: string | null;
  status: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}