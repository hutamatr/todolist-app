import React, { useReducer } from "react";

import { TodoContext } from "./Context";
import { todoData } from "../utils/dummy-todos";

const initTodo = {
  todos: [...todoData],
  // todoEdit: {},
};

const todosReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      const updatedTodos = [action.payload, ...state.todos];
      return {
        ...state,
        todos: updatedTodos,
      };
    case "REMOVE_TODO":
      const removedTodo = state.todos.filter(
        (todo) => todo.id !== action.payload
      );
      return {
        ...state,
        todos: removedTodo,
      };
    /*  case "EDIT_TODO":
      const editTodo = { ...action.payload };
      return {
        ...state,
        todoEdit: editTodo,
      }; */
    default:
      return initTodo;
  }
};

const TodoProvider = ({ children }) => {
  const [todoState, dispatchTodo] = useReducer(todosReducer, initTodo);

  const addTodosHandler = (todoItem) => {
    dispatchTodo({ type: "ADD_TODO", payload: todoItem });
  };

  const deleteTodoHandler = (todoId) => {
    dispatchTodo({ type: "REMOVE_TODO", payload: todoId });
  };

  /*   const editTodoHandler = (todoItem) => {
    dispatchTodo({ type: "EDIT_TODO", payload: todoItem });
  }; */

  const value = {
    todos: todoState.todos,
    todoEdit: todoState.todoEdit,
    addTodos: addTodosHandler,
    deleteTodo: deleteTodoHandler,
    // editTodo: editTodoHandler,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export default TodoProvider;
