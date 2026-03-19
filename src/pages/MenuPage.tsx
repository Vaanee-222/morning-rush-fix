import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { MenuItemCard } from '@/components/MenuItemCard';
import { extendedMenuItems } from '@/data/menuDatabase';
import { personas } from '@/data/mockData';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, X, Sparkles, ChevronRight, Flame, Leaf, Zap, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

type PersonaFilter = 'all' | 'boomer' | 'millennial' | 'genz' | 'indulge';
type ViewMode = 'grid' | 'compact';
type SortMode = 'popular' | 'price-low' | 'price-high' | 'protein' | 'calories';

const personaTabs: { id: PersonaFilter; label: string; emoji: string; color: string }[] = [
  { id: 'all', label: 'All Items', emoji: '🍽️', color: 'bg-accent text-accent-foreground' },
  { id: 'boomer', label: 'Gut Guardian', emoji: '🫘', color: 'bg-persona-boomer/10 text-persona-boomer' },
  { id: 'millennial', label: 'Protein Hustler', emoji: '💪', color: 'bg-persona-millennial/10 text-persona-millennial' },
  { id: 'genz', label: 'Trend Setter', emoji: '✨', color: 'bg-persona-genz/10 text-persona-genz' },
  { id: 'indulge', label: 'Guilt-Free Rebel', emoji: '🍫', color: 'bg-persona-indulge/10 text-persona-indulge' },
];

const categoryTabs = ['All', 'Bowls', 'Wraps', 'Drinks', 'Smoothies', 'Pancakes', 'Toast', 'Salads', 'Snacks', 'Combos'];

const quickFilters = [
  { key: 'vegetarian', label: '🌿 Veg', icon: Leaf },
  { key: 'vegan', label: '🌱 Vegan', icon: Leaf },
  { key: 'gluten-free', label: '🚫 Gluten-Free', icon: null },
  { key: 'high-protein', label: '💪 Protein 15g+', icon: Zap },
  { key: 'under-100', label: '💰 Under ₹100', icon: null },
  { key: 'trending', label: '🔥 Trending', icon: Flame },
];

const fadeUp = { hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { duration: 0.3 } } };

export default function MenuPage() {
  const [activePersona, setActivePersona] = useState<PersonaFilter>('all');
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<string[]>([]);
  const [sort, setSort] = useState<SortMode>('popular');
  const [showFilters, setShowFilters] = useState(false);

  const toggleFilter = (f: string) => setFilters(prev => prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f]);

  let filtered = extendedMenuItems.filter((item) => {
    if (activePersona !== 'all' && !item.persona.includes(activePersona)) return false;
    if (search && !item.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (filters.includes('vegetarian') && !item.isVegetarian) return false;
    if (filters.includes('vegan') && !item.isVegan) return false;
    if (filters.includes('gluten-free') && !item.isGlutenFree) return false;
    if (filters.includes('high-protein') && item.nutrition.protein < 15) return false;
    if (filters.includes('under-100') && item.price >= 100) return false;
    if (filters.includes('trending') && !item.tags.includes('Trending')) return false;
    if (activeCategory !== 'All') {
      const cat = activeCategory.toLowerCase();
      const nameLower = item.name.toLowerCase();
      const tagMatch = item.tags.some(t => t.toLowerCase().includes(cat));
      if (!tagMatch && !nameLower.includes(cat.slice(0, -1))) return false;
    }
    return true;
  });

  // Sort
  filtered = [...filtered].sort((a, b) => {
    switch (sort) {
      case 'price-low': return a.price - b.price;
      case 'price-high': return b.price - a.price;
      case 'protein': return b.nutrition.protein - a.nutrition.protein;
      case 'calories': return a.nutrition.calories - b.nutrition.calories;
      default: return b.rating * b.reviewCount - a.rating * a.reviewCount;
    }
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="gradient-hero py-10 border-b border-border">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold mb-1">Our Menu</h1>
              <p className="text-muted-foreground">
                Fresh, gut-friendly breakfasts — <span className="font-semibold text-primary">{extendedMenuItems.length}</span> items to choose from
              </p>
            </div>
            <Link to="/quiz">
              <Button variant="hero" size="sm"><Sparkles className="mr-2 h-4 w-4" /> Find Your Persona</Button>
            </Link>
          </div>
        </div>
      </section>

      <div className="container py-6">
        {/* Persona Tabs */}
        <div className="flex flex-wrap gap-2 mb-5">
          {personaTabs.map((tab) => (
            <button key={tab.id} onClick={() => setActivePersona(tab.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activePersona === tab.id ? tab.color + ' shadow-soft' : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}>
              <span>{tab.emoji}</span> {tab.label}
            </button>
          ))}
        </div>

        {/* Category scrollable tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-5 scrollbar-hide">
          {categoryTabs.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeCategory === cat ? 'gradient-sunrise text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search by name, ingredient, tag..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 h-11" />
            {search && <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2"><X className="h-4 w-4 text-muted-foreground" /></button>}
          </div>
          <div className="flex gap-2">
            <Button variant={showFilters ? 'default' : 'outline'} size="sm" onClick={() => setShowFilters(!showFilters)} className="h-11">
              <SlidersHorizontal className="h-4 w-4 mr-1" /> Filters {filters.length > 0 && `(${filters.length})`}
            </Button>
            <select value={sort} onChange={e => setSort(e.target.value as SortMode)}
              className="h-11 px-3 rounded-lg border border-input bg-background text-sm">
              <option value="popular">Popular</option>
              <option value="price-low">Price: Low → High</option>
              <option value="price-high">Price: High → Low</option>
              <option value="protein">Highest Protein</option>
              <option value="calories">Lowest Calories</option>
            </select>
          </div>
        </div>

        {/* Quick Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              className="flex flex-wrap gap-2 mb-5 overflow-hidden">
              {quickFilters.map((f) => (
                <Badge key={f.key} variant={filters.includes(f.key) ? 'default' : 'outline'}
                  className="cursor-pointer select-none py-1.5 px-3 text-sm" onClick={() => toggleFilter(f.key)}>
                  {f.label}
                </Badge>
              ))}
              {filters.length > 0 && (
                <button onClick={() => setFilters([])} className="text-xs text-primary font-medium underline">Clear all</button>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results count */}
        <p className="text-sm text-muted-foreground mb-4">{filtered.length} items found</p>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((item) => (
            <motion.div key={item.id} initial="hidden" animate="visible" variants={fadeUp}>
              <MenuItemCard item={item} />
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-5xl mb-4">🍽️</p>
            <h3 className="font-display text-xl font-bold mb-2">No items match your filters</h3>
            <p className="text-muted-foreground mb-4">Try broadening your search or changing filters</p>
            <Button variant="outline" onClick={() => { setFilters([]); setSearch(''); setActiveCategory('All'); setActivePersona('all'); }}>
              Reset All Filters
            </Button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
