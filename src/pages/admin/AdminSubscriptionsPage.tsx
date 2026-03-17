import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Search, Eye } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';

const subs = [
  { id: '1', name: 'Priya Mehra', plan: 'Regular Fix', meals: '12/20', pct: 60, status: 'active', nextBill: 'Apr 1', amount: '₹1,599' },
  { id: '2', name: 'Meera Reddy', plan: 'Munch Legend', meals: '22/30', pct: 73, status: 'active', nextBill: 'Apr 1', amount: '₹2,099' },
  { id: '3', name: 'Ankit Sharma', plan: 'Sprout Saver', meals: '8/10', pct: 80, status: 'active', nextBill: 'Mar 28', amount: '₹899' },
  { id: '4', name: 'Sneha Dutta', plan: 'Regular Fix', meals: '20/20', pct: 100, status: 'paused', nextBill: '—', amount: '₹1,599' },
  { id: '5', name: 'Dev Patel', plan: 'Sprout Saver', meals: '3/10', pct: 30, status: 'cancelled', nextBill: '—', amount: '—' },
];

const statusColors: Record<string, string> = {
  active: 'bg-secondary/10 text-secondary',
  paused: 'bg-golden/10 text-accent-foreground',
  cancelled: 'bg-destructive/10 text-destructive',
};

export default function AdminSubscriptionsPage() {
  return (
    <AdminLayout active="Subscriptions">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Subscriptions</h1>
          <p className="text-sm text-muted-foreground">Manage customer subscriptions</p>
        </div>
        <div className="flex gap-2">
          <Badge className="bg-secondary/10 text-secondary">Active: 3</Badge>
          <Badge className="bg-golden/10 text-accent-foreground">Paused: 1</Badge>
          <Badge className="bg-destructive/10 text-destructive">Cancelled: 1</Badge>
        </div>
      </div>

      <div className="flex gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search subscriptions..." className="pl-9" />
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
              {subs.map((s) => (
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
                  <td className="p-4"><Button variant="ghost" size="sm"><Eye className="h-3 w-3 mr-1" /> View</Button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </AdminLayout>
  );
}
