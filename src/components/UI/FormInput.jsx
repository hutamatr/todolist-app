import React, { forwardRef, useState } from 'react';

import { ReactComponent as Check } from '../../assets/icons/uil_check.svg';
import { ReactComponent as Eye } from '../../assets/icons/uil_eye.svg';
import { ReactComponent as EyeSlash } from '../../assets/icons/uil_eye-slash.svg';

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
      name,
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
              ? 'bg-green-10 ring-1 ring-green-100'
              : !input
              ? ''
              : 'bg-orange-50 ring-1 ring-orange-100'
          }`}
        >
          <input
            required
            type={isPassView ? 'text' : type}
            id={id}
            name={name}
            value={input}
            autoComplete={autoComplete ? autoComplete : null}
            ref={ref}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            placeholder={placeholder}
            className={`w-full rounded-md bg-neutral-200 p-2 text-sm font-medium outline-none placeholder:text-xs ${
              isValidInput && input
                ? 'bg-green-10'
                : !input
                ? ''
                : 'bg-orange-50'
            }`}
          />
          {isValidInput && input && placeholder !== 'Password' && (
            <Check className="mr-2 w-max" fill="#5BE26A" />
          )}
          {type === 'password' &&
            placeholder !== 'Confirm Password' &&
            input && (
              <>
                {isPassView ? (
                  <Eye
                    className="mr-2 cursor-pointer"
                    onClick={viewPasswordHandler}
                    fill="#5B5B60"
                  />
                ) : (
                  <EyeSlash
                    className="mr-2 cursor-pointer"
                    onClick={viewPasswordHandler}
                    fill="#5B5B60"
                  />
                )}
              </>
            )}
        </div>
        <RegisterNote placeholder={placeholder} />
      </>
    );
  }
);

export default FormInput;
