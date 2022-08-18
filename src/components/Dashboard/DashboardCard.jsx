import React, { useState } from 'react';
import { formatDistance } from 'date-fns';

import time from '../../assets/icons/uil_clock.svg';
import trash from '../../assets/icons/uil_trash-alt.svg';
import check from '../../assets/icons/uil_check.webp';
import edit from '../../assets/icons/uil_edit-alt.svg';

import useTodos from '../../hooks/useTodos';

const DashboardCard = ({ title, message, date, id, todo }) => {
  const [todoCompleted, setTodoCompleted] = useState(false);

  const { deleteTodo, editTodo, todos } = useTodos();

  const formattedDate = formatDistance(new Date(date), new Date(), {
    addSuffix: true,
    includeSeconds: true,
  });

  const newDate = new Date(date).toLocaleDateString();

  const todoCompletedHandler = (todoId) => {
    console.log(todoId);
    setTodoCompleted((prevState) => !prevState);
    const completedTodo = todos.map((todo) => {
      if (todoId === todo.id) {
        return { ...todo, isCompleted: !todoCompleted };
      }
      return todo;
    });

    console.log('completedTodo', completedTodo);
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
          todoCompleted ? 'bg-green-100' : 'bg-blue-100'
        }`}
      ></span>
      <div className="flex w-full flex-col gap-y-3 rounded-r-lg bg-white p-4">
        <h2 className="text-md max-h-12 overflow-auto break-all font-semibold">
          {title}
        </h2>

        <p className="max-h-24 overflow-auto break-words text-sm">{message}</p>
        <div className="flex flex-row items-center justify-between">
          <div className="flex items-center justify-center gap-x-1">
            <img src={time} alt="" className="w-4" />
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
              <img src={edit} alt="edit" className="w-4" />
            </label>
            <button onClick={todoDeleteHandler}>
              <img src={trash} alt="delete" className="w-4" />
            </button>
            <button onClick={todoCompletedHandler.bind(this, id)}>
              <img
                src={check}
                alt="done"
                className={`w-4 rounded-md ${
                  todoCompleted ? 'bg-green-100' : 'ring-1 ring-green-100'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
