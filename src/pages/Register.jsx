import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';

import validation from '../utils/validation';
import FormInput from '../components/UI/FormInput';
import { LoginFormContext } from '../context/Context';

const Register = () => {
  const userNameRef = useRef();
  const { userNameValidation, emailValidation, passwordValidation } =
    validation();
  const { loginScreen } = useContext(LoginFormContext);

  const [userName, setUserName] = useState('');
  const [isValidUserName, setIsValidUserName] = useState(false);
  const [isUserNameFocus, setIsUserNameFocus] = useState(false);

  const [userEmail, setUserEmail] = useState('');
  const [isValidUserEmail, setIsValidUserEmail] = useState(false);
  const [isUserEmailFocus, setIsUserEmailFocus] = useState(false);

  const [password, setPassword] = useState('');
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [isPasswordFocus, setIsPasswordFocus] = useState(false);

  const [passwordMatch, setPasswordMatch] = useState('');
  const [isValidPasswordMatch, setIsValidPasswordMatch] = useState(false);
  const [isPasswordMatchFocus, setIsPasswordMatchFocus] = useState(false);

  useEffect(() => {
    userNameRef.current.focus();
  }, []);

  useEffect(() => {
    const userNameValid = userNameValidation.test(userName);
    const emailValid = emailValidation.test(userEmail);
    setIsValidUserName(userNameValid);
    setIsValidUserEmail(emailValid);
  }, [userName, userEmail, userNameValidation, emailValidation]);

  useEffect(() => {
    const passwordValid = passwordValidation.test(password);
    setIsValidPassword(passwordValid);
    setIsValidPasswordMatch(password === passwordMatch);
  }, [password, passwordMatch, passwordValidation]);

  const registerScreenHandler = () => loginScreen(false);

  const userNameChangeHandler = (event) => setUserName(event.target.value);
  const userNameFocusHandler = () =>
    setIsUserNameFocus((prevState) => !prevState);

  const userEmailChangeHandler = (event) => setUserEmail(event.target.value);
  const userEmailFocusHandler = () =>
    setIsUserEmailFocus((prevState) => !prevState);

  const passwordChangeHandler = (event) => setPassword(event.target.value);
  const passwordFocusHandler = () =>
    setIsPasswordFocus((prevState) => !prevState);

  const passwordMatchChangeHandler = (event) =>
    setPasswordMatch(event.target.value);
  const passwordMatchFocusHandler = () =>
    setIsPasswordMatchFocus((prevState) => !prevState);

  const RegisterSubmitHandler = (event) => {
    event.preventDefault();

    const registerFormInput = {
      username: userName,
      email: userEmail,
      password: password,
    };

    console.log(registerFormInput);

    setUserName('');
    setUserEmail('');
    setPassword('');
    setPasswordMatch('');
  };

  return (
    <section className="flex w-full flex-col gap-y-4 rounded-lg bg-white p-6 md:max-w-xs">
      <h1 className="text-sm font-bold">Sign Up</h1>
      <form onSubmit={RegisterSubmitHandler} className="flex flex-col gap-y-4">
        <FormInput
          placeholder={'Username'}
          isValidInput={isValidUserName}
          isFocusInput={isUserNameFocus}
          input={userName}
          ref={userNameRef}
          autoComplete={'off'}
          type="text"
          onChange={userNameChangeHandler}
          onFocus={userNameFocusHandler}
          onBlur={userNameFocusHandler}
        />
        <FormInput
          placeholder={'Email'}
          isValidInput={isValidUserEmail}
          isFocusInput={isUserEmailFocus}
          input={userEmail}
          type="email"
          onChange={userEmailChangeHandler}
          onFocus={userEmailFocusHandler}
          onBlur={userEmailFocusHandler}
        />
        <FormInput
          placeholder={'Password'}
          isValidInput={isValidPassword}
          isFocusInput={isPasswordFocus}
          input={password}
          type="password"
          onChange={passwordChangeHandler}
          onFocus={passwordFocusHandler}
          onBlur={passwordFocusHandler}
        />
        <FormInput
          placeholder={'Confirm Password'}
          isValidInput={isValidPasswordMatch}
          isFocusInput={isPasswordMatchFocus}
          input={passwordMatch}
          type="password"
          onChange={passwordMatchChangeHandler}
          onFocus={passwordMatchFocusHandler}
          onBlur={passwordMatchFocusHandler}
        />

        <button
          className="rounded-md bg-primary-100 py-3 text-xs font-light text-white disabled:cursor-not-allowed disabled:bg-primary-80"
          disabled={
            !isValidUserName ||
            !isValidUserEmail ||
            !isValidPassword ||
            !isValidPasswordMatch
              ? true
              : false
          }
        >
          Create Account
        </button>
      </form>
      <p className="text-center text-sm">
        Already have an account?{' '}
        <Link
          to={'/login'}
          className="font-semibold text-primary-100 underline"
          onClick={registerScreenHandler}
        >
          Log In
        </Link>
      </p>
    </section>
  );
};

export default Register;
