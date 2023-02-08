import { HiPuzzle, HiCheck, HiFolder } from 'react-icons/hi';

const inProgressImage =
  'https://0ms.run/mirrors/i.ibb.co/kcz7yHT/In-progress-pana.webp';
const doneImage = 'https://0ms.run/mirrors/i.ibb.co/Qp3Lhk2/Done-rafiki.webp';
const categoryImage =
  'https://0ms.run/mirrors/i.ibb.co/fv8dYJ3/Todo-list-amico.webp';

const homeImages = [
  {
    icon: HiPuzzle,
    image: inProgressImage,
    name: 'In Progress',
    color: '#6599FE',
  },
  {
    icon: HiCheck,
    image: doneImage,
    name: 'Done',
    color: '#5BE26A',
  },
  {
    icon: HiFolder,
    image: categoryImage,
    name: 'Category',
    color: '#FF9D6F',
  },
];

export default homeImages;
