import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import {
  ShoppingCart, Users, TrendingUp, DollarSign, Clock, AlertTriangle,
  ArrowUpRight, ArrowDownRight, ChevronRight, Star, Repeat, Package, Utensils, MapPin
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import AdminLayout from '@/components/admin/AdminLayout';

const stats = [
  { label: "Today's Orders", value: '127', change: '+12%', up: true, icon: ShoppingCart },
  { label: 'Revenue Today', value: '₹14,230', change: '+8%', up: true, icon: DollarSign },
  { label: 'Active Subscribers', value: '342', change: '+5%', up: true, icon: Users },
  { label: 'Avg Pickup Time', value: '1.8 min', change: '-0.3', up: true, icon: Clock },
];

const recentOrders = [
  { id: '7AM-00298', customer: 'Ankit S.', station: 'Rajiv Chowk', time: '7:15 AM', items: 2, total: 198, status: 'ready', partner: 'Vikram Singh', delivery: 'Raj M.' },
  { id: '7AM-00297', customer: 'Meera R.', station: 'Huda City Centre', time: '7:30 AM', items: 1, total: 109, status: 'preparing', partner: 'Sunita Rao', delivery: '—' },
  { id: '7AM-00296', customer: 'Rahul K.', station: 'Rajiv Chowk', time: '7:45 AM', items: 3, total: 267, status: 'confirmed', partner: 'Vikram Singh', delivery: '—' },
  { id: '7AM-00295', customer: 'Priya M.', station: 'Kashmere Gate', time: '8:00 AM', items: 1, total: 89, status: 'picked_up', partner: 'Amit Patel', delivery: 'Suresh K.' },
  { id: '7AM-00294', customer: 'Sneha D.', station: 'Hauz Khas', time: '8:15 AM', items: 2, total: 178, status: 'confirmed', partner: 'Neha Gupta', delivery: '—' },
];

const topItems = [
  { name: 'Sprouted Moong Chaat', orders: 42, revenue: '₹3,738', growth: '+8%' },
  { name: 'Probiotic Lassi', orders: 38, revenue: '₹2,622', growth: '+15%' },
  { name: 'Overnight Oats Bowl', orders: 31, revenue: '₹3,379', growth: '-2%' },
  { name: 'Masala Egg White Wrap', orders: 28, revenue: '₹3,332', growth: '+5%' },
];

const statusColors: Record<string, string> = {
  confirmed: 'bg-primary/10 text-primary',
  preparing: 'bg-golden/10 text-accent-foreground',
  ready: 'bg-secondary/10 text-secondary',
  picked_up: 'bg-muted text-muted-foreground',
};

export default function AdminDashboard() {
  return (
    <AdminLayout active="Dashboard">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">March 23, 2026 · Today's overview</p>
      </div>

      {/* Stats Row */}
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

      {/* Quick Insights Row */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Menu Items', value: '200+', icon: Utensils, color: 'text-primary' },
          { label: 'Active Memberships', value: '86', icon: Star, color: 'text-golden' },
          { label: 'Monthly Subscriptions', value: '198', icon: Repeat, color: 'text-secondary' },
          { label: 'Active Chapters', value: '12', icon: MapPin, color: 'text-persona-genz' },
        ].map(item => (
          <Card key={item.label} className="shadow-soft bg-card">
            <CardContent className="p-4 flex items-center gap-3">
              <item.icon className={`h-6 w-6 ${item.color}`} />
              <div>
                <p className="text-xs text-muted-foreground">{item.label}</p>
                <p className="font-display text-xl font-bold">{item.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Revenue Chart + Hourly Breakdown */}
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <Card className="shadow-soft">
          <CardContent className="p-5">
            <h3 className="font-display font-semibold mb-4">Revenue Trend (Last 7 Days)</h3>
            <div className="h-48 flex items-end gap-2">
              {[
                { day: 'Mon', val: 12200 },
                { day: 'Tue', val: 15400 },
                { day: 'Wed', val: 11800 },
                { day: 'Thu', val: 18100 },
                { day: 'Fri', val: 14300 },
                { day: 'Sat', val: 16700 },
                { day: 'Sun', val: 14230 },
              ].map((d, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-[9px] text-muted-foreground font-medium">₹{(d.val / 1000).toFixed(1)}K</span>
                  <div className="w-full gradient-sunrise rounded-t transition-all" style={{ height: `${(d.val / 18100) * 140}px` }} />
                  <span className="text-[10px] text-muted-foreground">{d.day}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="p-5">
            <h3 className="font-display font-semibold mb-4">Hourly Order Distribution</h3>
            <div className="space-y-2">
              {[
                { hour: '6:30 - 7:00', orders: 18, pct: 14 },
                { hour: '7:00 - 7:30', orders: 35, pct: 28 },
                { hour: '7:30 - 8:00', orders: 42, pct: 33 },
                { hour: '8:00 - 8:30', orders: 22, pct: 17 },
                { hour: '8:30 - 9:00', orders: 8, pct: 6 },
                { hour: '9:00 - 10:00', orders: 2, pct: 2 },
              ].map(h => (
                <div key={h.hour}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">{h.hour}</span>
                    <span className="font-medium">{h.orders} orders</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full gradient-sunrise rounded-full transition-all" style={{ width: `${h.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="shadow-soft">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-semibold">Recent Orders</h3>
                <Link to="/admin/orders" className="text-sm text-primary font-medium flex items-center gap-1">View all <ChevronRight className="h-3 w-3" /></Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-border text-left">
                    <th className="pb-2 text-muted-foreground font-medium">Order</th>
                    <th className="pb-2 text-muted-foreground font-medium">Customer</th>
                    <th className="pb-2 text-muted-foreground font-medium hidden sm:table-cell">Station</th>
                    <th className="pb-2 text-muted-foreground font-medium hidden md:table-cell">Partner</th>
                    <th className="pb-2 text-muted-foreground font-medium">Total</th>
                    <th className="pb-2 text-muted-foreground font-medium">Status</th>
                  </tr></thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="border-b border-border/50 last:border-0">
                        <td className="py-3 font-medium">{order.id}</td>
                        <td className="py-3">{order.customer}</td>
                        <td className="py-3 hidden sm:table-cell text-muted-foreground">{order.station}</td>
                        <td className="py-3 hidden md:table-cell text-muted-foreground text-xs">{order.partner}</td>
                        <td className="py-3 font-medium">₹{order.total}</td>
                        <td className="py-3"><Badge className={`text-[10px] ${statusColors[order.status]}`}>{order.status.replace('_', ' ')}</Badge></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
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
                    <span className={`text-xs font-medium ${item.growth.startsWith('+') ? 'text-secondary' : 'text-destructive'}`}>{item.growth}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft border-golden/30">
            <CardContent className="p-5">
              <h3 className="font-display font-semibold mb-3 flex items-center gap-2"><AlertTriangle className="h-4 w-4 text-golden" /> Alerts</h3>
              <div className="space-y-3 text-sm">
                <div className="p-3 rounded-lg bg-golden/5 border border-golden/20">
                  <p className="font-medium">Low stock: Chia Seeds</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Only 2 kg remaining</p>
                </div>
                <div className="p-3 rounded-lg bg-destructive/5 border border-destructive/20">
                  <p className="font-medium">3 failed payments</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Subscription renewals pending</p>
                </div>
                <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                  <p className="font-medium">2 new partner applications</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Awaiting review</p>
                </div>
              </div>
            </CardContent>
          </Card>

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
    </AdminLayout>
  );
}
