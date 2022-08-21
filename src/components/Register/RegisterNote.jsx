const RegisterNote = ({ placeholder }) => {
  let note;

  if (placeholder === 'Username') {
    note = <p>* Alphabet, numeric, underscore, hyphens only (4-24).</p>;
  }

  if (placeholder === 'Password') {
    note = <p>* Include uppercase & number (8-24).</p>;
  }

  return (
    <div className="text-[.65rem] font-semibold text-neutral-500">{note}</div>
  );
};

export default RegisterNote;
