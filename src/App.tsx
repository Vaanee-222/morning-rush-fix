import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LiveChat } from "@/components/LiveChat";
import LandingPage from "./pages/LandingPage";
import MenuPage from "./pages/MenuPage";
import MenuItemDetailPage from "./pages/MenuItemDetailPage";
import PricingPage from "./pages/PricingPage";
import MembershipPage from "./pages/MembershipPage";
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
import ProfilePage from "./pages/ProfilePage";
import OnboardingPage from "./pages/OnboardingPage";
import BetaEaterPage from "./pages/BetaEaterPage";
import BetaDashboardPage from "./pages/beta/BetaDashboardPage";
import BetaStatusPage from "./pages/beta/BetaStatusPage";
import BetaFeedbackPage from "./pages/beta/BetaFeedbackPage";
import BetaFeedbackHistoryPage from "./pages/beta/BetaFeedbackHistoryPage";
import BetaPreviewsPage from "./pages/beta/BetaPreviewsPage";
import BetaRewardsPage from "./pages/beta/BetaRewardsPage";
import PartnerProgramPage from "./pages/PartnerProgramPage";
import PartnerDashboardPage from "./pages/partner/PartnerDashboardPage";
import ExperiencePage from "./pages/ExperiencePage";
import TourPage from "./pages/TourPage";
import FounderStoryPage from "./pages/FounderStoryPage";
import ContactPage from "./pages/ContactPage";
import HelpCenterPage from "./pages/HelpCenterPage";
import FeedbackPage from "./pages/FeedbackPage";
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
import AdminPartnersPage from "./pages/admin/AdminPartnersPage";
import AdminInventoryPage from "./pages/admin/AdminInventoryPage";
import AdminNotificationsPage from "./pages/admin/AdminNotificationsPage";
import AdminAnalyticsPage from "./pages/admin/AdminAnalyticsPage";
import AdminSettingsPage from "./pages/admin/AdminSettingsPage";
import AdminMembershipsPage from "./pages/admin/AdminMembershipsPage";
import AdminChaptersPage from "./pages/admin/AdminChaptersPage";
import AdminProfilePage from "./pages/AdminProfilePage";
import ChaptersPage from "./pages/ChaptersPage";
import ChapterDetailPage from "./pages/ChapterDetailPage";
import ShopPage from "./pages/ShopPage";
import DeliveryDashboardPage from "./pages/delivery/DeliveryDashboardPage";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
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
          <Route path="/menu/item/:id" element={<MenuItemDetailPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/membership" element={<MembershipPage />} />
          <Route path="/locations" element={<LocationsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/tour" element={<TourPage />} />
          <Route path="/founder-story" element={<FounderStoryPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/chapters" element={<ChaptersPage />} />
          <Route path="/chapters/:id" element={<ChapterDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/help" element={<HelpCenterPage />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/refund-policy" element={<RefundPolicyPage />} />
          <Route path="/license" element={<FSSAIPage />} />

          {/* Auth */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />

          {/* Beta Eater */}
          <Route path="/beta/apply" element={<BetaEaterPage />} />
          <Route path="/beta/status" element={<BetaStatusPage />} />
          <Route path="/beta/dashboard" element={<BetaDashboardPage />} />
          <Route path="/beta/feedback/new" element={<BetaFeedbackPage />} />
          <Route path="/beta/feedback/:id" element={<BetaFeedbackPage />} />
          <Route path="/beta/feedback/history" element={<BetaFeedbackHistoryPage />} />
          <Route path="/beta/previews" element={<BetaPreviewsPage />} />
          <Route path="/beta/rewards" element={<BetaRewardsPage />} />

          {/* Partner */}
          <Route path="/partner" element={<PartnerProgramPage />} />
          <Route path="/partner/dashboard" element={<PartnerDashboardPage />} />

          {/* Delivery Partner */}
          <Route path="/delivery/dashboard" element={<DeliveryDashboardPage />} />

          {/* User */}
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/profile" element={<ProfilePage />} />
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
          <Route path="/admin/partners" element={<AdminPartnersPage />} />
          <Route path="/admin/inventory" element={<AdminInventoryPage />} />
          <Route path="/admin/notifications" element={<AdminNotificationsPage />} />
          <Route path="/admin/memberships" element={<AdminMembershipsPage />} />
          <Route path="/admin/chapters" element={<AdminChaptersPage />} />
          <Route path="/admin/analytics" element={<AdminAnalyticsPage />} />
          <Route path="/admin/analytics/:tab" element={<AdminAnalyticsPage />} />
          <Route path="/admin/settings" element={<AdminSettingsPage />} />
          <Route path="/admin/settings/:tab" element={<AdminSettingsPage />} />
          <Route path="/admin/profile" element={<AdminProfilePage />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
        <LiveChat />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
