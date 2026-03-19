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
import { Search, Plus, Edit, Trash2, Eye, Filter, ArrowUpDown, Utensils } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

type SortField = 'name' | 'price' | 'rating' | 'protein';

export default function AdminMenuPage() {
  const { toast } = useToast();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState<SortField>('name');
  const [editItem, setEditItem] = useState<typeof menuItems[0] | null>(null);

  const filtered = menuItems
    .filter(item =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase())
    )
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
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Add New Menu Item</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div><label className="text-sm font-medium mb-1 block">Item Name</label><Input placeholder="e.g. Masala Oats Bowl" /></div>
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
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 text-sm"><Switch /> Vegetarian</label>
                <label className="flex items-center gap-2 text-sm"><Switch /> Vegan</label>
              </div>
              <Button variant="hero" className="w-full" onClick={() => toast({ title: 'Item Added', description: 'New menu item has been created.' })}>
                <Plus className="h-4 w-4 mr-2" /> Create Item
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
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
                  <span>{item.reviewCount} reviews</span>
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
                    <Button variant="ghost" size="icon" onClick={() => setEditItem(item)}><Edit className="h-4 w-4" /></Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-lg">
                    <DialogHeader><DialogTitle>Edit: {item.name}</DialogTitle></DialogHeader>
                    <div className="space-y-4 mt-4">
                      <div><label className="text-sm font-medium mb-1 block">Name</label><Input defaultValue={item.name} /></div>
                      <div><label className="text-sm font-medium mb-1 block">Description</label><Input defaultValue={item.description} /></div>
                      <div className="grid grid-cols-2 gap-3">
                        <div><label className="text-sm font-medium mb-1 block">Price (₹)</label><Input type="number" defaultValue={item.price} /></div>
                        <div><label className="text-sm font-medium mb-1 block">Calories</label><Input type="number" defaultValue={item.nutrition.calories} /></div>
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        <div><label className="text-sm font-medium mb-1 block">Protein</label><Input type="number" defaultValue={item.nutrition.protein} /></div>
                        <div><label className="text-sm font-medium mb-1 block">Carbs</label><Input type="number" defaultValue={item.nutrition.carbs} /></div>
                        <div><label className="text-sm font-medium mb-1 block">Fat</label><Input type="number" defaultValue={item.nutrition.fat} /></div>
                      </div>
                      <Button variant="hero" className="w-full" onClick={() => toast({ title: 'Item Updated' })}>
                        Save Changes
                      </Button>
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
    </AdminLayout>
  );
}
