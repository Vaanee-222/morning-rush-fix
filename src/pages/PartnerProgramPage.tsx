import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, TrendingUp, Users, DollarSign, ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const benefits = [
  { icon: DollarSign, title: 'Low Investment', desc: 'Start with as low as ₹2L investment. We provide the brand, tech, and menu.' },
  { icon: TrendingUp, title: 'Proven Model', desc: '₹45K+ avg monthly revenue per station with 40% margins.' },
  { icon: Users, title: 'Full Support', desc: 'Training, supply chain, marketing — we handle it all.' },
  { icon: MapPin, title: 'Prime Locations', desc: 'Exclusive metro exit slots in high-traffic areas.' },
];

export default function PartnerProgramPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-primary/10 text-primary">Partner Program</Badge>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Run a Gym Cafe Station 🚉</h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Own a metro breakfast station. Low investment, high returns, full brand support.
          </p>
        </div>

        {/* Benefits */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {benefits.map(b => (
            <Card key={b.title} className="shadow-soft text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <b.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display font-semibold mb-2">{b.title}</h3>
                <p className="text-sm text-muted-foreground">{b.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* How It Works */}
        <div className="mb-12">
          <h2 className="font-display text-2xl font-bold text-center mb-8">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Apply', desc: 'Fill out the partner application form.' },
              { step: '2', title: 'Interview', desc: 'We review your profile and schedule a call.' },
              { step: '3', title: 'Setup', desc: 'We help you set up the station in 2-3 weeks.' },
              { step: '4', title: 'Launch', desc: 'Start serving breakfast and earning from day 1!' },
            ].map(s => (
              <div key={s.step} className="text-center">
                <div className="w-10 h-10 mx-auto mb-3 rounded-full gradient-sunrise flex items-center justify-center text-sm font-bold text-primary-foreground">{s.step}</div>
                <h3 className="font-display font-semibold">{s.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Application Form */}
        <Card className="shadow-elevated max-w-2xl mx-auto">
          <CardContent className="p-8">
            <h2 className="font-display text-2xl font-bold mb-6 text-center">Apply to be a Partner</h2>
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div><label className="text-sm font-medium mb-1 block">Full Name</label><Input placeholder="Your name" /></div>
                <div><label className="text-sm font-medium mb-1 block">Phone Number</label><Input placeholder="+91 ..." /></div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div><label className="text-sm font-medium mb-1 block">Email</label><Input placeholder="you@email.com" type="email" /></div>
                <div><label className="text-sm font-medium mb-1 block">City</label><Input placeholder="e.g. Delhi, Gurugram" /></div>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Preferred Metro Station</label>
                <Input placeholder="e.g. Rajiv Chowk" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Investment Budget (₹)</label>
                <Input placeholder="e.g. 200000" type="number" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Previous Business Experience</label>
                <Textarea placeholder="Tell us about your background..." rows={3} />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Why do you want to partner with Gym Cafe?</label>
                <Textarea placeholder="Your motivation..." rows={3} />
              </div>
              <Button variant="hero" className="w-full">Submit Application <ArrowRight className="ml-2 h-4 w-4" /></Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
}
