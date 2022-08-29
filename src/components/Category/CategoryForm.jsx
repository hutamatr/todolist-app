import React, { useState } from 'react';

import { useCategory } from '../../hooks/useStoreContext';
import Modal from '../UI/Modal';

const CategoryForm = ({ onShowCategoryForm, onSetShowCategoryForm }) => {
  const [categoryName, setCategoryName] = useState('');
  const [isInputEmpty, setIsInputEmpty] = useState(false);

  const { addCategory } = useCategory();

  const categoryNameChangeHandler = (event) => {
    setCategoryName(event.target.value);
  };

  const categoryCancelHandler = () => {
    onSetShowCategoryForm(false);
    setCategoryName('');
  };

  const categorySubmitHandler = (event) => {
    event.preventDefault();

    if (categoryName.length === 0) {
      return setIsInputEmpty(true);
    }

    const newCategory = {
      id: Date.now(),
      name: categoryName,
      image: null,
    };

    addCategory(newCategory);

    onSetShowCategoryForm(false);
    setCategoryName('');
  };

  return (
    <>
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
            <button>
              <label
                htmlFor="my-modal-6"
                className="block cursor-pointer rounded bg-orange-100 p-2 font-semibold text-white disabled:bg-orange-50"
                disabled={isInputEmpty}
              >
                Create Category
              </label>
            </button>

            <button type="button" onClick={categoryCancelHandler}>
              <label
                htmlFor="my-modal-6"
                className="block cursor-pointer rounded p-2 font-semibold text-orange-100 disabled:bg-orange-50"
                disabled={isInputEmpty}
              >
                Cancel
              </label>
            </button>
          </form>
        </Modal>
      )}
    </>
  );
};

export default CategoryForm;
