import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, MapPin, Zap, Heart, Users, Star, ChevronRight, Sparkles, Play, Shield, Leaf, Timer, Dumbbell, Coffee, TrendingUp, Award, Quote } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { MenuItemCard } from '@/components/MenuItemCard';
import { menuItems, personas, subscriptionPlans } from '@/data/mockData';
import heroFood from '@/assets/hero-food.jpg';
import { useRef } from 'react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

const floatingEmojis = ['🥣', '🥑', '🫘', '💪', '🌱', '✨', '🔥', '🥗'];

const testimonials = [
  { name: 'Aarav S.', role: 'Software Engineer, Gurgaon', text: 'Gym Cafe changed my mornings. I used to skip breakfast but now I grab a protein bowl at the metro every day.', rating: 5 },
  { name: 'Sneha R.', role: 'Fitness Trainer, Dwarka', text: 'Finally a breakfast option that aligns with my macros. The overnight oats are perfect post-workout.', rating: 5 },
  { name: 'Vikram P.', role: 'CA Student, Rajiv Chowk', text: 'Affordable, healthy, and super quick. The subscription saves me ₹2000+ every month.', rating: 4 },
  { name: 'Meera K.', role: 'HR Manager, Noida', text: 'The probiotic bowls are amazing. My gut health has improved dramatically in just 2 months.', rating: 5 },
];

const dailySchedule = [
  { time: '10 PM', event: 'Pre-book your breakfast', emoji: '🌙', desc: 'Browse the menu and place your order' },
  { time: '5 AM', event: 'Fresh prep begins', emoji: '👨‍🍳', desc: 'Our kitchens start preparing your meal' },
  { time: '6:30 AM', event: 'Dispatched to stations', emoji: '🚚', desc: 'Hot meals reach your metro stop' },
  { time: '7 AM', event: 'Tap & grab!', emoji: '📱', desc: 'Show QR, pick up in under 2 minutes' },
];

export default function LandingPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <Navbar />

      {/* Hero — playful & immersive */}
      <section ref={heroRef} className="relative overflow-hidden gradient-hero min-h-[90vh] flex items-center">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {floatingEmojis.map((emoji, i) => (
            <motion.div
              key={i}
              className="absolute text-3xl md:text-5xl opacity-10"
              style={{ left: `${10 + i * 11}%`, top: `${15 + (i % 3) * 25}%` }}
              animate={{ y: [0, -20, 0], rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
            >
              {emoji}
            </motion.div>
          ))}
        </div>

        <div className="container py-16 md:py-24 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial="hidden" animate="visible" variants={stagger}>
              <motion.div variants={fadeUp}>
                <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 font-body text-sm px-4 py-1.5">
                  <Zap className="h-3 w-3 mr-1" /> Now serving at 5 metro stations
                </Badge>
              </motion.div>
              <motion.h1 variants={fadeUp} className="font-display text-5xl md:text-7xl font-bold leading-[1.05] mb-6 text-foreground">
                Fuel your grind,{' '}
                <span className="text-gradient-sunrise relative">
                  eat clean
                  <motion.span
                    className="absolute -right-6 -top-4 text-2xl"
                    animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    💪
                  </motion.span>
                </span>
              </motion.h1>
              <motion.p variants={fadeUp} className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg leading-relaxed">
                Pre-book gut-friendly breakfasts the night before. Pick up in 2 minutes flat at your metro exit. No queues, no chaos, just clean nutrition.
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
                <Link to="/onboarding">
                  <Button variant="hero" size="lg" className="text-base h-14 px-8 shadow-glow">
                    <Sparkles className="mr-2 h-5 w-5" /> Get Started Free
                  </Button>
                </Link>
                <Link to="/tour">
                  <Button variant="outline" size="lg" className="text-base h-14 px-8">
                    <Play className="mr-2 h-4 w-4" /> Take a Tour
                  </Button>
                </Link>
              </motion.div>
              <motion.div variants={fadeUp} className="flex items-center gap-6 mt-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5"><Clock className="h-4 w-4 text-primary" /> 2-min pickup</div>
                <div className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-secondary" /> Metro exits</div>
                <div className="flex items-center gap-1.5"><Heart className="h-4 w-4 text-persona-genz" /> Gut-friendly</div>
              </motion.div>
            </motion.div>
            <motion.div style={{ y: heroY, scale: heroScale }} className="relative">
              <motion.div
                initial={{ opacity: 0, rotate: -3 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="rounded-3xl overflow-hidden shadow-elevated border-4 border-card"
              >
                <img src={heroFood} alt="Gym Cafe healthy breakfast spread" className="w-full h-auto" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="absolute -bottom-6 -left-6 bg-card rounded-2xl p-4 shadow-elevated border border-border"
              >
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {['🫘', '💪', '✨'].map((e, i) => (
                      <div key={i} className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-lg border-2 border-card">{e}</div>
                    ))}
                  </div>
                  <div>
                    <p className="text-sm font-bold">2,500+ happy eaters</p>
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-golden text-golden" />)}
                      <span className="text-xs text-muted-foreground ml-1">4.8</span>
                    </div>
                  </div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute -top-4 -right-4 bg-card rounded-2xl p-3 shadow-elevated border border-border"
              >
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full gradient-sunrise flex items-center justify-center">
                    <Timer className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Avg pickup</p>
                    <p className="text-lg font-bold font-display">1:47</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Marquee banner */}
      <section className="bg-primary py-3 overflow-hidden">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="flex whitespace-nowrap gap-8 text-primary-foreground font-display font-bold text-sm"
        >
          {[...Array(2)].map((_, j) => (
            <span key={j} className="flex gap-8">
              <span>🥣 FRESH DAILY</span><span>•</span>
              <span>💪 HIGH PROTEIN</span><span>•</span>
              <span>🌱 GUT-FRIENDLY</span><span>•</span>
              <span>🚇 METRO PICKUP</span><span>•</span>
              <span>⚡ 2-MIN FLAT</span><span>•</span>
              <span>🔥 PRE-BOOK BY 10PM</span><span>•</span>
              <span>🏋️ GYM CAFE</span><span>•</span>
              <span>🥣 FRESH DAILY</span><span>•</span>
              <span>💪 HIGH PROTEIN</span><span>•</span>
              <span>🌱 GUT-FRIENDLY</span><span>•</span>
              <span>🚇 METRO PICKUP</span><span>•</span>
              <span>⚡ 2-MIN FLAT</span><span>•</span>
              <span>🔥 PRE-BOOK BY 10PM</span><span>•</span>
              <span>🏋️ GYM CAFE</span><span>•</span>
            </span>
          ))}
        </motion.div>
      </section>

      {/* Trust badges */}
      <section className="py-10 bg-background border-b border-border">
        <div className="container">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 text-muted-foreground">
            {[
              { icon: Shield, label: 'FSSAI Licensed' },
              { icon: Leaf, label: '100% Vegetarian' },
              { icon: Timer, label: 'Made Fresh Daily' },
              { icon: Heart, label: 'Probiotic-Rich' },
              { icon: Star, label: '4.8★ Rated' },
              { icon: Dumbbell, label: 'Macro-Tracked' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-sm font-medium">
                <Icon className="h-4 w-4 text-primary" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-background">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-12">
            <motion.div variants={fadeUp}><Badge className="mb-4 bg-secondary/10 text-secondary">Simple & Quick</Badge></motion.div>
            <motion.h2 variants={fadeUp} className="font-display text-3xl md:text-5xl font-bold mb-4">Breakfast in 3 simple steps</motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground max-w-md mx-auto text-lg">No more skipping breakfast. No more junk at the station.</motion.p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '🌙', title: 'Pre-book by 10 PM', desc: 'Browse the menu, pick your persona, choose your items the night before.', color: 'from-primary/5 to-primary/10' },
              { icon: '🚇', title: 'Tap at the metro', desc: 'Show your QR code at our counter right at the metro exit. 2-minute pickup.', color: 'from-secondary/5 to-secondary/10' },
              { icon: '🥗', title: 'Fuel your morning', desc: 'Enjoy gut-friendly, protein-packed food made fresh for your commute.', color: 'from-persona-genz/5 to-persona-genz/10' },
            ].map((step, i) => (
              <motion.div key={i} variants={fadeUp} whileHover={{ y: -8, scale: 1.02 }} className={`text-center p-8 rounded-3xl bg-gradient-to-b ${step.color} border border-border shadow-soft`}>
                <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }} className="text-5xl mb-4">{step.icon}</motion.div>
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full gradient-sunrise text-lg font-bold text-primary-foreground mb-3">{i + 1}</div>
                <h3 className="font-display text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Daily Timeline */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-12">
            <motion.h2 variants={fadeUp} className="font-display text-3xl md:text-5xl font-bold mb-4">A Day with Gym Cafe</motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground max-w-md mx-auto text-lg">From your phone to your hand — here's how it works behind the scenes.</motion.p>
          </motion.div>
          <div className="max-w-2xl mx-auto">
            {dailySchedule.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                className="flex gap-4 mb-6 last:mb-0"
              >
                <div className="flex flex-col items-center">
                  <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                    className="w-14 h-14 rounded-2xl gradient-sunrise flex items-center justify-center text-2xl shadow-glow shrink-0"
                  >{item.emoji}</motion.div>
                  {i < dailySchedule.length - 1 && <div className="w-0.5 h-full bg-border mt-2" />}
                </div>
                <div className="pb-6">
                  <p className="text-xs font-bold text-primary uppercase tracking-wide">{item.time}</p>
                  <h3 className="font-display text-lg font-semibold">{item.event}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Personas */}
      <section className="py-20 bg-muted/50">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-12">
            <motion.h2 variants={fadeUp} className="font-display text-3xl md:text-5xl font-bold mb-4">Which breakfast persona are you?</motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground max-w-md mx-auto text-lg">Every gut is different. Take the quiz or pick your vibe.</motion.p>
            <motion.div variants={fadeUp} className="mt-4">
              <Link to="/quiz"><Button variant="hero" size="lg"><Sparkles className="mr-2 h-4 w-4" /> Take the Persona Quiz</Button></Link>
            </motion.div>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {personas.map((p, i) => (
              <motion.div key={p.id} variants={fadeUp} whileHover={{ y: -8, rotate: i % 2 === 0 ? 1 : -1 }}>
                <Link to={`/menu/${p.id}`} className="block p-8 rounded-3xl bg-card border border-border shadow-soft hover:shadow-elevated transition-all duration-300 group">
                  <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }} className="text-5xl mb-4">{p.emoji}</motion.div>
                  <h3 className="font-display text-lg font-semibold mb-2 group-hover:text-primary transition-colors">{p.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.description}</p>
                  <div className="flex items-center gap-1 mt-4 text-sm font-medium text-primary">View menu <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" /></div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Popular Items */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="flex items-end justify-between mb-8">
            <div>
              <Badge className="mb-2 bg-golden/10 text-accent-foreground">🔥 Trending</Badge>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-2">Popular this week</h2>
              <p className="text-muted-foreground">Top picks from our community</p>
            </div>
            <Link to="/menu"><Button variant="ghost" className="hidden md:flex">View all <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {menuItems.slice(0, 4).map((item) => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted/50">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-12">
            <motion.h2 variants={fadeUp} className="font-display text-3xl md:text-5xl font-bold mb-4">Loved by 2,500+ commuters</motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground max-w-md mx-auto text-lg">Real stories from real morning people.</motion.p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={i} variants={fadeUp} whileHover={{ y: -4 }}>
                <Card className="shadow-soft h-full">
                  <CardContent className="p-6">
                    <Quote className="h-6 w-6 text-primary/30 mb-3" />
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">"{t.text}"</p>
                    <div className="flex gap-0.5 mb-2">
                      {[...Array(5)].map((_, j) => <Star key={j} className={`h-3.5 w-3.5 ${j < t.rating ? 'fill-golden text-golden' : 'text-muted'}`} />)}
                    </div>
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Live counter ticker */}
      <section className="py-12 bg-background">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '2,500+', label: 'Happy Eaters', emoji: '😋' },
              { value: '15,000+', label: 'Meals Served', emoji: '🥗' },
              { value: '4.8★', label: 'Average Rating', emoji: '⭐' },
              { value: '32', label: 'Chapters', emoji: '📍' },
            ].map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="text-center p-6 rounded-2xl bg-card border border-border shadow-soft"
              >
                <div className="text-3xl mb-2">{stat.emoji}</div>
                <p className="font-display text-3xl md:text-4xl font-bold text-primary">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Chapters preview */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-10">
            <motion.h2 variants={fadeUp} className="font-display text-3xl md:text-5xl font-bold mb-4">Find Your Local Chapter</motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground max-w-lg mx-auto text-lg">
              Gym Cafe chapters are local breakfast communities near your metro station. 32 chapters across Delhi NCR and growing.
            </motion.p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { name: 'Rajiv Chowk', members: 520, rating: 4.8 },
              { name: 'Connaught Place', members: 410, rating: 4.6 },
              { name: 'Gurgaon Huda', members: 380, rating: 4.6 },
              { name: 'Hauz Khas', members: 312, rating: 4.3 },
            ].map((ch, i) => (
              <motion.div key={ch.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Card className="shadow-soft hover:shadow-card transition-all">
                  <CardContent className="p-5">
                    <h3 className="font-display font-semibold">{ch.name}</h3>
                    <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" /> {ch.members}</span>
                      <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-golden text-golden" /> {ch.rating}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          <div className="text-center">
            <Link to="/chapters"><Button variant="hero" size="lg"><MapPin className="mr-2 h-4 w-4" /> Explore All Chapters</Button></Link>
          </div>
        </div>
      </section>

      {/* Subscription CTA */}
      <section className="py-20">
        <div className="container">
          <div className="rounded-3xl gradient-sunrise p-8 md:p-16 text-center relative overflow-hidden">
            <motion.div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            <div className="relative z-10">
              <h2 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-4">Subscribe & save up to 30%</h2>
              <p className="text-primary-foreground/80 max-w-lg mx-auto mb-8 text-lg">Choose a plan that fits your routine. Flexible scheduling, pause anytime, cancel anytime.</p>
              <div className="flex flex-wrap justify-center gap-4">
                {subscriptionPlans.map((plan) => (
                  <motion.div key={plan.id} whileHover={{ y: -4, scale: 1.03 }} className={`bg-card/95 backdrop-blur rounded-xl p-6 text-left w-64 ${plan.isPopular ? 'ring-2 ring-accent scale-105' : ''}`}>
                    {plan.isPopular && <Badge className="mb-2 bg-accent text-accent-foreground">Most Popular</Badge>}
                    <h3 className="font-display font-bold text-foreground">{plan.name}</h3>
                    <p className="text-sm text-muted-foreground">{plan.meals} meals/month</p>
                    <p className="font-display text-2xl font-bold text-foreground mt-2">₹{plan.price}<span className="text-sm font-normal text-muted-foreground">/mo</span></p>
                    <p className="text-xs text-secondary font-medium mt-1">Save {plan.savings}%</p>
                  </motion.div>
                ))}
              </div>
              <Link to="/membership">
                <Button size="lg" className="mt-8 bg-card text-foreground hover:bg-card/90 font-semibold">
                  View All Plans <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Community + CTA */}
      <section className="py-20 bg-muted/50">
        <div className="container text-center">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">Join the Gym Cafe community</h2>
          <p className="text-muted-foreground max-w-md mx-auto mb-8 text-lg">
            2,500+ commuters are already eating better mornings. Be part of the movement.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Link to="/onboarding">
              <Button variant="hero" size="lg"><Sparkles className="mr-2 h-4 w-4" /> Start Your Journey</Button>
            </Link>
            <Button variant="fresh" size="lg">
              <Users className="mr-2 h-4 w-4" /> Join WhatsApp Community
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}