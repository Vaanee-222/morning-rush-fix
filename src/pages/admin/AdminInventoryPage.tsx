import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Plus, Edit, Trash2, AlertTriangle, Package, Warehouse } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { toast } from 'sonner';

interface InventoryItem {
  id: string; name: string; category: string; unit: string; currentStock: number; minStock: number; maxStock: number; lastRestocked: string; supplier: string; costPerUnit: number;
}

const CATEGORIES = ['Grains', 'Seeds', 'Dairy', 'Fruits', 'Vegetables', 'Pantry', 'Beverages', 'Supplements', 'Sauces', 'Spices', 'Packaging', 'Proteins'];

const initialInventory: InventoryItem[] = [
  { id: '1', name: 'Rolled Oats', category: 'Grains', unit: 'kg', currentStock: 45, minStock: 20, maxStock: 100, lastRestocked: '2026-03-15', supplier: 'Nature Valley', costPerUnit: 85 },
  { id: '2', name: 'Chia Seeds', category: 'Seeds', unit: 'kg', currentStock: 3, minStock: 5, maxStock: 25, lastRestocked: '2026-03-10', supplier: 'True Elements', costPerUnit: 450 },
  { id: '3', name: 'Fresh Paneer', category: 'Dairy', unit: 'kg', currentStock: 8, minStock: 10, maxStock: 30, lastRestocked: '2026-03-17', supplier: 'Amul', costPerUnit: 320 },
  { id: '4', name: 'Eggs (Tray-30)', category: 'Dairy', unit: 'trays', currentStock: 12, minStock: 5, maxStock: 30, lastRestocked: '2026-03-16', supplier: 'Kegg Farms', costPerUnit: 210 },
  { id: '5', name: 'Avocado', category: 'Fruits', unit: 'pcs', currentStock: 25, minStock: 20, maxStock: 80, lastRestocked: '2026-03-17', supplier: 'Fresh Imports', costPerUnit: 45 },
  { id: '6', name: 'Ragi Flour', category: 'Grains', unit: 'kg', currentStock: 30, minStock: 15, maxStock: 60, lastRestocked: '2026-03-14', supplier: 'Organic India', costPerUnit: 120 },
  { id: '7', name: 'Greek Yogurt', category: 'Dairy', unit: 'liters', currentStock: 15, minStock: 10, maxStock: 40, lastRestocked: '2026-03-17', supplier: 'Epigamia', costPerUnit: 180 },
  { id: '8', name: 'Dark Chocolate', category: 'Pantry', unit: 'kg', currentStock: 6, minStock: 5, maxStock: 20, lastRestocked: '2026-03-12', supplier: 'Amul Cacao', costPerUnit: 380 },
  { id: '9', name: 'Quinoa', category: 'Grains', unit: 'kg', currentStock: 18, minStock: 10, maxStock: 40, lastRestocked: '2026-03-15', supplier: 'True Elements', costPerUnit: 280 },
  { id: '10', name: 'Almond Milk', category: 'Beverages', unit: 'liters', currentStock: 20, minStock: 15, maxStock: 50, lastRestocked: '2026-03-16', supplier: 'So Good', costPerUnit: 150 },
  { id: '11', name: 'Whey Protein Powder', category: 'Supplements', unit: 'kg', currentStock: 10, minStock: 8, maxStock: 30, lastRestocked: '2026-03-13', supplier: 'MuscleBlaze', costPerUnit: 1200 },
  { id: '12', name: 'Tamarind Paste', category: 'Sauces', unit: 'kg', currentStock: 4, minStock: 3, maxStock: 15, lastRestocked: '2026-03-11', supplier: 'Eastern', costPerUnit: 160 },
];

export default function AdminInventoryPage() {
  const [inventory, setInventory] = useState(initialInventory);
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('all');
  const [addOpen, setAddOpen] = useState(false);
  const [editItem, setEditItem] = useState<InventoryItem | null>(null);

  // Add form state
  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState('');
  const [formUnit, setFormUnit] = useState('');
  const [formCurrent, setFormCurrent] = useState('');
  const [formMin, setFormMin] = useState('');
  const [formMax, setFormMax] = useState('');
  const [formSupplier, setFormSupplier] = useState('');
  const [formCost, setFormCost] = useState('');

  const allCategories = ['all', ...CATEGORIES];
  const filtered = inventory
    .filter(i => catFilter === 'all' || i.category === catFilter)
    .filter(i => i.name.toLowerCase().includes(search.toLowerCase()));

  const lowStock = inventory.filter(i => i.currentStock < i.minStock);
  const totalValue = inventory.reduce((s, i) => s + i.currentStock * i.costPerUnit, 0);

  const resetForm = () => {
    setFormName(''); setFormCategory(''); setFormUnit(''); setFormCurrent(''); setFormMin(''); setFormMax(''); setFormSupplier(''); setFormCost('');
  };

  const handleAdd = () => {
    if (!formName || !formCategory) { toast.error('Name and category required'); return; }
    const newItem: InventoryItem = {
      id: Date.now().toString(), name: formName, category: formCategory, unit: formUnit || 'kg',
      currentStock: Number(formCurrent) || 0, minStock: Number(formMin) || 10, maxStock: Number(formMax) || 100,
      lastRestocked: new Date().toISOString().split('T')[0], supplier: formSupplier, costPerUnit: Number(formCost) || 0,
    };
    setInventory(prev => [...prev, newItem]);
    toast.success('Item added to inventory');
    resetForm();
    setAddOpen(false);
  };

  const handleEdit = () => {
    if (!editItem) return;
    setInventory(prev => prev.map(i => i.id === editItem.id ? {
      ...editItem, name: formName || editItem.name, category: formCategory || editItem.category,
      unit: formUnit || editItem.unit, currentStock: Number(formCurrent) || editItem.currentStock,
      minStock: Number(formMin) || editItem.minStock, maxStock: Number(formMax) || editItem.maxStock,
      supplier: formSupplier || editItem.supplier, costPerUnit: Number(formCost) || editItem.costPerUnit,
    } : i));
    toast.success('Item updated');
    setEditItem(null);
    resetForm();
  };

  const handleDelete = (id: string) => {
    setInventory(prev => prev.filter(i => i.id !== id));
    toast.success('Item deleted');
  };

  const handleRestock = (id: string) => {
    setInventory(prev => prev.map(i => i.id === id ? { ...i, currentStock: i.maxStock, lastRestocked: new Date().toISOString().split('T')[0] } : i));
    toast.success('Item restocked to max');
  };

  const openEdit = (item: InventoryItem) => {
    setFormName(item.name); setFormCategory(item.category); setFormUnit(item.unit);
    setFormCurrent(String(item.currentStock)); setFormMin(String(item.minStock)); setFormMax(String(item.maxStock));
    setFormSupplier(item.supplier); setFormCost(String(item.costPerUnit));
    setEditItem(item);
  };

  const InventoryForm = ({ isEdit }: { isEdit: boolean }) => (
    <div className="space-y-4 mt-4">
      <div><label className="text-sm font-medium mb-1 block">Name</label><Input placeholder="Item name" value={formName} onChange={e => setFormName(e.target.value)} /></div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-sm font-medium mb-1 block">Category</label>
          <Select value={formCategory} onValueChange={setFormCategory}>
            <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
            <SelectContent>
              {CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div><label className="text-sm font-medium mb-1 block">Unit</label><Input placeholder="e.g. kg, pcs" value={formUnit} onChange={e => setFormUnit(e.target.value)} /></div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div><label className="text-sm font-medium mb-1 block">Current Stock</label><Input type="number" value={formCurrent} onChange={e => setFormCurrent(e.target.value)} /></div>
        <div><label className="text-sm font-medium mb-1 block">Min Stock</label><Input type="number" value={formMin} onChange={e => setFormMin(e.target.value)} /></div>
        <div><label className="text-sm font-medium mb-1 block">Max Stock</label><Input type="number" value={formMax} onChange={e => setFormMax(e.target.value)} /></div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div><label className="text-sm font-medium mb-1 block">Supplier</label><Input placeholder="Supplier name" value={formSupplier} onChange={e => setFormSupplier(e.target.value)} /></div>
        <div><label className="text-sm font-medium mb-1 block">Cost/Unit (₹)</label><Input type="number" value={formCost} onChange={e => setFormCost(e.target.value)} /></div>
      </div>
      <Button variant="hero" className="w-full" onClick={isEdit ? handleEdit : handleAdd}>
        {isEdit ? 'Save Changes' : <><Plus className="h-4 w-4 mr-2" /> Add to Inventory</>}
      </Button>
    </div>
  );

  return (
    <AdminLayout active="Inventory">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Inventory</h1>
          <p className="text-sm text-muted-foreground">Track stock levels across all stations</p>
        </div>
        <Dialog open={addOpen} onOpenChange={(v) => { setAddOpen(v); if (!v) resetForm(); }}>
          <DialogTrigger asChild>
            <Button variant="hero"><Plus className="h-4 w-4 mr-2" /> Add Item</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader><DialogTitle>Add Inventory Item</DialogTitle></DialogHeader>
            <InventoryForm isEdit={false} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <Card className="shadow-soft"><CardContent className="p-5 flex items-center gap-3"><Warehouse className="h-8 w-8 text-primary" /><div><p className="text-sm text-muted-foreground">Total Items</p><p className="font-display text-2xl font-bold">{inventory.length}</p></div></CardContent></Card>
        <Card className="shadow-soft border-destructive/20"><CardContent className="p-5 flex items-center gap-3"><AlertTriangle className="h-8 w-8 text-destructive" /><div><p className="text-sm text-muted-foreground">Low Stock</p><p className="font-display text-2xl font-bold text-destructive">{lowStock.length}</p></div></CardContent></Card>
        <Card className="shadow-soft"><CardContent className="p-5 flex items-center gap-3"><Package className="h-8 w-8 text-secondary" /><div><p className="text-sm text-muted-foreground">Inventory Value</p><p className="font-display text-2xl font-bold">₹{(totalValue / 1000).toFixed(1)}K</p></div></CardContent></Card>
      </div>

      {lowStock.length > 0 && (
        <Card className="shadow-soft border-destructive/20 mb-6">
          <CardContent className="p-4">
            <h3 className="font-display font-semibold text-sm mb-2 flex items-center gap-2"><AlertTriangle className="h-4 w-4 text-destructive" /> Low Stock Alerts</h3>
            <div className="flex flex-wrap gap-2">
              {lowStock.map(i => (
                <Badge key={i.id} className="bg-destructive/10 text-destructive">{i.name}: {i.currentStock} {i.unit} (min: {i.minStock})</Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search inventory..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <Select value={catFilter} onValueChange={setCatFilter}>
          <SelectTrigger className="w-[160px]"><SelectValue /></SelectTrigger>
          <SelectContent>
            {allCategories.map(c => <SelectItem key={c} value={c}>{c === 'all' ? 'All Categories' : c}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <Card className="shadow-soft">
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="p-4 text-muted-foreground font-medium">Item</th>
                <th className="p-4 text-muted-foreground font-medium hidden sm:table-cell">Category</th>
                <th className="p-4 text-muted-foreground font-medium">Stock Level</th>
                <th className="p-4 text-muted-foreground font-medium hidden md:table-cell">Supplier</th>
                <th className="p-4 text-muted-foreground font-medium hidden lg:table-cell">Last Restocked</th>
                <th className="p-4 text-muted-foreground font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(item => {
                const pct = Math.min((item.currentStock / item.maxStock) * 100, 100);
                const isLow = item.currentStock < item.minStock;
                return (
                  <tr key={item.id} className={`border-b border-border/50 last:border-0 hover:bg-muted/30 ${isLow ? 'bg-destructive/5' : ''}`}>
                    <td className="p-4">
                      <p className="font-medium flex items-center gap-1">{isLow && <AlertTriangle className="h-3 w-3 text-destructive" />}{item.name}</p>
                      <p className="text-xs text-muted-foreground">₹{item.costPerUnit}/{item.unit}</p>
                    </td>
                    <td className="p-4 hidden sm:table-cell"><Badge variant="outline" className="text-xs">{item.category}</Badge></td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Progress value={pct} className={`h-2 w-20 ${isLow ? '[&>div]:bg-destructive' : ''}`} />
                        <span className={`text-xs font-medium ${isLow ? 'text-destructive' : ''}`}>{item.currentStock} {item.unit}</span>
                      </div>
                    </td>
                    <td className="p-4 hidden md:table-cell text-muted-foreground">{item.supplier}</td>
                    <td className="p-4 hidden lg:table-cell text-muted-foreground">{item.lastRestocked}</td>
                    <td className="p-4">
                      <div className="flex gap-1">
                        <Button variant="outline" size="sm" onClick={() => handleRestock(item.id)}>Restock</Button>
                        <Button variant="ghost" size="icon" onClick={() => openEdit(item)}><Edit className="h-3 w-3" /></Button>
                        <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDelete(item.id)}><Trash2 className="h-3 w-3" /></Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={!!editItem} onOpenChange={(v) => { if (!v) { setEditItem(null); resetForm(); } }}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>Edit: {editItem?.name}</DialogTitle></DialogHeader>
          <InventoryForm isEdit={true} />
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
