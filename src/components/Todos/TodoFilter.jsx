import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';

import errorQuery from 'utils/errorQuery';
import useHttp from 'hooks/useHttp';

import { ReactComponent as Spinner } from 'assets/icons/uil_spinner-alt.svg';
import { ReactComponent as Check } from 'assets/icons/uil_check.svg';

const TodoFilter = ({ setTodoStatus, todoStatus }) => {
  const { requestHttp } = useHttp();
  const { pathname } = useLocation();

  const { data: totalTodoData } = useQuery({
    queryKey: ['total-todos'],
    queryFn: () => {
      return requestHttp({
        method: 'GET',
        url: '/home',
      });
    },
    onError: (error) => {
      errorQuery(error, 'Get Total Todos Failed!');
    },
  });

  const totalTodoDone = totalTodoData?.data.data.totalDone;
  const totalTodoInProgress = totalTodoData?.data.data.totalInProgress;

  const viewTodosCompletedHandler = () => {
    setTodoStatus(false);
  };

  const viewTodosNotCompletedHandler = () => {
    setTodoStatus(true);
  };

  return (
    <section className="flex gap-x-3">
      <button
        className={`relative flex items-center justify-center gap-x-1 rounded bg-blue-10 p-1 text-xs disabled:cursor-not-allowed ${
          todoStatus ? '' : 'ring-2 ring-blue-100'
        }`}
        onClick={viewTodosCompletedHandler}
        disabled={todoStatus ? false : true}
      >
        {pathname === '/dashboard' && totalTodoInProgress > 0 && (
          <span className="absolute -top-2 -right-1 flex items-center justify-center rounded-full bg-orange-100 px-2 text-xs font-semibold text-material-green sm:-top-2">
            {totalTodoInProgress}
          </span>
        )}
        <Spinner className="w-3" fill="#6599FE" />
        <span className="text-blue-100">In Progress</span>
      </button>
      <button
        className={`relative flex items-center justify-center gap-x-1 rounded bg-green-10 p-1 text-xs disabled:cursor-not-allowed ${
          todoStatus ? 'ring-2 ring-green-100' : ''
        }`}
        onClick={viewTodosNotCompletedHandler}
        disabled={todoStatus ? true : false}
      >
        {pathname === '/dashboard' && totalTodoDone > 0 && (
          <span className="absolute -top-2 -right-1 flex items-center justify-center rounded-full bg-orange-100 px-2 text-xs font-semibold text-material-green sm:-top-2">
            {totalTodoDone}
          </span>
        )}
        <Check className="w-3" fill="#5BE26A" />
        <span className="text-green-100">Done</span>
      </button>
    </section>
  );
};

export default TodoFilter;
