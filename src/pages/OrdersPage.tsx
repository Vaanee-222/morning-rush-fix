import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { sampleOrders } from '@/data/mockData';
import { getFoodImage } from '@/lib/images';
import { QrCode, RotateCcw } from 'lucide-react';

export default function OrdersPage() {
  const upcoming = sampleOrders.filter(o => o.status === 'confirmed' || o.status === 'preparing' || o.status === 'ready');
  const past = sampleOrders.filter(o => o.status === 'picked_up' || o.status === 'cancelled');

  const statusColor: Record<string, string> = {
    confirmed: 'bg-primary/10 text-primary',
    preparing: 'bg-golden/10 text-accent-foreground',
    ready: 'bg-secondary/10 text-secondary',
    picked_up: 'bg-muted text-muted-foreground',
    cancelled: 'bg-destructive/10 text-destructive',
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-8">
        <h1 className="font-display text-3xl font-bold mb-6">My Orders</h1>
        <Tabs defaultValue="upcoming">
          <TabsList className="mb-6">
            <TabsTrigger value="upcoming">Upcoming ({upcoming.length})</TabsTrigger>
            <TabsTrigger value="history">History ({past.length})</TabsTrigger>
          </TabsList>
          <TabsContent value="upcoming" className="space-y-4">
            {upcoming.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">No upcoming orders</div>
            ) : upcoming.map(order => (
              <Card key={order.id} className="shadow-soft">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-display font-semibold">{order.orderNumber}</p>
                      <p className="text-sm text-muted-foreground">{order.station} · {order.date} · {order.time}</p>
                    </div>
                    <Badge className={statusColor[order.status]}>{order.status.replace('_', ' ')}</Badge>
                  </div>
                  <div className="text-sm space-y-1 mb-3">
                    {order.items.map((i, idx) => <p key={idx}>{i.quantity}x {i.name}</p>)}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-display font-bold">₹{order.total}</span>
                    <Button variant="outline" size="sm"><QrCode className="h-4 w-4 mr-1" /> View QR</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
          <TabsContent value="history" className="space-y-4">
            {past.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">No past orders yet</div>
            ) : past.map(order => (
              <Card key={order.id} className="shadow-soft">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-display font-semibold">{order.orderNumber}</p>
                      <p className="text-sm text-muted-foreground">{order.station} · {order.date}</p>
                    </div>
                    <Badge className={statusColor[order.status]}>{order.status.replace('_', ' ')}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-display font-bold">₹{order.total}</span>
                    <Button variant="outline" size="sm"><RotateCcw className="h-4 w-4 mr-1" /> Reorder</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
}
