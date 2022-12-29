import { AxiosError } from 'axios';
import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';

import { ReactComponent as Plus } from '../assets/icons/uil_plus.svg';

import CategoryForm from '../components/Category/CategoryForm';
import CategoryItem from '../components/Category/CategoryItem';
import useQueryTodos from '../hooks/useQueryTodos';

const Category = () => {
  const [showCategoryForm, setShowCategoryForm] = useState(false);

  const {
    data: dataCategories,
    isError: isErrorCategories,
    isLoading: isLoadingCategories,
    error: errorCategories,
  } = useQueryTodos('categories', {
    method: 'GET',
    url: '/categories',
  });

  useEffect(() => {
    window.scrollTo({ behavior: 'smooth', top: 0 });
  }, []);

  const showCategoryFormHandler = () => {
    setShowCategoryForm((prevState) => !prevState);
  };

  return (
    <>
      <Toaster position="top-center" />
      <section className="flex min-h-screen flex-col gap-y-6 py-6">
        <h1 className="font-bold">Category</h1>
        {isErrorCategories && (
          <p className="text-center text-lg font-semibold text-red-600">{`${
            errorCategories instanceof AxiosError &&
            errorCategories.response.data.message
          }`}</p>
        )}
        {isLoadingCategories && (
          <p className="text-center text-lg font-semibold">Loading...</p>
        )}
        <ul className="grid w-full grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
          <button
            type="button"
            onClick={showCategoryFormHandler}
            className="min-h-16 flex w-full cursor-pointer flex-col items-center justify-center gap-y-1 rounded border-2 border-dashed border-orange-100 py-4 text-sm font-semibold text-orange-100"
          >
            <Plus fill="#FF844B" className="h-5 w-5" /> Add Category
          </button>
          {dataCategories?.data.data.categories.map((category) => {
            return <CategoryItem {...category} key={category.id} />;
          })}
        </ul>
      </section>
      <CategoryForm
        onShowCategoryForm={showCategoryForm}
        onSetShowCategoryForm={setShowCategoryForm}
      />
    </>
  );
};

export default Category;
