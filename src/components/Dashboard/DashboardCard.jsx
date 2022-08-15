import React, { useState } from 'react';
import { formatDistance } from 'date-fns';

import { MdDeleteOutline, MdCheckCircle, MdEdit } from 'react-icons/md';

import useTodos from '../../hooks/useTodos';

const DashboardCard = ({ title, message, date, id, todo }) => {
  const [todoCompleted, setTodoCompleted] = useState(false);

  const { deleteTodo, editTodo } = useTodos();

  const formattedDate = formatDistance(new Date(date), new Date(), {
    addSuffix: true,
    includeSeconds: true,
  });

  const todoCompletedHandler = () =>
    setTodoCompleted((prevState) => !prevState);

  const todoDeleteHandler = () => {
    deleteTodo(id);
  };

  const todoEditHandler = () => {
    editTodo(todo);
  };

  return (
    <div
      className={`bg-custom-white flex flex-col gap-y-3 rounded-lg p-4 shadow-material-shadow ${
        todoCompleted ? 'ring-custom-green ring-2' : ''
      }`}
    >
      <div className="flex items-start justify-between gap-x-4">
        <h2 className="max-h-12 overflow-auto break-all text-lg font-semibold">
          {title}
        </h2>
        {todoCompleted ? (
          <span className="text-custom-green mt-1 text-sm font-medium uppercase">
            Completed!
          </span>
        ) : (
          <span className="text-custom-orange mt-1 whitespace-nowrap text-sm font-medium uppercase">
            In Progress
          </span>
        )}
      </div>
      <p className="max-h-24 overflow-auto break-words">{message}</p>
      <div className="flex flex-row items-center justify-between">
        <>
          <span className="text-xs">{formattedDate}</span>
        </>
        <div className="flex items-center gap-x-3 text-3xl">
          <button onClick={todoCompletedHandler}>
            <MdCheckCircle
              className={`${
                todoCompleted ? 'text-custom-green' : 'text-custom-orange'
              }`}
            />
          </button>
          <label
            htmlFor="my-modal-6"
            className="cursor-pointer"
            onClick={todoEditHandler}
          >
            <MdEdit className="text-custom-green text-2xl" />
          </label>
          <button onClick={todoDeleteHandler}>
            <MdDeleteOutline className="text-red-700" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
