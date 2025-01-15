import { Route } from "react-router-dom";
import OperationalSettings from "@/pages/operational/settings";

export const OperationalRoutes = (
  <>
    <Route path="/operational/settings" element={<OperationalSettings />} />
  </>
);