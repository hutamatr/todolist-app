import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import FormInput from '../components/UI/FormInput';
import validation from '../utils/validation';
import { LoginFormContext } from '../context/Context';

const Login = () => {
  const emailRef = useRef();
  const navigate = useNavigate();
  const { emailValidation, passwordValidation } = validation();
  const { loginScreen } = useContext(LoginFormContext);

  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(false);

  const [password, setPassword] = useState('');
  const [isValidPassword, setIsValidPassword] = useState(false);

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

  const emailInputHandler = (event) => setEmail(event.target.value);
  const passwordInputHandler = (event) => setPassword(event.target.value);

  const loginSubmitHandler = (event) => {
    event.preventDefault();

    const loginInput = {
      email,
      password,
    };

    console.log(loginInput);
    navigate('/home', { replace: true });

    setEmail('');
    setPassword('');
  };

  return (
    <>
      <section className="flex w-full flex-col gap-y-4 rounded-lg bg-white p-6 md:max-w-xs">
        <h1 className="text-sm font-bold">Log In</h1>
        <form onSubmit={loginSubmitHandler} className="flex flex-col gap-y-2">
          <FormInput
            placeholder={'Email'}
            input={email}
            type="email"
            ref={emailRef}
            onChange={emailInputHandler}
            isValidInput={isValidEmail}
          />
          <FormInput
            placeholder={'Password'}
            input={password}
            type="password"
            onChange={passwordInputHandler}
            isValidInput={isValidPassword}
          />

          <button
            className="disabled:bg-primary-80 rounded-md bg-orange-100 py-3 text-xs font-light text-white disabled:cursor-not-allowed"
            disabled={!isValidEmail || !isValidPassword ? true : false}
          >
            Log In
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
