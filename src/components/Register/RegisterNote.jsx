import React from 'react';

import styles from './register-note.module.css';

const RegisterNote = ({ label }) => {
  let note;

  if (label === 'Username') {
    note =
      '4 to 24 characters. Must begin with a letter. Letters, numbers, underscores, hyphens allowed.';
  }

  if (label === 'Email') {
    note = 'Only valid email can register';
  }

  if (label === 'Password') {
    note = (
      <>
        8 to 24 characters. Must include uppercase and lowercase letters, a
        number and a special character. Allowed special characters:
        <span className={styles['register-note--symbol']}>
          <span>!</span>
          <span>@</span>
          <span>#</span>
          <span>$</span>
          <span>%</span>
        </span>
      </>
    );
  }

  if (label === 'Confirm') {
    note = 'Password not match';
  }

  return <p className={styles['register-note']}>{note}</p>;
};

export default RegisterNote;
