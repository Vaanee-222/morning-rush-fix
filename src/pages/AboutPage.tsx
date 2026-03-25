import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import heroFood from '@/assets/hero-food.jpg';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-16 max-w-3xl">
        <h1 className="font-display text-4xl font-bold mb-6">About Gym Cafe</h1>
        <div className="rounded-2xl overflow-hidden mb-8">
          <img src={heroFood} alt="Gym Cafe food" className="w-full h-64 object-cover" />
        </div>
        <div className="prose prose-lg max-w-none text-foreground">
          <p className="text-muted-foreground text-lg leading-relaxed">
            We started Gym Cafe with a simple observation: 2.5 million Delhi NCR commuters skip breakfast or grab junk at metro stations every single day. That's a gut-health crisis hiding in plain sight.
          </p>
          <h2 className="font-display text-2xl font-bold mt-8 mb-3">Our Mission</h2>
          <p className="text-muted-foreground leading-relaxed">
            To make gut-friendly, protein-packed, delicious breakfasts accessible to every commuter — right at the metro exit, ready in 2 minutes.
          </p>
          <h2 className="font-display text-2xl font-bold mt-8 mb-3">How We're Different</h2>
          <ul className="space-y-2 text-muted-foreground">
            <li>🫘 <strong className="text-foreground">Persona-based menus</strong> — curated for your gut type, not one-size-fits-all</li>
            <li>⏰ <strong className="text-foreground">24-hour pre-ordering</strong> — zero waste, zero wait, zero chaos</li>
            <li>🚇 <strong className="text-foreground">Metro-exit pickup</strong> — we come to you, not the other way around</li>
            <li>💚 <strong className="text-foreground">Clean ingredients</strong> — no preservatives, no artificial flavors, no shortcuts</li>
          </ul>
          <h2 className="font-display text-2xl font-bold mt-8 mb-3">Our Team</h2>
          <p className="text-muted-foreground leading-relaxed">
            We're a team of food scientists, gut health researchers, and metro commuters ourselves. We eat what we sell — every single day at 7 AM.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
