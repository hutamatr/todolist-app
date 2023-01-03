import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';

import FormInput from '../components/UI/FormInput';
import validation from '../utils/validation';
import useInputState from '../hooks/useInputState';
import usePasswordView from '../hooks/usePasswordView';
import { LoginFormContext } from '../context/Context';
import { useAuth } from '../hooks/useStoreContext';
import useMutationTodos from '../hooks/useMutationTodos';

const Login = () => {
  const emailRef = useRef();
  const navigate = useNavigate();
  const { login } = useAuth();
  const { isPasswordView, viewPasswordHandler } = usePasswordView();
  const { emailValidation, passwordValidation } = validation();
  const { loginScreen } = useContext(LoginFormContext);

  const {
    input,
    setInput: setLoginInput,
    onChangeInputHandler,
  } = useInputState({
    email: '',
    password: '',
  });

  const { email, password } = input;
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);

  const { mutate: mutateLogin, isLoading: isLoadingLogin } = useMutationTodos(
    { method: 'POST', url: '/accounts/login' },
    (data) => {
      setTimeout(() => {
        toast.success(data?.data.message);
      }, 1000);
      navigate('/home', { replace: true });
    },
    (error) => {
      toast.error(error);
    },
    (data) => {
      const expireDateLogin = new Date(new Date().getTime() + 36000 * 1000);
      login(data?.data, expireDateLogin.toISOString());
    }
  );

  useEffect(() => {
    const emailValid = emailValidation.test(email);
    const passwordValid = passwordValidation.test(password);
    setIsValidEmail(emailValid);
    setIsValidPassword(passwordValid);
  }, [email, password, emailValidation, passwordValidation]);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const loginScreenHandler = () => loginScreen(true);

  const loginSubmitHandler = (event) => {
    event.preventDefault();

    const loginInput = {
      email,
      password,
    };

    mutateLogin(loginInput);

    setLoginInput({
      email: '',
      password: '',
    });
  };

  return (
    <>
      <Toaster position="top-center" />
      <section className="flex w-full flex-col gap-y-4 rounded-lg bg-white p-6 md:max-w-xs">
        <h1 className="text-sm font-bold">Log In</h1>
        <form onSubmit={loginSubmitHandler} className="flex flex-col gap-y-2">
          <FormInput
            placeholder={'Email'}
            input={email}
            type="email"
            ref={emailRef}
            onChange={onChangeInputHandler}
            isValidInput={isValidEmail}
            name="email"
          />
          <FormInput
            placeholder={'Password'}
            input={password}
            type="password"
            onChange={onChangeInputHandler}
            isValidInput={isValidPassword}
            name="password"
            onPasswordView={isPasswordView}
            onPasswordViewHandler={viewPasswordHandler}
          />

          <button
            className="disabled:bg-primary-80 rounded-md bg-orange-100 py-3 font-light text-white disabled:cursor-not-allowed"
            disabled={!isValidEmail || !isValidPassword ? true : false}
          >
            {isLoadingLogin ? 'Loading...' : 'Sign In'}
          </button>
        </form>
        <p className="text-center text-sm">
          Don't have an account?{' '}
          <Link
            to={'/register'}
            className="font-semibold text-orange-100 underline"
            onClick={loginScreenHandler}
          >
            Sign Up
          </Link>
        </p>
      </section>
    </>
  );
};

export default Login;
