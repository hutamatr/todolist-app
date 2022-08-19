import React, { useReducer } from 'react';

import { TodoContext } from './Context';
import { todoData } from '../utils/dummy-todos';

const initTodo = {
  todos: [...todoData],
  todoEdit: {},
};

const todosReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      const addedTodos = [action.payload, ...state.todos];

      return {
        ...state,
        todos: addedTodos,
      };
    case 'UPDATE_TODO':
      const existingTodoItemIndex = state.todos.findIndex(
        (todo) => todo.id === action.payload.id
      );
      const existingTodoItem = state.todos[existingTodoItemIndex];

      let updatedTodos = null;

      if (existingTodoItem) {
        updatedTodos = [...state.todos];
        updatedTodos[existingTodoItemIndex] = action.payload;
      }
      return {
        ...state,
        todos: updatedTodos,
      };
    case 'REMOVE_TODO':
      const removedTodo = state.todos.filter(
        (todo) => todo.id !== action.payload
      );

      return {
        ...state,
        todos: removedTodo,
      };
    case 'EDIT_TODO':
      const editTodo = { ...action.payload };

      return {
        ...state,
        todoEdit: editTodo,
      };

    default:
      return initTodo;
  }
};

const TodoProvider = ({ children }) => {
  const [todoState, dispatchTodo] = useReducer(todosReducer, initTodo);

  console.table(todoState.todos);

  const addTodoHandler = (todoItem) => {
    dispatchTodo({ type: 'ADD_TODO', payload: todoItem });
  };

  const updateTodoHandler = (todoItem) => {
    dispatchTodo({ type: 'UPDATE_TODO', payload: todoItem });
  };

  const deleteTodoHandler = (todoId) => {
    dispatchTodo({ type: 'REMOVE_TODO', payload: todoId });
  };

  const editTodoHandler = (todoItem) => {
    dispatchTodo({ type: 'EDIT_TODO', payload: todoItem });
  };

  const value = {
    todos: todoState.todos,
    todoEdit: todoState.todoEdit,
    addTodo: addTodoHandler,
    updateTodo: updateTodoHandler,
    deleteTodo: deleteTodoHandler,
    editTodo: editTodoHandler,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export default TodoProvider;
