import { useReducer, useCallback } from 'react';

import { TodoContext } from './Context';

const initTodo = {
  todoEdit: {},
  total: {
    totalDone: 0,
    totalInProgress: 0,
    totalTodos: 0,
  },
  todoPaginate: {
    currentPage: 1,
    skipPaginate: 0,
    pageSize: 5,
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
    // case 'PAGINATE_TODO':
    //   const currentPage = action.payload.currentPage;
    //   const skipPaginate = action.payload.skipPaginate;
    //   const pageSize = action.payload.pageSize;

    //   return {
    //     ...state,
    //     todoPaginate: {
    //       currentPage: currentPage,
    //       skipPaginate: skipPaginate,
    //       pageSize: pageSize,
    //     },
    //   };

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

  // const todoPaginateHandler = (paginate) => {
  //   dispatchTodo({ type: 'PAGINATE_TODO', payload: paginate });
  // };

  const value = {
    todoEdit: todoState.todoEdit,
    totalAllTodos: todoState.total,
    getTotalTodo: getTotalTodosHandler,
    editTodo: editTodoHandler,
    // paginateTodo: todoPaginateHandler,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export default TodoProvider;
