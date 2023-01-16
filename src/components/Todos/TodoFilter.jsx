import { ReactComponent as Spinner } from 'assets/icons/uil_spinner-alt.svg';
import { ReactComponent as Check } from 'assets/icons/uil_check.svg';

const TodoFilter = ({ setTodoStatus, todoStatus }) => {
  const viewTodosCompletedHandler = () => {
    setTodoStatus(false);
  };

  const viewTodosNotCompletedHandler = () => {
    setTodoStatus(true);
  };

  return (
    <section className="flex gap-x-1">
      <button
        className={`flex items-center justify-center gap-x-1 rounded-md p-1 text-xs disabled:cursor-not-allowed ${
          todoStatus ? 'bg-neutral-300' : 'bg-blue-10'
        }`}
        onClick={viewTodosCompletedHandler}
        disabled={todoStatus ? false : true}
      >
        <Spinner className="w-3" fill="#6599FE" />
        <span
          className={`${todoStatus ? 'text-neutral-500' : 'text-blue-100'}`}
        >
          In Progress
        </span>
      </button>
      <button
        className={`flex items-center justify-center gap-x-1 rounded-md p-1 text-xs disabled:cursor-not-allowed ${
          todoStatus ? 'bg-green-10' : 'bg-neutral-300'
        }`}
        onClick={viewTodosNotCompletedHandler}
        disabled={todoStatus ? true : false}
      >
        <Check className="w-3" fill="#5BE26A" />
        <span
          className={`${todoStatus ? 'text-green-100' : 'text-neutral-500'}`}
        >
          Done
        </span>
      </button>
    </section>
  );
};

export default TodoFilter;
