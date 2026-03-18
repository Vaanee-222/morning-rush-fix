import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, ChevronRight, ShoppingCart, CreditCard, Package, Users, MapPin, MessageCircle, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = [
  { icon: ShoppingCart, label: 'Orders', articles: 12, desc: 'Placing, tracking, and cancelling orders' },
  { icon: Package, label: 'Subscriptions', articles: 8, desc: 'Plans, scheduling, pausing' },
  { icon: CreditCard, label: 'Payments', articles: 6, desc: 'Refunds, UPI, cards' },
  { icon: MapPin, label: 'Pickup Stations', articles: 5, desc: 'Locations, timing, QR codes' },
  { icon: Users, label: 'Account', articles: 7, desc: 'Profile, preferences, deletion' },
  { icon: HelpCircle, label: 'General', articles: 10, desc: 'Nutrition, allergens, feedback' },
];

const popularArticles = [
  'How do I cancel or modify an order?',
  'What is the pre-order cutoff time?',
  'How does the QR code pickup work?',
  'Can I pause my subscription?',
  'How do I apply a coupon code?',
  'What if my order is wrong?',
  'How do I become a Beta Eater?',
  'What is the refund policy?',
];

export default function HelpCenterPage() {
  const [search, setSearch] = useState('');

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-12">
        {/* Hero Search */}
        <div className="text-center mb-12 py-8 bg-muted/50 rounded-2xl px-4">
          <h1 className="font-display text-4xl font-bold mb-4">How can we help? 🤝</h1>
          <div className="relative max-w-lg mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input placeholder="Search for help..." value={search} onChange={e => setSearch(e.target.value)} className="pl-11 h-12 text-base" />
          </div>
        </div>

        {/* Categories */}
        <h2 className="font-display text-2xl font-bold mb-6">Browse by Category</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {categories.map(c => (
            <Card key={c.label} className="shadow-soft hover:shadow-card transition-shadow cursor-pointer group">
              <CardContent className="p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <c.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-display font-semibold group-hover:text-primary transition-colors">{c.label}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{c.desc}</p>
                  <p className="text-xs text-muted-foreground mt-1">{c.articles} articles</p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground mt-1" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Popular Articles */}
        <h2 className="font-display text-2xl font-bold mb-6">Popular Articles</h2>
        <Card className="shadow-soft mb-12">
          <CardContent className="p-2">
            {popularArticles.filter(a => !search || a.toLowerCase().includes(search.toLowerCase())).map(article => (
              <button key={article} className="w-full flex items-center justify-between px-4 py-3 hover:bg-muted/50 rounded-lg transition-colors text-left">
                <span className="text-sm">{article}</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
              </button>
            ))}
          </CardContent>
        </Card>

        {/* Still Need Help */}
        <div className="text-center p-8 bg-muted/50 rounded-2xl">
          <h3 className="font-display text-2xl font-bold mb-3">Still need help?</h3>
          <p className="text-muted-foreground mb-4">Our support team is always happy to help.</p>
          <div className="flex justify-center gap-3">
            <Link to="/contact"><Button variant="hero"><MessageCircle className="h-4 w-4 mr-2" /> Contact Us</Button></Link>
            <Button variant="outline">WhatsApp Support</Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
