import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { MapPin, Clock, Users, Edit, Plus } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';

const stations = [
  { id: '1', name: 'Rajiv Chowk', line: 'Blue/Yellow', orders: 48, staff: 3, hours: '6:30-10:30 AM', active: true, pct: 38 },
  { id: '2', name: 'Huda City Centre', line: 'Yellow', orders: 31, staff: 2, hours: '6:30-10:00 AM', active: true, pct: 24 },
  { id: '3', name: 'Kashmere Gate', line: 'Red/Yellow/Violet', orders: 22, staff: 2, hours: '6:30-10:00 AM', active: true, pct: 17 },
  { id: '4', name: 'Hauz Khas', line: 'Yellow/Magenta', orders: 16, staff: 1, hours: '7:00-10:00 AM', active: true, pct: 13 },
  { id: '5', name: 'Noida Sector 18', line: 'Blue', orders: 10, staff: 1, hours: '7:00-10:00 AM', active: true, pct: 8 },
  { id: '6', name: 'Dwarka Sector 21', line: 'Blue', orders: 0, staff: 0, hours: '—', active: false, pct: 0 },
];

export default function AdminStationsPage() {
  return (
    <AdminLayout active="Stations">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Stations</h1>
          <p className="text-sm text-muted-foreground">Metro station pickup points</p>
        </div>
        <Button variant="hero"><Plus className="h-4 w-4 mr-2" /> Add Station</Button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {stations.map((s) => (
          <Card key={s.id} className={`shadow-soft ${!s.active ? 'opacity-60' : ''}`}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <h3 className="font-display font-semibold">{s.name}</h3>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{s.line} Line</p>
                </div>
                <div className="flex items-center gap-2">
                  <Switch checked={s.active} />
                  <Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="bg-muted/50 rounded-lg p-2">
                  <p className="font-bold text-lg">{s.orders}</p>
                  <p className="text-[10px] text-muted-foreground">Orders/day</p>
                </div>
                <div className="bg-muted/50 rounded-lg p-2">
                  <p className="font-bold text-lg">{s.staff}</p>
                  <p className="text-[10px] text-muted-foreground">Staff</p>
                </div>
                <div className="bg-muted/50 rounded-lg p-2">
                  <p className="font-bold text-sm">{s.hours}</p>
                  <p className="text-[10px] text-muted-foreground">Hours</p>
                </div>
              </div>
              {s.active && (
                <div className="mt-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Order share</span>
                    <span>{s.pct}%</span>
                  </div>
                  <Progress value={s.pct} className="h-1.5" />
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </AdminLayout>
  );
}
