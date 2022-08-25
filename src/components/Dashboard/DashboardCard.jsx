import React from 'react';
import { formatDistance } from 'date-fns';

import { ReactComponent as Clock } from '../../assets/icons/uil_clock.svg';
import { ReactComponent as Edit } from '../../assets/icons/uil_edit-alt.svg';
import { ReactComponent as Trash } from '../../assets/icons/uil_trash-alt.svg';
import { ReactComponent as Check } from '../../assets/icons/uil_check.svg';

import { useTodos } from '../../hooks/useStoreContext';

const DashboardCard = ({ title, message, date, id, todo, isCompleted }) => {
  const { updateTodo, deleteTodo, editTodo, todos } = useTodos();

  const formattedDate = formatDistance(new Date(date), new Date(), {
    addSuffix: true,
    includeSeconds: true,
  });

  const newDate = new Date(date).toLocaleDateString();

  const todoCompletedHandler = () => {
    let completedTodo;
    for (const todo of todos) {
      if (todo.id === id) {
        completedTodo = { ...todo, isCompleted: !isCompleted };
      }
    }
    updateTodo(completedTodo);
  };

  const todoDeleteHandler = () => {
    deleteTodo(id);
  };

  const todoEditHandler = () => {
    editTodo(todo);
  };

  return (
    <div className="flex rounded-lg shadow-md">
      <span
        className={`w-4 rounded-l-lg ${
          isCompleted ? 'bg-green-100' : 'bg-blue-100'
        }`}
      ></span>
      <div className="flex w-full flex-col gap-y-3 rounded-r-lg bg-white p-4">
        <h2 className="text-md max-h-12 overflow-auto break-all font-semibold">
          {title}
        </h2>

        <p className="max-h-24 overflow-auto break-words text-sm">{message}</p>
        <div className="flex flex-row items-center justify-between">
          <div className="flex items-center justify-center gap-x-1">
            <Clock className="w-4" fill="#707175" />
            <span className="text-[.65rem]">
              {newDate} - {formattedDate}
            </span>
          </div>
          <div className="flex items-center gap-x-3 text-3xl">
            <label
              htmlFor="my-modal-6"
              className="cursor-pointer"
              onClick={todoEditHandler}
            >
              <Edit className="w-4" fill="#707175" />
            </label>
            <button onClick={todoDeleteHandler}>
              <Trash className="w-4" fill="#FE6565" />
            </button>
            <button onClick={todoCompletedHandler}>
              <Check
                className={`w-4 rounded-md ${
                  isCompleted ? 'bg-green-100' : 'bg-neutral-400'
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
