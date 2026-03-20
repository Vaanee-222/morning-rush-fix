import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  BarChart3, ShoppingCart, Users, Utensils, Package, MapPin, TrendingUp, Settings, Bell, LogOut, Handshake, Warehouse, Send
} from 'lucide-react';

const navItems = [
  { icon: BarChart3, label: 'Dashboard', href: '/admin' },
  { icon: ShoppingCart, label: 'Orders', href: '/admin/orders' },
  { icon: Utensils, label: 'Menu', href: '/admin/menu' },
  { icon: Users, label: 'Customers', href: '/admin/customers' },
  { icon: Package, label: 'Subscriptions', href: '/admin/subscriptions' },
  { icon: MapPin, label: 'Stations', href: '/admin/stations' },
  { icon: Handshake, label: 'Partners', href: '/admin/partners' },
  { icon: Warehouse, label: 'Inventory', href: '/admin/inventory' },
  { icon: Send, label: 'Notifications', href: '/admin/notifications' },
  { icon: TrendingUp, label: 'Analytics', href: '/admin/analytics' },
  { icon: Settings, label: 'Settings', href: '/admin/settings' },
];

interface AdminLayoutProps {
  children: React.ReactNode;
  active: string;
}

export default function AdminLayout({ children, active }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-muted/30">
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/admin" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-sunrise">
                <span className="text-sm font-bold text-primary-foreground">7</span>
              </div>
              <span className="font-display text-lg font-bold">7AM Admin</span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/admin/notifications"><Button variant="ghost" size="icon"><Bell className="h-4 w-4" /></Button></Link>
            <Link to="/admin/settings"><Button variant="ghost" size="icon"><Settings className="h-4 w-4" /></Button></Link>
            <Separator orientation="vertical" className="h-6" />
            <Link to="/admin/profile" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full gradient-fresh flex items-center justify-center text-xs font-bold text-secondary-foreground">A</div>
              <span className="text-sm font-medium hidden sm:block">Admin</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="flex">
        <aside className="hidden lg:block w-56 border-r border-border bg-card min-h-[calc(100vh-3.5rem)] p-4">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <Link key={item.label} to={item.href}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${active === item.label ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}>
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
