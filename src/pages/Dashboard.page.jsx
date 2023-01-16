import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Toaster } from 'react-hot-toast';

import TodoFilter from 'components/Todos/TodoFilter';
import Sort from 'components/UI/Sort';
import Pagination from 'components/UI/Pagination';
import TodoForm from 'components/Todos/TodoForm';
import TodoList from 'components/Todos/TodoList';
import Search from 'components/UI/Search';
import useHttp from 'hooks/useHttp';
import useBaffle from 'hooks/useBaffle';
import { useModal } from 'hooks/useStoreContext';
import errorQuery from 'utils/errorQuery';

import { MdArrowBack } from 'react-icons/md';
import emptyTodo from 'assets/images/Calendar.webp';
import { ReactComponent as Plus } from 'assets/icons/uil_plus.svg';

const Dashboard = () => {
  const { isModalShow, setShowModal } = useModal();
  const [currentPage, setCurrentPage] = useState(1);
  const [skipPaginate, setSkipPaginate] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [searchTodos, setSearchTodos] = useState('');
  const [sortTodos, setSortTodos] = useState('ASC');
  const [todoStatus, setTodoStatus] = useState(false);
  const [isButtonShow, setIsButtonShow] = useState(false);

  const { requestHttp } = useHttp();
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

  const {
    data: todos,
    isError: isErrorTodos,
    isLoading: isLoadingTodos,
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

  useEffect(() => {
    window.scrollTo({ behavior: 'smooth', top: 0 });
  }, [todosData]);

  const searchValueHandler = (data) => {
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
          todosData={todosData}
          onSetShowModal={setShowModal}
          dashboardSkipPaginate={skipPaginate}
          dashboardPageSize={pageSize}
          dashboardSortTodos={sortTodos}
          dashboardSearchTodos={searchTodos}
          dashboardTodoStatus={todoStatus}
        />
        {totalCount >= pageSize && (
          <Pagination
            currentPage={currentPage}
            totalCount={totalCount}
            pageSize={pageSize}
            onPageChange={onPageChangeHandler}
            onSkipPage={onSetSkipChangeHandler}
            onSetPageSize={setPageSize}
          />
        )}
      </>
    );

  return (
    <>
      <Toaster position="top-center" />
      <section className="flex min-h-screen flex-col gap-y-6 py-6">
        <div className="flex flex-col items-center justify-center gap-y-5 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-x-6">
            {isButtonShow && (
              <button
                className="rounded bg-white py-1 px-3 shadow-material-shadow duration-300 hover:ring-2 hover:ring-orange-100"
                onClick={() => {
                  refetch();
                  setIsButtonShow(false);
                  setSearchTodos('');
                }}
              >
                <MdArrowBack className="text-xl" />
              </button>
            )}

            <h1 className="dashboardBaffle text-lg font-bold">Dashboard</h1>
          </div>
          <Search name="Todo" onSearchValue={searchValueHandler} />
        </div>

        {totalCount > 0 && (
          <div className="flex flex-row items-center justify-between">
            <TodoFilter setTodoStatus={setTodoStatus} todoStatus={todoStatus} />
            <Sort onSort={sortTodos} onSetSort={setSortTodos} />
          </div>
        )}

        {isErrorTodos && (
          <p className="text-center text-lg font-semibold text-red-600">
            {(errorTodos instanceof AxiosError &&
              errorTodos.response?.data.message) ||
              errorTodos?.message}
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
      <TodoForm onShowModal={isModalShow} onSetShowModal={setShowModal} />
    </>
  );
};

export default Dashboard;
