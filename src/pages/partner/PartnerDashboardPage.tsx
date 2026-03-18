import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Link } from 'react-router-dom';
import { MapPin, ShoppingCart, TrendingUp, DollarSign, Users, Star, Settings, Bell, LogOut, Package } from 'lucide-react';

const stats = [
  { label: "Today's Orders", value: '34', change: '+8%', icon: ShoppingCart },
  { label: 'Revenue Today', value: '₹4,560', change: '+12%', icon: DollarSign },
  { label: 'Avg Rating', value: '4.7', change: '+0.1', icon: Star },
  { label: 'Subscribers', value: '67', change: '+3', icon: Users },
];

const todayOrders = [
  { id: '001', time: '7:15 AM', items: 'Moong Chaat, Lassi', total: 158, status: 'ready' },
  { id: '002', time: '7:30 AM', items: 'Overnight Oats x2', total: 218, status: 'preparing' },
  { id: '003', time: '7:45 AM', items: 'Egg Wrap, Coffee', total: 218, status: 'confirmed' },
  { id: '004', time: '8:00 AM', items: 'Acai Bowl', total: 149, status: 'confirmed' },
];

const inventory = [
  { item: 'Oats', stock: 80, threshold: 20 },
  { item: 'Fresh Fruits', stock: 45, threshold: 30 },
  { item: 'Paneer', stock: 15, threshold: 20 },
  { item: 'Eggs', stock: 60, threshold: 25 },
];

export default function PartnerDashboardPage() {
  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-sunrise">
              <span className="text-sm font-bold text-primary-foreground">7</span>
            </div>
            <div>
              <span className="font-display font-bold">Partner Dashboard</span>
              <div className="flex items-center gap-1 text-xs text-muted-foreground"><MapPin className="h-3 w-3" /> Rajiv Chowk Station</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon"><Bell className="h-4 w-4" /></Button>
            <Button variant="ghost" size="icon"><Settings className="h-4 w-4" /></Button>
            <Link to="/"><Button variant="ghost" size="icon"><LogOut className="h-4 w-4" /></Button></Link>
          </div>
        </div>
      </header>

      <div className="container py-6">
        <div className="mb-6">
          <h1 className="font-display text-2xl font-bold">Good Morning, Partner! ☀️</h1>
          <p className="text-sm text-muted-foreground">March 18, 2026 · Rajiv Chowk Station</p>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map(s => (
            <Card key={s.label} className="shadow-soft">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">{s.label}</span>
                  <s.icon className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="font-display text-2xl font-bold">{s.value}</p>
                <p className="text-xs text-secondary">{s.change} vs yesterday</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Orders */}
          <div className="lg:col-span-2">
            <Card className="shadow-soft">
              <CardContent className="p-5">
                <h3 className="font-display font-semibold mb-4">Today's Orders</h3>
                <div className="space-y-3">
                  {todayOrders.map(o => (
                    <div key={o.id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                      <div>
                        <p className="font-medium text-sm">{o.items}</p>
                        <p className="text-xs text-muted-foreground">{o.time}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-sm">₹{o.total}</span>
                        <Badge className={`text-[10px] ${o.status === 'ready' ? 'bg-secondary/10 text-secondary' : o.status === 'preparing' ? 'bg-golden/10 text-accent-foreground' : 'bg-primary/10 text-primary'}`}>
                          {o.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Inventory */}
          <div className="space-y-6">
            <Card className="shadow-soft">
              <CardContent className="p-5">
                <h3 className="font-display font-semibold mb-4 flex items-center gap-2"><Package className="h-4 w-4" /> Inventory</h3>
                <div className="space-y-3">
                  {inventory.map(inv => (
                    <div key={inv.item}>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{inv.item}</span>
                        <span className={inv.stock < inv.threshold ? 'text-destructive font-medium' : 'text-muted-foreground'}>{inv.stock}%</span>
                      </div>
                      <Progress value={inv.stock} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardContent className="p-5">
                <h3 className="font-display font-semibold mb-3">This Month</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm"><span className="text-muted-foreground">Total Orders</span><span className="font-bold">478</span></div>
                  <div className="flex justify-between text-sm"><span className="text-muted-foreground">Revenue</span><span className="font-bold">₹62,340</span></div>
                  <div className="flex justify-between text-sm"><span className="text-muted-foreground">Avg Rating</span><span className="font-bold">4.7 ⭐</span></div>
                  <div className="flex justify-between text-sm"><span className="text-muted-foreground">Your Earnings</span><span className="font-bold text-secondary">₹24,936</span></div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
