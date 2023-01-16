import { useState } from 'react';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import Modal from 'components/UI/Modal';
import useHttp from 'hooks/useHttp';
import { useModal } from 'hooks/useStoreContext';
import errorQuery from 'utils/errorQuery';
import { randIcons } from 'utils/categoryIcons';

const categoryLong = 100;

const CategoryForm = () => {
  const queryClient = useQueryClient();
  const { requestHttp } = useHttp();
  const [categoryName, setCategoryName] = useState('');

  const { isModalShow, setShowModal } = useModal();

  const { mutate: mutateCategory } = useMutation({
    mutationFn: (newCategory) => {
      return requestHttp({
        method: 'POST',
        url: '/categories',
        data: newCategory,
      });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success(data?.data.message);
    },
    onError: (error) => {
      errorQuery(error, 'Add New Category Failed!');
    },
  });

  let isInputEmpty = false;

  if (categoryName) {
    isInputEmpty = true;
  }

  const categoryNameChangeHandler = (event) => {
    setCategoryName((prevState) => {
      return event.target.value.length <= categoryLong
        ? event.target.value
        : prevState;
    });
  };

  const categoryCancelHandler = () => {
    setShowModal(false);
    setCategoryName('');
  };

  const categorySubmitHandler = (event) => {
    event.preventDefault();

    const newCategory = {
      name: categoryName,
      icon: randIcons,
    };

    mutateCategory(newCategory);

    setShowModal(false);
    setCategoryName('');
  };

  return (
    <>
      {isModalShow && (
        <Modal onCloseModalHandler={() => setShowModal(false)}>
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
                {0 + categoryName.length}/{categoryLong}
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
