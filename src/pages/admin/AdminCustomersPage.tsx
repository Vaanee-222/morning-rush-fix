import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Eye, MoreHorizontal, Mail, Ban } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';

const customers = [
  { id: '1', name: 'Priya Mehra', phone: '+91 98xxx xxxxx', email: 'priya@email.com', persona: 'Millennial', plan: 'Regular Fix', orders: 23, since: 'Jan 2026' },
  { id: '2', name: 'Ankit Sharma', phone: '+91 97xxx xxxxx', email: 'ankit@email.com', persona: 'Boomer', plan: 'Sprout Saver', orders: 15, since: 'Feb 2026' },
  { id: '3', name: 'Meera Reddy', phone: '+91 96xxx xxxxx', email: 'meera@email.com', persona: 'Gen Z', plan: 'Munch Legend', orders: 31, since: 'Jan 2026' },
  { id: '4', name: 'Rahul Kumar', phone: '+91 95xxx xxxxx', email: 'rahul@email.com', persona: 'Millennial', plan: 'None', orders: 5, since: 'Mar 2026' },
  { id: '5', name: 'Sneha Dutta', phone: '+91 94xxx xxxxx', email: 'sneha@email.com', persona: 'Gen Z', plan: 'Regular Fix', orders: 18, since: 'Feb 2026' },
];

const personaColors: Record<string, string> = {
  Boomer: 'bg-persona-boomer/10 text-persona-boomer',
  Millennial: 'bg-persona-millennial/10 text-persona-millennial',
  'Gen Z': 'bg-persona-genz/10 text-persona-genz',
};

export default function AdminCustomersPage() {
  return (
    <AdminLayout active="Customers">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Customers</h1>
          <p className="text-sm text-muted-foreground">342 registered users</p>
        </div>
        <Button variant="outline">Export CSV</Button>
      </div>

      <div className="flex gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search customers..." className="pl-9" />
        </div>
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
                <th className="p-4 text-muted-foreground font-medium hidden lg:table-cell">Since</th>
                <th className="p-4 text-muted-foreground font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
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
                  <td className="p-4 hidden lg:table-cell text-muted-foreground">{c.since}</td>
                  <td className="p-4">
                    <Button variant="ghost" size="sm"><Eye className="h-3 w-3 mr-1" /> View</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </AdminLayout>
  );
}
