import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Users, Star, ArrowLeft, Clock, Utensils, CalendarDays, TrendingUp, MessageSquare } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { chapters } from '@/pages/ChaptersPage';

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

const mockReviews = [
  { name: 'Arjun S.', rating: 5, text: 'Best breakfast spot near the metro. The protein bowl is incredible!', date: '2 days ago' },
  { name: 'Priya M.', rating: 4, text: 'Love the convenience. Wish they had more gluten-free options.', date: '1 week ago' },
  { name: 'Rahul K.', rating: 5, text: 'The community events are amazing. Met so many health-conscious people here!', date: '2 weeks ago' },
];

const mockEvents = [
  { title: 'Morning Yoga + Breakfast', date: 'Mar 30, 2026', time: '6:30 AM', spots: 12 },
  { title: 'Healthy Eating Workshop', date: 'Apr 5, 2026', time: '7:00 AM', spots: 25 },
  { title: 'Member Tasting: New Menu', date: 'Apr 12, 2026', time: '7:30 AM', spots: 30 },
];

export default function ChapterDetailPage() {
  const { id } = useParams<{ id: string }>();
  const chapter = chapters.find(c => c.id === id);

  if (!chapter) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container py-20 text-center">
          <h1 className="font-display text-3xl font-bold mb-4">Chapter Not Found</h1>
          <p className="text-muted-foreground mb-6">The chapter you're looking for doesn't exist.</p>
          <Link to="/chapters"><Button variant="hero">Back to Chapters</Button></Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="gradient-hero py-12 md:py-20 relative overflow-hidden">
        <div className="container relative z-10">
          <Link to="/chapters" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to all chapters
          </Link>
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3 mb-4">
              <Badge className={`text-xs ${chapter.status === 'active' ? 'bg-secondary/10 text-secondary' : 'bg-golden/10 text-accent-foreground'}`}>
                {chapter.status === 'coming_soon' ? 'Coming Soon' : chapter.status}
              </Badge>
              {chapter.established && <Badge variant="outline" className="text-xs"><CalendarDays className="h-3 w-3 mr-1" /> Est. {chapter.established}</Badge>}
            </motion.div>
            <motion.h1 variants={fadeUp} className="font-display text-4xl md:text-6xl font-bold mb-2">
              {chapter.name} <span className="text-gradient-sunrise">Chapter</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg text-muted-foreground mb-6">{chapter.area}</motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-card/80 backdrop-blur px-4 py-2 rounded-full border border-border text-sm">
                <Users className="h-4 w-4 text-primary" /> {chapter.members} Members
              </div>
              <div className="flex items-center gap-2 bg-card/80 backdrop-blur px-4 py-2 rounded-full border border-border text-sm">
                <MapPin className="h-4 w-4 text-secondary" /> {chapter.stations.length} Station{chapter.stations.length > 1 ? 's' : ''}
              </div>
              {chapter.rating > 0 && (
                <div className="flex items-center gap-2 bg-card/80 backdrop-blur px-4 py-2 rounded-full border border-border text-sm">
                  <Star className="h-4 w-4 fill-golden text-golden" /> {chapter.rating} Rating
                </div>
              )}
              {chapter.lead !== '—' && (
                <div className="flex items-center gap-2 bg-card/80 backdrop-blur px-4 py-2 rounded-full border border-border text-sm">
                  Lead: <span className="font-semibold">{chapter.lead}</span>
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-8">
              {/* About */}
              {chapter.description && (
                <Card className="shadow-soft">
                  <CardContent className="p-6">
                    <h2 className="font-display text-xl font-bold mb-3">About this Chapter</h2>
                    <p className="text-muted-foreground leading-relaxed">{chapter.description}</p>
                  </CardContent>
                </Card>
              )}

              {/* Stations */}
              <Card className="shadow-soft">
                <CardContent className="p-6">
                  <h2 className="font-display text-xl font-bold mb-4">
                    <MapPin className="h-5 w-5 inline mr-2 text-primary" />Pickup Stations
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {chapter.stations.map(station => (
                      <div key={station} className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 border border-border">
                        <div className="w-10 h-10 rounded-lg gradient-sunrise flex items-center justify-center shrink-0">
                          <MapPin className="h-5 w-5 text-primary-foreground" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{station}</p>
                          <p className="text-xs text-muted-foreground">Metro Station</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Specialties */}
              {chapter.specialties && chapter.specialties.length > 0 && (
                <Card className="shadow-soft">
                  <CardContent className="p-6">
                    <h2 className="font-display text-xl font-bold mb-4">
                      <Utensils className="h-5 w-5 inline mr-2 text-secondary" />Chapter Specialties
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {chapter.specialties.map(s => (
                        <Badge key={s} className="bg-secondary/10 text-secondary px-3 py-1.5 text-sm">{s}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Reviews */}
              {chapter.status === 'active' && (
                <Card className="shadow-soft">
                  <CardContent className="p-6">
                    <h2 className="font-display text-xl font-bold mb-4">
                      <MessageSquare className="h-5 w-5 inline mr-2 text-golden" />Community Reviews
                    </h2>
                    <div className="space-y-4">
                      {mockReviews.map((review, i) => (
                        <div key={i} className="p-4 rounded-xl bg-muted/50 border border-border">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-sm">{review.name}</span>
                            <span className="text-xs text-muted-foreground">{review.date}</span>
                          </div>
                          <div className="flex gap-0.5 mb-2">
                            {[...Array(5)].map((_, j) => (
                              <Star key={j} className={`h-3.5 w-3.5 ${j < review.rating ? 'fill-golden text-golden' : 'text-muted'}`} />
                            ))}
                          </div>
                          <p className="text-sm text-muted-foreground">{review.text}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick stats */}
              <Card className="shadow-soft">
                <CardContent className="p-6">
                  <h3 className="font-display font-semibold mb-4">Chapter Stats</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                      <span className="text-sm text-muted-foreground">Members</span>
                      <span className="font-bold">{chapter.members}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                      <span className="text-sm text-muted-foreground">Stations</span>
                      <span className="font-bold">{chapter.stations.length}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                      <span className="text-sm text-muted-foreground">Rating</span>
                      <span className="font-bold flex items-center gap-1">{chapter.rating > 0 ? chapter.rating : '—'} {chapter.rating > 0 && <Star className="h-3.5 w-3.5 fill-golden text-golden" />}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                      <span className="text-sm text-muted-foreground">Status</span>
                      <Badge className={`text-xs ${chapter.status === 'active' ? 'bg-secondary/10 text-secondary' : 'bg-golden/10 text-accent-foreground'}`}>
                        {chapter.status === 'coming_soon' ? 'Coming Soon' : chapter.status}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Upcoming events */}
              {chapter.status === 'active' && (
                <Card className="shadow-soft">
                  <CardContent className="p-6">
                    <h3 className="font-display font-semibold mb-4">
                      <CalendarDays className="h-4 w-4 inline mr-1.5" />Upcoming Events
                    </h3>
                    <div className="space-y-3">
                      {mockEvents.map((event, i) => (
                        <div key={i} className="p-3 rounded-xl border border-border hover:bg-muted/50 transition-colors">
                          <p className="font-medium text-sm">{event.title}</p>
                          <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1"><CalendarDays className="h-3 w-3" />{event.date}</span>
                            <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{event.time}</span>
                          </div>
                          <p className="text-xs text-secondary mt-1">{event.spots} spots left</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Join CTA */}
              <Card className="shadow-soft overflow-hidden">
                <div className="gradient-sunrise p-6 text-center">
                  <h3 className="font-display text-lg font-bold text-primary-foreground mb-2">Join {chapter.name} Chapter</h3>
                  <p className="text-primary-foreground/80 text-sm mb-4">Be part of the local breakfast community</p>
                  <Link to="/onboarding">
                    <Button className="bg-card text-foreground hover:bg-card/90 w-full font-semibold">
                      <Users className="mr-2 h-4 w-4" /> Join Now
                    </Button>
                  </Link>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}