import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-12 max-w-2xl prose prose-neutral dark:prose-invert">
        <h1 className="font-display">Refund Policy</h1>
        <p className="text-muted-foreground">Last updated: March 1, 2026</p>

        <h2>Order Cancellations</h2>
        <p>You may cancel an order up to <strong>12 hours before</strong> your scheduled pickup time for a full refund.</p>

        <h2>Missed Pickups</h2>
        <p>If you miss your pickup window, unfortunately no refund can be issued. Subscription meals have a 48-hour grace period.</p>

        <h2>Quality Issues</h2>
        <p>If you receive an item that doesn't meet our quality standards, report it within 2 hours of pickup. We'll issue a full refund or replacement credit.</p>

        <h2>Subscription Refunds</h2>
        <ul>
          <li><strong>Pause:</strong> No refund needed — meals are preserved for when you resume.</li>
          <li><strong>Cancel mid-cycle:</strong> Pro-rated refund for unused meals, processed within 5-7 business days.</li>
          <li><strong>Downgrade:</strong> Difference credited to your wallet for next cycle.</li>
        </ul>

        <h2>Refund Processing</h2>
        <p>Refunds are processed to the original payment method within 5-7 business days. UPI refunds are typically faster (1-2 days).</p>

        <h2>Contact</h2>
        <p>For refund requests, email <strong>support@7amclub.in</strong> or use the in-app support feature.</p>
      </div>
      <Footer />
    </div>
  );
}
