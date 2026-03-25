import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, MapPin, Clock, Utensils, Users, Star, Heart, Zap, Gift } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getFoodImage } from '@/lib/images';

const tourSteps = [
  {
    title: 'The Morning Problem',
    icon: Clock,
    content: 'Every morning, 2.5 million Delhi NCR commuters skip breakfast or grab unhealthy street food. The result? Low energy, poor gut health, and wasted potential.',
    visual: '🏃‍♂️ → 🚇 → 😩',
    color: 'bg-destructive/10 text-destructive',
  },
  {
    title: 'Our Solution',
    icon: Utensils,
    content: 'Pre-book a gut-friendly, persona-matched breakfast the night before. Pick it up in 2 minutes at your metro exit. Fresh, hot, and waiting for you.',
    visual: '🌙📱 → ☀️🚇 → 🥗😊',
    color: 'bg-primary/10 text-primary',
  },
  {
    title: 'Find Your Persona',
    icon: Users,
    content: 'Take our quiz and discover if you\'re a Gut Guardian, Protein Hustler, Trend Setter, or Guilt-Free Rebel. We curate your menu based on your style.',
    visual: '🫘 💪 ✨ 🍫',
    color: 'bg-persona-millennial/10 text-persona-millennial',
  },
  {
    title: 'Browse & Pre-Order',
    icon: Star,
    content: '200+ gut-friendly items with full nutrition info. Filter by protein, calories, persona, diet. Add to cart and schedule pickup for tomorrow morning.',
    visual: '📱 🛒 ✅',
    color: 'bg-secondary/10 text-secondary',
  },
  {
    title: 'Pick Up at Metro',
    icon: MapPin,
    content: 'Arrive at the metro, flash your QR code, grab your breakfast in under 2 minutes. Currently at 5 stations across Delhi NCR.',
    visual: '🚇 📲 🥡',
    color: 'bg-golden/10 text-accent-foreground',
  },
  {
    title: 'Subscribe & Save',
    icon: Zap,
    content: 'Choose from 5 plans: Sprout Saver (10 meals), Regular Fix (20), Munch Legend (30), Breakfast Freak, or Crazy People Club. Save up to 30%.',
    visual: '📅 💰 🎉',
    color: 'bg-primary/10 text-primary',
  },
  {
    title: 'Join the Community',
    icon: Heart,
    content: 'Become a Beta Eater, earn rewards, refer friends, join WhatsApp groups, vote on new items, and be part of India\'s breakfast revolution.',
    visual: '👥 🏆 ❤️',
    color: 'bg-persona-genz/10 text-persona-genz',
  },
];

export default function TourPage() {
  const [step, setStep] = useState(0);
  const current = tourSteps[step];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-12 max-w-3xl">
        <div className="text-center mb-8">
          <Badge className="mb-3 bg-primary/10 text-primary">Interactive Tour</Badge>
          <h1 className="font-display text-3xl md:text-4xl font-bold">Discover Gym Cafe</h1>
        </div>

        {/* Progress */}
        <div className="flex gap-1 mb-8">
          {tourSteps.map((_, i) => (
            <button key={i} onClick={() => setStep(i)} className={`h-2 flex-1 rounded-full transition-colors ${i <= step ? 'gradient-sunrise' : 'bg-muted'}`} />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <Card className="shadow-elevated overflow-hidden">
              <div className={`p-6 ${current.color}`}>
                <div className="flex items-center gap-3">
                  <current.icon className="h-8 w-8" />
                  <div>
                    <p className="text-xs font-medium opacity-70">Step {step + 1} of {tourSteps.length}</p>
                    <h2 className="font-display text-2xl font-bold">{current.title}</h2>
                  </div>
                </div>
              </div>
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <p className="text-4xl mb-4">{current.visual}</p>
                  <p className="text-lg text-muted-foreground leading-relaxed">{current.content}</p>
                </div>

                {/* Preview images */}
                <div className="flex justify-center gap-3 mt-6">
                  {[1, 2, 3].map(n => (
                    <img key={n} src={getFoodImage(String(step + n))} alt="" className="w-20 h-20 rounded-xl object-cover shadow-soft" />
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-between mt-8">
          <Button variant="outline" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}>
            <ArrowLeft className="h-4 w-4 mr-1" /> Previous
          </Button>
          <span className="text-sm text-muted-foreground">{step + 1} / {tourSteps.length}</span>
          {step < tourSteps.length - 1 ? (
            <Button variant="hero" onClick={() => setStep(step + 1)}>
              Next <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          ) : (
            <Link to="/login">
              <Button variant="hero">Get Started <ArrowRight className="h-4 w-4 ml-1" /></Button>
            </Link>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
