'use client';
import { useModalStore } from '@/stores/modal';
import { MODAL_TYPES } from '@/utils/constans';
import React from 'react';
import LoginSection from './LoginSection';
import SmallModalSection from './SmallModalSection';

const Modal = () => {
  const { isVisible, type, hideModal, loading, executeCallback } =
    useModalStore();

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
          {type === MODAL_TYPES.LOGOUT && (
            <SmallModalSection
              title="Logout Confirmation"
              desc="Are you sure you want to logout?"
              buttonLabel="Logout"
              handleButton={executeCallback}
              cancelButton={hideModal}
              loading={loading}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Modal;
