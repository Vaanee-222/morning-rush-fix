import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Crown, Eye } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import AdminLayout from '@/components/admin/AdminLayout';

const memberships = [
  { id: '1', customer: 'Priya Mehra', email: 'priya@email.com', tier: 'Gold', since: 'Jan 2026', status: 'active', nextBill: 'Apr 1', station: 'Rajiv Chowk', totalSpent: '₹2,793' },
  { id: '2', customer: 'Meera Reddy', email: 'meera@email.com', tier: 'Platinum', since: 'Feb 2026', status: 'active', nextBill: 'Apr 1', station: 'Kashmere Gate', totalSpent: '₹4,893' },
  { id: '3', customer: 'Rahul Kumar', email: 'rahul@email.com', tier: 'Silver', since: 'Mar 2026', status: 'active', nextBill: 'Apr 15', station: 'Rajiv Chowk', totalSpent: '₹597' },
  { id: '4', customer: 'Sneha Dutta', email: 'sneha@email.com', tier: 'Gold', since: 'Feb 2026', status: 'paused', nextBill: '—', station: 'Hauz Khas', totalSpent: '₹1,596' },
  { id: '5', customer: 'Ankit Sharma', email: 'ankit@email.com', tier: 'Silver', since: 'Mar 2026', status: 'active', nextBill: 'Apr 10', station: 'Huda City Centre', totalSpent: '₹398' },
  { id: '6', customer: 'Kavita Lal', email: 'kavita@email.com', tier: 'Platinum', since: 'Jan 2026', status: 'active', nextBill: 'Apr 1', station: 'Rajiv Chowk', totalSpent: '₹6,293' },
];

const tierColors: Record<string, string> = {
  Silver: 'bg-muted text-foreground',
  Gold: 'bg-golden/10 text-accent-foreground',
  Platinum: 'bg-primary/10 text-primary',
};

const statusColors: Record<string, string> = {
  active: 'bg-secondary/10 text-secondary',
  paused: 'bg-golden/10 text-accent-foreground',
};

export default function AdminMembershipsPage() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<typeof memberships[0] | null>(null);

  const filtered = memberships.filter(m => m.customer.toLowerCase().includes(search.toLowerCase()) || m.tier.toLowerCase().includes(search.toLowerCase()));

  return (
    <AdminLayout active="Memberships">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold">Active Memberships</h1>
        <p className="text-sm text-muted-foreground">{memberships.filter(m => m.status === 'active').length} active members across all tiers</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        {['Silver', 'Gold', 'Platinum'].map(tier => (
          <Card key={tier} className="shadow-soft">
            <CardContent className="p-5 text-center">
              <Crown className="h-6 w-6 mx-auto text-golden mb-2" />
              <p className="font-display text-2xl font-bold">{memberships.filter(m => m.tier === tier && m.status === 'active').length}</p>
              <p className="text-sm text-muted-foreground">{tier} Members</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search members..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>

      <Card className="shadow-soft">
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="p-4 text-muted-foreground font-medium">Customer</th>
                <th className="p-4 text-muted-foreground font-medium">Tier</th>
                <th className="p-4 text-muted-foreground font-medium hidden md:table-cell">Since</th>
                <th className="p-4 text-muted-foreground font-medium">Status</th>
                <th className="p-4 text-muted-foreground font-medium hidden sm:table-cell">Total Spent</th>
                <th className="p-4 text-muted-foreground font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(m => (
                <tr key={m.id} className="border-b border-border/50 last:border-0 hover:bg-muted/30">
                  <td className="p-4">
                    <p className="font-medium">{m.customer}</p>
                    <p className="text-xs text-muted-foreground">{m.email}</p>
                  </td>
                  <td className="p-4"><Badge className={`text-xs ${tierColors[m.tier]}`}><Crown className="h-3 w-3 mr-1" /> {m.tier}</Badge></td>
                  <td className="p-4 hidden md:table-cell text-muted-foreground">{m.since}</td>
                  <td className="p-4"><Badge className={`text-xs ${statusColors[m.status]}`}>{m.status}</Badge></td>
                  <td className="p-4 hidden sm:table-cell font-medium">{m.totalSpent}</td>
                  <td className="p-4"><Button variant="ghost" size="sm" onClick={() => setSelected(m)}><Eye className="h-3 w-3 mr-1" /> View</Button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-md">
          {selected && (
            <>
              <DialogHeader><DialogTitle>{selected.customer}</DialogTitle></DialogHeader>
              <div className="space-y-3 mt-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Tier</span><Badge className={`text-xs ${tierColors[selected.tier]}`}><Crown className="h-3 w-3 mr-1" /> {selected.tier}</Badge></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Status</span><Badge className={`text-xs ${statusColors[selected.status]}`}>{selected.status}</Badge></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Member Since</span><span>{selected.since}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Station</span><span>{selected.station}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Next Billing</span><span>{selected.nextBill}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Total Spent</span><span className="font-bold">{selected.totalSpent}</span></div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
