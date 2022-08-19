const validation = () => {
  const userNameValidation = /^[A-z][A-z0-9-_]{3,23}$/;
  const emailValidation = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  const passwordValidation = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,24}$/;

  return {
    userNameValidation,
    emailValidation,
    passwordValidation,
  };
};

export default validation;
