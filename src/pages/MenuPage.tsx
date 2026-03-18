import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { MenuItemCard } from '@/components/MenuItemCard';
import { extendedMenuItems } from '@/data/menuDatabase';
import { personas } from '@/data/mockData';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';

type PersonaFilter = 'all' | 'boomer' | 'millennial' | 'genz' | 'indulge';

const personaTabs: { id: PersonaFilter; label: string; emoji: string; color: string }[] = [
  { id: 'all', label: 'All Items', emoji: '🍽️', color: 'bg-accent text-accent-foreground' },
  { id: 'boomer', label: 'Gut Guardian', emoji: '🫘', color: 'bg-persona-boomer/10 text-persona-boomer' },
  { id: 'millennial', label: 'Protein Hustler', emoji: '💪', color: 'bg-persona-millennial/10 text-persona-millennial' },
  { id: 'genz', label: 'Trend Setter', emoji: '✨', color: 'bg-persona-genz/10 text-persona-genz' },
  { id: 'indulge', label: 'Guilt-Free Rebel', emoji: '🍫', color: 'bg-persona-indulge/10 text-persona-indulge' },
];

export default function MenuPage() {
  const [activePersona, setActivePersona] = useState<PersonaFilter>('all');
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<string[]>([]);

  const toggleFilter = (f: string) => setFilters(prev => prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f]);

  const filtered = extendedMenuItems.filter((item) => {
    if (activePersona !== 'all' && !item.persona.includes(activePersona)) return false;
    if (search && !item.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (filters.includes('vegetarian') && !item.isVegetarian) return false;
    if (filters.includes('vegan') && !item.isVegan) return false;
    if (filters.includes('gluten-free') && !item.isGlutenFree) return false;
    if (filters.includes('high-protein') && item.nutrition.protein < 15) return false;
    if (filters.includes('under-100') && item.price >= 100) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-8">
        <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">Our Menu</h1>
        <p className="text-muted-foreground mb-6">Fresh, gut-friendly breakfasts made for your morning commute</p>

        {/* Persona Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {personaTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActivePersona(tab.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activePersona === tab.id ? tab.color + ' shadow-soft' : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              <span>{tab.emoji}</span> {tab.label}
            </button>
          ))}
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search items..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { key: 'vegetarian', label: 'Veg' },
              { key: 'vegan', label: 'Vegan' },
              { key: 'gluten-free', label: 'GF' },
              { key: 'high-protein', label: 'Protein 15g+' },
              { key: 'under-100', label: 'Under ₹100' },
            ].map((f) => (
              <Badge
                key={f.key}
                variant={filters.includes(f.key) ? 'default' : 'outline'}
                className="cursor-pointer select-none"
                onClick={() => toggleFilter(f.key)}
              >
                {f.label}
              </Badge>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((item) => (
            <MenuItemCard key={item.id} item={item} />
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-4xl mb-4">🍽️</p>
            <p className="text-muted-foreground">No items match your filters. Try broadening your search!</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
