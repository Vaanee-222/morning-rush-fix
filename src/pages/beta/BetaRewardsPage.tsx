import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Gift, Star, Coffee, Utensils, Crown } from 'lucide-react';

const tiers = [
  { name: 'Taster', points: 100, icon: Coffee, perks: ['1 free meal/month', 'Basic badge'], unlocked: true },
  { name: 'Connoisseur', points: 300, icon: Utensils, perks: ['3 free meals/month', 'Silver badge', 'Early menu access'], unlocked: true },
  { name: 'Food Critic', points: 500, icon: Star, perks: ['5 free meals/month', 'Gold badge', 'Name a dish', 'Priority support'], unlocked: false },
  { name: 'Legend', points: 1000, icon: Crown, perks: ['Unlimited free meals', 'Platinum badge', 'Co-create menu items', 'VIP events'], unlocked: false },
];

const rewards = [
  { id: '1', name: 'Free Acai Bowl', points: 50, available: true },
  { id: '2', name: '₹100 Off Next Order', points: 75, available: true },
  { id: '3', name: 'Exclusive Merch Pack', points: 200, available: true },
  { id: '4', name: 'Free Month Subscription', points: 500, available: false },
];

export default function BetaRewardsPage() {
  const currentPoints = 350;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl font-bold mb-2">Beta Eater Rewards 🎁</h1>
          <p className="text-muted-foreground">Earn points by reviewing meals, sharing photos, and voting on new items.</p>
        </div>

        {/* Points Overview */}
        <Card className="shadow-elevated mb-8 overflow-hidden">
          <div className="gradient-sunrise p-6 text-center">
            <p className="text-primary-foreground/80 text-sm">Your Points</p>
            <p className="font-display text-5xl font-bold text-primary-foreground">{currentPoints}</p>
            <p className="text-primary-foreground/80 text-sm mt-1">Connoisseur Tier</p>
          </div>
          <CardContent className="p-6">
            <div className="flex items-center justify-between text-sm mb-2">
              <span>Next tier: Food Critic</span>
              <span className="text-muted-foreground">{currentPoints}/500 points</span>
            </div>
            <Progress value={(currentPoints / 500) * 100} className="h-3" />
          </CardContent>
        </Card>

        {/* Tiers */}
        <h2 className="font-display text-xl font-bold mb-4">Reward Tiers</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {tiers.map(tier => (
            <Card key={tier.name} className={`shadow-soft ${tier.unlocked ? 'border-secondary/30' : ''}`}>
              <CardContent className="p-5">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 ${tier.unlocked ? 'bg-secondary/10' : 'bg-muted'}`}>
                  <tier.icon className={`h-5 w-5 ${tier.unlocked ? 'text-secondary' : 'text-muted-foreground'}`} />
                </div>
                <h3 className="font-display font-semibold">{tier.name}</h3>
                <p className="text-xs text-muted-foreground mb-3">{tier.points} points</p>
                <ul className="space-y-1">
                  {tier.perks.map(p => (
                    <li key={p} className="text-xs text-muted-foreground">• {p}</li>
                  ))}
                </ul>
                {tier.unlocked && <Badge className="mt-3 bg-secondary/10 text-secondary text-xs">Unlocked ✓</Badge>}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Redeem */}
        <h2 className="font-display text-xl font-bold mb-4">Redeem Points</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {rewards.map(r => (
            <Card key={r.id} className="shadow-soft">
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <h3 className="font-display font-semibold text-sm">{r.name}</h3>
                  <p className="text-xs text-muted-foreground">{r.points} points</p>
                </div>
                <Button variant={currentPoints >= r.points ? 'hero' : 'outline'} size="sm" disabled={currentPoints < r.points}>
                  {currentPoints >= r.points ? 'Redeem' : 'Need more'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
