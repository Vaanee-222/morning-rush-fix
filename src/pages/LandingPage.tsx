import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, MapPin, Zap, Heart, Users, Star, ChevronRight } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { MenuItemCard } from '@/components/MenuItemCard';
import { menuItems, personas, subscriptionPlans } from '@/data/mockData';
import heroFood from '@/assets/hero-food.jpg';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden gradient-hero">
        <div className="container py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial="hidden" animate="visible" variants={stagger}>
              <motion.div variants={fadeUp}>
                <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 font-body">
                  <Zap className="h-3 w-3 mr-1" /> Now serving at 5 metro stations
                </Badge>
              </motion.div>
              <motion.h1 variants={fadeUp} className="font-display text-4xl md:text-6xl font-bold leading-[1.1] mb-6 text-foreground">
                Your morning fix,{' '}
                <span className="text-gradient-sunrise">ready at 7AM</span>
              </motion.h1>
              <motion.p variants={fadeUp} className="text-lg text-muted-foreground mb-8 max-w-lg leading-relaxed">
                Pre-book gut-friendly breakfasts the night before. Pick up in 2 minutes flat at your metro exit. No queues, no chaos, just good food.
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
                <Link to="/menu">
                  <Button variant="hero" size="lg" className="text-base">
                    Explore Menu <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/quiz">
                  <Button variant="outline" size="lg" className="text-base">
                    Find Your Persona
                  </Button>
                </Link>
              </motion.div>
              <motion.div variants={fadeUp} className="flex items-center gap-6 mt-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5"><Clock className="h-4 w-4 text-primary" /> 2-min pickup</div>
                <div className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-secondary" /> Metro exits</div>
                <div className="flex items-center gap-1.5"><Heart className="h-4 w-4 text-persona-genz" /> Gut-friendly</div>
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden shadow-elevated">
                <img src={heroFood} alt="7AM Club healthy breakfast spread" className="w-full h-auto" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-card rounded-xl p-3 shadow-elevated border border-border">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {['🫘', '💪', '✨'].map((e, i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm border-2 border-card">{e}</div>
                    ))}
                  </div>
                  <div>
                    <p className="text-xs font-semibold">2,500+ happy eaters</p>
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => <Star key={i} className="h-3 w-3 fill-golden text-golden" />)}
                      <span className="text-[10px] text-muted-foreground ml-1">4.8</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-background">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-12">
            <motion.h2 variants={fadeUp} className="font-display text-3xl md:text-4xl font-bold mb-4">
              Breakfast in 3 simple steps
            </motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground max-w-md mx-auto">
              No more skipping breakfast. No more junk at the station.
            </motion.p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '🌙', title: 'Pre-book by 10 PM', desc: 'Browse the menu, pick your persona, choose your items the night before.' },
              { icon: '🚇', title: 'Tap at the metro', desc: 'Show your QR code at our counter right at the metro exit. 2-minute pickup.' },
              { icon: '🥗', title: 'Fuel your morning', desc: 'Enjoy gut-friendly, protein-packed food made fresh for your commute.' },
            ].map((step, i) => (
              <motion.div key={i} variants={fadeUp} className="text-center p-8 rounded-2xl bg-card border border-border shadow-soft hover:shadow-card transition-shadow">
                <div className="text-4xl mb-4">{step.icon}</div>
                <div className="inline-flex items-center justify-center w-8 h-8 rounded-full gradient-sunrise text-sm font-bold text-primary-foreground mb-3">
                  {i + 1}
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Personas */}
      <section className="py-20 bg-muted/50">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-12">
            <motion.h2 variants={fadeUp} className="font-display text-3xl md:text-4xl font-bold mb-4">
              Which breakfast persona are you?
            </motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground max-w-md mx-auto">
              Every gut is different. We curate menus for every kind of morning person.
            </motion.p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {personas.map((p) => (
              <motion.div key={p.id} variants={fadeUp}>
                <Link to={`/menu/${p.id}`} className="block p-6 rounded-2xl bg-card border border-border shadow-soft hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 group">
                  <div className="text-4xl mb-3">{p.emoji}</div>
                  <h3 className="font-display text-lg font-semibold mb-2 group-hover:text-primary transition-colors">{p.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.description}</p>
                  <div className="flex items-center gap-1 mt-4 text-sm font-medium text-primary">
                    View menu <ChevronRight className="h-4 w-4" />
                  </div>
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
              <h2 className="font-display text-3xl font-bold mb-2">Popular this week</h2>
              <p className="text-muted-foreground">Top picks from our community</p>
            </div>
            <Link to="/menu">
              <Button variant="ghost" className="hidden md:flex">
                View all <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {menuItems.slice(0, 4).map((item) => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* Subscription CTA */}
      <section className="py-20">
        <div className="container">
          <div className="rounded-3xl gradient-sunrise p-8 md:p-16 text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Subscribe & save up to 30%
            </h2>
            <p className="text-primary-foreground/80 max-w-lg mx-auto mb-8 text-lg">
              Choose a plan that fits your routine. Flexible scheduling, pause anytime, cancel anytime.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {subscriptionPlans.map((plan) => (
                <div key={plan.id} className={`bg-card/95 backdrop-blur rounded-xl p-6 text-left w-64 ${plan.isPopular ? 'ring-2 ring-accent scale-105' : ''}`}>
                  {plan.isPopular && <Badge className="mb-2 bg-accent text-accent-foreground">Most Popular</Badge>}
                  <h3 className="font-display font-bold text-foreground">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground">{plan.meals} meals/month</p>
                  <p className="font-display text-2xl font-bold text-foreground mt-2">₹{plan.price}<span className="text-sm font-normal text-muted-foreground">/mo</span></p>
                  <p className="text-xs text-secondary font-medium mt-1">Save {plan.savings}%</p>
                </div>
              ))}
            </div>
            <Link to="/pricing">
              <Button size="lg" className="mt-8 bg-card text-foreground hover:bg-card/90 font-semibold">
                View All Plans <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Community */}
      <section className="py-20 bg-muted/50">
        <div className="container text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Join the 7AM community</h2>
          <p className="text-muted-foreground max-w-md mx-auto mb-8">
            2,500+ commuters are already eating better mornings. Be part of our WhatsApp community.
          </p>
          <div className="grid sm:grid-cols-3 gap-6 max-w-2xl mx-auto mb-8">
            {[
              { value: '2,500+', label: 'Happy eaters' },
              { value: '15,000+', label: 'Meals served' },
              { value: '4.8★', label: 'Average rating' },
            ].map((stat) => (
              <div key={stat.label} className="p-6 rounded-xl bg-card border border-border shadow-soft">
                <p className="font-display text-3xl font-bold text-primary">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
          <Button variant="fresh" size="lg">
            <Users className="mr-2 h-4 w-4" /> Join WhatsApp Community
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
