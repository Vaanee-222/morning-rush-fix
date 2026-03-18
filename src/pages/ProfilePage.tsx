import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Edit, Camera, Instagram, Twitter, Youtube, MapPin, Phone, Mail, Star, ShoppingBag, Gift, Heart, Settings, LogOut, Trash2, Bell, Shield, Link as LinkIcon } from 'lucide-react';

export default function ProfilePage() {
  const [editing, setEditing] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-8 max-w-4xl">
        {/* Profile Header */}
        <Card className="shadow-elevated mb-6 overflow-hidden">
          <div className="gradient-sunrise h-32 relative">
            <Button variant="ghost" size="icon" className="absolute top-3 right-3 text-primary-foreground"><Camera className="h-4 w-4" /></Button>
          </div>
          <CardContent className="p-6 -mt-16 relative">
            <div className="flex items-end gap-4 mb-4">
              <div className="w-24 h-24 rounded-full border-4 border-card bg-muted flex items-center justify-center">
                <User className="h-10 w-10 text-muted-foreground" />
              </div>
              <div className="flex-1 pb-1">
                <div className="flex items-center gap-2">
                  <h1 className="font-display text-2xl font-bold">Priya Sharma</h1>
                  <Badge className="bg-persona-millennial/10 text-persona-millennial">💪 Protein Hustler</Badge>
                </div>
                <p className="text-sm text-muted-foreground">Member since March 2026</p>
              </div>
              <Button variant="outline" size="sm" onClick={() => setEditing(!editing)}>
                <Edit className="h-4 w-4 mr-1" /> {editing ? 'Save' : 'Edit'}
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4 mt-4">
              {[
                { icon: ShoppingBag, label: 'Orders', value: '47' },
                { icon: Star, label: 'Avg Rating', value: '4.8' },
                { icon: Gift, label: 'Referrals', value: '5' },
                { icon: Heart, label: 'Favorites', value: '12' },
              ].map(s => (
                <div key={s.label} className="text-center p-3 bg-muted/50 rounded-lg">
                  <s.icon className="h-4 w-4 mx-auto text-muted-foreground mb-1" />
                  <p className="font-display font-bold">{s.value}</p>
                  <p className="text-[10px] text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="personal">
          <TabsList className="w-full justify-start mb-6">
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="social">Social & Experience</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>

          <TabsContent value="personal">
            <Card className="shadow-soft">
              <CardContent className="p-6 space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div><label className="text-sm font-medium mb-1 block">Full Name</label><Input defaultValue="Priya Sharma" disabled={!editing} /></div>
                  <div><label className="text-sm font-medium mb-1 block">Email</label><Input defaultValue="priya@example.com" disabled={!editing} /></div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div><label className="text-sm font-medium mb-1 block">Phone</label><Input defaultValue="+91 98765 43210" disabled /></div>
                  <div><label className="text-sm font-medium mb-1 block">Date of Birth</label><Input type="date" disabled={!editing} /></div>
                </div>
                <div><label className="text-sm font-medium mb-1 block">Preferred Station</label><Input defaultValue="Rajiv Chowk" disabled={!editing} /></div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="social">
            <Card className="shadow-soft mb-6">
              <CardContent className="p-6">
                <h3 className="font-display font-semibold mb-4">Social Media</h3>
                <div className="space-y-3">
                  {[
                    { icon: Instagram, label: 'Instagram', placeholder: '@priya_eats' },
                    { icon: Twitter, label: 'Twitter/X', placeholder: '@priya_sharma' },
                    { icon: Youtube, label: 'YouTube', placeholder: 'channel URL' },
                  ].map(s => (
                    <div key={s.label} className="flex items-center gap-3">
                      <s.icon className="h-5 w-5 text-muted-foreground shrink-0" />
                      <Input placeholder={s.placeholder} disabled={!editing} className="flex-1" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Testimonial Video */}
            <Card className="shadow-soft">
              <CardContent className="p-6">
                <h3 className="font-display font-semibold mb-2">Share Your Experience 🎥</h3>
                <p className="text-sm text-muted-foreground mb-4">Upload a video testimonial. Once approved by admin, it'll appear on our Experience page!</p>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <Camera className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">Upload video (max 2 min, MP4)</p>
                  <Button variant="outline" className="mt-3">Choose File</Button>
                </div>
                <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">my-breakfast-story.mp4</p>
                      <p className="text-xs text-muted-foreground">Uploaded Mar 15, 2026</p>
                    </div>
                    <Badge className="bg-golden/10 text-accent-foreground">Pending Approval</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preferences">
            <Card className="shadow-soft">
              <CardContent className="p-6 space-y-4">
                <h3 className="font-display font-semibold mb-2">Dietary Preferences</h3>
                {[
                  { label: 'Vegetarian', desc: 'Only show vegetarian items' },
                  { label: 'Vegan', desc: 'Exclude all animal products' },
                  { label: 'Gluten Free', desc: 'Filter out gluten items' },
                  { label: 'Nut Allergy', desc: 'Exclude nut-containing items' },
                  { label: 'Dairy Free', desc: 'No dairy products' },
                ].map(p => (
                  <div key={p.label} className="flex items-center justify-between py-2">
                    <div>
                      <p className="text-sm font-medium">{p.label}</p>
                      <p className="text-xs text-muted-foreground">{p.desc}</p>
                    </div>
                    <Switch />
                  </div>
                ))}
                <Separator />
                <h3 className="font-display font-semibold">Spice Level</h3>
                <div className="flex gap-2">
                  {['Mild 🌶️', 'Medium 🌶️🌶️', 'Spicy 🌶️🌶️🌶️'].map(l => (
                    <Button key={l} variant="outline" size="sm">{l}</Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card className="shadow-soft">
              <CardContent className="p-6 space-y-4">
                {[
                  { label: 'WhatsApp Updates', desc: 'Order confirmations & reminders' },
                  { label: 'Email Newsletters', desc: 'Weekly recipes & offers' },
                  { label: 'SMS Alerts', desc: 'Critical order updates only' },
                  { label: 'Pickup Reminders', desc: '15 min before pickup notification' },
                  { label: 'Promotional Messages', desc: 'Special offers & new items' },
                ].map(n => (
                  <div key={n.label} className="flex items-center justify-between py-2">
                    <div>
                      <p className="text-sm font-medium">{n.label}</p>
                      <p className="text-xs text-muted-foreground">{n.desc}</p>
                    </div>
                    <Switch defaultChecked={n.label !== 'Promotional Messages'} />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="account">
            <Card className="shadow-soft">
              <CardContent className="p-6 space-y-4">
                <Button variant="outline" className="w-full justify-start"><Shield className="h-4 w-4 mr-2" /> Change Password</Button>
                <Button variant="outline" className="w-full justify-start"><LinkIcon className="h-4 w-4 mr-2" /> Connected Accounts</Button>
                <Button variant="outline" className="w-full justify-start"><LogOut className="h-4 w-4 mr-2" /> Log Out</Button>
                <Separator />
                <Button variant="outline" className="w-full justify-start text-destructive"><Trash2 className="h-4 w-4 mr-2" /> Delete Account</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
}
