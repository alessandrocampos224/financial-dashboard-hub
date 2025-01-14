export interface Role {
  id: string;
  tenant_id: string;
  name: string;
  alias: string;
  is_admin: boolean;
  description: string | null;
  status: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export type CreateRoleDTO = Omit<Role, 'id' | 'created_at' | 'updated_at' | 'deleted_at'>;
export type UpdateRoleDTO = Partial<CreateRoleDTO>;