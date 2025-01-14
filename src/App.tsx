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
import BrandsPage from "./pages/inventory/brands";
import ProductsPage from "./pages/inventory/products";
import CarriersPage from "./pages/inventory/carriers";
import OperationalSettings from "./pages/operational/settings";

const queryClient = new QueryClient();

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = localStorage.getItem("user") !== null;
  return isAuthenticated ? children : <Navigate to="/login" />;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
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
              <Route path="inventory/brands" element={<BrandsPage />} />
              <Route path="inventory/products" element={<ProductsPage />} />
              <Route path="inventory/carriers" element={<CarriersPage />} />
              <Route path="operational/settings" element={<OperationalSettings />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;