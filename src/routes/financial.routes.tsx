import { Route } from "react-router-dom";
import SalesListPage from "@/pages/financial/sales/list";
import SalesForm from "@/pages/financial/sales/form";
import SalesViewPage from "@/pages/financial/sales/view";
import CashierPage from "@/pages/financial/cashier";
import PaymentsPage from "@/pages/financial/payments";
import PaymentForm from "@/pages/financial/payments/form";

export const FinancialRoutes = (
  <>
    <Route path="financial/sales" element={<SalesListPage />} />
    <Route path="financial/sales/new" element={<SalesForm />} />
    <Route path="financial/sales/:id" element={<SalesViewPage />} />
    <Route path="financial/sales/:id/edit" element={<SalesForm />} />
    <Route path="financial/cashier" element={<CashierPage />} />
    <Route path="financial/payments" element={<PaymentsPage />} />
    <Route path="financial/payments/new" element={<PaymentForm />} />
    <Route path="financial/payments/:id/edit" element={<PaymentForm />} />
  </>
);