import { useContext } from 'react';

import {
  AuthContext,
  LoginFormContext,
  ModalContext,
  TodoContext,
} from '../context/Context';

export const useAuth = () => useContext(AuthContext);

export const useTodos = () => useContext(TodoContext);

export const useLoginForm = () => useContext(LoginFormContext);

export const useModal = () => useContext(ModalContext);
