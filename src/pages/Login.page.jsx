import { useState, useEffect, useRef, useContext } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';

import FormInput from 'components/UI/FormInput';
import useInputState from 'hooks/useInputState';
import usePasswordView from 'hooks/usePasswordView';
import useHttp from 'hooks/useHttp';
import { useAuth } from 'hooks/useStoreContext';
import { LoginFormContext } from 'context/Context';
import validation from 'utils/validation';
import errorQuery from 'utils/errorQuery';

const Login = () => {
  const emailRef = useRef();
  const navigate = useNavigate();
  const { login } = useAuth();
  const { isPasswordView, viewPasswordHandler } = usePasswordView();
  const { emailValidation, passwordValidation } = validation();
  const { loginScreen } = useContext(LoginFormContext);
  const { requestHttp } = useHttp();

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

  const { mutate: mutateLogin, isLoading: isLoadingLogin } = useMutation({
    mutationFn: (LoginData) => {
      return requestHttp({
        method: 'POST',
        url: '/accounts/login',
        data: LoginData,
      });
    },
    onSuccess: (data) => {
      setTimeout(() => {
        toast.success(data?.data.message);
      }, 500);
      navigate('/home', { replace: true });
    },
    onSettled: (data) => {
      const expireDateLogin = new Date(new Date().getTime() + 36000 * 1000);
      login(data?.data, expireDateLogin.toISOString());
    },
    onError: (error) => {
      errorQuery(error, 'Login Failed!');
    },
  });

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
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 1500,
        }}
      />
      <section className="flex w-full flex-col gap-y-4 rounded-lg bg-material-green p-6 md:max-w-xs">
        <h1 className="font-bold">Log In</h1>
        <form onSubmit={loginSubmitHandler} className="flex flex-col gap-y-2">
          <FormInput
            placeholder="Email"
            input={email}
            type="email"
            ref={emailRef}
            onChange={onChangeInputHandler}
            isValidInput={isValidEmail}
            name="email"
          />
          <FormInput
            placeholder="Password"
            input={password}
            type="password"
            onChange={onChangeInputHandler}
            isValidInput={isValidPassword}
            name="password"
            onPasswordView={isPasswordView}
            onPasswordViewHandler={viewPasswordHandler}
          />

          <button
            className="disabled:bg-primary-80 rounded-md bg-orange-100 py-3 font-light text-material-green disabled:cursor-not-allowed"
            disabled={!isValidEmail || !isValidPassword ? true : false}
          >
            {isLoadingLogin ? 'Loading...' : 'Sign In'}
          </button>
        </form>
        <p className="text-center text-sm">
          Don't have an account?{' '}
          <Link
            to="/register"
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
