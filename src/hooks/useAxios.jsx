import { useState, useCallback } from 'react';
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8010/proxy/api/v1',
});

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
    try {
      setLoading({
        isLoading: true,
        loadingMessage: 'Loading...',
      });
      const { method, url, dataRequest, headers } = requestConfig;
      const response = await API({
        method: method,
        url: url,
        data: dataRequest ? dataRequest : null,
        headers: {
          ...headers,
          // 'Access-Control-Allow-Origin': '*',
          'Content-type': 'application/json',
        },
      });

      console.log(response);

      const data = await response.data;

      setRequestData(data);
    } catch (error) {
      console.log(error);
      if (error.response.data) {
        setError({
          isError: true,
          errorMessage: error.response?.data?.message,
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
