import React from 'react';
import { createPortal } from 'react-dom';

const ModalBackdrop = ({ onCloseModalHandler }) => {
  return (
    <div
      className="fixed top-0 left-0 z-20 min-h-full w-full bg-slate-900/75"
      onClick={onCloseModalHandler}
    />
  );
};

const ModalCard = ({ children }) => {
  return (
    <section className="fixed left-0 right-0 bottom-0 z-30 mx-auto flex max-h-[90vh] max-w-lg flex-col overflow-y-scroll rounded-md bg-slate-50 p-6 shadow sm:top-1/4 sm:max-h-[60vh]">
      {children}
    </section>
  );
};

const Modal = ({ children, onCloseModalHandler }) => {
  return (
    <>
      {createPortal(
        <ModalBackdrop onCloseModalHandler={onCloseModalHandler} />,
        document.getElementById('modal-backdrop')
      )}
      {createPortal(
        <ModalCard children={children} />,
        document.getElementById('modal-card')
      )}
    </>
  );
};

export default Modal;
