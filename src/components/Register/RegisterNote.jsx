const RegisterNote = ({ placeholder }) => {
  let note;

  if (placeholder === 'Username') {
    note =
      '4 to 24 characters. Must begin with a letter. Letters, numbers, underscores, hyphens allowed.';
  }

  if (placeholder === 'Email') {
    note = 'Only valid email can register';
  }

  if (placeholder === 'Password') {
    note = '8 to 24 characters. \n Include uppercase & number';
  }

  if (placeholder === 'Confirm Password') {
    note = 'Password not match';
  }

  return <p className="text-[.65rem] font-bold text-red-700">{note}</p>;
};

export default RegisterNote;
