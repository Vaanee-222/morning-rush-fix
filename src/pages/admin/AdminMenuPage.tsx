import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { menuItems } from '@/data/mockData';
import { getFoodImage } from '@/lib/images';
import { Search, Plus, Edit, Trash2 } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';

export default function AdminMenuPage() {
  return (
    <AdminLayout active="Menu">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Menu Management</h1>
          <p className="text-sm text-muted-foreground">{menuItems.length} items in menu</p>
        </div>
        <Button variant="hero"><Plus className="h-4 w-4 mr-2" /> Add Item</Button>
      </div>

      <div className="flex gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search menu items..." className="pl-9" />
        </div>
      </div>

      <div className="grid gap-4">
        {menuItems.map((item) => (
          <Card key={item.id} className="shadow-soft">
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
                  <span>₹{item.price}</span>
                  <span>{item.nutrition.protein}g protein</span>
                  <span>⭐ {item.rating}</span>
                  <span>{item.reviewCount} reviews</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex flex-col items-center gap-1">
                  <Switch defaultChecked />
                  <span className="text-[10px] text-muted-foreground">Active</span>
                </div>
                <Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button>
                <Button variant="ghost" size="icon" className="text-destructive"><Trash2 className="h-4 w-4" /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </AdminLayout>
  );
}
