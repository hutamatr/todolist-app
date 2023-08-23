import { useCallback, useEffect, useMemo, useReducer } from 'react';

import { AuthContext } from './Context';

const calculateAutoLogoutTime = (expireDate) => {
  const currentTimeInMilliseconds = new Date().getTime();
  const expireTimeInMilliseconds = new Date(expireDate).getTime();

  const remainingAutoLogoutTime =
    expireTimeInMilliseconds - currentTimeInMilliseconds;

  return remainingAutoLogoutTime;
};

const getStorageItems = () => {
  const authToken = localStorage.getItem('auth_token');
  const expireToken = localStorage.getItem('expire_token');

  const remainingTime = calculateAutoLogoutTime(expireToken);

  if (remainingTime <= 6000) {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('expire_token');
    return null;
  }
  return {
    authToken,
    remainingTime,
  };
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'AUTH': {
      const authToken = action.payload;
      let isAuth;
      if (authToken) isAuth = !!authToken;

      return {
        ...state,
        authToken: authToken,
        isAuthenticated: isAuth,
      };
    }
    case 'LOGOUT': {
      return {
        ...state,
        authToken: null,
        isAuthenticated: false,
      };
    }
    default: {
      const localStorageToken = getStorageItems();
      return {
        authToken: localStorageToken?.authToken,
        isAuthenticated: !!localStorageToken.authToken,
      };
    }
  }
};

let logoutTimer = null;

const AuthProvider = ({ children }) => {
  const storageData = getStorageItems();
  let localStorageToken = null;
  if (storageData) localStorageToken = storageData.authToken;
  const [authState, dispatchAuth] = useReducer(authReducer, {
    authToken: localStorageToken,
    isAuthenticated: !!localStorageToken,
  });

  const logoutHandler = useCallback(() => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('expire_token');
    dispatchAuth({ type: 'LOGOUT' });

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const authHandler = useCallback(
    (loginAccess, expireDate) => {
      localStorage.setItem('auth_token', loginAccess?.data?.token);
      localStorage.setItem('expire_token', expireDate);
      dispatchAuth({ type: 'AUTH', payload: loginAccess?.data?.token });

      const autoLogout = calculateAutoLogoutTime(expireDate);
      logoutTimer = setTimeout(logoutHandler, autoLogout);
    },
    [logoutHandler]
  );

  const setAuthState = useCallback((token) => {
    dispatchAuth({ type: 'AUTH', payload: token });
  }, []);

  useEffect(() => {
    if (storageData) {
      logoutTimer = setTimeout(logoutHandler, storageData.remainingTime);
    }
  }, [storageData, logoutHandler]);

  const value = useMemo(
    () => ({
      authToken: authState.authToken,
      isAuthenticated: authState.isAuthenticated,
      auth: authHandler,
      logout: logoutHandler,
      setAuth: setAuthState,
    }),
    [
      authState.authToken,
      authState.isAuthenticated,
      authHandler,
      logoutHandler,
      setAuthState,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
