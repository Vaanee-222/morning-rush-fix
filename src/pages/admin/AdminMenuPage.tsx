import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { menuItems } from '@/data/mockData';
import { getFoodImage } from '@/lib/images';
import { Search, Plus, Edit, Trash2, Eye, Filter, ArrowUpDown, Utensils, Package, Layers, Sparkles, Loader2 } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import { toast as sonnerToast } from 'sonner';

type SortField = 'name' | 'price' | 'rating' | 'protein';

const menuCategories = [
  { id: 'bowls', name: 'Bowls', description: 'Power bowls and grain bowls', subscriptionTier: ['Sprout Saver', 'Regular Fix', 'Munch Legend'] },
  { id: 'wraps', name: 'Wraps', description: 'Wraps, rolls, and stuffed parathas', subscriptionTier: ['Sprout Saver', 'Regular Fix', 'Munch Legend'] },
  { id: 'drinks', name: 'Drinks', description: 'Smoothies, juices, and shakes', subscriptionTier: ['Regular Fix', 'Munch Legend'] },
  { id: 'smoothies', name: 'Smoothie Bowls', description: 'Acai, matcha, and dragon fruit bowls', subscriptionTier: ['Munch Legend', 'Mega Freak'] },
  { id: 'pancakes', name: 'Pancakes & Toast', description: 'Pancakes, toast, and bread items', subscriptionTier: ['Regular Fix', 'Munch Legend', 'Mega Freak'] },
  { id: 'specials', name: 'Chef Specials', description: 'Limited edition and seasonal items', subscriptionTier: ['Munch Legend', 'Mega Freak'] },
  { id: 'combos', name: 'Combos', description: 'Value combo meals', subscriptionTier: ['Sprout Saver', 'Regular Fix', 'Munch Legend', 'Mega Freak'] },
];

const subscriptionPlans = ['Sprout Saver', 'Regular Fix', 'Munch Legend', 'Mega Freak'];

// Simulated AI suggestions based on food type
const aiSuggestions: Record<string, { tags: string[]; description: string; nutrition: string }> = {
  bowls: { tags: ['High Fiber', 'Gut Friendly', 'Protein Rich'], description: 'Nutrient-dense bowl packed with whole grains, fresh vegetables, and lean protein.', nutrition: 'Approx 280-380 cal, 14-22g protein, 6-10g fiber' },
  wraps: { tags: ['Portable', 'High Protein', 'On-the-Go'], description: 'Wholesome wrap with a balance of protein, fresh greens, and flavorful sauce.', nutrition: 'Approx 260-360 cal, 16-28g protein, 3-6g fiber' },
  drinks: { tags: ['Refreshing', 'Hydrating', 'Immunity'], description: 'Fresh cold-pressed or blended drink with natural ingredients and zero added sugar.', nutrition: 'Approx 80-200 cal, 1-8g protein, 0-4g fiber' },
  smoothies: { tags: ['Antioxidant', 'Instagram Worthy', 'Superfood'], description: 'Thick smoothie bowl topped with seeds, fruits, and crunchy granola.', nutrition: 'Approx 250-350 cal, 6-12g protein, 4-8g fiber' },
  pancakes: { tags: ['Indulgent', 'Comfort', 'Iron Rich'], description: 'Guilt-free pancakes made with millet flour and natural sweeteners.', nutrition: 'Approx 280-350 cal, 8-14g protein, 3-6g fiber' },
  specials: { tags: ['Limited Edition', 'Chef Special', 'Seasonal'], description: 'Exclusive seasonal creation by our chef using locally sourced ingredients.', nutrition: 'Varies by item' },
  combos: { tags: ['Value', 'Complete Meal', 'Popular'], description: 'Complete breakfast combo with a main item, drink, and side.', nutrition: 'Approx 400-550 cal, 18-30g protein' },
};

export default function AdminMenuPage() {
  const { toast } = useToast();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState<SortField>('name');
  const [tab, setTab] = useState('items');
  const [aiCategory, setAiCategory] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState<typeof aiSuggestions['bowls'] | null>(null);

  const filtered = menuItems
    .filter(item => item.name.toLowerCase().includes(search.toLowerCase()) || item.description.toLowerCase().includes(search.toLowerCase()))
    .filter(item => {
      if (category === 'veg') return item.isVegetarian;
      if (category === 'vegan') return item.isVegan;
      if (category === 'popular') return item.rating >= 4.5;
      return true;
    })
    .sort((a, b) => {
      if (sort === 'price') return a.price - b.price;
      if (sort === 'rating') return b.rating - a.rating;
      if (sort === 'protein') return b.nutrition.protein - a.nutrition.protein;
      return a.name.localeCompare(b.name);
    });

  const generateAiSuggestion = (cat: string) => {
    setAiLoading(true);
    setAiCategory(cat);
    setTimeout(() => {
      setAiResult(aiSuggestions[cat] || aiSuggestions['bowls']);
      setAiLoading(false);
    }, 1200);
  };

  return (
    <AdminLayout active="Menu">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Menu Management</h1>
          <p className="text-sm text-muted-foreground">{menuItems.length} items · {filtered.length} showing</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="hero"><Plus className="h-4 w-4 mr-2" /> Add Item</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader><DialogTitle>Add New Menu Item</DialogTitle></DialogHeader>
            <div className="space-y-4 mt-4">
              <div><label className="text-sm font-medium mb-1 block">Item Name</label><Input placeholder="e.g. Masala Oats Bowl" /></div>
              <div><label className="text-sm font-medium mb-1 block">Category</label>
                <Select onValueChange={(v) => generateAiSuggestion(v)}>
                  <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                  <SelectContent>
                    {menuCategories.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              {/* AI Suggestion Panel */}
              {(aiLoading || aiResult) && (
                <Card className="border-primary/20 bg-primary/5">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <span className="text-sm font-semibold text-primary">AI Suggestions</span>
                    </div>
                    {aiLoading ? (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" /> Generating suggestions...</div>
                    ) : aiResult && (
                      <div className="space-y-2 text-sm">
                        <div><span className="text-muted-foreground">Suggested tags:</span>
                          <div className="flex flex-wrap gap-1 mt-1">{aiResult.tags.map(t => <Badge key={t} variant="outline" className="text-[10px] cursor-pointer hover:bg-primary/10" onClick={() => sonnerToast.success(`Tag "${t}" applied`)}>{t}</Badge>)}</div>
                        </div>
                        <div><span className="text-muted-foreground">Suggested description:</span><p className="text-xs mt-1 italic">{aiResult.description}</p></div>
                        <div><span className="text-muted-foreground">Nutrition estimate:</span><p className="text-xs mt-1">{aiResult.nutrition}</p></div>
                        <Button variant="outline" size="sm" className="w-full mt-2" onClick={() => sonnerToast.success('AI suggestions applied to form')}>
                          <Sparkles className="h-3 w-3 mr-1" /> Apply Suggestions
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              <div><label className="text-sm font-medium mb-1 block">Description</label><Input placeholder="Short description" /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="text-sm font-medium mb-1 block">Price (₹)</label><Input type="number" placeholder="99" /></div>
                <div><label className="text-sm font-medium mb-1 block">Calories</label><Input type="number" placeholder="250" /></div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div><label className="text-sm font-medium mb-1 block">Protein (g)</label><Input type="number" placeholder="12" /></div>
                <div><label className="text-sm font-medium mb-1 block">Carbs (g)</label><Input type="number" placeholder="30" /></div>
                <div><label className="text-sm font-medium mb-1 block">Fat (g)</label><Input type="number" placeholder="8" /></div>
              </div>
              <div><label className="text-sm font-medium mb-1 block">Image URL</label><Input placeholder="https://..." /></div>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 text-sm"><Switch /> Vegetarian</label>
                <label className="flex items-center gap-2 text-sm"><Switch /> Vegan</label>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Available in Plans</label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {subscriptionPlans.map(p => (
                    <Badge key={p} variant="outline" className="cursor-pointer hover:bg-primary/10">{p}</Badge>
                  ))}
                </div>
              </div>
              <Button variant="hero" className="w-full" onClick={() => toast({ title: 'Item Added', description: 'New menu item has been created.' })}>
                <Plus className="h-4 w-4 mr-2" /> Create Item
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="items"><Utensils className="h-3 w-3 mr-1" /> Menu Items</TabsTrigger>
          <TabsTrigger value="categories"><Layers className="h-3 w-3 mr-1" /> Categories & Tiers</TabsTrigger>
          <TabsTrigger value="shop"><Package className="h-3 w-3 mr-1" /> Shop Products</TabsTrigger>
        </TabsList>

        <TabsContent value="items">
          <div className="flex flex-wrap gap-3 mb-4">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search menu items..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-[140px]"><Filter className="h-3.5 w-3.5 mr-2" /><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Items</SelectItem>
                <SelectItem value="veg">Vegetarian</SelectItem>
                <SelectItem value="vegan">Vegan</SelectItem>
                <SelectItem value="popular">Popular (4.5+)</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sort} onValueChange={v => setSort(v as SortField)}>
              <SelectTrigger className="w-[140px]"><ArrowUpDown className="h-3.5 w-3.5 mr-2" /><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="price">Price</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
                <SelectItem value="protein">Protein</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-3">
            {filtered.map((item) => (
              <Card key={item.id} className="shadow-soft hover:shadow-card transition-shadow">
                <CardContent className="p-4 flex items-center gap-4">
                  <img src={getFoodImage(item.id)} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-display font-semibold truncate">{item.name}</h3>
                      {item.isVegetarian && <Badge variant="outline" className="text-[10px] text-secondary border-secondary/30">Veg</Badge>}
                      {item.isVegan && <Badge variant="outline" className="text-[10px]">Vegan</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{item.description}</p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                      <span className="font-semibold text-foreground">₹{item.price}</span>
                      <span>{item.nutrition.calories} cal</span>
                      <span>{item.nutrition.protein}g protein</span>
                      <span>⭐ {item.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="flex flex-col items-center gap-1 mr-2">
                      <Switch defaultChecked />
                      <span className="text-[10px] text-muted-foreground">Active</span>
                    </div>
                    <Link to={`/menu/item/${item.id}`}><Button variant="ghost" size="icon"><Eye className="h-4 w-4" /></Button></Link>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                        <DialogHeader><DialogTitle>Edit: {item.name}</DialogTitle></DialogHeader>
                        <div className="space-y-4 mt-4">
                          <div><label className="text-sm font-medium mb-1 block">Name</label><Input defaultValue={item.name} /></div>
                          <div><label className="text-sm font-medium mb-1 block">Description</label><Input defaultValue={item.description} /></div>
                          <div><label className="text-sm font-medium mb-1 block">Category</label>
                            <Select onValueChange={(v) => generateAiSuggestion(v)}>
                              <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                              <SelectContent>{menuCategories.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent>
                            </Select>
                          </div>
                          {aiResult && (
                            <Card className="border-primary/20 bg-primary/5">
                              <CardContent className="p-3">
                                <div className="flex items-center gap-1 mb-1"><Sparkles className="h-3 w-3 text-primary" /><span className="text-xs font-semibold text-primary">AI Suggestions</span></div>
                                <div className="flex flex-wrap gap-1">{aiResult.tags.map(t => <Badge key={t} variant="outline" className="text-[10px]">{t}</Badge>)}</div>
                              </CardContent>
                            </Card>
                          )}
                          <div className="grid grid-cols-2 gap-3">
                            <div><label className="text-sm font-medium mb-1 block">Price (₹)</label><Input type="number" defaultValue={item.price} /></div>
                            <div><label className="text-sm font-medium mb-1 block">Calories</label><Input type="number" defaultValue={item.nutrition.calories} /></div>
                          </div>
                          <div className="grid grid-cols-3 gap-3">
                            <div><label className="text-sm font-medium mb-1 block">Protein</label><Input type="number" defaultValue={item.nutrition.protein} /></div>
                            <div><label className="text-sm font-medium mb-1 block">Carbs</label><Input type="number" defaultValue={item.nutrition.carbs} /></div>
                            <div><label className="text-sm font-medium mb-1 block">Fat</label><Input type="number" defaultValue={item.nutrition.fat} /></div>
                          </div>
                          <div>
                            <label className="text-sm font-medium mb-1 block">Map to Plans</label>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {subscriptionPlans.map(p => (<Badge key={p} variant="outline" className="cursor-pointer hover:bg-primary/10">{p}</Badge>))}
                            </div>
                          </div>
                          <Button variant="hero" className="w-full" onClick={() => toast({ title: 'Item Updated' })}>Save Changes</Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button variant="ghost" size="icon" className="text-destructive" onClick={() => toast({ title: 'Item Deleted', variant: 'destructive' })}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="categories">
          <div className="space-y-4">
            <div className="flex justify-end">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline"><Plus className="h-4 w-4 mr-2" /> Add Category</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader><DialogTitle>Add Menu Category</DialogTitle></DialogHeader>
                  <div className="space-y-4 mt-4">
                    <div><label className="text-sm font-medium mb-1 block">Category Name</label><Input placeholder="e.g. Salads" /></div>
                    <div><label className="text-sm font-medium mb-1 block">Description</label><Input placeholder="Brief description" /></div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Available in Plans</label>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {subscriptionPlans.map(p => (<Badge key={p} variant="outline" className="cursor-pointer hover:bg-primary/10">{p}</Badge>))}
                      </div>
                    </div>
                    <Button variant="hero" className="w-full" onClick={() => sonnerToast.success('Category created')}>Create Category</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {menuCategories.map(cat => (
              <Card key={cat.id} className="shadow-soft">
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-display font-semibold">{cat.name}</h3>
                    <p className="text-xs text-muted-foreground">{cat.description}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {cat.subscriptionTier.map(t => (
                        <Badge key={t} className="text-[10px] bg-primary/10 text-primary">{t}</Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" className="text-destructive"><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="shop">
          <div className="text-center py-12">
            <Package className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
            <h3 className="font-display font-semibold mb-2">Shop Products Management</h3>
            <p className="text-sm text-muted-foreground mb-4">Manage energy bars, protein drinks, premix powders, sauces, and seasonings from here.</p>
            <p className="text-xs text-muted-foreground">Products are displayed on the public Shop page. Use Add Item above to add shop products with their pack pricing.</p>
          </div>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
}
