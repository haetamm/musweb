'use client';

import { useHandleErrors } from '@/hooks/useHandleToast';
import usePreload from '@/hooks/usePreload';
import useAuthStore from '@/stores/auth';
import { useModalStore } from '@/stores/modal';
import { urlPage } from '@/utils/constans';
import { useRouter } from 'next/navigation';
import React from 'react';

const ButtonLoginOrLogout = () => {
  const { showGoogleLogin, showLogout, hideModal } = useModalStore();
  const { loading } = usePreload();
  const { isAuthenticated, accessToken } = useAuthStore();
  const { logoutUser } = useAuthStore();
  const { handleErrors } = useHandleErrors();
  const router = useRouter();

  const onLogoutClick = () => {
    showLogout(async () => {
      try {
        await logoutUser();
        router.push(urlPage.HOME);
        hideModal();
      } catch (error) {
        handleErrors(error);
      }
    });
  };

  const isLogin = () => {
    return isAuthenticated || accessToken;
  };

  return (
    <>
      <div className="flex-shrink-0 ml-4 lg:ml-0 lg:p-1 bg-white/10 rounded-full">
        <button
          disabled={loading}
          onClick={isLogin() ? onLogoutClick : showGoogleLogin}
          className="w-auto cursor-pointer disabled:cursor-not-allowed hover:bg-white/20 px-6 py-2 rounded-full items-center justify-center"
        >
          {loading ? (
            <span className="animate-pulse">Loading</span>
          ) : isLogin() ? (
            'Logout'
          ) : (
            'Login'
          )}
        </button>
      </div>
    </>
  );
};

export default ButtonLoginOrLogout;
