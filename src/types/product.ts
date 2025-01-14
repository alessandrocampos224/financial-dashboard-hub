export interface Product {
  id: string;
  tenant_id: string;
  code: string;
  type?: number;
  name: string;
  subtitle: string;
  cover?: string;
  categories_id: string;
  brands_id: string;
  price: number;
  interest?: number;
  amount?: number;
  weight?: number;
  stock?: number;
  description?: string;
  status: boolean;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}