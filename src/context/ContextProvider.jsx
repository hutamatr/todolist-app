import React from 'react';
import TodoProvider from './TodoProvider';
import CategoryProvider from './CategoryProvider';
import AuthProvider from './AuthProvider';
import LoginFormProvider from './LoginFormProvider';

const ContextProvider = ({ children }) => {
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

export default ContextProvider;
