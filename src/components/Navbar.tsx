import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, X, ShoppingCart, User } from 'lucide-react';
import { useState } from 'react';

const navLinks = [
  { label: 'Menu', href: '/menu' },
  { label: 'Shop', href: '/shop' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Locations', href: '/locations' },
  { label: 'About', href: '/about' },
];

export function Navbar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-lg">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-sunrise">
            <span className="text-lg font-bold text-primary-foreground">7</span>
          </div>
          <span className="font-display text-xl font-bold text-foreground">7AM Club</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                location.pathname === link.href
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">2</span>
            </Button>
          </Link>
          <Link to="/dashboard" className="hidden md:block">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </Link>
          <Link to="/login" className="hidden md:block">
            <Button variant="hero" size="sm">Get Started</Button>
          </Link>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 bg-background">
              <div className="flex flex-col gap-4 mt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setOpen(false)}
                    className="px-4 py-3 text-lg font-medium rounded-lg hover:bg-muted transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
                <hr className="border-border" />
                <Link to="/dashboard" onClick={() => setOpen(false)}>
                  <Button variant="outline" className="w-full">Dashboard</Button>
                </Link>
                <Link to="/login" onClick={() => setOpen(false)}>
                  <Button variant="hero" className="w-full">Get Started</Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
