import { useState } from 'react';
import { AxiosError } from 'axios';

import useCreateCategory from 'hooks/useCreateCategory';

import { MdAdd } from 'react-icons/md';

const categoryLong = 100;

const DashboardFormCategory = ({
  isCategoryNotAdded,
  // setIsCategoryNotAdded,
  isErrorCategories,
  isLoadingCategories,
  errorCategories,
  dataCategories,
  categoryId,
  onSetCategoryId,
}) => {
  const [isCreateCategoryShow, setIsCreateCategoryShow] = useState(false);

  const { categoryName, categorySubmitHandler, categoryNameChangeHandler } =
    useCreateCategory();

  const addNewCategoryHandler = () => {
    setIsCreateCategoryShow((prevState) => !prevState);
  };

  const addCategoryItemHandler = (id) => {
    onSetCategoryId(id);
    setIsCreateCategoryShow(false);
  };

  return (
    <>
      <label
        htmlFor="category"
        className="flex flex-col text-sm dark:text-material-green"
      >
        Category
      </label>

      {isCategoryNotAdded && (
        <p className="text-center text-sm font-medium text-red-600">
          Category must be added!
        </p>
      )}

      {isCreateCategoryShow && (
        <div className="mx-auto flex max-w-fit flex-col justify-center gap-y-1">
          <span className="text-xs font-semibold dark:text-material-green">
            {0 + categoryName.length}/{categoryLong}
          </span>
          <div className="flex flex-row items-center justify-center">
            <input
              type="text"
              name="category"
              id="category"
              onChange={categoryNameChangeHandler}
              value={categoryName}
              placeholder="Add new category"
              className="rounded-l-lg bg-neutral-200 p-2 outline-none placeholder:text-sm dark:bg-neutral-800 dark:text-material-green"
            />
            <button
              onClick={categorySubmitHandler}
              className="rounded-r-lg bg-orange-100 py-2 px-3 font-medium text-material-green"
            >
              Add
            </button>
          </div>
        </div>
      )}

      {isErrorCategories && (
        <p className="text-center font-medium text-red-600">
          {errorCategories instanceof AxiosError &&
            errorCategories.response?.data.message}
        </p>
      )}
      {isLoadingCategories && (
        <p className="text-center font-medium dark:text-material-green">
          Loading...
        </p>
      )}
      <ul className="grid max-h-40 w-full grid-cols-2 gap-2 overflow-y-auto p-2">
        <button
          className={`flex w-full items-center justify-center gap-x-1 rounded border-2 py-3 text-sm font-semibold ${
            isCreateCategoryShow
              ? 'border-orange-100 bg-orange-200 font-bold text-orange-600'
              : 'border-dashed border-neutral-400 bg-neutral-200 dark:border-material-green dark:bg-neutral-800 dark:text-material-green'
          }`}
          type="button"
          onClick={addNewCategoryHandler}
        >
          {isCreateCategoryShow ? (
            'Cancel'
          ) : (
            <>
              <MdAdd className="text-xl" />
              Add Category
            </>
          )}
        </button>
        {dataCategories?.map((categories) => {
          return (
            <li key={categories.id}>
              <button
                type="button"
                className={`w-full truncate rounded bg-neutral-200 py-3 px-3 text-sm font-medium  dark:bg-neutral-800 dark:text-material-green ${
                  categoryId
                    ? 'focus:bg-orange-200 focus:text-orange-600 focus:ring-2 focus:ring-orange-100 dark:focus:ring-orange-100'
                    : ''
                }`}
                onClick={addCategoryItemHandler.bind(null, categories.id)}
                required
              >
                {categories.name}
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default DashboardFormCategory;
