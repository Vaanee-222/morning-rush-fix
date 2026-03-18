import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { User, Mail, Phone, Shield, Key, LogOut, Bell } from 'lucide-react';

export default function AdminProfilePage() {
  return (
    <AdminLayout active="Profile">
      <div className="max-w-3xl">
        <h1 className="font-display text-2xl font-bold mb-6">Admin Profile</h1>

        <Card className="shadow-soft mb-6">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full gradient-fresh flex items-center justify-center text-xl font-bold text-secondary-foreground">A</div>
              <div>
                <h2 className="font-display text-xl font-bold">Admin User</h2>
                <Badge className="bg-primary/10 text-primary">Super Admin</Badge>
              </div>
              <Button variant="outline" size="sm" className="ml-auto">Change Avatar</Button>
            </div>

            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div><label className="text-sm font-medium mb-1 block flex items-center gap-1"><User className="h-3 w-3" /> Full Name</label><Input defaultValue="Admin User" /></div>
                <div><label className="text-sm font-medium mb-1 block flex items-center gap-1"><Mail className="h-3 w-3" /> Email</label><Input defaultValue="admin@7amclub.in" /></div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div><label className="text-sm font-medium mb-1 block flex items-center gap-1"><Phone className="h-3 w-3" /> Phone</label><Input defaultValue="+91 98765 00001" /></div>
                <div><label className="text-sm font-medium mb-1 block flex items-center gap-1"><Shield className="h-3 w-3" /> Role</label><Input defaultValue="Super Admin" disabled /></div>
              </div>
              <Button variant="hero">Save Changes</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft mb-6">
          <CardContent className="p-6">
            <h3 className="font-display font-semibold mb-4">Security</h3>
            <div className="space-y-4">
              <Button variant="outline" className="w-full justify-start"><Key className="h-4 w-4 mr-2" /> Change Password</Button>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Two-Factor Authentication</p>
                  <p className="text-xs text-muted-foreground">Extra security for your account</p>
                </div>
                <Switch />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft mb-6">
          <CardContent className="p-6">
            <h3 className="font-display font-semibold mb-4">Notification Preferences</h3>
            {[
              { label: 'Order Alerts', desc: 'Real-time order notifications' },
              { label: 'Low Stock Alerts', desc: 'When inventory drops below threshold' },
              { label: 'Payment Failures', desc: 'Failed subscription payments' },
              { label: 'Daily Reports', desc: 'Morning summary email' },
            ].map(n => (
              <div key={n.label} className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm font-medium">{n.label}</p>
                  <p className="text-xs text-muted-foreground">{n.desc}</p>
                </div>
                <Switch defaultChecked />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="p-6">
            <h3 className="font-display font-semibold mb-4">Session</h3>
            <div className="space-y-2 text-sm text-muted-foreground mb-4">
              <p>Last login: Mar 18, 2026 at 6:45 AM</p>
              <p>IP: 103.21.xx.xx (Delhi, India)</p>
              <p>Browser: Chrome 120</p>
            </div>
            <Button variant="outline" className="text-destructive"><LogOut className="h-4 w-4 mr-2" /> Log Out</Button>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
