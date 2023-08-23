import { axiosPrivate } from '@src/api/axios';
import { useCallback } from 'react';

const useHttp = () => {
  const requestHttp = useCallback(async (configHttp) => {
    const { method, url, data } = configHttp;
    const response = await axiosPrivate({
      method,
      url,
      data,
    });

    return response;
  }, []);
  return { requestHttp };
};

export default useHttp;
