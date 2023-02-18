import { useState } from 'react';
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
    <section className="fixed left-0 right-0 bottom-0 z-40 mx-auto flex max-h-[90vh] max-w-lg flex-col overflow-y-auto rounded-md bg-slate-50 p-6 shadow dark:bg-neutral-700 sm:top-1/4 sm:max-h-[55vh]">
      {children}
    </section>
  );
};

const Modal = ({ children, onCloseModalHandler }) => {
  const [containerBackdrop] = useState(
    document.getElementById('modal-backdrop')
  );

  const [containerCard] = useState(document.getElementById('modal-card'));

  return (
    <>
      {createPortal(
        <ModalBackdrop onCloseModalHandler={onCloseModalHandler} />,
        containerBackdrop
      )}
      {createPortal(<ModalCard>{children}</ModalCard>, containerCard)}
    </>
  );
};

export default Modal;
