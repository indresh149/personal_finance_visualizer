import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import DashboardOverview from "pages/dashboard-overview";
import FinancialAnalytics from "pages/financial-analytics";
import TransactionManagement from "pages/transaction-management";
import BudgetPlanning from "pages/budget-planning";
import SettingsDataManagement from "pages/settings-data-management";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
      
        <Route path="/" element={<DashboardOverview />} />
        <Route path="/dashboard-overview" element={<DashboardOverview />} />
        <Route path="/financial-analytics" element={<FinancialAnalytics />} />
        <Route path="/transaction-management" element={<TransactionManagement />} />
        <Route path="/budget-planning" element={<BudgetPlanning />} />
        <Route path="/settings-data-management" element={<SettingsDataManagement />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;