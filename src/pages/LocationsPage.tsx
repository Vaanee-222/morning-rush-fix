import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Clock, ChevronRight, Star, Users, Navigation, Phone, QrCode, Train, Zap, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

interface Station {
  id: string;
  name: string;
  line: string;
  lineColor: string;
  gate: string;
  timing: string;
  address: string;
  rating: number;
  ordersToday: number;
  avgPickup: string;
  isActive: boolean;
  features: string[];
  phone: string;
  landmark: string;
}

const stations: Station[] = [
  { id: 's1', name: 'Rajiv Chowk', line: 'Yellow & Blue Line', lineColor: 'bg-golden', gate: 'Gate 3, Exit A', timing: '6:30 AM – 10:00 AM', address: 'Rajiv Chowk Metro, Connaught Place, New Delhi',
    rating: 4.9, ordersToday: 187, avgPickup: '1:32', isActive: true, features: ['VIP Lane', 'QR Pickup', 'Seating Area', 'Water Station'], phone: '+91 98765 00001', landmark: 'Near Starbucks, CP outer circle' },
  { id: 's2', name: 'Huda City Centre', line: 'Yellow Line', lineColor: 'bg-golden', gate: 'Gate 1, Main Exit', timing: '6:30 AM – 10:00 AM', address: 'Huda City Centre Metro, Sector 29, Gurugram',
    rating: 4.8, ordersToday: 142, avgPickup: '1:45', isActive: true, features: ['QR Pickup', 'Parking Nearby', 'Water Station'], phone: '+91 98765 00002', landmark: 'Opposite Cyber Hub exit' },
  { id: 's3', name: 'Kashmere Gate', line: 'Red, Yellow & Violet Line', lineColor: 'bg-destructive', gate: 'Gate 5, North Exit', timing: '6:30 AM – 10:00 AM', address: 'Kashmere Gate Metro, Inter-State Bus Terminal',
    rating: 4.7, ordersToday: 98, avgPickup: '1:55', isActive: true, features: ['QR Pickup', 'Multi-line Access', 'Water Station'], phone: '+91 98765 00003', landmark: 'Near ISBT foot overbridge' },
  { id: 's4', name: 'Hauz Khas', line: 'Yellow & Magenta Line', lineColor: 'bg-golden', gate: 'Gate 2, Exit B', timing: '7:00 AM – 10:00 AM', address: 'Hauz Khas Metro, Aurobindo Marg',
    rating: 4.8, ordersToday: 76, avgPickup: '1:38', isActive: true, features: ['QR Pickup', 'Cozy Corner', 'Photo Wall'], phone: '+91 98765 00004', landmark: 'Near Green Park side' },
  { id: 's5', name: 'Noida Sector 18', line: 'Blue Line', lineColor: 'bg-persona-millennial', gate: 'Gate 1, Main Exit', timing: '7:00 AM – 10:00 AM', address: 'Sector 18 Metro, Noida',
    rating: 4.6, ordersToday: 65, avgPickup: '1:50', isActive: true, features: ['QR Pickup', 'Express Counter'], phone: '+91 98765 00005', landmark: 'Near Atta Market walkway' },
  { id: 's6', name: 'Dwarka Sector 21', line: 'Blue & Airport Line', lineColor: 'bg-persona-millennial', gate: 'Gate 2', timing: 'Coming Soon', address: 'Dwarka Sector 21 Metro',
    rating: 0, ordersToday: 0, avgPickup: '-', isActive: false, features: [], phone: '', landmark: 'Airport Express connection' },
  { id: 's7', name: 'Nehru Place', line: 'Violet Line', lineColor: 'bg-persona-boomer', gate: 'Gate 1', timing: 'Coming Soon', address: 'Nehru Place Metro',
    rating: 0, ordersToday: 0, avgPickup: '-', isActive: false, features: [], phone: '', landmark: 'Near IT hub' },
  { id: 's8', name: 'Botanical Garden', line: 'Blue & Magenta Line', lineColor: 'bg-persona-millennial', gate: 'Gate 3', timing: 'Coming Soon', address: 'Botanical Garden Metro, Noida',
    rating: 0, ordersToday: 0, avgPickup: '-', isActive: false, features: [], phone: '', landmark: 'Noida-Delhi border' },
];

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

export default function LocationsPage() {
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);
  const [notified, setNotified] = useState<Set<string>>(new Set());

  const activeStations = stations.filter(s => s.isActive);
  const comingSoon = stations.filter(s => !s.isActive);

  const handleNotify = (id: string) => {
    setNotified(prev => new Set(prev).add(id));
    toast.success('You\'ll be notified when this station launches!');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden gradient-hero py-16">
        <div className="absolute inset-0 pointer-events-none">
          {['🚇', '📍', '🥗', '⚡', '🗺️'].map((e, i) => (
            <motion.div key={i} className="absolute text-4xl opacity-10" style={{ left: `${10 + i * 18}%`, top: `${20 + (i % 3) * 25}%` }}
              animate={{ y: [0, -15, 0] }} transition={{ duration: 3 + i * 0.4, repeat: Infinity, delay: i * 0.3 }}>
              {e}
            </motion.div>
          ))}
        </div>
        <div className="container relative z-10 text-center">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20"><MapPin className="h-3 w-3 mr-1" /> Pickup Stations</Badge>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Find Your <span className="text-gradient-sunrise">Nearest Station</span></h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-6">
            Currently serving at {activeStations.length} metro stations across Delhi NCR. More coming soon!
          </p>
          <div className="flex justify-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5"><Train className="h-4 w-4 text-primary" /> {activeStations.length} Active</span>
            <span className="flex items-center gap-1.5"><Clock className="h-4 w-4 text-secondary" /> 6:30 – 10 AM</span>
            <span className="flex items-center gap-1.5"><Zap className="h-4 w-4 text-golden" /> Avg 1:45 pickup</span>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 bg-muted/50 border-b border-border">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: `${activeStations.reduce((s, st) => s + st.ordersToday, 0)}+`, label: 'Orders Today', emoji: '📦' },
              { value: '4.8★', label: 'Avg Rating', emoji: '⭐' },
              { value: '1:45', label: 'Avg Pickup Time', emoji: '⏱️' },
              { value: `${comingSoon.length}`, label: 'Coming Soon', emoji: '🔜' },
            ].map(stat => (
              <div key={stat.label} className="text-center p-4 rounded-xl bg-card border border-border shadow-soft">
                <div className="text-2xl mb-1">{stat.emoji}</div>
                <p className="font-display text-2xl font-bold text-primary">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Active Stations */}
      <section className="py-12">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="font-display text-2xl font-bold mb-2 flex items-center gap-2">
              <MapPin className="h-6 w-6 text-primary" /> Active Stations
            </motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground mb-6">Tap a station for details, directions, and live info</motion.p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {activeStations.map((station) => (
                <motion.div key={station.id} variants={fadeUp}>
                  <Card className="shadow-soft hover:shadow-card transition-all duration-300 cursor-pointer group h-full"
                    onClick={() => setSelectedStation(station)}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <div className={`w-3 h-3 rounded-full ${station.lineColor}`} />
                            <h3 className="font-display text-lg font-semibold group-hover:text-primary transition-colors">{station.name}</h3>
                          </div>
                          <p className="text-xs text-muted-foreground">{station.line}</p>
                        </div>
                        <Badge className="bg-secondary/10 text-secondary border-secondary/20 text-[10px]">Active</Badge>
                      </div>

                      <div className="space-y-2 mb-4">
                        <p className="text-sm text-muted-foreground flex items-center gap-2"><Navigation className="h-3.5 w-3.5 text-primary" /> {station.gate}</p>
                        <p className="text-sm text-muted-foreground flex items-center gap-2"><Clock className="h-3.5 w-3.5 text-secondary" /> {station.timing}</p>
                        <p className="text-xs text-muted-foreground">{station.landmark}</p>
                      </div>

                      <div className="flex items-center gap-4 text-xs text-muted-foreground border-t border-border pt-3">
                        <span className="flex items-center gap-1"><Star className="h-3 w-3 fill-golden text-golden" /> {station.rating}</span>
                        <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {station.ordersToday} today</span>
                        <span className="flex items-center gap-1"><Zap className="h-3 w-3 text-primary" /> {station.avgPickup} avg</span>
                      </div>

                      {/* Features */}
                      <div className="flex flex-wrap gap-1 mt-3">
                        {station.features.map(f => (
                          <span key={f} className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{f}</span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Station Detail Popup */}
      {selectedStation && (
        <AnimatePresence>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/50 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedStation(null)}>
            <motion.div initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 30 }}
              className="bg-card rounded-3xl shadow-elevated max-w-md w-full p-6 max-h-[85vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className={`w-4 h-4 rounded-full ${selectedStation.lineColor}`} />
                    <h3 className="font-display text-2xl font-bold">{selectedStation.name}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{selectedStation.line}</p>
                </div>
                <button onClick={() => setSelectedStation(null)} className="text-muted-foreground hover:text-foreground">✕</button>
              </div>

              {/* Map placeholder */}
              <div className="aspect-video rounded-xl bg-muted mb-4 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-secondary/5 to-secondary/10" />
                <div className="text-center relative z-10">
                  <MapPin className="h-10 w-10 text-primary mx-auto mb-2" />
                  <p className="text-sm font-medium">{selectedStation.address}</p>
                  <p className="text-xs text-muted-foreground mt-1">{selectedStation.landmark}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="text-center p-3 rounded-xl bg-muted/50">
                  <Star className="h-5 w-5 fill-golden text-golden mx-auto mb-1" />
                  <p className="font-display font-bold">{selectedStation.rating}</p>
                  <p className="text-[10px] text-muted-foreground">Rating</p>
                </div>
                <div className="text-center p-3 rounded-xl bg-muted/50">
                  <Zap className="h-5 w-5 text-primary mx-auto mb-1" />
                  <p className="font-display font-bold">{selectedStation.avgPickup}</p>
                  <p className="text-[10px] text-muted-foreground">Avg Pickup</p>
                </div>
                <div className="text-center p-3 rounded-xl bg-muted/50">
                  <Users className="h-5 w-5 text-secondary mx-auto mb-1" />
                  <p className="font-display font-bold">{selectedStation.ordersToday}</p>
                  <p className="text-[10px] text-muted-foreground">Orders Today</p>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-3 text-sm"><Navigation className="h-4 w-4 text-primary shrink-0" /> <span>{selectedStation.gate}</span></div>
                <div className="flex items-center gap-3 text-sm"><Clock className="h-4 w-4 text-secondary shrink-0" /> <span>{selectedStation.timing}</span></div>
                <div className="flex items-center gap-3 text-sm"><Phone className="h-4 w-4 text-muted-foreground shrink-0" /> <span>{selectedStation.phone}</span></div>
              </div>

              <div className="mb-4">
                <p className="text-xs font-semibold text-muted-foreground mb-2">STATION FEATURES</p>
                <div className="flex flex-wrap gap-2">
                  {selectedStation.features.map(f => (
                    <Badge key={f} variant="outline" className="text-xs">{f}</Badge>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="hero" className="flex-1" asChild>
                  <Link to="/menu">Order Now <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
                <Button variant="outline" size="icon"><QrCode className="h-4 w-4" /></Button>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      )}

      {/* Coming Soon */}
      <section className="py-12 bg-muted/50">
        <div className="container">
          <h2 className="font-display text-2xl font-bold mb-2 flex items-center gap-2">
            <MapPin className="h-6 w-6 text-muted-foreground" /> Coming Soon
          </h2>
          <p className="text-muted-foreground mb-6">Get notified when we launch at your station</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {comingSoon.map((station) => (
              <motion.div key={station.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <Card className="shadow-soft border-dashed opacity-80 hover:opacity-100 transition-opacity">
                  <CardContent className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-3 h-3 rounded-full ${station.lineColor} opacity-50`} />
                      <h3 className="font-display font-semibold">{station.name}</h3>
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">{station.line}</p>
                    <p className="text-xs text-muted-foreground mb-3">{station.landmark}</p>
                    <Button variant={notified.has(station.id) ? 'outline' : 'hero'} size="sm" className="w-full"
                      onClick={() => handleNotify(station.id)} disabled={notified.has(station.id)}>
                      {notified.has(station.id) ? '✓ Notified' : <>Notify Me <ChevronRight className="ml-1 h-3 w-3" /></>}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How Pickup Works */}
      <section className="py-12">
        <div className="container max-w-3xl text-center">
          <h2 className="font-display text-2xl font-bold mb-8">How Pickup Works</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { emoji: '📱', title: 'Pre-order', desc: 'By 10 PM the night before' },
              { emoji: '🚇', title: 'Arrive', desc: 'At your metro station' },
              { emoji: '📲', title: 'Flash QR', desc: 'Show your order code' },
              { emoji: '🥗', title: 'Grab & Go', desc: 'Under 2 minutes!' },
            ].map((step, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="p-4 rounded-2xl bg-card border border-border shadow-soft">
                <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
                  className="text-4xl mb-2">{step.emoji}</motion.div>
                <h4 className="font-display font-semibold text-sm mb-1">{step.title}</h4>
                <p className="text-xs text-muted-foreground">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
