import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Search, Eye, Edit, Plus, MapPin, Phone, Mail, Star, Trash2 } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { toast } from 'sonner';

interface Partner {
  id: string; name: string; phone: string; email: string; station: string; line: string; rating: number; orders: number; revenue: string; earnings: string; status: 'active' | 'inactive' | 'onboarding'; since: string; staff: number;
}

const initialPartners: Partner[] = [
  { id: '1', name: 'Vikram Singh', phone: '+91 98xxx 11111', email: 'vikram@partner.com', station: 'Rajiv Chowk', line: 'Blue/Yellow', rating: 4.8, orders: 1245, revenue: '₹1,84,000', earnings: '₹73,600', status: 'active', since: 'Jan 2026', staff: 3 },
  { id: '2', name: 'Sunita Rao', phone: '+91 97xxx 22222', email: 'sunita@partner.com', station: 'Huda City Centre', line: 'Yellow', rating: 4.6, orders: 890, revenue: '₹1,23,000', earnings: '₹49,200', status: 'active', since: 'Jan 2026', staff: 2 },
  { id: '3', name: 'Amit Patel', phone: '+91 96xxx 33333', email: 'amit@partner.com', station: 'Kashmere Gate', line: 'Red/Yellow/Violet', rating: 4.5, orders: 678, revenue: '₹89,000', earnings: '₹35,600', status: 'active', since: 'Feb 2026', staff: 2 },
  { id: '4', name: 'Neha Gupta', phone: '+91 95xxx 44444', email: 'neha@partner.com', station: 'Hauz Khas', line: 'Yellow/Magenta', rating: 4.3, orders: 456, revenue: '₹56,000', earnings: '₹22,400', status: 'active', since: 'Feb 2026', staff: 1 },
  { id: '5', name: 'Rajesh Kumar', phone: '+91 94xxx 55555', email: 'rajesh@partner.com', station: 'Dwarka Sector 21', line: 'Blue', rating: 0, orders: 0, revenue: '₹0', earnings: '₹0', status: 'onboarding', since: 'Mar 2026', staff: 0 },
];

export default function AdminPartnersPage() {
  const [partners, setPartners] = useState(initialPartners);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Partner | null>(null);
  const [editPartner, setEditPartner] = useState<Partner | null>(null);

  const filtered = partners.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.station.toLowerCase().includes(search.toLowerCase()));

  const statusColors: Record<string, string> = { active: 'bg-secondary/10 text-secondary', inactive: 'bg-destructive/10 text-destructive', onboarding: 'bg-golden/10 text-accent-foreground' };

  return (
    <AdminLayout active="Partners">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Partners</h1>
          <p className="text-sm text-muted-foreground">{partners.length} station partners</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="hero"><Plus className="h-4 w-4 mr-2" /> Add Partner</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader><DialogTitle>Add New Partner</DialogTitle></DialogHeader>
            <div className="space-y-4 mt-4">
              <div><label className="text-sm font-medium mb-1 block">Name</label><Input placeholder="Partner name" /></div>
              <div><label className="text-sm font-medium mb-1 block">Email</label><Input placeholder="email@partner.com" /></div>
              <div><label className="text-sm font-medium mb-1 block">Phone</label><Input placeholder="+91 xxxxx xxxxx" /></div>
              <div><label className="text-sm font-medium mb-1 block">Station</label><Input placeholder="Metro station name" /></div>
              <div><label className="text-sm font-medium mb-1 block">Metro Line</label><Input placeholder="e.g. Blue/Yellow" /></div>
              <Button variant="hero" className="w-full" onClick={() => toast.success('Partner added successfully')}>
                <Plus className="h-4 w-4 mr-2" /> Add Partner
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search partners..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {filtered.map(p => (
          <Card key={p.id} className="shadow-soft hover:shadow-card transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-display font-semibold">{p.name}</h3>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1"><MapPin className="h-3 w-3" /> {p.station} · {p.line}</div>
                </div>
                <Badge className={`text-xs ${statusColors[p.status]}`}>{p.status}</Badge>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center mb-3">
                <div className="bg-muted/50 rounded-lg p-2"><p className="font-bold text-lg">{p.orders}</p><p className="text-[10px] text-muted-foreground">Orders</p></div>
                <div className="bg-muted/50 rounded-lg p-2"><p className="font-bold text-sm">{p.revenue}</p><p className="text-[10px] text-muted-foreground">Revenue</p></div>
                <div className="bg-muted/50 rounded-lg p-2"><p className="font-bold text-sm">{p.earnings}</p><p className="text-[10px] text-muted-foreground">Earnings</p></div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1"><Star className="h-3 w-3 fill-golden text-golden" /> {p.rating || '—'}</div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" onClick={() => setSelected(p)}><Eye className="h-3 w-3 mr-1" /> View</Button>
                  <Button variant="ghost" size="sm" onClick={() => setEditPartner(p)}><Edit className="h-3 w-3 mr-1" /> Edit</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* View Detail Dialog */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-md">
          {selected && (
            <>
              <DialogHeader><DialogTitle>{selected.name}</DialogTitle></DialogHeader>
              <div className="space-y-3 mt-2 text-sm">
                <div className="flex items-center gap-2"><Mail className="h-3 w-3 text-muted-foreground" /> {selected.email}</div>
                <div className="flex items-center gap-2"><Phone className="h-3 w-3 text-muted-foreground" /> {selected.phone}</div>
                <div className="flex items-center gap-2"><MapPin className="h-3 w-3 text-muted-foreground" /> {selected.station} ({selected.line})</div>
                <Separator />
                <div className="grid grid-cols-2 gap-3">
                  <div><p className="text-muted-foreground text-xs">Total Orders</p><p className="font-bold">{selected.orders}</p></div>
                  <div><p className="text-muted-foreground text-xs">Revenue</p><p className="font-bold">{selected.revenue}</p></div>
                  <div><p className="text-muted-foreground text-xs">Earnings (40%)</p><p className="font-bold text-secondary">{selected.earnings}</p></div>
                  <div><p className="text-muted-foreground text-xs">Staff</p><p className="font-bold">{selected.staff}</p></div>
                  <div><p className="text-muted-foreground text-xs">Rating</p><p className="font-bold">{selected.rating || '—'} ⭐</p></div>
                  <div><p className="text-muted-foreground text-xs">Since</p><p className="font-bold">{selected.since}</p></div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={!!editPartner} onOpenChange={() => setEditPartner(null)}>
        <DialogContent className="max-w-lg">
          {editPartner && (
            <>
              <DialogHeader><DialogTitle>Edit: {editPartner.name}</DialogTitle></DialogHeader>
              <div className="space-y-4 mt-4">
                <div><label className="text-sm font-medium mb-1 block">Name</label><Input defaultValue={editPartner.name} /></div>
                <div><label className="text-sm font-medium mb-1 block">Email</label><Input defaultValue={editPartner.email} /></div>
                <div><label className="text-sm font-medium mb-1 block">Phone</label><Input defaultValue={editPartner.phone} /></div>
                <div><label className="text-sm font-medium mb-1 block">Station</label><Input defaultValue={editPartner.station} /></div>
                <div><label className="text-sm font-medium mb-1 block">Staff Count</label><Input type="number" defaultValue={editPartner.staff} /></div>
                <Button variant="hero" className="w-full" onClick={() => { toast.success('Partner updated'); setEditPartner(null); }}>Save Changes</Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
