export interface Item {
  id: string;
  tenant_id: string;
  order_id: string;
  product_id: string;
  quantity?: number;
  unitary?: number;
  amount?: number;
  status: boolean;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
  product?: {
    name: string;
    code: string;
  };
}