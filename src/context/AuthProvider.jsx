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
      localStorage.setItem('auth_token', action.payload);
      let isAuth;
      if (action.payload) {
        isAuth = !!action.payload;
      }
      return {
        ...state,
        authToken: action.payload,
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
  const storageTokenData = getStorageToken();
  let storageToken;
  if (storageTokenData) {
    storageToken = storageTokenData.localStorageToken;
  }

  const [authState, dispatchAuth] = useReducer(authReducer, {
    authToken: storageToken,
    isAuthenticated: !!storageToken,
  });

  const loginHandler = (newToken) => {
    dispatchAuth({ type: 'LOGIN', payload: newToken });
  };

  const logoutHandler = () => {
    dispatchAuth({ type: 'LOGOUT' });
  };

  const value = {
    isAuthenticated: authState.isAuthenticated,
    login: loginHandler,
    logout: logoutHandler,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
