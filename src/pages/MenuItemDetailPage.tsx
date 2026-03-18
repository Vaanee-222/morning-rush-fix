import { useParams, Link } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { extendedMenuItems } from '@/data/menuDatabase';
import { getFoodImage } from '@/lib/images';
import { Star, Plus, Minus, ArrowLeft, Share2, Heart, ShoppingCart } from 'lucide-react';
import { useState } from 'react';

export default function MenuItemDetailPage() {
  const { id } = useParams();
  const item = extendedMenuItems.find(m => m.id === id);
  const [qty, setQty] = useState(1);

  if (!item) return (
    <div className="min-h-screen bg-background"><Navbar />
      <div className="container py-16 text-center">
        <p className="text-4xl mb-4">🍽️</p>
        <h1 className="font-display text-2xl font-bold mb-2">Item not found</h1>
        <Link to="/menu"><Button variant="hero">Back to Menu</Button></Link>
      </div>
    <Footer /></div>
  );

  const maxNutrient = Math.max(item.nutrition.protein, item.nutrition.fiber, item.nutrition.carbs, item.nutrition.fat);
  const related = extendedMenuItems.filter(m => m.id !== item.id && m.persona.some(p => item.persona.includes(p))).slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-8 max-w-5xl">
        <Link to="/menu" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to Menu
        </Link>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Image */}
          <div className="relative rounded-2xl overflow-hidden aspect-square">
            <img src={getFoodImage(item.id)} alt={item.name} className="w-full h-full object-cover" />
            {item.isVegetarian && (
              <div className="absolute top-4 right-4 w-6 h-6 border-2 border-leaf rounded-sm flex items-center justify-center bg-background/80">
                <div className="w-3 h-3 rounded-full bg-leaf" />
              </div>
            )}
            <div className="absolute top-4 left-4 flex gap-2">
              {item.nutrition.protein >= 15 && <Badge className="bg-secondary text-secondary-foreground">{item.nutrition.protein}g Protein</Badge>}
              {item.tags.slice(0, 2).map(t => <Badge key={t} variant="outline" className="bg-background/80">{t}</Badge>)}
            </div>
          </div>

          {/* Details */}
          <div>
            <div className="flex items-start justify-between gap-4 mb-2">
              <h1 className="font-display text-3xl font-bold">{item.name}</h1>
              <div className="flex gap-2 shrink-0">
                <Button variant="ghost" size="icon"><Heart className="h-5 w-5" /></Button>
                <Button variant="ghost" size="icon"><Share2 className="h-5 w-5" /></Button>
              </div>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-golden text-golden" />
                <span className="font-medium">{item.rating}</span>
              </div>
              <span className="text-sm text-muted-foreground">({item.reviewCount} reviews)</span>
              <div className="flex gap-1">
                {item.isVegan && <Badge variant="outline" className="text-xs">Vegan</Badge>}
                {item.isGlutenFree && <Badge variant="outline" className="text-xs">Gluten-Free</Badge>}
              </div>
            </div>

            <p className="text-muted-foreground mb-6">{item.description}</p>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-display text-3xl font-bold">₹{item.price}</span>
              {item.mrp && <span className="text-lg text-muted-foreground line-through">₹{item.mrp}</span>}
              {item.mrp && <Badge className="bg-secondary/10 text-secondary">{Math.round((1 - item.price / item.mrp) * 100)}% OFF</Badge>}
            </div>

            {/* Nutrition */}
            <Card className="mb-6 shadow-soft">
              <CardContent className="p-4">
                <h3 className="font-display font-semibold mb-3">Nutrition Facts</h3>
                <div className="grid grid-cols-5 gap-2 text-center mb-4">
                  {[
                    { label: 'Calories', value: `${item.nutrition.calories}`, unit: 'kcal' },
                    { label: 'Protein', value: `${item.nutrition.protein}`, unit: 'g' },
                    { label: 'Fiber', value: `${item.nutrition.fiber}`, unit: 'g' },
                    { label: 'Carbs', value: `${item.nutrition.carbs}`, unit: 'g' },
                    { label: 'Fat', value: `${item.nutrition.fat}`, unit: 'g' },
                  ].map(n => (
                    <div key={n.label}>
                      <p className="font-display text-lg font-bold">{n.value}<span className="text-xs font-normal text-muted-foreground">{n.unit}</span></p>
                      <p className="text-[10px] text-muted-foreground">{n.label}</p>
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  {[
                    { label: 'Protein', value: item.nutrition.protein, color: 'bg-secondary' },
                    { label: 'Fiber', value: item.nutrition.fiber, color: 'bg-primary' },
                    { label: 'Carbs', value: item.nutrition.carbs, color: 'bg-accent' },
                    { label: 'Fat', value: item.nutrition.fat, color: 'bg-muted-foreground' },
                  ].map(n => (
                    <div key={n.label} className="flex items-center gap-2">
                      <span className="text-xs w-12 text-muted-foreground">{n.label}</span>
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${n.color}`} style={{ width: `${Math.min((n.value / 50) * 100, 100)}%` }} />
                      </div>
                      <span className="text-xs font-medium w-8 text-right">{n.value}g</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Ingredients */}
            {(item as any).ingredients && (item as any).ingredients.length > 0 && (
              <Card className="mb-6 shadow-soft">
                <CardContent className="p-4">
                  <h3 className="font-display font-semibold mb-3">Ingredients</h3>
                  <div className="flex flex-wrap gap-2">
                    {(item as any).ingredients.map((ing: string) => (
                      <Badge key={ing} variant="outline" className="text-xs">{ing}</Badge>
                    ))}
                  </div>
                  {(item as any).allergens && (item as any).allergens.length > 0 && (
                    <div className="mt-3 p-2 bg-destructive/5 rounded-lg">
                      <p className="text-xs font-medium text-destructive">⚠️ Allergens: {(item as any).allergens.join(', ')}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Add to Cart */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 border border-border rounded-lg">
                <Button variant="ghost" size="icon" className="h-10 w-10" onClick={() => setQty(Math.max(1, qty - 1))}><Minus className="h-4 w-4" /></Button>
                <span className="w-8 text-center font-bold">{qty}</span>
                <Button variant="ghost" size="icon" className="h-10 w-10" onClick={() => setQty(qty + 1)}><Plus className="h-4 w-4" /></Button>
              </div>
              <Button variant="hero" size="lg" className="flex-1">
                <ShoppingCart className="h-4 w-4 mr-2" /> Add to Cart — ₹{item.price * qty}
              </Button>
            </div>
          </div>
        </div>

        {/* Related Items */}
        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="font-display text-2xl font-bold mb-6">You might also like</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {related.map(r => (
                <Link key={r.id} to={`/menu/item/${r.id}`} className="group rounded-xl border border-border bg-card overflow-hidden hover:shadow-card transition-shadow">
                  <div className="aspect-square overflow-hidden">
                    <img src={getFoodImage(r.id)} alt={r.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <div className="p-3">
                    <h4 className="font-display font-semibold text-sm">{r.name}</h4>
                    <div className="flex items-center justify-between mt-1">
                      <span className="font-bold">₹{r.price}</span>
                      <div className="flex items-center gap-1 text-xs"><Star className="h-3 w-3 fill-golden text-golden" />{r.rating}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
