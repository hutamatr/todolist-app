import { useQueryClient } from '@tanstack/react-query';
import moment from 'moment';
import { toast } from 'react-hot-toast';

import { ReactComponent as Clock } from '../../assets/icons/uil_clock.svg';
import { ReactComponent as Edit } from '../../assets/icons/uil_edit-alt.svg';
import { ReactComponent as Trash } from '../../assets/icons/uil_trash-alt.svg';
import { ReactComponent as Check } from '../../assets/icons/uil_check.svg';

import { useTodos } from '../../hooks/useStoreContext';
import useMutationTodos from '../../hooks/useMutationTodos';

const DashboardCard = ({
  id,
  title,
  description,
  deadline,
  category,
  is_completed,
  onTodoEdit,
  onSetShowModal,
}) => {
  const { editTodo } = useTodos();
  const queryClient = useQueryClient();

  const newDate = moment(deadline).locale('id').format('LLL');
  const formattedDate = moment(deadline).endOf().fromNow();

  const { mutate: mutateTodoCompleted } = useMutationTodos(
    {
      method: 'PUT',
      url: `/todos/${id}`,
    },
    (data) => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      queryClient.invalidateQueries({ queryKey: ['categories-todos'] });
      toast.success(data?.data.message);
    },
    (error) => {
      toast.error(error);
    }
  );

  console.log(category.name);

  const { mutate: mutateTodoDelete } = useMutationTodos(
    {
      method: 'DELETE',
      url: `/todos/${id}`,
    },
    (data) => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      queryClient.invalidateQueries({ queryKey: ['categories-todos'] });
      toast.success(data?.data.message);
    },
    (error) => {
      toast.error(error);
    }
  );

  const todoCompletedHandler = () => {
    let completedTodo;
    const todos =
      queryClient.getQueryData(['todos'])?.data.data.todos ||
      queryClient.getQueryData(['categories-todos'])?.data.category;

    console.log(queryClient.getQueryData(['categories-todos'])?.data.category);

    for (const todo of todos) {
      if (todo.id === id) {
        completedTodo = {
          ...todo,
          is_completed: !is_completed,
        };
      }
    }

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
    <div className="flex rounded-lg shadow-md">
      <span
        className={`w-4 rounded-l-lg ${
          is_completed ? 'bg-green-100' : 'bg-blue-100'
        }`}
      ></span>
      <div className="flex w-full flex-col gap-y-3 rounded-r-lg bg-white p-4">
        <div className="flex flex-row items-center justify-between">
          <h2 className="text-md max-h-12 break-all font-semibold">{title}</h2>
          {category.name && (
            <span className="text-xs font-light text-neutral-800">
              {category.name}
            </span>
          )}
        </div>

        <p className="max-h-24 overflow-auto break-words text-sm">
          {description}
        </p>
        <div className="flex flex-row items-center justify-between">
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
  );
};

export default DashboardCard;
