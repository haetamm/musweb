'use client';

import { useHandleErrors } from '@/hooks/useHandleErrors';
import usePreload from '@/hooks/usePreload';
import useAuthStore from '@/stores/auth';
import { useModalStore } from '@/stores/modal';
import { urlPage } from '@/utils/constans';
import { useRouter } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';

const ButtonLoginOrLogout = () => {
  const { showGoogleLogin, showLogout } = useModalStore();
  const { isAuthenticated, loading } = usePreload();
  const { logoutUser } = useAuthStore();
  const { handleErrors } = useHandleErrors();
  const router = useRouter();

  const onLogoutClick = () => {
    showLogout(async () => {
      try {
        await logoutUser();
        toast.success('Logout berhasil!');
        router.push(urlPage.HOME);
      } catch (error) {
        handleErrors(error);
      }
    });
  };

  return (
    <>
      <div className="flex-shrink-0 ml-4 lg:ml-0 p-1 bg-white/10 rounded-full">
        <button
          disabled={loading}
          onClick={isAuthenticated ? onLogoutClick : showGoogleLogin}
          className="w-auto cursor-pointer disabled:cursor-not-allowed hover:bg-white/20 px-6 py-2 rounded-full items-center justify-center"
        >
          {loading ? (
            <span className="animate-pulse">Loading</span>
          ) : isAuthenticated ? (
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
