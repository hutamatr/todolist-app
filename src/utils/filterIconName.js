import { ReactComponent as Spinner } from 'assets/icons/uil_spinner-alt.svg';
import { ReactComponent as Check } from 'assets/icons/uil_check.svg';

import inProgressImage from 'assets/images/In-progress-pana.webp';
import doneImage from 'assets/images/Done-rafiki.webp';

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
];

export default filterIconName;
