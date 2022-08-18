import React, { forwardRef, useState } from 'react';
import { MdCheck } from 'react-icons/md';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';

import RegisterNote from '../Register/RegisterNote';

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

    const viewPasswordHandler = () => setIsPassView((prevState) => !prevState);

    return (
      <>
        <div
          className={`flex flex-row items-center justify-between rounded-md bg-neutral-200 ${
            isValidInput && input
              ? 'bg-sub-primary-10 ring-1 ring-sub-primary-100'
              : !input
              ? ''
              : 'bg-primary-50 ring-1 ring-primary-100'
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
              isValidInput && input
                ? 'bg-sub-primary-10'
                : !input
                ? ''
                : 'bg-primary-50'
            }`}
          />
          {isValidInput && input && placeholder !== 'Password' && (
            <MdCheck className="mr-2" />
          )}
          {type === 'password' &&
            placeholder !== 'Confirm Password' &&
            input && (
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
        <div
          className={`${
            isFocusInput && input && !isValidInput ? 'block' : 'hidden'
          }`}
        >
          <RegisterNote placeholder={placeholder} />
        </div>
      </>
    );
  }
);

export default FormInput;
