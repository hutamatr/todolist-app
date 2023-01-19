import { useState, useEffect, useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';

import FormInput from 'components/UI/FormInput';
import useInputState from 'hooks/useInputState';
import usePasswordView from 'hooks/usePasswordView';
import useHttp from 'hooks/useHttp';
import { useAuth, useLoginForm } from 'hooks/useStoreContext';
import errorQuery from 'utils/errorQuery';
import validation from 'utils/validation';

const Register = () => {
  const userNameRef = useRef();
  const navigate = useNavigate();
  const { login } = useAuth();
  const { loginScreen } = useLoginForm();
  const { isPasswordView, viewPasswordHandler } = usePasswordView();
  const { userNameValidation, emailValidation, passwordValidation } =
    validation();
  const { requestHttp } = useHttp();

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

  const [isValidUserName, setIsValidUserName] = useState(false);
  const [isUserNameFocus, setIsUserNameFocus] = useState(false);

  const [isValidUserEmail, setIsValidUserEmail] = useState(false);
  const [isUserEmailFocus, setIsUserEmailFocus] = useState(false);

  const [isValidPassword, setIsValidPassword] = useState(false);
  const [isPasswordFocus, setIsPasswordFocus] = useState(false);

  const [isValidPasswordMatch, setIsValidPasswordMatch] = useState(false);
  const [isPasswordMatchFocus, setIsPasswordMatchFocus] = useState(false);

  const { mutate: mutateRegister, isLoading: isLoadingRegister } = useMutation({
    mutationFn: (registerData) => {
      return requestHttp({
        method: 'POST',
        url: '/accounts/register',
        data: registerData,
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
      errorQuery(error, 'Register Account Failed!');
    },
  });

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

  const userNameFocusHandler = () => {
    setIsUserNameFocus((prevState) => !prevState);
  };

  const userEmailFocusHandler = () => {
    setIsUserEmailFocus((prevState) => !prevState);
  };

  const passwordFocusHandler = () => {
    setIsPasswordFocus((prevState) => !prevState);
  };

  const passwordMatchFocusHandler = () => {
    setIsPasswordMatchFocus((prevState) => !prevState);
  };

  const RegisterSubmitHandler = (event) => {
    event.preventDefault();

    const registerFormInput = {
      username: userName,
      email: userEmail,
      password: password,
    };

    mutateRegister(registerFormInput);

    setRegisterInput({
      userName: '',
      userEmail: '',
      password: '',
      passwordMatch: '',
    });
  };

  return (
    <>
      <Toaster position="top-center" />
      <section className="flex w-full flex-col gap-y-4 rounded-lg bg-white p-6 md:max-w-xs">
        <h1 className="font-bold">Sign Up</h1>
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
            useFor="register"
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
            onPasswordView={isPasswordView}
            onPasswordViewHandler={viewPasswordHandler}
            useFor="register"
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
            onPasswordView={isPasswordView}
            onPasswordViewHandler={viewPasswordHandler}
            useFor="register"
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
            {isLoadingRegister ? 'Loading...' : 'Create Account'}
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
