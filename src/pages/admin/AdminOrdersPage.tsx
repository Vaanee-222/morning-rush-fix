import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Search, Filter, Eye, X, Printer, MapPin, Clock, User, Package } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { toast } from 'sonner';

const orders = [
  { id: '7AM-00298', customer: 'Ankit Sharma', phone: '+91 97xxx xxxxx', email: 'ankit@email.com', station: 'Rajiv Chowk', time: '7:15 AM', date: '2026-03-17', items: [{ name: 'Sprouted Moong Chaat', qty: 1, price: 89 }, { name: 'Probiotic Lassi', qty: 1, price: 69 }], total: 198, subtotal: 178, gst: 9, platformFee: 5, packaging: 6, status: 'ready', payment: 'Paid', method: 'UPI' },
  { id: '7AM-00297', customer: 'Meera Reddy', phone: '+91 96xxx xxxxx', email: 'meera@email.com', station: 'Huda City Centre', time: '7:30 AM', date: '2026-03-17', items: [{ name: 'Overnight Oats Bowl', qty: 1, price: 109 }], total: 109, subtotal: 99, gst: 5, platformFee: 3, packaging: 2, status: 'preparing', payment: 'Paid', method: 'Card' },
  { id: '7AM-00296', customer: 'Rahul Kumar', phone: '+91 95xxx xxxxx', email: 'rahul@email.com', station: 'Rajiv Chowk', time: '7:45 AM', date: '2026-03-17', items: [{ name: 'Paneer Tikka Wrap', qty: 1, price: 129 }, { name: 'Masala Chai', qty: 2, price: 49 }], total: 267, subtotal: 247, gst: 12, platformFee: 5, packaging: 3, status: 'confirmed', payment: 'Paid', method: 'UPI' },
  { id: '7AM-00295', customer: 'Priya Mehra', phone: '+91 98xxx xxxxx', email: 'priya@email.com', station: 'Kashmere Gate', time: '8:00 AM', date: '2026-03-17', items: [{ name: 'Acai Smoothie Bowl', qty: 1, price: 149 }], total: 149, subtotal: 139, gst: 7, platformFee: 3, packaging: 0, status: 'picked_up', payment: 'Paid', method: 'Wallet' },
  { id: '7AM-00294', customer: 'Sneha Dutta', phone: '+91 94xxx xxxxx', email: 'sneha@email.com', station: 'Hauz Khas', time: '8:15 AM', date: '2026-03-17', items: [{ name: 'Egg Bhurji Roll', qty: 1, price: 99 }, { name: 'Cold Brew Coffee', qty: 1, price: 99 }], total: 218, subtotal: 198, gst: 10, platformFee: 5, packaging: 5, status: 'confirmed', payment: 'Paid', method: 'UPI' },
  { id: '7AM-00292', customer: 'Kavita Lal', phone: '+91 93xxx xxxxx', email: 'kavita@email.com', station: 'Rajiv Chowk', time: '8:30 AM', date: '2026-03-16', items: [{ name: 'Quinoa Power Bowl', qty: 1, price: 169 }, { name: 'Green Detox Juice', qty: 1, price: 119 }], total: 308, subtotal: 288, gst: 14, platformFee: 5, packaging: 1, status: 'cancelled', payment: 'Refunded', method: 'Card' },
];

const statusColors: Record<string, string> = {
  confirmed: 'bg-primary/10 text-primary',
  preparing: 'bg-golden/10 text-accent-foreground',
  ready: 'bg-secondary/10 text-secondary',
  picked_up: 'bg-muted text-muted-foreground',
  cancelled: 'bg-destructive/10 text-destructive',
};

export default function AdminOrdersPage() {
  const [search, setSearch] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<typeof orders[0] | null>(null);
  const [tab, setTab] = useState('all');

  const filtered = orders
    .filter(o => tab === 'all' || o.status === tab)
    .filter(o => o.id.toLowerCase().includes(search.toLowerCase()) || o.customer.toLowerCase().includes(search.toLowerCase()));

  const updateStatus = (orderId: string, newStatus: string) => {
    toast.success(`Order ${orderId} marked as ${newStatus}`);
    setSelectedOrder(null);
  };

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
          <Input placeholder="Search orders..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="all">All ({orders.length})</TabsTrigger>
          <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
          <TabsTrigger value="preparing">Preparing</TabsTrigger>
          <TabsTrigger value="ready">Ready</TabsTrigger>
          <TabsTrigger value="picked_up">Picked Up</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>

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
                {filtered.map((order) => (
                  <tr key={order.id} className="border-b border-border/50 last:border-0 hover:bg-muted/30">
                    <td className="p-4 font-medium">{order.id}</td>
                    <td className="p-4">{order.customer}</td>
                    <td className="p-4 hidden md:table-cell text-muted-foreground">{order.station}</td>
                    <td className="p-4 text-muted-foreground">{order.date} {order.time}</td>
                    <td className="p-4 font-medium">₹{order.total}</td>
                    <td className="p-4"><Badge className={`text-[10px] ${statusColors[order.status]}`}>{order.status.replace('_', ' ')}</Badge></td>
                    <td className="p-4"><Button variant="ghost" size="sm" onClick={() => setSelectedOrder(order)}><Eye className="h-3 w-3 mr-1" /> View</Button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </Tabs>

      {/* Order Detail Dialog */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          {selectedOrder && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center justify-between">
                  <span>Order {selectedOrder.id}</span>
                  <Badge className={`${statusColors[selectedOrder.status]}`}>{selectedOrder.status.replace('_', ' ')}</Badge>
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-2">
                <div className="flex items-center gap-3 text-sm">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{selectedOrder.customer}</p>
                    <p className="text-muted-foreground text-xs">{selectedOrder.phone} · {selectedOrder.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{selectedOrder.station}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{selectedOrder.date} at {selectedOrder.time}</span>
                </div>
                <Separator />
                <h4 className="font-display font-semibold text-sm">Items</h4>
                {selectedOrder.items.map((item, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span>{item.name} × {item.qty}</span>
                    <span className="font-medium">₹{item.price * item.qty}</span>
                  </div>
                ))}
                <Separator />
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>₹{selectedOrder.subtotal}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">GST (5%)</span><span>₹{selectedOrder.gst}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Platform Fee</span><span>₹{selectedOrder.platformFee}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Packaging</span><span>₹{selectedOrder.packaging}</span></div>
                  <div className="flex justify-between font-bold pt-1 border-t border-border"><span>Total</span><span>₹{selectedOrder.total}</span></div>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Payment</span>
                  <span className="font-medium">{selectedOrder.payment} · {selectedOrder.method}</span>
                </div>
                <Separator />
                <div className="flex gap-2">
                  {selectedOrder.status === 'confirmed' && <Button variant="hero" size="sm" className="flex-1" onClick={() => updateStatus(selectedOrder.id, 'preparing')}>Mark Preparing</Button>}
                  {selectedOrder.status === 'preparing' && <Button variant="hero" size="sm" className="flex-1" onClick={() => updateStatus(selectedOrder.id, 'ready')}>Mark Ready</Button>}
                  {selectedOrder.status === 'ready' && <Button variant="hero" size="sm" className="flex-1" onClick={() => updateStatus(selectedOrder.id, 'picked_up')}>Mark Picked Up</Button>}
                  <Button variant="outline" size="sm"><Printer className="h-3 w-3 mr-1" /> Print</Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
