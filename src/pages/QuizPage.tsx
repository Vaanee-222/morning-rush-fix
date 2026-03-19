import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { personas } from '@/data/mockData';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const questions = [
  {
    q: "What's your morning vibe?",
    emoji: '🌅',
    options: [
      { label: 'Calm & traditional — chai + newspaper', persona: 'boomer' },
      { label: 'Hustling & productive — gym then work', persona: 'millennial' },
      { label: 'Aesthetic & trendy — story-worthy mornings', persona: 'genz' },
      { label: 'Treat yourself! — life is short', persona: 'indulge' },
    ],
  },
  {
    q: 'What matters most in breakfast?',
    emoji: '🥣',
    options: [
      { label: 'Gut health & digestion', persona: 'boomer' },
      { label: 'High protein & sustained energy', persona: 'millennial' },
      { label: 'Instagram-worthy presentation', persona: 'genz' },
      { label: 'Taste over everything else', persona: 'indulge' },
    ],
  },
  {
    q: 'Pick a drink:',
    emoji: '🥤',
    options: [
      { label: 'Lassi or buttermilk', persona: 'boomer' },
      { label: 'Black coffee or green tea', persona: 'millennial' },
      { label: 'Matcha latte or smoothie bowl', persona: 'genz' },
      { label: 'Hot chocolate with whipped cream', persona: 'indulge' },
    ],
  },
  {
    q: 'How do you handle fitness?',
    emoji: '💪',
    options: [
      { label: 'Morning walk or yoga', persona: 'boomer' },
      { label: 'Gym 5x a week — tracking macros', persona: 'millennial' },
      { label: 'Pilates, dance, or a viral workout', persona: 'genz' },
      { label: 'Does walking to the fridge count?', persona: 'indulge' },
    ],
  },
  {
    q: 'Your relationship with spice?',
    emoji: '🌶️',
    options: [
      { label: 'Comfort level — homestyle masala', persona: 'boomer' },
      { label: 'Controlled — just enough for flavor', persona: 'millennial' },
      { label: 'Adventurous — Sriracha on everything', persona: 'genz' },
      { label: 'Bring the heat! Extra chutney always', persona: 'indulge' },
    ],
  },
  {
    q: 'What allergens do you avoid?',
    emoji: '⚠️',
    options: [
      { label: 'None — I eat everything traditional', persona: 'boomer' },
      { label: 'Gluten or dairy — clean eating', persona: 'millennial' },
      { label: 'Nuts — safety first', persona: 'genz' },
      { label: 'None — more toppings please!', persona: 'indulge' },
    ],
  },
  {
    q: 'Your breakfast budget per meal?',
    emoji: '💰',
    options: [
      { label: '₹50-80 — value is key', persona: 'boomer' },
      { label: '₹80-120 — balanced investment', persona: 'millennial' },
      { label: '₹100-150 — worth the aesthetic', persona: 'genz' },
      { label: '₹150+ — premium only', persona: 'indulge' },
    ],
  },
  {
    q: 'Your ideal weekend breakfast?',
    emoji: '🏖️',
    options: [
      { label: 'Poha with chai watching morning news', persona: 'boomer' },
      { label: 'Egg white omelette with avocado toast', persona: 'millennial' },
      { label: 'Açaí bowl for the gram', persona: 'genz' },
      { label: 'Full stack pancakes with maple syrup', persona: 'indulge' },
    ],
  },
  {
    q: 'What health goal drives you?',
    emoji: '🎯',
    options: [
      { label: 'Better digestion & immunity', persona: 'boomer' },
      { label: 'Muscle gain & fat loss', persona: 'millennial' },
      { label: 'Glowing skin & clean energy', persona: 'genz' },
      { label: 'Happiness — food is joy!', persona: 'indulge' },
    ],
  },
  {
    q: 'How do you discover new food?',
    emoji: '🔍',
    options: [
      { label: 'Family recipes passed down', persona: 'boomer' },
      { label: 'Fitness influencers & nutrition blogs', persona: 'millennial' },
      { label: 'TikTok & Instagram food trends', persona: 'genz' },
      { label: 'Street food walks & food festivals', persona: 'indulge' },
    ],
  },
];

export default function QuizPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<string | null>(null);

  const handleAnswer = (persona: string) => {
    const next = [...answers, persona];
    setAnswers(next);
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      const counts: Record<string, number> = {};
      next.forEach(p => counts[p] = (counts[p] || 0) + 1);
      const winner = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
      setResult(winner);
    }
  };

  const persona = result ? personas.find(p => p.id === result) : null;
  const progress = ((step + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-16 max-w-2xl">
        {!result ? (
          <>
            <div className="text-center mb-8">
              <Badge className="mb-3 bg-primary/10 text-primary">
                <Sparkles className="h-3 w-3 mr-1" /> Question {step + 1} of {questions.length}
              </Badge>
              <Progress value={progress} className="h-2 mb-6 max-w-xs mx-auto" />
              <div className="text-5xl mb-4">{questions[step].emoji}</div>
              <h1 className="font-display text-3xl font-bold">{questions[step].q}</h1>
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="grid gap-3">
                {questions[step].options.map((opt, i) => (
                  <motion.button
                    key={opt.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    onClick={() => handleAnswer(opt.persona)}
                    className="p-5 rounded-xl border border-border bg-card text-left hover:border-primary hover:shadow-card transition-all text-lg font-medium group"
                  >
                    <span className="group-hover:translate-x-1 inline-block transition-transform">{opt.label}</span>
                  </motion.button>
                ))}
              </motion.div>
            </AnimatePresence>
            {step > 0 && (
              <Button variant="ghost" className="mt-4" onClick={() => { setStep(step - 1); setAnswers(answers.slice(0, -1)); }}>
                <ChevronLeft className="h-4 w-4 mr-1" /> Back
              </Button>
            )}
          </>
        ) : persona ? (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.2 }} className="text-7xl mb-4">{persona.emoji}</motion.div>
            <h1 className="font-display text-4xl font-bold mb-3">You're {persona.name}!</h1>
            <p className="text-muted-foreground text-lg mb-4 max-w-md mx-auto">{persona.description}</p>

            {/* Score breakdown */}
            <Card className="max-w-sm mx-auto mb-8 shadow-soft">
              <CardContent className="p-4">
                <p className="text-sm font-semibold mb-3">Your Persona Breakdown</p>
                {personas.map(p => {
                  const count = answers.filter(a => a === p.id).length;
                  const pct = Math.round((count / answers.length) * 100);
                  return (
                    <div key={p.id} className="flex items-center gap-2 mb-2">
                      <span className="text-sm w-6">{p.emoji}</span>
                      <div className="flex-1">
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ delay: 0.5, duration: 0.6 }} className="h-full bg-primary rounded-full" />
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground w-8 text-right">{pct}%</span>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            <div className="flex justify-center gap-3">
              <Link to={`/menu/${persona.id}`}>
                <Button variant="hero" size="lg">See Your Menu <ArrowRight className="ml-2 h-4 w-4" /></Button>
              </Link>
              <Button variant="outline" size="lg" onClick={() => { setStep(0); setAnswers([]); setResult(null); }}>Retake Quiz</Button>
            </div>
          </motion.div>
        ) : null}
      </div>
      <Footer />
    </div>
  );
}
