import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import { AxiosError } from 'axios';

import emptyTodo from '../assets/images/Calendar.webp';
import { ReactComponent as Plus } from '../assets/icons/uil_plus.svg';

import DashboardForm from '../components/Dashboard/DashboardForm';
import DashboardFilter from '../components/Dashboard/DashboardFilter/DashboardFilter';
import DashboardSort from '../components/Dashboard/DashboardFilter/DashboardSort';
import Pagination from '../components/UI/Pagination';
import useQueryTodos from '../hooks/useQueryTodos';
import { useFilter, useModal } from '../hooks/useStoreContext';
import TodoList from '../components/Dashboard/TodoList';

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

let PageSize = 5;

const Dashboard = () => {
  const { isTodoInProgress, isTodoCompleted } = useFilter();
  const { isModalShow, setShowModal } = useModal();
  const { search } = useLocation();

  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: dataTodos,
    isError: isErrorTodos,
    isLoading: isLoadingTodos,
    error: errorTodos,
  } = useQueryTodos(
    'todos',
    { method: 'GET', url: '/todos?limit=500' },
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

  useEffect(() => {}, [todosData]);

  const modalShowHandler = () => {
    setShowModal((prevState) => !prevState);
  };

  const currentTodosData = useCallback(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return todosData?.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, todosData]);

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
      <>
        <TodoList
          todosData={currentTodosData()}
          onSetShowModal={setShowModal}
        />
        {todosData?.length > 5 && (
          <Pagination
            currentPage={currentPage}
            totalCount={todosData?.length}
            pageSize={PageSize}
            onPageChange={(page) => setCurrentPage(page)}
          />
        )}
      </>
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
        {!isErrorTodos && !isLoadingTodos && dashboardContent}
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
