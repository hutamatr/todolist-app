import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';

import Modal from '../UI/Modal';
import useMutationTodos from '../../hooks/useMutationTodos';
import { randIcons } from '../../utils/categoryIcons';

const CategoryForm = ({ onShowCategoryForm, onSetShowCategoryForm }) => {
  const queryClient = useQueryClient();
  const [categoryName, setCategoryName] = useState('');

  const { mutate: mutateCategory } = useMutationTodos(
    { method: 'POST', url: '/categories' },
    (data) => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success(data?.data.message);
    },
    (error) => {
      toast.error(error);
    }
  );

  let isInputEmpty = false;

  if (categoryName) {
    isInputEmpty = true;
  }

  const categoryNameChangeHandler = (event) => {
    setCategoryName((prevState) => {
      return event.target.value.length <= 25 ? event.target.value : prevState;
    });
  };

  const categoryCancelHandler = () => {
    onSetShowCategoryForm(false);
    setCategoryName('');
  };

  const categorySubmitHandler = (event) => {
    event.preventDefault();

    const newCategory = {
      name: categoryName,
      icon: randIcons,
    };

    mutateCategory(newCategory);

    onSetShowCategoryForm(false);
    setCategoryName('');
  };

  return (
    <>
      {onShowCategoryForm && (
        <Modal onCloseModalHandler={() => onSetShowCategoryForm(false)}>
          <h1 className="mb-4 font-bold">Create Category</h1>
          <form
            onSubmit={categorySubmitHandler}
            className="flex flex-col gap-y-4"
          >
            <div className="flex flex-row items-center justify-between">
              <label
                htmlFor="category-name"
                className="text-sm after:ml-1 after:text-red-500 after:content-['*']"
              >
                Category Name
              </label>
              <span className="text-xs font-semibold">
                {0 + categoryName.length}/25
              </span>
            </div>
            <textarea
              name="category-name"
              id="category-name"
              onChange={categoryNameChangeHandler}
              value={categoryName}
              placeholder="Write your category name..."
              className="rounded bg-neutral-200 p-2 outline-none placeholder:text-sm"
              rows="5"
              cols="10"
            ></textarea>
            <button
              className="block cursor-pointer rounded bg-orange-100 p-2 font-semibold text-white disabled:cursor-not-allowed disabled:bg-orange-50"
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
