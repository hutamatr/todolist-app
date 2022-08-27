import { useContext } from 'react';
import {
  AuthContext,
  TodoContext,
  CategoryContext,
  FilterContext,
} from '../context/Context';

export const useAuth = () => {
  return useContext(AuthContext);
};

export const useTodos = () => {
  return useContext(TodoContext);
};

export const useCategory = () => {
  return useContext(CategoryContext);
};

export const useFilter = () => {
  return useContext(FilterContext);
};
