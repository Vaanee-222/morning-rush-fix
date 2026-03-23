import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, MapPin, Users, Flag, Eye, Edit, Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import AdminLayout from '@/components/admin/AdminLayout';
import { toast } from 'sonner';

const chapters = [
  { id: '1', name: 'Dwarka', area: 'West Delhi', status: 'active', members: 245, stations: 3, lead: 'Rajesh Kumar' },
  { id: '2', name: 'Rajiv Chowk', area: 'Central Delhi', status: 'active', members: 520, stations: 1, lead: 'Vikram Singh' },
  { id: '3', name: 'Hauz Khas', area: 'South Delhi', status: 'active', members: 312, stations: 2, lead: 'Neha Gupta' },
  { id: '4', name: 'Gurgaon Huda', area: 'Gurgaon', status: 'active', members: 380, stations: 2, lead: 'Sunita Rao' },
  { id: '5', name: 'Noida Sec 18', area: 'Noida', status: 'active', members: 234, stations: 2, lead: 'Ramesh Verma' },
  { id: '6', name: 'Chandni Chowk', area: 'Old Delhi', status: 'coming_soon', members: 145, stations: 1, lead: '—' },
  { id: '7', name: 'Laxmi Nagar', area: 'East Delhi', status: 'coming_soon', members: 92, stations: 1, lead: '—' },
  { id: '8', name: 'Rohini', area: 'North-West Delhi', status: 'active', members: 201, stations: 2, lead: 'Kavita Lal' },
];

const statusColors: Record<string, string> = {
  active: 'bg-secondary/10 text-secondary',
  coming_soon: 'bg-golden/10 text-accent-foreground',
  planned: 'bg-muted text-muted-foreground',
};

export default function AdminChaptersPage() {
  const [search, setSearch] = useState('');
  const filtered = chapters.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <AdminLayout active="Chapters">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Chapters</h1>
          <p className="text-sm text-muted-foreground">Manage local communities across Delhi NCR</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="hero"><Plus className="h-4 w-4 mr-2" /> Add Chapter</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader><DialogTitle>Add New Chapter</DialogTitle></DialogHeader>
            <div className="space-y-4 mt-4">
              <div><label className="text-sm font-medium mb-1 block">Chapter Name</label><Input placeholder="e.g. Saket" /></div>
              <div><label className="text-sm font-medium mb-1 block">Area</label><Input placeholder="e.g. South Delhi" /></div>
              <div><label className="text-sm font-medium mb-1 block">Chapter Lead</label><Input placeholder="Lead name" /></div>
              <Button variant="hero" className="w-full" onClick={() => toast.success('Chapter added!')}>
                <Plus className="h-4 w-4 mr-2" /> Create Chapter
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <Card className="shadow-soft"><CardContent className="p-5 flex items-center gap-3"><Flag className="h-8 w-8 text-primary" /><div><p className="text-sm text-muted-foreground">Total Chapters</p><p className="font-display text-2xl font-bold">{chapters.length}</p></div></CardContent></Card>
        <Card className="shadow-soft"><CardContent className="p-5 flex items-center gap-3"><MapPin className="h-8 w-8 text-secondary" /><div><p className="text-sm text-muted-foreground">Active</p><p className="font-display text-2xl font-bold">{chapters.filter(c => c.status === 'active').length}</p></div></CardContent></Card>
        <Card className="shadow-soft"><CardContent className="p-5 flex items-center gap-3"><Users className="h-8 w-8 text-golden" /><div><p className="text-sm text-muted-foreground">Total Members</p><p className="font-display text-2xl font-bold">{chapters.reduce((s, c) => s + c.members, 0).toLocaleString()}</p></div></CardContent></Card>
      </div>

      <div className="flex gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search chapters..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {filtered.map(c => (
          <Card key={c.id} className="shadow-soft hover:shadow-card transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-display font-semibold text-lg">{c.name}</h3>
                  <p className="text-xs text-muted-foreground">{c.area}</p>
                </div>
                <Badge className={`text-xs ${statusColors[c.status]}`}>{c.status === 'coming_soon' ? 'Coming Soon' : c.status}</Badge>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center mt-3">
                <div className="bg-muted/50 rounded-lg p-2"><p className="font-bold">{c.members}</p><p className="text-[10px] text-muted-foreground">Members</p></div>
                <div className="bg-muted/50 rounded-lg p-2"><p className="font-bold">{c.stations}</p><p className="text-[10px] text-muted-foreground">Stations</p></div>
                <div className="bg-muted/50 rounded-lg p-2"><p className="font-bold text-sm">{c.lead}</p><p className="text-[10px] text-muted-foreground">Lead</p></div>
              </div>
              <div className="flex gap-2 mt-3">
                <Button variant="outline" size="sm" className="flex-1"><Eye className="h-3 w-3 mr-1" /> View</Button>
                <Button variant="ghost" size="sm"><Edit className="h-3 w-3 mr-1" /> Edit</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </AdminLayout>
  );
}
