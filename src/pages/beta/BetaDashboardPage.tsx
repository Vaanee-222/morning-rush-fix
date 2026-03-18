import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Link } from 'react-router-dom';
import { Star, Camera, MessageSquare, Eye, Gift, ChevronRight, Utensils } from 'lucide-react';
import { getFoodImage } from '@/lib/images';

const pendingFeedback = [
  { id: '1', name: 'Quinoa Power Bowl', date: 'Mar 17, 2026', image: '9' },
  { id: '2', name: 'Turmeric Latte', date: 'Mar 16, 2026', image: '7' },
];

const recentActivity = [
  { type: 'feedback', text: 'Rated Sprouted Moong Chaat ⭐ 4.8', time: '2 days ago' },
  { type: 'photo', text: 'Photo approved for Acai Bowl', time: '3 days ago' },
  { type: 'vote', text: 'Voted on Matcha Tiramisu Bowl', time: '5 days ago' },
  { type: 'reward', text: 'Earned 50 Beta Points', time: '1 week ago' },
];

export default function BetaDashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="font-display text-3xl font-bold">Beta Eater Dashboard</h1>
            <Badge className="bg-persona-genz/10 text-persona-genz border-persona-genz/20">🎉 Active Member</Badge>
          </div>
          <p className="text-muted-foreground">Welcome back! You're shaping the future of 7AM Club.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Free Meals Left', value: '2 / 3', icon: Utensils, color: 'text-primary' },
            { label: 'Feedback Given', value: '12', icon: MessageSquare, color: 'text-secondary' },
            { label: 'Photos Shared', value: '8', icon: Camera, color: 'text-persona-genz' },
            { label: 'Beta Points', value: '350', icon: Gift, color: 'text-golden' },
          ].map(s => (
            <Card key={s.label} className="shadow-soft">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">{s.label}</span>
                  <s.icon className={`h-4 w-4 ${s.color}`} />
                </div>
                <p className="font-display text-2xl font-bold">{s.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Free Meal Claim */}
            <Card className="shadow-card border-primary/20 overflow-hidden">
              <div className="gradient-sunrise p-4">
                <h2 className="font-display text-lg font-bold text-primary-foreground">🍽️ Claim Your Free Meal</h2>
                <p className="text-primary-foreground/80 text-sm">2 free meals remaining this month</p>
              </div>
              <CardContent className="p-6">
                <Progress value={33} className="h-3 mb-4" />
                <p className="text-sm text-muted-foreground mb-4">1 of 3 meals claimed. Provide feedback to unlock next free meal.</p>
                <Link to="/menu"><Button variant="hero">Browse Menu & Claim</Button></Link>
              </CardContent>
            </Card>

            {/* Pending Feedback */}
            <Card className="shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display font-semibold">Pending Feedback</h3>
                  <Link to="/beta/feedback/history" className="text-sm text-primary">View all</Link>
                </div>
                {pendingFeedback.map(item => (
                  <div key={item.id} className="flex items-center gap-4 p-3 border border-border rounded-lg mb-2">
                    <img src={getFoodImage(item.image)} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.date}</p>
                    </div>
                    <Link to={`/beta/feedback/${item.id}`}>
                      <Button variant="outline" size="sm">Rate & Review</Button>
                    </Link>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Exclusive Previews */}
            <Card className="shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display font-semibold">🔮 Coming Soon — Vote Now!</h3>
                  <Link to="/beta/previews" className="text-sm text-primary">See all</Link>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { name: 'Matcha Tiramisu Bowl', votes: 42, desc: 'Japanese-Italian fusion breakfast' },
                    { name: 'Spicy Jackfruit Wrap', votes: 38, desc: 'Pulled jackfruit with sriracha mayo' },
                  ].map(preview => (
                    <div key={preview.name} className="p-4 border border-border rounded-lg">
                      <h4 className="font-display font-semibold text-sm">{preview.name}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{preview.desc}</p>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-xs text-muted-foreground">{preview.votes} votes</span>
                        <Link to="/beta/previews"><Button variant="outline" size="sm">Vote</Button></Link>
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
                <h3 className="font-display font-semibold mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {recentActivity.map((a, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className={`w-2 h-2 rounded-full mt-2 ${a.type === 'feedback' ? 'bg-primary' : a.type === 'photo' ? 'bg-persona-genz' : a.type === 'vote' ? 'bg-secondary' : 'bg-golden'}`} />
                      <div>
                        <p className="text-sm">{a.text}</p>
                        <p className="text-xs text-muted-foreground">{a.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardContent className="p-6">
                <h3 className="font-display font-semibold mb-3">Beta Rewards</h3>
                <div className="text-center mb-4">
                  <p className="font-display text-3xl font-bold text-primary">350</p>
                  <p className="text-xs text-muted-foreground">Beta Points</p>
                </div>
                <div className="space-y-2 mb-4">
                  {[
                    { tier: 'Taster', points: 100, unlocked: true },
                    { tier: 'Connoisseur', points: 300, unlocked: true },
                    { tier: 'Food Critic', points: 500, unlocked: false },
                    { tier: 'Legend', points: 1000, unlocked: false },
                  ].map(t => (
                    <div key={t.tier} className="flex items-center justify-between text-sm">
                      <span className={t.unlocked ? 'text-foreground font-medium' : 'text-muted-foreground'}>{t.tier}</span>
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-muted-foreground">{t.points}pts</span>
                        {t.unlocked && <Badge className="text-[10px] bg-secondary/10 text-secondary">✓</Badge>}
                      </div>
                    </div>
                  ))}
                </div>
                <Link to="/beta/rewards"><Button variant="outline" size="sm" className="w-full">View Rewards</Button></Link>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardContent className="p-6">
                <h3 className="font-display font-semibold mb-3">Quick Links</h3>
                <div className="space-y-1">
                  {[
                    { label: 'Submit Feedback', href: '/beta/feedback/new' },
                    { label: 'Feedback History', href: '/beta/feedback/history' },
                    { label: 'Exclusive Previews', href: '/beta/previews' },
                    { label: 'My Rewards', href: '/beta/rewards' },
                    { label: 'Application Status', href: '/beta/status' },
                  ].map(link => (
                    <Link key={link.label} to={link.href} className="flex items-center justify-between py-2 text-sm hover:text-primary transition-colors">
                      {link.label} <ChevronRight className="h-3 w-3" />
                    </Link>
                  ))}
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
