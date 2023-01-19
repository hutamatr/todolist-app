import { useReducer, useCallback } from 'react';

import { TodoContext } from './Context';

const initTodo = {
  todoEdit: {},
  total: {
    totalDone: 0,
    totalInProgress: 0,
    totalTodos: 0,
    totalCategories: 0,
  },
  sort: 'ASC',
};

const todosReducer = (state, action) => {
  switch (action.type) {
    case 'TOTAL_TODO':
      const totalTodos = action.payload;
      return {
        ...state,
        total: totalTodos,
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

  const getTotalTodosHandler = useCallback((totalTodos) => {
    dispatchTodo({ type: 'TOTAL_TODO', payload: totalTodos });
  }, []);

  const editTodoHandler = (todoItem) => {
    dispatchTodo({ type: 'EDIT_TODO', payload: todoItem });
  };

  const value = {
    todoEdit: todoState.todoEdit,
    totalAllTodos: todoState.total,
    getTotalTodo: getTotalTodosHandler,
    editTodo: editTodoHandler,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export default TodoProvider;
