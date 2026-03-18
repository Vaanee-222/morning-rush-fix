import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { personas } from '@/data/mockData';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Check, MapPin, Utensils, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const steps = ['welcome', 'phone', 'persona', 'dietary', 'station', 'complete'];

const dietaryOptions = [
  { id: 'vegetarian', label: 'Vegetarian', emoji: '🥬' },
  { id: 'vegan', label: 'Vegan', emoji: '🌱' },
  { id: 'gluten-free', label: 'Gluten Free', emoji: '🌾' },
  { id: 'nut-allergy', label: 'Nut Allergy', emoji: '🥜' },
  { id: 'dairy-free', label: 'Dairy Free', emoji: '🥛' },
  { id: 'egg-free', label: 'Egg Free', emoji: '🥚' },
];

const stations = ['Rajiv Chowk', 'Huda City Centre', 'Kashmere Gate', 'Hauz Khas', 'Noida Sector 18', 'Dwarka Sector 21'];

export default function OnboardingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [selectedPersona, setSelectedPersona] = useState('');
  const [dietary, setDietary] = useState<string[]>([]);
  const [station, setStation] = useState('');

  const toggleDietary = (id: string) => setDietary(prev => prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id]);

  const next = () => setStep(s => Math.min(s + 1, steps.length - 1));
  const back = () => setStep(s => Math.max(s - 1, 0));

  const currentStep = steps[step];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Progress */}
        <div className="flex gap-1 mb-8">
          {steps.map((_, i) => (
            <div key={i} className={`h-1 flex-1 rounded-full ${i <= step ? 'gradient-sunrise' : 'bg-muted'}`} />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={currentStep} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            {currentStep === 'welcome' && (
              <div className="text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl gradient-sunrise mx-auto mb-6">
                  <span className="text-2xl font-bold text-primary-foreground">7</span>
                </div>
                <h1 className="font-display text-4xl font-bold mb-3">Welcome to 7AM Club</h1>
                <p className="text-muted-foreground text-lg mb-8">Your gut-friendly breakfast, ready at the metro exit.</p>
                <Button variant="hero" size="lg" onClick={next}>Get Started <ArrowRight className="ml-2 h-4 w-4" /></Button>
              </div>
            )}

            {currentStep === 'phone' && (
              <div className="text-center">
                <h2 className="font-display text-2xl font-bold mb-2">What's your number?</h2>
                <p className="text-muted-foreground mb-6">We'll send you a one-time verification code.</p>
                {!showOtp ? (
                  <div className="max-w-xs mx-auto space-y-4">
                    <Input placeholder="+91 98765 43210" value={phone} onChange={e => setPhone(e.target.value)} className="text-center text-lg" />
                    <Button variant="hero" className="w-full" onClick={() => setShowOtp(true)}>Send OTP</Button>
                  </div>
                ) : (
                  <div className="max-w-xs mx-auto space-y-4">
                    <p className="text-sm text-muted-foreground">OTP sent to {phone}</p>
                    <Input placeholder="Enter 6-digit OTP" value={otp} onChange={e => setOtp(e.target.value)} className="text-center text-lg tracking-widest" maxLength={6} />
                    <Button variant="hero" className="w-full" onClick={next}>Verify & Continue</Button>
                  </div>
                )}
              </div>
            )}

            {currentStep === 'persona' && (
              <div>
                <h2 className="font-display text-2xl font-bold mb-2 text-center">Pick your breakfast persona</h2>
                <p className="text-muted-foreground mb-6 text-center">We'll curate your menu based on this.</p>
                <div className="grid grid-cols-2 gap-3">
                  {personas.map(p => (
                    <button key={p.id} onClick={() => setSelectedPersona(p.id)}
                      className={`p-5 rounded-xl border text-left transition-all ${selectedPersona === p.id ? 'border-primary bg-primary/5 shadow-glow' : 'border-border bg-card hover:border-primary/50'}`}>
                      <span className="text-3xl">{p.emoji}</span>
                      <h3 className="font-display font-semibold mt-2 text-sm">{p.name}</h3>
                      <p className="text-[11px] text-muted-foreground mt-1 line-clamp-2">{p.description}</p>
                    </button>
                  ))}
                </div>
                <div className="flex gap-3 mt-6">
                  <Button variant="outline" onClick={back}><ArrowLeft className="h-4 w-4 mr-1" /> Back</Button>
                  <Button variant="hero" className="flex-1" onClick={next} disabled={!selectedPersona}>Continue</Button>
                </div>
              </div>
            )}

            {currentStep === 'dietary' && (
              <div>
                <h2 className="font-display text-2xl font-bold mb-2 text-center">Any dietary preferences?</h2>
                <p className="text-muted-foreground mb-6 text-center">Select all that apply. Skip if none.</p>
                <div className="grid grid-cols-2 gap-3">
                  {dietaryOptions.map(d => (
                    <button key={d.id} onClick={() => toggleDietary(d.id)}
                      className={`p-4 rounded-xl border text-left transition-all flex items-center gap-3 ${dietary.includes(d.id) ? 'border-primary bg-primary/5' : 'border-border bg-card hover:border-primary/50'}`}>
                      <span className="text-xl">{d.emoji}</span>
                      <span className="text-sm font-medium">{d.label}</span>
                      {dietary.includes(d.id) && <Check className="h-4 w-4 text-primary ml-auto" />}
                    </button>
                  ))}
                </div>
                <div className="flex gap-3 mt-6">
                  <Button variant="outline" onClick={back}><ArrowLeft className="h-4 w-4 mr-1" /> Back</Button>
                  <Button variant="hero" className="flex-1" onClick={next}>Continue</Button>
                </div>
              </div>
            )}

            {currentStep === 'station' && (
              <div>
                <h2 className="font-display text-2xl font-bold mb-2 text-center">Your preferred metro station</h2>
                <p className="text-muted-foreground mb-6 text-center">Where do you usually pick up breakfast?</p>
                <div className="space-y-2">
                  {stations.map(s => (
                    <button key={s} onClick={() => setStation(s)}
                      className={`w-full p-4 rounded-xl border text-left transition-all flex items-center gap-3 ${station === s ? 'border-primary bg-primary/5' : 'border-border bg-card hover:border-primary/50'}`}>
                      <MapPin className={`h-4 w-4 ${station === s ? 'text-primary' : 'text-muted-foreground'}`} />
                      <span className="font-medium">{s}</span>
                      {station === s && <Check className="h-4 w-4 text-primary ml-auto" />}
                    </button>
                  ))}
                </div>
                <div className="flex gap-3 mt-6">
                  <Button variant="outline" onClick={back}><ArrowLeft className="h-4 w-4 mr-1" /> Back</Button>
                  <Button variant="hero" className="flex-1" onClick={next}>Finish Setup</Button>
                </div>
              </div>
            )}

            {currentStep === 'complete' && (
              <div className="text-center">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}
                  className="w-20 h-20 mx-auto mb-6 rounded-full bg-secondary/10 flex items-center justify-center">
                  <Check className="h-10 w-10 text-secondary" />
                </motion.div>
                <h2 className="font-display text-3xl font-bold mb-3">You're all set! 🎉</h2>
                <p className="text-muted-foreground mb-8">Your personalized breakfast experience awaits.</p>
                <div className="flex flex-col gap-3 max-w-xs mx-auto">
                  <Button variant="hero" size="lg" onClick={() => navigate('/menu')}>
                    <Utensils className="h-4 w-4 mr-2" /> Explore Menu
                  </Button>
                  <Button variant="outline" size="lg" onClick={() => navigate('/dashboard')}>Go to Dashboard</Button>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
