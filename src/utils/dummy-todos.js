// import { format } from 'date-fns';

import coursework from '../assets/category-image/🎓.svg';
import workout from '../assets/category-image/💪.svg';
import codingWeb from '../assets/category-image/💻.svg';
import plant from '../assets/category-image/🪴.svg';
import listAugust from '../assets/category-image/📆.svg';

// const date = format(new Date(), 'yyyy-MM-dd');

export const userData = {
  username: 'johnDoe',
  email: 'john@gmail.com',
  password: 'John1234',
};

export const categoryData = [
  {
    id: 1,
    name: 'Coursework',
    image: coursework,
  },
  {
    id: 2,
    name: 'Workout',
    image: workout,
  },
  {
    id: 3,
    name: 'Coding Web',
    image: codingWeb,
  },
  {
    id: 4,
    name: 'Plant',
    image: plant,
  },
  {
    id: 5,
    name: 'List August',
    image: listAugust,
  },
];
