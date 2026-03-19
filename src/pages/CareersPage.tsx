import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { motion } from 'framer-motion';
import { MapPin, Clock, ArrowRight, Briefcase, Users, Heart, Zap, Star, ChevronRight, Upload, CheckCircle2, Building } from 'lucide-react';
import { toast } from 'sonner';

interface JobOpening {
  id: string;
  title: string;
  location: string;
  type: string;
  dept: string;
  salary: string;
  experience: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  perks: string[];
}

const openings: JobOpening[] = [
  {
    id: 'sm-1', title: 'Station Manager', location: 'Delhi NCR', type: 'Full-time', dept: 'Operations', salary: '₹4.5 – 6.5 LPA', experience: '2-4 years',
    description: 'Lead daily operations at one of our metro station pickup points. Ensure smooth order fulfillment, quality control, and customer delight every morning.',
    responsibilities: ['Manage 3-5 staff at the station counter', 'Ensure 100% order accuracy and on-time handover', 'Handle inventory and coordinate with kitchen', 'Resolve customer issues on-the-spot', 'Report daily metrics and feedback'],
    requirements: ['2+ years in F&B operations or QSR management', 'Strong people management skills', 'Early riser — comfort with 5:30 AM starts', 'Hindi & English fluency', 'Based in Delhi NCR'],
    perks: ['Free daily breakfast', 'Health insurance', 'Performance bonuses', 'Metro pass reimbursement', 'Career growth to Area Manager'],
  },
  {
    id: 'kl-1', title: 'Kitchen Lead', location: 'Gurugram', type: 'Full-time', dept: 'Kitchen', salary: '₹5 – 7 LPA', experience: '3-5 years',
    description: 'Head our central kitchen operations. You\'ll oversee menu prep, food safety, and a team of 8+ cooks to deliver fresh meals before 6 AM daily.',
    responsibilities: ['Lead kitchen team of 8-12 members', 'Maintain FSSAI compliance and hygiene standards', 'Manage prep schedules for 500+ daily orders', 'Collaborate with R&D on new menu items', 'Control food costs and minimize wastage'],
    requirements: ['3+ years as a kitchen supervisor or head chef', 'FSSAI food safety certification', 'Experience in high-volume production', 'Knowledge of Indian and continental cuisines', 'Available for 3 AM – 11 AM shifts'],
    perks: ['Free meals all day', 'Health & accident insurance', 'Chef uniform & gear provided', 'Recipe innovation bonuses', 'Festival bonuses'],
  },
  {
    id: 'gm-1', title: 'Growth Marketing Intern', location: 'Remote', type: 'Internship', dept: 'Marketing', salary: '₹15K – 25K/month', experience: '0-1 year',
    description: 'Drive awareness and user acquisition for 7AM Club. Work on social media, influencer campaigns, and community-building initiatives.',
    responsibilities: ['Create engaging content for Instagram, Twitter, LinkedIn', 'Manage influencer outreach and partnerships', 'Run and optimize paid ad campaigns', 'Analyze campaign performance and user behavior', 'Support launch campaigns for new stations'],
    requirements: ['Currently pursuing or recent graduate in Marketing/Communications', 'Strong writing skills in English and Hindi', 'Social media savvy with an eye for trends', 'Basic understanding of Meta Ads, Google Ads', 'Portfolio of any previous marketing work'],
    perks: ['Flexible remote work', 'Free monthly breakfast subscription', 'Mentorship from founding team', 'Certificate of completion', 'PPO based on performance'],
  },
  {
    id: 'fsd-1', title: 'Full Stack Developer', location: 'Remote / Delhi', type: 'Full-time', dept: 'Engineering', salary: '₹12 – 22 LPA', experience: '2-5 years',
    description: 'Build and scale the 7AM Club platform — from the consumer app to kitchen management systems and delivery orchestration.',
    responsibilities: ['Develop and maintain React + TypeScript frontend', 'Build backend APIs with Node.js / Supabase', 'Design and optimize PostgreSQL database schemas', 'Implement real-time order tracking and notifications', 'Participate in architecture decisions and code reviews'],
    requirements: ['2+ years with React, TypeScript, Node.js', 'Experience with PostgreSQL and REST/GraphQL APIs', 'Familiarity with Supabase, Firebase, or AWS', 'Understanding of CI/CD and deployment pipelines', 'Strong problem-solving and communication skills'],
    perks: ['Remote-first culture', 'MacBook provided', 'Free breakfast subscription', 'ESOP eligibility', 'Conference & learning budget'],
  },
  {
    id: 'cm-1', title: 'Community Manager', location: 'Delhi NCR', type: 'Full-time', dept: 'Community', salary: '₹4 – 6 LPA', experience: '1-3 years',
    description: 'Build and nurture the 7AM Club community. Manage WhatsApp groups, Beta Eater program, referral campaigns, and user engagement.',
    responsibilities: ['Manage 10+ WhatsApp community groups', 'Run the Beta Eater program and reward system', 'Organize offline community events and tastings', 'Collect and route user feedback to product team', 'Create community content and highlight user stories'],
    requirements: ['1+ years in community management or customer success', 'Excellent interpersonal and communication skills', 'Experience with WhatsApp Business or community platforms', 'Empathetic listener who loves talking to users', 'Based in Delhi NCR for events'],
    perks: ['Free daily breakfast', 'Community event budget', 'Health insurance', 'Flexible working hours', 'Team retreats'],
  },
  {
    id: 'nd-1', title: 'Nutritionist & Menu Developer', location: 'Gurugram', type: 'Full-time', dept: 'R&D', salary: '₹6 – 9 LPA', experience: '3-5 years',
    description: 'Design gut-friendly, persona-matched breakfast menus. Work with the kitchen team to bring nutritious, delicious ideas to life.',
    responsibilities: ['Develop new menu items based on nutrition science', 'Calculate and verify nutrition labels for all items', 'Create persona-specific meal recommendations', 'Research food trends and superfood ingredients', 'Conduct taste tests and iterate on recipes'],
    requirements: ['B.Sc/M.Sc in Nutrition, Food Science, or Dietetics', '3+ years in menu development or clinical nutrition', 'Strong understanding of gut health and probiotics', 'Creative culinary sensibility', 'FSSAI awareness'],
    perks: ['Free meals', 'R&D innovation budget', 'Health insurance', 'Conference attendance', 'Published recipe credits'],
  },
];

const values = [
  { emoji: '☀️', title: 'Morning People', desc: 'We believe in the power of mornings.' },
  { emoji: '🫘', title: 'Gut-First', desc: 'Health starts in the gut — we live by it.' },
  { emoji: '🚀', title: 'Move Fast', desc: 'Ship daily. Learn weekly. Grow monthly.' },
  { emoji: '❤️', title: 'Customer Love', desc: 'Every decision starts with the commuter.' },
];

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

export default function CareersPage() {
  const [selectedJob, setSelectedJob] = useState<JobOpening | null>(null);
  const [applyJob, setApplyJob] = useState<JobOpening | null>(null);
  const [filterDept, setFilterDept] = useState('all');
  const [submitted, setSubmitted] = useState(false);

  const departments = ['all', ...Array.from(new Set(openings.map(j => j.dept)))];
  const filtered = filterDept === 'all' ? openings : openings.filter(j => j.dept === filterDept);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast.success('Application submitted successfully! We\'ll get back within 5 business days.');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="gradient-hero py-16 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          {['🍳', '🚇', '💻', '🎯'].map((e, i) => (
            <motion.div key={i} className="absolute text-4xl opacity-10" style={{ left: `${20 + i * 20}%`, top: `${25 + (i % 2) * 30}%` }}
              animate={{ y: [0, -12, 0] }} transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}>
              {e}
            </motion.div>
          ))}
        </div>
        <div className="container relative z-10 text-center max-w-3xl">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20"><Briefcase className="h-3 w-3 mr-1" /> We're Hiring</Badge>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Join the Breakfast Revolution 🚀</h1>
          <p className="text-muted-foreground text-lg">We're building the future of commuter breakfast in India. If you're passionate about food, health, and making mornings better — we want you on the team.</p>
        </div>
      </section>

      {/* Values */}
      <section className="py-12 bg-muted/50">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {values.map((v, i) => (
              <motion.div key={v.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.1 }}
                className="text-center p-6 rounded-2xl bg-card border border-border shadow-soft">
                <div className="text-3xl mb-2">{v.emoji}</div>
                <h3 className="font-display font-semibold text-sm">{v.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-12">
        <div className="container max-w-4xl">
          <h2 className="font-display text-3xl font-bold mb-2">Open Positions</h2>
          <p className="text-muted-foreground mb-6">{openings.length} roles across {departments.length - 1} teams</p>

          {/* Department filter */}
          <div className="flex flex-wrap gap-2 mb-6">
            {departments.map(d => (
              <button key={d} onClick={() => setFilterDept(d)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  filterDept === d ? 'gradient-sunrise text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}>
                {d === 'all' ? 'All Teams' : d}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {filtered.map((job) => (
              <motion.div key={job.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <Card className="shadow-soft hover:shadow-card transition-all duration-300 group cursor-pointer" onClick={() => setSelectedJob(job)}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-display text-lg font-semibold group-hover:text-primary transition-colors">{job.title}</h3>
                        <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {job.location}</span>
                          <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {job.type}</span>
                          <span className="flex items-center gap-1"><Briefcase className="h-3.5 w-3.5" /> {job.experience}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline" className="text-xs">{job.dept}</Badge>
                          <span className="text-sm font-medium text-secondary">{job.salary}</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="shrink-0 group-hover:bg-primary/10">
                        <ChevronRight className="h-5 w-5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Detail Dialog */}
      <Dialog open={!!selectedJob} onOpenChange={(open) => !open && setSelectedJob(null)}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          {selectedJob && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline">{selectedJob.dept}</Badge>
                  <Badge className="bg-secondary/10 text-secondary">{selectedJob.type}</Badge>
                </div>
                <DialogTitle className="font-display text-2xl">{selectedJob.title}</DialogTitle>
                <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mt-1">
                  <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {selectedJob.location}</span>
                  <span className="flex items-center gap-1"><Briefcase className="h-3.5 w-3.5" /> {selectedJob.experience}</span>
                  <span className="font-medium text-secondary">{selectedJob.salary}</span>
                </div>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                <div>
                  <h4 className="font-display font-semibold mb-2">About the Role</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{selectedJob.description}</p>
                </div>

                <div>
                  <h4 className="font-display font-semibold mb-2">Responsibilities</h4>
                  <ul className="space-y-1.5">
                    {selectedJob.responsibilities.map(r => (
                      <li key={r} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" /> {r}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-display font-semibold mb-2">Requirements</h4>
                  <ul className="space-y-1.5">
                    {selectedJob.requirements.map(r => (
                      <li key={r} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-secondary mt-0.5 shrink-0" /> {r}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-display font-semibold mb-2">Perks & Benefits</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedJob.perks.map(p => (
                      <Badge key={p} variant="outline" className="text-xs py-1">{p}</Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <Button variant="hero" className="flex-1" onClick={() => { setSelectedJob(null); setApplyJob(selectedJob); }}>
                    Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button variant="outline" onClick={() => setSelectedJob(null)}>Close</Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Application Form Dialog */}
      <Dialog open={!!applyJob} onOpenChange={(open) => { if (!open) { setApplyJob(null); setSubmitted(false); } }}>
        <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
          {applyJob && !submitted && (
            <>
              <DialogHeader>
                <DialogTitle className="font-display text-xl">Apply for {applyJob.title}</DialogTitle>
                <p className="text-sm text-muted-foreground">{applyJob.dept} · {applyJob.location}</p>
              </DialogHeader>
              <form onSubmit={handleApply} className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div><Label htmlFor="fname">First Name *</Label><Input id="fname" required placeholder="Priya" /></div>
                  <div><Label htmlFor="lname">Last Name *</Label><Input id="lname" required placeholder="Sharma" /></div>
                </div>
                <div><Label htmlFor="email">Email *</Label><Input id="email" type="email" required placeholder="priya@example.com" /></div>
                <div><Label htmlFor="phone">Phone *</Label><Input id="phone" type="tel" required placeholder="+91 98765 43210" /></div>
                <div><Label htmlFor="linkedin">LinkedIn Profile</Label><Input id="linkedin" placeholder="linkedin.com/in/priya-sharma" /></div>
                <div><Label htmlFor="portfolio">Portfolio / GitHub (optional)</Label><Input id="portfolio" placeholder="github.com/priya" /></div>
                <div><Label htmlFor="experience">Years of Experience *</Label><Input id="experience" required placeholder="e.g., 3 years" /></div>
                <div><Label htmlFor="currentRole">Current Role</Label><Input id="currentRole" placeholder="e.g., Operations Manager at Zomato" /></div>
                <div>
                  <Label htmlFor="resume">Resume (PDF) *</Label>
                  <div className="mt-1 border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary/40 transition-colors cursor-pointer">
                    <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Drag & drop or click to upload</p>
                    <p className="text-xs text-muted-foreground mt-1">PDF, DOC up to 5MB</p>
                    <input type="file" className="hidden" id="resume" accept=".pdf,.doc,.docx" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="cover">Why do you want to join 7AM Club? *</Label>
                  <Textarea id="cover" required placeholder="Tell us what excites you about this role and our mission..." rows={4} />
                </div>
                <div className="flex gap-3 pt-2">
                  <Button type="submit" variant="hero" className="flex-1">Submit Application <ArrowRight className="ml-2 h-4 w-4" /></Button>
                  <Button type="button" variant="outline" onClick={() => setApplyJob(null)}>Cancel</Button>
                </div>
              </form>
            </>
          )}
          {applyJob && submitted && (
            <div className="text-center py-8">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-20 h-20 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="h-10 w-10 text-secondary" />
              </motion.div>
              <h3 className="font-display text-2xl font-bold mb-2">Application Submitted! 🎉</h3>
              <p className="text-muted-foreground mb-2">Thanks for applying for <strong>{applyJob.title}</strong>.</p>
              <p className="text-sm text-muted-foreground mb-6">Our team will review your application and get back within 5 business days.</p>
              <Button variant="outline" onClick={() => { setApplyJob(null); setSubmitted(false); }}>Close</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Open Application */}
      <section className="py-12">
        <div className="container max-w-3xl">
          <div className="text-center p-8 md:p-12 bg-muted/50 rounded-3xl">
            <Building className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="font-display text-2xl font-bold mb-3">Don't see your role?</h3>
            <p className="text-muted-foreground mb-2">We're always looking for talented people to join our mission.</p>
            <p className="text-sm text-muted-foreground mb-6">Send your resume to <span className="text-primary font-semibold">careers@7amclub.in</span></p>
            <div className="flex justify-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><Users className="h-4 w-4" /> 25+ team members</span>
              <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> Delhi NCR & Remote</span>
              <span className="flex items-center gap-1"><Heart className="h-4 w-4" /> Free breakfast for all</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
