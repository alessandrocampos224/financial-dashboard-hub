import { Route } from "react-router-dom";
import CustomersPage from "@/pages/financial/customers";
import CustomerForm from "@/pages/financial/customers/form";
import SalesPage from "@/pages/financial/sales";
import SaleForm from "@/pages/financial/sales/form";
import SaleView from "@/pages/financial/sales/view";
import SaleList from "@/pages/financial/sales/list";
import CashierPage from "@/pages/financial/cashier";
import PaymentsPage from "@/pages/financial/payments";
import PaymentForm from "@/pages/financial/payments/form";

export const FinancialRoutes = (
  <>
    <Route path="/financial/customers" element={<CustomersPage />} />
    <Route path="/financial/customers/new" element={<CustomerForm />} />
    <Route path="/financial/customers/:id/edit" element={<CustomerForm />} />
    <Route path="/financial/sales" element={<SalesPage />} />
    <Route path="/financial/sales/new" element={<SaleForm />} />
    <Route path="/financial/sales/:id" element={<SaleView />} />
    <Route path="/financial/sales/list" element={<SaleList />} />
    <Route path="/financial/cashier" element={<CashierPage />} />
    <Route path="/financial/payments" element={<PaymentsPage />} />
    <Route path="/financial/payments/new" element={<PaymentForm />} />
    <Route path="/financial/payments/:id/edit" element={<PaymentForm />} />
  </>
);