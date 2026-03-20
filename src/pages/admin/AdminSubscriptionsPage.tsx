import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Eye, Edit, Plus, Package, Users, TrendingUp } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { toast } from 'sonner';

const subs = [
  { id: '1', name: 'Priya Mehra', plan: 'Regular Fix', meals: '12/20', pct: 60, status: 'active', nextBill: 'Apr 1', amount: '₹1,599', station: 'Rajiv Chowk', startDate: '2026-01-15' },
  { id: '2', name: 'Meera Reddy', plan: 'Munch Legend', meals: '22/30', pct: 73, status: 'active', nextBill: 'Apr 1', amount: '₹2,099', station: 'Kashmere Gate', startDate: '2026-01-20' },
  { id: '3', name: 'Ankit Sharma', plan: 'Sprout Saver', meals: '8/10', pct: 80, status: 'active', nextBill: 'Mar 28', amount: '₹899', station: 'Huda City Centre', startDate: '2026-02-01' },
  { id: '4', name: 'Sneha Dutta', plan: 'Regular Fix', meals: '20/20', pct: 100, status: 'paused', nextBill: '—', amount: '₹1,599', station: 'Hauz Khas', startDate: '2026-02-10' },
  { id: '5', name: 'Dev Patel', plan: 'Sprout Saver', meals: '3/10', pct: 30, status: 'cancelled', nextBill: '—', amount: '—', station: 'Noida Sec 18', startDate: '2026-03-01' },
];

const plans = [
  { id: 'p1', name: 'Sprout Saver', meals: 10, price: 899, description: 'Perfect starter pack', features: ['10 meals/month', 'Any station pickup', 'Meal swap 2x'] },
  { id: 'p2', name: 'Regular Fix', meals: 20, price: 1599, description: 'Most popular choice', features: ['20 meals/month', 'Priority pickup', 'Meal swap 5x', 'Free add-on 2x'] },
  { id: 'p3', name: 'Munch Legend', meals: 30, price: 2099, description: 'Daily breakfast hero', features: ['30 meals/month', 'VIP pickup', 'Unlimited swaps', 'Free add-ons', 'Priority support'] },
  { id: 'p4', name: 'Mega Freak', meals: 45, price: 2899, description: 'Family & teams', features: ['45 meals/month', 'Multi-person', 'VIP everything', 'Free merchandise'] },
];

const statusColors: Record<string, string> = {
  active: 'bg-secondary/10 text-secondary',
  paused: 'bg-golden/10 text-accent-foreground',
  cancelled: 'bg-destructive/10 text-destructive',
};

export default function AdminSubscriptionsPage() {
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState('subscribers');
  const [selectedSub, setSelectedSub] = useState<typeof subs[0] | null>(null);

  const filtered = subs.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.plan.toLowerCase().includes(search.toLowerCase()));

  return (
    <AdminLayout active="Subscriptions">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Subscriptions</h1>
          <p className="text-sm text-muted-foreground">Manage subscribers and plans</p>
        </div>
        <div className="flex gap-2">
          <Badge className="bg-secondary/10 text-secondary">Active: {subs.filter(s => s.status === 'active').length}</Badge>
          <Badge className="bg-golden/10 text-accent-foreground">Paused: {subs.filter(s => s.status === 'paused').length}</Badge>
          <Badge className="bg-destructive/10 text-destructive">Cancelled: {subs.filter(s => s.status === 'cancelled').length}</Badge>
        </div>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <Card className="shadow-soft"><CardContent className="p-5 flex items-center gap-3"><Users className="h-8 w-8 text-primary" /><div><p className="text-sm text-muted-foreground">MRR</p><p className="font-display text-2xl font-bold">₹2,45,000</p></div></CardContent></Card>
        <Card className="shadow-soft"><CardContent className="p-5 flex items-center gap-3"><Package className="h-8 w-8 text-secondary" /><div><p className="text-sm text-muted-foreground">Active Plans</p><p className="font-display text-2xl font-bold">{subs.filter(s => s.status === 'active').length}</p></div></CardContent></Card>
        <Card className="shadow-soft"><CardContent className="p-5 flex items-center gap-3"><TrendingUp className="h-8 w-8 text-golden" /><div><p className="text-sm text-muted-foreground">Avg Revenue/User</p><p className="font-display text-2xl font-bold">₹1,237</p></div></CardContent></Card>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="subscribers">Subscribers</TabsTrigger>
          <TabsTrigger value="plans">Plans (CRUD)</TabsTrigger>
        </TabsList>

        <TabsContent value="subscribers">
          <div className="flex gap-3 mb-4">
            <div className="relative flex-1">
              <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search subscriptions..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
          </div>

          <Card className="shadow-soft">
            <CardContent className="p-0">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left">
                    <th className="p-4 text-muted-foreground font-medium">Customer</th>
                    <th className="p-4 text-muted-foreground font-medium">Plan</th>
                    <th className="p-4 text-muted-foreground font-medium hidden md:table-cell">Usage</th>
                    <th className="p-4 text-muted-foreground font-medium">Status</th>
                    <th className="p-4 text-muted-foreground font-medium hidden sm:table-cell">Next Bill</th>
                    <th className="p-4 text-muted-foreground font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((s) => (
                    <tr key={s.id} className="border-b border-border/50 last:border-0 hover:bg-muted/30">
                      <td className="p-4 font-medium">{s.name}</td>
                      <td className="p-4">{s.plan}</td>
                      <td className="p-4 hidden md:table-cell">
                        <div className="flex items-center gap-2">
                          <Progress value={s.pct} className="h-2 w-20" />
                          <span className="text-xs text-muted-foreground">{s.meals}</span>
                        </div>
                      </td>
                      <td className="p-4"><Badge className={`text-xs ${statusColors[s.status]}`}>{s.status}</Badge></td>
                      <td className="p-4 hidden sm:table-cell text-muted-foreground">{s.nextBill}</td>
                      <td className="p-4">
                        <Button variant="ghost" size="sm" onClick={() => setSelectedSub(s)}><Eye className="h-3 w-3 mr-1" /> View</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="plans">
          <div className="flex justify-end mb-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="hero"><Plus className="h-4 w-4 mr-2" /> Create Plan</Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader><DialogTitle>Create Subscription Plan</DialogTitle></DialogHeader>
                <div className="space-y-4 mt-4">
                  <div><label className="text-sm font-medium mb-1 block">Plan Name</label><Input placeholder="e.g. Ultra Pack" /></div>
                  <div className="grid grid-cols-2 gap-3">
                    <div><label className="text-sm font-medium mb-1 block">Meals/Month</label><Input type="number" placeholder="20" /></div>
                    <div><label className="text-sm font-medium mb-1 block">Price (₹)</label><Input type="number" placeholder="1599" /></div>
                  </div>
                  <div><label className="text-sm font-medium mb-1 block">Description</label><Input placeholder="Short description" /></div>
                  <div><label className="text-sm font-medium mb-1 block">Features (comma separated)</label><Input placeholder="20 meals, Priority pickup, ..." /></div>
                  <Button variant="hero" className="w-full" onClick={() => toast.success('Plan created!')}>
                    <Plus className="h-4 w-4 mr-2" /> Create Plan
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {plans.map(plan => (
              <Card key={plan.id} className="shadow-soft hover:shadow-card transition-shadow">
                <CardContent className="p-5">
                  <h3 className="font-display font-bold text-lg">{plan.name}</h3>
                  <p className="text-xs text-muted-foreground mb-3">{plan.description}</p>
                  <p className="font-display text-2xl font-bold text-primary">₹{plan.price}<span className="text-xs text-muted-foreground font-normal">/mo</span></p>
                  <p className="text-sm text-muted-foreground mb-3">{plan.meals} meals/month</p>
                  <ul className="space-y-1 mb-4">
                    {plan.features.map(f => <li key={f} className="text-xs text-muted-foreground">✓ {f}</li>)}
                  </ul>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1" onClick={() => toast.success(`Editing ${plan.name}`)}><Edit className="h-3 w-3 mr-1" /> Edit</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Subscriber Detail */}
      <Dialog open={!!selectedSub} onOpenChange={() => setSelectedSub(null)}>
        <DialogContent className="max-w-md">
          {selectedSub && (
            <>
              <DialogHeader><DialogTitle>{selectedSub.name}'s Subscription</DialogTitle></DialogHeader>
              <div className="space-y-3 mt-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Plan</span><span className="font-medium">{selectedSub.plan}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Status</span><Badge className={`text-xs ${statusColors[selectedSub.status]}`}>{selectedSub.status}</Badge></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Meals Used</span><span>{selectedSub.meals}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Amount</span><span className="font-medium">{selectedSub.amount}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Station</span><span>{selectedSub.station}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Start Date</span><span>{selectedSub.startDate}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Next Billing</span><span>{selectedSub.nextBill}</span></div>
                <Progress value={selectedSub.pct} className="h-2" />
                <div className="flex gap-2 pt-2">
                  {selectedSub.status === 'active' && <Button variant="outline" size="sm" className="flex-1" onClick={() => { toast.success('Subscription paused'); setSelectedSub(null); }}>Pause</Button>}
                  {selectedSub.status === 'paused' && <Button variant="hero" size="sm" className="flex-1" onClick={() => { toast.success('Subscription resumed'); setSelectedSub(null); }}>Resume</Button>}
                  {selectedSub.status !== 'cancelled' && <Button variant="outline" size="sm" className="flex-1 text-destructive" onClick={() => { toast.success('Subscription cancelled'); setSelectedSub(null); }}>Cancel</Button>}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
