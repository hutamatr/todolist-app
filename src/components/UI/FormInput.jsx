import React, { forwardRef } from "react";
import { MdCheckCircle, MdCancel, MdReport } from "react-icons/md";

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
        <input
          required
          type={type}
          id={label.toLowerCase()}
          value={input}
          autoComplete={autoComplete ? autoComplete : null}
          ref={ref}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          className={styles["form-input"]}
        />
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
