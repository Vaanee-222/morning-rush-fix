import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-sunrise">
                <span className="text-sm font-bold text-primary-foreground">G</span>
              </div>
              <span className="font-display text-lg font-bold">Gym Cafe</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Gut-friendly breakfasts at metro exits. Pre-book, pick up in 2 minutes, fuel your day.
            </p>
          </div>
          <div>
            <h4 className="font-display font-semibold mb-3">Product</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link to="/menu" className="hover:text-foreground transition-colors">Menu</Link>
              <Link to="/shop" className="hover:text-foreground transition-colors">Shop</Link>
              <Link to="/chapters" className="hover:text-foreground transition-colors">Chapters</Link>
              <Link to="/pricing" className="hover:text-foreground transition-colors">Pricing</Link>
              <Link to="/membership" className="hover:text-foreground transition-colors">Membership</Link>
              <Link to="/locations" className="hover:text-foreground transition-colors">Locations</Link>
              <Link to="/beta/apply" className="hover:text-foreground transition-colors">Beta Eaters</Link>
              <Link to="/partner" className="hover:text-foreground transition-colors">Partner Program</Link>
            </div>
          </div>
          <div>
            <h4 className="font-display font-semibold mb-3">Company</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link to="/about" className="hover:text-foreground transition-colors">About Us</Link>
              <Link to="/founder-story" className="hover:text-foreground transition-colors">Founder Story</Link>
              <Link to="/careers" className="hover:text-foreground transition-colors">Careers</Link>
              <Link to="/contact" className="hover:text-foreground transition-colors">Contact</Link>
              <Link to="/experience" className="hover:text-foreground transition-colors">Experience</Link>
              <Link to="/tour" className="hover:text-foreground transition-colors">Take a Tour</Link>
              <Link to="/quiz" className="hover:text-foreground transition-colors">Persona Quiz</Link>
            </div>
          </div>
          <div>
            <h4 className="font-display font-semibold mb-3">Support</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link to="/help" className="hover:text-foreground transition-colors">Help Center</Link>
              <Link to="/faq" className="hover:text-foreground transition-colors">FAQ</Link>
              <Link to="/feedback" className="hover:text-foreground transition-colors">Feedback</Link>
            </div>
          </div>
          <div>
            <h4 className="font-display font-semibold mb-3">Legal</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link to="/terms" className="hover:text-foreground transition-colors">Terms</Link>
              <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
              <Link to="/refund-policy" className="hover:text-foreground transition-colors">Refund Policy</Link>
              <Link to="/license" className="hover:text-foreground transition-colors">FSSAI License</Link>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">© 2026 Gym Cafe. All rights reserved.</p>
          <p className="text-sm text-muted-foreground">Made with 🧡 for Delhi NCR commuters</p>
        </div>
      </div>
    </footer>
  );
}