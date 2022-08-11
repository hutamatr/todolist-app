import React, { useState } from "react";
import { formatDistance } from "date-fns";

import { MdDeleteOutline, MdCheckCircle } from "react-icons/md";

import useTodos from "../../hooks/useTodos";

const DashboardCard = ({ title, message, date, id, todo }) => {
  const [todoCompleted, setTodoCompleted] = useState(false);

  const { deleteTodo } = useTodos();

  const newDate = new Date(date).toISOString();
  const formattedDate = formatDistance(new Date(newDate), new Date(), {
    addSuffix: true,
  });

  const todoCompletedHandler = () =>
    setTodoCompleted((prevState) => !prevState);

  const todoDeleteHandler = () => {
    deleteTodo(id);
  };

  /*   const todoEditHandler = () => {
    editTodo(todo);
  }; */

  return (
    <div
      className={`flex flex-col gap-y-3 rounded-lg bg-custom-white p-4 shadow-material-shadow ${
        todoCompleted ? "opacity-50" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-x-4">
        <h2 className="max-h-12 overflow-auto break-all text-lg font-semibold">
          {title}
        </h2>
        {todoCompleted ? (
          <span className="mt-1 text-sm font-medium uppercase text-custom-green">
            Completed!
          </span>
        ) : (
          <span className="mt-1 whitespace-nowrap text-sm font-medium uppercase text-custom-orange">
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
                todoCompleted ? "text-custom-green" : "text-custom-orange"
              }`}
            />
          </button>
          {/*  <label
            htmlFor="my-modal-6"
            className="cursor-pointer"
            onClick={todoEditHandler}
          >
            <MdEdit className="text-2xl text-custom-green" />
          </label> */}
          <button onClick={todoDeleteHandler}>
            <MdDeleteOutline className="text-red-700" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
