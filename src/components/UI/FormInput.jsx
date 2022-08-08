import React, { useState, forwardRef } from "react";
import {
  MdCheckCircle,
  MdCancel,
  MdReport,
  MdVisibility,
  MdVisibilityOff,
} from "react-icons/md";

import RegisterNote from "../Register/RegisterNote";

import styles from "./form-input.module.css";

const FormInput = forwardRef(
  (
    {
      label,
      isValidInput,
      isFocusInput,
      autoComplete,
      input,
      type,
      onChange,
      onFocus,
      onBlur,
    },
    ref
  ) => {
    const [values, setValues] = useState({
      password: "",
      isPasswordShow: false,
    });

    const passwordShowClickHandler = () =>
      setValues((prevState) => {
        return { ...prevState, isPasswordShow: !prevState.isPasswordShow };
      });

    const mouseDownHandler = (event) => event.preventDefault();

    const passwordChangeHandler = (prop) => (event) => {
      setValues((prevState) => {
        return { ...prevState, [prop]: event.target.value };
      });
    };

    // const viewPasswordHandler = () => setIsView((prevState) => !prevState);

    return (
      <>
        <label htmlFor={label.toLowerCase()} className={styles["form-label"]}>
          {label} :
          <MdCheckCircle
            className={`${styles["form-check"]} ${
              isValidInput && input
                ? styles["form-check--isValid"]
                : styles["form-check--isInvalid"]
            }`}
          />
          <MdCancel
            className={`${styles["form-uncheck"]} ${
              isValidInput || !input
                ? styles["form-check--isInvalid"]
                : styles["form-check--isValid"]
            }`}
          />
        </label>
        <div className="">
          <input
            required
            // type={values.isPasswordShow ? "password" : type}
            type={type}
            id={label.toLowerCase()}
            value={input}
            autoComplete={autoComplete ? autoComplete : null}
            ref={ref}
            // onChange={
            //   values.isPasswordShow ? passwordChangeHandler("password") : onChange
            // }
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            className={styles["form-input"]}
          />
          {/* <button
            onClick={passwordShowClickHandler}
            onMouseDown={mouseDownHandler}
          >
            {values.isPasswordShow ? <MdVisibility /> : <MdVisibilityOff />}
          </button> */}
        </div>

        <div
          className={`${
            isFocusInput && input && !isValidInput
              ? styles["form-note"]
              : styles["form-note--hidden"]
          }`}
        >
          <MdReport style={{ fontSize: "1rem" }} />
          <RegisterNote label={label} />
        </div>
      </>
    );
  }
);

export default FormInput;
