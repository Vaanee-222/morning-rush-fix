import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { subscriptionPlans } from '@/data/mockData';
import { Check, Pause, ArrowUp, Calendar, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SubscriptionsPage() {
  const activePlan = subscriptionPlans[1]; // Regular Fix

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-8 max-w-4xl">
        <h1 className="font-display text-3xl font-bold mb-6">My Subscription</h1>

        {/* Active Subscription */}
        <Card className="shadow-elevated border-primary/20 mb-8">
          <div className="gradient-sunrise p-5">
            <div className="flex items-center justify-between">
              <div>
                <Badge className="bg-card/20 text-primary-foreground border-0 mb-2">Active</Badge>
                <h2 className="font-display text-2xl font-bold text-primary-foreground">{activePlan.name}</h2>
                <p className="text-primary-foreground/80 text-sm">{activePlan.meals} meals/month</p>
              </div>
              <div className="text-right text-primary-foreground">
                <p className="font-display text-3xl font-bold">₹{activePlan.price}</p>
                <p className="text-sm opacity-80">/month</p>
              </div>
            </div>
          </div>
          <CardContent className="p-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Meals Used</p>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="font-display text-3xl font-bold">12</span>
                  <span className="text-muted-foreground">/ {activePlan.meals}</span>
                </div>
                <Progress value={60} className="h-3 mb-1" />
                <p className="text-xs text-muted-foreground">8 meals remaining</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Billing</p>
                <p className="font-medium">Next: April 1, 2026</p>
                <p className="text-sm text-muted-foreground mt-1">Auto-renew via UPI</p>
                <Button variant="link" className="p-0 h-auto text-sm mt-1">
                  <CreditCard className="h-3 w-3 mr-1" /> Update payment
                </Button>
              </div>
            </div>

            <Separator className="my-6" />

            <div className="flex flex-wrap gap-3">
              <Link to="/subscription/schedule"><Button variant="outline"><Calendar className="h-4 w-4 mr-2" /> Schedule Meals</Button></Link>
              <Button variant="outline"><Pause className="h-4 w-4 mr-2" /> Pause Plan</Button>
              <Link to="/pricing"><Button variant="outline"><ArrowUp className="h-4 w-4 mr-2" /> Upgrade</Button></Link>
            </div>
          </CardContent>
        </Card>

        {/* Plan Features */}
        <Card className="shadow-soft">
          <CardContent className="p-6">
            <h3 className="font-display text-lg font-semibold mb-4">Your Plan Includes</h3>
            <div className="grid sm:grid-cols-2 gap-2">
              {activePlan.features.map((f) => (
                <div key={f} className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-secondary shrink-0" />
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
}
