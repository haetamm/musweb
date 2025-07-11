import { useHandleErrors } from '@/hooks/useHandleErrors';
import useAuthStore from '@/stores/auth';
import { useModalStore } from '@/stores/modal';
import React from 'react';
import toast from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';
import { FiLoader } from 'react-icons/fi';

const GoogleLoginForm = () => {
  const { showLogin } = useModalStore();
  const { loginWithGoogle, loading } = useAuthStore();
  const { handleErrors } = useHandleErrors();

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      toast.success('Login berhasil!');
    } catch (error) {
      handleErrors(error);
    }
  };

  return (
    <>
      <h2 className="text-3xl md:text-4xl font-bold mb-6">
        Sign in or create an account
      </h2>

      <button
        disabled={loading}
        onClick={handleGoogleLogin}
        className="w-full bg-gray-800 cursor-pointer disabled:bg-gray-500 disabled:cursor-not-allowed text-white font-semibold py-2 rounded mb-4 flex items-center justify-center"
      >
        <span className="inline-flex items-center justify-center">
          {loading ? (
            <FiLoader className="animate-spin h-4 w-4 mr-2" />
          ) : (
            <FcGoogle className="h-5 w-5 mr-2" />
          )}
          <span>Continue with Google</span>
        </span>
      </button>

      <div className="text-center mb-4">
        <span className="text-gray-400">Or with email</span>
      </div>

      <input
        onClick={showLogin}
        type="email"
        placeholder="Your email address"
        className="w-full bg-gray-700 text-white placeholder-gray-400 p-2 rounded mb-4"
      />

      <button
        disabled
        className="w-full bg-gray-500 text-white font-semibold py-2 rounded mb-4"
      >
        Continue
      </button>
    </>
  );
};

export default GoogleLoginForm;
