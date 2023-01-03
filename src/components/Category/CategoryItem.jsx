import { useQueryClient } from '@tanstack/react-query';

import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

import { randIcons } from '../../utils/categoryIcons';
import useMutationTodos from '../../hooks/useMutationTodos';

import { ReactComponent as Trash } from '../../assets/icons/uil_trash-alt.svg';
import { ReactComponent as View } from '../../assets/icons/uil_clipboard-notes.svg';

const CategoryItem = ({ id, name }) => {
  const queryClient = useQueryClient();

  const { mutate: mutateDelete } = useMutationTodos(
    { method: 'DELETE', url: `/categories` },
    (data) => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
    (error) => {
      toast.error(error);
    }
  );
  const categoryDeleteHandler = () => {
    mutateDelete(id);
  };
  return (
    <li>
      <div
        className={`grid min-h-full w-full gap-y-2 overflow-auto rounded-md bg-green-100 p-4`}
      >
        <img
          src={randIcons()}
          className="w-8"
          alt="category-img"
          loading="lazy"
        />
        <span className="break-all font-medium text-neutral-700">{name}</span>
        <div className="flex w-full flex-row items-center justify-end gap-x-2">
          <Link to={`${id}`} className="inline">
            <View className="h-5 w-5" fill="#FF844B" />
          </Link>
          <button type="button" onClick={categoryDeleteHandler}>
            <Trash className="h-5 w-5" fill="#FE6565" />
          </button>
        </div>
      </div>
    </li>
  );
};

export default CategoryItem;
