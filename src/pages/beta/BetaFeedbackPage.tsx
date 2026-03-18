import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Star, Camera, Send } from 'lucide-react';
import { getFoodImage } from '@/lib/images';

export default function BetaFeedbackPage() {
  const [ratings, setRatings] = useState({ taste: 0, portion: 0, packaging: 0, wouldOrder: 0 });
  const [review, setReview] = useState('');

  const setRating = (key: keyof typeof ratings, val: number) => setRatings({ ...ratings, [key]: val });

  const RatingStars = ({ category, value }: { category: keyof typeof ratings; value: number }) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(n => (
        <button key={n} onClick={() => setRating(category, n)}>
          <Star className={`h-6 w-6 transition-colors ${n <= value ? 'fill-golden text-golden' : 'text-muted'}`} />
        </button>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-8 max-w-2xl">
        <h1 className="font-display text-3xl font-bold mb-6">Submit Feedback</h1>

        <Card className="shadow-soft mb-6">
          <CardContent className="p-4 flex items-center gap-4">
            <img src={getFoodImage('9')} alt="" className="w-16 h-16 rounded-lg object-cover" />
            <div>
              <h3 className="font-display font-semibold">Quinoa Power Bowl</h3>
              <p className="text-sm text-muted-foreground">Ordered on Mar 17, 2026</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-elevated">
          <CardContent className="p-6 space-y-6">
            {[
              { key: 'taste' as const, label: '😋 Taste', desc: 'How did it taste?' },
              { key: 'portion' as const, label: '📏 Portion Size', desc: 'Was the portion adequate?' },
              { key: 'packaging' as const, label: '📦 Packaging', desc: 'Quality of packaging?' },
              { key: 'wouldOrder' as const, label: '🔄 Would Order Again?', desc: 'Would you buy this at full price?' },
            ].map(r => (
              <div key={r.key}>
                <div className="flex items-center justify-between mb-1">
                  <div>
                    <p className="font-medium">{r.label}</p>
                    <p className="text-xs text-muted-foreground">{r.desc}</p>
                  </div>
                  <RatingStars category={r.key} value={ratings[r.key]} />
                </div>
              </div>
            ))}

            <div>
              <label className="font-medium block mb-2">Written Review</label>
              <Textarea placeholder="Share your detailed thoughts..." rows={4} value={review} onChange={e => setReview(e.target.value)} />
            </div>

            <div>
              <label className="font-medium block mb-2">📸 Upload Photos</label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                <Camera className="h-6 w-6 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">Upload breakfast photos for UGC</p>
              </div>
            </div>

            <Button variant="hero" className="w-full"><Send className="h-4 w-4 mr-2" /> Submit Feedback</Button>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
}
