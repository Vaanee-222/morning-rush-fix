import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { personas } from '@/data/mockData';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const questions = [
  {
    q: "What's your morning vibe?",
    options: [
      { label: 'Calm & traditional', persona: 'boomer' },
      { label: 'Hustling & productive', persona: 'millennial' },
      { label: 'Aesthetic & trendy', persona: 'genz' },
      { label: 'Treat yourself!', persona: 'indulge' },
    ],
  },
  {
    q: 'What matters most in breakfast?',
    options: [
      { label: 'Gut health & digestion', persona: 'boomer' },
      { label: 'High protein & energy', persona: 'millennial' },
      { label: 'Instagram-worthy looks', persona: 'genz' },
      { label: 'Taste over everything', persona: 'indulge' },
    ],
  },
  {
    q: 'Pick a drink:',
    options: [
      { label: 'Lassi or buttermilk', persona: 'boomer' },
      { label: 'Black coffee or green tea', persona: 'millennial' },
      { label: 'Matcha latte or smoothie', persona: 'genz' },
      { label: 'Hot chocolate', persona: 'indulge' },
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

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-16 max-w-2xl">
        {!result ? (
          <>
            <div className="text-center mb-8">
              <Badge className="mb-3 bg-primary/10 text-primary">Question {step + 1} of {questions.length}</Badge>
              <h1 className="font-display text-3xl font-bold">{questions[step].q}</h1>
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="grid gap-3">
                {questions[step].options.map((opt) => (
                  <button
                    key={opt.label}
                    onClick={() => handleAnswer(opt.persona)}
                    className="p-5 rounded-xl border border-border bg-card text-left hover:border-primary hover:shadow-card transition-all text-lg font-medium"
                  >
                    {opt.label}
                  </button>
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
            <div className="text-6xl mb-4">{persona.emoji}</div>
            <h1 className="font-display text-4xl font-bold mb-3">You're {persona.name}!</h1>
            <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">{persona.description}</p>
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
