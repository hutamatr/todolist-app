import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import FormInput from "../components/UI/FormInput";
import validation from "../utils/validation";

const Login = () => {
  const emailRef = useRef();
  const { emailValidation, passwordValidation } = validation();

  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);

  const [password, setPassword] = useState("");
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

  const emailInputHandler = (event) => setEmail(event.target.value);
  const passwordInputHandler = (event) => setPassword(event.target.value);

  const loginSubmitHandler = (event) => {
    event.preventDefault();

    const loginInput = {
      email,
      password,
    };

    console.log(loginInput);

    setEmail("");
    setPassword("");
  };

  return (
    <section className="mx-auto flex max-w-sm flex-col gap-y-3 rounded-xl bg-custom-yellow p-4">
      <h1 className="text-center text-3xl text-custom-orange">Login</h1>
      <form onSubmit={loginSubmitHandler} className="flex flex-col gap-y-3">
        <FormInput
          label={"Email"}
          input={email}
          type="email"
          ref={emailRef}
          onChange={emailInputHandler}
          isValidInput={isValidEmail}
        />
        <FormInput
          label={"Password"}
          input={password}
          type="password"
          onChange={passwordInputHandler}
          isValidInput={isValidPassword}
        />

        <button
          className={`mx-auto rounded-lg bg-custom-green px-4 py-2 text-custom-white hover:bg-custom-orange duration-300 disabled:opacity-70 disabled:cursor-not-allowed`}
          disabled={!isValidEmail || !isValidPassword ? true : false}
        >
          Sign In
        </button>
      </form>
      <p className="flex flex-row gap-x-1 sm:gap-x-2 text-custom-green">
        Don't have an account?
        <Link to={"/register"} className="underline">
          Sign Up
        </Link>
      </p>
    </section>
  );
};

export default Login;
