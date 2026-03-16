import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, ChevronRight } from 'lucide-react';
import { metroStations } from '@/data/mockData';

const activeStations = metroStations.slice(0, 5);
const comingSoon = metroStations.slice(5);

export default function LocationsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-16">
        <h1 className="font-display text-4xl font-bold mb-2">Our Locations</h1>
        <p className="text-muted-foreground mb-10">Find your nearest 7AM Club pickup point at metro exits across Delhi NCR</p>

        <h2 className="font-display text-xl font-semibold mb-4 flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" /> Active Stations
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {activeStations.map((station) => (
            <div key={station} className="p-6 rounded-xl border border-border bg-card shadow-soft hover:shadow-card transition-shadow">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-display font-semibold text-lg">{station}</h3>
                  <p className="text-sm text-muted-foreground mt-1">Gate No. 3, Exit A</p>
                  <div className="flex items-center gap-1 mt-2 text-xs text-secondary">
                    <Clock className="h-3 w-3" /> 6:30 AM – 10:00 AM
                  </div>
                </div>
                <Badge className="bg-secondary/10 text-secondary border-secondary/20">Active</Badge>
              </div>
            </div>
          ))}
        </div>

        <h2 className="font-display text-xl font-semibold mb-4 flex items-center gap-2">
          <MapPin className="h-5 w-5 text-muted-foreground" /> Coming Soon
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {comingSoon.map((station) => (
            <div key={station} className="p-6 rounded-xl border border-border bg-muted/50 opacity-70">
              <h3 className="font-display font-semibold">{station}</h3>
              <p className="text-sm text-muted-foreground mt-1">Launching soon</p>
              <button className="flex items-center gap-1 mt-3 text-xs font-medium text-primary">
                Notify me <ChevronRight className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
