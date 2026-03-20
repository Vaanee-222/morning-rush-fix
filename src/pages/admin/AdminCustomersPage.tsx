import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Eye, Ban, Flag, Mail, ShoppingCart, Calendar, MapPin, AlertTriangle } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { toast } from 'sonner';

interface Customer {
  id: string; name: string; phone: string; email: string; persona: string; plan: string; orders: number; since: string; station: string; totalSpent: string; status: 'active' | 'flagged' | 'banned';
  orderHistory: { id: string; date: string; items: string; total: number; status: string }[];
}

const customers: Customer[] = [
  { id: '1', name: 'Priya Mehra', phone: '+91 98xxx xxxxx', email: 'priya@email.com', persona: 'Millennial', plan: 'Regular Fix', orders: 23, since: 'Jan 2026', station: 'Rajiv Chowk', totalSpent: '₹4,560', status: 'active',
    orderHistory: [{ id: '7AM-00295', date: '2026-03-17', items: 'Acai Bowl, Lassi', total: 218, status: 'picked_up' }, { id: '7AM-00280', date: '2026-03-15', items: 'Overnight Oats', total: 109, status: 'picked_up' }, { id: '7AM-00265', date: '2026-03-13', items: 'Quinoa Bowl, Coffee', total: 268, status: 'picked_up' }] },
  { id: '2', name: 'Ankit Sharma', phone: '+91 97xxx xxxxx', email: 'ankit@email.com', persona: 'Boomer', plan: 'Sprout Saver', orders: 15, since: 'Feb 2026', station: 'Huda City Centre', totalSpent: '₹2,340', status: 'active',
    orderHistory: [{ id: '7AM-00298', date: '2026-03-17', items: 'Moong Chaat, Lassi', total: 158, status: 'ready' }] },
  { id: '3', name: 'Meera Reddy', phone: '+91 96xxx xxxxx', email: 'meera@email.com', persona: 'Gen Z', plan: 'Munch Legend', orders: 31, since: 'Jan 2026', station: 'Kashmere Gate', totalSpent: '₹6,890', status: 'flagged',
    orderHistory: [{ id: '7AM-00297', date: '2026-03-17', items: 'Overnight Oats', total: 109, status: 'preparing' }] },
  { id: '4', name: 'Rahul Kumar', phone: '+91 95xxx xxxxx', email: 'rahul@email.com', persona: 'Millennial', plan: 'None', orders: 5, since: 'Mar 2026', station: 'Rajiv Chowk', totalSpent: '₹890', status: 'active',
    orderHistory: [{ id: '7AM-00296', date: '2026-03-17', items: 'Paneer Wrap, Chai x2', total: 227, status: 'confirmed' }] },
  { id: '5', name: 'Sneha Dutta', phone: '+91 94xxx xxxxx', email: 'sneha@email.com', persona: 'Gen Z', plan: 'Regular Fix', orders: 18, since: 'Feb 2026', station: 'Hauz Khas', totalSpent: '₹3,456', status: 'banned',
    orderHistory: [] },
];

const personaColors: Record<string, string> = {
  Boomer: 'bg-persona-boomer/10 text-persona-boomer',
  Millennial: 'bg-persona-millennial/10 text-persona-millennial',
  'Gen Z': 'bg-persona-genz/10 text-persona-genz',
};

const statusBadge: Record<string, string> = {
  active: 'bg-secondary/10 text-secondary',
  flagged: 'bg-golden/10 text-accent-foreground',
  banned: 'bg-destructive/10 text-destructive',
};

export default function AdminCustomersPage() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Customer | null>(null);
  const [filterStatus, setFilterStatus] = useState('all');

  const filtered = customers
    .filter(c => filterStatus === 'all' || c.status === filterStatus)
    .filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase()));

  return (
    <AdminLayout active="Customers">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Customers</h1>
          <p className="text-sm text-muted-foreground">{customers.length} registered users</p>
        </div>
        <Button variant="outline">Export CSV</Button>
      </div>

      <div className="flex gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search customers..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <Tabs value={filterStatus} onValueChange={setFilterStatus}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="flagged">Flagged</TabsTrigger>
            <TabsTrigger value="banned">Banned</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <Card className="shadow-soft">
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="p-4 text-muted-foreground font-medium">Customer</th>
                <th className="p-4 text-muted-foreground font-medium hidden md:table-cell">Persona</th>
                <th className="p-4 text-muted-foreground font-medium">Plan</th>
                <th className="p-4 text-muted-foreground font-medium hidden sm:table-cell">Orders</th>
                <th className="p-4 text-muted-foreground font-medium hidden lg:table-cell">Status</th>
                <th className="p-4 text-muted-foreground font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id} className="border-b border-border/50 last:border-0 hover:bg-muted/30">
                  <td className="p-4">
                    <p className="font-medium">{c.name}</p>
                    <p className="text-xs text-muted-foreground">{c.email}</p>
                  </td>
                  <td className="p-4 hidden md:table-cell">
                    <Badge className={`text-xs ${personaColors[c.persona] || 'bg-muted text-muted-foreground'}`}>{c.persona}</Badge>
                  </td>
                  <td className="p-4 text-sm">{c.plan}</td>
                  <td className="p-4 hidden sm:table-cell font-medium">{c.orders}</td>
                  <td className="p-4 hidden lg:table-cell"><Badge className={`text-xs ${statusBadge[c.status]}`}>{c.status}</Badge></td>
                  <td className="p-4">
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" onClick={() => setSelected(c)}><Eye className="h-3 w-3 mr-1" /> View</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Customer Detail Dialog */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  {selected.name}
                  <Badge className={`text-xs ${statusBadge[selected.status]}`}>{selected.status}</Badge>
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-2">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2"><Mail className="h-3 w-3 text-muted-foreground" /><span>{selected.email}</span></div>
                  <div className="flex items-center gap-2"><MapPin className="h-3 w-3 text-muted-foreground" /><span>{selected.station}</span></div>
                  <div className="flex items-center gap-2"><ShoppingCart className="h-3 w-3 text-muted-foreground" /><span>{selected.orders} orders</span></div>
                  <div className="flex items-center gap-2"><Calendar className="h-3 w-3 text-muted-foreground" /><span>Since {selected.since}</span></div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Card className="shadow-soft"><CardContent className="p-3 text-center"><p className="text-xs text-muted-foreground">Total Spent</p><p className="font-display font-bold text-lg">{selected.totalSpent}</p></CardContent></Card>
                  <Card className="shadow-soft"><CardContent className="p-3 text-center"><p className="text-xs text-muted-foreground">Plan</p><p className="font-display font-bold text-lg">{selected.plan || 'None'}</p></CardContent></Card>
                </div>
                <Separator />
                <h4 className="font-display font-semibold text-sm">Order History</h4>
                {selected.orderHistory.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No recent orders</p>
                ) : (
                  <div className="space-y-2">
                    {selected.orderHistory.map(o => (
                      <div key={o.id} className="flex justify-between items-center text-sm p-2 rounded-lg bg-muted/50">
                        <div>
                          <p className="font-medium">{o.id}</p>
                          <p className="text-xs text-muted-foreground">{o.date} · {o.items}</p>
                        </div>
                        <span className="font-medium">₹{o.total}</span>
                      </div>
                    ))}
                  </div>
                )}
                <Separator />
                <div className="flex gap-2">
                  {selected.status !== 'flagged' && (
                    <Button variant="outline" size="sm" className="flex-1" onClick={() => { toast.success(`${selected.name} flagged`); setSelected(null); }}>
                      <Flag className="h-3 w-3 mr-1 text-golden" /> Flag
                    </Button>
                  )}
                  {selected.status !== 'banned' && (
                    <Button variant="outline" size="sm" className="flex-1 text-destructive border-destructive/30" onClick={() => { toast.success(`${selected.name} banned`); setSelected(null); }}>
                      <Ban className="h-3 w-3 mr-1" /> Ban
                    </Button>
                  )}
                  {(selected.status === 'flagged' || selected.status === 'banned') && (
                    <Button variant="hero" size="sm" className="flex-1" onClick={() => { toast.success(`${selected.name} reactivated`); setSelected(null); }}>
                      Reactivate
                    </Button>
                  )}
                  <Button variant="outline" size="sm"><Mail className="h-3 w-3 mr-1" /> Email</Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
