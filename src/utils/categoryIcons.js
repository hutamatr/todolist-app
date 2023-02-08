const baseIconsURL = 'https://0ms.run/mirrors/';

const bee = `${baseIconsURL}i.ibb.co/swHFG37/bee.webp`;
const cloud = `${baseIconsURL}i.ibb.co/wYgnzN8/cloud.webp`;
const moon = `${baseIconsURL}i.ibb.co/YDy6P14/moon.webp`;
const mushroom = `${baseIconsURL}i.ibb.co/MG0h9gN/mushroom.webp`;
const snow = `${baseIconsURL}i.ibb.co/FJXCLRV/snow.webp`;
const sun = `${baseIconsURL}i.ibb.co/9bJNgBX/sun.webp`;
const sunflower = `${baseIconsURL}i.ibb.co/GRgDPVN/sunflower.webp`;
const tulip = `${baseIconsURL}i.ibb.co/6nq60MM/tulip.webp`;
const water = `${baseIconsURL}i.ibb.co/2Zkfv9s/water.webp`;
const world = `${baseIconsURL}i.ibb.co/hmZ47b4/world.webp`;

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
