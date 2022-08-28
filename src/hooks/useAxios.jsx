import { useState, useCallback } from 'react';
import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/v1';

const useAxios = () => {
  const [error, setError] = useState({
    isError: false,
    errorMessage: '',
  });

  const requestHttp = useCallback(async (requestConfig, setRequestData) => {
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
    } catch (error) {
      if (!error.response) {
        setError({
          isError: true,
          errorMessage: 'No Server Response',
        });
      } else {
        setError({
          isError: true,
          errorMessage: 'Login Failed',
        });
      }
    }
  }, []);

  return {
    requestHttp,
    error,
  };
};

export default useAxios;
