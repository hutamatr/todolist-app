import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import useHttp from './useHttp';

const useMutationTodos = (
  useMutationFn,
  mutationOnSuccess,
  mutationOnError,
  mutationOnSettled
) => {
  const { requestHttp } = useHttp();

  const { method, url } = useMutationFn;

  return useMutation({
    mutationFn: (mutationData) => {
      return requestHttp({
        method,
        url:
          typeof mutationData === 'number' || typeof mutationData === 'string'
            ? `${url}/${mutationData}`
            : url,
        data: typeof mutationData === 'object' ? mutationData : null,
      });
    },
    onSuccess: (data) => {
      if (mutationOnSuccess) {
        mutationOnSuccess(data);
      }
    },
    onSettled: (data) => {
      if (mutationOnSettled) {
        mutationOnSettled(data);
      }
    },
    onError: (error) => {
      if (mutationOnError) {
        if (error instanceof AxiosError && error.response.data) {
          mutationOnError(error?.response.data.message);
        }
        if (error instanceof Error && !error.response.data) {
          mutationOnError(error?.message);
        } else {
          mutationOnError('Error!');
        }
      }
    },
  });
};

export default useMutationTodos;
