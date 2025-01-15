import { Route } from "react-router-dom";
import TaxesPage from "@/pages/inventory/taxes";
import CategoriesPage from "@/pages/inventory/categories";
import CategoryForm from "@/pages/inventory/categories/form";
import BrandsPage from "@/pages/inventory/brands";
import BrandForm from "@/pages/inventory/brands/form";
import ProductsPage from "@/pages/inventory/products";
import ProductForm from "@/pages/inventory/products/form";
import CarriersPage from "@/pages/inventory/carriers";
import CarrierForm from "@/pages/inventory/carriers/form";

export const InventoryRoutes = (
  <>
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
    <Route path="inventory/carriers/new" element={<CarrierForm />} />
    <Route path="inventory/carriers/:id/edit" element={<CarrierForm />} />
  </>
);