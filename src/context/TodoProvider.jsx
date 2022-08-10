import React, { useReducer } from "react";

import { TodoContext } from "./Context";
import { todoData } from "../utils/dummy-todos";

const initTodo = {
  todos: [...todoData],
};

const todosReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      const updatedTodos = state.todos.concat(action.payload);
      return {
        todos: updatedTodos,
      };

    default:
      return initTodo;
  }
};

const TodoProvider = ({ children }) => {
  const [todoState, dispatchTodo] = useReducer(todosReducer, initTodo);

  console.log(todoState);

  const addTodosHandler = (todoItem) => {
    dispatchTodo({ type: "ADD_TODO", payload: todoItem });
  };

  const value = {
    todos: todoState.todos,
    addTodos: addTodosHandler,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export default TodoProvider;
