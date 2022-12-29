import React, { useState } from 'react';

import { ModalContext } from './Context';

const ModalProvider = ({ children }) => {
  const [isModalShow, setIsMOdalShow] = useState(false);

  const value = {
    isModalShow,
    setShowModal: setIsMOdalShow,
  };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};

export default ModalProvider;
