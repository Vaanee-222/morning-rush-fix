import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { MapPin, Clock, Users, Edit, Plus, Trash2, Phone, Mail } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { toast } from 'sonner';

interface Station {
  id: string; name: string; line: string; orders: number; staff: number; hours: string; active: boolean; pct: number; address: string; partner: string; partnerPhone: string; capacity: number; avgRating: number;
}

const initialStations: Station[] = [
  { id: '1', name: 'Rajiv Chowk', line: 'Blue/Yellow', orders: 48, staff: 3, hours: '6:30-10:30 AM', active: true, pct: 38, address: 'Gate 4, Rajiv Chowk Metro Station', partner: 'Vikram Singh', partnerPhone: '+91 98xxx 11111', capacity: 80, avgRating: 4.8 },
  { id: '2', name: 'Huda City Centre', line: 'Yellow', orders: 31, staff: 2, hours: '6:30-10:00 AM', active: true, pct: 24, address: 'Exit 2, Huda City Centre', partner: 'Sunita Rao', partnerPhone: '+91 97xxx 22222', capacity: 50, avgRating: 4.6 },
  { id: '3', name: 'Kashmere Gate', line: 'Red/Yellow/Violet', orders: 22, staff: 2, hours: '6:30-10:00 AM', active: true, pct: 17, address: 'Gate 1, Kashmere Gate ISBT Side', partner: 'Amit Patel', partnerPhone: '+91 96xxx 33333', capacity: 40, avgRating: 4.5 },
  { id: '4', name: 'Hauz Khas', line: 'Yellow/Magenta', orders: 16, staff: 1, hours: '7:00-10:00 AM', active: true, pct: 13, address: 'Gate 3, Hauz Khas Metro', partner: 'Neha Gupta', partnerPhone: '+91 95xxx 44444', capacity: 30, avgRating: 4.3 },
  { id: '5', name: 'Noida Sector 18', line: 'Blue', orders: 10, staff: 1, hours: '7:00-10:00 AM', active: true, pct: 8, address: 'Exit A, Sec 18 Metro', partner: 'Ramesh Verma', partnerPhone: '+91 93xxx 66666', capacity: 25, avgRating: 4.2 },
  { id: '6', name: 'Dwarka Sector 21', line: 'Blue', orders: 0, staff: 0, hours: '—', active: false, pct: 0, address: 'Gate 2, Dwarka Sec 21', partner: 'Rajesh Kumar', partnerPhone: '+91 94xxx 55555', capacity: 30, avgRating: 0 },
];

export default function AdminStationsPage() {
  const [stations, setStations] = useState(initialStations);
  const [editStation, setEditStation] = useState<Station | null>(null);
  const [viewStation, setViewStation] = useState<Station | null>(null);

  const toggleActive = (id: string) => {
    setStations(prev => prev.map(s => s.id === id ? { ...s, active: !s.active } : s));
    toast.success('Station status updated');
  };

  return (
    <AdminLayout active="Stations">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Stations</h1>
          <p className="text-sm text-muted-foreground">Metro station pickup points</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="hero"><Plus className="h-4 w-4 mr-2" /> Add Station</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader><DialogTitle>Add New Station</DialogTitle></DialogHeader>
            <div className="space-y-4 mt-4">
              <div><label className="text-sm font-medium mb-1 block">Station Name</label><Input placeholder="e.g. Chandni Chowk" /></div>
              <div><label className="text-sm font-medium mb-1 block">Metro Line</label><Input placeholder="e.g. Yellow" /></div>
              <div><label className="text-sm font-medium mb-1 block">Address</label><Input placeholder="Gate details, nearby landmarks" /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="text-sm font-medium mb-1 block">Operating Hours</label><Input placeholder="6:30-10:00 AM" /></div>
                <div><label className="text-sm font-medium mb-1 block">Capacity</label><Input type="number" placeholder="50" /></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="text-sm font-medium mb-1 block">Partner Name</label><Input placeholder="Partner name" /></div>
                <div><label className="text-sm font-medium mb-1 block">Partner Phone</label><Input placeholder="+91 xxxxx xxxxx" /></div>
              </div>
              <div><label className="text-sm font-medium mb-1 block">Staff Count</label><Input type="number" placeholder="2" /></div>
              <Button variant="hero" className="w-full" onClick={() => toast.success('Station added!')}>
                <Plus className="h-4 w-4 mr-2" /> Create Station
              </Button>
            </div>
          </DialogContent>
        </Dialog>
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
                  <p className="text-xs text-muted-foreground mt-1">{s.line} Line · {s.address}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Switch checked={s.active} onCheckedChange={() => toggleActive(s.id)} />
                  <Button variant="ghost" size="icon" onClick={() => setViewStation(s)}><MapPin className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon" onClick={() => setEditStation(s)}><Edit className="h-4 w-4" /></Button>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="bg-muted/50 rounded-lg p-2"><p className="font-bold text-lg">{s.orders}</p><p className="text-[10px] text-muted-foreground">Orders/day</p></div>
                <div className="bg-muted/50 rounded-lg p-2"><p className="font-bold text-lg">{s.staff}</p><p className="text-[10px] text-muted-foreground">Staff</p></div>
                <div className="bg-muted/50 rounded-lg p-2"><p className="font-bold text-sm">{s.hours}</p><p className="text-[10px] text-muted-foreground">Hours</p></div>
                <div className="bg-muted/50 rounded-lg p-2"><p className="font-bold text-lg">{s.capacity}</p><p className="text-[10px] text-muted-foreground">Capacity</p></div>
              </div>
              {s.active && (
                <div className="mt-3">
                  <div className="flex justify-between text-xs mb-1"><span className="text-muted-foreground">Order share</span><span>{s.pct}%</span></div>
                  <Progress value={s.pct} className="h-1.5" />
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* View Station Detail */}
      <Dialog open={!!viewStation} onOpenChange={() => setViewStation(null)}>
        <DialogContent className="max-w-md">
          {viewStation && (
            <>
              <DialogHeader><DialogTitle className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> {viewStation.name}</DialogTitle></DialogHeader>
              <div className="space-y-3 mt-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Metro Line</span><span>{viewStation.line}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Address</span><span>{viewStation.address}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Hours</span><span>{viewStation.hours}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Capacity</span><span>{viewStation.capacity} orders/day</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Staff</span><span>{viewStation.staff}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Avg Rating</span><span>{viewStation.avgRating || '—'} ⭐</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Partner</span><span>{viewStation.partner}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Partner Phone</span><span>{viewStation.partnerPhone}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Daily Orders</span><span className="font-bold">{viewStation.orders}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Order Share</span><span className="font-bold">{viewStation.pct}%</span></div>
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1" onClick={() => { setViewStation(null); setEditStation(viewStation); }}>
                    <Edit className="h-3 w-3 mr-1" /> Edit
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 text-destructive" onClick={() => { toast.success('Station deleted'); setViewStation(null); }}>
                    <Trash2 className="h-3 w-3 mr-1" /> Delete
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Station */}
      <Dialog open={!!editStation} onOpenChange={() => setEditStation(null)}>
        <DialogContent className="max-w-lg">
          {editStation && (
            <>
              <DialogHeader><DialogTitle>Edit: {editStation.name}</DialogTitle></DialogHeader>
              <div className="space-y-4 mt-4">
                <div><label className="text-sm font-medium mb-1 block">Station Name</label><Input defaultValue={editStation.name} /></div>
                <div><label className="text-sm font-medium mb-1 block">Metro Line</label><Input defaultValue={editStation.line} /></div>
                <div><label className="text-sm font-medium mb-1 block">Address</label><Input defaultValue={editStation.address} /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className="text-sm font-medium mb-1 block">Hours</label><Input defaultValue={editStation.hours} /></div>
                  <div><label className="text-sm font-medium mb-1 block">Capacity</label><Input type="number" defaultValue={editStation.capacity} /></div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className="text-sm font-medium mb-1 block">Partner</label><Input defaultValue={editStation.partner} /></div>
                  <div><label className="text-sm font-medium mb-1 block">Staff</label><Input type="number" defaultValue={editStation.staff} /></div>
                </div>
                <Button variant="hero" className="w-full" onClick={() => { toast.success('Station updated'); setEditStation(null); }}>Save Changes</Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
