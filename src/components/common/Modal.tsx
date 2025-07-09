import { useModalStore } from '@/stores/modal';
import { MODAL_TYPES } from '@/utils/constans';
import React from 'react';
import LoginSection from './LoginSection';

const Modal = () => {
  const { isVisible, type } = useModalStore();

  if (!isVisible) return null;

  return (
    <>
      <div
        className="relative z-100 "
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div
          className="fixed inset-0 bg-gray-500/75 transition-opacity overflow-y-scroll"
          aria-hidden="true"
        ></div>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          {(type === MODAL_TYPES.LOGIN_FORM ||
            type === MODAL_TYPES.GOOGLE_LOGIN_FORM) && (
            <LoginSection type={type} />
          )}
        </div>
      </div>
    </>
  );
};

export default Modal;
