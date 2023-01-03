import React from 'react';
import { Toaster, toast } from 'react-hot-toast';

import Home from '../components/Home/Home';
import useQueryTodos from '../hooks/useQueryTodos';
import { useTodos } from '../hooks/useStoreContext';
import { AxiosError } from 'axios';

const HomePage = () => {
  const { getTotalTodo } = useTodos();

  const {
    isLoading: isLoadingTotalTodos,
    isError: isErrorTotalTodos,
    error: errorTotalTodos,
  } = useQueryTodos(
    'total-todos',
    { method: 'GET', url: '/home' },
    (data) => {
      getTotalTodo(data?.data.data);
    },
    (error) => {
      toast.error(error);
    }
  );

  const { data: userDetailData } = useQueryTodos('user', {
    method: 'GET',
    url: '/accounts/profile',
  });

  return (
    <>
      <Toaster position="top-center" />
      {isErrorTotalTodos && (
        <p>
          {errorTotalTodos instanceof AxiosError && errorTotalTodos.message}
        </p>
      )}

      {isLoadingTotalTodos && <p>Loading...</p>}

      {!isErrorTotalTodos && !isLoadingTotalTodos && (
        <Home username={userDetailData?.data.data.user.username} />
      )}
    </>
  );
};

export default HomePage;
