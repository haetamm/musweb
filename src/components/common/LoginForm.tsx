import { useModalStore } from '@/stores/modal';
import { loginFields } from '@/utils/fields';
import { loginFormSchema } from '@/utils/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { FaArrowCircleLeft } from 'react-icons/fa';
import FormControllerInput from './FormControllerInput';
import useAuthStore from '@/stores/auth';
import toast from 'react-hot-toast';
import { useHandleErrors } from '@/hooks/useHandleErrors';
import { LoginRequest } from '@/lib/action/AuthAction';

const LoginForm = () => {
  const { showGoogleLogin } = useModalStore();
  const { loginUser, loading } = useAuthStore();
  const { handleErrors } = useHandleErrors();

  const {
    control,
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(loginFormSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: LoginRequest) => {
    try {
      await loginUser(data);
      toast.success('Login berhasil!');
    } catch (error) {
      console.log(error);
      handleErrors(error);
    }
  };

  return (
    <>
      <div className="relative w-full pt-4 pb-8 flex items-center">
        <FaArrowCircleLeft
          onClick={showGoogleLogin}
          className="h-8 w-8 absolute left-0"
        />
        <h2 className="absolute left-1/2 transform -translate-x-1/2 text-md lg:text-xl font-bold">
          Sign in
        </h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {loginFields.map((field, index) => (
          <div key={index} className="">
            <FormControllerInput
              name={field.name}
              control={control}
              type={field.type}
              placeholder={field.placeholder}
            />
          </div>
        ))}

        <button
          disabled={!isValid || isSubmitting || loading}
          className="w-full disabled:bg-gray-500 disabled:cursor-not-allowed cursor-pointer bg-purple-600 text-white font-semibold py-2 rounded mb-4"
        >
          {loading ? 'Loading' : 'Login'}
        </button>
      </form>
    </>
  );
};

export default LoginForm;
