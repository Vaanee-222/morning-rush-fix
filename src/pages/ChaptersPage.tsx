import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { MapPin, Search, Users, Star, Clock, ChevronRight, Sparkles } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { toast } from 'sonner';

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

interface Chapter {
  id: string; name: string; area: string; status: 'active' | 'coming_soon' | 'planned'; members: number; stations: string[]; lead: string; rating: number;
}

const chapters: Chapter[] = [
  { id: '1', name: 'Dwarka', area: 'West Delhi', status: 'active', members: 245, stations: ['Dwarka Sec 21', 'Dwarka Mor', 'Uttam Nagar East'], lead: 'Rajesh Kumar', rating: 4.7 },
  { id: '2', name: 'Uttam Nagar', area: 'West Delhi', status: 'active', members: 189, stations: ['Uttam Nagar West', 'Uttam Nagar East'], lead: 'Sunil Verma', rating: 4.5 },
  { id: '3', name: 'Najafgarh', area: 'South-West Delhi', status: 'coming_soon', members: 78, stations: ['Najafgarh Metro'], lead: '—', rating: 0 },
  { id: '4', name: 'Rajiv Chowk', area: 'Central Delhi', status: 'active', members: 520, stations: ['Rajiv Chowk'], lead: 'Vikram Singh', rating: 4.8 },
  { id: '5', name: 'Connaught Place', area: 'Central Delhi', status: 'active', members: 410, stations: ['Rajiv Chowk', 'Barakhamba Road'], lead: 'Anita Sharma', rating: 4.6 },
  { id: '6', name: 'Hauz Khas', area: 'South Delhi', status: 'active', members: 312, stations: ['Hauz Khas', 'Green Park'], lead: 'Neha Gupta', rating: 4.3 },
  { id: '7', name: 'Saket', area: 'South Delhi', status: 'active', members: 198, stations: ['Saket', 'Malviya Nagar'], lead: 'Priya Mehra', rating: 4.4 },
  { id: '8', name: 'Lajpat Nagar', area: 'South Delhi', status: 'coming_soon', members: 95, stations: ['Lajpat Nagar'], lead: '—', rating: 0 },
  { id: '9', name: 'Kashmere Gate', area: 'North Delhi', status: 'active', members: 278, stations: ['Kashmere Gate'], lead: 'Amit Patel', rating: 4.5 },
  { id: '10', name: 'Chandni Chowk', area: 'Old Delhi', status: 'coming_soon', members: 145, stations: ['Chandni Chowk'], lead: '—', rating: 0 },
  { id: '11', name: 'Pitampura', area: 'North-West Delhi', status: 'active', members: 167, stations: ['Netaji Subhash Place', 'Kohat Enclave'], lead: 'Mohan Das', rating: 4.2 },
  { id: '12', name: 'Rohini', area: 'North-West Delhi', status: 'active', members: 201, stations: ['Rohini West', 'Rohini East'], lead: 'Kavita Lal', rating: 4.3 },
  { id: '13', name: 'Janakpuri', area: 'West Delhi', status: 'active', members: 156, stations: ['Janakpuri West'], lead: 'Sanjay Mishra', rating: 4.1 },
  { id: '14', name: 'Noida Sector 18', area: 'Noida', status: 'active', members: 234, stations: ['Noida Sector 18', 'Noida City Centre'], lead: 'Ramesh Verma', rating: 4.4 },
  { id: '15', name: 'Noida Electronic City', area: 'Noida', status: 'planned', members: 0, stations: ['Noida Electronic City'], lead: '—', rating: 0 },
  { id: '16', name: 'Gurgaon Huda City', area: 'Gurgaon', status: 'active', members: 380, stations: ['Huda City Centre', 'IFFCO Chowk'], lead: 'Sunita Rao', rating: 4.6 },
  { id: '17', name: 'Gurgaon Cyber City', area: 'Gurgaon', status: 'coming_soon', members: 120, stations: ['Guru Dronacharya'], lead: '—', rating: 0 },
  { id: '18', name: 'Vaishali', area: 'Ghaziabad', status: 'planned', members: 0, stations: ['Vaishali'], lead: '—', rating: 0 },
  { id: '19', name: 'Rajouri Garden', area: 'West Delhi', status: 'active', members: 143, stations: ['Rajouri Garden'], lead: 'Deepak Yadav', rating: 4.2 },
  { id: '20', name: 'Nehru Place', area: 'South Delhi', status: 'active', members: 176, stations: ['Nehru Place', 'Kalkaji Mandir'], lead: 'Anil Sharma', rating: 4.3 },
  { id: '21', name: 'Botanical Garden', area: 'Noida', status: 'active', members: 145, stations: ['Botanical Garden'], lead: 'Karan Singh', rating: 4.1 },
  { id: '22', name: 'Karol Bagh', area: 'Central Delhi', status: 'coming_soon', members: 88, stations: ['Karol Bagh'], lead: '—', rating: 0 },
  { id: '23', name: 'Jhandewalan', area: 'Central Delhi', status: 'planned', members: 0, stations: ['Jhandewalan'], lead: '—', rating: 0 },
  { id: '24', name: 'INA', area: 'South Delhi', status: 'active', members: 134, stations: ['INA'], lead: 'Meera Reddy', rating: 4.4 },
  { id: '25', name: 'Moti Nagar', area: 'West Delhi', status: 'planned', members: 0, stations: ['Moti Nagar'], lead: '—', rating: 0 },
  { id: '26', name: 'Mayur Vihar', area: 'East Delhi', status: 'coming_soon', members: 67, stations: ['Mayur Vihar Phase 1'], lead: '—', rating: 0 },
  { id: '27', name: 'Preet Vihar', area: 'East Delhi', status: 'planned', members: 0, stations: ['Preet Vihar'], lead: '—', rating: 0 },
  { id: '28', name: 'Laxmi Nagar', area: 'East Delhi', status: 'coming_soon', members: 92, stations: ['Laxmi Nagar'], lead: '—', rating: 0 },
  { id: '29', name: 'Mundka', area: 'West Delhi', status: 'planned', members: 0, stations: ['Mundka'], lead: '—', rating: 0 },
  { id: '30', name: 'Palam', area: 'South-West Delhi', status: 'planned', members: 0, stations: ['Palam'], lead: '—', rating: 0 },
  { id: '31', name: 'Model Town', area: 'North Delhi', status: 'coming_soon', members: 54, stations: ['Model Town'], lead: '—', rating: 0 },
  { id: '32', name: 'Tagore Garden', area: 'West Delhi', status: 'active', members: 112, stations: ['Tagore Garden'], lead: 'Rahul Kumar', rating: 4.0 },
];

const statusColors: Record<string, string> = {
  active: 'bg-secondary/10 text-secondary',
  coming_soon: 'bg-golden/10 text-accent-foreground',
  planned: 'bg-muted text-muted-foreground',
};

export default function ChaptersPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [applyOpen, setApplyOpen] = useState(false);

  const filtered = chapters
    .filter(c => filter === 'all' || c.status === filter)
    .filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.area.toLowerCase().includes(search.toLowerCase()));

  const activeCount = chapters.filter(c => c.status === 'active').length;
  const totalMembers = chapters.reduce((s, c) => s + c.members, 0);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="gradient-hero py-16 md:py-24">
        <div className="container text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 text-sm px-4 py-1.5">
              <MapPin className="h-3 w-3 mr-1" /> {activeCount} Active Chapters
            </Badge>
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-4">
              7AM Club <span className="text-gradient-sunrise">Chapters</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg mx-auto mb-8">
              Each chapter is a local community of breakfast lovers. Find yours or start a new one.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> {chapters.length} Locations</div>
              <div className="flex items-center gap-2"><Users className="h-4 w-4 text-secondary" /> {totalMembers.toLocaleString()} Members</div>
              <div className="flex items-center gap-2"><Star className="h-4 w-4 text-golden" /> 4.4 Avg Rating</div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="container">
          <div className="flex flex-wrap gap-3 mb-6">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search chapters..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <div className="flex gap-1">
              {['all', 'active', 'coming_soon', 'planned'].map(f => (
                <button key={f} onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${filter === f ? 'gradient-sunrise text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}>
                  {f === 'all' ? 'All' : f === 'coming_soon' ? 'Coming Soon' : f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((chapter, i) => (
              <motion.div key={chapter.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
                <Card className="shadow-soft hover:shadow-card transition-all h-full">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-display font-semibold text-lg">{chapter.name}</h3>
                        <p className="text-xs text-muted-foreground">{chapter.area}</p>
                      </div>
                      <Badge className={`text-[10px] ${statusColors[chapter.status]}`}>
                        {chapter.status === 'coming_soon' ? 'Coming Soon' : chapter.status}
                      </Badge>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="h-3 w-3" /> {chapter.members} members
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-3 w-3" /> {chapter.stations.join(', ')}
                      </div>
                      {chapter.rating > 0 && (
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-golden text-golden" />
                          <span className="text-xs font-medium">{chapter.rating}</span>
                        </div>
                      )}
                      {chapter.lead !== '—' && (
                        <p className="text-xs text-muted-foreground">Lead: <span className="font-medium text-foreground">{chapter.lead}</span></p>
                      )}
                    </div>
                    {chapter.status === 'coming_soon' && (
                      <Button variant="outline" size="sm" className="w-full mt-3" onClick={() => toast.success(`Notified for ${chapter.name}!`)}>
                        <Clock className="h-3 w-3 mr-1" /> Notify Me
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Start a Chapter CTA */}
          <div className="mt-12 rounded-3xl gradient-sunrise p-8 md:p-12 text-center relative overflow-hidden">
            <motion.div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            <div className="relative z-10">
              <Sparkles className="h-8 w-8 text-primary-foreground mx-auto mb-3" />
              <h2 className="font-display text-2xl md:text-4xl font-bold text-primary-foreground mb-3">
                Start a new chapter in your area
              </h2>
              <p className="text-primary-foreground/80 max-w-md mx-auto mb-6">
                Don't see your area? Apply to become a chapter lead and bring 7AM Club to your community.
              </p>
              <Dialog open={applyOpen} onOpenChange={setApplyOpen}>
                <DialogTrigger asChild>
                  <Button size="lg" className="bg-card text-foreground hover:bg-card/90 font-semibold">
                    <MapPin className="mr-2 h-4 w-4" /> Apply to Start a Chapter
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg">
                  <DialogHeader><DialogTitle>Start a New Chapter</DialogTitle></DialogHeader>
                  <div className="space-y-4 mt-4">
                    <div><label className="text-sm font-medium mb-1 block">Your Name</label><Input placeholder="Full name" /></div>
                    <div><label className="text-sm font-medium mb-1 block">Email</label><Input type="email" placeholder="email@example.com" /></div>
                    <div><label className="text-sm font-medium mb-1 block">Phone</label><Input placeholder="+91 xxxxx xxxxx" /></div>
                    <div><label className="text-sm font-medium mb-1 block">Proposed Area / Station</label><Input placeholder="e.g. Dwarka Sector 10, Blue Line" /></div>
                    <div><label className="text-sm font-medium mb-1 block">Why do you want to start a chapter?</label>
                      <Textarea placeholder="Tell us about your community, footfall, and interest level..." className="min-h-[80px]" />
                    </div>
                    <div><label className="text-sm font-medium mb-1 block">Estimated Community Size</label><Input type="number" placeholder="e.g. 200" /></div>
                    <Button variant="hero" className="w-full" onClick={() => { toast.success('Application submitted! We\'ll get back within 48 hours.'); setApplyOpen(false); }}>
                      Submit Application
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
