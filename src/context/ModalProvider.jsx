import { useMemo, useState } from 'react';

import { ModalContext } from './Context';

const ModalProvider = ({ children }) => {
  const [isModalShow, setIsMOdalShow] = useState(false);

  const value = useMemo(
    () => ({
      isModalShow,
      setShowModal: setIsMOdalShow,
    }),
    [isModalShow]
  );

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};

export default ModalProvider;
