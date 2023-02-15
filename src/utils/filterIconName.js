import { HiPuzzle, HiCheck, HiFolder } from 'react-icons/hi';

import inProgressImage from 'assets/images/In-progress-pana.webp';
import doneImage from 'assets/images/Done-rafiki.webp';
import categoryImage from 'assets/images/Todo-list-amico.webp';

const filterIconName = [
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

export default filterIconName;
