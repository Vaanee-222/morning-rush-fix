import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-12 max-w-2xl prose prose-neutral dark:prose-invert">
        <h1 className="font-display">Terms & Conditions</h1>
        <p className="text-muted-foreground">Last updated: March 1, 2026</p>

        <h2>1. Acceptance of Terms</h2>
        <p>By accessing and using the Gym Cafe platform ("Service"), you agree to be bound by these Terms and Conditions. If you do not agree, please do not use the Service.</p>

        <h2>2. Service Description</h2>
        <p>Gym Cafe provides a pre-order breakfast pickup service at select Delhi NCR metro stations. Orders must be placed at least 24 hours in advance.</p>

        <h2>3. Account Registration</h2>
        <p>You must provide accurate information during registration. You are responsible for maintaining the confidentiality of your account credentials.</p>

        <h2>4. Orders & Payment</h2>
        <p>All orders are prepaid. Prices are inclusive of GST. We accept UPI, credit/debit cards, and net banking through our payment partners.</p>

        <h2>5. Subscriptions</h2>
        <p>Subscription plans auto-renew monthly. You may pause or cancel at any time from your dashboard. Unused meals do not carry over beyond 48 hours.</p>

        <h2>6. Cancellation & Refunds</h2>
        <p>Orders can be cancelled up to 12 hours before the scheduled pickup. Refunds are processed within 5-7 business days. See our Refund Policy for details.</p>

        <h2>7. Intellectual Property</h2>
        <p>All content, branding, and materials on the platform are owned by Gym Cafe. You may not reproduce or distribute without written permission.</p>

        <h2>8. Limitation of Liability</h2>
        <p>Gym Cafe shall not be liable for any indirect, incidental, or consequential damages arising from use of the Service.</p>

        <h2>9. Changes to Terms</h2>
        <p>We reserve the right to modify these terms at any time. Continued use of the Service constitutes acceptance of updated terms.</p>

        <h2>10. Contact</h2>
        <p>For questions, contact us at <strong>legal@7amclub.in</strong>.</p>
      </div>
      <Footer />
    </div>
  );
}
