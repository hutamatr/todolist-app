import React from "react";
import { FcTodoList } from "react-icons/fc";

import DashboardCard from "../components/Dashboard/DashboardCard";
import useTodos from "../hooks/useTodos";

const Dashboard = () => {
  const { todos } = useTodos();

  return (
    <section className="flex flex-col gap-y-6 py-6">
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-xl text-custom-orange">Dashboard</h1>
        <label
          className="btn-sm flex cursor-pointer flex-row items-center gap-x-2 rounded-lg bg-custom-white font-semibold shadow-material-shadow"
          htmlFor="my-modal-6"
        >
          <FcTodoList className="text-xl" />
          New +
        </label>
      </div>
      <ul className="grid grid-cols-1 gap-y-4">
        {todos.map((todo, index) => {
          return (
            <li key={index}>
              <DashboardCard {...todo} todo={todo} />
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Dashboard;
