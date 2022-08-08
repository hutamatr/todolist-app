import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import validation from "../utils/validation";
import FormInput from "../components/UI/FormInput";

import styles from "./register.module.css";

const Register = () => {
  const userNameRef = useRef();
  const { userNameValidation, emailValidation, passwordValidation } =
    validation();
  const [userName, setUserName] = useState("");
  const [isValidUserName, setIsValidUserName] = useState(false);
  const [isUserNameFocus, setIsUserNameFocus] = useState(false);

  const [userEmail, setUserEmail] = useState("");
  const [isValidUserEmail, setIsValidUserEmail] = useState(false);
  const [isUserEmailFocus, setIsUserEmailFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [isPasswordFocus, setIsPasswordFocus] = useState(false);

  const [passwordMatch, setPasswordMatch] = useState("");
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

  const userNameChangeHandler = (event) => setUserName(event.target.value);
  const useNameFocusHandler = () =>
    setIsUserNameFocus((prevState) => !prevState);

  const userEmailChangeHandler = (event) => setUserEmail(event.target.value);
  const useEmailFocusHandler = () =>
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

    setUserName("");
    setUserEmail("");
    setPassword("");
    setPasswordMatch("");
  };

  return (
    <section className={styles["register"]}>
      <h1 className={styles["register-title"]}>Register</h1>
      <form
        onSubmit={RegisterSubmitHandler}
        className={styles["register-form"]}
      >
        <FormInput
          label={"Username"}
          isValidInput={isValidUserName}
          isFocusInput={isUserNameFocus}
          input={userName}
          ref={userNameRef}
          autoComplete={"off"}
          type="text"
          onChange={userNameChangeHandler}
          onFocus={useNameFocusHandler}
          onBlur={useNameFocusHandler}
        />
        <FormInput
          label={"Email"}
          isValidInput={isValidUserEmail}
          isFocusInput={isUserEmailFocus}
          input={userEmail}
          type="email"
          onChange={userEmailChangeHandler}
          onFocus={useEmailFocusHandler}
          onBlur={useEmailFocusHandler}
        />
        <FormInput
          label={"Password"}
          isValidInput={isValidPassword}
          isFocusInput={isPasswordFocus}
          input={password}
          type="password"
          onChange={passwordChangeHandler}
          onFocus={passwordFocusHandler}
          onBlur={passwordFocusHandler}
        />
        <FormInput
          label={"Confirm"}
          isValidInput={isValidPasswordMatch}
          isFocusInput={isPasswordMatchFocus}
          input={passwordMatch}
          type="password"
          onChange={passwordMatchChangeHandler}
          onFocus={passwordMatchFocusHandler}
          onBlur={passwordMatchFocusHandler}
        />
        <button
          className={styles["register-button"]}
          disabled={
            !isValidUserName ||
            !isValidUserEmail ||
            !isValidPassword ||
            !isValidPasswordMatch
              ? true
              : false
          }
        >
          Sign Up
        </button>
      </form>
      <p className={styles["register-already"]}>
        Already registered ? <Link to={"/login"}>Sign In</Link>
      </p>
    </section>
  );
};

export default Register;
