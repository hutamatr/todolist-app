import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Toaster } from 'react-hot-toast';

import CategoryForm from 'components/Category/CategoryForm';
import CategoryItem from 'components/Category/CategoryItem';
import Pagination from 'components/UI/Pagination';
import Search from 'components/UI/Search';
import Sort from 'components/UI/Sort';
import useHttp from 'hooks/useHttp';
import useBaffle from 'hooks/useBaffle';
import { useModal } from 'hooks/useStoreContext';
import errorQuery from 'utils/errorQuery';

import { MdArrowBack } from 'react-icons/md';
import { ReactComponent as Plus } from 'assets/icons/uil_plus.svg';

const Category = () => {
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [skipCategoryPaginate, setSkipCategoryPaginate] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [sortCategories, setSortCategories] = useState('ASC');
  const [searchCategories, setSearchCategories] = useState('');
  const [isButtonShow, setIsButtonShow] = useState(false);

  const { requestHttp } = useHttp();
  const { newBaffle } = useBaffle('.categoryBaffle');
  const { setShowModal } = useModal();

  useEffect(() => {
    newBaffle();
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

  const allCategories = categories?.data.data.rows;
  const categoriesCount = +categories?.data.data.count;

  useEffect(() => {
    window.scrollTo({ behavior: 'smooth', top: 0 });
  }, [allCategories]);

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

  const categoriesContent = (
    <>
      <ul className="grid w-full grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
        <button
          type="button"
          onClick={showCategoryFormHandler}
          className="flex min-h-[6rem] w-full cursor-pointer flex-col items-center justify-center gap-y-1 rounded border-2 border-dashed border-orange-100 py-4 text-sm font-semibold text-orange-100"
        >
          <Plus fill="#FF844B" className="h-5 w-5" /> Add Category
        </button>
        {allCategories?.map((category) => {
          return <CategoryItem {...category} key={category.id} />;
        })}
      </ul>
      {categoriesCount > pageSize && (
        <Pagination
          currentPage={currentPage}
          totalCount={categoriesCount}
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
                  setSearchCategories('');
                }}
              >
                <MdArrowBack className="text-xl" />
              </button>
            )}
            <h1 className="categoryBaffle text-lg font-bold">Category</h1>
          </div>
          <Search name="Categories" onSearchValue={searchValueHandler} />
        </div>
        {categoriesCount > 0 && (
          <Sort
            className="flex items-center justify-end"
            onSetSort={setSortCategories}
            onSort={sortCategories}
          />
        )}
        {isErrorCategories && (
          <p className="text-center text-lg font-semibold text-red-600">
            {(errorCategories instanceof AxiosError &&
              errorCategories.response?.data.message) ||
              errorCategories?.message}
          </p>
        )}
        {isLoadingCategories && (
          <p className="text-center text-lg font-semibold">Loading...</p>
        )}
        {!isErrorCategories && !isLoadingCategories && categoriesContent}
      </section>
      <CategoryForm
        onShowCategoryForm={showCategoryForm}
        onSetShowCategoryForm={setShowCategoryForm}
      />
    </>
  );
};

export default Category;
