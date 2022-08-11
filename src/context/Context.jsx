import { createContext } from "react";

export const TodoContext = createContext({
  todos: [],
  todoEdit: {},
  addTodo: (todoItem) => {},
  deleteTodo: (id) => {},
  editTodo: (todoItem) => {},
});

export const authContext = createContext({
  authToken: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});
