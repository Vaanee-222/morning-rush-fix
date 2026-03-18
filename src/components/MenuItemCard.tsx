import { getFoodImage } from '@/lib/images';
import { MenuItem } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Plus } from 'lucide-react';

interface MenuItemCardProps {
  item: MenuItem;
  onAddToCart?: (item: MenuItem) => void;
}

export function MenuItemCard({ item, onAddToCart }: MenuItemCardProps) {
  return (
    <Link to={`/menu/item/${item.id}`} className="group rounded-xl border border-border bg-card overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 block">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={getFoodImage(item.id)}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {item.nutrition.protein >= 15 && (
          <Badge className="absolute top-3 left-3 bg-secondary text-secondary-foreground text-xs">
            {item.nutrition.protein}g Protein
          </Badge>
        )}
        {item.isVegetarian && (
          <div className="absolute top-3 right-3 w-5 h-5 border-2 border-leaf rounded-sm flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-leaf" />
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-display font-semibold text-card-foreground leading-tight">{item.name}</h3>
        </div>
        <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{item.description}</p>
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-golden text-golden" />
            <span className="text-xs font-medium">{item.rating}</span>
          </div>
          <span className="text-xs text-muted-foreground">({item.reviewCount})</span>
          <div className="flex gap-1 ml-auto">
            {item.tags.slice(0, 1).map((tag) => (
              <Badge key={tag} variant="outline" className="text-[10px] px-1.5 py-0">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-display font-bold text-lg text-foreground">₹{item.price}</span>
            {item.mrp && (
              <span className="text-xs text-muted-foreground line-through">₹{item.mrp}</span>
            )}
          </div>
          <Button
            size="sm"
            variant="hero"
            className="h-8 w-8 p-0 rounded-full"
            onClick={() => onAddToCart?.(item)}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
