import { useModalStore } from '@/stores/modal';
import { loginFields } from '@/utils/fields';
import { loginFormSchema } from '@/utils/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { FaArrowCircleLeft } from 'react-icons/fa';
import FormControllerInput from '../common/FormControllerInput';
import useAuthStore from '@/stores/auth';
import { useHandleErrors } from '@/hooks/useHandleToast';
import { LoginRequest } from '@/lib/action/AuthAction';
import CustomButton from '../common/CustomButton';

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
    } catch (error) {
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
          <div key={index}>
            <FormControllerInput
              name={field.name}
              control={control}
              type={field.type}
              placeholder={field.placeholder}
            />
          </div>
        ))}

        <div className="mt-3">
          <CustomButton
            type="submit"
            loading={loading}
            disabled={!isValid || isSubmitting || loading}
          >
            Login
          </CustomButton>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
