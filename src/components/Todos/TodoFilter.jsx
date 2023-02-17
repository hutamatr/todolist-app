import { MdDone } from 'react-icons/md';
import { HiPuzzle } from 'react-icons/hi';

const TodoFilter = ({
  setTodoStatus,
  todoStatus,
  onSetCurrentPage,
  onSetSkipPaginate,
  totalTodoDone,
  totalInProgress,
}) => {
  const viewTodosCompletedHandler = () => {
    setTodoStatus(false);
    onSetCurrentPage(1);
    onSetSkipPaginate(0);
  };

  const viewTodosNotCompletedHandler = () => {
    setTodoStatus(true);
    onSetCurrentPage(1);
    onSetSkipPaginate(0);
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
        {totalInProgress > 0 && (
          <span
            data-testid="button-inprogress"
            className="absolute -top-2 -right-1 flex items-center justify-center rounded-full bg-orange-100 px-2 text-xs font-semibold text-material-green sm:-top-2"
          >
            {totalInProgress}
          </span>
        )}
        <HiPuzzle className="text-base text-blue-100" />
        <span className="text-blue-100">In Progress</span>
      </button>
      <button
        className={`relative flex items-center justify-center gap-x-1 rounded bg-green-10 p-1 text-xs disabled:cursor-not-allowed ${
          todoStatus ? 'ring-2 ring-green-100' : ''
        }`}
        onClick={viewTodosNotCompletedHandler}
        disabled={todoStatus ? true : false}
      >
        {totalTodoDone > 0 && (
          <span
            data-testid="button-done"
            className="absolute -top-2 -right-1 flex items-center justify-center rounded-full bg-orange-100 px-2 text-xs font-semibold text-material-green sm:-top-2"
          >
            {totalTodoDone}
          </span>
        )}
        <MdDone className="text-base text-green-100" />
        <span className="text-green-100">Done</span>
      </button>
    </section>
  );
};

export default TodoFilter;
