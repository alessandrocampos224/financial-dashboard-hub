export interface Payment {
  id: string;
  tenant_id: string;
  safe_id: string;
  user_id: string;
  order_id: string;
  parcela: number;
  amount: number | null;
  discount: number | null;
  affix: number | null;
  price: number | null;
  description: string | null;
  number: string | null;
  status: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  order?: {
    customer?: {
      name?: string;
    };
    invoice?: string;
  };
}