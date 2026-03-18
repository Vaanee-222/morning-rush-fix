import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check, Clock, FileText } from 'lucide-react';

export default function BetaStatusPage() {
  const status: string = 'approved'; // mock: pending | approved | rejected

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-12 max-w-2xl">
        <h1 className="font-display text-3xl font-bold mb-8 text-center">Application Status</h1>

        <Card className="shadow-elevated">
          <CardContent className="p-8 text-center">
            {status === 'approved' && (
              <>
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary/10 flex items-center justify-center">
                  <Check className="h-8 w-8 text-secondary" />
                </div>
                <Badge className="mb-3 bg-secondary/10 text-secondary">Approved</Badge>
                <h2 className="font-display text-2xl font-bold mb-2">Welcome to Beta Eaters! 🎉</h2>
                <p className="text-muted-foreground mb-6">You're now part of our exclusive food testing community.</p>
                <Button variant="hero" asChild><a href="/beta/dashboard">Go to Dashboard</a></Button>
              </>
            )}
            {status === 'pending' && (
              <>
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-golden/10 flex items-center justify-center animate-pulse-soft">
                  <Clock className="h-8 w-8 text-golden" />
                </div>
                <Badge className="mb-3 bg-golden/10 text-accent-foreground">Under Review</Badge>
                <h2 className="font-display text-2xl font-bold mb-2">Application Under Review</h2>
                <p className="text-muted-foreground mb-6">We'll get back to you within 7 days. Hang tight!</p>
              </>
            )}
            {status === 'rejected' && (
              <>
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-destructive/10 flex items-center justify-center">
                  <FileText className="h-8 w-8 text-destructive" />
                </div>
                <Badge className="mb-3 bg-destructive/10 text-destructive">Not Selected</Badge>
                <h2 className="font-display text-2xl font-bold mb-2">Not Selected This Time</h2>
                <p className="text-muted-foreground mb-6">Don't worry — you can reapply next month!</p>
                <Button variant="outline" asChild><a href="/beta/apply">Reapply</a></Button>
              </>
            )}
          </CardContent>
        </Card>

        {/* Timeline */}
        <div className="mt-8">
          <h3 className="font-display font-semibold mb-4">Application Timeline</h3>
          <div className="space-y-4">
            {[
              { step: 'Application Submitted', date: 'Mar 10, 2026', done: true },
              { step: 'Profile Reviewed', date: 'Mar 12, 2026', done: true },
              { step: 'Instagram Verified', date: 'Mar 13, 2026', done: true },
              { step: 'Approved & Onboarded', date: 'Mar 14, 2026', done: status === 'approved' },
            ].map((s, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${s.done ? 'bg-secondary text-secondary-foreground' : 'bg-muted text-muted-foreground'}`}>
                  {s.done ? <Check className="h-4 w-4" /> : <span className="text-xs">{i + 1}</span>}
                </div>
                <div>
                  <p className={`font-medium text-sm ${s.done ? '' : 'text-muted-foreground'}`}>{s.step}</p>
                  <p className="text-xs text-muted-foreground">{s.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
