import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Pause, Calendar, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const pauseOptions = [
  { label: '1 Week', days: 7, desc: 'Take a short break' },
  { label: '2 Weeks', days: 14, desc: 'Going on vacation' },
  { label: '1 Month', days: 30, desc: 'Extended pause' },
];

export default function PauseSubscriptionPage() {
  const [selected, setSelected] = useState<number | null>(null);
  const { toast } = useToast();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-8 max-w-xl">
        <Link to="/subscriptions" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 mb-6">
          <ArrowLeft className="h-3 w-3" /> Back to Subscription
        </Link>

        <div className="text-center mb-8">
          <Pause className="h-12 w-12 text-golden mx-auto mb-3" />
          <h1 className="font-display text-3xl font-bold">Pause Your Plan</h1>
          <p className="text-muted-foreground mt-2">Your remaining meals will be preserved and waiting when you return.</p>
        </div>

        <div className="space-y-3 mb-8">
          {pauseOptions.map((opt) => (
            <Card
              key={opt.days}
              className={`cursor-pointer transition-all ${selected === opt.days ? 'ring-2 ring-primary shadow-card' : 'shadow-soft hover:shadow-card'}`}
              onClick={() => setSelected(opt.days)}
            >
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <p className="font-display font-semibold">{opt.label}</p>
                  <p className="text-sm text-muted-foreground">{opt.desc}</p>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selected === opt.days ? 'border-primary bg-primary' : 'border-muted-foreground'}`}>
                  {selected === opt.days && <div className="w-2 h-2 rounded-full bg-primary-foreground" />}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-muted/50 rounded-lg p-4 mb-6 text-sm text-muted-foreground">
          <p className="font-medium text-foreground mb-1">What happens when you pause:</p>
          <ul className="space-y-1 list-disc list-inside">
            <li>Your 8 remaining meals are preserved</li>
            <li>No charges during the pause period</li>
            <li>Plan automatically resumes after the pause</li>
            <li>You can unpause anytime from your dashboard</li>
          </ul>
        </div>

        <Button
          variant="hero"
          className="w-full"
          disabled={!selected}
          onClick={() => toast({ title: 'Plan Paused', description: `Your subscription is paused for ${selected} days.` })}
        >
          <Calendar className="h-4 w-4 mr-2" /> Pause for {selected ? pauseOptions.find(o => o.days === selected)?.label : '...'}
        </Button>
      </div>
      <Footer />
    </div>
  );
}
