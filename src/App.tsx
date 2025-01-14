import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import TaxesPage from "./pages/inventory/taxes";
import CategoriesPage from "./pages/inventory/categories";
import CategoryForm from "./pages/inventory/categories/form";
import BrandsPage from "./pages/inventory/brands";
import BrandForm from "./pages/inventory/brands/form";
import ProductsPage from "./pages/inventory/products";
import ProductForm from "./pages/inventory/products/form";
import CarriersPage from "./pages/inventory/carriers";
import SalesPage from "./pages/financial/sales";
import SalesListPage from "./pages/financial/sales/list";
import SalesForm from "./pages/financial/sales/form";
import SalesViewPage from "./pages/financial/sales/view";
import CashierPage from "./pages/financial/cashier";
import PaymentsPage from "./pages/financial/payments";
import PaymentForm from "./pages/financial/payments/form";
import OperationalSettings from "./pages/operational/settings";
import UsersPage from "./pages/settings/users";
import UserForm from "./pages/settings/users/form";
import PermissionsPage from "./pages/settings/permissions";
import PermissionForm from "./pages/settings/permissions/form";
import RolesPage from "./pages/settings/roles";
import RoleForm from "./pages/settings/roles/form";

const queryClient = new QueryClient();

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = localStorage.getItem("user") !== null;
  return isAuthenticated ? children : <Navigate to="/login" />;
}

const App = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TooltipProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <Index />
                  </PrivateRoute>
                }
              >
                <Route path="inventory/taxes" element={<TaxesPage />} />
                <Route path="inventory/categories" element={<CategoriesPage />} />
                <Route path="inventory/categories/new" element={<CategoryForm />} />
                <Route path="inventory/categories/:id/edit" element={<CategoryForm />} />
                <Route path="inventory/brands" element={<BrandsPage />} />
                <Route path="inventory/brands/new" element={<BrandForm />} />
                <Route path="inventory/brands/:id/edit" element={<BrandForm />} />
                <Route path="inventory/products" element={<ProductsPage />} />
                <Route path="inventory/products/new" element={<ProductForm />} />
                <Route path="inventory/products/:id/edit" element={<ProductForm />} />
                <Route path="inventory/carriers" element={<CarriersPage />} />
                <Route path="financial/sales" element={<SalesListPage />} />
                <Route path="financial/sales/new" element={<SalesForm />} />
                <Route path="financial/sales/:id" element={<SalesViewPage />} />
                <Route path="financial/sales/:id/edit" element={<SalesForm />} />
                <Route path="financial/cashier" element={<CashierPage />} />
                <Route path="financial/payments" element={<PaymentsPage />} />
                <Route path="financial/payments/new" element={<PaymentForm />} />
                <Route path="financial/payments/:id/edit" element={<PaymentForm />} />
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
              </Route>
            </Routes>
            <Toaster />
            <Sonner />
          </TooltipProvider>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
