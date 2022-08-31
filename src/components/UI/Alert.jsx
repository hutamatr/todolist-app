import React, { useEffect } from 'react';

import { MdErrorOutline, MdDone } from 'react-icons/md';

const Alert = ({
  children,
  className,
  icons,
  onError,
  onSetError,
  onSuccess,
  onSetSuccess,
}) => {
  useEffect(() => {
    if (onError) {
      const errorTime = setTimeout(() => {
        onSetError({
          isError: false,
          errorMessage: '',
        });
      }, 3000);
      return () => {
        clearTimeout(errorTime);
      };
    }
    if (onSuccess) {
      const successTime = setTimeout(() => {
        onSetSuccess({
          isSuccess: false,
          successMessage: '',
        });
      }, 3000);
      return () => {
        clearTimeout(successTime);
      };
    }
  }, [onError, onSuccess, onSetError, onSetSuccess]);

  return (
    <div
      className={`alert fixed top-4 max-w-xs flex-row shadow-lg ${className}`}
    >
      <div>
        {icons === 'success' && (
          <MdDone className="h-6 w-6 flex-shrink-0 stroke-current" />
        )}
        {icons === 'error' && (
          <MdErrorOutline className="h-6 w-6 flex-shrink-0 stroke-current" />
        )}
        <span className="font-medium">{children}</span>
      </div>
    </div>
  );
};

export default Alert;
