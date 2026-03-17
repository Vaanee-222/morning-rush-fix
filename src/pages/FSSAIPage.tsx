import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShieldCheck, FileCheck, Thermometer, ClipboardCheck } from 'lucide-react';

export default function FSSAIPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-12 max-w-2xl">
        <div className="text-center mb-10">
          <Badge className="mb-4 bg-secondary/10 text-secondary border-secondary/20">Verified & Licensed</Badge>
          <h1 className="font-display text-4xl font-bold mb-3">FSSAI License</h1>
          <p className="text-muted-foreground">Your safety is our top priority. 7AM Club is fully licensed and compliant with FSSAI regulations.</p>
        </div>

        <Card className="shadow-elevated mb-8">
          <CardContent className="p-8 text-center">
            <ShieldCheck className="h-16 w-16 text-secondary mx-auto mb-4" />
            <h2 className="font-display text-xl font-bold mb-2">FSSAI License Number</h2>
            <p className="font-display text-3xl font-bold text-primary tracking-wider">10026071000123</p>
            <p className="text-sm text-muted-foreground mt-2">Category: Food Business Operator — Catering / Food Service</p>
          </CardContent>
        </Card>

        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { icon: FileCheck, title: 'Ingredient Sourcing', desc: 'All ingredients sourced from FSSAI-certified suppliers.' },
            { icon: Thermometer, title: 'Temperature Control', desc: 'Cold chain maintained from kitchen to pickup station.' },
            { icon: ClipboardCheck, title: 'Daily Audits', desc: 'Hygiene and quality checks performed every morning.' },
          ].map((item) => (
            <Card key={item.title} className="shadow-soft">
              <CardContent className="p-5 text-center">
                <item.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-display font-semibold text-sm mb-1">{item.title}</h3>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
