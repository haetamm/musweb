'use client';

import { useEffect, useState } from 'react';
import useAuthStore from '@/stores/auth';
import { useHandleErrors } from './useHandleToast';

const usePreload = () => {
  const { handleErrors } = useHandleErrors();
  const { checkAuth, isAuthenticated } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAuth = async () => {
      try {
        await checkAuth();
      } catch (error) {
        handleErrors(error);
      } finally {
        setLoading(false);
      }
    };

    loadAuth();
  }, [checkAuth]);

  return { isAuthenticated, loading };
};

export default usePreload;
