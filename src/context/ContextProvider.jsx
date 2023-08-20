import AuthProvider from './AuthProvider';
import LoginFormProvider from './LoginFormProvider';
import ModalProvider from './ModalProvider';
import TodoProvider from './TodoProvider';

const ContextProvider = ({ children }) => {
  return (
    <AuthProvider>
      <LoginFormProvider>
        <ModalProvider>
          <TodoProvider> {children}</TodoProvider>
        </ModalProvider>
      </LoginFormProvider>
    </AuthProvider>
  );
};

export default ContextProvider;
