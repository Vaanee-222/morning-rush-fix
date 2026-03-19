import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, Gift, MessageCircle, Share2, Trophy, Users, ArrowRight, Check, Instagram, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

const referralHistory = [
  { name: 'Ankit S.', status: 'subscribed', reward: '₹50', date: 'Mar 12', avatar: '🟢' },
  { name: 'Meera R.', status: 'subscribed', reward: '₹50', date: 'Mar 8', avatar: '🟢' },
  { name: 'Rahul K.', status: 'signed_up', reward: 'Pending', date: 'Mar 5', avatar: '🟡' },
  { name: 'Sneha D.', status: 'invited', reward: '—', date: 'Mar 2', avatar: '⚪' },
  { name: 'Vikram P.', status: 'subscribed', reward: '₹50', date: 'Feb 28', avatar: '🟢' },
  { name: 'Divya M.', status: 'signed_up', reward: 'Pending', date: 'Feb 25', avatar: '🟡' },
  { name: 'Arjun T.', status: 'invited', reward: '—', date: 'Feb 20', avatar: '⚪' },
];

const statusColors: Record<string, string> = {
  subscribed: 'bg-secondary/10 text-secondary',
  signed_up: 'bg-golden/10 text-accent-foreground',
  invited: 'bg-muted text-muted-foreground',
};

export default function ReferralsPage() {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const referralCode = 'PRIYA7AM';
  const referralLink = `https://7amclub.in/join?ref=${referralCode}`;

  const copyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast({ title: 'Copied!', description: `${label} copied to clipboard.` });
    setTimeout(() => setCopied(false), 2000);
  };

  const shareWhatsApp = () => {
    window.open(`https://wa.me/?text=Join%207AM%20Club%20with%20my%20code%20${referralCode}%20and%20get%20₹50%20off!%20${encodeURIComponent(referralLink)}`, '_blank');
  };

  const shareNative = async () => {
    if (navigator.share) {
      await navigator.share({ title: '7AM Club Referral', text: `Join 7AM Club with my code ${referralCode} and get ₹50 off your first subscription!`, url: referralLink });
    } else {
      copyText(referralLink, 'Referral link');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-8 max-w-4xl">
        <div className="flex items-center gap-3 mb-6">
          <h1 className="font-display text-3xl font-bold">Refer & Earn</h1>
          <Badge className="bg-golden/10 text-accent-foreground">🎁 ₹50 per referral</Badge>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Hero referral card */}
            <Card className="shadow-elevated border-primary/20 overflow-hidden">
              <div className="gradient-sunrise p-6">
                <h2 className="font-display text-2xl font-bold text-primary-foreground">Share your love for 7AM Club ☀️</h2>
                <p className="text-primary-foreground/80 mt-1">When your friend subscribes, you both get ₹50 credit!</p>
              </div>
              <CardContent className="p-6">
                {/* Code + Link tabs */}
                <Tabs defaultValue="code" className="mb-4">
                  <TabsList className="w-full">
                    <TabsTrigger value="code" className="flex-1">Referral Code</TabsTrigger>
                    <TabsTrigger value="link" className="flex-1">Share Link</TabsTrigger>
                  </TabsList>
                  <TabsContent value="code">
                    <div className="flex gap-2 mt-3">
                      <Input value={referralCode} readOnly className="font-display font-bold text-xl text-center tracking-[0.3em] bg-muted/50" />
                      <Button variant={copied ? 'default' : 'outline'} onClick={() => copyText(referralCode, 'Referral code')} className="min-w-[100px]">
                        {copied ? <><Check className="h-4 w-4 mr-1" /> Copied</> : <><Copy className="h-4 w-4 mr-1" /> Copy</>}
                      </Button>
                    </div>
                  </TabsContent>
                  <TabsContent value="link">
                    <div className="flex gap-2 mt-3">
                      <Input value={referralLink} readOnly className="text-sm bg-muted/50" />
                      <Button variant="outline" onClick={() => copyText(referralLink, 'Referral link')}>
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <Button variant="fresh" onClick={shareWhatsApp} className="w-full"><MessageCircle className="h-4 w-4 mr-1" /> WhatsApp</Button>
                  <Button variant="outline" onClick={shareNative} className="w-full"><Share2 className="h-4 w-4 mr-1" /> Share</Button>
                  <Button variant="outline" className="w-full"><Instagram className="h-4 w-4 mr-1" /> Story</Button>
                  <Button variant="outline" onClick={() => copyText(referralLink, 'Link')} className="w-full"><ExternalLink className="h-4 w-4 mr-1" /> Link</Button>
                </div>
              </CardContent>
            </Card>

            {/* Referral History */}
            <Card className="shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display font-semibold">Referral History</h3>
                  <Badge variant="outline">{referralHistory.length} invites</Badge>
                </div>
                <div className="space-y-1">
                  {referralHistory.map((ref, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-center justify-between py-3 px-3 rounded-lg hover:bg-muted/50 transition-colors border-b border-border last:border-0"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-sm font-bold">{ref.name[0]}</div>
                        <div>
                          <p className="text-sm font-medium">{ref.name}</p>
                          <p className="text-xs text-muted-foreground">{ref.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={`text-xs ${statusColors[ref.status]}`}>{ref.status.replace('_', ' ')}</Badge>
                        <span className="text-sm font-semibold min-w-[50px] text-right">{ref.reward}</span>
                      </div>
                    </motion.div>
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
                  <div className="text-center p-4 rounded-xl gradient-sunrise">
                    <p className="font-display text-4xl font-bold text-primary-foreground">7</p>
                    <p className="text-sm text-primary-foreground/80">Friends Invited</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="font-display text-2xl font-bold text-secondary">3</p>
                      <p className="text-[10px] text-muted-foreground">Subscribed</p>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="font-display text-2xl font-bold">₹150</p>
                      <p className="text-[10px] text-muted-foreground">Earned</p>
                    </div>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg text-center">
                    <p className="font-display text-2xl font-bold text-primary">2</p>
                    <p className="text-[10px] text-muted-foreground">Pending Signups</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardContent className="p-6">
                <h3 className="font-display font-semibold mb-3 flex items-center gap-2"><Trophy className="h-4 w-4 text-golden" /> Reward Tiers</h3>
                <div className="space-y-4">
                  {[
                    { tier: 'Bronze', refs: 3, reward: '₹150 credit', done: true, emoji: '🥉' },
                    { tier: 'Silver', refs: 10, reward: '₹600 + Free meal', done: false, emoji: '🥈' },
                    { tier: 'Gold', refs: 25, reward: '₹2000 + 1 month free', done: false, emoji: '🥇' },
                    { tier: 'Diamond', refs: 50, reward: '₹5000 + Lifetime perks', done: false, emoji: '💎' },
                  ].map((t) => (
                    <div key={t.tier} className={`flex items-center justify-between text-sm p-2 rounded-lg ${t.done ? 'bg-secondary/5' : ''}`}>
                      <div className="flex items-center gap-2">
                        <span>{t.emoji}</span>
                        <div>
                          <p className={`font-medium ${t.done ? 'text-secondary' : ''}`}>{t.tier}</p>
                          <p className="text-xs text-muted-foreground">{t.refs} refs → {t.reward}</p>
                        </div>
                      </div>
                      {t.done && <Check className="h-4 w-4 text-secondary" />}
                    </div>
                  ))}
                  <div className="mt-3">
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                      <span>Progress to Silver</span>
                      <span>3/10</span>
                    </div>
                    <Progress value={30} className="h-2.5" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-soft border-primary/20">
              <CardContent className="p-6 text-center">
                <Gift className="h-8 w-8 text-primary mx-auto mb-2" />
                <h3 className="font-display font-semibold mb-1">Invite More Friends</h3>
                <p className="text-xs text-muted-foreground mb-3">Every subscription = ₹50 for both of you</p>
                <Button variant="hero" className="w-full" onClick={shareWhatsApp}>
                  <MessageCircle className="h-4 w-4 mr-2" /> Share on WhatsApp
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
