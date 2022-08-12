import { useState, useCallback } from "react";
import axios from "axios";

const BASE_URL = "";

const useAxios = () => {
  const [error, setError] = useState({
    isError: false,
    errorMessage: "",
  });

  const requestHttp = useCallback(async (requestConfig, setRequestData) => {
    try {
      const response = await axios({
        method: requestConfig.method,
        url: `${BASE_URL}${requestConfig.url}`,
        data: requestConfig.data ? requestConfig.data : null,
        headers: requestConfig.headers ? requestConfig.headers : {},
      });

      const data = await response.data;
      setRequestData(data);
    } catch (error) {
      if (!error.response) {
        setError({
          isError: true,
          errorMessage: "No Server Response",
        });
      } else {
        setError({
          isError: true,
          errorMessage: "Login Failed",
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
