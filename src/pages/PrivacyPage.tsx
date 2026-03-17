import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-12 max-w-2xl prose prose-neutral dark:prose-invert">
        <h1 className="font-display">Privacy Policy</h1>
        <p className="text-muted-foreground">Last updated: March 1, 2026</p>

        <h2>1. Information We Collect</h2>
        <p>We collect your name, phone number, email, dietary preferences, order history, and location data for service delivery.</p>

        <h2>2. How We Use Information</h2>
        <p>Your data is used to process orders, manage subscriptions, personalize recommendations, and improve our service. We never sell your personal data.</p>

        <h2>3. Data Storage</h2>
        <p>All data is stored securely on encrypted servers in India, compliant with Indian data protection regulations.</p>

        <h2>4. Third-Party Sharing</h2>
        <p>We share data only with payment processors (Razorpay), delivery logistics, and analytics tools — strictly for service operation.</p>

        <h2>5. Cookies & Tracking</h2>
        <p>We use cookies for session management and analytics. You can disable cookies in your browser settings.</p>

        <h2>6. Your Rights</h2>
        <p>You can request data access, correction, or deletion at any time by contacting <strong>privacy@7amclub.in</strong>.</p>

        <h2>7. Data Retention</h2>
        <p>We retain your data for as long as your account is active. Upon deletion request, data is purged within 30 days.</p>

        <h2>8. Changes</h2>
        <p>We may update this policy periodically. Material changes will be communicated via email or in-app notification.</p>
      </div>
      <Footer />
    </div>
  );
}
