import { createContext } from 'react';

export const TodoContext = createContext({
  todos: [],
  todoEdit: {},
  addTodo: (todoItem) => {},
  deleteTodo: (id) => {},
  editTodo: (todoItem) => {},
});

export const AuthContext = createContext({
  authToken: null,
  isAuthenticated: false,
  login: (token) => {},
  logout: () => {},
});

export const LoginFormContext = createContext({
  onLoginScreen: true,
  loginScreen: () => {},
});
