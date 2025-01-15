import { Route } from "react-router-dom";
import OperationalSettings from "@/pages/operational/settings";
import UsersPage from "@/pages/settings/users";
import UserForm from "@/pages/settings/users/form";
import PermissionsPage from "@/pages/settings/permissions";
import PermissionForm from "@/pages/settings/permissions/form";
import RolesPage from "@/pages/settings/roles";
import RoleForm from "@/pages/settings/roles/form";
import CustomersPage from "@/pages/settings/customers";
import CustomerForm from "@/pages/settings/customers/form";

export const SettingsRoutes = (
  <>
    <Route path="operational/settings" element={<OperationalSettings />} />
    <Route path="settings/users" element={<UsersPage />} />
    <Route path="settings/users/new" element={<UserForm />} />
    <Route path="settings/users/:id/edit" element={<UserForm />} />
    <Route path="settings/permissions" element={<PermissionsPage />} />
    <Route path="settings/permissions/new" element={<PermissionForm />} />
    <Route path="settings/permissions/:id/edit" element={<PermissionForm />} />
    <Route path="settings/roles" element={<RolesPage />} />
    <Route path="settings/roles/new" element={<RoleForm />} />
    <Route path="settings/roles/:id/edit" element={<RoleForm />} />
    <Route path="settings/customers" element={<CustomersPage />} />
    <Route path="settings/customers/new" element={<CustomerForm />} />
    <Route path="settings/customers/:id/edit" element={<CustomerForm />} />
  </>
);