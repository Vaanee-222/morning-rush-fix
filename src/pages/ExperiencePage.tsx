import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Star, User, ChevronRight, X, Volume2, VolumeX, Heart, Share2, MessageCircle, Sparkles, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const testimonials = [
  { id: '1', name: 'Priya S.', persona: 'Protein Hustler', emoji: '💪', quote: 'Best protein-packed breakfast I\'ve found near the metro. The Egg White Wrap is 🔥', duration: '0:45', rating: 5, views: '12K', likes: 234, thumbnail: '🥚' },
  { id: '2', name: 'Ankit M.', persona: 'Gut Guardian', emoji: '🫘', quote: 'The Sprouted Moong Chaat has literally fixed my gut issues. Life-changing.', duration: '1:12', rating: 5, views: '8.5K', likes: 189, thumbnail: '🫘' },
  { id: '3', name: 'Sneha D.', persona: 'Trend Setter', emoji: '✨', quote: 'My Instagram feed has never looked better. The Acai Bowl is pure art!', duration: '0:58', rating: 5, views: '15K', likes: 456, thumbnail: '🫐' },
  { id: '4', name: 'Rahul K.', persona: 'Guilt-Free Rebel', emoji: '🍫', quote: 'Ragi Pancakes taste indulgent but are actually healthy? Sign me up forever.', duration: '1:30', rating: 5, views: '6.2K', likes: 167, thumbnail: '🥞' },
  { id: '5', name: 'Meera R.', persona: 'Protein Hustler', emoji: '💪', quote: 'As a fitness enthusiast, finding 24g protein at a metro station is unreal.', duration: '0:35', rating: 4, views: '9.8K', likes: 312, thumbnail: '💪' },
  { id: '6', name: 'Vikram P.', persona: 'Gut Guardian', emoji: '🫘', quote: 'The Probiotic Lassi is my daily ritual now. My digestion has improved so much.', duration: '1:05', rating: 5, views: '11K', likes: 278, thumbnail: '🥛' },
  { id: '7', name: 'Kavya S.', persona: 'Trend Setter', emoji: '✨', quote: 'Dragon Fruit Bowl for breakfast? Only at Gym Cafe. Living my best life.', duration: '0:42', rating: 5, views: '18K', likes: 523, thumbnail: '🐉' },
  { id: '8', name: 'Arjun T.', persona: 'Guilt-Free Rebel', emoji: '🍫', quote: 'Nutella Crepes that are \'guilt-free\'? I don\'t care if it\'s marketing, they\'re delicious.', duration: '0:55', rating: 4, views: '7.1K', likes: 198, thumbnail: '🍫' },
];

const demoSteps = [
  { title: 'Browse Menu', desc: 'Explore 200+ items filtered by your persona', emoji: '📱', color: 'from-primary/10 to-primary/5' },
  { title: 'Pick Your Items', desc: 'Add gut-friendly breakfasts to your cart', emoji: '🛒', color: 'from-secondary/10 to-secondary/5' },
  { title: 'Schedule Pickup', desc: 'Choose your station and morning time slot', emoji: '📅', color: 'from-persona-genz/10 to-persona-genz/5' },
  { title: 'Flash QR & Go', desc: 'Grab your breakfast in under 2 minutes!', emoji: '📲', color: 'from-golden/10 to-golden/5' },
];

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

export default function ExperiencePage() {
  const [playingVideo, setPlayingVideo] = useState<typeof testimonials[0] | null>(null);
  const [activeDemo, setActiveDemo] = useState(0);
  const [likedVideos, setLikedVideos] = useState<Set<string>>(new Set());

  const toggleLike = (id: string) => {
    setLikedVideos(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden gradient-hero py-16 md:py-24">
        <div className="absolute inset-0 pointer-events-none">
          {['🥗', '🎥', '⭐', '🚇', '😋', '🎬'].map((e, i) => (
            <motion.div key={i} className="absolute text-3xl md:text-5xl opacity-10" style={{ left: `${8 + i * 16}%`, top: `${15 + (i % 3) * 25}%` }}
              animate={{ y: [0, -20, 0], rotate: [0, 10, -10, 0] }} transition={{ duration: 4 + i * 0.5, repeat: Infinity, delay: i * 0.3 }}>
              {e}
            </motion.div>
          ))}
        </div>
        <div className="container relative z-10 text-center">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div variants={fadeUp}>
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                <Sparkles className="h-3 w-3 mr-1" /> Community Stories
              </Badge>
            </motion.div>
            <motion.h1 variants={fadeUp} className="font-display text-4xl md:text-6xl font-bold mb-4">
              The 7AM <span className="text-gradient-sunrise">Experience</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-muted-foreground text-lg max-w-xl mx-auto">
              Real stories from real commuters. Watch, explore, and see how Gym Cafe is changing Delhi NCR's breakfast game.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Interactive Demo */}
      <section className="py-16 bg-muted/50">
        <div className="container max-w-4xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-10">
            <motion.h2 variants={fadeUp} className="font-display text-3xl font-bold mb-2">See How It Works</motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground">Interactive demo — tap each step</motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Steps */}
            <div className="space-y-3">
              {demoSteps.map((step, i) => (
                <motion.button key={i} onClick={() => setActiveDemo(i)} whileHover={{ x: 4 }}
                  className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 ${
                    activeDemo === i ? 'border-primary bg-card shadow-card' : 'border-border bg-card/50 hover:bg-card'
                  }`}>
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${activeDemo === i ? 'gradient-sunrise' : 'bg-muted'}`}>
                      {activeDemo === i ? <span className="text-xl">{step.emoji}</span> : <span className="text-xl opacity-50">{step.emoji}</span>}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center ${activeDemo === i ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>{i + 1}</span>
                        <h4 className="font-display font-semibold">{step.title}</h4>
                      </div>
                      <p className="text-sm text-muted-foreground mt-0.5 ml-7">{step.desc}</p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Demo Preview */}
            <AnimatePresence mode="wait">
              <motion.div key={activeDemo} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                className="aspect-[9/16] max-h-[500px] rounded-3xl bg-card border-4 border-border shadow-elevated overflow-hidden relative mx-auto w-full max-w-[280px]">
                <div className={`absolute inset-0 bg-gradient-to-b ${demoSteps[activeDemo].color}`} />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <motion.div animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }} transition={{ duration: 2, repeat: Infinity }}
                    className="text-7xl mb-6">{demoSteps[activeDemo].emoji}</motion.div>
                  <h3 className="font-display text-xl font-bold mb-2">{demoSteps[activeDemo].title}</h3>
                  <p className="text-sm text-muted-foreground">{demoSteps[activeDemo].desc}</p>
                  <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
                    {demoSteps.map((_, i) => (
                      <div key={i} className={`h-1.5 rounded-full transition-all ${i === activeDemo ? 'w-8 bg-primary' : 'w-1.5 bg-muted-foreground/30'}`} />
                    ))}
                  </div>
                </div>
                {/* Phone notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-foreground/10 rounded-b-2xl" />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Video Stories Grid */}
      <section className="py-16">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="mb-10">
            <motion.h2 variants={fadeUp} className="font-display text-3xl font-bold mb-2">Community Stories 🎬</motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground">Tap to watch real experiences from our community</motion.p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {testimonials.map((t, i) => (
              <motion.div key={t.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.05 }}>
                <Card className="shadow-soft hover:shadow-card transition-all duration-300 group cursor-pointer overflow-hidden"
                  onClick={() => setPlayingVideo(t)}>
                  {/* Video Thumbnail */}
                  <div className="relative aspect-[3/4] bg-gradient-to-b from-muted to-muted/50 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div className="text-6xl" whileHover={{ scale: 1.2 }}>{t.thumbnail}</motion.div>
                    </div>
                    {/* Play button */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <motion.div whileHover={{ scale: 1.1 }} className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center shadow-elevated">
                        <Play className="h-7 w-7 text-primary-foreground ml-1" />
                      </motion.div>
                    </div>
                    {/* Duration */}
                    <span className="absolute bottom-2 right-2 bg-foreground/80 text-background text-xs px-2 py-0.5 rounded-full">{t.duration}</span>
                    {/* Views */}
                    <span className="absolute top-2 right-2 bg-foreground/50 text-background text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Eye className="h-3 w-3" /> {t.views}
                    </span>
                  </div>
                  <CardContent className="p-3">
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-sm">{t.emoji}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold truncate">{t.name}</p>
                        <p className="text-[10px] text-muted-foreground">{t.persona}</p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2 italic">"{t.quote}"</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-0.5">
                        {[...Array(t.rating)].map((_, j) => <Star key={j} className="h-3 w-3 fill-golden text-golden" />)}
                      </div>
                      <button onClick={(e) => { e.stopPropagation(); toggleLike(t.id); }}
                        className={`flex items-center gap-1 text-xs transition-colors ${likedVideos.has(t.id) ? 'text-destructive' : 'text-muted-foreground'}`}>
                        <Heart className={`h-3.5 w-3.5 ${likedVideos.has(t.id) ? 'fill-destructive' : ''}`} /> {t.likes + (likedVideos.has(t.id) ? 1 : 0)}
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Player Dialog */}
      <Dialog open={!!playingVideo} onOpenChange={(open) => !open && setPlayingVideo(null)}>
        <DialogContent className="max-w-lg p-0 overflow-hidden bg-foreground/95 border-0">
          {playingVideo && (
            <div className="relative">
              {/* Simulated video player */}
              <div className="aspect-[9/16] max-h-[70vh] flex flex-col items-center justify-center text-center p-8 relative">
                <motion.div initial={{ scale: 0.8 }} animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }}
                  className="text-8xl mb-6">{playingVideo.thumbnail}</motion.div>
                <div className="text-background">
                  <p className="font-display text-xl font-bold mb-2">{playingVideo.name}</p>
                  <Badge className="bg-background/20 text-background mb-4">{playingVideo.persona}</Badge>
                  <p className="text-sm text-background/70 italic leading-relaxed">"{playingVideo.quote}"</p>
                </div>

                {/* Playback controls */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="w-full h-1 bg-background/20 rounded-full mb-3">
                    <motion.div initial={{ width: '0%' }} animate={{ width: '100%' }} transition={{ duration: 10, ease: 'linear' }}
                      className="h-full gradient-sunrise rounded-full" />
                  </div>
                  <div className="flex items-center justify-between text-background/70 text-xs">
                    <span>0:00</span>
                    <span>{playingVideo.duration}</span>
                  </div>
                </div>

                {/* Side actions */}
                <div className="absolute right-3 bottom-20 flex flex-col gap-4 text-background/80">
                  <button onClick={() => toggleLike(playingVideo.id)} className="flex flex-col items-center gap-0.5">
                    <Heart className={`h-6 w-6 ${likedVideos.has(playingVideo.id) ? 'fill-destructive text-destructive' : ''}`} />
                    <span className="text-[10px]">{playingVideo.likes}</span>
                  </button>
                  <button className="flex flex-col items-center gap-0.5">
                    <MessageCircle className="h-6 w-6" />
                    <span className="text-[10px]">Reply</span>
                  </button>
                  <button className="flex flex-col items-center gap-0.5">
                    <Share2 className="h-6 w-6" />
                    <span className="text-[10px]">Share</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* CTA */}
      <section className="py-12">
        <div className="container max-w-3xl">
          <div className="text-center p-8 md:p-12 rounded-3xl gradient-sunrise relative overflow-hidden">
            <motion.div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
            <div className="relative z-10">
              <h3 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground mb-3">Share Your 7AM Story 🎥</h3>
              <p className="text-primary-foreground/80 mb-6">Record a short video about your experience. Get featured and earn rewards!</p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link to="/feedback"><Button size="lg" className="bg-card text-foreground hover:bg-card/90"><Play className="mr-2 h-4 w-4" /> Upload Video</Button></Link>
                <Link to="/quiz"><Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">Take the Quiz <ChevronRight className="ml-1 h-4 w-4" /></Button></Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
