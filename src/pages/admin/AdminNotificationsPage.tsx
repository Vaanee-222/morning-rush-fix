import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Send, Plus, Bell, Users, Clock, Megaphone, Gift, AlertTriangle, CheckCircle } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { toast } from 'sonner';

interface Notification {
  id: string; title: string; message: string; type: 'promo' | 'update' | 'alert' | 'offer'; audience: string; sentAt: string; status: 'sent' | 'scheduled' | 'draft'; recipients: number; opened: number;
}

const notifications: Notification[] = [
  { id: '1', title: '🎉 Weekend Special: 20% Off!', message: 'Get 20% off on all smoothie bowls this weekend. Use code WEEKEND20.', type: 'promo', audience: 'All Users', sentAt: '2026-03-17 09:00', status: 'sent', recipients: 342, opened: 198 },
  { id: '2', title: '📍 New Station: Dwarka Sec 21', message: 'We\'re now at Dwarka Sector 21! Order your breakfast starting next week.', type: 'update', audience: 'All Users', sentAt: '2026-03-16 10:00', status: 'sent', recipients: 342, opened: 267 },
  { id: '3', title: '⚡ Flash Sale Tomorrow', message: 'Energy bars at flat ₹49 each. Tomorrow only, 7-9 AM.', type: 'offer', audience: 'Subscribers', sentAt: '2026-03-18 08:00', status: 'scheduled', recipients: 198, opened: 0 },
  { id: '4', title: '🔔 Subscription Renewal', message: 'Your subscription renews in 3 days. Update payment method if needed.', type: 'alert', audience: 'Expiring Subs', sentAt: '—', status: 'draft', recipients: 0, opened: 0 },
];

const typeIcons: Record<string, React.ReactNode> = {
  promo: <Megaphone className="h-4 w-4 text-primary" />,
  update: <Bell className="h-4 w-4 text-secondary" />,
  alert: <AlertTriangle className="h-4 w-4 text-golden" />,
  offer: <Gift className="h-4 w-4 text-primary" />,
};

const typeColors: Record<string, string> = {
  promo: 'bg-primary/10 text-primary',
  update: 'bg-secondary/10 text-secondary',
  alert: 'bg-golden/10 text-accent-foreground',
  offer: 'bg-primary/10 text-primary',
};

const statusColors: Record<string, string> = {
  sent: 'bg-secondary/10 text-secondary',
  scheduled: 'bg-golden/10 text-accent-foreground',
  draft: 'bg-muted text-muted-foreground',
};

export default function AdminNotificationsPage() {
  const [tab, setTab] = useState('all');

  const filtered = tab === 'all' ? notifications : notifications.filter(n => n.status === tab);

  return (
    <AdminLayout active="Notifications">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Push Notifications</h1>
          <p className="text-sm text-muted-foreground">Send updates, offers, and alerts to users</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="hero"><Plus className="h-4 w-4 mr-2" /> Create Notification</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader><DialogTitle>Create Push Notification</DialogTitle></DialogHeader>
            <div className="space-y-4 mt-4">
              <div><label className="text-sm font-medium mb-1 block">Title</label><Input placeholder="e.g. 🎉 Weekend Special!" /></div>
              <div><label className="text-sm font-medium mb-1 block">Message</label><Textarea placeholder="Notification body text..." rows={3} /></div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium mb-1 block">Type</label>
                  <Select defaultValue="promo">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="promo">Promotional</SelectItem>
                      <SelectItem value="update">Update</SelectItem>
                      <SelectItem value="offer">Offer</SelectItem>
                      <SelectItem value="alert">Alert</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Audience</label>
                  <Select defaultValue="all">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Users</SelectItem>
                      <SelectItem value="subscribers">Subscribers Only</SelectItem>
                      <SelectItem value="non-subscribers">Non-Subscribers</SelectItem>
                      <SelectItem value="inactive">Inactive Users</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Schedule (optional)</label>
                <Input type="datetime-local" />
              </div>
              <div className="flex items-center gap-3">
                <Switch id="push" defaultChecked /><label htmlFor="push" className="text-sm">Push Notification</label>
                <Switch id="email" /><label htmlFor="email" className="text-sm">Email</label>
                <Switch id="whatsapp" /><label htmlFor="whatsapp" className="text-sm">WhatsApp</label>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={() => toast.success('Saved as draft')}>Save Draft</Button>
                <Button variant="hero" className="flex-1" onClick={() => toast.success('Notification sent!')}>
                  <Send className="h-4 w-4 mr-2" /> Send Now
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-4 gap-4 mb-6">
        <Card className="shadow-soft"><CardContent className="p-4 text-center"><p className="text-2xl font-bold font-display">{notifications.filter(n => n.status === 'sent').length}</p><p className="text-xs text-muted-foreground">Sent</p></CardContent></Card>
        <Card className="shadow-soft"><CardContent className="p-4 text-center"><p className="text-2xl font-bold font-display">{notifications.filter(n => n.status === 'scheduled').length}</p><p className="text-xs text-muted-foreground">Scheduled</p></CardContent></Card>
        <Card className="shadow-soft"><CardContent className="p-4 text-center"><p className="text-2xl font-bold font-display">{notifications.filter(n => n.status === 'draft').length}</p><p className="text-xs text-muted-foreground">Drafts</p></CardContent></Card>
        <Card className="shadow-soft"><CardContent className="p-4 text-center"><p className="text-2xl font-bold font-display">58%</p><p className="text-xs text-muted-foreground">Avg Open Rate</p></CardContent></Card>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="sent">Sent</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          <TabsTrigger value="draft">Drafts</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="space-y-3">
        {filtered.map(n => (
          <Card key={n.id} className="shadow-soft hover:shadow-card transition-shadow">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="flex-shrink-0">{typeIcons[n.type]}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-display font-semibold text-sm truncate">{n.title}</h3>
                  <Badge className={`text-[10px] ${typeColors[n.type]}`}>{n.type}</Badge>
                  <Badge className={`text-[10px] ${statusColors[n.status]}`}>{n.status}</Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5 truncate">{n.message}</p>
                <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {n.audience}</span>
                  {n.status === 'sent' && <span className="flex items-center gap-1"><CheckCircle className="h-3 w-3" /> {n.recipients} sent · {n.opened} opened</span>}
                  {n.sentAt !== '—' && <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {n.sentAt}</span>}
                </div>
              </div>
              <div className="flex gap-1">
                {n.status === 'draft' && <Button variant="hero" size="sm"><Send className="h-3 w-3 mr-1" /> Send</Button>}
                {n.status === 'scheduled' && <Button variant="outline" size="sm">Cancel</Button>}
                {n.status === 'sent' && <Button variant="ghost" size="sm">Resend</Button>}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </AdminLayout>
  );
}
