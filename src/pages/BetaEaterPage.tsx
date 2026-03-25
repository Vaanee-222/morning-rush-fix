import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Check, Camera, Instagram, Star, Users, Utensils } from 'lucide-react';

const perks = [
  { icon: Utensils, title: '3 Free Meals/Month', desc: 'Try new items before anyone else — on us.' },
  { icon: Camera, title: 'Be Featured', desc: 'Your photos on our socials & in-app.' },
  { icon: Star, title: 'Shape the Menu', desc: 'Vote on upcoming items, your feedback drives decisions.' },
  { icon: Users, title: 'Exclusive Community', desc: 'Private WhatsApp group with the founding team.' },
];

export default function BetaEaterPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-12 max-w-3xl">
        <div className="text-center mb-10">
          <Badge className="mb-4 bg-persona-genz/10 text-persona-genz border-persona-genz/20">Applications Open</Badge>
          <h1 className="font-display text-4xl font-bold mb-3">Become a Beta Eater 🍽️</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">Join our inner circle of food lovers who taste-test new items, share honest feedback, and help shape the Gym Cafe menu.</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          {perks.map((p) => (
            <Card key={p.title} className="shadow-soft">
              <CardContent className="p-5 flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <p.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-sm">{p.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{p.desc}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="shadow-elevated">
          <CardContent className="p-6">
            <h2 className="font-display text-xl font-bold mb-6">Apply Now</h2>
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div><label className="text-sm font-medium mb-1 block">Full Name</label><Input placeholder="Your name" /></div>
                <div><label className="text-sm font-medium mb-1 block">Phone Number</label><Input placeholder="+91 ..." /></div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div><label className="text-sm font-medium mb-1 block">Instagram Handle</label><Input placeholder="@yourhandle" /></div>
                <div><label className="text-sm font-medium mb-1 block">Follower Count</label><Input placeholder="e.g. 1200" type="number" /></div>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Why should we pick you? (min 100 words)</label>
                <Textarea placeholder="Tell us about your love for food, breakfast habits, and why you'd make a great Beta Eater..." rows={5} />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Upload a breakfast photo</label>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <Camera className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">Click to upload or drag & drop</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <p className="text-sm text-muted-foreground">I agree to post a minimum of 2 Instagram stories per week featuring Gym Cafe meals.</p>
              </div>
              <Button variant="hero" className="w-full">Submit Application</Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
}
