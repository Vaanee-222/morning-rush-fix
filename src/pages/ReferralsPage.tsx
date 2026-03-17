import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Copy, Gift, MessageCircle, Share2, Trophy, Users, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const referralHistory = [
  { name: 'Ankit S.', status: 'subscribed', reward: '₹50', date: 'Mar 12' },
  { name: 'Meera R.', status: 'subscribed', reward: '₹50', date: 'Mar 8' },
  { name: 'Rahul K.', status: 'signed_up', reward: 'Pending', date: 'Mar 5' },
  { name: 'Sneha D.', status: 'invited', reward: '—', date: 'Mar 2' },
  { name: 'Vikram P.', status: 'subscribed', reward: '₹50', date: 'Feb 28' },
];

const statusColors: Record<string, string> = {
  subscribed: 'bg-secondary/10 text-secondary',
  signed_up: 'bg-golden/10 text-accent-foreground',
  invited: 'bg-muted text-muted-foreground',
};

export default function ReferralsPage() {
  const { toast } = useToast();

  const copyCode = () => {
    navigator.clipboard.writeText('PRIYA7AM');
    toast({ title: 'Copied!', description: 'Referral code copied to clipboard.' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-8 max-w-4xl">
        <h1 className="font-display text-3xl font-bold mb-6">Refer & Earn 🎁</h1>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Referral Code */}
            <Card className="shadow-elevated border-primary/20">
              <div className="gradient-sunrise p-5">
                <h2 className="font-display text-xl font-bold text-primary-foreground">Share your love for 7AM Club</h2>
                <p className="text-primary-foreground/80 text-sm">When your friend subscribes, you both get ₹50 credit!</p>
              </div>
              <CardContent className="p-6">
                <div className="flex gap-2 mb-4">
                  <Input value="PRIYA7AM" readOnly className="font-display font-bold text-lg text-center tracking-wider" />
                  <Button variant="outline" onClick={copyCode}><Copy className="h-4 w-4" /></Button>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <Button variant="fresh" className="w-full"><MessageCircle className="h-4 w-4 mr-2" /> WhatsApp</Button>
                  <Button variant="outline" className="w-full"><Share2 className="h-4 w-4 mr-2" /> Share</Button>
                  <Button variant="outline" className="w-full"><Copy className="h-4 w-4 mr-2" /> Copy Link</Button>
                </div>
              </CardContent>
            </Card>

            {/* Referral History */}
            <Card className="shadow-soft">
              <CardContent className="p-6">
                <h3 className="font-display font-semibold mb-4">Referral History</h3>
                <div className="space-y-3">
                  {referralHistory.map((ref, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold">{ref.name[0]}</div>
                        <div>
                          <p className="text-sm font-medium">{ref.name}</p>
                          <p className="text-xs text-muted-foreground">{ref.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={`text-xs ${statusColors[ref.status]}`}>{ref.status.replace('_', ' ')}</Badge>
                        <span className="text-sm font-semibold">{ref.reward}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="shadow-soft">
              <CardContent className="p-6">
                <h3 className="font-display font-semibold mb-4">Your Stats</h3>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <p className="font-display text-3xl font-bold text-primary">5</p>
                    <p className="text-xs text-muted-foreground">Friends Invited</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="font-display text-xl font-bold">3</p>
                      <p className="text-[10px] text-muted-foreground">Subscribed</p>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="font-display text-xl font-bold text-secondary">₹150</p>
                      <p className="text-[10px] text-muted-foreground">Earned</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardContent className="p-6">
                <h3 className="font-display font-semibold mb-3 flex items-center gap-2"><Trophy className="h-4 w-4 text-golden" /> Reward Tiers</h3>
                <div className="space-y-3">
                  {[
                    { tier: 'Bronze', refs: 3, reward: '₹150', done: true },
                    { tier: 'Silver', refs: 10, reward: '₹600 + Free meal', done: false },
                    { tier: 'Gold', refs: 25, reward: '₹2000 + 1 month free', done: false },
                  ].map((t) => (
                    <div key={t.tier} className="flex items-center justify-between text-sm">
                      <div>
                        <p className={`font-medium ${t.done ? 'text-secondary' : ''}`}>{t.tier}</p>
                        <p className="text-xs text-muted-foreground">{t.refs} referrals → {t.reward}</p>
                      </div>
                      {t.done && <Badge className="bg-secondary/10 text-secondary text-xs">✓ Done</Badge>}
                    </div>
                  ))}
                  <Progress value={30} className="h-2" />
                  <p className="text-xs text-muted-foreground">3/10 referrals to Silver</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
