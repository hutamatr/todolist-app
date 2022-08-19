import React from 'react';
import { createPortal } from 'react-dom';

const ModalCard = ({ children }) => {
  return (
    <>
      <input type="checkbox" id="my-modal-6" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box relative !rounded-b-none !rounded-t-lg sm:!rounded-lg">
          {children}
        </div>
      </div>
    </>
  );
};

const Modal = ({ children }) => {
  return (
    <>
      {createPortal(
        <ModalCard children={children} />,
        document.getElementById('modal-card')
      )}
    </>
  );
};

export default Modal;
