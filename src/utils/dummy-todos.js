import { format } from 'date-fns';

import coursework from '../assets/category-image/🎓.svg';
import workout from '../assets/category-image/💪.svg';
import codingWeb from '../assets/category-image/💻.svg';
import plant from '../assets/category-image/🪴.svg';
import listAugust from '../assets/category-image/📆.svg';

const date = format(new Date(), 'yyyy-MM-dd');

export const todoData = [
  {
    id: 1,
    title: 'eat',
    message: 'Eat in the morning',
    date: date,
    isCompleted: false,
    category: null,
  },
  {
    id: 2,
    title: 'sleep',
    message: 'Sleep at night',
    date: date,
    isCompleted: false,
    category: null,
  },
  {
    id: 3,
    title: 'learning',
    message: 'Learning in school',
    date: date,
    isCompleted: false,
    category: null,
  },
];

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
