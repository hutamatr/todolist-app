import axios from 'axios';
import { useCallback } from 'react';

import { useAuth } from './useStoreContext';

const todosAPI = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
});

const useHttp = () => {
  const { authToken } = useAuth();

  const requestHttp = useCallback(
    async (configHttp) => {
      const { method, url, data, headers } = configHttp;
      const response = await todosAPI({
        method,
        url,
        data,
        headers: {
          ...headers,
          Authorization: `Bearer ${authToken}`,
        },
      });

      return response;
    },
    [authToken]
  );

  return { requestHttp };
};

export default useHttp;
