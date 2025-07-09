import { useModalStore } from '@/stores/modal';
import React from 'react';
import { FcGoogle } from 'react-icons/fc';

const GoogleLoginForm = () => {
  const { showLogin } = useModalStore();
  return (
    <>
      <h2 className="text-3xl md:text-4xl font-bold mb-6">
        Sign in or create an account
      </h2>

      {/* Google Button */}
      <button className="w-full bg-gray-800 text-white font-semibold py-2 rounded mb-4 flex items-center justify-center">
        <FcGoogle className="mr-2" />
        Continue with Google
      </button>

      {/* Or with Email */}
      <div className="text-center mb-4">
        <span className="text-gray-400">Or with email</span>
      </div>

      {/* Email Input */}
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
