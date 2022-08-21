import React from 'react';
import TodoProvider from '../context/TodoProvider';
import CategoryProvider from '../context/CategoryProvider';
import AuthProvider from '../context/AuthProvider';
import LoginFormProvider from '../context/LoginFormProvider';

const useContextProvider = ({ children }) => {
  return (
    <AuthProvider>
      <LoginFormProvider>
        <TodoProvider>
          <CategoryProvider>{children}</CategoryProvider>
        </TodoProvider>
      </LoginFormProvider>
    </AuthProvider>
  );
};

export default useContextProvider;
