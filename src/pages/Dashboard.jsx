import React, { useState, useEffect } from 'react';

import emptyTodo from '../assets/images/Calendar.webp';
import { ReactComponent as Plus } from '../assets/icons/uil_plus.svg';

import DashboardCard from '../components/Dashboard/DashboardCard';
import DashboardForm from '../components/Dashboard/DashboardForm';
import DashboardFilter from '../components/Dashboard/DashboardFilter/DashboardFilter';
import Alert from '../components/UI/Alert';
import useAxios from '../hooks/useAxios';
import { useFilter, useTodos, useAuth } from '../hooks/useStoreContext';

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

  const todosInProgress = todos.filter((todo) => !todo.is_completed);
  const todosCompleted = todos.filter((todo) => todo.is_completed);

  const todosData = isTodoCompleted
    ? todosInProgress
    : isTodoInProgress
    ? todosCompleted
    : todos;

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
        <DashboardFilter />
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
