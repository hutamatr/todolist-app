import { useQueryClient, useMutation } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

import useHttp from 'hooks/useHttp';
import errorQuery from 'utils/errorQuery';
import { randIcons } from 'utils/categoryIcons';

import { ReactComponent as Trash } from 'assets/icons/uil_trash-alt.svg';
import { ReactComponent as View } from 'assets/icons/uil_clipboard-notes.svg';

const CategoryItem = ({ id, name }) => {
  const queryClient = useQueryClient();
  const { requestHttp } = useHttp();

  const { mutate: mutateDelete } = useMutation({
    mutationFn: (categoryId) => {
      return requestHttp({
        method: 'DELETE',
        url: `/categories/${categoryId}`,
      });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success(data?.data.message);
    },
    onError: (error) => {
      errorQuery(error, 'Delete Todo Failed!');
    },
  });

  const categoryDeleteHandler = () => {
    mutateDelete(id);
  };

  return (
    <li>
      <div className="grid min-h-full w-full gap-y-2 overflow-auto rounded-md border-[1.5px] border-blue-300 bg-material-green p-4 shadow-material-shadow-3">
        <img
          src={randIcons()}
          className="w-8"
          alt="category-img"
          loading="lazy"
        />
        <p className="break-all font-medium text-neutral-600">{name}</p>
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
