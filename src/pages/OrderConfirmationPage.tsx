import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, QrCode, Calendar, Share2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';

export default function OrderConfirmationPage() {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-12 max-w-2xl">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', duration: 0.5 }} className="text-center mb-8">
          <div className="w-20 h-20 rounded-full gradient-fresh mx-auto flex items-center justify-center mb-4">
            <Check className="h-10 w-10 text-secondary-foreground" />
          </div>
          <h1 className="font-display text-3xl font-bold mb-2">Your fix is confirmed! 🎉</h1>
          <p className="text-muted-foreground">Order #{id || '7AM-00248'}</p>
        </motion.div>

        <Card className="shadow-elevated mb-6">
          <CardContent className="p-8 text-center">
            <p className="text-sm text-muted-foreground mb-4">Show this QR at pickup</p>
            <div className="w-48 h-48 mx-auto bg-muted rounded-xl flex items-center justify-center border-2 border-dashed border-border mb-4">
              <QrCode className="h-24 w-24 text-foreground/20" />
            </div>
            <div className="bg-muted rounded-lg p-4 text-left">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><p className="text-muted-foreground">Station</p><p className="font-medium">Rajiv Chowk</p></div>
                <div><p className="text-muted-foreground">Exit</p><p className="font-medium">Gate 3, Exit A</p></div>
                <div><p className="text-muted-foreground">Date</p><p className="font-medium">March 17, 2026</p></div>
                <div><p className="text-muted-foreground">Time</p><p className="font-medium">7:30 AM</p></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft mb-6">
          <CardContent className="p-6">
            <h3 className="font-display font-semibold mb-3">Items</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span>Sprouted Moong Chaat x1</span><span>₹89</span></div>
              <div className="flex justify-between"><span>Probiotic Lassi x2</span><span>₹138</span></div>
              <hr className="border-border my-2" />
              <div className="flex justify-between font-display font-bold"><span>Total Paid</span><span>₹227</span></div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="w-full"><Calendar className="h-4 w-4 mr-2" /> Add to Calendar</Button>
          <Button variant="outline" className="w-full"><Share2 className="h-4 w-4 mr-2" /> Share Order</Button>
        </div>

        <div className="mt-6 text-center">
          <Link to="/menu">
            <Button variant="hero">Order Again <ArrowRight className="ml-2 h-4 w-4" /></Button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
