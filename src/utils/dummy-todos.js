import { format } from 'date-fns';

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
