import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';
import { Search, Filter, MoreHorizontal, ChevronRight, Eye } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';

const orders = [
  { id: '7AM-00298', customer: 'Ankit S.', station: 'Rajiv Chowk', time: '7:15 AM', date: '2026-03-17', items: 2, total: 198, status: 'ready' },
  { id: '7AM-00297', customer: 'Meera R.', station: 'Huda City Centre', time: '7:30 AM', date: '2026-03-17', items: 1, total: 109, status: 'preparing' },
  { id: '7AM-00296', customer: 'Rahul K.', station: 'Rajiv Chowk', time: '7:45 AM', date: '2026-03-17', items: 3, total: 267, status: 'confirmed' },
  { id: '7AM-00295', customer: 'Priya M.', station: 'Kashmere Gate', time: '8:00 AM', date: '2026-03-17', items: 1, total: 89, status: 'picked_up' },
  { id: '7AM-00294', customer: 'Sneha D.', station: 'Hauz Khas', time: '8:15 AM', date: '2026-03-17', items: 2, total: 178, status: 'confirmed' },
  { id: '7AM-00293', customer: 'Dev P.', station: 'Noida Sec 18', time: '7:00 AM', date: '2026-03-16', items: 1, total: 119, status: 'picked_up' },
  { id: '7AM-00292', customer: 'Kavita L.', station: 'Rajiv Chowk', time: '8:30 AM', date: '2026-03-16', items: 2, total: 218, status: 'cancelled' },
];

const statusColors: Record<string, string> = {
  confirmed: 'bg-primary/10 text-primary',
  preparing: 'bg-golden/10 text-accent-foreground',
  ready: 'bg-secondary/10 text-secondary',
  picked_up: 'bg-muted text-muted-foreground',
  cancelled: 'bg-destructive/10 text-destructive',
};

export default function AdminOrdersPage() {
  return (
    <AdminLayout active="Orders">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Orders</h1>
          <p className="text-sm text-muted-foreground">Manage all customer orders</p>
        </div>
        <Button variant="outline">Export CSV</Button>
      </div>

      <div className="flex gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search orders..." className="pl-9" />
        </div>
        <Button variant="outline"><Filter className="h-4 w-4 mr-2" /> Filter</Button>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All ({orders.length})</TabsTrigger>
          <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
          <TabsTrigger value="preparing">Preparing</TabsTrigger>
          <TabsTrigger value="ready">Ready</TabsTrigger>
          <TabsTrigger value="picked_up">Picked Up</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <Card className="shadow-soft">
            <CardContent className="p-0">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left">
                    <th className="p-4 text-muted-foreground font-medium">Order</th>
                    <th className="p-4 text-muted-foreground font-medium">Customer</th>
                    <th className="p-4 text-muted-foreground font-medium hidden md:table-cell">Station</th>
                    <th className="p-4 text-muted-foreground font-medium">Date</th>
                    <th className="p-4 text-muted-foreground font-medium">Total</th>
                    <th className="p-4 text-muted-foreground font-medium">Status</th>
                    <th className="p-4 text-muted-foreground font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b border-border/50 last:border-0 hover:bg-muted/30">
                      <td className="p-4 font-medium">{order.id}</td>
                      <td className="p-4">{order.customer}</td>
                      <td className="p-4 hidden md:table-cell text-muted-foreground">{order.station}</td>
                      <td className="p-4 text-muted-foreground">{order.date} {order.time}</td>
                      <td className="p-4 font-medium">₹{order.total}</td>
                      <td className="p-4"><Badge className={`text-[10px] ${statusColors[order.status]}`}>{order.status.replace('_', ' ')}</Badge></td>
                      <td className="p-4"><Button variant="ghost" size="sm"><Eye className="h-3 w-3 mr-1" /> View</Button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
}
