import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Search, ChevronRight, ShoppingCart, CreditCard, Package, Users, MapPin, MessageCircle, HelpCircle, Phone, Mail, Clock, ArrowRight, FileText, Shield, Sparkles, Utensils } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = [
  { icon: ShoppingCart, label: 'Orders', articles: 12, desc: 'Placing, tracking, and cancelling orders', link: '/orders', color: 'text-primary' },
  { icon: Package, label: 'Subscriptions', articles: 8, desc: 'Plans, scheduling, pausing', link: '/subscriptions', color: 'text-secondary' },
  { icon: CreditCard, label: 'Payments', articles: 6, desc: 'Refunds, UPI, cards', link: '/refund-policy', color: 'text-persona-millennial' },
  { icon: MapPin, label: 'Pickup Stations', articles: 5, desc: 'Locations, timing, QR codes', link: '/locations', color: 'text-persona-genz' },
  { icon: Users, label: 'Account', articles: 7, desc: 'Profile, preferences, deletion', link: '/profile', color: 'text-persona-boomer' },
  { icon: Utensils, label: 'Menu & Nutrition', articles: 9, desc: 'Items, allergens, nutrition info', link: '/menu', color: 'text-golden' },
  { icon: Shield, label: 'Safety & FSSAI', articles: 4, desc: 'Food safety, certifications', link: '/license', color: 'text-secondary' },
  { icon: HelpCircle, label: 'General', articles: 10, desc: 'Beta Eaters, referrals, feedback', link: '/faq', color: 'text-muted-foreground' },
];

const faqsByCategory: Record<string, { q: string; a: string }[]> = {
  Orders: [
    { q: 'How do I cancel or modify an order?', a: 'You can cancel or modify your order until 10 PM the night before. Go to Orders → select the order → tap Modify or Cancel.' },
    { q: 'What is the pre-order cutoff time?', a: 'All orders must be placed by 10 PM the previous night. This allows our kitchen to prepare fresh meals by 6 AM.' },
    { q: 'How does the QR code pickup work?', a: 'After placing your order, you\'ll receive a QR code in the app. Flash it at the counter, and we\'ll hand you your meal in under 2 minutes.' },
    { q: 'What if my order is wrong?', a: 'Contact us immediately at the station or via the app. We\'ll replace your order on the spot or issue a full refund within 24 hours.' },
  ],
  Subscriptions: [
    { q: 'Can I pause my subscription?', a: 'Yes! You can pause your subscription for up to 30 days from your dashboard. Your remaining meals will be preserved.' },
    { q: 'How do I upgrade my plan?', a: 'Go to Subscriptions → Manage Plan → Upgrade. The price difference will be prorated for the remaining days.' },
    { q: 'Can I change my pickup station?', a: 'Absolutely. You can change your default station anytime, or pick a different station for individual orders.' },
    { q: 'What happens to unused meals?', a: 'Unused meals from the current month do not roll over. We recommend pausing if you\'re traveling.' },
  ],
  Payments: [
    { q: 'What payment methods do you accept?', a: 'We accept UPI (Google Pay, PhonePe, Paytm), credit/debit cards, net banking, and wallets. All payments are secured by Razorpay.' },
    { q: 'How do I apply a coupon code?', a: 'Enter your coupon code at checkout in the "Coupon" field. Valid coupons will show the discount immediately.' },
    { q: 'What is the refund policy?', a: 'Full refunds for quality issues reported within 2 hours. Cancellations before 10 PM get full credit. See our full refund policy for details.' },
  ],
  General: [
    { q: 'How do I become a Beta Eater?', a: 'Apply through our Beta Eater page. We select testers monthly based on activity, feedback quality, and engagement.' },
    { q: 'Is the food really healthy?', a: 'Yes! All items are designed by certified nutritionists. We use no refined sugar, minimal oil, and focus on gut-friendly ingredients.' },
    { q: 'How do referrals work?', a: 'Share your unique referral code. When a friend subscribes, you both get ₹100 credit. Top referrers earn bonus rewards!' },
  ],
};

const allFaqs = Object.values(faqsByCategory).flat();

const quickLinks = [
  { label: 'Track Order', href: '/orders', emoji: '📦' },
  { label: 'Manage Subscription', href: '/subscriptions', emoji: '📋' },
  { label: 'View Menu', href: '/menu', emoji: '🍽️' },
  { label: 'Find Stations', href: '/locations', emoji: '📍' },
  { label: 'Refund Policy', href: '/refund-policy', emoji: '💰' },
  { label: 'FSSAI License', href: '/license', emoji: '🛡️' },
  { label: 'FAQ', href: '/faq', emoji: '❓' },
  { label: 'Beta Eaters', href: '/beta/apply', emoji: '🧪' },
];

export default function HelpCenterPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredFaqs = activeCategory
    ? faqsByCategory[activeCategory] || []
    : search
    ? allFaqs.filter(f => f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase()))
    : allFaqs.slice(0, 8);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-12">
        {/* Hero Search */}
        <div className="text-center mb-12 py-10 gradient-hero rounded-3xl px-4">
          <h1 className="font-display text-4xl font-bold mb-2">How can we help? 🤝</h1>
          <p className="text-muted-foreground mb-6">Search our knowledge base or browse by category</p>
          <div className="relative max-w-lg mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input placeholder="Search for help..." value={search} onChange={e => { setSearch(e.target.value); setActiveCategory(null); }} className="pl-11 h-12 text-base shadow-soft" />
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {quickLinks.map(ql => (
            <Link key={ql.href} to={ql.href}>
              <Badge variant="outline" className="cursor-pointer hover:bg-muted transition-colors py-1.5 px-3 text-sm">
                {ql.emoji} {ql.label}
              </Badge>
            </Link>
          ))}
        </div>

        {/* Categories */}
        <h2 className="font-display text-2xl font-bold mb-6">Browse by Category</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {categories.map(c => (
            <Card key={c.label} className={`shadow-soft hover:shadow-card transition-shadow cursor-pointer group ${activeCategory === c.label ? 'ring-2 ring-primary' : ''}`}
              onClick={() => setActiveCategory(activeCategory === c.label ? null : c.label)}>
              <CardContent className="p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <c.icon className={`h-5 w-5 ${c.color}`} />
                </div>
                <div className="flex-1">
                  <h3 className="font-display font-semibold group-hover:text-primary transition-colors">{c.label}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{c.desc}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs text-muted-foreground">{c.articles} articles</span>
                    <Link to={c.link} onClick={e => e.stopPropagation()} className="text-xs text-primary font-medium flex items-center gap-0.5">
                      Go to page <ChevronRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQs */}
        <h2 className="font-display text-2xl font-bold mb-2">
          {activeCategory ? `${activeCategory} — FAQ` : search ? 'Search Results' : 'Popular Questions'}
        </h2>
        <p className="text-muted-foreground mb-6">{filteredFaqs.length} articles found</p>

        <Card className="shadow-soft mb-12">
          <CardContent className="p-4">
            {filteredFaqs.length > 0 ? (
              <Accordion type="single" collapsible className="w-full">
                {filteredFaqs.map((faq, i) => (
                  <AccordionItem key={i} value={`faq-${i}`}>
                    <AccordionTrigger className="text-sm text-left hover:text-primary">{faq.q}</AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground">{faq.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <div className="text-center py-8">
                <p className="text-4xl mb-2">🔍</p>
                <p className="text-muted-foreground">No results found. Try a different search term.</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Contact Options */}
        <div className="grid sm:grid-cols-3 gap-4 mb-12">
          {[
            { icon: MessageCircle, title: 'Live Chat', desc: 'Chat with our team in real-time', action: 'Start Chat', color: 'text-primary' },
            { icon: Phone, title: 'WhatsApp', desc: '+91 98765 43210', action: 'Message Us', color: 'text-secondary' },
            { icon: Mail, title: 'Email', desc: 'support@7amclub.in', action: 'Send Email', color: 'text-persona-millennial' },
          ].map(channel => (
            <Card key={channel.title} className="shadow-soft hover:shadow-card transition-shadow">
              <CardContent className="p-5 text-center">
                <channel.icon className={`h-8 w-8 ${channel.color} mx-auto mb-3`} />
                <h3 className="font-display font-semibold mb-1">{channel.title}</h3>
                <p className="text-xs text-muted-foreground mb-3">{channel.desc}</p>
                <Button variant="outline" size="sm" className="w-full">{channel.action}</Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Related Pages */}
        <h2 className="font-display text-2xl font-bold mb-4">Related Pages</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-12">
          {[
            { label: 'Contact Us', href: '/contact', emoji: '📞' },
            { label: 'Feedback', href: '/feedback', emoji: '💬' },
            { label: 'Terms of Service', href: '/terms', emoji: '📜' },
            { label: 'Privacy Policy', href: '/privacy', emoji: '🔒' },
            { label: 'Refund Policy', href: '/refund-policy', emoji: '💰' },
            { label: 'Careers', href: '/careers', emoji: '🚀' },
            { label: 'Partner Program', href: '/partner', emoji: '🤝' },
            { label: 'Take a Tour', href: '/tour', emoji: '🎯' },
          ].map(page => (
            <Link key={page.href} to={page.href}>
              <div className="flex items-center gap-3 p-3 rounded-xl border border-border hover:bg-muted/50 transition-colors">
                <span className="text-xl">{page.emoji}</span>
                <span className="text-sm font-medium flex-1">{page.label}</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </Link>
          ))}
        </div>

        {/* Still Need Help */}
        <div className="text-center p-8 gradient-sunrise rounded-3xl relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="font-display text-2xl font-bold mb-3 text-primary-foreground">Still need help?</h3>
            <p className="text-primary-foreground/80 mb-4">Our support team is always happy to help.</p>
            <div className="flex justify-center gap-3">
              <Link to="/contact"><Button className="bg-card text-foreground hover:bg-card/90"><MessageCircle className="h-4 w-4 mr-2" /> Contact Us</Button></Link>
              <Button variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">WhatsApp Support</Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
