import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Star, Send, ThumbsUp } from 'lucide-react';

export default function FeedbackPage() {
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container py-16 max-w-lg text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary/10 flex items-center justify-center">
            <ThumbsUp className="h-8 w-8 text-secondary" />
          </div>
          <h1 className="font-display text-3xl font-bold mb-3">Thank You! 🎉</h1>
          <p className="text-muted-foreground mb-6">Your feedback helps us make Gym Cafe better for everyone.</p>
          <Button variant="hero" onClick={() => setSubmitted(false)}>Submit Another</Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-12 max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl font-bold mb-2">We Value Your Feedback 💬</h1>
          <p className="text-muted-foreground">Help us improve the Gym Cafe experience.</p>
        </div>

        <Card className="shadow-elevated">
          <CardContent className="p-6 space-y-6">
            <div>
              <label className="font-medium block mb-2">How would you rate your overall experience?</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(n => (
                  <button key={n} onClick={() => setRating(n)}>
                    <Star className={`h-8 w-8 transition-colors ${n <= rating ? 'fill-golden text-golden' : 'text-muted'}`} />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="font-medium block mb-2">What went well?</label>
              <div className="flex flex-wrap gap-2">
                {['Food Quality', 'Taste', 'Speed', 'Packaging', 'Variety', 'Value', 'Staff'].map(t => (
                  <Badge key={t} variant="outline" className="cursor-pointer hover:bg-primary/10">{t}</Badge>
                ))}
              </div>
            </div>

            <div>
              <label className="font-medium block mb-2">What could we improve?</label>
              <div className="flex flex-wrap gap-2">
                {['More Options', 'Portion Size', 'Wait Time', 'App Experience', 'Pricing', 'Stations'].map(t => (
                  <Badge key={t} variant="outline" className="cursor-pointer hover:bg-destructive/10">{t}</Badge>
                ))}
              </div>
            </div>

            <div>
              <label className="font-medium block mb-2">Tell us more (optional)</label>
              <Textarea placeholder="Share your detailed feedback..." rows={4} />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div><label className="text-sm font-medium mb-1 block">Name (optional)</label><Input placeholder="Your name" /></div>
              <div><label className="text-sm font-medium mb-1 block">Email (optional)</label><Input placeholder="for follow-up" type="email" /></div>
            </div>

            <Button variant="hero" className="w-full" onClick={() => setSubmitted(true)}>
              <Send className="h-4 w-4 mr-2" /> Submit Feedback
            </Button>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
}
