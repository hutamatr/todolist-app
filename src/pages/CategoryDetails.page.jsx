import { useState, useEffect } from 'react';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AxiosError } from 'axios';

import TodoForm from 'components/Todos/TodoForm';
import TodoList from 'components/Todos/TodoList';
import TodoFilter from 'components/Todos/TodoFilter';
import Pagination from 'components/UI/Pagination';
import Search from 'components/UI/Search';
import useHttp from 'hooks/useHttp';
import useBaffle from 'hooks/useBaffle';
import { useModal } from 'hooks/useStoreContext';
import errorQuery from 'utils/errorQuery';

import emptyTodo from 'assets/images/Calendar.webp';
import { MdArrowBack } from 'react-icons/md';

const CategoryDetails = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [skipPaginate, setSkipPaginate] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [searchValue, setSearchValue] = useState('');
  const [todosByCategoryStatus, setTodosByCategoryStatus] = useState(false);
  const [isButtonShow, setIsButtonShow] = useState(false);
  // const [todosByCategorySort, setTodosByCategorySort] = useState('ASC');

  const { categoryId } = useParams();
  const { isModalShow, setShowModal } = useModal();

  const queryClient = useQueryClient();
  const { requestHttp } = useHttp();
  const { newBaffle } = useBaffle('.categoryDetailsBaffle');

  useEffect(() => {
    newBaffle();
  }, []);

  useEffect(() => {
    if (searchValue) {
      setIsButtonShow(true);
    }
  }, [searchValue]);

  const categoryName = queryClient
    .getQueryData(['categories'])
    ?.data.data.rows.find((category) => category.id === +categoryId);

  const {
    data: todoByCategory,
    isError: isErrorTodoByCategory,
    error: errorTodoByCategory,
    isLoading: isLoadingTodoByCategory,
    isFetching: isFetchingTodoByCategory,
    refetch,
  } = useQuery({
    queryKey: [
      'categories-todos',
      categoryId,
      skipPaginate,
      pageSize,
      searchValue,
      todosByCategoryStatus,
      // todosByCategorySort,
    ],
    queryFn: () => {
      return requestHttp({
        method: 'GET',
        url: `/categories/${categoryId}?offset=${skipPaginate}&limit=${pageSize}&s=${searchValue}&is_completed=${todosByCategoryStatus}`,
      });
    },
    onError: (error) => {
      errorQuery(error, 'Get Detail Category Failed!');
    },
    keepPreviousData: true,
  });

  const detailsCategoryData = todoByCategory?.data.data.rows;
  const detailsCategorySearchTotalTodos = todoByCategory?.data.data.totalTodos;
  const detailsCategoryDone = todoByCategory?.data.data.totalDone;
  const detailsCategoryInProgress = todoByCategory?.data.data.totalInProgress;

  // console.log(detailsCategoryDone, detailsCategoryInProgress);

  useEffect(() => {
    window.scrollTo({ behavior: 'smooth', top: 0 });
  }, [detailsCategoryData]);

  const onPageChangeHandler = (page) => {
    setCurrentPage(page);
  };

  const onSetSkipChangeHandler = (pages) => {
    setSkipPaginate(pages);
  };

  const searchValueHandler = (data) => {
    setSearchValue(data);
  };

  const backButtonHandler = () => {
    refetch();
    setIsButtonShow(false);
    setSearchValue('');
  };

  const todoByCategoryContent = (
    <>
      {detailsCategorySearchTotalTodos === 0 ? (
        <div className="mx-auto flex min-h-[50vh] flex-col items-center justify-center gap-y-3">
          <img
            src={emptyTodo}
            alt=""
            className="max-w-[4rem] md:max-w-[5rem]"
            loading="lazy"
          />
          <p className="text-center text-lg font-medium dark:text-material-green">
            Todo By Category Empty
          </p>
        </div>
      ) : (
        <>
          <TodoList
            todosData={detailsCategoryData}
            onSetShowModal={setShowModal}
            categoriesDetailsCategoryId={categoryId}
            categoriesDetailsSkipPaginate={skipPaginate}
            categoriesDetailsPageSize={pageSize}
            categoriesDetailsSearchValue={searchValue}
            categoriesDetailsStatus={todosByCategoryStatus}
            // categoriesDetailsSort={todosByCategorySort}
          />
          {detailsCategorySearchTotalTodos >= pageSize && (
            <Pagination
              currentPage={currentPage}
              totalCount={detailsCategorySearchTotalTodos}
              onPageChange={onPageChangeHandler}
              onSkipPage={onSetSkipChangeHandler}
              pageSize={pageSize}
              onSetPageSize={setPageSize}
            />
          )}
        </>
      )}
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
      <section className="layout flex min-h-screen flex-col gap-y-6 py-6 pt-20">
        <div className="flex flex-col items-center justify-center gap-y-3 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-x-6">
            {isButtonShow && (
              <button
                className="rounded bg-material-green py-1 px-3 shadow-material-shadow duration-300 hover:ring-2 hover:ring-orange-100"
                onClick={backButtonHandler}
              >
                <MdArrowBack className="text-xl" />
              </button>
            )}
            <h1 className="categoryDetailsBaffle max-w-xs truncate text-lg font-bold dark:text-material-green md:max-w-md">
              {categoryName?.name}
            </h1>
          </div>
          <Search
            name={`Todos in ${categoryName?.name || ''}`}
            onSearchValue={searchValueHandler}
          />
        </div>

        <div className="flex flex-row items-center justify-between">
          <TodoFilter
            setTodoStatus={setTodosByCategoryStatus}
            todoStatus={todosByCategoryStatus}
            onSetCurrentPage={setCurrentPage}
            onSetSkipPaginate={setSkipPaginate}
            totalTodoDone={detailsCategoryDone}
            totalInProgress={detailsCategoryInProgress}
          />
          {/* <Sort
            onSort={todosByCategorySort}
            onSetSort={setTodosByCategorySort}
          /> */}
        </div>

        {isErrorTodoByCategory && (
          <p className="text-center text-lg font-semibold text-red-600">
            {(errorTodoByCategory instanceof AxiosError &&
              errorTodoByCategory.response?.data.message) ||
              errorTodoByCategory?.message}
          </p>
        )}

        {isLoadingTodoByCategory && isFetchingTodoByCategory && (
          <p className="text-center text-xl font-medium dark:text-material-green">
            Loading...
          </p>
        )}

        {!isErrorTodoByCategory &&
          !isLoadingTodoByCategory &&
          todoByCategoryContent}

        <TodoForm onShowModal={isModalShow} onSetShowModal={setShowModal} />
      </section>
    </>
  );
};

export default CategoryDetails;
