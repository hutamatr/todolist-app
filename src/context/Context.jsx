import { createContext } from 'react';

export const TodoContext = createContext({
  todos: [],
  todoEdit: {},
  totalTodos: 0,
  alertTodo: {},
  setAlertTodo: () => {},
  getAllTodo: () => {},
  addTodo: () => {},
  updateTodo: () => {},
  deleteTodo: () => {},
  editTodo: () => {},
});

export const CategoryContext = createContext({
  categories: [],
  alertCategory: {},
  setAlertCategory: () => {},
  getAllCategory: () => {},
  addCategory: () => {},
  updateCategory: () => {},
  deleteCategory: () => {},
  editCategory: () => {},
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
  loginSuccess: {},
  setLoginSuccess: () => {},
  logoutSuccess: {},
  setLogoutSuccess: () => {},
  login: () => {},
  logout: () => {},
});

export const LoginFormContext = createContext({
  onLoginScreen: true,
  loginScreen: () => {},
});

export const UserContext = createContext({
  username: '',
  email: '',
  image: '',
  getUserDetails: () => {},
});
