import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as Plus } from '../assets/icons/uil_plus.svg';
import { ReactComponent as Trash } from '../assets/icons/uil_trash-alt.svg';
import { ReactComponent as View } from '../assets/icons/uil_clipboard-notes.svg';

import CategoryForm from '../components/Category/CategoryForm';
import Alert from '../components/UI/Alert';
import { useCategory, useAuth } from '../hooks/useStoreContext';
import useAxios from '../hooks/useAxios';

const Category = () => {
  const { authToken } = useAuth();
  const {
    categories,
    getAllCategory,
    alertCategory,
    setAlertCategory,
    deleteCategory,
  } = useCategory();
  const { requestHttp } = useAxios();
  const [showCategoryForm, setShowCategoryForm] = useState(false);

  useEffect(() => {
    window.scrollTo({ behavior: 'smooth', top: 0 });
    requestHttp(
      {
        method: 'GET',
        url: '/categories',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      },
      (data) => {
        console.log(data);
        getAllCategory(data.data?.categories);
      }
    );
  }, [requestHttp, authToken, getAllCategory]);

  const showCategoryFormHandler = () => {
    setShowCategoryForm((prevState) => !prevState);
  };

  const categoryDeleteHandler = (id) => {
    requestHttp(
      {
        method: 'DELETE',
        url: `/categories/${id}`,
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      },
      (data) => {
        console.log(data);
        deleteCategory(data, id);
      }
    );
  };

  return (
    <>
      {alertCategory.isSuccess && (
        <Alert
          className="alert-success"
          children={alertCategory.successMessage}
          onSuccess={alertCategory.isSuccess}
          onSetSuccess={setAlertCategory}
          icons="success"
        />
      )}
      <section className="flex min-h-screen flex-col gap-y-6 py-6">
        <h1 className="font-bold">Category</h1>
        <ul className="grid w-full grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
          <button
            type="button"
            onClick={showCategoryFormHandler}
            className="min-h-16 flex w-full cursor-pointer flex-col items-center justify-center gap-y-1 rounded border-2 border-dashed border-orange-100 text-sm font-semibold text-orange-100"
          >
            <Plus fill="#FF844B" className="h-5 w-5" /> Add Category
          </button>
          {categories.map((category) => {
            return (
              <li key={category.id}>
                <div
                  className={`min-h-16 flex w-full flex-col items-start justify-start gap-y-4 overflow-auto rounded-md bg-green-100 p-4`}
                >
                  {/* <img
                      src={category.image}
                      alt="category-img"
                      loading="lazy"
                    /> */}
                  <span className="text-md break-words font-medium text-neutral-700">
                    {category.name}
                  </span>
                  <div className="flex w-full flex-row items-center justify-end gap-x-2">
                    <Link to={category.id.toString()} className="inline">
                      <View className="h-5 w-5" fill="#FF844B" />
                    </Link>
                    <button
                      type="button"
                      onClick={categoryDeleteHandler.bind(this, category.id)}
                    >
                      <Trash className="h-5 w-5" fill="#FE6565" />
                    </button>
                  </div>
                </div>
              </li>
            );
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
