import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Toaster } from 'react-hot-toast';

import Home from 'components/Home/Home';
import useHttp from 'hooks/useHttp';
import { useTodos } from 'hooks/useStoreContext';
import errorQuery from 'utils/errorQuery';

const HomePage = () => {
  const { getTotalTodo } = useTodos();
  const { requestHttp } = useHttp();

  const {
    isLoading: isLoadingTotalTodos,
    isError: isErrorTotalTodos,
    error: errorTotalTodos,
  } = useQuery({
    queryKey: ['total-todos'],
    queryFn: () => {
      return requestHttp({
        method: 'GET',
        url: '/home',
      });
    },
    onSuccess: (data) => {
      getTotalTodo(data?.data.data);
    },
    onError: (error) => {
      errorQuery(error, 'Get Total Todos Failed!');
    },
  });

  const { data: userDetailData } = useQuery({
    queryKey: ['user'],
    queryFn: () => {
      return requestHttp({
        method: 'GET',
        url: '/accounts/profile',
      });
    },
    onError: (error) => {
      errorQuery(error, 'Get User Detail Failed!');
    },
  });

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 1500,
        }}
      />
      {isErrorTotalTodos && (
        <p className="flex min-h-[50vh] items-center justify-center text-center text-lg font-semibold text-red-600">
          {errorTotalTodos instanceof AxiosError && errorTotalTodos.message}
        </p>
      )}

      {isLoadingTotalTodos && (
        <p className="flex min-h-[50vh] items-center justify-center text-center text-lg font-semibold">
          Loading...
        </p>
      )}

      {!isErrorTotalTodos && !isLoadingTotalTodos && (
        <Home username={userDetailData?.data.data.user.username} />
      )}
    </>
  );
};

export default HomePage;
