import { createContext } from "react";

export const TodoContext = createContext({
  todos: [],
  addTodo: (todoItem) => {},
  deleteTodo: (id) => {},
});
