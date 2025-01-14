export interface Order {
  id: string;
  tenant_id: string;
  invoice: string | null;
  type: string | null;
  user_id: string;
  interest: number | null;
  discount: number | null;
  price: number | null;
  amount: number | null;
  description: string | null;
  link: string | null;
  status: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  customer?: {
    name: string;
    email: string;
  };
}