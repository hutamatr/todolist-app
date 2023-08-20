import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { MdAdd, MdArrowBack } from 'react-icons/md';

import TodoFilter from '@components/Todos/TodoFilter';
import TodoForm from '@components/Todos/TodoForm';
import TodoList from '@components/Todos/TodoList';
import Pagination from '@components/UI/Pagination';
import Search from '@components/UI/Search';
import Sort from '@components/UI/Sort';

import useBaffle from '@hooks/useBaffle';
import useHttp from '@hooks/useHttp';
import { useModal } from '@hooks/useStoreContext';
import errorQuery from '@utils/errorQuery';

import emptyTodo from '@assets/images/Calendar.webp';

const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [skipPaginate, setSkipPaginate] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [searchTodos, setSearchTodos] = useState('');
  const [sortTodos, setSortTodos] = useState('ASC');
  const [todoStatus, setTodoStatus] = useState(false);
  const [isButtonShow, setIsButtonShow] = useState(false);
  const [isCreateButtonShow, setIsCreateButtonShow] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);

  const { requestHttp } = useHttp();
  const { isModalShow, setShowModal } = useModal();

  const { newBaffle } = useBaffle('.dashboardBaffle');

  useEffect(() => {
    newBaffle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (searchTodos) {
      setIsButtonShow(true);
    }
  }, [searchTodos]);

  const scrollHandler = useCallback(() => {
    if (document.body.getBoundingClientRect().top > scrollPosition) {
      setIsCreateButtonShow(true);
    } else {
      setIsCreateButtonShow(false);
      setScrollPosition(+document.body.getBoundingClientRect().top);
    }
  }, [scrollPosition]);

  useEffect(() => {
    window.addEventListener('scroll', scrollHandler);
    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, [scrollHandler]);

  const { data: totalTodoData } = useQuery({
    queryKey: ['total-todos'],
    queryFn: () => {
      return requestHttp({
        method: 'GET',
        url: '/home',
      });
    },
    onError: (error) => {
      errorQuery(error, 'Get Total Todos Failed!');
    },
  });

  const {
    data: todos,
    isError: isErrorTodos,
    isLoading: isLoadingTodos,
    isFetching: isFetchingTodos,
    error: errorTodos,
    refetch,
  } = useQuery({
    queryKey: [
      'todos',
      skipPaginate,
      pageSize,
      sortTodos,
      searchTodos,
      todoStatus,
    ],
    queryFn: () => {
      return requestHttp({
        method: 'GET',
        url: `/todos?offset=${skipPaginate}&limit=${pageSize}&order_by=${sortTodos}&s=${searchTodos}&is_completed=${todoStatus}`,
      });
    },
    onError: (error) => {
      errorQuery(error, 'Get All Todos Failed!');
    },
    keepPreviousData: true,
  });

  const todosData = todos?.data.data.rows;
  const totalCount = +todos?.data.data.count;

  const totalTodoDone = totalTodoData?.data.data.totalDone;
  const totalInProgress = totalTodoData?.data.data.totalInProgress;

  useEffect(() => {
    window.scrollTo({ behavior: 'smooth', top: 0 });
    setScrollPosition(0);
  }, [todosData]);

  const searchValueHandler = (data) => {
    setSkipPaginate(0);
    setCurrentPage(1);
    setSearchTodos(data);
  };

  const modalShowHandler = () => {
    setShowModal((prevState) => !prevState);
  };

  const onPageChangeHandler = (page) => {
    setCurrentPage(page);
  };

  const onSetSkipChangeHandler = (pages) => {
    setSkipPaginate(pages);
  };

  const backButtonHandler = () => {
    refetch();
    setIsButtonShow(false);
    setSearchTodos('');
  };

  const dashboardContent =
    totalCount === 0 ? (
      <div className="mx-auto flex min-h-[50vh] flex-col items-center justify-center gap-y-3">
        <img
          src={emptyTodo}
          alt=""
          className="max-w-[4rem] md:max-w-[5rem]"
          loading="lazy"
        />
        <p className="text-center text-lg font-medium dark:text-material-green">
          Todo Empty
        </p>
      </div>
    ) : (
      <>
        <TodoList
          todosData={todosData}
          onSetShowModal={setShowModal}
          dashboardSkipPaginate={skipPaginate}
          dashboardPageSize={pageSize}
          dashboardSortTodos={sortTodos}
          dashboardSearchTodos={searchTodos}
          dashboardTodoStatus={todoStatus}
        />
        <Pagination
          currentPage={currentPage}
          totalCount={totalCount}
          pageSize={pageSize}
          onPageChange={onPageChangeHandler}
          onSkipPage={onSetSkipChangeHandler}
          onSetPageSize={setPageSize}
          onSetScrollPosition={setScrollPosition}
        />
      </>
    );

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 1500,
        }}
      />
      <section className="layout flex flex-col gap-y-6 py-6 pt-20">
        <div className="flex flex-col items-center justify-center gap-y-5 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-x-6">
            {isButtonShow && (
              <button
                className="rounded bg-material-green px-3 py-1 shadow-material-shadow duration-300 hover:ring-2 hover:ring-orange-100 dark:bg-orange-100"
                onClick={backButtonHandler}
              >
                <MdArrowBack className="text-xl" />
              </button>
            )}

            <h1 className="dashboardBaffle text-lg font-bold dark:text-material-green">
              Dashboard
            </h1>
          </div>
          <Search name="Todo" onSearchValue={searchValueHandler} />
        </div>

        <div className="flex flex-row items-center justify-between">
          <TodoFilter
            setTodoStatus={setTodoStatus}
            todoStatus={todoStatus}
            onSetCurrentPage={setCurrentPage}
            onSetSkipPaginate={setSkipPaginate}
            totalTodoDone={totalTodoDone}
            totalInProgress={totalInProgress}
          />
          {totalCount > 0 && (
            <Sort onSort={sortTodos} onSetSort={setSortTodos} />
          )}
        </div>

        {isErrorTodos && (
          <p className="text-center text-lg font-semibold text-red-600">
            {(errorTodos instanceof AxiosError &&
              errorTodos.response?.data.message) ||
              errorTodos?.message}
          </p>
        )}

        {isLoadingTodos && isFetchingTodos && (
          <p className="text-center text-xl font-medium dark:text-material-green">
            Loading...
          </p>
        )}

        {!isErrorTodos && !isLoadingTodos && dashboardContent}
        <button
          type="button"
          onClick={modalShowHandler}
          data-testid="create-todo"
          className={`fixed bottom-0 right-0 z-30 mx-4 my-6 cursor-pointer rounded-full bg-orange-100 p-3 duration-700 ${
            isCreateButtonShow ? '' : 'translate-y-96'
          }`}
        >
          <MdAdd className="text-2xl text-material-green duration-500 hover:rotate-90 dark:text-neutral-800 md:text-3xl" />
        </button>
      </section>
      <TodoForm onShowModal={isModalShow} onSetShowModal={setShowModal} />
    </>
  );
};

export default Dashboard;
