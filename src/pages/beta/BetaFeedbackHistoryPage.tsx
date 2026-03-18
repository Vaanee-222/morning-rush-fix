import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';
import { getFoodImage } from '@/lib/images';

const feedbackHistory = [
  { id: '1', item: 'Sprouted Moong Chaat', date: 'Mar 15, 2026', rating: 4.8, status: 'published', image: '1' },
  { id: '2', item: 'Acai Smoothie Bowl', date: 'Mar 12, 2026', rating: 5.0, status: 'published', image: '4' },
  { id: '3', item: 'Overnight Oats Bowl', date: 'Mar 10, 2026', rating: 4.2, status: 'published', image: '2' },
  { id: '4', item: 'Probiotic Lassi', date: 'Mar 8, 2026', rating: 4.5, status: 'published', image: '7' },
  { id: '5', item: 'Multigrain Thepla Wrap', date: 'Mar 5, 2026', rating: 4.7, status: 'pending', image: '3' },
];

export default function BetaFeedbackHistoryPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-8 max-w-3xl">
        <h1 className="font-display text-3xl font-bold mb-6">Feedback History</h1>
        <p className="text-muted-foreground mb-8">You've submitted {feedbackHistory.length} reviews so far. Keep it up! 🎉</p>

        <div className="space-y-3">
          {feedbackHistory.map(fb => (
            <Card key={fb.id} className="shadow-soft">
              <CardContent className="p-4 flex items-center gap-4">
                <img src={getFoodImage(fb.image)} alt={fb.item} className="w-14 h-14 rounded-lg object-cover" />
                <div className="flex-1">
                  <h3 className="font-display font-semibold text-sm">{fb.item}</h3>
                  <p className="text-xs text-muted-foreground">{fb.date}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-golden text-golden" />
                    <span className="font-medium text-sm">{fb.rating}</span>
                  </div>
                  <Badge variant="outline" className={`text-xs ${fb.status === 'published' ? 'text-secondary border-secondary/30' : 'text-golden border-golden/30'}`}>
                    {fb.status}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
