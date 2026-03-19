import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Mail, Phone, Shield, Key, LogOut, Bell, Clock, Monitor, MapPin, Save, Camera } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function AdminProfilePage() {
  const { toast } = useToast();
  const [profile, setProfile] = useState({
    name: 'Admin User',
    email: 'admin@7amclub.in',
    phone: '+91 98765 00001',
    role: 'Super Admin',
  });

  const handleSave = () => {
    toast({ title: 'Profile Updated', description: 'Your changes have been saved successfully.' });
  };

  return (
    <AdminLayout active="Profile">
      <div className="max-w-4xl">
        <h1 className="font-display text-2xl font-bold mb-6">Admin Profile</h1>

        <Tabs defaultValue="profile">
          <TabsList className="mb-6">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="activity">Activity Log</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card className="shadow-soft mb-6">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full gradient-fresh flex items-center justify-center text-2xl font-bold text-secondary-foreground">A</div>
                    <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-primary rounded-full flex items-center justify-center text-primary-foreground shadow-md">
                      <Camera className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <div>
                    <h2 className="font-display text-xl font-bold">{profile.name}</h2>
                    <Badge className="bg-primary/10 text-primary">Super Admin</Badge>
                    <p className="text-xs text-muted-foreground mt-1">Member since Jan 2025</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-1.5 flex items-center gap-1.5"><User className="h-3.5 w-3.5 text-muted-foreground" /> Full Name</label>
                      <Input value={profile.name} onChange={e => setProfile(p => ({...p, name: e.target.value}))} />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 flex items-center gap-1.5"><Mail className="h-3.5 w-3.5 text-muted-foreground" /> Email</label>
                      <Input value={profile.email} onChange={e => setProfile(p => ({...p, email: e.target.value}))} />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-1.5 flex items-center gap-1.5"><Phone className="h-3.5 w-3.5 text-muted-foreground" /> Phone</label>
                      <Input value={profile.phone} onChange={e => setProfile(p => ({...p, phone: e.target.value}))} />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 flex items-center gap-1.5"><Shield className="h-3.5 w-3.5 text-muted-foreground" /> Role</label>
                      <Input value={profile.role} disabled className="bg-muted" />
                    </div>
                  </div>
                  <Button variant="hero" onClick={handleSave}><Save className="h-4 w-4 mr-2" /> Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card className="shadow-soft mb-6">
              <CardContent className="p-6">
                <h3 className="font-display font-semibold mb-4">Password</h3>
                <div className="space-y-4 max-w-md">
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Current Password</label>
                    <Input type="password" placeholder="Enter current password" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">New Password</label>
                    <Input type="password" placeholder="Enter new password" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Confirm New Password</label>
                    <Input type="password" placeholder="Confirm new password" />
                  </div>
                  <Button variant="hero" onClick={() => toast({ title: 'Password Updated', description: 'Your password has been changed.' })}>
                    <Key className="h-4 w-4 mr-2" /> Update Password
                  </Button>
                </div>
                <Separator className="my-6" />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Two-Factor Authentication</p>
                    <p className="text-xs text-muted-foreground">Extra security for your account</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card className="shadow-soft">
              <CardContent className="p-6">
                <h3 className="font-display font-semibold mb-4">Notification Preferences</h3>
                {[
                  { label: 'Order Alerts', desc: 'Real-time order notifications', default: true },
                  { label: 'Low Stock Alerts', desc: 'When inventory drops below threshold', default: true },
                  { label: 'Payment Failures', desc: 'Failed subscription payments', default: true },
                  { label: 'Daily Reports', desc: 'Morning summary email', default: true },
                  { label: 'New Customer Signups', desc: 'When new users register', default: false },
                  { label: 'Beta Eater Feedback', desc: 'New feedback from beta testers', default: true },
                  { label: 'Partner Updates', desc: 'Station partner notifications', default: false },
                ].map(n => (
                  <div key={n.label} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                    <div>
                      <p className="text-sm font-medium">{n.label}</p>
                      <p className="text-xs text-muted-foreground">{n.desc}</p>
                    </div>
                    <Switch defaultChecked={n.default} />
                  </div>
                ))}
                <Button variant="hero" className="mt-4" onClick={() => toast({ title: 'Preferences Saved' })}>
                  <Bell className="h-4 w-4 mr-2" /> Save Preferences
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity">
            <Card className="shadow-soft">
              <CardContent className="p-6">
                <h3 className="font-display font-semibold mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {[
                    { action: 'Logged in', time: 'Today, 6:45 AM', ip: '103.21.xx.xx', device: 'Chrome · Delhi', icon: Monitor },
                    { action: 'Updated menu item pricing', time: 'Yesterday, 4:30 PM', ip: '103.21.xx.xx', device: 'Chrome · Delhi', icon: Clock },
                    { action: 'Approved beta feedback #42', time: 'Yesterday, 2:15 PM', ip: '103.21.xx.xx', device: 'Chrome · Delhi', icon: Clock },
                    { action: 'Added new station: Karol Bagh', time: 'Mar 16, 11:00 AM', ip: '103.21.xx.xx', device: 'Safari · Mumbai', icon: MapPin },
                    { action: 'Changed password', time: 'Mar 14, 9:00 AM', ip: '103.21.xx.xx', device: 'Chrome · Delhi', icon: Key },
                    { action: 'Updated notification settings', time: 'Mar 12, 3:30 PM', ip: '103.21.xx.xx', device: 'Chrome · Delhi', icon: Bell },
                  ].map((log, i) => (
                    <div key={i} className="flex items-start gap-3 py-2 border-b border-border last:border-0">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center mt-0.5">
                        <log.icon className="h-3.5 w-3.5 text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{log.action}</p>
                        <p className="text-xs text-muted-foreground">{log.time} · {log.device}</p>
                      </div>
                      <span className="text-xs text-muted-foreground">{log.ip}</span>
                    </div>
                  ))}
                </div>
                <Separator className="my-4" />
                <Button variant="outline" className="text-destructive"><LogOut className="h-4 w-4 mr-2" /> Log Out All Sessions</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
