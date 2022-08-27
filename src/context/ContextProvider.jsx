import React from 'react';
import TodoProvider from './TodoProvider';
import CategoryProvider from './CategoryProvider';
import AuthProvider from './AuthProvider';
import LoginFormProvider from './LoginFormProvider';
import TodoFilterProvider from './TodoFilterProvider';

const ContextProvider = ({ children }) => {
  return (
    <AuthProvider>
      <LoginFormProvider>
        <TodoProvider>
          <TodoFilterProvider>
            <CategoryProvider>{children}</CategoryProvider>
          </TodoFilterProvider>
        </TodoProvider>
      </LoginFormProvider>
    </AuthProvider>
  );
};

export default ContextProvider;
