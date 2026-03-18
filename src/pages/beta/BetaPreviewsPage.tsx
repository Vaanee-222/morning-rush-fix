import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ThumbsUp, ThumbsDown, Meh } from 'lucide-react';
import { getFoodImage } from '@/lib/images';

const previews = [
  { id: '1', name: 'Matcha Tiramisu Bowl', desc: 'Japanese-Italian fusion — creamy matcha mascarpone over ladyfinger crumble.', votes: 42, image: '4', status: 'voting' },
  { id: '2', name: 'Spicy Jackfruit Wrap', desc: 'Pulled jackfruit with sriracha mayo and pickled slaw.', votes: 38, image: '3', status: 'voting' },
  { id: '3', name: 'Charcoal Latte', desc: 'Activated charcoal with vanilla and oat milk. Detox goals.', votes: 56, image: '7', status: 'voting' },
  { id: '4', name: 'Mango Sticky Rice Bowl', desc: 'Thai-inspired mango with coconut sticky rice and sesame.', votes: 71, image: '4', status: 'approved' },
  { id: '5', name: 'Protein Cookie Dough Bowl', desc: 'Edible cookie dough made healthy with chickpea flour and whey.', votes: 29, image: '6', status: 'voting' },
];

export default function BetaPreviewsPage() {
  const [voted, setVoted] = useState<Record<string, string>>({});

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-8 max-w-3xl">
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl font-bold mb-2">🔮 Exclusive Previews</h1>
          <p className="text-muted-foreground">As a Beta Eater, you get to vote on what's next on the menu!</p>
        </div>

        <div className="space-y-4">
          {previews.map(p => (
            <Card key={p.id} className="shadow-soft overflow-hidden">
              <CardContent className="p-0 flex">
                <img src={getFoodImage(p.image)} alt={p.name} className="w-32 h-32 object-cover hidden sm:block" />
                <div className="p-5 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-display font-semibold">{p.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{p.desc}</p>
                    </div>
                    {p.status === 'approved' && <Badge className="bg-secondary/10 text-secondary shrink-0">Coming Soon!</Badge>}
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-sm text-muted-foreground">{p.votes + (voted[p.id] === 'love' ? 1 : 0)} votes</span>
                    {voted[p.id] ? (
                      <Badge variant="outline">You voted: {voted[p.id] === 'love' ? '❤️ Love it' : voted[p.id] === 'meh' ? '😐 Meh' : '👎 Needs Work'}</Badge>
                    ) : p.status === 'voting' ? (
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => setVoted({ ...voted, [p.id]: 'love' })}>
                          <ThumbsUp className="h-3 w-3 mr-1" /> Love it
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => setVoted({ ...voted, [p.id]: 'meh' })}>
                          <Meh className="h-3 w-3 mr-1" /> Meh
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => setVoted({ ...voted, [p.id]: 'nope' })}>
                          <ThumbsDown className="h-3 w-3 mr-1" /> Nope
                        </Button>
                      </div>
                    ) : null}
                  </div>
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
