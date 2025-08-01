import { useHandleErrors } from '@/hooks/useHandleToast';
import useAuthStore from '@/stores/auth';
import { useModalStore } from '@/stores/modal';
import React from 'react';
import CustomButton from '../common/CustomButton';
import { FcGoogle } from 'react-icons/fc';

const GoogleLoginForm = () => {
  const { showLogin } = useModalStore();
  const { loginWithGoogle, loading } = useAuthStore();
  const { handleErrors } = useHandleErrors();

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (error) {
      handleErrors(error);
    }
  };

  return (
    <>
      <h2 className="text-3xl md:text-4xl font-bold mb-6">
        Sign in or create an account
      </h2>

      <CustomButton
        type="submit"
        onClick={handleGoogleLogin}
        loading={loading}
        disabled={loading}
      >
        <span className="inline-flex items-center justify-center">
          {!loading && <FcGoogle className="h-5 w-5 mr-2" />}
          <span>Continue with Google</span>
        </span>
      </CustomButton>

      <div className="text-center my-4">
        <span className="text-gray-400">Or with email</span>
      </div>

      <input
        onClick={showLogin}
        type="email"
        placeholder="Your email address"
        className="w-full bg-gray-700 text-white placeholder-gray-400 p-2 rounded mb-4"
      />

      <CustomButton type="button" disabled={true} variant="secondary">
        Continue
      </CustomButton>
    </>
  );
};

export default GoogleLoginForm;
