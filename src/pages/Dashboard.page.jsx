import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import emptyTodo from '../assets/images/Calendar.webp';
import { ReactComponent as Plus } from '../assets/icons/uil_plus.svg';

import DashboardCard from '../components/Dashboard/DashboardCard';
import DashboardForm from '../components/Dashboard/DashboardForm';
import DashboardFilter from '../components/Dashboard/DashboardFilter/DashboardFilter';
import DashboardSort from '../components/Dashboard/DashboardFilter/DashboardSort';
import Alert from '../components/UI/Alert';
import useAxios from '../hooks/useAxios';
import { useFilter, useTodos, useAuth } from '../hooks/useStoreContext';

const sortTodoByDate = (todos, ascending) => {
  return todos.sort((todoA, todoB) => {
    const { createdAt: dateA } = todoA;
    const { createdAt: dateB } = todoB;
    const newDateA = new Date(dateA);
    const newDateB = new Date(dateB);
    if (ascending) {
      return newDateA - newDateB;
    } else {
      return newDateB - newDateA;
    }
  });
};

const Dashboard = () => {
  const {
    todos,
    getAllTodo,
    alertTodo: addTodoSuccess,
    setAlertTodo: setAddTodoSuccess,
  } = useTodos();
  const { authToken } = useAuth();
  const { requestHttp } = useAxios();
  const { isTodoInProgress, isTodoCompleted } = useFilter();
  const { search } = useLocation();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    window.scrollTo({ behavior: 'smooth', top: 0 });
    requestHttp(
      {
        method: 'GET',
        url: '/todos?offset=0&limit=10',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      },
      (data) => {
        console.log(data);
        getAllTodo(data.data);
      }
    );
  }, [authToken, requestHttp, getAllTodo]);

  const queryParams = new URLSearchParams(search);

  const isSortedTodos = queryParams.get('sort') === 'asc';

  const sortedTodos = sortTodoByDate(todos, isSortedTodos);

  const todosInProgress = sortedTodos.filter((todo) => !todo.is_completed);
  const todosCompleted = sortedTodos.filter((todo) => todo.is_completed);

  const todosData = isTodoCompleted
    ? todosInProgress
    : isTodoInProgress
    ? todosCompleted
    : sortedTodos;

  const modalShowHandler = () => {
    setShowModal((prevState) => !prevState);
  };

  const dashboardContent =
    todosData.length === 0 ? (
      <div className="mx-auto flex min-h-[50vh] flex-col items-center justify-center gap-y-3">
        <img
          src={emptyTodo}
          alt=""
          className="max-w-[5rem] md:max-w-[6rem]"
          loading="lazy"
        />
        <p className="text-center text-lg font-medium">
          Todo you add appear here
        </p>
      </div>
    ) : (
      <ul className="grid grid-cols-1 gap-y-4">
        {todosData.map((todo, index) => {
          return (
            <li key={index}>
              <DashboardCard
                {...todo}
                onTodoEdit={todo}
                onSetShowModal={setShowModal}
              />
            </li>
          );
        })}
      </ul>
    );

  return (
    <>
      {addTodoSuccess.isSuccess && (
        <Alert
          className="alert-success"
          children={addTodoSuccess.successMessage}
          onSuccess={addTodoSuccess.isSuccess}
          onSetSuccess={setAddTodoSuccess}
          icons="success"
        />
      )}
      <section className="flex min-h-screen flex-col gap-y-6 py-6">
        <h1 className="font-bold">Dashboard</h1>
        <div className="flex flex-row items-center justify-between">
          <DashboardFilter />
          <DashboardSort onIsSortedTodos={isSortedTodos} />
        </div>
        {dashboardContent}
        <button
          type="button"
          onClick={modalShowHandler}
          className="fixed bottom-0 right-0 my-6 mx-4 cursor-pointer rounded-lg bg-orange-100 p-2"
        >
          <Plus
            className="h-8 w-8 duration-500 hover:rotate-90"
            fill="#F7F7F7"
          />
        </button>
      </section>
      <DashboardForm onShowModal={showModal} onSetShowModal={setShowModal} />
    </>
  );
};

export default Dashboard;
