import React from 'react';
import { useLocation } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
import { AxiosError } from 'axios';

import emptyTodo from '../assets/images/Calendar.webp';
import { ReactComponent as Plus } from '../assets/icons/uil_plus.svg';

import DashboardForm from '../components/Dashboard/DashboardForm';
import DashboardFilter from '../components/Dashboard/DashboardFilter/DashboardFilter';
import DashboardSort from '../components/Dashboard/DashboardFilter/DashboardSort';
import Pagination from '../components/UI/Paginate';
import useQueryTodos from '../hooks/useQueryTodos';
import { useFilter, useModal } from '../hooks/useStoreContext';

const sortTodoByDate = (todos, ascending) => {
  return todos?.sort((todoA, todoB) => {
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
  const { isTodoInProgress, isTodoCompleted } = useFilter();
  const { isModalShow, setShowModal } = useModal();
  const { search } = useLocation();

  const {
    data: dataTodos,
    isError: isErrorTodos,
    isLoading: isLoadingTodos,
    error: errorTodos,
  } = useQueryTodos(
    'todos',
    { method: 'GET', url: '/todos?limit=100' },
    undefined,
    (error) => {
      toast.error(error);
    }
  );

  const queryParams = new URLSearchParams(search);

  const isSortedTodos = queryParams.get('sort') === 'asc';

  const sortedTodos = sortTodoByDate(dataTodos?.data.data.todos, isSortedTodos);

  const todosInProgress = sortedTodos?.filter((todo) => !todo.is_completed);
  const todosCompleted = sortedTodos?.filter((todo) => todo.is_completed);

  const todosData = isTodoCompleted
    ? todosInProgress
    : isTodoInProgress
    ? todosCompleted
    : sortedTodos;

  const modalShowHandler = () => {
    setShowModal((prevState) => !prevState);
  };

  const dashboardContent =
    todosData?.length === 0 ? (
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
      <Pagination
        data={todosData}
        pageLimit={4}
        dataLimit={5}
        onSetShowModal={setShowModal}
      />
    );

  return (
    <>
      <Toaster position="top-center" />
      <section className="flex min-h-screen flex-col gap-y-6 py-6">
        <h1 className="font-bold">Dashboard</h1>
        <div className="flex flex-row items-center justify-between">
          <DashboardFilter />
          <DashboardSort onIsSortedTodos={isSortedTodos} />
        </div>
        {isErrorTodos && (
          <p className="text-center text-lg font-semibold text-red-600">
            {errorTodos instanceof AxiosError &&
              errorTodos.response?.data.message}
          </p>
        )}
        {isLoadingTodos && (
          <p className="text-center text-lg font-semibold">Loading...</p>
        )}
        {dashboardContent}
        <button
          type="button"
          onClick={modalShowHandler}
          className="fixed bottom-0 right-0 z-30 my-6 mx-4 cursor-pointer rounded-lg bg-orange-100 p-2"
        >
          <Plus
            className="h-8 w-8 duration-500 hover:rotate-90"
            fill="#F7F7F7"
          />
        </button>
      </section>
      <DashboardForm onShowModal={isModalShow} onSetShowModal={setShowModal} />
    </>
  );
};

export default Dashboard;
