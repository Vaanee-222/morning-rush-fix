import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Crown, Star, Coffee, Sparkles, Gift, Zap, Shield, Plus, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const membershipAddons = [
  {
    id: 'free', name: 'No Membership', price: 0, emoji: '👋', color: 'border-border',
    tagline: 'Just subscribe & eat',
    perks: ['Access to full menu', 'Standard pickup', 'WhatsApp updates'],
    extras: [],
  },
  {
    id: 'silver', name: 'Silver Member', price: 199, emoji: '🥈', color: 'border-muted-foreground/30',
    tagline: 'Daily drinks on us',
    perks: ['Free Probiotic Lassi daily', 'Priority pickup queue', 'Member-only menu items', 'Birthday surprise meal'],
    extras: ['Save ~₹2,070/month on lassi alone'],
  },
  {
    id: 'gold', name: 'Gold Member', price: 399, emoji: '🥇', color: 'border-golden shadow-glow', popular: true,
    tagline: 'VIP breakfast experience',
    perks: ['Free drink with every order', 'Daily Sprouted Moong add-on', 'VIP skip-the-line lane', 'Member-only menu items', 'Weekly surprise item', 'Birthday combo meal free'],
    extras: ['Save ~₹4,000/month on add-ons & drinks'],
  },
  {
    id: 'platinum', name: 'Platinum Member', price: 799, emoji: '💎', color: 'border-persona-genz/30',
    tagline: 'The ultimate club experience',
    perks: ['Free premium drink every order', 'Daily protein shake or smoothie bowl', 'Weekly free Acai/Pancake upgrade', 'Personal menu curation', 'Co-create new menu items', 'VIP tasting events access', '24/7 concierge WhatsApp', 'Exclusive merch pack quarterly', 'Birthday entire week free'],
    extras: ['Save ~₹6,500/month on premium add-ons'],
  },
];

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

export default function MembershipPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="gradient-hero py-16 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          {['👑', '🥈', '🥇', '💎', '🎁'].map((e, i) => (
            <motion.div key={i} className="absolute text-4xl opacity-10" style={{ left: `${12 + i * 18}%`, top: `${20 + (i % 3) * 25}%` }}
              animate={{ y: [0, -15, 0] }} transition={{ duration: 3 + i * 0.4, repeat: Infinity, delay: i * 0.3 }}>
              {e}
            </motion.div>
          ))}
        </div>
        <div className="container relative z-10 text-center max-w-3xl">
          <Badge className="mb-4 bg-golden/10 text-accent-foreground border-golden/20"><Crown className="h-3 w-3 mr-1" /> Membership Add-on</Badge>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Upgrade Your <span className="text-gradient-sunrise">Breakfast</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-4">
            Membership is a <strong>separate add-on</strong> to your subscription. Get free drinks, daily add-ons, VIP access, and exclusive perks.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted text-sm text-muted-foreground">
            <Shield className="h-4 w-4 text-primary" />
            Membership ≠ Subscription · Add it on top of any plan
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-10 bg-muted/50 border-b border-border">
        <div className="container max-w-3xl">
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { step: '1', emoji: '📋', title: 'Pick a Subscription', desc: 'Choose 10, 20, or 30 meals/month' },
              { step: '2', emoji: '👑', title: 'Add Membership', desc: 'Optionally upgrade with member perks' },
              { step: '3', emoji: '🎉', title: 'Enjoy Extras', desc: 'Free drinks, add-ons & VIP access daily' },
            ].map(s => (
              <motion.div key={s.step} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="p-4 rounded-2xl bg-card border border-border">
                <div className="text-3xl mb-2">{s.emoji}</div>
                <div className="w-6 h-6 rounded-full gradient-sunrise text-primary-foreground text-xs font-bold flex items-center justify-center mx-auto mb-2">{s.step}</div>
                <h4 className="font-display font-semibold text-sm">{s.title}</h4>
                <p className="text-xs text-muted-foreground mt-1">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership Tiers */}
      <section className="py-16">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="font-display text-3xl font-bold mb-2 text-center">Choose Your Membership</motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground text-center mb-10">Add any of these on top of your subscription plan</motion.p>

            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {membershipAddons.map((tier, i) => (
                <motion.div key={tier.id} variants={fadeUp}>
                  <Card className={`shadow-card flex flex-col h-full transition-all duration-300 hover:-translate-y-1 ${tier.color} ${tier.popular ? 'scale-[1.02]' : ''}`}>
                    <CardContent className="p-6 flex flex-col flex-1">
                      {tier.popular && <Badge className="self-start mb-3 bg-golden text-accent-foreground">Most Popular</Badge>}
                      <div className="text-4xl mb-3">{tier.emoji}</div>
                      <h3 className="font-display text-xl font-bold">{tier.name}</h3>
                      <p className="text-sm text-muted-foreground italic mb-3">{tier.tagline}</p>

                      <div className="mb-4">
                        {tier.price > 0 ? (
                          <>
                            <span className="font-display text-3xl font-bold">₹{tier.price}</span>
                            <span className="text-muted-foreground">/month</span>
                          </>
                        ) : (
                          <span className="font-display text-2xl font-bold text-muted-foreground">Free</span>
                        )}
                      </div>

                      {tier.extras.length > 0 && (
                        <div className="mb-4 p-3 rounded-lg bg-secondary/5 border border-secondary/20">
                          {tier.extras.map(e => (
                            <p key={e} className="text-xs text-secondary font-medium flex items-center gap-1">
                              <Sparkles className="h-3 w-3 shrink-0" /> {e}
                            </p>
                          ))}
                        </div>
                      )}

                      <ul className="space-y-2 mb-6 flex-1">
                        {tier.perks.map(p => (
                          <li key={p} className="flex items-start gap-2 text-sm">
                            <Check className="h-4 w-4 text-secondary mt-0.5 shrink-0" />
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>

                      {tier.price > 0 ? (
                        <Button variant={tier.popular ? 'hero' : 'outline'} className="w-full" asChild>
                          <Link to="/subscriptions">Add to Plan <Plus className="ml-2 h-4 w-4" /></Link>
                        </Button>
                      ) : (
                        <Button variant="outline" className="w-full" disabled>Included by Default</Button>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Comparison note */}
      <section className="py-10 bg-muted/50">
        <div className="container max-w-2xl text-center">
          <h3 className="font-display text-xl font-bold mb-3">Membership vs Subscription</h3>
          <div className="grid grid-cols-2 gap-4">
            <Card className="shadow-soft">
              <CardContent className="p-5 text-left">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="h-5 w-5 text-primary" />
                  <h4 className="font-display font-semibold">Subscription</h4>
                </div>
                <ul className="space-y-1.5 text-sm text-muted-foreground">
                  <li>• Your meal plan (10/20/30 meals)</li>
                  <li>• Determines how many breakfasts</li>
                  <li>• Choose items & schedule</li>
                  <li>• Required to order</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="shadow-soft">
              <CardContent className="p-5 text-left">
                <div className="flex items-center gap-2 mb-3">
                  <Crown className="h-5 w-5 text-golden" />
                  <h4 className="font-display font-semibold">Membership</h4>
                </div>
                <ul className="space-y-1.5 text-sm text-muted-foreground">
                  <li>• Optional add-on perks</li>
                  <li>• Free drinks & daily extras</li>
                  <li>• VIP access & exclusive items</li>
                  <li>• Not required — just extra value</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12">
        <div className="container max-w-2xl text-center">
          <div className="rounded-3xl gradient-sunrise p-8 md:p-12 relative overflow-hidden">
            <motion.div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
            <div className="relative z-10">
              <h3 className="font-display text-2xl font-bold text-primary-foreground mb-3">Don't have a subscription yet?</h3>
              <p className="text-primary-foreground/80 mb-6">Start with a meal plan, then add membership for the ultimate experience.</p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button size="lg" className="bg-card text-foreground hover:bg-card/90 font-semibold" asChild>
                  <Link to="/pricing">View Subscription Plans <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
                <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
                  <Link to="/subscription/schedule">Customize Your Plan <ChevronRight className="ml-1 h-4 w-4" /></Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
