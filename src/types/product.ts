export interface Product {
  id: string;
  tenant_id?: string;
  code: string;
  type?: number;
  name: string;
  subtitle?: string;
  cover?: string;
  category_id?: string;  // Alterado de categories_id para category_id
  brand_id?: string;     // Alterado de brands_id para brand_id
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