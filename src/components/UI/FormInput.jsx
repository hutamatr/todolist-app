import React, { forwardRef, useState } from 'react';
import { MdCheck } from 'react-icons/md';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';

// import RegisterNote from "../Register/RegisterNote";

// import styles from "./form-input.module.css";

const FormInput = forwardRef(
  (
    {
      id,
      placeholder,
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
    const [isPassView, setIsPassView] = useState(false);

    // useEffect(() => {
    //   if (type === "password") {
    //     setIsPassView(false);
    //   }
    // }, [type]);

    const viewPasswordHandler = () => setIsPassView((prevState) => !prevState);

    return (
      <>
        {/* <label htmlFor={label.toLowerCase()} className={styles["form-label"]}>
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
        </label> */}
        <div
          className={`flex flex-row items-center justify-between rounded-md bg-neutral-200 ${
            isValidInput && input ? 'bg-sub-primary-10' : 'ring-red-500'
          }`}
        >
          <input
            required
            type={isPassView ? 'text' : type}
            id={id}
            value={input}
            autoComplete={autoComplete ? autoComplete : null}
            ref={ref}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            placeholder={placeholder}
            className={`w-full rounded-md bg-neutral-200 p-2 text-sm font-medium placeholder:text-xs ${
              isValidInput && input ? 'bg-sub-primary-10' : ''
            }`}
          />
          {isValidInput && input && placeholder !== 'Password' && (
            <MdCheck className="mr-2" />
          )}
          {type === 'password' && placeholder !== 'Confirm' && input && (
            <>
              {isPassView ? (
                <AiOutlineEye
                  className="mr-2 cursor-pointer"
                  onClick={viewPasswordHandler}
                />
              ) : (
                <AiOutlineEyeInvisible
                  className="mr-2 cursor-pointer"
                  onClick={viewPasswordHandler}
                />
              )}
            </>
          )}
        </div>
        {/* <div
          className={`${
            isFocusInput && input && !isValidInput
              ? styles["form-note"]
              : styles["form-note--hidden"]
          }`}
        >
          <MdReport style={{ fontSize: "1rem" }} />
          <RegisterNote placeholder={placeholder} />
        </div> */}
      </>
    );
  }
);

export default FormInput;
