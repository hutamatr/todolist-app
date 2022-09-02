import React, { useReducer, useState } from 'react';

import { AuthContext } from './Context';

const getStorageToken = () => {
  const localStorageToken = localStorage.getItem('auth_token');
  return {
    localStorageToken,
  };
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      const authToken = action.payload;
      localStorage.setItem('auth_token', authToken);
      let isAuth;
      if (authToken) isAuth = !!authToken;

      return {
        ...state,
        authToken: authToken,
        isAuthenticated: isAuth,
      };
    case 'LOGOUT':
      localStorage.removeItem('auth_token');
      return {
        ...state,
        authToken: null,
        isAuthenticated: false,
      };
    default:
      const { localStorageToken } = getStorageToken();
      return {
        authToken: localStorageToken,
        isAuthenticated: !!localStorageToken,
      };
  }
};

const AuthProvider = ({ children }) => {
  const { localStorageToken } = getStorageToken();
  const [loginSuccess, setLoginSuccess] = useState({
    isSuccess: false,
    successMessage: '',
  });
  const [logoutSuccess, setLogoutSuccess] = useState({
    isSuccess: false,
    successMessage: '',
  });

  const [authState, dispatchAuth] = useReducer(authReducer, {
    authToken: localStorageToken,
    isAuthenticated: !!localStorageToken,
  });

  const loginHandler = (loginAccess) => {
    dispatchAuth({ type: 'LOGIN', payload: loginAccess?.data?.token });
    setLoginSuccess({
      isSuccess: loginAccess?.status,
      successMessage: loginAccess?.message,
    });
  };

  const logoutHandler = (logoutAccess) => {
    dispatchAuth({ type: 'LOGOUT' });
    setLogoutSuccess({
      isSuccess: logoutAccess.isSuccess,
      successMessage: logoutAccess.successMessage,
    });
  };

  const value = {
    authToken: authState.authToken,
    isAuthenticated: authState.isAuthenticated,
    loginSuccess,
    setLoginSuccess,
    logoutSuccess,
    setLogoutSuccess,
    login: loginHandler,
    logout: logoutHandler,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
