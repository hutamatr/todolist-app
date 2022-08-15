import React from 'react';
import TodoProvider from '../context/TodoProvider';
import AuthProvider from '../context/AuthProvider';
import LoginFormProvider from '../context/LoginFormProvider';

const useContextProvider = ({ children }) => {
  return (
    <AuthProvider>
      <LoginFormProvider>
        <TodoProvider>{children}</TodoProvider>
      </LoginFormProvider>
    </AuthProvider>
  );
};

export default useContextProvider;
