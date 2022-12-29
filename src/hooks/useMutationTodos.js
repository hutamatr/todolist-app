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
        if (error instanceof AxiosError) {
          mutationOnError(error?.response.data.message);
        } else {
          mutationOnError(error?.message);
        }
      }
    },
  });
};

export default useMutationTodos;
