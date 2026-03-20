import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';
import {
  MapPin, Navigation, Clock, Package, CheckCircle, Phone, ChevronRight, Bike,
  Bell, Settings, LogOut, User, Star, TrendingUp, IndianRupee
} from 'lucide-react';
import { toast } from 'sonner';

interface DeliveryOrder {
  id: string; customer: string; phone: string; station: string; address: string; items: string; total: number; pickupTime: string; status: 'assigned' | 'picked' | 'in_transit' | 'delivered';
  lat: number; lng: number;
}

const deliveryOrders: DeliveryOrder[] = [
  { id: '7AM-00298', customer: 'Ankit Sharma', phone: '+91 97xxx xxxxx', station: 'Rajiv Chowk', address: 'Gate 4, Rajiv Chowk Metro', items: 'Moong Chaat, Lassi', total: 198, pickupTime: '7:15 AM', status: 'assigned', lat: 28.6328, lng: 77.2197 },
  { id: '7AM-00297', customer: 'Meera Reddy', phone: '+91 96xxx xxxxx', station: 'Huda City Centre', address: 'Exit 2, Huda City Centre', items: 'Overnight Oats', total: 109, pickupTime: '7:30 AM', status: 'picked', lat: 28.4595, lng: 77.0266 },
  { id: '7AM-00296', customer: 'Rahul Kumar', phone: '+91 95xxx xxxxx', station: 'Rajiv Chowk', address: 'Gate 4, Rajiv Chowk Metro', items: 'Paneer Wrap, Chai x2', total: 267, pickupTime: '7:45 AM', status: 'in_transit', lat: 28.6328, lng: 77.2197 },
  { id: '7AM-00293', customer: 'Dev Patel', phone: '+91 93xxx xxxxx', station: 'Noida Sec 18', address: 'Exit A, Sec 18 Metro', items: 'Egg Wrap', total: 119, pickupTime: '7:00 AM', status: 'delivered', lat: 28.5707, lng: 77.3261 },
  { id: '7AM-00291', customer: 'Kavya Nair', phone: '+91 92xxx xxxxx', station: 'Kashmere Gate', address: 'Gate 1, Kashmere Gate', items: 'Quinoa Bowl, Juice', total: 288, pickupTime: '8:00 AM', status: 'delivered', lat: 28.6674, lng: 77.2280 },
];

const statusColors: Record<string, string> = {
  assigned: 'bg-primary/10 text-primary',
  picked: 'bg-golden/10 text-accent-foreground',
  in_transit: 'bg-secondary/10 text-secondary',
  delivered: 'bg-muted text-muted-foreground',
};

const statusLabels: Record<string, string> = {
  assigned: 'Pick Up', picked: 'Start Delivery', in_transit: 'Mark Delivered', delivered: 'Completed',
};

export default function DeliveryDashboardPage() {
  const [orders, setOrders] = useState(deliveryOrders);
  const [tab, setTab] = useState('active');
  const [selectedOrder, setSelectedOrder] = useState<DeliveryOrder | null>(null);

  const activeOrders = orders.filter(o => o.status !== 'delivered');
  const completedOrders = orders.filter(o => o.status === 'delivered');

  const advanceStatus = (orderId: string) => {
    const statusFlow: Record<string, string> = { assigned: 'picked', picked: 'in_transit', in_transit: 'delivered' };
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: (statusFlow[o.status] || o.status) as DeliveryOrder['status'] } : o));
    toast.success('Order status updated!');
  };

  const todayEarnings = completedOrders.length * 25;
  const todayTrips = completedOrders.length;

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-sunrise">
              <Bike className="h-4 w-4 text-primary-foreground" />
            </div>
            <div>
              <span className="font-display font-bold text-sm">Delivery Partner</span>
              <p className="text-[10px] text-muted-foreground">Ravi Kumar · ID: DP-0042</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-secondary/10 text-secondary text-xs">Online</Badge>
            <Button variant="ghost" size="icon"><Bell className="h-4 w-4" /></Button>
            <Link to="/"><Button variant="ghost" size="icon"><LogOut className="h-4 w-4" /></Button></Link>
          </div>
        </div>
      </header>

      <div className="container py-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <Card className="shadow-soft"><CardContent className="p-4 text-center"><IndianRupee className="h-5 w-5 mx-auto text-primary mb-1" /><p className="font-display text-xl font-bold">₹{todayEarnings}</p><p className="text-[10px] text-muted-foreground">Today's Earnings</p></CardContent></Card>
          <Card className="shadow-soft"><CardContent className="p-4 text-center"><Package className="h-5 w-5 mx-auto text-secondary mb-1" /><p className="font-display text-xl font-bold">{todayTrips}</p><p className="text-[10px] text-muted-foreground">Completed</p></CardContent></Card>
          <Card className="shadow-soft"><CardContent className="p-4 text-center"><Star className="h-5 w-5 mx-auto text-golden mb-1" /><p className="font-display text-xl font-bold">4.9</p><p className="text-[10px] text-muted-foreground">Rating</p></CardContent></Card>
        </div>

        {/* Map View Placeholder */}
        <Card className="shadow-soft mb-6">
          <CardContent className="p-0">
            <div className="h-48 bg-muted/50 rounded-t-lg relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Navigation className="h-8 w-8 text-primary mx-auto mb-2 animate-pulse" />
                  <p className="text-sm font-medium">Live Map View</p>
                  <p className="text-xs text-muted-foreground">Track all active deliveries</p>
                </div>
              </div>
              {/* Simulated map dots */}
              {activeOrders.map((o, i) => (
                <div key={o.id} className="absolute" style={{ left: `${20 + i * 20}%`, top: `${30 + (i % 2) * 30}%` }}>
                  <div className={`w-4 h-4 rounded-full border-2 border-background ${o.status === 'in_transit' ? 'bg-secondary animate-pulse' : o.status === 'picked' ? 'bg-golden' : 'bg-primary'}`} />
                  <p className="text-[8px] font-medium mt-0.5 whitespace-nowrap">{o.station}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="mb-4 w-full">
            <TabsTrigger value="active" className="flex-1">Active ({activeOrders.length})</TabsTrigger>
            <TabsTrigger value="completed" className="flex-1">Completed ({completedOrders.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="active">
            <div className="space-y-3">
              {activeOrders.map(order => (
                <Card key={order.id} className="shadow-soft hover:shadow-card transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-display font-semibold text-sm">{order.id}</h3>
                          <Badge className={`text-[10px] ${statusColors[order.status]}`}>{order.status.replace('_', ' ')}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">{order.items}</p>
                      </div>
                      <span className="font-bold text-sm">₹{order.total}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                      <MapPin className="h-3 w-3" /> {order.address}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                      <User className="h-3 w-3" /> {order.customer}
                      <Clock className="h-3 w-3 ml-2" /> {order.pickupTime}
                    </div>
                    <div className="flex gap-2">
                      {order.status !== 'delivered' && (
                        <Button variant="hero" size="sm" className="flex-1" onClick={() => advanceStatus(order.id)}>
                          {order.status === 'assigned' && <Package className="h-3 w-3 mr-1" />}
                          {order.status === 'picked' && <Navigation className="h-3 w-3 mr-1" />}
                          {order.status === 'in_transit' && <CheckCircle className="h-3 w-3 mr-1" />}
                          {statusLabels[order.status]}
                        </Button>
                      )}
                      <Button variant="outline" size="sm"><Phone className="h-3 w-3 mr-1" /> Call</Button>
                      <Button variant="outline" size="sm"><Navigation className="h-3 w-3 mr-1" /> Navigate</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {activeOrders.length === 0 && (
                <div className="text-center py-12">
                  <CheckCircle className="h-12 w-12 text-secondary mx-auto mb-3" />
                  <h3 className="font-display font-semibold">All caught up!</h3>
                  <p className="text-sm text-muted-foreground">No pending deliveries right now.</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="completed">
            <div className="space-y-3">
              {completedOrders.map(order => (
                <Card key={order.id} className="shadow-soft opacity-80">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2"><h3 className="font-display font-semibold text-sm">{order.id}</h3><Badge className="text-[10px] bg-muted text-muted-foreground">delivered</Badge></div>
                      <p className="text-xs text-muted-foreground">{order.items} · {order.station}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-sm">₹{order.total}</p>
                      <p className="text-[10px] text-secondary">+₹25 earned</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Monthly Summary */}
        <Card className="shadow-soft mt-6">
          <CardContent className="p-5">
            <h3 className="font-display font-semibold mb-3 flex items-center gap-2"><TrendingUp className="h-4 w-4 text-primary" /> This Month</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Total Deliveries</span><span className="font-bold">187</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Total Earnings</span><span className="font-bold text-secondary">₹4,675</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Avg Rating</span><span className="font-bold">4.9 ⭐</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">On-Time %</span><span className="font-bold">97%</span></div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
