import React from 'react';

import { MdCheckCircleOutline } from 'react-icons/md';

const Alert = ({ children, onAlertShow }) => {
  return (
    <div
      className={`alert alert-success absolute m-4 max-w-fit shadow-lg duration-300 ${
        onAlertShow ? 'bottom-0' : ''
      }`}
    >
      <div>
        <MdCheckCircleOutline />
        <span>{children}</span>
      </div>
    </div>
  );
};

export default Alert;
