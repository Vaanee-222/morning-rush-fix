import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { getFoodImage } from '@/lib/images';
import { metroStations } from '@/data/mockData';
import { Minus, Plus, Trash2, Tag, ArrowRight, Clock, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const cartItems = [
  { id: '1', name: 'Sprouted Moong Chaat', price: 89, quantity: 1, image: '1' },
  { id: '7', name: 'Probiotic Lassi', price: 69, quantity: 2, image: '7' },
];

export default function CartPage() {
  const [items, setItems] = useState(cartItems);
  const [coupon, setCoupon] = useState('');

  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const discount = 0;
  const total = subtotal - discount;

  const updateQty = (id: string, delta: number) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i));
  };
  const removeItem = (id: string) => setItems(prev => prev.filter(i => i.id !== id));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-8">
        <h1 className="font-display text-3xl font-bold mb-6">Your Cart</h1>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">🍽️</p>
            <h2 className="font-display text-2xl font-bold mb-2">Your cart is hungry!</h2>
            <p className="text-muted-foreground mb-6">Add some gut-friendly goodness to get started.</p>
            <Link to="/menu"><Button variant="hero">Browse Menu</Button></Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <Card key={item.id} className="shadow-soft">
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0">
                        <img src={getFoodImage(item.image)} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between">
                          <h3 className="font-display font-semibold">{item.name}</h3>
                          <button onClick={() => removeItem(item.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <p className="text-lg font-display font-bold mt-1">₹{item.price}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <button onClick={() => updateQty(item.id, -1)} className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:bg-muted"><Minus className="h-3 w-3" /></button>
                          <span className="font-medium w-6 text-center">{item.quantity}</span>
                          <button onClick={() => updateQty(item.id, 1)} className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:bg-muted"><Plus className="h-3 w-3" /></button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Card className="shadow-soft border-dashed">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="font-semibold text-sm">Pickup Time</span>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <Input type="date" defaultValue="2026-03-17" />
                    <Select defaultValue="7:30">
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {['6:30', '6:45', '7:00', '7:15', '7:30', '7:45', '8:00', '8:30', '9:00', '9:30'].map(t => (
                          <SelectItem key={t} value={t}>{t} AM</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center gap-2 mt-3 mb-2">
                    <MapPin className="h-4 w-4 text-secondary" />
                    <span className="font-semibold text-sm">Station</span>
                  </div>
                  <Select defaultValue="Rajiv Chowk">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {metroStations.slice(0, 5).map(s => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                    <Clock className="h-3 w-3" /> 24-hour pre-order required
                  </p>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="shadow-card sticky top-24">
                <CardContent className="p-6">
                  <h3 className="font-display text-lg font-semibold mb-4">Order Summary</h3>
                  <div className="space-y-2 text-sm">
                    {items.map(i => (
                      <div key={i.id} className="flex justify-between">
                        <span className="text-muted-foreground">{i.name} x{i.quantity}</span>
                        <span>₹{i.price * i.quantity}</span>
                      </div>
                    ))}
                    <hr className="border-border" />
                    <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>₹{subtotal}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Delivery</span><span className="text-secondary font-medium">FREE</span></div>
                    {discount > 0 && <div className="flex justify-between text-secondary"><span>Discount</span><span>-₹{discount}</span></div>}
                    <hr className="border-border" />
                    <div className="flex justify-between font-display font-bold text-lg"><span>Total</span><span>₹{total}</span></div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Input placeholder="Coupon code" value={coupon} onChange={e => setCoupon(e.target.value)} className="flex-1" />
                    <Button variant="outline" size="sm"><Tag className="h-4 w-4" /></Button>
                  </div>
                  <Link to="/checkout">
                    <Button variant="hero" size="lg" className="w-full mt-4">
                      Proceed to Pay — ₹{total} <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
