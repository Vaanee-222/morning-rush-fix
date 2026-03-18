import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Play, Star, User, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const testimonials = [
  { id: '1', name: 'Priya S.', persona: 'Protein Hustler', emoji: '💪', quote: 'Best protein-packed breakfast I\'ve found near the metro. The Egg White Wrap is 🔥', duration: '0:45', rating: 5 },
  { id: '2', name: 'Ankit M.', persona: 'Gut Guardian', emoji: '🫘', quote: 'The Sprouted Moong Chaat has literally fixed my gut issues. Life-changing.', duration: '1:12', rating: 5 },
  { id: '3', name: 'Sneha D.', persona: 'Trend Setter', emoji: '✨', quote: 'My Instagram feed has never looked better. The Acai Bowl is pure art!', duration: '0:58', rating: 5 },
  { id: '4', name: 'Rahul K.', persona: 'Guilt-Free Rebel', emoji: '🍫', quote: 'Ragi Pancakes taste indulgent but are actually healthy? Sign me up forever.', duration: '1:30', rating: 5 },
  { id: '5', name: 'Meera R.', persona: 'Protein Hustler', emoji: '💪', quote: 'As a fitness enthusiast, finding 24g protein at a metro station is unreal.', duration: '0:35', rating: 4 },
  { id: '6', name: 'Vikram P.', persona: 'Gut Guardian', emoji: '🫘', quote: 'The Probiotic Lassi is my daily ritual now. My digestion has improved so much.', duration: '1:05', rating: 5 },
  { id: '7', name: 'Kavya S.', persona: 'Trend Setter', emoji: '✨', quote: 'Dragon Fruit Bowl for breakfast? Only at 7AM Club. Living my best life.', duration: '0:42', rating: 5 },
  { id: '8', name: 'Arjun T.', persona: 'Guilt-Free Rebel', emoji: '🍫', quote: 'Nutella Crepes that are \'guilt-free\'? I don\'t care if it\'s marketing, they\'re delicious.', duration: '0:55', rating: 4 },
];

export default function ExperiencePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-12">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-primary/10 text-primary">Community</Badge>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">The 7AM Experience</h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Real stories from real commuters. See how 7AM Club is changing Delhi NCR's breakfast game.
          </p>
        </div>

        {/* Video Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border hidden lg:block" />

          <div className="space-y-8">
            {testimonials.map((t, i) => (
              <div key={t.id} className={`flex items-start gap-6 ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                <div className={`flex-1 ${i % 2 === 0 ? 'lg:text-right' : ''}`}>
                  <Card className="shadow-soft hover:shadow-card transition-shadow inline-block w-full max-w-md">
                    {/* Video Placeholder */}
                    <div className="relative aspect-video bg-muted rounded-t-lg overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center bg-foreground/5">
                        <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center cursor-pointer hover:bg-primary transition-colors shadow-elevated">
                          <Play className="h-6 w-6 text-primary-foreground ml-1" />
                        </div>
                      </div>
                      <span className="absolute bottom-2 right-2 bg-foreground/80 text-background text-xs px-2 py-0.5 rounded">{t.duration}</span>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center"><User className="h-4 w-4 text-muted-foreground" /></div>
                        <div>
                          <p className="text-sm font-semibold">{t.name}</p>
                          <p className="text-[10px] text-muted-foreground">{t.emoji} {t.persona}</p>
                        </div>
                        <div className="flex items-center gap-0.5 ml-auto">
                          {[...Array(t.rating)].map((_, j) => <Star key={j} className="h-3 w-3 fill-golden text-golden" />)}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground italic">"{t.quote}"</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Timeline dot */}
                <div className="hidden lg:flex items-center justify-center w-4 h-4 rounded-full gradient-sunrise shrink-0 mt-8" />

                <div className="flex-1 hidden lg:block" />
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12 p-8 bg-muted/50 rounded-2xl">
          <h3 className="font-display text-2xl font-bold mb-3">Share Your Story</h3>
          <p className="text-muted-foreground mb-4">Record a short video about your 7AM Club experience. Get featured!</p>
          <Link to="/profile"><Button variant="hero">Upload Video <ChevronRight className="ml-2 h-4 w-4" /></Button></Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
