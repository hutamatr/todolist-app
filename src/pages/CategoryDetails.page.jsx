import { useState, useEffect } from 'react';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (searchValue) {
      setIsButtonShow(true);
    }
  }, [searchValue]);

  const categoryName = queryClient
    .getQueryData(['categories'])
    ?.data.data.rows.find((category) => category.id === +categoryId);

  const { data: todoByCategory, refetch } = useQuery({
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
  const detailsCategorySearchCount = todoByCategory?.data.data.count;

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

  return (
    <section className="flex min-h-screen flex-col gap-y-6 py-6">
      <div className="flex flex-col items-center justify-center gap-y-3 sm:flex-row sm:justify-between">
        <div className="flex items-center gap-x-6">
          {isButtonShow && (
            <button
              className="rounded bg-white py-1 px-3 shadow-material-shadow duration-300 hover:ring-2 hover:ring-orange-100"
              onClick={() => {
                refetch();
                setIsButtonShow(false);
                setSearchValue('');
              }}
            >
              <MdArrowBack className="text-xl" />
            </button>
          )}
          <h1 className="categoryDetailsBaffle text-lg font-bold">
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
        />
        {/* <Sort
            onSort={todosByCategorySort}
            onSetSort={setTodosByCategorySort}
          /> */}
      </div>

      {detailsCategorySearchCount === 0 ? (
        <div className="mx-auto flex min-h-[50vh] flex-col items-center justify-center gap-y-3">
          <img
            src={emptyTodo}
            alt=""
            className="max-w-[4rem] md:max-w-[5rem]"
            loading="lazy"
          />
          <p className="text-center text-lg font-medium">Todo Empty</p>
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
          {detailsCategorySearchCount >= pageSize && (
            <Pagination
              currentPage={currentPage}
              totalCount={detailsCategorySearchCount}
              onPageChange={onPageChangeHandler}
              onSkipPage={onSetSkipChangeHandler}
              pageSize={pageSize}
              onSetPageSize={setPageSize}
            />
          )}
        </>
      )}
      <TodoForm onShowModal={isModalShow} onSetShowModal={setShowModal} />
    </section>
  );
};

export default CategoryDetails;
