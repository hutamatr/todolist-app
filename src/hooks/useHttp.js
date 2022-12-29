import { useCallback } from 'react';
import axios from 'axios';

import { useAuth } from './useStoreContext';

const todosAPI = axios.create({
  baseURL: 'http://localhost:8002/api/v1',
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
          'Content-type': 'application/json; charset=UTF-8',
        },
      });

      if (response.status > 400) {
        throw new Error('Failed get todo data');
      }

      return response;
    },
    [authToken]
  );

  return { requestHttp };
};

export default useHttp;
