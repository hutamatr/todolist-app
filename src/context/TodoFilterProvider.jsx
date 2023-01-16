import { useState } from 'react';

import { FilterContext } from './Context';

const TodoFilterProvider = ({ children }) => {
  const [isTodoInProgress, setIsTodoInProgress] = useState(false);
  const [isTodoCompleted, setIsTodoCompleted] = useState(false);

  const todoInProgressHandler = (value) => {
    setIsTodoInProgress(value);
  };

  const todosCompletedHandler = (value) => {
    setIsTodoCompleted(value);
  };

  const value = {
    isTodoInProgress,
    isTodoCompleted,
    inProgress: todoInProgressHandler,
    completed: todosCompletedHandler,
  };

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
};

export default TodoFilterProvider;
