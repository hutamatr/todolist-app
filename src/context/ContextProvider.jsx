import React from 'react';
import TodoProvider from './TodoProvider';
import AuthProvider from './AuthProvider';
import LoginFormProvider from './LoginFormProvider';
import TodoFilterProvider from './TodoFilterProvider';
import ModalProvider from './ModalProvider';

const ContextProvider = ({ children }) => {
  return (
    <AuthProvider>
      <LoginFormProvider>
        <ModalProvider>
          <TodoProvider>
            <TodoFilterProvider>{children}</TodoFilterProvider>
          </TodoProvider>
        </ModalProvider>
      </LoginFormProvider>
    </AuthProvider>
  );
};

export default ContextProvider;
