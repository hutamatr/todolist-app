import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { MdAdd, MdArrowBack } from 'react-icons/md';

import CategoryFormModal from '@components/Category/CategoryFormModal';
import CategoryItem from '@components/Category/CategoryItem';
import Pagination from '@components/UI/Pagination';
import Search from '@components/UI/Search';
import Sort from '@components/UI/Sort';

import useBaffle from '@hooks/useBaffle';
import useHttp from '@hooks/useHttp';
import { useModal } from '@hooks/useStoreContext';
import errorQuery from '@utils/errorQuery';

import emptyCategory from '@assets/images/categories.webp';

const Category = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [skipCategoryPaginate, setSkipCategoryPaginate] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [sortCategories, setSortCategories] = useState('ASC');
  const [searchCategories, setSearchCategories] = useState('');
  const [isButtonShow, setIsButtonShow] = useState(false);

  const queryClient = useQueryClient();

  const { requestHttp } = useHttp();
  const { newBaffle } = useBaffle('.categoryBaffle');
  const { setShowModal } = useModal();

  useEffect(() => {
    newBaffle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (searchCategories) {
      setIsButtonShow(true);
    }
  }, [searchCategories]);

  const {
    data: categories,
    isError: isErrorCategories,
    isLoading: isLoadingCategories,
    isFetching: isFetchingCategories,
    error: errorCategories,
    refetch,
  } = useQuery({
    queryKey: [
      'categories',
      skipCategoryPaginate,
      pageSize,
      sortCategories,
      searchCategories,
    ],
    queryFn: () => {
      return requestHttp({
        method: 'GET',
        url: `/categories?offset=${skipCategoryPaginate}&limit=${pageSize}&order_by=${sortCategories}&s=${searchCategories}`,
      });
    },
    onError: (error) => {
      errorQuery(error, 'Getting Category Failed!');
    },
  });

  const { mutate: mutateDelete } = useMutation({
    mutationFn: (categoryId) => {
      return requestHttp({
        method: 'DELETE',
        url: `/categories/${categoryId}`,
      });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success(data?.data.message);
    },
    onError: (error) => {
      errorQuery(error, 'Delete Todo Failed!');
    },
  });

  const allCategoriesData = categories?.data.data.rows;
  const categoriesCount = +categories?.data.data.count;

  useEffect(() => {
    window.scrollTo({ behavior: 'smooth', top: 0 });
  }, [allCategoriesData]);

  const showCategoryFormHandler = () => {
    setShowModal((prevState) => !prevState);
  };

  const searchValueHandler = (data) => {
    setSearchCategories(data);
  };

  const onPageChangeHandler = (page) => {
    setCurrentPage(page);
  };

  const onSetSkipChangeHandler = (pages) => {
    setSkipCategoryPaginate(pages);
  };

  const backButtonHandler = () => {
    refetch();
    setIsButtonShow(false);
    setSearchCategories('');
  };

  const categoriesContent = (
    <>
      {categoriesCount === 0 ? (
        <div className="mx-auto flex min-h-[50vh] flex-col items-center justify-center gap-y-3">
          <img
            src={emptyCategory}
            alt=""
            className="max-w-[4rem] md:max-w-[5rem]"
            loading="lazy"
          />
          <p className="text-center text-lg font-medium dark:text-material-green">
            Category Empty
          </p>
          <button
            type="button"
            onClick={showCategoryFormHandler}
            className="flex items-center gap-x-1 rounded-md bg-orange-100 px-4 py-2 font-semibold text-material-green shadow-material-shadow dark:text-neutral-800"
          >
            <MdAdd className="text-2xl text-material-green dark:text-neutral-800" />{' '}
            Add Category
          </button>
        </div>
      ) : (
        <>
          <ul className="grid w-full grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
            <button
              type="button"
              onClick={showCategoryFormHandler}
              className="flex min-h-[8rem] w-full cursor-pointer flex-col items-center justify-center gap-y-1 rounded border-2 border-dashed border-orange-100 py-4 text-sm font-semibold text-orange-100"
            >
              <MdAdd className="text-2xl text-orange-100" /> Add Category
            </button>
            {allCategoriesData?.map((category) => {
              return (
                <CategoryItem
                  {...category}
                  key={category.id}
                  onDelete={mutateDelete}
                />
              );
            })}
          </ul>

          <Pagination
            currentPage={currentPage}
            totalCount={categoriesCount}
            pageSize={pageSize}
            onPageChange={onPageChangeHandler}
            onSkipPage={onSetSkipChangeHandler}
            onSetPageSize={setPageSize}
          />
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
      <section className="layout flex min-h-screen flex-col gap-y-8 py-6 pt-20">
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
            <h1 className="categoryBaffle text-lg font-bold dark:text-material-green">
              Category
            </h1>
          </div>
          <Search name="Categories" onSearchValue={searchValueHandler} />
        </div>
        {categoriesCount > 0 && (
          <Sort onSetSort={setSortCategories} onSort={sortCategories} />
        )}
        {isErrorCategories && (
          <p className="text-center text-lg font-semibold text-red-600">
            {(errorCategories instanceof AxiosError &&
              errorCategories.response?.data.message) ||
              errorCategories?.message}
          </p>
        )}
        {isLoadingCategories && isFetchingCategories && (
          <p className="text-center text-lg font-semibold">Loading...</p>
        )}
        {!isErrorCategories && !isLoadingCategories && categoriesContent}
      </section>
      <CategoryFormModal />
    </>
  );
};

export default Category;
