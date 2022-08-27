import { createContext } from 'react';

export const TodoContext = createContext({
  todos: [],
  todoEdit: {},
  addTodo: (todoItem) => {},
  updateTodo: (todoItem) => {},
  deleteTodo: (id) => {},
  editTodo: (todoItem) => {},
});

export const CategoryContext = createContext({
  categories: [],
  addCategory: (category) => {},
  updateCategory: (category) => {},
  deleteCategory: (id) => {},
  editCategory: (category) => {},
});

export const FilterContext = createContext({
  isTodoInProgress: false,
  isTodoCompleted: false,
  inProgress: () => {},
  completed: () => {},
});

export const AuthContext = createContext({
  authToken: '',
  isAuthenticated: false,
  login: (token) => {},
  logout: () => {},
});

export const LoginFormContext = createContext({
  onLoginScreen: true,
  loginScreen: (value) => {},
});
