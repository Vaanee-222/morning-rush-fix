import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { subscriptionPlans, menuItems } from '@/data/mockData';
import { Check, Pause, ArrowUp, Calendar, CreditCard, Plus, Minus, X, Utensils } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getFoodImage } from '@/lib/images';
import { motion } from 'framer-motion';

const weeklyMenu = [
  { day: 'Mon', item: menuItems[0], selected: true },
  { day: 'Tue', item: menuItems[1], selected: true },
  { day: 'Wed', item: menuItems[2], selected: true },
  { day: 'Thu', item: menuItems[3], selected: false },
  { day: 'Fri', item: menuItems[4], selected: true },
  { day: 'Sat', item: menuItems[5], selected: false },
];

export default function SubscriptionsPage() {
  const activePlan = subscriptionPlans[1];
  const [selectedItems, setSelectedItems] = useState<string[]>(
    menuItems.slice(0, 6).map(i => i.id)
  );

  const toggleItem = (id: string) => {
    setSelectedItems(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-8 max-w-5xl">
        <h1 className="font-display text-3xl font-bold mb-6">My Subscription</h1>

        <Tabs defaultValue="overview">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="customize">Customize Meals</TabsTrigger>
            <TabsTrigger value="schedule">Weekly Schedule</TabsTrigger>
            <TabsTrigger value="history">Billing History</TabsTrigger>
          </TabsList>

          {/* Overview tab */}
          <TabsContent value="overview">
            <Card className="shadow-elevated border-primary/20 mb-8">
              <div className="gradient-sunrise p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <Badge className="bg-card/20 text-primary-foreground border-0 mb-2">Active</Badge>
                    <h2 className="font-display text-2xl font-bold text-primary-foreground">{activePlan.name}</h2>
                    <p className="text-primary-foreground/80 text-sm">{activePlan.meals} meals/month</p>
                  </div>
                  <div className="text-right text-primary-foreground">
                    <p className="font-display text-3xl font-bold">₹{activePlan.price}</p>
                    <p className="text-sm opacity-80">/month</p>
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Meals Used</p>
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="font-display text-3xl font-bold">12</span>
                      <span className="text-muted-foreground">/ {activePlan.meals}</span>
                    </div>
                    <Progress value={60} className="h-3 mb-1" />
                    <p className="text-xs text-muted-foreground">8 meals remaining</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Billing</p>
                    <p className="font-medium">Next: April 1, 2026</p>
                    <p className="text-sm text-muted-foreground mt-1">Auto-renew via UPI</p>
                    <Button variant="link" className="p-0 h-auto text-sm mt-1"><CreditCard className="h-3 w-3 mr-1" /> Update payment</Button>
                  </div>
                </div>
                <Separator className="my-6" />
                <div className="flex flex-wrap gap-3">
                  <Link to="/subscription/schedule"><Button variant="outline"><Calendar className="h-4 w-4 mr-2" /> Schedule Meals</Button></Link>
                  <Link to="/subscription/pause"><Button variant="outline"><Pause className="h-4 w-4 mr-2" /> Pause Plan</Button></Link>
                  <Link to="/membership"><Button variant="outline"><ArrowUp className="h-4 w-4 mr-2" /> Upgrade</Button></Link>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardContent className="p-6">
                <h3 className="font-display text-lg font-semibold mb-4">Your Plan Includes</h3>
                <div className="grid sm:grid-cols-2 gap-2">
                  {activePlan.features.map((f) => (
                    <div key={f} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-secondary shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Customize Meals tab */}
          <TabsContent value="customize">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="font-display text-xl font-bold">Pick Your Meals</h2>
                <p className="text-sm text-muted-foreground">Select up to {activePlan.meals} items for your subscription</p>
              </div>
              <Badge variant="outline" className="text-lg px-4 py-1">
                <Utensils className="h-4 w-4 mr-2" />
                {selectedItems.length} / {activePlan.meals} selected
              </Badge>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {menuItems.map((item) => {
                const isSelected = selectedItems.includes(item.id);
                return (
                  <motion.div key={item.id} layout>
                    <Card className={`shadow-soft cursor-pointer transition-all ${isSelected ? 'border-primary ring-1 ring-primary/20' : 'hover:border-muted-foreground/30'}`} onClick={() => toggleItem(item.id)}>
                      <CardContent className="p-3 flex items-center gap-3">
                        <img src={getFoodImage(item.id)} alt={item.name} className="w-14 h-14 rounded-lg object-cover" />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{item.name}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>₹{item.price}</span>
                            <span>·</span>
                            <span>{item.nutrition.protein}g protein</span>
                          </div>
                        </div>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${isSelected ? 'bg-primary border-primary' : 'border-muted-foreground/30'}`}>
                          {isSelected && <Check className="h-3.5 w-3.5 text-primary-foreground" />}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
            <div className="mt-6 flex justify-end">
              <Button variant="hero">Save My Meal Selections</Button>
            </div>
          </TabsContent>

          {/* Weekly Schedule tab */}
          <TabsContent value="schedule">
            <Card className="shadow-soft">
              <CardContent className="p-6">
                <h2 className="font-display text-xl font-bold mb-4">This Week's Schedule</h2>
                <div className="space-y-3">
                  {weeklyMenu.map((day) => (
                    <div key={day.day} className={`flex items-center gap-4 p-3 rounded-lg border ${day.selected ? 'border-secondary/30 bg-secondary/5' : 'border-border'}`}>
                      <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center font-display font-bold text-sm">{day.day}</div>
                      <img src={getFoodImage(day.item.id)} alt={day.item.name} className="w-12 h-12 rounded-lg object-cover" />
                      <div className="flex-1">
                        <p className="font-medium text-sm">{day.item.name}</p>
                        <p className="text-xs text-muted-foreground">{day.item.nutrition.calories} cal · {day.item.nutrition.protein}g protein</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8"><ArrowUp className="h-3 w-3" /></Button>
                        {day.selected ? (
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive"><X className="h-3 w-3" /></Button>
                        ) : (
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-secondary"><Plus className="h-3 w-3" /></Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <Link to="/subscription/schedule"><Button variant="outline"><Calendar className="h-4 w-4 mr-2" /> Edit Full Schedule</Button></Link>
                  <Button variant="hero">Save Schedule</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Billing History tab */}
          <TabsContent value="history">
            <Card className="shadow-soft">
              <CardContent className="p-6">
                <h2 className="font-display text-xl font-bold mb-4">Billing History</h2>
                <div className="space-y-2">
                  {[
                    { date: 'Mar 1, 2026', amount: '₹1,599', status: 'Paid', plan: 'Regular Fix' },
                    { date: 'Feb 1, 2026', amount: '₹1,599', status: 'Paid', plan: 'Regular Fix' },
                    { date: 'Jan 1, 2026', amount: '₹899', status: 'Paid', plan: 'Sprout Saver' },
                    { date: 'Dec 1, 2025', amount: '₹899', status: 'Paid', plan: 'Sprout Saver' },
                  ].map((bill, i) => (
                    <div key={i} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                      <div>
                        <p className="text-sm font-medium">{bill.date}</p>
                        <p className="text-xs text-muted-foreground">{bill.plan}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-display font-bold">{bill.amount}</span>
                        <Badge className="bg-secondary/10 text-secondary text-xs">{bill.status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
}
