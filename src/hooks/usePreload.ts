'use client';

import { useEffect, useState } from 'react';
import useAuthStore from '@/stores/auth';
import { useHandleErrors } from './useHandleErrors';

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkAuth]);

  return { isAuthenticated, loading };
};

export default usePreload;
