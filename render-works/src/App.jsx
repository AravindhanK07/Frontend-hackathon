import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import DashboardLayoutBranding from "./pages/DashboardLayoutBranding.jsx";
import SalesTable from "./components/SalesTable.jsx";
import PurchaseTable from "./components/PurchaseTable.jsx";
import BalanceSheetTable from "./components/BalanceSheetTable.jsx";
import HowToUseTable from "./components/HowToUse.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Routes (Everything Else) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<DashboardLayoutBranding />}>
            <Route index element={<SalesTable />} /> {/* Default route */}
            <Route path="sales" element={<SalesTable />} />
            <Route path="purchase" element={<PurchaseTable />} />
            <Route path="balance-sheet" element={<BalanceSheetTable />} />
            <Route path="how-to-use" element={<HowToUseTable />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
