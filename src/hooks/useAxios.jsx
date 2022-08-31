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

  const [success, setSuccess] = useState({
    isSuccess: false,
    successMessage: '',
  });

  const requestHttp = useCallback(
    async (requestConfig, setRequestData, successData) => {
      setLoading({
        isLoading: true,
        loadingMessage: 'Loading...',
      });
      try {
        const { method, url, dataReq, headers } = requestConfig;
        const response = await axios({
          method: method,
          url: BASE_URL + url,
          data: dataReq ? dataReq : null,
          headers: headers
            ? headers
            : {
                'Content-type': 'application/json',
              },
        });

        const data = await response.data;

        setRequestData(data);
        setSuccess({
          isSuccess: true,
          successMessage: successData,
        });
      } catch (error) {
        console.log(error.response);
        if (!error.response) {
          setError({
            isError: true,
            errorMessage: 'No Server Response!',
          });
        } else {
          setError({
            isError: true,
            errorMessage: 'Login Failed!',
          });
        }
      }
      setLoading({
        isLoading: false,
        loadingMessage: '',
      });
      setSuccess({
        isSuccess: false,
        successMessage: '',
      });
    },
    []
  );

  return {
    requestHttp,
    error,
    setError,
    success,
    setSuccess,
    loading,
  };
};

export default useAxios;
