import { useQuery } from '@tanstack/react-query';
import useHttp from './useHttp';
import { AxiosError } from 'axios';

const useQueryTodos = (
  queryTodosKey,
  queryTodosFn,
  queryOnSuccess,
  queryOnError
) => {
  const { requestHttp } = useHttp();
  const { method, url, data } = queryTodosFn;

  return useQuery({
    queryKey: [queryTodosKey],
    queryFn: () => {
      return requestHttp({
        method,
        url,
        data,
      });
    },
    onSuccess: (data) => {
      if (queryOnSuccess) {
        queryOnSuccess(data);
      }
    },
    onError: (error) => {
      if (queryOnError) {
        if (error instanceof AxiosError) {
          queryOnError(error?.response.data.message);
        } else {
          queryOnError(error?.message);
        }
      }
    },
  });
};

export default useQueryTodos;
