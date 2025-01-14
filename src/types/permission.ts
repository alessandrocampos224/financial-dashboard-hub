export interface Permission {
  id: string;
  tenant_id: string;
  roles_id: string;
  name: string;
  alias: string;
  description?: string;
  status: boolean;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface PermissionFormData {
  tenant_id: string;
  roles_id: string;
  name: string;
  alias: string;
  description?: string;
  status: boolean;
}