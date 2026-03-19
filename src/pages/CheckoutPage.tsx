import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { CreditCard, Smartphone, Building, ArrowRight, Shield, Info, Tag, MapPin, Clock, Percent, Package, ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const cartItems = [
  { id: '1', name: 'Sprouted Moong Chaat', qty: 1, price: 89, mrp: 120, emoji: '🫘' },
  { id: '7', name: 'Probiotic Lassi', qty: 2, price: 69, mrp: 90, emoji: '🥛' },
];

export default function CheckoutPage() {
  const [coupon, setCoupon] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [showBreakdown, setShowBreakdown] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState('upi');

  const subtotal = cartItems.reduce((s, item) => s + item.price * item.qty, 0);
  const mrpTotal = cartItems.reduce((s, item) => s + (item.mrp || item.price) * item.qty, 0);
  const mrpSavings = mrpTotal - subtotal;
  const couponDiscount = couponApplied ? Math.round(subtotal * 0.1) : 0;
  const gst = Math.round((subtotal - couponDiscount) * 0.05);
  const platformFee = 5;
  const packagingCharge = 15;
  const deliveryFee = 0;
  const total = subtotal - couponDiscount + gst + platformFee + packagingCharge + deliveryFee;

  const applyCoupon = () => {
    if (coupon.toUpperCase() === 'FIRST10' || coupon.toUpperCase() === '7AMCLUB') {
      setCouponApplied(true);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-8 max-w-4xl">
        {/* Progress */}
        <div className="flex items-center gap-2 mb-8 text-sm">
          {['Cart', 'Checkout', 'Confirmation'].map((step, i) => (
            <div key={step} className="flex items-center gap-2">
              <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                i <= 1 ? 'gradient-sunrise text-primary-foreground' : 'bg-muted text-muted-foreground'
              }`}>{i + 1}</span>
              <span className={i <= 1 ? 'font-medium' : 'text-muted-foreground'}>{step}</span>
              {i < 2 && <div className="w-8 h-px bg-border" />}
            </div>
          ))}
        </div>

        <h1 className="font-display text-3xl font-bold mb-8">Checkout</h1>
        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 space-y-6">
            {/* Pickup Summary */}
            <Card className="shadow-soft">
              <CardContent className="p-6">
                <h3 className="font-display font-semibold mb-3 flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> Pickup Details</h3>
                <div className="bg-muted rounded-xl p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium">📍 Rajiv Chowk — Gate 3, Exit A</p>
                      <p className="text-sm text-muted-foreground mt-1">March 20, 2026 · 7:30 AM</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Near Starbucks, CP outer circle</p>
                    </div>
                    <Link to="/locations"><Button variant="ghost" size="sm" className="text-xs">Change</Button></Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Items */}
            <Card className="shadow-soft">
              <CardContent className="p-6">
                <h3 className="font-display font-semibold mb-4 flex items-center gap-2"><Package className="h-4 w-4 text-secondary" /> Your Items</h3>
                <div className="space-y-3">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex items-center gap-4 p-3 rounded-xl bg-muted/50">
                      <span className="text-3xl">{item.emoji}</span>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-xs text-muted-foreground">Qty: {item.qty}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">₹{item.price * item.qty}</p>
                        {item.mrp && <p className="text-xs text-muted-foreground line-through">₹{item.mrp * item.qty}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card className="shadow-soft">
              <CardContent className="p-6">
                <h3 className="font-display font-semibold mb-4 flex items-center gap-2"><CreditCard className="h-4 w-4 text-persona-millennial" /> Payment Method</h3>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                  {[
                    { value: 'upi', label: 'UPI (Google Pay, PhonePe)', icon: Smartphone, color: 'text-primary' },
                    { value: 'card', label: 'Credit / Debit Card', icon: CreditCard, color: 'text-persona-millennial' },
                    { value: 'netbanking', label: 'Net Banking', icon: Building, color: 'text-secondary' },
                  ].map(method => (
                    <div key={method.value} className={`flex items-center gap-3 p-4 rounded-xl border transition-all ${
                      paymentMethod === method.value ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/40'
                    }`}>
                      <RadioGroupItem value={method.value} id={method.value} />
                      <Label htmlFor={method.value} className="flex items-center gap-2 cursor-pointer flex-1">
                        <method.icon className={`h-5 w-5 ${method.color}`} /> {method.label}
                      </Label>
                      {method.value === 'upi' && <Badge className="bg-secondary/10 text-secondary text-[10px]">Recommended</Badge>}
                    </div>
                  ))}
                </RadioGroup>

                {paymentMethod === 'upi' && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="mt-4 space-y-3">
                    <Label htmlFor="upi-id">UPI ID</Label>
                    <Input id="upi-id" placeholder="yourname@paytm" />
                  </motion.div>
                )}
                {paymentMethod === 'card' && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="mt-4 space-y-3">
                    <div><Label>Card Number</Label><Input placeholder="4111 1111 1111 1111" /></div>
                    <div className="grid grid-cols-2 gap-3">
                      <div><Label>Expiry</Label><Input placeholder="MM/YY" /></div>
                      <div><Label>CVV</Label><Input placeholder="***" type="password" /></div>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>

            {/* Special Instructions */}
            <Card className="shadow-soft">
              <CardContent className="p-6">
                <h3 className="font-display font-semibold mb-3">Special Instructions (optional)</h3>
                <Input placeholder="E.g., Extra spicy, no onions, extra chutney..." />
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-2">
            <Card className="shadow-card sticky top-24">
              <CardContent className="p-6">
                <h3 className="font-display font-semibold mb-4">Order Summary</h3>

                {/* Coupon */}
                <div className="mb-4">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Coupon code" value={coupon} onChange={e => setCoupon(e.target.value)} className="pl-9" disabled={couponApplied} />
                    </div>
                    <Button variant={couponApplied ? 'outline' : 'hero'} size="sm" onClick={applyCoupon} disabled={couponApplied || !coupon}>
                      {couponApplied ? '✓ Applied' : 'Apply'}
                    </Button>
                  </div>
                  {!couponApplied && <p className="text-xs text-muted-foreground mt-1">Try: FIRST10 or 7AMCLUB</p>}
                  {couponApplied && <p className="text-xs text-secondary mt-1 flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> 10% off applied! Saving ₹{couponDiscount}</p>}
                </div>

                <Separator className="mb-4" />

                {/* Price Breakdown */}
                <div className="space-y-2 text-sm">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex justify-between"><span className="text-muted-foreground">{item.name} x{item.qty}</span><span>₹{item.price * item.qty}</span></div>
                  ))}

                  <Separator className="my-3" />

                  <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>₹{subtotal}</span></div>

                  {mrpSavings > 0 && (
                    <div className="flex justify-between text-secondary"><span>MRP Savings</span><span>-₹{mrpSavings}</span></div>
                  )}

                  {couponApplied && (
                    <div className="flex justify-between text-secondary"><span>Coupon Discount (10%)</span><span>-₹{couponDiscount}</span></div>
                  )}

                  <button onClick={() => setShowBreakdown(!showBreakdown)} className="flex items-center gap-1 text-xs text-primary font-medium">
                    Taxes & Charges {showBreakdown ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                  </button>

                  {showBreakdown && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="space-y-1.5 pl-2 border-l-2 border-border ml-1">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground flex items-center gap-1">
                          GST (5%)
                          <Tooltip><TooltipTrigger><Info className="h-3 w-3" /></TooltipTrigger>
                            <TooltipContent><p className="text-xs">Goods & Services Tax @ 5% on food items</p></TooltipContent>
                          </Tooltip>
                        </span>
                        <span>₹{gst}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground flex items-center gap-1">
                          Platform Fee
                          <Tooltip><TooltipTrigger><Info className="h-3 w-3" /></TooltipTrigger>
                            <TooltipContent><p className="text-xs">Covers order processing and tech infrastructure</p></TooltipContent>
                          </Tooltip>
                        </span>
                        <span>₹{platformFee}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground flex items-center gap-1">
                          Packaging
                          <Tooltip><TooltipTrigger><Info className="h-3 w-3" /></TooltipTrigger>
                            <TooltipContent><p className="text-xs">Eco-friendly, compostable packaging</p></TooltipContent>
                          </Tooltip>
                        </span>
                        <span>₹{packagingCharge}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Delivery</span>
                        <span className="text-secondary font-medium">FREE</span>
                      </div>
                    </motion.div>
                  )}

                  <Separator className="my-3" />
                  <div className="flex justify-between font-display font-bold text-xl"><span>Total</span><span>₹{total}</span></div>

                  {(mrpSavings + couponDiscount) > 0 && (
                    <div className="p-2 rounded-lg bg-secondary/10 text-center">
                      <p className="text-xs text-secondary font-medium flex items-center justify-center gap-1">
                        <Percent className="h-3 w-3" /> You're saving ₹{mrpSavings + couponDiscount} on this order!
                      </p>
                    </div>
                  )}
                </div>

                <Link to="/order/confirmation/7AM-00248">
                  <Button variant="hero" size="lg" className="w-full mt-6">
                    Pay ₹{total} <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground justify-center">
                  <Shield className="h-3 w-3" /> Secured by Razorpay · 256-bit SSL
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
