import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Save } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';

export default function AdminSettingsPage() {
  return (
    <AdminLayout active="Settings">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold">Settings</h1>
        <p className="text-sm text-muted-foreground">Configure your platform</p>
      </div>

      <Tabs defaultValue="general">
        <TabsList className="mb-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card className="shadow-soft">
            <CardContent className="p-6 space-y-6">
              <h3 className="font-display font-semibold">Store Information</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div><label className="text-sm font-medium block mb-1">Store Name</label><Input defaultValue="7AM Club" /></div>
                <div><label className="text-sm font-medium block mb-1">Support Email</label><Input defaultValue="support@7amclub.in" /></div>
                <div><label className="text-sm font-medium block mb-1">Support Phone</label><Input defaultValue="+91 11 xxxx xxxx" /></div>
                <div><label className="text-sm font-medium block mb-1">FSSAI License</label><Input defaultValue="10026071000123" /></div>
              </div>
              <Separator />
              <h3 className="font-display font-semibold">Feature Flags</h3>
              <div className="space-y-3">
                {[
                  { label: 'Beta Eater Program', desc: 'Allow applications for beta testing', on: true },
                  { label: 'Referral System', desc: 'Enable refer & earn rewards', on: true },
                  { label: 'WhatsApp Notifications', desc: 'Send order updates via WhatsApp', on: true },
                  { label: 'Maintenance Mode', desc: 'Take the platform offline temporarily', on: false },
                ].map((f) => (
                  <div key={f.label} className="flex items-center justify-between">
                    <div><p className="text-sm font-medium">{f.label}</p><p className="text-xs text-muted-foreground">{f.desc}</p></div>
                    <Switch defaultChecked={f.on} />
                  </div>
                ))}
              </div>
              <Button variant="hero"><Save className="h-4 w-4 mr-2" /> Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders">
          <Card className="shadow-soft">
            <CardContent className="p-6 space-y-4">
              <div><label className="text-sm font-medium block mb-1">Minimum Pre-order Time (hours)</label><Input type="number" defaultValue="24" /></div>
              <div><label className="text-sm font-medium block mb-1">Order Cutoff Time</label><Input defaultValue="11:00 PM" /></div>
              <div><label className="text-sm font-medium block mb-1">Max Orders per Slot</label><Input type="number" defaultValue="50" /></div>
              <div><label className="text-sm font-medium block mb-1">Pickup Window (minutes)</label><Input type="number" defaultValue="15" /></div>
              <Button variant="hero"><Save className="h-4 w-4 mr-2" /> Save</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments">
          <Card className="shadow-soft">
            <CardContent className="p-6 space-y-4">
              <div><label className="text-sm font-medium block mb-1">Razorpay Key ID</label><Input defaultValue="rzp_live_xxxx" type="password" /></div>
              <div><label className="text-sm font-medium block mb-1">Razorpay Secret</label><Input defaultValue="••••••••" type="password" /></div>
              <div><label className="text-sm font-medium block mb-1">GST Number</label><Input defaultValue="07AAACXXXXXXX1Z5" /></div>
              <Button variant="hero"><Save className="h-4 w-4 mr-2" /> Save</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="shadow-soft">
            <CardContent className="p-6 space-y-4">
              {[
                { label: 'Order Confirmation', desc: 'Send when order is placed' },
                { label: 'Order Ready Alert', desc: 'Notify when pickup is ready' },
                { label: 'Subscription Renewal Reminder', desc: '3 days before renewal' },
                { label: 'Promotional Messages', desc: 'Weekly deals and offers' },
              ].map((n) => (
                <div key={n.label} className="flex items-center justify-between">
                  <div><p className="text-sm font-medium">{n.label}</p><p className="text-xs text-muted-foreground">{n.desc}</p></div>
                  <Switch defaultChecked />
                </div>
              ))}
              <Button variant="hero"><Save className="h-4 w-4 mr-2" /> Save</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
}
