import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { MdErrorOutline, MdDone } from 'react-icons/md';

import FormInput from '../components/UI/FormInput';
import Alert from '../components/UI/Alert';
import validation from '../utils/validation';
import useAxios from '../hooks/useAxios';
import useInputState from '../hooks/useInputState';
import { useLoginForm, useAuth } from '../hooks/useStoreContext';

const Register = () => {
  const userNameRef = useRef();
  const navigate = useNavigate();
  const { login, loginSuccess, setLoginSuccess } = useAuth();
  const { loginScreen } = useLoginForm();
  const { requestHttp, error, setError } = useAxios();
  const { userNameValidation, emailValidation, passwordValidation } =
    validation();

  const {
    input,
    setInput: setRegisterInput,
    onChangeInputHandler,
  } = useInputState({
    userName: '',
    userEmail: '',
    password: '',
    passwordMatch: '',
  });

  const { userName, userEmail, password, passwordMatch } = input;

  // const [userName, setUserName] = useState('');
  const [isValidUserName, setIsValidUserName] = useState(false);
  const [isUserNameFocus, setIsUserNameFocus] = useState(false);

  // const [userEmail, setUserEmail] = useState('');
  const [isValidUserEmail, setIsValidUserEmail] = useState(false);
  const [isUserEmailFocus, setIsUserEmailFocus] = useState(false);

  // const [password, setPassword] = useState('');
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [isPasswordFocus, setIsPasswordFocus] = useState(false);

  // const [passwordMatch, setPasswordMatch] = useState('');
  const [isValidPasswordMatch, setIsValidPasswordMatch] = useState(false);
  const [isPasswordMatchFocus, setIsPasswordMatchFocus] = useState(false);

  // const [success, setSuccess] = useState({
  //   isSuccess: false,
  //   successMessage: '',
  // });

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

  // const userNameChangeHandler = (event) => setUserName(event.target.value);
  const userNameFocusHandler = () =>
    setIsUserNameFocus((prevState) => !prevState);

  // const userEmailChangeHandler = (event) => setUserEmail(event.target.value);
  const userEmailFocusHandler = () =>
    setIsUserEmailFocus((prevState) => !prevState);

  // const passwordChangeHandler = (event) => setPassword(event.target.value);
  const passwordFocusHandler = () =>
    setIsPasswordFocus((prevState) => !prevState);

  // const passwordMatchChangeHandler = (event) =>
  //   setPasswordMatch(event.target.value);
  const passwordMatchFocusHandler = () =>
    setIsPasswordMatchFocus((prevState) => !prevState);

  const RegisterSubmitHandler = (event) => {
    event.preventDefault();

    const registerFormInput = {
      username: userName,
      email: userEmail,
      password: password,
    };

    requestHttp(
      {
        method: 'POST',
        url: '/accounts/register',
        dataRequest: registerFormInput,
      },
      (data) => {
        const expireDateLogin = new Date(new Date().getTime() + 3600 * 1000);
        login(data.data?.token, expireDateLogin.toISOString());
        navigate('/home', { replace: true });
      }
    );

    setRegisterInput({
      userName: '',
      userEmail: '',
      password: '',
      passwordMatch: '',
    });

    // setUserName('');
    // setUserEmail('');
    // setPassword('');
    // setPasswordMatch('');
  };

  return (
    <>
      {error.isError && (
        <Alert
          className={'alert-error'}
          children={error.errorMessage}
          onError={error}
          onSetError={setError}
          icons={
            <MdErrorOutline className="h-6 w-6 flex-shrink-0 stroke-current" />
          }
        />
      )}
      {loginSuccess.isSuccess && (
        <Alert
          className={'alert-success'}
          children={loginSuccess.successMessage}
          onSuccess={loginSuccess}
          onSetSuccess={setLoginSuccess}
          icons={<MdDone className="h-6 w-6 flex-shrink-0 stroke-current" />}
        />
      )}
      <section className="flex w-full flex-col gap-y-4 rounded-lg bg-white p-6 md:max-w-xs">
        <h1 className="text-sm font-bold">Sign Up</h1>
        <form
          onSubmit={RegisterSubmitHandler}
          className="flex flex-col gap-y-2"
        >
          <FormInput
            name="userName"
            placeholder={'Username'}
            isValidInput={isValidUserName}
            isFocusInput={isUserNameFocus}
            input={userName}
            ref={userNameRef}
            autoComplete={'off'}
            type="text"
            onChange={onChangeInputHandler}
            onFocus={userNameFocusHandler}
            onBlur={userNameFocusHandler}
          />
          <FormInput
            name="userEmail"
            placeholder={'Email'}
            isValidInput={isValidUserEmail}
            isFocusInput={isUserEmailFocus}
            input={userEmail}
            type="email"
            onChange={onChangeInputHandler}
            onFocus={userEmailFocusHandler}
            onBlur={userEmailFocusHandler}
          />
          <FormInput
            name="password"
            placeholder={'Password'}
            isValidInput={isValidPassword}
            isFocusInput={isPasswordFocus}
            input={password}
            type="password"
            onChange={onChangeInputHandler}
            onFocus={passwordFocusHandler}
            onBlur={passwordFocusHandler}
          />
          <FormInput
            name="passwordMatch"
            placeholder={'Confirm Password'}
            isValidInput={isValidPasswordMatch}
            isFocusInput={isPasswordMatchFocus}
            input={passwordMatch}
            type="password"
            onChange={onChangeInputHandler}
            onFocus={passwordMatchFocusHandler}
            onBlur={passwordMatchFocusHandler}
          />

          <button
            className="disabled:bg-primary-80 rounded-md bg-orange-100 py-3 text-xs font-light text-white disabled:cursor-not-allowed"
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
            className="font-semibold text-orange-100 underline"
            onClick={registerScreenHandler}
          >
            Log In
          </Link>
        </p>
      </section>
    </>
  );
};

export default Register;
