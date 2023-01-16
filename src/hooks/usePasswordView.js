import { useState } from 'react';

const usePasswordView = () => {
  const [isPasswordView, setIsPasswordView] = useState(false);

  const viewPasswordHandler = () =>
    setIsPasswordView((prevState) => !prevState);

  return {
    isPasswordView,
    viewPasswordHandler,
  };
};

export default usePasswordView;
