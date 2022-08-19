import React, { useState } from 'react';

import { LoginFormContext } from './Context';

const LoginFormProvider = ({ children }) => {
  const [isLoginScreen, setIsLoginScreen] = useState(null);

  const loginScreenHandler = (value) => {
    setIsLoginScreen(value);
  };
  const value = {
    onLoginScreen: isLoginScreen,
    loginScreen: loginScreenHandler,
  };

  return (
    <LoginFormContext.Provider value={value}>
      {children}
    </LoginFormContext.Provider>
  );
};

export default LoginFormProvider;
