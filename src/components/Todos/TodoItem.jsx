import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import moment from 'moment';

import { useTodos } from 'hooks/useStoreContext';
import useHttp from 'hooks/useHttp';
import errorQuery from 'utils/errorQuery';

import {
  MdDeleteForever,
  MdAccessTime,
  MdModeEdit,
  MdDone,
} from 'react-icons/md';

const TodoItem = ({
  id,
  title,
  description,
  deadline,
  category,
  is_completed,
  onTodoEdit,
  onSetShowModal,
  dashboardSkipPaginate,
  dashboardPageSize,
  dashboardSortTodos,
  dashboardSearchTodos,
  dashboardTodoStatus,
  categoriesDetailsCategoryId,
  categoriesDetailsSkipPaginate,
  categoriesDetailsPageSize,
  categoriesDetailsSearchValue,
  categoriesDetailsStatus,
  // categoriesDetailsSort,
}) => {
  const { editTodo } = useTodos();
  const queryClient = useQueryClient();
  const { requestHttp } = useHttp();

  const { pathname } = useLocation();

  const newDate = moment(deadline).locale('id').format('LLL');
  const formattedDate = moment(deadline).endOf().fromNow();

  const { mutate: mutateTodoCompleted } = useMutation({
    mutationFn: (completedData) => {
      return requestHttp({
        method: 'PUT',
        url: `/todos/${id}`,
        data: completedData,
      });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      queryClient.invalidateQueries({ queryKey: ['categories-todos'] });
      queryClient.invalidateQueries({ queryKey: ['total-todos'] });
      toast.success(data?.data.message);
    },
    onError: (error) => {
      errorQuery(error, 'Change Todo Completed Failed!');
    },
  });

  const { mutate: mutateTodoDelete } = useMutation({
    mutationFn: () => {
      return requestHttp({
        method: 'DELETE',
        url: `/todos/${id}`,
      });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      queryClient.invalidateQueries({ queryKey: ['categories-todos'] });
      queryClient.invalidateQueries({ queryKey: ['total-todos'] });
      toast.success(data?.data.message);
    },
    onError: (error) => {
      errorQuery(error, 'Delete Todo Failed!');
    },
  });

  const todoCompletedHandler = () => {
    let completedTodo;
    const todos =
      queryClient.getQueryData([
        'todos',
        dashboardSkipPaginate,
        dashboardPageSize,
        dashboardSortTodos,
        dashboardSearchTodos,
        dashboardTodoStatus,
      ])?.data.data.rows ||
      queryClient.getQueryData([
        'categories-todos',
        categoriesDetailsCategoryId,
        categoriesDetailsSkipPaginate,
        categoriesDetailsPageSize,
        categoriesDetailsSearchValue,
        categoriesDetailsStatus,
        // categoriesDetailsSort,
      ])?.data.data.rows;

    todos?.map((todo) => {
      if (todo.id === id) {
        completedTodo = {
          ...todo,
          is_completed: !is_completed,
        };
      }
      return completedTodo;
    });

    mutateTodoCompleted(completedTodo);
  };

  const todoDeleteHandler = () => {
    mutateTodoDelete();
  };

  const todoEditHandler = () => {
    onSetShowModal(true);
    editTodo(onTodoEdit);
  };

  return (
    <div className="flex w-full flex-row justify-between shadow-md">
      <div
        className={`flex w-full flex-col gap-y-4 rounded-lg bg-material-green p-3 ring-2 dark:bg-neutral-700 ${
          is_completed ? 'ring-green-500' : 'ring-blue-500'
        }`}
      >
        <div className="flex flex-row items-center justify-between gap-x-4 ">
          <h2 className="text-md max-h-12 truncate font-semibold dark:text-material-green">
            {title}
          </h2>
          {category?.name && pathname === '/dashboard' && (
            <p className="flex flex-col items-center justify-center whitespace-nowrap text-xs text-neutral-800 dark:text-material-green sm:text-sm">
              <span className="text-[.5rem] font-semibold sm:text-[.6rem]">
                Category
              </span>
              {category.name}
            </p>
          )}
        </div>

        <p className="max-h-24 overflow-y-auto break-words text-sm dark:text-material-green">
          {description}
        </p>
        <div className="flex flex-row items-center justify-between gap-x-4">
          <div className="flex items-center justify-center gap-x-1 dark:text-material-green">
            <MdAccessTime className="text-lg" />
            <span className="text-[.65rem]">
              {newDate} - {formattedDate}
            </span>
          </div>
          <div className="flex items-center gap-x-3 text-3xl">
            <button onClick={todoEditHandler} type="button">
              <MdModeEdit className="text-lg text-slate-700 dark:text-material-green" />
            </button>
            <button onClick={todoDeleteHandler} type="button">
              <MdDeleteForever className="text-xl text-red-500" />
            </button>
            <button onClick={todoCompletedHandler} type="button">
              <MdDone
                className={`rounded-md text-lg ${
                  is_completed
                    ? 'bg-green-400 text-slate-700'
                    : 'bg-neutral-400 text-slate-500'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
