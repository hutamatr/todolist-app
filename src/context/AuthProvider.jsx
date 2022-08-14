import React, { useReducer } from "react";

import { AuthContext } from "./Context";

const initState = {
  authToken: null,
  isAuthenticated: true, // default is false
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("auth_token", JSON.stringify(action.payload.token));
      return {
        ...state,
        authToken: action.payload.token,
        isAuthenticated: true,
      };
    case "LOGOUT":
      localStorage.removeItem("auth_token");
      return {
        ...state,
        isAuthenticated: false,
        authToken: null,
      };
    default:
      return initState;
  }
};

const AuthProvider = ({ children }) => {
  const [authState, dispatchAuth] = useReducer(authReducer, initState);

  const loginHandler = (newToken) => {
    dispatchAuth({ type: "LOGIN", payload: newToken });
  };

  const logoutHandler = () => {
    dispatchAuth({ type: "LOGOUT" });
  };

  const value = {
    isAuthenticated: authState.isAuthenticated,
    login: loginHandler,
    logout: logoutHandler,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
