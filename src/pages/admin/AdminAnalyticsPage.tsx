import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, ArrowUpRight, ArrowDownRight, DollarSign, Users, ShoppingCart, Repeat } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';

const salesData = [
  { period: 'Today', revenue: '₹14,230', orders: 127, avg: '₹112', change: '+8%', up: true },
  { period: 'This Week', revenue: '₹89,450', orders: 812, avg: '₹110', change: '+12%', up: true },
  { period: 'This Month', revenue: '₹3,21,000', orders: 2890, avg: '₹111', change: '+15%', up: true },
];

const topProducts = [
  { name: 'Sprouted Moong Chaat', sold: 342, revenue: '₹30,438', trend: '+5%' },
  { name: 'Probiotic Lassi', sold: 298, revenue: '₹20,562', trend: '+12%' },
  { name: 'Overnight Oats Bowl', sold: 256, revenue: '₹27,904', trend: '-3%' },
  { name: 'Masala Egg White Wrap', sold: 231, revenue: '₹27,489', trend: '+8%' },
  { name: 'Acai Smoothie Bowl', sold: 189, revenue: '₹28,161', trend: '+22%' },
];

export default function AdminAnalyticsPage() {
  return (
    <AdminLayout active="Analytics">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold">Analytics</h1>
        <p className="text-sm text-muted-foreground">Sales performance and insights</p>
      </div>

      <Tabs defaultValue="sales">
        <TabsList className="mb-6">
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
        </TabsList>

        <TabsContent value="sales">
          <div className="grid sm:grid-cols-3 gap-4 mb-6">
            {salesData.map((d) => (
              <Card key={d.period} className="shadow-soft">
                <CardContent className="p-5">
                  <p className="text-sm text-muted-foreground mb-1">{d.period}</p>
                  <p className="font-display text-2xl font-bold">{d.revenue}</p>
                  <div className="flex items-center gap-2 mt-2 text-xs">
                    {d.up ? <ArrowUpRight className="h-3 w-3 text-secondary" /> : <ArrowDownRight className="h-3 w-3 text-destructive" />}
                    <span className={d.up ? 'text-secondary' : 'text-destructive'}>{d.change}</span>
                    <span className="text-muted-foreground">{d.orders} orders · Avg {d.avg}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <Card className="shadow-soft">
            <CardContent className="p-6">
              <h3 className="font-display font-semibold mb-4">Revenue Trend (Last 7 Days)</h3>
              <div className="h-48 flex items-end gap-2">
                {[12, 15, 11, 18, 14, 16, 14].map((v, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full gradient-sunrise rounded-t" style={{ height: `${v * 8}px` }} />
                    <span className="text-[10px] text-muted-foreground">{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products">
          <Card className="shadow-soft">
            <CardContent className="p-6">
              <h3 className="font-display font-semibold mb-4">Top Products (This Month)</h3>
              <table className="w-full text-sm">
                <thead><tr className="border-b border-border text-left">
                  <th className="pb-3 text-muted-foreground font-medium">#</th>
                  <th className="pb-3 text-muted-foreground font-medium">Product</th>
                  <th className="pb-3 text-muted-foreground font-medium">Sold</th>
                  <th className="pb-3 text-muted-foreground font-medium">Revenue</th>
                  <th className="pb-3 text-muted-foreground font-medium">Trend</th>
                </tr></thead>
                <tbody>
                  {topProducts.map((p, i) => (
                    <tr key={p.name} className="border-b border-border/50 last:border-0">
                      <td className="py-3 font-bold">{i + 1}</td>
                      <td className="py-3 font-medium">{p.name}</td>
                      <td className="py-3">{p.sold}</td>
                      <td className="py-3 font-medium">{p.revenue}</td>
                      <td className="py-3">
                        <span className={p.trend.startsWith('+') ? 'text-secondary' : 'text-destructive'}>{p.trend}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customers">
          <div className="grid sm:grid-cols-4 gap-4">
            {[
              { label: 'Total Users', value: '342', icon: Users },
              { label: 'Active Subscribers', value: '198', icon: Repeat },
              { label: 'New This Week', value: '23', icon: ArrowUpRight },
              { label: 'Churn Rate', value: '4.2%', icon: ArrowDownRight },
            ].map((s) => (
              <Card key={s.label} className="shadow-soft">
                <CardContent className="p-5 text-center">
                  <s.icon className="h-6 w-6 mx-auto text-muted-foreground mb-2" />
                  <p className="font-display text-2xl font-bold">{s.value}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="subscriptions">
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { label: 'MRR', value: '₹2,45,000', change: '+18%' },
              { label: 'Active Subscriptions', value: '198', change: '+5%' },
              { label: 'Avg Revenue/User', value: '₹1,237', change: '+3%' },
            ].map((s) => (
              <Card key={s.label} className="shadow-soft">
                <CardContent className="p-5">
                  <p className="text-sm text-muted-foreground">{s.label}</p>
                  <p className="font-display text-2xl font-bold mt-1">{s.value}</p>
                  <span className="text-xs text-secondary">{s.change} vs last month</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
}
