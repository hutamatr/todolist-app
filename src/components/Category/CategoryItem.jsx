import { Link } from 'react-router-dom';

import { randIcons } from 'utils/categoryIcons';

import { MdDeleteForever, MdFolderOpen } from 'react-icons/md';

const CategoryItem = ({ id, name, onDelete }) => {
  const categoryDeleteHandler = () => {
    onDelete(id);
  };

  return (
    <li>
      <div className="grid min-h-full w-full gap-y-2 overflow-auto rounded-md border-[1.5px] border-blue-300 bg-material-green p-4 shadow-material-shadow-3 dark:border-orange-200 dark:bg-neutral-700">
        <img
          src={randIcons()}
          className="w-8"
          alt="category-img"
          loading="lazy"
        />
        <p className="break-all font-medium text-neutral-600 dark:text-material-green">
          {name}
        </p>
        <div className="flex w-full flex-row items-center justify-end gap-x-2">
          <Link to={`${id}`} className="inline">
            <MdFolderOpen className="text-2xl text-orange-100" />
          </Link>
          <button
            data-testid="delete-category"
            type="button"
            onClick={categoryDeleteHandler}
          >
            <MdDeleteForever className="text-2xl text-red-600" />
          </button>
        </div>
      </div>
    </li>
  );
};

export default CategoryItem;
