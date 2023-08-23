import { createContext } from 'react';

export const TodoContext = createContext({
  todoEdit: {},
  totalAllTodos: {},
  getTotalTodo: () => {},
  editTodo: () => {},
});

export const AuthContext = createContext({
  authToken: '',
  isAuthenticated: false,
  auth: () => {},
  logout: () => {},
  setAuth: () => {},
});

export const LoginFormContext = createContext({
  onLoginScreen: true,
  loginScreen: () => {},
});

export const ModalContext = createContext({
  isModalShow: false,
  setShowModal: () => {},
});
