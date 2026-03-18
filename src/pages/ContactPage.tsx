import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone, MapPin, Clock, MessageCircle, Send } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-12 max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl font-bold mb-3">Get in Touch 👋</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">We'd love to hear from you. Whether it's feedback, partnership, or just saying hi.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="space-y-4">
            {[
              { icon: Mail, label: 'Email', value: 'hello@7amclub.in', desc: 'We reply within 24 hours' },
              { icon: Phone, label: 'Phone', value: '+91 11 4007 7777', desc: 'Mon-Sat, 7 AM - 7 PM' },
              { icon: MapPin, label: 'Office', value: 'WeWork, Connaught Place', desc: 'New Delhi, India' },
              { icon: MessageCircle, label: 'WhatsApp', value: '+91 98765 00007', desc: 'Quick support' },
            ].map(c => (
              <Card key={c.label} className="shadow-soft">
                <CardContent className="p-4 flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <c.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{c.label}</p>
                    <p className="text-sm text-primary">{c.value}</p>
                    <p className="text-xs text-muted-foreground">{c.desc}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact Form */}
          <Card className="shadow-elevated md:col-span-2">
            <CardContent className="p-6">
              <h2 className="font-display text-xl font-bold mb-6">Send us a Message</h2>
              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div><label className="text-sm font-medium mb-1 block">Name</label><Input placeholder="Your name" /></div>
                  <div><label className="text-sm font-medium mb-1 block">Email</label><Input placeholder="you@email.com" type="email" /></div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Subject</label>
                  <Input placeholder="What's this about?" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Category</label>
                  <div className="flex flex-wrap gap-2">
                    {['General', 'Feedback', 'Partnership', 'Bug Report', 'Press'].map(c => (
                      <Badge key={c} variant="outline" className="cursor-pointer hover:bg-primary/10">{c}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Message</label>
                  <Textarea placeholder="Tell us more..." rows={5} />
                </div>
                <Button variant="hero" className="w-full"><Send className="h-4 w-4 mr-2" /> Send Message</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
}
