import { useModalStore } from '@/stores/modal';
import { MODAL_TYPES } from '@/utils/constans';
import React from 'react';
import { MdClose } from 'react-icons/md';
import GoogleLoginForm from './GoogleLoginForm';
import LoginForm from './LoginForm';

interface LoginSectionProps {
  type: string;
}

const LoginSection = ({ type }: LoginSectionProps) => {
  const { hideModal } = useModalStore();
  return (
    <>
      <div className="w-full flex min-h-full  justify-center p-3 items-center animate-[slide-down_0.3s]">
        <div className="transform rounded-xl overflow-hidden text-left shadow-xl transition-all w-full max-w-[450px] bg-gradient-to-br from-indigo-900 to-purple-800 text-white">
          <div className="flex justify-end pt-3 px-3">
            <MdClose onClick={hideModal} className="h-6 w-6 cursor-pointer" />
          </div>
          <div className="flex items-center justify-center bg-gradient-to-br from-indigo-900 to-purple-800 text-white">
            <div className="w-full max-w-md px-6 pb-6">
              {type === MODAL_TYPES.GOOGLE_LOGIN_FORM && <GoogleLoginForm />}
              {type === MODAL_TYPES.LOGIN_FORM && <LoginForm />}

              {/* Need Help */}
              <div className="text-center mb-2">
                <a href="#" className="text-blue-400 hover:underline">
                  Forgot Password?
                </a>
              </div>

              {/* Privacy Notice */}
              <p className="text-sm text-gray-400 text-center">
                When registering, you agree that we may use your provided data
                for the registration and to send you notifications on our
                products and services. You can unsubscribe from notifications at
                any time in your settings. For additional info please refer to
                our{' '}
                <a href="#" className="text-blue-400 hover:underline">
                  Privacy Policy
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginSection;
