import useCreateCategory from 'hooks/useCreateCategory';

const categoryLong = 100;

const CategoryForm = () => {
  const {
    isInputEmpty,
    categoryName,
    categorySubmitHandler,
    categoryNameChangeHandler,
    categoryCancelHandler,
  } = useCreateCategory();

  return (
    <>
      <form onSubmit={categorySubmitHandler} className="flex flex-col gap-y-4">
        <div className="flex flex-row items-center justify-between dark:text-material-green">
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
        <input
          type="text"
          name="category-name"
          id="category-name"
          onChange={categoryNameChangeHandler}
          value={categoryName}
          placeholder="Write your category name..."
          className="rounded bg-neutral-200 p-2 outline-none placeholder:text-sm dark:bg-neutral-800 dark:text-material-green"
        />

        <button
          className="block cursor-pointer rounded bg-orange-100 p-2 font-semibold text-material-green disabled:cursor-not-allowed disabled:bg-orange-50 dark:text-neutral-800"
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
    </>
  );
};

export default CategoryForm;
