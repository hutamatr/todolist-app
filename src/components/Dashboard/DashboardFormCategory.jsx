import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

import { useModal } from 'hooks/useStoreContext';
import CategoryForm from 'components/Category/CategoryForm';

import { ReactComponent as Plus } from 'assets/icons/uil_plus.svg';

const DashboardFormCategory = ({
  isCategoryNotAdded,
  setIsCategoryNotAdded,
  isErrorCategories,
  isLoadingCategories,
  errorCategories,
  dataCategories,
  todoEdit,
  category,
  onCategoryHandler,
}) => {
  const navigate = useNavigate();

  const { setShowModal } = useModal();

  const addNewCategoryHandler = () => {
    // navigate('/category');
    // setShowModal(true);
    setIsCategoryNotAdded(true);
  };

  return (
    <>
      <label htmlFor="category" className="flex flex-col text-sm">
        Category
      </label>
      {isCategoryNotAdded && (
        <p className="text-center text-sm font-medium text-red-600">
          Category must be added!
        </p>
      )}

      {isCategoryNotAdded && !category.id && (
        <form
          // onSubmit={categorySubmitHandler}
          className="flex flex-col gap-y-4"
        >
          <div className="flex flex-row items-center justify-between">
            <span className="text-xs font-semibold">
              {/* {0 + categoryName.length}/{categoryLong} */}
              100
            </span>
          </div>
          <input
            type="text"
            name="category-name"
            id="category-name"
            // onChange={categoryNameChangeHandler}
            // value={categoryName}
            placeholder="Write your category name..."
            className="rounded bg-neutral-200 p-2 outline-none placeholder:text-sm"
          />

          <button
            className="block cursor-pointer rounded bg-orange-100 p-2 font-semibold text-white disabled:cursor-not-allowed disabled:bg-orange-50"
            // disabled={!isInputEmpty}
          >
            Create Category
          </button>

          <button
            type="button"
            // onClick={categoryCancelHandler}
            className="block cursor-pointer rounded p-2 font-semibold text-orange-100 disabled:bg-orange-50"
          >
            Cancel
          </button>
        </form>
      )}

      {isErrorCategories && (
        <p className="text-center font-medium text-red-600">
          {errorCategories instanceof AxiosError &&
            errorCategories.response?.data.message}
        </p>
      )}
      {isLoadingCategories && (
        <p className="text-center font-medium">Loading...</p>
      )}
      <ul className="grid max-h-40 w-full grid-cols-2 gap-2 overflow-y-auto p-2">
        <button
          className="flex w-full items-center justify-center gap-x-1 rounded border-2 border-dashed border-neutral-400 bg-neutral-200 py-3 text-xs"
          type="button"
          onClick={addNewCategoryHandler}
        >
          <Plus fill="#707175" /> Add Category
        </button>
        {dataCategories?.map((categories) => {
          return (
            <li key={categories.id}>
              <button
                type="button"
                onFocus={() => todoEdit.category_id === categories.id}
                className={`w-full rounded bg-neutral-200 py-3 text-xs font-medium ring-1 ring-neutral-400 ${
                  todoEdit.category_id === categories.id &&
                  'bg-orange-10 text-orange-100 ring-orange-100'
                } ${
                  category &&
                  'focus:bg-orange-10 focus:text-orange-100 focus:ring-orange-100'
                }`}
                onClick={onCategoryHandler.bind(null, categories.id)}
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
