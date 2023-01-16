import { useCallback } from 'react';
import axios from 'axios';

import { useAuth } from './useStoreContext';

const todosAPI = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || 'http://localhost:8002/api/v1',
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

      return response;
    },
    [authToken]
  );

  return { requestHttp };
};

export default useHttp;
