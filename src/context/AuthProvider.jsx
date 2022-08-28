import React, { useReducer } from 'react';

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
  // let storageToken;
  // if (storageTokenData) {
  //   storageToken = storageTokenData.localStorageToken;
  // }

  const [authState, dispatchAuth] = useReducer(authReducer, {
    authToken: localStorageToken,
    isAuthenticated: !!localStorageToken,
  });

  const loginHandler = (newToken) => {
    dispatchAuth({ type: 'LOGIN', payload: newToken });
  };

  const logoutHandler = () => {
    dispatchAuth({ type: 'LOGOUT' });
  };

  const value = {
    authToken: authState.authToken,
    isAuthenticated: authState.isAuthenticated,
    login: loginHandler,
    logout: logoutHandler,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
