import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import LandingPage from "./pages/LandingPage";
import MenuPage from "./pages/MenuPage";
import PricingPage from "./pages/PricingPage";
import LocationsPage from "./pages/LocationsPage";
import AboutPage from "./pages/AboutPage";
import QuizPage from "./pages/QuizPage";
import DashboardPage from "./pages/DashboardPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import OrdersPage from "./pages/OrdersPage";
import SubscriptionsPage from "./pages/SubscriptionsPage";
import ScheduleMealsPage from "./pages/ScheduleMealsPage";
import PauseSubscriptionPage from "./pages/PauseSubscriptionPage";
import ReferralsPage from "./pages/ReferralsPage";
import BetaEaterPage from "./pages/BetaEaterPage";
import CareersPage from "./pages/CareersPage";
import FAQPage from "./pages/FAQPage";
import TermsPage from "./pages/TermsPage";
import PrivacyPage from "./pages/PrivacyPage";
import RefundPolicyPage from "./pages/RefundPolicyPage";
import FSSAIPage from "./pages/FSSAIPage";
import AdminDashboard from "./pages/AdminDashboard";
import AdminOrdersPage from "./pages/admin/AdminOrdersPage";
import AdminMenuPage from "./pages/admin/AdminMenuPage";
import AdminCustomersPage from "./pages/admin/AdminCustomersPage";
import AdminSubscriptionsPage from "./pages/admin/AdminSubscriptionsPage";
import AdminStationsPage from "./pages/admin/AdminStationsPage";
import AdminAnalyticsPage from "./pages/admin/AdminAnalyticsPage";
import AdminSettingsPage from "./pages/admin/AdminSettingsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/menu/:persona" element={<MenuPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/locations" element={<LocationsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/beta/apply" element={<BetaEaterPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/refund-policy" element={<RefundPolicyPage />} />
          <Route path="/license" element={<FSSAIPage />} />

          {/* User */}
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order/confirmation/:id" element={<OrderConfirmationPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/subscriptions" element={<SubscriptionsPage />} />
          <Route path="/subscription/schedule" element={<ScheduleMealsPage />} />
          <Route path="/subscription/pause" element={<PauseSubscriptionPage />} />
          <Route path="/referrals" element={<ReferralsPage />} />

          {/* Admin */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/orders" element={<AdminOrdersPage />} />
          <Route path="/admin/menu" element={<AdminMenuPage />} />
          <Route path="/admin/customers" element={<AdminCustomersPage />} />
          <Route path="/admin/subscriptions" element={<AdminSubscriptionsPage />} />
          <Route path="/admin/stations" element={<AdminStationsPage />} />
          <Route path="/admin/analytics" element={<AdminAnalyticsPage />} />
          <Route path="/admin/analytics/:tab" element={<AdminAnalyticsPage />} />
          <Route path="/admin/settings" element={<AdminSettingsPage />} />
          <Route path="/admin/settings/:tab" element={<AdminSettingsPage />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
