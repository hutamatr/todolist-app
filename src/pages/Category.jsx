import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as Plus } from '../assets/icons/uil_plus.svg';

import { useCategory } from '../hooks/useStoreContext';
import CategoryForm from '../components/Category/CategoryForm';

const Category = () => {
  const { categories } = useCategory();
  const [showCategoryForm, setShowCategoryForm] = useState(false);

  const showCategoryFormHandler = () => {
    setShowCategoryForm((prevState) => !prevState);
  };

  return (
    <>
      <section className="flex min-h-screen flex-col gap-y-6 py-6">
        <h1 className="font-bold">Category</h1>
        <ul className="grid w-full grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
          {categories.map((category) => {
            return (
              <li key={category.id}>
                <Link to={category.id.toString()}>
                  <button
                    type="button"
                    className={`flex h-full w-full flex-col items-start justify-end gap-y-3 rounded-md bg-green-100 p-4`}
                  >
                    <img
                      src={category.image}
                      alt="category-img"
                      loading="lazy"
                    />
                    <span className="font-semibold text-white">
                      {category.name}
                    </span>
                  </button>
                </Link>
              </li>
            );
          })}
          <button
            type="button"
            onClick={showCategoryFormHandler}
            className="flex w-full cursor-pointer flex-col items-center justify-center gap-y-1 rounded border-2 border-dashed border-orange-100 text-sm font-semibold text-orange-100"
          >
            <Plus fill="#FF844B" className="h-5 w-5" /> Add Category
          </button>
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
