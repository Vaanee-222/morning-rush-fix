import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import {
  ShoppingCart, Users, TrendingUp, DollarSign, Clock, Package, AlertTriangle,
  BarChart3, Search, Filter, MoreHorizontal, ChevronRight, ArrowUpRight, ArrowDownRight,
  Utensils, MapPin, Bell, Settings, LogOut, Menu as MenuIcon
} from 'lucide-react';

const stats = [
  { label: "Today's Orders", value: '127', change: '+12%', up: true, icon: ShoppingCart },
  { label: 'Revenue Today', value: '₹14,230', change: '+8%', up: true, icon: DollarSign },
  { label: 'Active Subscribers', value: '342', change: '+5%', up: true, icon: Users },
  { label: 'Avg Pickup Time', value: '1.8 min', change: '-0.3', up: true, icon: Clock },
];

const recentOrders = [
  { id: '7AM-00298', customer: 'Ankit S.', station: 'Rajiv Chowk', time: '7:15 AM', items: 2, total: 198, status: 'ready' },
  { id: '7AM-00297', customer: 'Meera R.', station: 'Huda City Centre', time: '7:30 AM', items: 1, total: 109, status: 'preparing' },
  { id: '7AM-00296', customer: 'Rahul K.', station: 'Rajiv Chowk', time: '7:45 AM', items: 3, total: 267, status: 'confirmed' },
  { id: '7AM-00295', customer: 'Priya M.', station: 'Kashmere Gate', time: '8:00 AM', items: 1, total: 89, status: 'picked_up' },
  { id: '7AM-00294', customer: 'Sneha D.', station: 'Hauz Khas', time: '8:15 AM', items: 2, total: 178, status: 'confirmed' },
];

const topItems = [
  { name: 'Sprouted Moong Chaat', orders: 42, revenue: '₹3,738' },
  { name: 'Probiotic Lassi', orders: 38, revenue: '₹2,622' },
  { name: 'Overnight Oats Bowl', orders: 31, revenue: '₹3,379' },
  { name: 'Masala Egg White Wrap', orders: 28, revenue: '₹3,332' },
];

const statusColors: Record<string, string> = {
  confirmed: 'bg-primary/10 text-primary',
  preparing: 'bg-golden/10 text-accent-foreground',
  ready: 'bg-secondary/10 text-secondary',
  picked_up: 'bg-muted text-muted-foreground',
};

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-muted/30">
      {/* Admin Header */}
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-sunrise">
              <span className="text-sm font-bold text-primary-foreground">7</span>
            </div>
            <span className="font-display text-lg font-bold">7AM Admin</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon"><Bell className="h-4 w-4" /></Button>
            <Button variant="ghost" size="icon"><Settings className="h-4 w-4" /></Button>
            <Separator orientation="vertical" className="h-6" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full gradient-fresh flex items-center justify-center text-xs font-bold text-secondary-foreground">A</div>
              <span className="text-sm font-medium hidden sm:block">Admin</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden lg:block w-56 border-r border-border bg-card min-h-[calc(100vh-3.5rem)] p-4">
          <nav className="space-y-1">
            {[
              { icon: BarChart3, label: 'Dashboard', href: '/admin', active: true },
              { icon: ShoppingCart, label: 'Orders', href: '/admin/orders' },
              { icon: Utensils, label: 'Menu', href: '/admin/menu' },
              { icon: Users, label: 'Customers', href: '/admin/customers' },
              { icon: Package, label: 'Subscriptions', href: '/admin/subscriptions' },
              { icon: MapPin, label: 'Stations', href: '/admin/stations' },
              { icon: TrendingUp, label: 'Analytics', href: '/admin/analytics/sales' },
              { icon: Settings, label: 'Settings', href: '/admin/settings/general' },
            ].map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                  item.active ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main */}
        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="font-display text-2xl font-bold">Dashboard</h1>
            <p className="text-sm text-muted-foreground">March 16, 2026 · Today's overview</p>
          </div>

          {/* Stats */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {stats.map((stat) => (
              <Card key={stat.label} className="shadow-soft">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">{stat.label}</span>
                    <stat.icon className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <p className="font-display text-2xl font-bold">{stat.value}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {stat.up ? <ArrowUpRight className="h-3 w-3 text-secondary" /> : <ArrowDownRight className="h-3 w-3 text-destructive" />}
                    <span className={`text-xs font-medium ${stat.up ? 'text-secondary' : 'text-destructive'}`}>{stat.change}</span>
                    <span className="text-xs text-muted-foreground">vs yesterday</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Recent Orders */}
            <div className="lg:col-span-2">
              <Card className="shadow-soft">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-display font-semibold">Recent Orders</h3>
                    <Link to="/admin/orders" className="text-sm text-primary font-medium flex items-center gap-1">
                      View all <ChevronRight className="h-3 w-3" />
                    </Link>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border text-left">
                          <th className="pb-2 text-muted-foreground font-medium">Order</th>
                          <th className="pb-2 text-muted-foreground font-medium">Customer</th>
                          <th className="pb-2 text-muted-foreground font-medium hidden sm:table-cell">Station</th>
                          <th className="pb-2 text-muted-foreground font-medium">Time</th>
                          <th className="pb-2 text-muted-foreground font-medium">Total</th>
                          <th className="pb-2 text-muted-foreground font-medium">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentOrders.map((order) => (
                          <tr key={order.id} className="border-b border-border/50 last:border-0">
                            <td className="py-3 font-medium">{order.id}</td>
                            <td className="py-3">{order.customer}</td>
                            <td className="py-3 hidden sm:table-cell text-muted-foreground">{order.station}</td>
                            <td className="py-3 text-muted-foreground">{order.time}</td>
                            <td className="py-3 font-medium">₹{order.total}</td>
                            <td className="py-3">
                              <Badge className={`text-[10px] ${statusColors[order.status]}`}>
                                {order.status.replace('_', ' ')}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar widgets */}
            <div className="space-y-6">
              {/* Top Items */}
              <Card className="shadow-soft">
                <CardContent className="p-5">
                  <h3 className="font-display font-semibold mb-4">Top Items Today</h3>
                  <div className="space-y-3">
                    {topItems.map((item, i) => (
                      <div key={item.name} className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-bold">{i + 1}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{item.name}</p>
                          <p className="text-xs text-muted-foreground">{item.orders} orders · {item.revenue}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Alerts */}
              <Card className="shadow-soft border-golden/30">
                <CardContent className="p-5">
                  <h3 className="font-display font-semibold mb-3 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-golden" /> Alerts
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="p-3 rounded-lg bg-golden/5 border border-golden/20">
                      <p className="font-medium">Low stock: Chia Seeds</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Only 2 kg remaining</p>
                    </div>
                    <div className="p-3 rounded-lg bg-destructive/5 border border-destructive/20">
                      <p className="font-medium">3 failed payments</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Subscription renewals pending</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Station Performance */}
              <Card className="shadow-soft">
                <CardContent className="p-5">
                  <h3 className="font-display font-semibold mb-3">Station Performance</h3>
                  <div className="space-y-2">
                    {[
                      { name: 'Rajiv Chowk', orders: 48, pct: 38 },
                      { name: 'Huda City Centre', orders: 31, pct: 24 },
                      { name: 'Kashmere Gate', orders: 22, pct: 17 },
                      { name: 'Hauz Khas', orders: 16, pct: 13 },
                      { name: 'Noida Sec 18', orders: 10, pct: 8 },
                    ].map((s) => (
                      <div key={s.name}>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{s.name}</span>
                          <span className="text-muted-foreground">{s.orders}</span>
                        </div>
                        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                          <div className="h-full gradient-sunrise rounded-full" style={{ width: `${s.pct}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
