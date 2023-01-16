import { forwardRef } from 'react';

import RegisterNote from 'components/Register/RegisterNote';

import { ReactComponent as Check } from 'assets/icons/uil_check.svg';
import { ReactComponent as Eye } from 'assets/icons/uil_eye.svg';
import { ReactComponent as EyeSlash } from 'assets/icons/uil_eye-slash.svg';

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
      onPasswordView,
      onPasswordViewHandler,
    },
    ref
  ) => {
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
            type={onPasswordView ? 'text' : type}
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
          {isValidInput && input && name !== 'password' && (
            <Check className="mx-3 w-max" fill="#5BE26A" />
          )}
          {type === 'password' && name !== 'passwordMatch' && input && (
            <>
              {onPasswordView ? (
                <Eye
                  className="mx-3 cursor-pointer text-2xl"
                  onClick={onPasswordViewHandler}
                  fill="#5B5B60"
                />
              ) : (
                <EyeSlash
                  className="mx-3 cursor-pointer text-2xl"
                  onClick={onPasswordViewHandler}
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
