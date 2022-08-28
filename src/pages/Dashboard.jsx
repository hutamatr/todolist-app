import React, { useEffect } from 'react';

import emptyTodo from '../assets/images/Calendar.webp';
import { ReactComponent as Plus } from '../assets/icons/uil_plus.svg';

import DashboardCard from '../components/Dashboard/DashboardCard';
import DashboardForm from '../components/Dashboard/DashboardForm';
import DashboardFilter from '../components/Dashboard/DashboardFilter/DashboardFilter';
import { useTodos, useFilter, useAuth } from '../hooks/useStoreContext';
import useAxios from '../hooks/useAxios';

const Dashboard = () => {
  const { todos, addTodo } = useTodos();
  const { authToken } = useAuth();
  const { isTodoInProgress, isTodoCompleted } = useFilter();
  const { requestHttp } = useAxios();

  useEffect(() => {
    requestHttp(
      {
        method: 'GET',
        url: '/todos?offset=2&limit=2',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      },
      (data) => {
        console.log(data.data);
        addTodo(data.data);
      }
    );
  }, [authToken, requestHttp, addTodo]);

  const todosInProgress = todos.filter((todo) => !todo.isCompleted);
  const todosCompleted = todos.filter((todo) => todo.isCompleted);

  const todosData = isTodoCompleted
    ? todosInProgress
    : isTodoInProgress
    ? todosCompleted
    : todos;

  const dashboardContent =
    todosData.length === 0 ? (
      <div className="mx-auto flex min-h-[50vh] flex-col items-center justify-center gap-y-3">
        <img src={emptyTodo} alt="" className="max-w-[5rem] md:max-w-[6rem]" />
        <p className="text-center text-lg font-medium">
          Todo you add appear here
        </p>
      </div>
    ) : (
      <ul className="grid grid-cols-1 gap-y-4">
        {todosData.map((todo, index) => {
          return (
            <li key={index}>
              <DashboardCard {...todo} onTodoEdit={todo} />
            </li>
          );
        })}
      </ul>
    );

  return (
    <>
      <section className="flex min-h-screen flex-col gap-y-6 py-6">
        <h1 className="font-bold">Dashboard</h1>
        <DashboardFilter />
        {dashboardContent}
        <label
          htmlFor="my-modal-6"
          className="fixed bottom-0 right-0 my-6 mx-4 cursor-pointer rounded-lg bg-orange-100 p-2"
        >
          <Plus
            className="h-8 w-8 duration-500 hover:rotate-90"
            fill="#F7F7F7"
          />
        </label>
      </section>
      <DashboardForm />
    </>
  );
};

export default Dashboard;
