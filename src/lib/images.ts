import { menuItems } from '@/data/mockData';
import foodMoong from '@/assets/food-moong.jpg';
import foodOats from '@/assets/food-oats.jpg';
import foodThepla from '@/assets/food-thepla.jpg';
import foodAcai from '@/assets/food-acai.jpg';
import foodEggwrap from '@/assets/food-eggwrap.jpg';
import foodPancakes from '@/assets/food-pancakes.jpg';
import foodLassi from '@/assets/food-lassi.jpg';
import foodAvocado from '@/assets/food-avocado.jpg';

export const foodImages: Record<string, string> = {
  '1': foodMoong,
  '2': foodOats,
  '3': foodThepla,
  '4': foodAcai,
  '5': foodEggwrap,
  '6': foodPancakes,
  '7': foodLassi,
  '8': foodAvocado,
};

export function getFoodImage(id: string): string {
  return foodImages[id] || foodMoong;
}
