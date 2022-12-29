import { useContext } from 'react';
import {
  AuthContext,
  TodoContext,
  FilterContext,
  LoginFormContext,
  ModalContext,
} from '../context/Context';

export const useAuth = () => useContext(AuthContext);

export const useTodos = () => useContext(TodoContext);

export const useFilter = () => useContext(FilterContext);

export const useLoginForm = () => useContext(LoginFormContext);

export const useModal = () => useContext(ModalContext);
