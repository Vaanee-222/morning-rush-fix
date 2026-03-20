import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Star, Plus, ArrowRight, Zap, Heart, Package, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

interface PackProduct {
  id: string;
  name: string;
  description: string;
  emoji: string;
  category: string;
  pricePerUnit: number;
  packs: { size: number; price: number; savings: number }[];
  tags: string[];
  rating: number;
  reviews: number;
  nutrition: { protein: string; calories: string; fiber?: string };
  isNew?: boolean;
  isBestseller?: boolean;
}

const products: PackProduct[] = [
  // Energy Bars
  { id: 'eb-1', name: 'Ragi Almond Energy Bar', description: 'Crunchy ragi & almond bar with dates and dark chocolate drizzle.', emoji: '🍫', category: 'energy-bar', pricePerUnit: 65, packs: [{ size: 6, price: 349, savings: 10 }, { size: 9, price: 499, savings: 14 }, { size: 12, price: 629, savings: 19 }, { size: 16, price: 799, savings: 23 }], tags: ['No Maida', 'High Fiber'], rating: 4.8, reviews: 234, nutrition: { protein: '8g', calories: '180', fiber: '4g' }, isBestseller: true },
  { id: 'eb-2', name: 'Peanut Butter Protein Bar', description: 'Loaded with whey protein and real peanut butter chunks.', emoji: '🥜', category: 'energy-bar', pricePerUnit: 75, packs: [{ size: 6, price: 399, savings: 11 }, { size: 9, price: 579, savings: 14 }, { size: 12, price: 729, savings: 19 }, { size: 16, price: 929, savings: 23 }], tags: ['22g Protein', 'Gym Ready'], rating: 4.7, reviews: 189, nutrition: { protein: '22g', calories: '220' } },
  { id: 'eb-3', name: 'Oats & Honey Bar', description: 'Rolled oats, honey, seeds, and dried cranberries.', emoji: '🍯', category: 'energy-bar', pricePerUnit: 55, packs: [{ size: 6, price: 299, savings: 9 }, { size: 9, price: 429, savings: 13 }, { size: 12, price: 539, savings: 18 }, { size: 16, price: 689, savings: 22 }], tags: ['Wholesome', 'Natural'], rating: 4.6, reviews: 312, nutrition: { protein: '6g', calories: '160', fiber: '5g' } },
  { id: 'eb-4', name: 'Millet Crunch Bar', description: 'Multi-millet bar with jaggery and roasted cashew bits.', emoji: '🌾', category: 'energy-bar', pricePerUnit: 60, packs: [{ size: 6, price: 329, savings: 9 }, { size: 9, price: 469, savings: 13 }, { size: 12, price: 589, savings: 18 }, { size: 16, price: 749, savings: 22 }], tags: ['Millet Power', 'Iron Rich'], rating: 4.5, reviews: 145, nutrition: { protein: '7g', calories: '170', fiber: '6g' }, isNew: true },
  // Protein Drinks
  { id: 'pd-1', name: 'Whey Protein Shake - Chocolate', description: 'Ready-to-drink chocolate whey shake with zero added sugar.', emoji: '🥤', category: 'protein-drink', pricePerUnit: 99, packs: [{ size: 6, price: 539, savings: 9 }, { size: 9, price: 769, savings: 14 }, { size: 12, price: 979, savings: 18 }, { size: 16, price: 1249, savings: 21 }], tags: ['25g Protein', 'Zero Sugar'], rating: 4.7, reviews: 278, nutrition: { protein: '25g', calories: '140' }, isBestseller: true },
  { id: 'pd-2', name: 'Plant Protein Shake - Mango', description: 'Pea + brown rice protein with real Alphonso mango. 100% vegan.', emoji: '🥭', category: 'protein-drink', pricePerUnit: 109, packs: [{ size: 6, price: 589, savings: 10 }, { size: 9, price: 849, savings: 13 }, { size: 12, price: 1079, savings: 18 }, { size: 16, price: 1379, savings: 21 }], tags: ['Vegan', '20g Protein'], rating: 4.5, reviews: 112, nutrition: { protein: '20g', calories: '150' }, isNew: true },
  { id: 'pd-3', name: 'Probiotic Lassi Bottle', description: 'Signature probiotic lassi in a convenient grab-n-go bottle.', emoji: '🥛', category: 'protein-drink', pricePerUnit: 79, packs: [{ size: 6, price: 429, savings: 9 }, { size: 9, price: 619, savings: 13 }, { size: 12, price: 789, savings: 17 }, { size: 16, price: 999, savings: 21 }], tags: ['Gut Friendly', 'Probiotic'], rating: 4.9, reviews: 523, nutrition: { protein: '8g', calories: '150' } },
  // Premix Powders
  { id: 'pm-1', name: 'Whey Protein Premix - Chocolate', description: 'Just add water or milk. Premium whey isolate with cocoa.', emoji: '🧉', category: 'premix', pricePerUnit: 89, packs: [{ size: 6, price: 479, savings: 10 }, { size: 9, price: 689, savings: 14 }, { size: 12, price: 879, savings: 18 }, { size: 16, price: 1119, savings: 21 }], tags: ['25g Protein', 'Instant'], rating: 4.6, reviews: 156, nutrition: { protein: '25g', calories: '130' }, isNew: true },
  { id: 'pm-2', name: 'Plant Protein Premix - Vanilla', description: 'Pea protein powder with vanilla and stevia. Mix & go.', emoji: '🌿', category: 'premix', pricePerUnit: 95, packs: [{ size: 6, price: 509, savings: 11 }, { size: 9, price: 739, savings: 14 }, { size: 12, price: 939, savings: 18 }, { size: 16, price: 1199, savings: 21 }], tags: ['Vegan', '22g Protein'], rating: 4.5, reviews: 98, nutrition: { protein: '22g', calories: '120' } },
  { id: 'pm-3', name: 'BCAA Electrolyte Mix - Lemon', description: 'Branched-chain amino acids with electrolytes for recovery.', emoji: '⚡', category: 'premix', pricePerUnit: 69, packs: [{ size: 6, price: 369, savings: 11 }, { size: 9, price: 529, savings: 15 }, { size: 12, price: 669, savings: 19 }, { size: 16, price: 849, savings: 23 }], tags: ['Recovery', 'Hydration'], rating: 4.4, reviews: 87, nutrition: { protein: '7g', calories: '30' } },
  // Sauces & Dressings
  { id: 'sc-1', name: 'Red Chilli Sauce', description: 'Fiery red chilli sauce made with Guntur chillies. Zero preservatives.', emoji: '🌶️', category: 'sauce', pricePerUnit: 59, packs: [{ size: 6, price: 319, savings: 10 }, { size: 9, price: 459, savings: 14 }, { size: 12, price: 579, savings: 18 }, { size: 16, price: 739, savings: 22 }], tags: ['Spicy', 'No Preservatives'], rating: 4.5, reviews: 178, nutrition: { protein: '0g', calories: '15' } },
  { id: 'sc-2', name: 'Tomato Basil Sauce', description: 'Sun-dried tomato sauce with fresh basil and garlic.', emoji: '🍅', category: 'sauce', pricePerUnit: 65, packs: [{ size: 6, price: 349, savings: 10 }, { size: 9, price: 499, savings: 14 }, { size: 12, price: 629, savings: 19 }, { size: 16, price: 799, savings: 23 }], tags: ['Italian', 'Versatile'], rating: 4.6, reviews: 145, nutrition: { protein: '1g', calories: '25' } },
  { id: 'sc-3', name: 'Tamarind Date Chutney', description: 'Sweet-tangy tamarind chutney with dates and jaggery.', emoji: '🫙', category: 'sauce', pricePerUnit: 55, packs: [{ size: 6, price: 299, savings: 9 }, { size: 9, price: 429, savings: 13 }, { size: 12, price: 539, savings: 18 }, { size: 16, price: 689, savings: 22 }], tags: ['Traditional', 'Sweet-Tangy'], rating: 4.7, reviews: 234, nutrition: { protein: '0g', calories: '40' }, isBestseller: true },
  { id: 'sc-4', name: 'Tahini Dressing', description: 'Creamy sesame tahini with lemon and garlic. Perfect for bowls.', emoji: '🥗', category: 'sauce', pricePerUnit: 79, packs: [{ size: 6, price: 429, savings: 9 }, { size: 9, price: 619, savings: 13 }, { size: 12, price: 789, savings: 17 }, { size: 16, price: 999, savings: 21 }], tags: ['Mediterranean', 'Healthy Fat'], rating: 4.4, reviews: 89, nutrition: { protein: '3g', calories: '90' } },
  // Seasonings & Powders
  { id: 'sp-1', name: 'Dry Jaggery Powder', description: 'Organic unrefined jaggery powder. Replace sugar naturally.', emoji: '🟤', category: 'seasoning', pricePerUnit: 45, packs: [{ size: 6, price: 239, savings: 11 }, { size: 9, price: 339, savings: 16 }, { size: 12, price: 429, savings: 21 }, { size: 16, price: 549, savings: 24 }], tags: ['Organic', 'Iron Rich'], rating: 4.8, reviews: 345, nutrition: { protein: '0g', calories: '35' }, isBestseller: true },
  { id: 'sp-2', name: 'Chaat Masala Seasoning', description: 'Tangy chaat masala blend with black salt and amchur.', emoji: '✨', category: 'seasoning', pricePerUnit: 39, packs: [{ size: 6, price: 209, savings: 11 }, { size: 9, price: 299, savings: 15 }, { size: 12, price: 379, savings: 19 }, { size: 16, price: 479, savings: 23 }], tags: ['Tangy', 'Classic'], rating: 4.6, reviews: 267, nutrition: { protein: '0g', calories: '5' } },
  { id: 'sp-3', name: 'Protein Seasoning Blend', description: 'Nutritional yeast + herb blend to boost any meal with protein.', emoji: '🧂', category: 'seasoning', pricePerUnit: 69, packs: [{ size: 6, price: 369, savings: 11 }, { size: 9, price: 529, savings: 15 }, { size: 12, price: 669, savings: 19 }, { size: 16, price: 849, savings: 23 }], tags: ['Protein Boost', 'Umami'], rating: 4.3, reviews: 67, nutrition: { protein: '5g', calories: '25' }, isNew: true },
  // Cookies & Snacks
  { id: 'ck-1', name: 'Ragi Power Cookie', description: 'Crunchy ragi cookies with dark chocolate chips and coconut shreds.', emoji: '🍪', category: 'cookie', pricePerUnit: 45, packs: [{ size: 6, price: 249, savings: 8 }, { size: 9, price: 349, savings: 14 }, { size: 12, price: 439, savings: 19 }, { size: 16, price: 559, savings: 22 }], tags: ['Iron Rich', 'Gluten Smart'], rating: 4.6, reviews: 267, nutrition: { protein: '4g', calories: '120', fiber: '3g' }, isBestseller: true },
  { id: 'ch-1', name: 'Dark Chocolate Bark - Seeds', description: '72% dark chocolate with pumpkin seeds, sunflower seeds, and sea salt.', emoji: '🍫', category: 'chocolate', pricePerUnit: 89, packs: [{ size: 6, price: 479, savings: 10 }, { size: 9, price: 689, savings: 14 }, { size: 12, price: 879, savings: 18 }, { size: 16, price: 1119, savings: 21 }], tags: ['Antioxidant', 'Artisan'], rating: 4.8, reviews: 198, nutrition: { protein: '5g', calories: '200' } },
  { id: 'sm-1', name: 'Trail Mix - Classic', description: 'Roasted almonds, cashews, raisins, pumpkin seeds, and dark chocolate chips.', emoji: '🥜', category: 'snack-mix', pricePerUnit: 69, packs: [{ size: 6, price: 379, savings: 8 }, { size: 9, price: 539, savings: 13 }, { size: 12, price: 679, savings: 18 }, { size: 16, price: 869, savings: 21 }], tags: ['Energy', 'Protein Rich'], rating: 4.6, reviews: 345, nutrition: { protein: '8g', calories: '210' } },
  { id: 'sm-2', name: 'Makhana Mix - Peri Peri', description: 'Roasted fox nuts with peri peri seasoning and turmeric.', emoji: '🌶️', category: 'snack-mix', pricePerUnit: 59, packs: [{ size: 6, price: 319, savings: 10 }, { size: 9, price: 459, savings: 14 }, { size: 12, price: 579, savings: 18 }, { size: 16, price: 739, savings: 22 }], tags: ['Low Cal', 'Crunchy'], rating: 4.5, reviews: 234, nutrition: { protein: '4g', calories: '90', fiber: '2g' } },
];

const categories = [
  { id: 'all', label: 'All Products', emoji: '🛒' },
  { id: 'energy-bar', label: 'Energy Bars', emoji: '🍫' },
  { id: 'protein-drink', label: 'Protein Drinks', emoji: '🥤' },
  { id: 'premix', label: 'Premix Powders', emoji: '🧉' },
  { id: 'sauce', label: 'Sauces & Dressings', emoji: '🫙' },
  { id: 'seasoning', label: 'Seasonings', emoji: '🧂' },
  { id: 'cookie', label: 'Cookies', emoji: '🍪' },
  { id: 'chocolate', label: 'Chocolates', emoji: '🤎' },
  { id: 'snack-mix', label: 'Snack Mixes', emoji: '🥜' },
];

export default function ShopPage() {
  const [category, setCategory] = useState('all');
  const [cart, setCart] = useState<Record<string, { packSize: number; qty: number }>>({});

  const filtered = category === 'all' ? products : products.filter(p => p.category === category);

  const addToCart = (productId: string, packSize: number) => {
    setCart(prev => ({ ...prev, [productId]: { packSize, qty: (prev[productId]?.qty || 0) + 1 } }));
    toast.success('Added to cart!');
  };

  const totalItems = Object.values(cart).reduce((s, c) => s + c.qty, 0);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="relative overflow-hidden gradient-hero py-16">
        <div className="absolute inset-0 pointer-events-none">
          {['🍫', '🥤', '🍪', '🧉', '🌶️', '🧂'].map((e, i) => (
            <motion.div key={i} className="absolute text-4xl opacity-10" style={{ left: `${10 + i * 15}%`, top: `${20 + (i % 3) * 25}%` }}
              animate={{ y: [0, -15, 0] }} transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.4 }}>
              {e}
            </motion.div>
          ))}
        </div>
        <div className="container relative z-10 text-center">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20"><Package className="h-3 w-3 mr-1" /> Monthly Packs</Badge>
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-4">The 7AM <span className="text-gradient-sunrise">Shop</span></h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-6">Premium energy bars, protein drinks, premix shakes, sauces, seasonings & more. Buy in packs, save more.</p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5"><Zap className="h-4 w-4 text-primary" /> Zero Junk</span>
            <span className="flex items-center gap-1.5"><Heart className="h-4 w-4 text-secondary" /> Clean Labels</span>
            <span className="flex items-center gap-1.5"><Star className="h-4 w-4 text-golden" /> FSSAI Approved</span>
            <span className="flex items-center gap-1.5"><Sparkles className="h-4 w-4 text-primary" /> No Preservatives</span>
          </div>
        </div>
      </section>

      <div className="container py-12">
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(c => (
            <button key={c.id} onClick={() => setCategory(c.id)}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-medium transition-all ${category === c.id ? 'gradient-sunrise text-primary-foreground shadow-glow' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}>
              <span>{c.emoji}</span> {c.label}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} onAdd={addToCart} />
            ))}
          </AnimatePresence>
        </div>
      </div>

      {totalItems > 0 && (
        <motion.div initial={{ y: 100 }} animate={{ y: 0 }} className="fixed bottom-0 left-0 right-0 z-40 bg-card border-t border-border shadow-elevated p-4">
          <div className="container flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShoppingCart className="h-5 w-5 text-primary" />
              <span className="font-display font-bold">{totalItems} item{totalItems > 1 ? 's' : ''} in cart</span>
            </div>
            <Link to="/cart"><Button variant="hero">View Cart <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          </div>
        </motion.div>
      )}
      <Footer />
    </div>
  );
}

function ProductCard({ product, onAdd }: { product: PackProduct; onAdd: (id: string, size: number) => void }) {
  const [packIdx, setPackIdx] = useState(0);
  const pack = product.packs[packIdx];

  return (
    <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }} initial="hidden" animate="visible" exit="hidden" layout>
      <Card className="shadow-soft hover:shadow-card transition-all duration-300 group overflow-hidden h-full flex flex-col">
        <div className="relative p-6 pb-3">
          <div className="flex items-start justify-between mb-3">
            <motion.div className="text-5xl" whileHover={{ scale: 1.2, rotate: 5 }}>{product.emoji}</motion.div>
            <div className="flex flex-col items-end gap-1">
              {product.isBestseller && <Badge className="bg-primary/10 text-primary text-[10px]">Bestseller</Badge>}
              {product.isNew && <Badge className="bg-secondary/10 text-secondary text-[10px]">New</Badge>}
            </div>
          </div>
          <h3 className="font-display font-semibold text-base leading-tight group-hover:text-primary transition-colors">{product.name}</h3>
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{product.description}</p>
          <div className="flex items-center gap-2 mt-2">
            <Star className="h-3 w-3 fill-golden text-golden" /><span className="text-xs font-medium">{product.rating}</span>
            <span className="text-xs text-muted-foreground">({product.reviews})</span>
          </div>
          <div className="flex flex-wrap gap-1 mt-2">
            {product.tags.map(t => (<span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{t}</span>))}
          </div>
        </div>
        <CardContent className="p-4 pt-0 mt-auto">
          <p className="text-xs font-medium text-muted-foreground mb-2">Choose your pack:</p>
          <div className="grid grid-cols-4 gap-1.5 mb-3">
            {product.packs.map((p, i) => (
              <button key={p.size} onClick={() => setPackIdx(i)}
                className={`py-2 rounded-lg text-center transition-all text-xs font-medium ${packIdx === i ? 'gradient-sunrise text-primary-foreground shadow-soft' : 'bg-muted hover:bg-muted/80 text-foreground'}`}>
                <div className="font-bold">{p.size}</div><div className="text-[9px] opacity-80">pcs</div>
              </button>
            ))}
          </div>
          <div className="flex items-end justify-between mb-3">
            <div>
              <p className="font-display text-xl font-bold">₹{pack.price}</p>
              <p className="text-xs text-muted-foreground line-through">₹{product.pricePerUnit * pack.size}</p>
            </div>
            <Badge className="bg-secondary/10 text-secondary border-secondary/20">Save {pack.savings}%</Badge>
          </div>
          <Button variant="hero" size="sm" className="w-full" onClick={() => onAdd(product.id, pack.size)}>
            <Plus className="h-3 w-3 mr-1" /> Add Pack of {pack.size}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
