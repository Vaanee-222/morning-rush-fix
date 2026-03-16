import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { CreditCard, Smartphone, Building, ArrowRight, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-8 max-w-4xl">
        <h1 className="font-display text-3xl font-bold mb-8">Checkout</h1>
        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 space-y-6">
            {/* Pickup Summary */}
            <Card className="shadow-soft">
              <CardContent className="p-6">
                <h3 className="font-display font-semibold mb-3">Pickup Details</h3>
                <div className="bg-muted rounded-lg p-4">
                  <p className="font-medium">📍 Rajiv Chowk — Gate 3, Exit A</p>
                  <p className="text-sm text-muted-foreground mt-1">March 17, 2026 · 7:30 AM</p>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card className="shadow-soft">
              <CardContent className="p-6">
                <h3 className="font-display font-semibold mb-4">Payment Method</h3>
                <RadioGroup defaultValue="upi" className="space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary/40 transition-colors">
                    <RadioGroupItem value="upi" id="upi" />
                    <Label htmlFor="upi" className="flex items-center gap-2 cursor-pointer flex-1">
                      <Smartphone className="h-5 w-5 text-primary" /> UPI (Google Pay, PhonePe)
                    </Label>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary/40 transition-colors">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer flex-1">
                      <CreditCard className="h-5 w-5 text-persona-millennial" /> Credit / Debit Card
                    </Label>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary/40 transition-colors">
                    <RadioGroupItem value="netbanking" id="netbanking" />
                    <Label htmlFor="netbanking" className="flex items-center gap-2 cursor-pointer flex-1">
                      <Building className="h-5 w-5 text-secondary" /> Net Banking
                    </Label>
                  </div>
                </RadioGroup>

                <div className="mt-4 space-y-3">
                  <Label htmlFor="upi-id">UPI ID</Label>
                  <Input id="upi-id" placeholder="yourname@paytm" />
                </div>
              </CardContent>
            </Card>

            {/* Order Notes */}
            <Card className="shadow-soft">
              <CardContent className="p-6">
                <h3 className="font-display font-semibold mb-3">Special Instructions (optional)</h3>
                <Input placeholder="E.g., Extra spicy, no onions..." />
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card className="shadow-card sticky top-24">
              <CardContent className="p-6">
                <h3 className="font-display font-semibold mb-4">Order Review</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span>Sprouted Moong Chaat x1</span><span>₹89</span></div>
                  <div className="flex justify-between"><span>Probiotic Lassi x2</span><span>₹138</span></div>
                  <Separator className="my-3" />
                  <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>₹227</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Delivery</span><span className="text-secondary">FREE</span></div>
                  <Separator className="my-3" />
                  <div className="flex justify-between font-display font-bold text-xl"><span>Total</span><span>₹227</span></div>
                </div>
                <Link to="/order/confirmation/7AM-00248">
                  <Button variant="hero" size="lg" className="w-full mt-6">
                    Pay ₹227 <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground justify-center">
                  <Shield className="h-3 w-3" /> Secured by Razorpay
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
