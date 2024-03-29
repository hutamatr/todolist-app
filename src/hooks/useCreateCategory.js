import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import useHttp from './useHttp';
import errorQuery from 'utils/errorQuery';
import { useModal } from './useStoreContext';
import { randIcons } from 'utils/categoryIcons';

const categoryLong = 100;

const useCreateCategory = () => {
  const queryClient = useQueryClient();
  const { pathname } = useLocation();
  const { requestHttp } = useHttp();
  const [categoryName, setCategoryName] = useState('');

  const { setShowModal } = useModal();

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

    if (!categoryName || categoryName.trim() === '') {
      return;
    }

    const newCategory = {
      name: categoryName,
      icon: randIcons,
    };

    mutateCategory(newCategory);

    if (pathname === '/category') {
      setShowModal(false);
    }

    setCategoryName('');
  };

  return {
    isInputEmpty,
    categoryName,
    categoryNameChangeHandler,
    categoryCancelHandler,
    categorySubmitHandler,
  };
};

export default useCreateCategory;
