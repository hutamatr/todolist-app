import { useContext } from 'react';
import { TodoContext } from '../context/Context';

const useTodos = () => {
  return useContext(TodoContext);
};

export default useTodos;
