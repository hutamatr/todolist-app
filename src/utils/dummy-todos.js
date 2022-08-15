const date = new Date(new Date().toString().split('GMT')[0] + 'UTC')
  .toISOString()
  .split('.')[0];

export const todoData = [
  {
    id: 1,
    title: 'eat',
    message: 'Eat in the morning',
    date: date,
  },
  {
    id: 2,
    title: 'sleep',
    message: 'Sleep at night',
    date: date,
  },
  {
    id: 3,
    title: 'learning',
    message: 'Learning in school',
    date: date,
  },
];
