import { useMemo, useState } from 'react';

import { LoginFormContext } from './Context';

const LoginFormProvider = ({ children }) => {
  const [isLoginScreen, setIsLoginScreen] = useState(null);

  const loginScreenHandler = (value) => {
    setIsLoginScreen(value);
  };
  const value = useMemo(
    () => ({
      onLoginScreen: isLoginScreen,
      loginScreen: loginScreenHandler,
    }),
    [isLoginScreen]
  );

  return (
    <LoginFormContext.Provider value={value}>
      {children}
    </LoginFormContext.Provider>
  );
};

export default LoginFormProvider;
