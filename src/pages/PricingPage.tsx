import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { subscriptionPlans } from '@/data/mockData';
import { Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-16">
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Simple, honest pricing</h1>
          <p className="text-muted-foreground text-lg max-w-lg mx-auto">
            Subscribe and save. No hidden fees, pause or cancel anytime.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {subscriptionPlans.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-2xl border p-8 flex flex-col transition-all duration-300 hover:-translate-y-1 ${
                plan.isPopular
                  ? 'border-primary shadow-glow bg-card scale-[1.03]'
                  : 'border-border shadow-card bg-card'
              }`}
            >
              {plan.isPopular && (
                <Badge className="self-start mb-4 bg-primary text-primary-foreground">Most Popular</Badge>
              )}
              <h3 className="font-display text-2xl font-bold">{plan.name}</h3>
              <p className="text-muted-foreground text-sm mt-1">{plan.meals} meals per month</p>
              <div className="mt-6 mb-2">
                <span className="font-display text-4xl font-bold">₹{plan.price}</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <p className="text-sm text-secondary font-medium mb-6">
                ₹{plan.perMealCost.toFixed(0)}/meal · Save {plan.savings}%
              </p>
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 text-secondary mt-0.5 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Button variant={plan.isPopular ? 'hero' : 'outline'} size="lg" className="w-full">
                Choose {plan.name} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        {/* Trial */}
        <div className="mt-16 text-center">
          <div className="inline-block rounded-2xl gradient-warm p-8 md:p-12 max-w-2xl">
            <h3 className="font-display text-2xl font-bold text-primary-foreground mb-3">Try the 3-Day Fix — Free</h3>
            <p className="text-primary-foreground/80 mb-6">
              Not sure yet? Try 3 breakfasts on us. No commitment, no card required.
            </p>
            <Button size="lg" className="bg-card text-foreground hover:bg-card/90 font-semibold">
              Start Free Trial
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
