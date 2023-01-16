import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
import moment from 'moment';

import { useTodos } from 'hooks/useStoreContext';
import useHttp from 'hooks/useHttp';
import errorQuery from 'utils/errorQuery';

import { ReactComponent as Clock } from 'assets/icons/uil_clock.svg';
import { ReactComponent as Edit } from 'assets/icons/uil_edit-alt.svg';
import { ReactComponent as Trash } from 'assets/icons/uil_trash-alt.svg';
import { ReactComponent as Check } from 'assets/icons/uil_check.svg';

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
    <>
      <Toaster position="top-center" />
      <div className="flex rounded-lg shadow-md">
        <span
          className={`w-4 rounded-l-lg ${
            is_completed ? 'bg-green-100' : 'bg-blue-100'
          }`}
        ></span>
        <div className="relative flex w-full flex-col gap-y-3 rounded-r-lg bg-material-green p-3">
          {/* <img src={birdPic} alt="" className="absolute bottom-0 left-0 w-7" /> */}
          <div className="flex flex-row items-center justify-between gap-x-4">
            <h2 className="text-md max-h-12 break-all font-semibold">
              {title}
            </h2>
            {category?.name && pathname === '/dashboard' && (
              <p className="flex flex-col items-center justify-center text-xs text-neutral-800 sm:text-sm">
                <span className="text-[.6rem] font-semibold">Category</span>
                {category.name}
              </p>
            )}
          </div>

          <p className="max-h-24 overflow-auto break-words text-sm">
            {description}
          </p>
          <div className="flex flex-row items-center justify-between gap-x-4">
            <div className="flex items-center justify-center gap-x-1">
              <Clock className="w-4" fill="#707175" />
              <span className="text-[.65rem]">
                {newDate} - {formattedDate}
              </span>
            </div>
            <div className="flex items-center gap-x-3 text-3xl">
              <button onClick={todoEditHandler} type="button">
                <Edit className="w-4" fill="#707175" />
              </button>
              <button onClick={todoDeleteHandler} type="button">
                <Trash className="w-4" fill="#FE6565" />
              </button>
              <button onClick={todoCompletedHandler} type="button">
                <Check
                  className={`w-4 rounded-md ${
                    is_completed ? 'bg-green-100' : 'bg-neutral-400'
                  }`}
                  fill="#fff"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TodoItem;
