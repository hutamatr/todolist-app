import { useState, useCallback } from 'react';
import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/v1';

const useAxios = () => {
  const [error, setError] = useState({
    isError: false,
    errorMessage: '',
  });
  const [loading, setLoading] = useState({
    isLoading: false,
    loadingMessage: '',
  });

  const requestHttp = useCallback(async (requestConfig, setRequestData) => {
    setLoading({
      isLoading: true,
      loadingMessage: 'Loading...',
    });
    try {
      const { method, url, dataRequest, headers } = requestConfig;
      const response = await axios({
        method: method,
        url: BASE_URL + url,
        data: dataRequest ? dataRequest : null,
        headers: headers
          ? headers
          : {
              'Content-type': 'application/json',
            },
      });

      if (response.status !== 200) {
        throw new Error(response.data?.error);
      }

      const data = await response.data;

      setRequestData(data);
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        setError({
          isError: true,
          errorMessage: error.message,
        });
      } else {
        setError({
          isError: true,
          errorMessage: error.message,
        });
      }
    }
    setLoading({
      isLoading: false,
      loadingMessage: '',
    });
  }, []);

  return {
    requestHttp,
    error,
    setError,
    loading,
  };
};

export default useAxios;
