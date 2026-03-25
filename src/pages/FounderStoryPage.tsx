import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

const timeline = [
  { year: '2024', title: 'The "Aha!" Moment', text: 'Standing at Rajiv Chowk at 7:30 AM, watching thousands of commuters rush past with empty stomachs or greasy samosas. We thought: "What if healthy breakfast was as convenient as the metro itself?"' },
  { year: '2024', title: 'The Kitchen Experiment', text: 'We spent 6 months in a cloud kitchen testing 500+ recipes. The brief: gut-friendly, high-protein, under ₹150, and ready in 2 minutes. No compromises on taste.' },
  { year: '2025', title: 'The Persona Discovery', text: 'We realized one menu doesn\'t fit all. Through 2,000+ customer interviews, we identified 4 breakfast personas: The Gut Guardian, The Protein Hustler, The Trend Setter, and The Guilt-Free Rebel.' },
  { year: '2025', title: 'First Station Launch', text: 'Rajiv Chowk, Exit Gate 6. Our first station served 47 breakfasts on day one. By month two, we were doing 200+ daily. The metro commuter had spoken.' },
  { year: '2026', title: '5 Stations & Growing', text: 'Today we serve 2,500+ happy eaters across 5 metro stations, with 200+ menu items, a thriving Beta Eater community, and a mission to serve every metro station in India.' },
];

export default function FounderStoryPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-12 max-w-3xl">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-primary/10 text-primary">Our Story</Badge>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">How Gym Cafe Was Born</h1>
          <p className="text-muted-foreground text-lg">The story of turning a metro exit into India's breakfast revolution.</p>
        </div>

        {/* Hero Quote */}
        <Card className="shadow-elevated mb-12 overflow-hidden">
          <div className="gradient-sunrise p-8 md:p-12 text-center">
            <p className="text-primary-foreground text-xl md:text-2xl font-display italic leading-relaxed">
              "We didn't start a food company. We started a morning revolution. Because when 2.5 million people skip breakfast every day, that's not a business opportunity — that's a problem worth solving."
            </p>
            <p className="text-primary-foreground/80 mt-4 font-medium">— The Founding Team</p>
          </div>
        </Card>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-border" />
          <div className="space-y-8">
            {timeline.map((event, i) => (
              <div key={i} className="flex gap-6 ml-2">
                <div className="w-12 h-12 rounded-full gradient-sunrise flex items-center justify-center text-sm font-bold text-primary-foreground shrink-0 z-10">
                  {event.year.slice(2)}
                </div>
                <Card className="shadow-soft flex-1">
                  <CardContent className="p-5">
                    <Badge variant="outline" className="mb-2 text-xs">{event.year}</Badge>
                    <h3 className="font-display text-lg font-semibold mb-2">{event.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{event.text}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div className="mt-12">
          <h2 className="font-display text-2xl font-bold text-center mb-8">What We Believe</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { emoji: '🧠', title: 'Gut = Brain', desc: 'Good digestion is the foundation of productivity. Your gut decides your day.' },
              { emoji: '⏱️', title: 'Time Is Respect', desc: '2-minute pickup because your morning time is sacred.' },
              { emoji: '🌍', title: 'Food For All', desc: 'Healthy breakfast shouldn\'t be a luxury. We price for the masses.' },
            ].map(v => (
              <Card key={v.title} className="shadow-soft text-center">
                <CardContent className="p-6">
                  <p className="text-3xl mb-3">{v.emoji}</p>
                  <h3 className="font-display font-semibold mb-2">{v.title}</h3>
                  <p className="text-sm text-muted-foreground">{v.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
