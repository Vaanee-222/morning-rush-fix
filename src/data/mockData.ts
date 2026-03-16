// Mock data for the 7AM Club platform

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  mrp?: number;
  image: string;
  persona: ('boomer' | 'millennial' | 'genz' | 'indulge')[];
  nutrition: {
    protein: number;
    fiber: number;
    calories: number;
    carbs: number;
    fat: number;
  };
  tags: string[];
  rating: number;
  reviewCount: number;
  isVegetarian: boolean;
  isVegan?: boolean;
  isGlutenFree?: boolean;
  allergens?: string[];
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  meals: number;
  price: number;
  perMealCost: number;
  savings: number;
  features: string[];
  isPopular?: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  time: string;
  station: string;
  items: { name: string; quantity: number; price: number }[];
  total: number;
  status: 'confirmed' | 'preparing' | 'ready' | 'picked_up' | 'cancelled';
}

export const menuItems: MenuItem[] = [
  {
    id: '1', name: 'Sprouted Moong Chaat', description: 'Protein-packed sprouted moong with tangy chutney, pomegranate, and roasted cumin.', price: 89, mrp: 120,
    image: '', persona: ['boomer', 'millennial'], nutrition: { protein: 18, fiber: 8, calories: 220, carbs: 28, fat: 4 },
    tags: ['High Protein', 'Gut Friendly'], rating: 4.8, reviewCount: 342, isVegetarian: true, isVegan: true, isGlutenFree: true,
  },
  {
    id: '2', name: 'Overnight Oats Bowl', description: 'Creamy oats soaked overnight with chia seeds, seasonal fruits, and honey drizzle.', price: 109, mrp: 150,
    image: '', persona: ['millennial', 'genz'], nutrition: { protein: 12, fiber: 10, calories: 310, carbs: 42, fat: 8 },
    tags: ['Trending', 'Fiber Rich'], rating: 4.6, reviewCount: 218, isVegetarian: true, isGlutenFree: false,
  },
  {
    id: '3', name: 'Multigrain Thepla Wrap', description: 'Fresh multigrain thepla stuffed with paneer bhurji and mint chutney.', price: 99, mrp: 130,
    image: '', persona: ['boomer'], nutrition: { protein: 16, fiber: 6, calories: 280, carbs: 32, fat: 10 },
    tags: ['Traditional', 'Wholesome'], rating: 4.7, reviewCount: 456, isVegetarian: true, isGlutenFree: false,
  },
  {
    id: '4', name: 'Acai Smoothie Bowl', description: 'Thick acai blend topped with granola, banana chips, and coconut flakes.', price: 149, mrp: 200,
    image: '', persona: ['genz', 'indulge'], nutrition: { protein: 8, fiber: 7, calories: 350, carbs: 48, fat: 12 },
    tags: ['Instagram Worthy', 'Antioxidant'], rating: 4.9, reviewCount: 189, isVegetarian: true, isVegan: true,
  },
  {
    id: '5', name: 'Masala Egg White Wrap', description: 'Fluffy egg whites with turmeric, peppers, and whole wheat wrap.', price: 119, mrp: 160,
    image: '', persona: ['millennial', 'boomer'], nutrition: { protein: 24, fiber: 4, calories: 260, carbs: 22, fat: 6 },
    tags: ['High Protein', 'Low Fat'], rating: 4.5, reviewCount: 276, isVegetarian: false, isGlutenFree: false,
  },
  {
    id: '6', name: 'Chocolate Ragi Pancakes', description: 'Guilt-free ragi pancakes with dark chocolate chips and banana slices.', price: 129, mrp: 170,
    image: '', persona: ['genz', 'indulge'], nutrition: { protein: 10, fiber: 5, calories: 320, carbs: 40, fat: 10 },
    tags: ['Indulgent', 'Iron Rich'], rating: 4.7, reviewCount: 312, isVegetarian: true, isGlutenFree: true,
  },
  {
    id: '7', name: 'Probiotic Lassi', description: 'Traditional lassi packed with live cultures and cardamom.', price: 69, mrp: 90,
    image: '', persona: ['boomer', 'millennial'], nutrition: { protein: 8, fiber: 0, calories: 150, carbs: 18, fat: 5 },
    tags: ['Probiotic', 'Gut Friendly'], rating: 4.8, reviewCount: 523, isVegetarian: true,
  },
  {
    id: '8', name: 'Avocado Toast Stack', description: 'Sourdough loaded with smashed avocado, cherry tomatoes, and microgreens.', price: 159, mrp: 210,
    image: '', persona: ['genz', 'millennial'], nutrition: { protein: 9, fiber: 8, calories: 340, carbs: 30, fat: 18 },
    tags: ['Trending', 'Healthy Fats'], rating: 4.6, reviewCount: 167, isVegetarian: true, isVegan: true,
  },
];

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'sprout', name: 'Sprout Saver', meals: 10, price: 899, perMealCost: 89.9, savings: 10,
    features: ['10 meals per month', 'Choose any item', 'Flexible scheduling', 'Pause anytime', 'WhatsApp updates'],
  },
  {
    id: 'regular', name: 'Regular Fix', meals: 20, price: 1599, perMealCost: 79.95, savings: 20, isPopular: true,
    features: ['20 meals per month', 'Choose any item', 'Priority pickup', 'Flexible scheduling', 'Pause anytime', 'WhatsApp updates', 'Exclusive items access'],
  },
  {
    id: 'legend', name: 'Munch Legend', meals: 30, price: 2099, perMealCost: 69.97, savings: 30,
    features: ['30 meals per month', 'Choose any item', 'VIP pickup lane', 'Flexible scheduling', 'Pause anytime', 'WhatsApp updates', 'Exclusive items access', 'Beta Eater priority', 'Free referral rewards'],
  },
];

export const sampleOrders: Order[] = [
  {
    id: '1', orderNumber: '7AM-00247', date: '2026-03-17', time: '7:30 AM', station: 'Rajiv Chowk',
    items: [{ name: 'Sprouted Moong Chaat', quantity: 1, price: 89 }, { name: 'Probiotic Lassi', quantity: 1, price: 69 }],
    total: 158, status: 'confirmed',
  },
  {
    id: '2', orderNumber: '7AM-00231', date: '2026-03-16', time: '8:00 AM', station: 'Huda City Centre',
    items: [{ name: 'Overnight Oats Bowl', quantity: 2, price: 109 }],
    total: 218, status: 'ready',
  },
  {
    id: '3', orderNumber: '7AM-00198', date: '2026-03-14', time: '7:15 AM', station: 'Rajiv Chowk',
    items: [{ name: 'Masala Egg White Wrap', quantity: 1, price: 119 }, { name: 'Probiotic Lassi', quantity: 1, price: 69 }],
    total: 188, status: 'picked_up',
  },
];

export const metroStations = [
  'Rajiv Chowk', 'Huda City Centre', 'Kashmere Gate', 'Hauz Khas', 'Noida Sector 18',
  'Dwarka Sector 21', 'Nehru Place', 'Botanical Garden',
];

export const personas = [
  { id: 'boomer', name: 'The Gut Guardian', emoji: '🫘', color: 'persona-boomer', description: 'Traditional flavors with modern gut health benefits. For those who know that good digestion starts at breakfast.' },
  { id: 'millennial', name: 'The Protein Hustler', emoji: '💪', color: 'persona-millennial', description: 'High-protein, productivity-boosting meals. Fuel your ambition with every bite.' },
  { id: 'genz', name: 'The Trend Setter', emoji: '✨', color: 'persona-genz', description: 'Instagram-worthy bowls with trendy superfoods. Because your breakfast should be as fire as your feed.' },
  { id: 'indulge', name: 'The Guilt-Free Rebel', emoji: '🍫', color: 'persona-indulge', description: 'Indulgent flavors without the guilt. Treat yourself — you deserve it.' },
];
