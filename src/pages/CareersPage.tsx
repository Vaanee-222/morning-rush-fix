import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, ArrowRight } from 'lucide-react';

const openings = [
  { title: 'Station Manager', location: 'Delhi NCR', type: 'Full-time', dept: 'Operations' },
  { title: 'Kitchen Lead', location: 'Gurugram', type: 'Full-time', dept: 'Kitchen' },
  { title: 'Growth Marketing Intern', location: 'Remote', type: 'Internship', dept: 'Marketing' },
  { title: 'Full Stack Developer', location: 'Remote / Delhi', type: 'Full-time', dept: 'Engineering' },
  { title: 'Community Manager', location: 'Delhi NCR', type: 'Full-time', dept: 'Community' },
];

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-12 max-w-3xl">
        <div className="text-center mb-10">
          <h1 className="font-display text-4xl font-bold mb-3">Join the 7AM Club Team 🚀</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">We're building the future of commuter breakfast. If you're passionate about food, health, and making mornings better — we want you.</p>
        </div>
        <div className="space-y-4">
          {openings.map((job) => (
            <Card key={job.title} className="shadow-soft hover:shadow-card transition-shadow">
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <h3 className="font-display font-semibold">{job.title}</h3>
                  <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {job.location}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {job.type}</span>
                  </div>
                  <Badge variant="outline" className="mt-2 text-xs">{job.dept}</Badge>
                </div>
                <Button variant="ghost" size="icon"><ArrowRight className="h-4 w-4" /></Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-10 p-8 bg-muted/50 rounded-2xl">
          <p className="text-muted-foreground mb-2">Don't see your role?</p>
          <p className="font-display font-semibold mb-4">Send us your resume at <span className="text-primary">careers@7amclub.in</span></p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
