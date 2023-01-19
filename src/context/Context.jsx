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
  login: () => {},
  logout: () => {},
});

export const LoginFormContext = createContext({
  onLoginScreen: true,
  loginScreen: () => {},
});

export const ModalContext = createContext({
  isModalShow: false,
  setShowModal: () => {},
});
