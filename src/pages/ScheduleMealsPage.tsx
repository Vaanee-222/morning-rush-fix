import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { menuItems } from '@/data/mockData';
import { getFoodImage } from '@/lib/images';
import { Check, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const dates = Array.from({ length: 7 }, (_, i) => {
  const d = new Date(2026, 2, 18 + i);
  return { day: daysOfWeek[i], date: d.getDate(), full: d.toISOString().split('T')[0] };
});

export default function ScheduleMealsPage() {
  const [selectedDate, setSelectedDate] = useState(dates[0].full);
  const [scheduled, setScheduled] = useState<Record<string, string>>({
    [dates[0].full]: '1',
    [dates[2].full]: '4',
    [dates[4].full]: '2',
  });

  const getItem = (id: string) => menuItems.find(m => m.id === id);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-8 max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-display text-3xl font-bold">Schedule Meals</h1>
            <p className="text-sm text-muted-foreground mt-1">Plan your week — 8 meals remaining this cycle</p>
          </div>
          <Link to="/subscriptions"><Button variant="outline">← Back</Button></Link>
        </div>

        {/* Week Selector */}
        <Card className="shadow-soft mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <Button variant="ghost" size="icon"><ChevronLeft className="h-4 w-4" /></Button>
              <span className="font-display font-semibold">March 18 — 24, 2026</span>
              <Button variant="ghost" size="icon"><ChevronRight className="h-4 w-4" /></Button>
            </div>
            <div className="grid grid-cols-7 gap-2">
              {dates.map((d) => {
                const isScheduled = !!scheduled[d.full];
                const isSelected = selectedDate === d.full;
                return (
                  <button
                    key={d.full}
                    onClick={() => setSelectedDate(d.full)}
                    className={`p-3 rounded-lg text-center transition-colors ${
                      isSelected ? 'bg-primary text-primary-foreground' : isScheduled ? 'bg-secondary/10 border border-secondary/30' : 'bg-muted hover:bg-muted/80'
                    }`}
                  >
                    <p className="text-xs font-medium">{d.day}</p>
                    <p className="text-lg font-bold">{d.date}</p>
                    {isScheduled && !isSelected && <Check className="h-3 w-3 text-secondary mx-auto mt-1" />}
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Selected Day */}
          <Card className="shadow-soft">
            <CardContent className="p-6">
              <h3 className="font-display font-semibold mb-4">
                {dates.find(d => d.full === selectedDate)?.day}, March {dates.find(d => d.full === selectedDate)?.date}
              </h3>
              {scheduled[selectedDate] ? (
                <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                  <img src={getFoodImage(scheduled[selectedDate])} alt="" className="w-16 h-16 rounded-lg object-cover" />
                  <div>
                    <p className="font-semibold">{getItem(scheduled[selectedDate])?.name}</p>
                    <p className="text-sm text-muted-foreground">7:30 AM · Rajiv Chowk</p>
                    <div className="flex gap-2 mt-2">
                      <Button variant="outline" size="sm" onClick={() => { const s = { ...scheduled }; delete s[selectedDate]; setScheduled(s); }}>Remove</Button>
                      <Button variant="outline" size="sm">Change Item</Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Plus className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No meal scheduled</p>
                  <p className="text-xs">Select an item from the menu →</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Pick */}
          <Card className="shadow-soft">
            <CardContent className="p-6">
              <h3 className="font-display font-semibold mb-4">Quick Add</h3>
              <div className="space-y-2">
                {menuItems.slice(0, 5).map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setScheduled({ ...scheduled, [selectedDate]: item.id })}
                    className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors text-left"
                  >
                    <img src={getFoodImage(item.id)} alt="" className="w-10 h-10 rounded-lg object-cover" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-muted-foreground">₹{item.price} · {item.nutrition.protein}g protein</p>
                    </div>
                    <Plus className="h-4 w-4 text-muted-foreground" />
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline">Repeat Last Week</Button>
          <Button variant="hero">Save Schedule</Button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
