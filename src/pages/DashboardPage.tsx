import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { sampleOrders } from '@/data/mockData';
import { getFoodImage } from '@/lib/images';
import { Link } from 'react-router-dom';
import { Clock, QrCode, ArrowRight, Gift, Users, MessageCircle, Star, ShoppingBag, Calendar, Utensils } from 'lucide-react';

export default function DashboardPage() {
  const upcomingOrder = sampleOrders[0];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold">Good morning, Priya! 🌅</h1>
          <div className="flex items-center gap-2 mt-2">
            <Badge className="bg-persona-millennial/10 text-persona-millennial border-persona-millennial/20">💪 Protein Hustler</Badge>
            <span className="text-sm text-muted-foreground">March 16, 2026</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upcoming Order */}
            <Card className="shadow-card border-primary/20 overflow-hidden">
              <div className="gradient-sunrise p-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-display text-lg font-bold text-primary-foreground">Your Next Pickup</h2>
                  <Badge className="bg-card/20 text-primary-foreground border-0">
                    <Clock className="h-3 w-3 mr-1" /> Tomorrow
                  </Badge>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-lg">{upcomingOrder.station}</p>
                    <p className="text-muted-foreground text-sm">{upcomingOrder.date} · {upcomingOrder.time}</p>
                    <div className="mt-3 space-y-1">
                      {upcomingOrder.items.map((item, i) => (
                        <p key={i} className="text-sm">{item.quantity}x {item.name} — ₹{item.price}</p>
                      ))}
                    </div>
                    <p className="font-display font-bold text-lg mt-3">Total: ₹{upcomingOrder.total}</p>
                  </div>
                  <Button variant="outline" size="sm" className="shrink-0">
                    <QrCode className="h-4 w-4 mr-1" /> View QR
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { icon: ShoppingBag, label: 'Order Now', href: '/menu', color: 'text-primary' },
                { icon: Gift, label: 'Refer Friend', href: '/referrals', color: 'text-persona-genz' },
                { icon: MessageCircle, label: 'WhatsApp', href: '#', color: 'text-secondary' },
                { icon: Star, label: 'Feedback', href: '/feedback', color: 'text-golden' },
              ].map((action) => (
                <Link key={action.label} to={action.href}>
                  <Card className="hover:shadow-card transition-shadow cursor-pointer h-full">
                    <CardContent className="p-4 flex flex-col items-center text-center gap-2">
                      <action.icon className={`h-6 w-6 ${action.color}`} />
                      <span className="text-sm font-medium">{action.label}</span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {/* Recent Orders */}
            <Card className="shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display text-lg font-semibold">Recent Orders</h3>
                  <Link to="/orders/history" className="text-sm text-primary font-medium">View all</Link>
                </div>
                <div className="space-y-4">
                  {sampleOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg overflow-hidden">
                          <img src={getFoodImage('1')} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{order.orderNumber}</p>
                          <p className="text-xs text-muted-foreground">{order.items.map(i => i.name).join(', ')}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold">₹{order.total}</p>
                        <Badge variant="outline" className="text-[10px]">{order.status.replace('_', ' ')}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Subscription */}
            <Card className="shadow-soft">
              <CardContent className="p-6">
                <h3 className="font-display text-lg font-semibold mb-3">Your Subscription</h3>
                <Badge className="mb-3 bg-accent/10 text-accent-foreground">Regular Fix</Badge>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Meals used</span>
                    <span className="font-medium">12 / 20</span>
                  </div>
                  <Progress value={60} className="h-2" />
                  <p className="text-xs text-muted-foreground">15 days left in cycle</p>
                </div>
                <Link to="/subscriptions">
                  <Button variant="outline" size="sm" className="w-full">Manage Subscription</Button>
                </Link>
              </CardContent>
            </Card>

            {/* Referral */}
            <Card className="shadow-soft">
              <CardContent className="p-6">
                <h3 className="font-display text-lg font-semibold mb-3">Refer & Earn</h3>
                <div className="bg-muted rounded-lg p-3 text-center mb-3">
                  <p className="text-xs text-muted-foreground">Your referral code</p>
                  <p className="font-display font-bold text-xl text-primary tracking-wider">PRIYA7AM</p>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center mb-4">
                  <div><p className="font-bold text-lg">5</p><p className="text-[10px] text-muted-foreground">Invited</p></div>
                  <div><p className="font-bold text-lg">3</p><p className="text-[10px] text-muted-foreground">Joined</p></div>
                  <div><p className="font-bold text-lg">₹150</p><p className="text-[10px] text-muted-foreground">Earned</p></div>
                </div>
                <Link to="/referrals">
                  <Button variant="fresh" size="sm" className="w-full">
                    Share Code <ArrowRight className="ml-2 h-3 w-3" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Today's Special */}
            <Card className="shadow-soft overflow-hidden">
              <div className="aspect-video overflow-hidden">
                <img src={getFoodImage('4')} alt="Today's special" className="w-full h-full object-cover" />
              </div>
              <CardContent className="p-4">
                <Badge className="mb-2 bg-golden/10 text-golden-light border-golden/20 text-xs">Today's Special</Badge>
                <h4 className="font-display font-semibold">Acai Smoothie Bowl</h4>
                <p className="text-xs text-muted-foreground mt-1">Limited edition — only 50 left today!</p>
                <Button variant="hero" size="sm" className="w-full mt-3">Add to Cart — ₹149</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
