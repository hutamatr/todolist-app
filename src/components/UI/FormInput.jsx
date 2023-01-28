import { forwardRef } from 'react';

import RegisterNote from 'components/Register/RegisterNote';

import { MdDone } from 'react-icons/md';
import { HiOutlineEyeOff, HiOutlineEye } from 'react-icons/hi';

const FormInput = forwardRef(
  (
    {
      id,
      placeholder,
      isValidInput,
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
            <MdDone className="m-1 text-xl text-green-100" />
          )}
          {type === 'password' && name !== 'passwordMatch' && input && (
            <>
              {onPasswordView ? (
                <HiOutlineEye
                  className="m-1 cursor-pointer text-xl text-slate-800"
                  onClick={onPasswordViewHandler}
                />
              ) : (
                <HiOutlineEyeOff
                  className="m-1 cursor-pointer text-xl text-slate-800"
                  onClick={onPasswordViewHandler}
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
