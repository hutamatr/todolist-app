import React, { useState } from 'react';

import { LoginFormContext } from './Context';

const LoginFormProvider = ({ children }) => {
  const [isLoginScreen, setIsLoginScreen] = useState(true);

  const loginScreenHandler = () => {
    setIsLoginScreen((prevState) => !prevState);
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
