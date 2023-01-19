import { ReactComponent as Spinner } from 'assets/icons/uil_spinner-alt.svg';
import { ReactComponent as Check } from 'assets/icons/uil_check.svg';
import { ReactComponent as Category } from 'assets/icons/uil_clipboard-notes.svg';

import inProgressImage from 'assets/images/In-progress-pana.webp';
import doneImage from 'assets/images/Done-rafiki.webp';
import categoryImage from 'assets/images/Todo-list-amico.webp';

const filterIconName = [
  {
    icon: Spinner,
    image: inProgressImage,
    name: 'In Progress',
    color: '#6599FE',
  },
  {
    icon: Check,
    image: doneImage,
    name: 'Done',
    color: '#5BE26A',
  },
  {
    icon: Category,
    image: categoryImage,
    name: 'Category',
    color: '#FF9D6F',
  },
];

export default filterIconName;
