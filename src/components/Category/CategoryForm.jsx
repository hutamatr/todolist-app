import React, { useState } from 'react';

import Modal from '../UI/Modal';
import Alert from '../UI/Alert';
import useAxios from '../../hooks/useAxios';
import { useCategory, useAuth } from '../../hooks/useStoreContext';

const CategoryForm = ({ onShowCategoryForm, onSetShowCategoryForm }) => {
  const { addCategory } = useCategory();
  const { authToken } = useAuth();
  const { requestHttp, error, setError } = useAxios();
  const [categoryName, setCategoryName] = useState('');

  let isInputEmpty = false;

  if (categoryName) {
    isInputEmpty = true;
  }

  const categoryNameChangeHandler = (event) => {
    setCategoryName(event.target.value);
  };

  const categoryCancelHandler = () => {
    onSetShowCategoryForm(false);
    setCategoryName('');
  };

  const categorySubmitHandler = (event) => {
    event.preventDefault();

    const newCategory = {
      name: categoryName,
      image: null,
    };

    requestHttp(
      {
        method: 'POST',
        url: '',
        dataRequest: newCategory,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      },
      (data) => {
        console.log(data);
      }
    );

    // addCategory(newCategory);

    onSetShowCategoryForm(false);
    setCategoryName('');
  };

  return (
    <>
      {error.isError && (
        <Alert
          className={'alert-error'}
          children={error.errorMessage}
          onError={error.isError}
          onSetError={setError}
          icons="error"
        />
      )}
      {/* {success.isSuccess && (
        <Alert
          className={'alert-success'}
          children={success.successMessage}
          onSuccess={success.isSuccess}
          onSetSuccess={setSuccess}
          icons="success"
        />
      )} */}
      {onShowCategoryForm && (
        <Modal>
          <h1 className="mb-4 font-bold">Create Category</h1>
          <form
            onSubmit={categorySubmitHandler}
            className="flex flex-col gap-y-4"
          >
            <label
              htmlFor="category-name"
              className="text-sm after:ml-1 after:text-red-500 after:content-['*']"
            >
              Category Name
            </label>
            <textarea
              name="category-name"
              id="category-name"
              onChange={categoryNameChangeHandler}
              value={categoryName}
              placeholder="Write your category name..."
              className="rounded bg-neutral-200 p-2 outline-none placeholder:text-sm"
            ></textarea>
            <button
              className="block cursor-pointer rounded bg-orange-100 p-2 font-semibold text-white disabled:bg-orange-50"
              disabled={!isInputEmpty}
            >
              Create Category
            </button>

            <button
              type="button"
              onClick={categoryCancelHandler}
              className="block cursor-pointer rounded p-2 font-semibold text-orange-100 disabled:bg-orange-50"
            >
              Cancel
            </button>
          </form>
        </Modal>
      )}
    </>
  );
};

export default CategoryForm;
