import { useContext } from 'react';
import { AuthContext, TodoContext, CategoryContext } from '../context/Context';

export const useAuth = () => {
  return useContext(AuthContext);
};

export const useTodos = () => {
  return useContext(TodoContext);
};

export const useCategory = () => {
  return useContext(CategoryContext);
};
