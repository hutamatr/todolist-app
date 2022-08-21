import { ReactComponent as Spinner } from '../assets/icons/uil_spinner-alt.svg';
import { ReactComponent as Check } from '../assets/icons/uil_check.svg';
import { ReactComponent as Stopwatch } from '../assets/icons/uil_stopwatch.svg';

const filterIconName = [
  {
    icon: Spinner,
    name: 'In Progress',
    color: '#6599FE',
  },
  {
    icon: Check,
    name: 'Done',
    color: '#5BE26A',
  },
  {
    icon: Stopwatch,
    name: 'Overtime',
    color: '#FE6565',
  },
];

export default filterIconName;
