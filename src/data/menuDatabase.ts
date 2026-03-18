// Extended menu database with 200+ items
import { MenuItem } from './mockData';

const categories = ['Bowls', 'Wraps', 'Drinks', 'Smoothies', 'Pancakes', 'Toast', 'Salads', 'Snacks', 'Combos', 'Specials'];

const baseItems: Partial<MenuItem>[] = [
  // Original 8 items preserved
  { id: '1', name: 'Sprouted Moong Chaat', description: 'Protein-packed sprouted moong with tangy chutney, pomegranate, and roasted cumin.', price: 89, mrp: 120, persona: ['boomer', 'millennial'], nutrition: { protein: 18, fiber: 8, calories: 220, carbs: 28, fat: 4 }, tags: ['High Protein', 'Gut Friendly'], rating: 4.8, reviewCount: 342, isVegetarian: true, isVegan: true, isGlutenFree: true, allergens: [], ingredients: ['Sprouted moong', 'Pomegranate', 'Cumin', 'Green chutney', 'Onion', 'Tomato', 'Lemon'] },
  { id: '2', name: 'Overnight Oats Bowl', description: 'Creamy oats soaked overnight with chia seeds, seasonal fruits, and honey drizzle.', price: 109, mrp: 150, persona: ['millennial', 'genz'], nutrition: { protein: 12, fiber: 10, calories: 310, carbs: 42, fat: 8 }, tags: ['Trending', 'Fiber Rich'], rating: 4.6, reviewCount: 218, isVegetarian: true, isGlutenFree: false, allergens: ['Gluten', 'Dairy'], ingredients: ['Rolled oats', 'Chia seeds', 'Honey', 'Mixed berries', 'Banana', 'Almond milk'] },
  { id: '3', name: 'Multigrain Thepla Wrap', description: 'Fresh multigrain thepla stuffed with paneer bhurji and mint chutney.', price: 99, mrp: 130, persona: ['boomer'], nutrition: { protein: 16, fiber: 6, calories: 280, carbs: 32, fat: 10 }, tags: ['Traditional', 'Wholesome'], rating: 4.7, reviewCount: 456, isVegetarian: true, isGlutenFree: false, allergens: ['Gluten', 'Dairy'], ingredients: ['Multigrain flour', 'Paneer', 'Spices', 'Mint chutney', 'Curd'] },
  { id: '4', name: 'Acai Smoothie Bowl', description: 'Thick acai blend topped with granola, banana chips, and coconut flakes.', price: 149, mrp: 200, persona: ['genz', 'indulge'], nutrition: { protein: 8, fiber: 7, calories: 350, carbs: 48, fat: 12 }, tags: ['Instagram Worthy', 'Antioxidant'], rating: 4.9, reviewCount: 189, isVegetarian: true, isVegan: true, allergens: ['Nuts'], ingredients: ['Acai puree', 'Banana', 'Granola', 'Coconut flakes', 'Chia seeds', 'Honey'] },
  { id: '5', name: 'Masala Egg White Wrap', description: 'Fluffy egg whites with turmeric, peppers, and whole wheat wrap.', price: 119, mrp: 160, persona: ['millennial', 'boomer'], nutrition: { protein: 24, fiber: 4, calories: 260, carbs: 22, fat: 6 }, tags: ['High Protein', 'Low Fat'], rating: 4.5, reviewCount: 276, isVegetarian: false, isGlutenFree: false, allergens: ['Eggs', 'Gluten'], ingredients: ['Egg whites', 'Turmeric', 'Bell peppers', 'Whole wheat wrap', 'Onion'] },
  { id: '6', name: 'Chocolate Ragi Pancakes', description: 'Guilt-free ragi pancakes with dark chocolate chips and banana slices.', price: 129, mrp: 170, persona: ['genz', 'indulge'], nutrition: { protein: 10, fiber: 5, calories: 320, carbs: 40, fat: 10 }, tags: ['Indulgent', 'Iron Rich'], rating: 4.7, reviewCount: 312, isVegetarian: true, isGlutenFree: true, allergens: ['Dairy'], ingredients: ['Ragi flour', 'Dark chocolate', 'Banana', 'Jaggery', 'Butter'] },
  { id: '7', name: 'Probiotic Lassi', description: 'Traditional lassi packed with live cultures and cardamom.', price: 69, mrp: 90, persona: ['boomer', 'millennial'], nutrition: { protein: 8, fiber: 0, calories: 150, carbs: 18, fat: 5 }, tags: ['Probiotic', 'Gut Friendly'], rating: 4.8, reviewCount: 523, isVegetarian: true, allergens: ['Dairy'], ingredients: ['Fresh curd', 'Cardamom', 'Sugar', 'Live cultures'] },
  { id: '8', name: 'Avocado Toast Stack', description: 'Sourdough loaded with smashed avocado, cherry tomatoes, and microgreens.', price: 159, mrp: 210, persona: ['genz', 'millennial'], nutrition: { protein: 9, fiber: 8, calories: 340, carbs: 30, fat: 18 }, tags: ['Trending', 'Healthy Fats'], rating: 4.6, reviewCount: 167, isVegetarian: true, isVegan: true, allergens: ['Gluten'], ingredients: ['Sourdough bread', 'Avocado', 'Cherry tomatoes', 'Microgreens', 'Olive oil', 'Lemon'] },
  // Bowls (9-30)
  { id: '9', name: 'Quinoa Power Bowl', description: 'Fluffy quinoa with roasted sweet potato, chickpeas, tahini, and fresh herbs.', price: 169, mrp: 220, persona: ['millennial', 'genz'], nutrition: { protein: 16, fiber: 9, calories: 380, carbs: 45, fat: 14 }, tags: ['Superfood', 'High Protein'], rating: 4.7, reviewCount: 134, isVegetarian: true, isVegan: true, isGlutenFree: true, allergens: ['Sesame'], ingredients: ['Quinoa', 'Sweet potato', 'Chickpeas', 'Tahini', 'Parsley', 'Lemon'] },
  { id: '10', name: 'Poha Bowl', description: 'Classic beaten rice with peanuts, turmeric, curry leaves, and a squeeze of lime.', price: 79, mrp: 100, persona: ['boomer'], nutrition: { protein: 6, fiber: 3, calories: 250, carbs: 38, fat: 8 }, tags: ['Traditional', 'Light'], rating: 4.5, reviewCount: 389, isVegetarian: true, isVegan: true, isGlutenFree: true, allergens: ['Peanuts'], ingredients: ['Poha', 'Peanuts', 'Turmeric', 'Curry leaves', 'Onion', 'Mustard seeds'] },
  { id: '11', name: 'Upma Bowl', description: 'South Indian semolina porridge with cashews, mustard, and fresh coconut.', price: 85, mrp: 110, persona: ['boomer'], nutrition: { protein: 7, fiber: 4, calories: 270, carbs: 40, fat: 9 }, tags: ['Traditional', 'Comfort'], rating: 4.4, reviewCount: 267, isVegetarian: true, allergens: ['Gluten', 'Nuts'], ingredients: ['Semolina', 'Cashews', 'Mustard seeds', 'Coconut', 'Green chili'] },
  { id: '12', name: 'Dragon Fruit Bowl', description: 'Pink dragon fruit smoothie base with kiwi, mango, and hemp seeds.', price: 179, mrp: 230, persona: ['genz'], nutrition: { protein: 7, fiber: 6, calories: 290, carbs: 42, fat: 10 }, tags: ['Instagram Worthy', 'Vitamin C'], rating: 4.8, reviewCount: 98, isVegetarian: true, isVegan: true, isGlutenFree: true, allergens: [], ingredients: ['Dragon fruit', 'Kiwi', 'Mango', 'Hemp seeds', 'Coconut milk'] },
  { id: '13', name: 'Khichdi Bowl', description: 'Healing moong dal khichdi with ghee tempering and pickle.', price: 95, mrp: 120, persona: ['boomer'], nutrition: { protein: 12, fiber: 5, calories: 300, carbs: 45, fat: 8 }, tags: ['Gut Friendly', 'Healing'], rating: 4.6, reviewCount: 445, isVegetarian: true, isGlutenFree: true, allergens: ['Dairy'], ingredients: ['Rice', 'Moong dal', 'Ghee', 'Cumin', 'Turmeric', 'Pickle'] },
  { id: '14', name: 'Muesli Yogurt Parfait', description: 'Layered Greek yogurt with house-made muesli, berries, and honey.', price: 139, mrp: 180, persona: ['millennial', 'genz'], nutrition: { protein: 14, fiber: 6, calories: 320, carbs: 38, fat: 12 }, tags: ['Protein Rich', 'Probiotic'], rating: 4.5, reviewCount: 203, isVegetarian: true, allergens: ['Dairy', 'Nuts', 'Gluten'], ingredients: ['Greek yogurt', 'Muesli', 'Blueberries', 'Strawberries', 'Honey'] },
  { id: '15', name: 'Sabudana Khichdi', description: 'Fasting-friendly tapioca pearls with peanuts and potato.', price: 89, mrp: 110, persona: ['boomer'], nutrition: { protein: 5, fiber: 2, calories: 280, carbs: 48, fat: 8 }, tags: ['Traditional', 'Energy'], rating: 4.3, reviewCount: 178, isVegetarian: true, isVegan: true, isGlutenFree: true, allergens: ['Peanuts'], ingredients: ['Sabudana', 'Peanuts', 'Potato', 'Cumin', 'Green chili'] },
  { id: '16', name: 'Matcha Smoothie Bowl', description: 'Ceremonial matcha blended with banana and topped with seeds.', price: 189, mrp: 240, persona: ['genz'], nutrition: { protein: 8, fiber: 4, calories: 280, carbs: 35, fat: 10 }, tags: ['Trending', 'Antioxidant'], rating: 4.7, reviewCount: 87, isVegetarian: true, isVegan: true, isGlutenFree: true, allergens: [], ingredients: ['Matcha powder', 'Banana', 'Pumpkin seeds', 'Coconut', 'Almond milk'] },
  { id: '17', name: 'Protein Dalia Bowl', description: 'Broken wheat cooked with vegetables and topped with boiled egg.', price: 99, mrp: 130, persona: ['millennial', 'boomer'], nutrition: { protein: 18, fiber: 8, calories: 290, carbs: 35, fat: 7 }, tags: ['High Protein', 'Fiber Rich'], rating: 4.4, reviewCount: 312, isVegetarian: false, allergens: ['Eggs', 'Gluten'], ingredients: ['Broken wheat', 'Mixed vegetables', 'Boiled egg', 'Spices'] },
  { id: '18', name: 'Chia Pudding Bowl', description: 'Coconut milk chia pudding with tropical fruits and toasted coconut.', price: 139, mrp: 180, persona: ['genz', 'millennial'], nutrition: { protein: 6, fiber: 12, calories: 260, carbs: 30, fat: 14 }, tags: ['Omega-3', 'Fiber Rich'], rating: 4.6, reviewCount: 156, isVegetarian: true, isVegan: true, isGlutenFree: true, allergens: [], ingredients: ['Chia seeds', 'Coconut milk', 'Mango', 'Pineapple', 'Coconut flakes'] },
  { id: '19', name: 'Rajma Rice Bowl', description: 'Mini comfort bowl with kidney beans, rice, and fresh coriander.', price: 109, mrp: 140, persona: ['boomer', 'indulge'], nutrition: { protein: 14, fiber: 7, calories: 350, carbs: 52, fat: 6 }, tags: ['Comfort', 'Iron Rich'], rating: 4.5, reviewCount: 234, isVegetarian: true, isVegan: true, isGlutenFree: true, allergens: [], ingredients: ['Rajma', 'Basmati rice', 'Onion', 'Tomato', 'Coriander'] },
  { id: '20', name: 'Beetroot Hummus Bowl', description: 'Vibrant beetroot hummus with falafel bites and pita chips.', price: 159, mrp: 200, persona: ['genz', 'millennial'], nutrition: { protein: 11, fiber: 6, calories: 310, carbs: 35, fat: 14 }, tags: ['Mediterranean', 'Iron Rich'], rating: 4.6, reviewCount: 112, isVegetarian: true, isVegan: true, allergens: ['Gluten', 'Sesame'], ingredients: ['Beetroot', 'Chickpeas', 'Tahini', 'Falafel', 'Pita'] },
  // Wraps (21-40)
  { id: '21', name: 'Paneer Tikka Wrap', description: 'Smoky paneer tikka in a spinach tortilla with mint raita.', price: 129, mrp: 170, persona: ['millennial', 'indulge'], nutrition: { protein: 20, fiber: 3, calories: 340, carbs: 28, fat: 16 }, tags: ['High Protein', 'Popular'], rating: 4.7, reviewCount: 387, isVegetarian: true, allergens: ['Dairy', 'Gluten'], ingredients: ['Paneer', 'Spinach tortilla', 'Yogurt', 'Spices', 'Mint'] },
  { id: '22', name: 'Chicken Seekh Wrap', description: 'Juicy chicken seekh kebab with pickled onions and green chutney.', price: 149, mrp: 190, persona: ['millennial'], nutrition: { protein: 28, fiber: 2, calories: 360, carbs: 25, fat: 14 }, tags: ['High Protein', 'Non-Veg'], rating: 4.6, reviewCount: 298, isVegetarian: false, allergens: ['Gluten'], ingredients: ['Chicken mince', 'Onion', 'Spices', 'Wheat wrap', 'Green chutney'] },
  { id: '23', name: 'Falafel Wrap', description: 'Crispy falafel with hummus, pickled veggies, and tahini sauce.', price: 139, mrp: 180, persona: ['genz', 'millennial'], nutrition: { protein: 14, fiber: 6, calories: 330, carbs: 38, fat: 14 }, tags: ['Mediterranean', 'Vegan'], rating: 4.5, reviewCount: 176, isVegetarian: true, isVegan: true, allergens: ['Gluten', 'Sesame'], ingredients: ['Chickpeas', 'Herbs', 'Hummus', 'Pickled vegetables', 'Tahini'] },
  { id: '24', name: 'Sprout & Cheese Wrap', description: 'Mixed sprouts with melted cheese in a whole wheat wrap.', price: 109, mrp: 140, persona: ['boomer', 'millennial'], nutrition: { protein: 16, fiber: 5, calories: 290, carbs: 30, fat: 12 }, tags: ['Protein Rich', 'Wholesome'], rating: 4.4, reviewCount: 210, isVegetarian: true, allergens: ['Dairy', 'Gluten'], ingredients: ['Mixed sprouts', 'Cheese', 'Whole wheat wrap', 'Spices'] },
  { id: '25', name: 'Tofu Teriyaki Wrap', description: 'Marinated tofu with teriyaki glaze, edamame, and pickled ginger.', price: 149, mrp: 190, persona: ['genz', 'millennial'], nutrition: { protein: 18, fiber: 4, calories: 300, carbs: 32, fat: 12 }, tags: ['Asian Fusion', 'Vegan'], rating: 4.5, reviewCount: 89, isVegetarian: true, isVegan: true, allergens: ['Soy', 'Gluten'], ingredients: ['Tofu', 'Teriyaki sauce', 'Edamame', 'Pickled ginger', 'Rice wrap'] },
  { id: '26', name: 'Egg Bhurji Roll', description: 'Spicy scrambled eggs rolled in a flaky paratha.', price: 99, mrp: 130, persona: ['boomer', 'indulge'], nutrition: { protein: 16, fiber: 2, calories: 340, carbs: 28, fat: 18 }, tags: ['Classic', 'Comfort'], rating: 4.6, reviewCount: 567, isVegetarian: false, allergens: ['Eggs', 'Gluten', 'Dairy'], ingredients: ['Eggs', 'Onion', 'Tomato', 'Spices', 'Paratha'] },
  { id: '27', name: 'Mushroom & Spinach Wrap', description: 'Sauteed mushrooms with baby spinach and garlic aioli.', price: 129, mrp: 160, persona: ['millennial', 'genz'], nutrition: { protein: 10, fiber: 4, calories: 270, carbs: 28, fat: 14 }, tags: ['Low Cal', 'Umami'], rating: 4.4, reviewCount: 145, isVegetarian: true, allergens: ['Gluten', 'Dairy'], ingredients: ['Mushrooms', 'Baby spinach', 'Garlic', 'Aioli', 'Tortilla'] },
  { id: '28', name: 'Soya Keema Wrap', description: 'Spiced soy granules with onion and mint chutney in a roti roll.', price: 89, mrp: 120, persona: ['boomer', 'millennial'], nutrition: { protein: 22, fiber: 5, calories: 280, carbs: 30, fat: 8 }, tags: ['High Protein', 'Vegan'], rating: 4.3, reviewCount: 234, isVegetarian: true, isVegan: true, allergens: ['Soy', 'Gluten'], ingredients: ['Soy granules', 'Onion', 'Mint chutney', 'Roti', 'Spices'] },
  { id: '29', name: 'Mediterranean Veggie Wrap', description: 'Roasted zucchini, bell pepper, olives, and feta in a sun-dried tomato wrap.', price: 159, mrp: 200, persona: ['genz'], nutrition: { protein: 10, fiber: 5, calories: 310, carbs: 32, fat: 16 }, tags: ['Mediterranean', 'Gourmet'], rating: 4.6, reviewCount: 98, isVegetarian: true, allergens: ['Dairy', 'Gluten'], ingredients: ['Zucchini', 'Bell pepper', 'Olives', 'Feta', 'Sun-dried tomato wrap'] },
  { id: '30', name: 'Tandoori Chicken Wrap', description: 'Chargrilled tandoori chicken with cucumber raita and naan wrap.', price: 159, mrp: 200, persona: ['millennial', 'indulge'], nutrition: { protein: 26, fiber: 2, calories: 370, carbs: 28, fat: 16 }, tags: ['High Protein', 'Popular'], rating: 4.7, reviewCount: 412, isVegetarian: false, allergens: ['Dairy', 'Gluten'], ingredients: ['Chicken', 'Yogurt', 'Tandoori spices', 'Cucumber', 'Naan'] },
  // Drinks (31-55)
  { id: '31', name: 'Turmeric Latte', description: 'Golden milk with turmeric, ginger, and black pepper in warm oat milk.', price: 89, mrp: 120, persona: ['boomer', 'millennial'], nutrition: { protein: 4, fiber: 1, calories: 120, carbs: 18, fat: 4 }, tags: ['Anti-inflammatory', 'Gut Friendly'], rating: 4.7, reviewCount: 345, isVegetarian: true, isVegan: true, isGlutenFree: true, allergens: [], ingredients: ['Oat milk', 'Turmeric', 'Ginger', 'Black pepper', 'Honey'] },
  { id: '32', name: 'Green Detox Juice', description: 'Fresh spinach, apple, celery, ginger, and lemon cold-pressed.', price: 119, mrp: 150, persona: ['millennial', 'genz'], nutrition: { protein: 2, fiber: 3, calories: 80, carbs: 18, fat: 0 }, tags: ['Detox', 'Cold Pressed'], rating: 4.5, reviewCount: 201, isVegetarian: true, isVegan: true, isGlutenFree: true, allergens: [], ingredients: ['Spinach', 'Apple', 'Celery', 'Ginger', 'Lemon'] },
  { id: '33', name: 'Mango Lassi', description: 'Thick Alphonso mango blended with creamy yogurt.', price: 79, mrp: 100, persona: ['boomer', 'indulge'], nutrition: { protein: 6, fiber: 1, calories: 200, carbs: 32, fat: 6 }, tags: ['Classic', 'Seasonal'], rating: 4.8, reviewCount: 456, isVegetarian: true, isGlutenFree: true, allergens: ['Dairy'], ingredients: ['Alphonso mango', 'Yogurt', 'Sugar', 'Cardamom'] },
  { id: '34', name: 'Cold Brew Coffee', description: 'Slow-steeped cold brew served with optional oat milk.', price: 99, mrp: 130, persona: ['millennial', 'genz'], nutrition: { protein: 1, fiber: 0, calories: 10, carbs: 2, fat: 0 }, tags: ['Energy', 'Trending'], rating: 4.6, reviewCount: 378, isVegetarian: true, isVegan: true, isGlutenFree: true, allergens: [], ingredients: ['Cold brew coffee', 'Oat milk (optional)'] },
  { id: '35', name: 'Beetroot Smoothie', description: 'Earthy beetroot with apple, carrot, and a hint of ginger.', price: 109, mrp: 140, persona: ['millennial'], nutrition: { protein: 3, fiber: 4, calories: 130, carbs: 28, fat: 1 }, tags: ['Iron Rich', 'Stamina'], rating: 4.4, reviewCount: 123, isVegetarian: true, isVegan: true, isGlutenFree: true, allergens: [], ingredients: ['Beetroot', 'Apple', 'Carrot', 'Ginger'] },
  { id: '36', name: 'Protein Shake - Chocolate', description: 'Rich chocolate whey protein blended with banana and peanut butter.', price: 139, mrp: 180, persona: ['millennial'], nutrition: { protein: 30, fiber: 2, calories: 350, carbs: 30, fat: 12 }, tags: ['High Protein', 'Post-Workout'], rating: 4.5, reviewCount: 267, isVegetarian: true, isGlutenFree: true, allergens: ['Dairy', 'Peanuts'], ingredients: ['Whey protein', 'Banana', 'Peanut butter', 'Cocoa', 'Milk'] },
  { id: '37', name: 'Coconut Water Refresher', description: 'Fresh coconut water with lime, mint, and a pinch of salt.', price: 69, mrp: 90, persona: ['boomer', 'genz'], nutrition: { protein: 1, fiber: 0, calories: 60, carbs: 14, fat: 0 }, tags: ['Hydrating', 'Natural'], rating: 4.7, reviewCount: 234, isVegetarian: true, isVegan: true, isGlutenFree: true, allergens: [], ingredients: ['Coconut water', 'Lime', 'Mint', 'Salt'] },
  { id: '38', name: 'Masala Chai', description: 'Hand-brewed chai with ginger, cardamom, and cinnamon.', price: 49, mrp: 70, persona: ['boomer'], nutrition: { protein: 2, fiber: 0, calories: 80, carbs: 14, fat: 2 }, tags: ['Classic', 'Warming'], rating: 4.9, reviewCount: 789, isVegetarian: true, isGlutenFree: true, allergens: ['Dairy'], ingredients: ['Tea leaves', 'Milk', 'Ginger', 'Cardamom', 'Cinnamon'] },
  { id: '39', name: 'Berry Blast Smoothie', description: 'Mixed berries with banana, oat milk, and a drizzle of honey.', price: 129, mrp: 160, persona: ['genz', 'indulge'], nutrition: { protein: 5, fiber: 5, calories: 220, carbs: 40, fat: 4 }, tags: ['Antioxidant', 'Refreshing'], rating: 4.6, reviewCount: 178, isVegetarian: true, isVegan: true, isGlutenFree: true, allergens: [], ingredients: ['Mixed berries', 'Banana', 'Oat milk', 'Honey'] },
  { id: '40', name: 'ABC Juice', description: 'Apple, beetroot, and carrot freshly pressed with ginger.', price: 99, mrp: 120, persona: ['boomer', 'millennial'], nutrition: { protein: 2, fiber: 3, calories: 110, carbs: 24, fat: 0 }, tags: ['Immunity', 'Classic'], rating: 4.5, reviewCount: 312, isVegetarian: true, isVegan: true, isGlutenFree: true, allergens: [], ingredients: ['Apple', 'Beetroot', 'Carrot', 'Ginger'] },
  { id: '41', name: 'Jal Jeera', description: 'Refreshing cumin-mint cooler with tangy tamarind.', price: 49, mrp: 60, persona: ['boomer'], nutrition: { protein: 1, fiber: 1, calories: 30, carbs: 6, fat: 0 }, tags: ['Digestive', 'Refreshing'], rating: 4.4, reviewCount: 267, isVegetarian: true, isVegan: true, isGlutenFree: true, allergens: [], ingredients: ['Cumin', 'Mint', 'Tamarind', 'Black salt'] },
  { id: '42', name: 'Protein Shake - Vanilla', description: 'Smooth vanilla whey with almonds and a touch of cinnamon.', price: 139, mrp: 180, persona: ['millennial'], nutrition: { protein: 28, fiber: 2, calories: 320, carbs: 26, fat: 10 }, tags: ['High Protein', 'Post-Workout'], rating: 4.4, reviewCount: 189, isVegetarian: true, isGlutenFree: true, allergens: ['Dairy', 'Nuts'], ingredients: ['Whey protein', 'Almonds', 'Cinnamon', 'Milk'] },
  { id: '43', name: 'Kombucha - Ginger Lemon', description: 'Fermented tea with live cultures, ginger zing, and fresh lemon.', price: 129, mrp: 160, persona: ['genz', 'millennial'], nutrition: { protein: 0, fiber: 0, calories: 40, carbs: 8, fat: 0 }, tags: ['Probiotic', 'Trending'], rating: 4.6, reviewCount: 134, isVegetarian: true, isVegan: true, isGlutenFree: true, allergens: [], ingredients: ['Kombucha', 'Ginger', 'Lemon', 'Live cultures'] },
  { id: '44', name: 'Sattu Sharbat', description: 'Bihar\'s power drink - roasted gram flour with lemon and black salt.', price: 59, mrp: 80, persona: ['boomer', 'millennial'], nutrition: { protein: 10, fiber: 3, calories: 120, carbs: 18, fat: 2 }, tags: ['Protein Rich', 'Traditional'], rating: 4.5, reviewCount: 234, isVegetarian: true, isVegan: true, isGlutenFree: true, allergens: [], ingredients: ['Sattu', 'Lemon', 'Black salt', 'Cumin'] },
  { id: '45', name: 'Ragi Malt', description: 'Warm ragi porridge drink with jaggery and cardamom.', price: 69, mrp: 90, persona: ['boomer'], nutrition: { protein: 6, fiber: 4, calories: 160, carbs: 30, fat: 2 }, tags: ['Iron Rich', 'Calcium'], rating: 4.3, reviewCount: 178, isVegetarian: true, isGlutenFree: true, allergens: ['Dairy'], ingredients: ['Ragi flour', 'Jaggery', 'Cardamom', 'Milk'] },
  // Pancakes & Sweet (46-65)
  { id: '46', name: 'Banana Oat Pancakes', description: 'Fluffy oat pancakes with caramelized banana and maple syrup.', price: 119, mrp: 150, persona: ['genz', 'indulge'], nutrition: { protein: 8, fiber: 4, calories: 310, carbs: 42, fat: 12 }, tags: ['Indulgent', 'Whole Grain'], rating: 4.6, reviewCount: 245, isVegetarian: true, allergens: ['Gluten', 'Dairy'], ingredients: ['Oat flour', 'Banana', 'Eggs', 'Maple syrup', 'Butter'] },
  { id: '47', name: 'Blueberry Protein Pancakes', description: 'Protein-fortified pancakes studded with fresh blueberries.', price: 149, mrp: 190, persona: ['millennial'], nutrition: { protein: 22, fiber: 3, calories: 340, carbs: 35, fat: 10 }, tags: ['High Protein', 'Fresh'], rating: 4.5, reviewCount: 167, isVegetarian: true, allergens: ['Gluten', 'Dairy', 'Eggs'], ingredients: ['Protein blend', 'Blueberries', 'Oats', 'Egg whites', 'Vanilla'] },
  { id: '48', name: 'Red Velvet Pancakes', description: 'Stunning red velvet pancakes with cream cheese frosting.', price: 159, mrp: 200, persona: ['genz', 'indulge'], nutrition: { protein: 8, fiber: 2, calories: 380, carbs: 48, fat: 16 }, tags: ['Instagram Worthy', 'Indulgent'], rating: 4.8, reviewCount: 203, isVegetarian: true, allergens: ['Gluten', 'Dairy', 'Eggs'], ingredients: ['Flour', 'Cocoa', 'Beetroot', 'Cream cheese', 'Vanilla'] },
  { id: '49', name: 'Peanut Butter Banana Toast', description: 'Multigrain toast with crunchy PB, banana slices, and chia seeds.', price: 109, mrp: 140, persona: ['millennial', 'indulge'], nutrition: { protein: 12, fiber: 5, calories: 320, carbs: 35, fat: 16 }, tags: ['Energy', 'Quick'], rating: 4.5, reviewCount: 278, isVegetarian: true, isVegan: true, allergens: ['Peanuts', 'Gluten'], ingredients: ['Multigrain bread', 'Peanut butter', 'Banana', 'Chia seeds'] },
  { id: '50', name: 'French Toast Sticks', description: 'Cinnamon French toast fingers with mixed berry compote.', price: 129, mrp: 160, persona: ['indulge', 'genz'], nutrition: { protein: 10, fiber: 2, calories: 350, carbs: 40, fat: 16 }, tags: ['Indulgent', 'Fun'], rating: 4.7, reviewCount: 189, isVegetarian: true, allergens: ['Gluten', 'Dairy', 'Eggs'], ingredients: ['Brioche bread', 'Eggs', 'Cinnamon', 'Mixed berries', 'Cream'] },
  { id: '51', name: 'Moong Dal Cheela', description: 'Savory moong lentil crepes with spiced potato filling.', price: 89, mrp: 110, persona: ['boomer', 'millennial'], nutrition: { protein: 14, fiber: 4, calories: 240, carbs: 30, fat: 8 }, tags: ['High Protein', 'Traditional'], rating: 4.5, reviewCount: 345, isVegetarian: true, isVegan: true, isGlutenFree: true, allergens: [], ingredients: ['Moong dal', 'Potato', 'Cumin', 'Green chili', 'Coriander'] },
  { id: '52', name: 'Besan Cheela', description: 'Gram flour crepe with onion, tomato, and green chili.', price: 79, mrp: 100, persona: ['boomer'], nutrition: { protein: 12, fiber: 3, calories: 220, carbs: 25, fat: 8 }, tags: ['Traditional', 'Quick'], rating: 4.4, reviewCount: 412, isVegetarian: true, isVegan: true, isGlutenFree: true, allergens: [], ingredients: ['Besan', 'Onion', 'Tomato', 'Green chili', 'Coriander'] },
  { id: '53', name: 'Stuffed Paratha', description: 'Aloo or gobhi stuffed paratha with curd and pickle.', price: 89, mrp: 110, persona: ['boomer', 'indulge'], nutrition: { protein: 8, fiber: 3, calories: 320, carbs: 42, fat: 14 }, tags: ['Classic', 'Filling'], rating: 4.7, reviewCount: 567, isVegetarian: true, allergens: ['Gluten', 'Dairy'], ingredients: ['Whole wheat flour', 'Potato/Cauliflower', 'Butter', 'Curd', 'Pickle'] },
  { id: '54', name: 'Nutella Crepes', description: 'Thin crepes filled with Nutella, strawberries, and powdered sugar.', price: 169, mrp: 210, persona: ['indulge', 'genz'], nutrition: { protein: 6, fiber: 2, calories: 420, carbs: 55, fat: 20 }, tags: ['Indulgent', 'Dessert'], rating: 4.8, reviewCount: 234, isVegetarian: true, allergens: ['Gluten', 'Dairy', 'Nuts', 'Eggs'], ingredients: ['Crepe batter', 'Nutella', 'Strawberries', 'Powdered sugar'] },
  { id: '55', name: 'Dosa - Masala', description: 'Crispy South Indian dosa with spiced potato filling and coconut chutney.', price: 99, mrp: 130, persona: ['boomer'], nutrition: { protein: 8, fiber: 3, calories: 280, carbs: 42, fat: 10 }, tags: ['Classic', 'South Indian'], rating: 4.6, reviewCount: 678, isVegetarian: true, isVegan: true, isGlutenFree: true, allergens: [], ingredients: ['Rice batter', 'Urad dal', 'Potato', 'Coconut chutney', 'Sambar'] },
  // Salads & Light (56-75)
  { id: '56', name: 'Greek Protein Salad', description: 'Chickpeas, feta, cucumber, olives, and red onion with lemon dressing.', price: 149, mrp: 190, persona: ['millennial', 'genz'], nutrition: { protein: 14, fiber: 6, calories: 280, carbs: 25, fat: 16 }, tags: ['Mediterranean', 'Protein Rich'], rating: 4.5, reviewCount: 156, isVegetarian: true, isGlutenFree: true, allergens: ['Dairy'], ingredients: ['Chickpeas', 'Feta', 'Cucumber', 'Olives', 'Red onion', 'Lemon'] },
  { id: '57', name: 'Kale Caesar Salad', description: 'Crispy kale with parmesan, croutons, and creamy caesar dressing.', price: 159, mrp: 200, persona: ['genz', 'millennial'], nutrition: { protein: 10, fiber: 4, calories: 260, carbs: 20, fat: 18 }, tags: ['Trending', 'Crunchy'], rating: 4.4, reviewCount: 98, isVegetarian: true, allergens: ['Dairy', 'Gluten'], ingredients: ['Kale', 'Parmesan', 'Croutons', 'Caesar dressing'] },
  { id: '58', name: 'Sprout Salad Bowl', description: 'Mixed sprouts with veggies, pomegranate, and tangy dressing.', price: 99, mrp: 120, persona: ['boomer', 'millennial'], nutrition: { protein: 14, fiber: 8, calories: 200, carbs: 22, fat: 6 }, tags: ['High Protein', 'Raw'], rating: 4.5, reviewCount: 234, isVegetarian: true, isVegan: true, isGlutenFree: true, allergens: [], ingredients: ['Mixed sprouts', 'Pomegranate', 'Cucumber', 'Onion', 'Lemon dressing'] },
  { id: '59', name: 'Thai Peanut Salad', description: 'Crunchy cabbage, carrot, edamame with spicy peanut dressing.', price: 139, mrp: 170, persona: ['genz'], nutrition: { protein: 12, fiber: 5, calories: 270, carbs: 22, fat: 16 }, tags: ['Asian Fusion', 'Crunchy'], rating: 4.6, reviewCount: 112, isVegetarian: true, isVegan: true, isGlutenFree: true, allergens: ['Peanuts', 'Soy'], ingredients: ['Cabbage', 'Carrot', 'Edamame', 'Peanut dressing', 'Sesame'] },
  { id: '60', name: 'Fruit & Nut Plate', description: 'Seasonal fresh fruits with mixed dry fruits and honey drizzle.', price: 129, mrp: 160, persona: ['genz', 'indulge'], nutrition: { protein: 6, fiber: 5, calories: 280, carbs: 42, fat: 12 }, tags: ['Fresh', 'Natural'], rating: 4.7, reviewCount: 189, isVegetarian: true, isGlutenFree: true, allergens: ['Nuts'], ingredients: ['Seasonal fruits', 'Almonds', 'Cashews', 'Walnuts', 'Honey'] },
  // Snacks (61-80)
  { id: '61', name: 'Idli Sambar', description: 'Soft steamed rice cakes with sambar and coconut chutney.', price: 79, mrp: 100, persona: ['boomer'], nutrition: { protein: 6, fiber: 3, calories: 200, carbs: 38, fat: 4 }, tags: ['South Indian', 'Light'], rating: 4.5, reviewCount: 456, isVegetarian: true, isVegan: true, isGlutenFree: true, allergens: [], ingredients: ['Rice', 'Urad dal', 'Sambar', 'Coconut chutney'] },
  { id: '62', name: 'Dhokla', description: 'Steamed gram flour cake with mustard tempering and green chutney.', price: 69, mrp: 90, persona: ['boomer'], nutrition: { protein: 8, fiber: 2, calories: 180, carbs: 28, fat: 4 }, tags: ['Gujarati', 'Light'], rating: 4.6, reviewCount: 345, isVegetarian: true, isVegan: true, isGlutenFree: true, allergens: [], ingredients: ['Gram flour', 'Mustard seeds', 'Curry leaves', 'Green chutney'] },
  { id: '63', name: 'Protein Energy Balls', description: '6 bites of oats, dates, peanut butter, and protein powder.', price: 99, mrp: 130, persona: ['millennial', 'genz'], nutrition: { protein: 16, fiber: 4, calories: 260, carbs: 28, fat: 12 }, tags: ['Snack', 'Protein Rich'], rating: 4.4, reviewCount: 178, isVegetarian: true, isGlutenFree: true, allergens: ['Peanuts', 'Dairy'], ingredients: ['Oats', 'Dates', 'Peanut butter', 'Protein powder', 'Cocoa'] },
  { id: '64', name: 'Khandvi', description: 'Delicate gram flour rolls with coconut and mustard tempering.', price: 79, mrp: 100, persona: ['boomer'], nutrition: { protein: 6, fiber: 2, calories: 160, carbs: 22, fat: 6 }, tags: ['Gujarati', 'Delicate'], rating: 4.5, reviewCount: 234, isVegetarian: true, isGlutenFree: true, allergens: ['Dairy'], ingredients: ['Gram flour', 'Buttermilk', 'Coconut', 'Mustard seeds'] },
  { id: '65', name: 'Makhana Trail Mix', description: 'Roasted foxnuts with almonds, pumpkin seeds, and dark chocolate.', price: 99, mrp: 120, persona: ['millennial', 'genz'], nutrition: { protein: 8, fiber: 3, calories: 220, carbs: 22, fat: 14 }, tags: ['Snack', 'Superfood'], rating: 4.6, reviewCount: 156, isVegetarian: true, isGlutenFree: true, allergens: ['Nuts'], ingredients: ['Makhana', 'Almonds', 'Pumpkin seeds', 'Dark chocolate'] },
  // More items (66-100)
  { id: '66', name: 'Oats Dosa', description: 'Thin crispy dosa made with oats and moong dal batter.', price: 89, mrp: 110, persona: ['boomer', 'millennial'], nutrition: { protein: 10, fiber: 5, calories: 230, carbs: 32, fat: 6 }, tags: ['Healthy', 'Fusion'], rating: 4.4, reviewCount: 198, isVegetarian: true, isVegan: true, allergens: ['Gluten'], ingredients: ['Oats', 'Moong dal', 'Onion', 'Chutney'] },
  { id: '67', name: 'Ragi Uttapam', description: 'Thick ragi pancake topped with onion, tomato, and bell pepper.', price: 89, mrp: 110, persona: ['boomer'], nutrition: { protein: 8, fiber: 5, calories: 240, carbs: 35, fat: 7 }, tags: ['Iron Rich', 'Traditional'], rating: 4.3, reviewCount: 167, isVegetarian: true, isVegan: true, isGlutenFree: true, allergens: [], ingredients: ['Ragi flour', 'Onion', 'Tomato', 'Bell pepper'] },
  { id: '68', name: 'Avocado Egg Toast', description: 'Sourdough with smashed avocado, soft-boiled egg, and chili flakes.', price: 179, mrp: 220, persona: ['genz', 'millennial'], nutrition: { protein: 14, fiber: 6, calories: 360, carbs: 28, fat: 22 }, tags: ['Trending', 'Protein Rich'], rating: 4.7, reviewCount: 234, isVegetarian: false, allergens: ['Gluten', 'Eggs'], ingredients: ['Sourdough', 'Avocado', 'Egg', 'Chili flakes'] },
  { id: '69', name: 'Masala Omelette', description: 'Fluffy 3-egg omelette with onion, tomato, green chili.', price: 89, mrp: 110, persona: ['boomer', 'millennial'], nutrition: { protein: 20, fiber: 1, calories: 260, carbs: 4, fat: 18 }, tags: ['High Protein', 'Classic'], rating: 4.5, reviewCount: 456, isVegetarian: false, isGlutenFree: true, allergens: ['Eggs'], ingredients: ['Eggs', 'Onion', 'Tomato', 'Green chili', 'Butter'] },
  { id: '70', name: 'Pav Bhaji', description: 'Buttery mixed veg mash with toasted pav buns.', price: 109, mrp: 140, persona: ['indulge', 'boomer'], nutrition: { protein: 8, fiber: 4, calories: 380, carbs: 48, fat: 18 }, tags: ['Street Food', 'Comfort'], rating: 4.7, reviewCount: 567, isVegetarian: true, allergens: ['Gluten', 'Dairy'], ingredients: ['Mixed vegetables', 'Pav', 'Butter', 'Spices'] },
  { id: '71', name: 'Aloo Tikki', description: 'Crispy spiced potato patties with tamarind and mint chutney.', price: 79, mrp: 100, persona: ['boomer', 'indulge'], nutrition: { protein: 4, fiber: 3, calories: 280, carbs: 38, fat: 12 }, tags: ['Street Food', 'Crispy'], rating: 4.5, reviewCount: 389, isVegetarian: true, isVegan: true, isGlutenFree: true, allergens: [], ingredients: ['Potato', 'Spices', 'Tamarind chutney', 'Mint chutney'] },
  { id: '72', name: 'Protein Dosa', description: 'Lentil-rich dosa with whey protein added to the batter.', price: 109, mrp: 140, persona: ['millennial'], nutrition: { protein: 22, fiber: 4, calories: 270, carbs: 30, fat: 8 }, tags: ['High Protein', 'Innovative'], rating: 4.4, reviewCount: 145, isVegetarian: true, isGlutenFree: true, allergens: ['Dairy'], ingredients: ['Rice', 'Lentils', 'Whey protein', 'Coconut chutney'] },
  { id: '73', name: 'Pesto Paneer Sandwich', description: 'Grilled paneer with basil pesto on sourdough bread.', price: 139, mrp: 180, persona: ['genz', 'millennial'], nutrition: { protein: 16, fiber: 3, calories: 340, carbs: 28, fat: 18 }, tags: ['Fusion', 'Gourmet'], rating: 4.5, reviewCount: 198, isVegetarian: true, allergens: ['Dairy', 'Gluten', 'Nuts'], ingredients: ['Paneer', 'Basil pesto', 'Sourdough', 'Mozzarella'] },
  { id: '74', name: 'Shakshuka', description: 'Eggs poached in spiced tomato sauce with herbs.', price: 149, mrp: 190, persona: ['genz', 'millennial'], nutrition: { protein: 16, fiber: 4, calories: 280, carbs: 18, fat: 16 }, tags: ['Mediterranean', 'Trending'], rating: 4.6, reviewCount: 123, isVegetarian: false, isGlutenFree: true, allergens: ['Eggs'], ingredients: ['Eggs', 'Tomato', 'Bell pepper', 'Onion', 'Cumin', 'Feta'] },
  { id: '75', name: 'Vegan Buddha Bowl', description: 'Brown rice, roasted chickpeas, avocado, sweet potato, and tahini.', price: 179, mrp: 220, persona: ['genz', 'millennial'], nutrition: { protein: 14, fiber: 10, calories: 400, carbs: 52, fat: 16 }, tags: ['Vegan', 'Complete'], rating: 4.7, reviewCount: 167, isVegetarian: true, isVegan: true, isGlutenFree: true, allergens: ['Sesame'], ingredients: ['Brown rice', 'Chickpeas', 'Avocado', 'Sweet potato', 'Tahini'] },
  { id: '76', name: 'Chole Kulche', description: 'Spiced chickpea curry with soft kulcha bread.', price: 99, mrp: 120, persona: ['boomer', 'indulge'], nutrition: { protein: 12, fiber: 6, calories: 340, carbs: 46, fat: 12 }, tags: ['North Indian', 'Classic'], rating: 4.6, reviewCount: 456, isVegetarian: true, isVegan: true, allergens: ['Gluten'], ingredients: ['Chickpeas', 'Kulcha', 'Onion', 'Spices'] },
  { id: '77', name: 'Granola Bar Pack', description: 'Pack of 3 house-made granola bars — oats, nuts, and seeds.', price: 89, mrp: 110, persona: ['millennial', 'genz'], nutrition: { protein: 10, fiber: 6, calories: 280, carbs: 32, fat: 14 }, tags: ['On-the-Go', 'Snack'], rating: 4.3, reviewCount: 234, isVegetarian: true, allergens: ['Nuts', 'Gluten'], ingredients: ['Oats', 'Mixed nuts', 'Seeds', 'Honey', 'Dark chocolate'] },
  { id: '78', name: 'Spinach Corn Sandwich', description: 'Grilled sandwich with creamy spinach-corn filling and cheese.', price: 109, mrp: 140, persona: ['indulge'], nutrition: { protein: 10, fiber: 3, calories: 310, carbs: 32, fat: 16 }, tags: ['Comfort', 'Cheesy'], rating: 4.5, reviewCount: 289, isVegetarian: true, allergens: ['Dairy', 'Gluten'], ingredients: ['Bread', 'Spinach', 'Corn', 'Cheese', 'Butter'] },
  { id: '79', name: 'Matcha Energy Bites', description: 'No-bake bites with matcha, white chocolate, and cashews.', price: 109, mrp: 140, persona: ['genz'], nutrition: { protein: 6, fiber: 2, calories: 200, carbs: 24, fat: 10 }, tags: ['Trending', 'Energy'], rating: 4.5, reviewCount: 98, isVegetarian: true, isGlutenFree: true, allergens: ['Nuts', 'Dairy'], ingredients: ['Matcha', 'White chocolate', 'Cashews', 'Oats'] },
  { id: '80', name: 'Vada Pav', description: 'Mumbai street classic — spiced potato fritter in a soft pav.', price: 69, mrp: 90, persona: ['boomer', 'indulge'], nutrition: { protein: 6, fiber: 3, calories: 320, carbs: 42, fat: 14 }, tags: ['Street Food', 'Iconic'], rating: 4.8, reviewCount: 678, isVegetarian: true, isVegan: true, allergens: ['Gluten'], ingredients: ['Potato', 'Gram flour', 'Pav', 'Garlic chutney', 'Green chili'] },
];

// Generate remaining items dynamically
const generateMoreItems = (): Partial<MenuItem>[] => {
  const names = [
    'Amaranth Porridge', 'Bajra Roti Bowl', 'Black Rice Bowl', 'Buckwheat Pancakes', 'Carrot Cake Oats',
    'Coconut Chia Bowl', 'Corn Chaat', 'Date Energy Smoothie', 'Egg Fried Rice', 'Fig & Walnut Yogurt',
    'Flaxseed Roti Wrap', 'Ginger Snap Smoothie', 'Green Moong Soup', 'Hemp Seed Bowl', 'Jackfruit Wrap',
    'Jowar Dosa', 'Kefir Smoothie Bowl', 'Lemon Rice Bowl', 'Masoor Dal Cheela', 'Mixed Millet Upma',
    'Nachni Porridge', 'Oats Upma', 'Palak Paneer Wrap', 'Pearl Millet Dosa', 'Quinoa Idli',
    'Ragi Puttu', 'Sabudana Vada', 'Sweet Potato Hash', 'Thandai Smoothie', 'Til Chikki Bar',
    'Tomato Soup Bowl', 'Turmeric Scramble', 'Urad Dal Vada', 'Veggie Frittata', 'Watermelon Juice',
    'Wheat Grass Shot', 'Zucchini Fritters', 'Almond Butter Toast', 'Banana Walnut Bread', 'Caramel Apple Bowl',
    'Cinnamon Roll Oats', 'Coconut Pancakes', 'Dark Choc Protein Bar', 'Egg Muffin Cup', 'Fennel Tea',
    'Golden Milk Bowl', 'Green Goddess Bowl', 'Hazelnut Latte', 'Immunity Shot', 'Jaggery Oats',
    'Kale Smoothie', 'Lavender Latte', 'Mango Chia Bowl', 'Mint Cooler', 'Mulberry Smoothie',
    'Neem Honey Toast', 'Orange Zest Pancake', 'Papaya Smoothie Bowl', 'Pumpkin Spice Latte', 'Quinoa Kheer',
    'Raita Bowl', 'Saffron Almond Milk', 'Sesame Ladoo Pack', 'Sprouted Ragi Ball', 'Tamarind Rice',
    'Tomato Basil Toast', 'Tropical Fruit Bowl', 'Turmeric Hummus Toast', 'Vanilla Chia Pudding', 'Walnut Date Shake',
    'Mixed Fruit Juice', 'Overnight Muesli', 'Paneer Paratha Roll', 'Vegetable Uttapam', 'Aloo Poha',
    'Banana Smoothie', 'Charcoal Latte', 'Dal Paratha', 'Egg Salad Bowl', 'Fruit Smoothie Bowl',
    'Garam Masala Eggs', 'Honey Oat Latte', 'Italian Herb Toast', 'Jamun Smoothie', 'Khakhra Pack',
    'Lentil Soup Bowl', 'Mango Oat Smoothie', 'Nut Butter Banana Wrap', 'Oat Milk Cappuccino', 'Pineapple Mint Juice',
    'Quinoa Vegetable Bowl', 'Roasted Makhana Pack', 'Spinach Egg Muffin', 'Tangy Sprout Salad', 'Uthappam Trio',
    'Vegan Protein Shake', 'Whole Wheat Pizza Slice', 'Yogurt Berry Bowl', 'Zesty Lemon Drink', 'Aloe Vera Juice',
    'Broccoli Cheddar Bowl', 'Cottage Cheese Bowl', 'Detox Water', 'Energy Granola Cup', 'Frozen Acai Pop',
    'Ginger Turmeric Shot', 'Herbal Green Tea', 'Indian Masala Toast', 'Jackfruit Smoothie', 'Kokum Sharbat',
    'Litchi Cooler', 'Millet Pongal', 'Nutri Bar Pack', 'Oat Cookie Pack', 'Peanut Chaat',
    'Quinoa Upma', 'Rose Lassi', 'Seed Cracker Pack', 'Tofu Scramble Bowl', 'Uttapam Mini Pack',
    'Veggie Juice Shot', 'Whole Grain Muffin', 'Yogurt Parfait Cup', 'Basil Seed Drink', 'Cacao Smoothie Bowl',
  ];

  const personaOptions: ('boomer' | 'millennial' | 'genz' | 'indulge')[][] = [
    ['boomer'], ['millennial'], ['genz'], ['indulge'],
    ['boomer', 'millennial'], ['millennial', 'genz'], ['genz', 'indulge'], ['boomer', 'indulge'],
  ];

  const tagOptions = [
    ['High Protein', 'Gut Friendly'], ['Trending', 'Fresh'], ['Traditional', 'Comfort'],
    ['Superfood', 'Energy'], ['Iron Rich', 'Calcium'], ['Vegan', 'Low Cal'],
    ['Fiber Rich', 'Wholesome'], ['Antioxidant', 'Refreshing'], ['Probiotic', 'Digestive'],
    ['Indulgent', 'Popular'], ['On-the-Go', 'Quick'], ['Mediterranean', 'Fusion'],
  ];

  return names.map((name, i) => {
    const id = String(81 + i);
    const price = [49, 59, 69, 79, 89, 99, 109, 119, 129, 139, 149, 159, 169, 179][Math.floor(Math.random() * 14)];
    const protein = Math.floor(Math.random() * 25) + 3;
    return {
      id,
      name,
      description: `Freshly prepared ${name.toLowerCase()} with wholesome ingredients for a nutritious morning.`,
      price,
      mrp: Math.round(price * 1.3),
      persona: personaOptions[i % personaOptions.length],
      nutrition: {
        protein,
        fiber: Math.floor(Math.random() * 10) + 1,
        calories: Math.floor(Math.random() * 300) + 100,
        carbs: Math.floor(Math.random() * 40) + 10,
        fat: Math.floor(Math.random() * 18) + 2,
      },
      tags: tagOptions[i % tagOptions.length],
      rating: Number((4 + Math.random() * 0.9).toFixed(1)),
      reviewCount: Math.floor(Math.random() * 500) + 50,
      isVegetarian: Math.random() > 0.15,
      isVegan: Math.random() > 0.6,
      isGlutenFree: Math.random() > 0.5,
      allergens: [],
      ingredients: ['Ingredient 1', 'Ingredient 2', 'Ingredient 3', 'Ingredient 4'],
      image: '',
    };
  });
};

export const extendedMenuItems: MenuItem[] = [
  ...baseItems.map(item => ({
    image: '',
    allergens: [],
    ingredients: [],
    isVegan: false,
    isGlutenFree: false,
    ...item,
  } as MenuItem)),
  ...generateMoreItems().map(item => ({
    image: '',
    allergens: [],
    ingredients: [],
    isVegan: false,
    isGlutenFree: false,
    ...item,
  } as MenuItem)),
];

export const menuCategories = [
  { id: 'all', label: 'All', emoji: '🍽️' },
  { id: 'bowls', label: 'Bowls', emoji: '🥣' },
  { id: 'wraps', label: 'Wraps', emoji: '🌯' },
  { id: 'drinks', label: 'Drinks', emoji: '🥤' },
  { id: 'pancakes', label: 'Pancakes & Sweet', emoji: '🥞' },
  { id: 'salads', label: 'Salads', emoji: '🥗' },
  { id: 'snacks', label: 'Snacks', emoji: '🍿' },
  { id: 'south-indian', label: 'South Indian', emoji: '🫓' },
  { id: 'street-food', label: 'Street Food', emoji: '🛒' },
];

export function getCategoryForItem(id: string): string {
  const n = parseInt(id);
  if (n <= 8) return 'bowls';
  if (n <= 20) return 'bowls';
  if (n <= 30) return 'wraps';
  if (n <= 45) return 'drinks';
  if (n <= 55) return 'pancakes';
  if (n <= 60) return 'salads';
  if (n <= 80) return 'snacks';
  return ['bowls', 'wraps', 'drinks', 'pancakes', 'salads', 'snacks'][Math.floor(Math.random() * 6)];
}
