import bee from '../assets/category-icons/bee.webp';
import cloud from '../assets/category-icons/cloud.webp';
import moon from '../assets/category-icons/moon.webp';
import mushroom from '../assets/category-icons/mushroom.webp';
import snow from '../assets/category-icons/snow.webp';
import sun from '../assets/category-icons/sun.webp';
import sunflower from '../assets/category-icons/sunflower.webp';
import tulip from '../assets/category-icons/tulip.webp';
import water from '../assets/category-icons/water.webp';
import world from '../assets/category-icons/world.webp';

const categoryIcons = [
  bee,
  cloud,
  moon,
  mushroom,
  snow,
  sun,
  sunflower,
  tulip,
  water,
  world,
];

export const randIcons = () => {
  return categoryIcons[Math.floor(Math.random() * categoryIcons.length)];
};
