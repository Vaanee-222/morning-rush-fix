import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check, ArrowRight, Crown, Zap, Star, Coffee } from 'lucide-react';

const membershipTiers = [
  {
    id: 'sprout', name: 'Sprout Saver', meals: 10, price: 899, perMeal: 90, savings: 10,
    icon: '🌱', color: 'border-secondary/30',
    features: ['10 meals/month', 'Choose any item', 'Flexible scheduling', 'Pause anytime', 'WhatsApp updates'],
    membership: [],
  },
  {
    id: 'regular', name: 'Regular Fix', meals: 20, price: 1599, perMeal: 80, savings: 20, popular: true,
    icon: '💪', color: 'border-primary shadow-glow',
    features: ['20 meals/month', 'Choose any item', 'Priority pickup', 'Pause anytime', 'WhatsApp updates', 'Exclusive items access'],
    membership: ['Free Probiotic Lassi daily'],
  },
  {
    id: 'legend', name: 'Munch Legend', meals: 30, price: 2099, perMeal: 70, savings: 30,
    icon: '🏆', color: 'border-golden/30',
    features: ['30 meals/month', 'Choose any item', 'VIP pickup lane', 'Pause anytime', 'Exclusive items', 'Beta Eater priority', 'Free referral rewards'],
    membership: ['Free Probiotic Lassi daily', 'Daily Sprouted Moong add-on'],
  },
  {
    id: 'freak', name: 'Breakfast Freak', meals: 30, price: 2799, perMeal: 93, savings: 25,
    icon: '🔥', color: 'border-persona-genz/30',
    features: ['30 meals/month', 'Premium items only', 'VIP pickup lane', 'Pause anytime', 'Exclusive items', 'Beta Eater priority', 'Concierge support'],
    membership: ['Free drink with every meal', 'Daily protein shake', 'Weekly acai bowl free'],
  },
  {
    id: 'crazy', name: 'Crazy People Club', meals: 30, price: 3999, perMeal: 133, savings: 15,
    icon: '🤯', color: 'border-persona-indulge/30',
    features: ['Unlimited meals/month', 'All items including premium', 'Skip-the-line always', 'Personal menu curation', 'Co-create new items', 'VIP events access', '24/7 concierge'],
    membership: ['Free drink every order', 'Daily pancakes or smoothie bowl', 'Weekly meal box delivery', 'Monthly tasting events', 'Exclusive merch pack'],
  },
];

export default function MembershipPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-12">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-golden/10 text-accent-foreground"><Crown className="h-3 w-3 mr-1" /> Membership</Badge>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Choose Your Membership</h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Subscribe and unlock exclusive perks. Free drinks, daily add-ons, VIP access, and more.
          </p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {membershipTiers.map(tier => (
            <Card key={tier.id} className={`shadow-card flex flex-col ${tier.color} ${tier.popular ? 'scale-[1.02]' : ''}`}>
              <CardContent className="p-6 flex flex-col flex-1">
                {tier.popular && <Badge className="self-start mb-3 bg-primary text-primary-foreground">Most Popular</Badge>}
                <div className="text-3xl mb-2">{tier.icon}</div>
                <h3 className="font-display text-xl font-bold">{tier.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{tier.meals} meals/month</p>

                <div className="mb-4">
                  <span className="font-display text-3xl font-bold">₹{tier.price}</span>
                  <span className="text-muted-foreground">/month</span>
                  <p className="text-sm text-secondary font-medium mt-1">₹{tier.perMeal}/meal · Save {tier.savings}%</p>
                </div>

                {/* Membership Perks */}
                {tier.membership.length > 0 && (
                  <div className="mb-4 p-3 rounded-lg bg-golden/5 border border-golden/20">
                    <p className="text-xs font-semibold text-accent-foreground mb-2 flex items-center gap-1"><Coffee className="h-3 w-3" /> Membership Perks</p>
                    {tier.membership.map(m => (
                      <p key={m} className="text-xs text-muted-foreground flex items-center gap-1">
                        <Star className="h-3 w-3 text-golden shrink-0" /> {m}
                      </p>
                    ))}
                  </div>
                )}

                <ul className="space-y-2 mb-6 flex-1">
                  {tier.features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-secondary mt-0.5 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <Button variant={tier.popular ? 'hero' : 'outline'} className="w-full">
                  Choose {tier.name} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Customize */}
        <div className="mt-12 text-center">
          <div className="inline-block rounded-2xl gradient-warm p-8 md:p-12 max-w-2xl">
            <h3 className="font-display text-2xl font-bold text-primary-foreground mb-3">Customize Your Plan</h3>
            <p className="text-primary-foreground/80 mb-4">
              Pick your meals, choose your station, set your schedule. Total flexibility.
            </p>
            <Button size="lg" className="bg-card text-foreground hover:bg-card/90 font-semibold" asChild>
              <a href="/subscription/schedule">Build Your Plan <ArrowRight className="ml-2 h-4 w-4" /></a>
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
