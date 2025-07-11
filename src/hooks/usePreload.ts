'use client';

import { useEffect, useState } from 'react';
import useAuthStore from '@/stores/auth';
import { UserAction } from '@/lib/action/UserAction';
import Cookies from 'js-cookie';
import { useHandleErrors } from './useHandleErrors';

const usePreload = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const { handleErrors } = useHandleErrors();
  const accessToken = Cookies.get('accessToken');

  useEffect(() => {
    const checkAuth = async () => {
      if (!accessToken) {
        useAuthStore.setState({ user: null });
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        const user = await UserAction.getUserCurrent();
        useAuthStore.setState({ user });
        setIsAuthenticated(true);
      } catch (error) {
        handleErrors(error);
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        useAuthStore.setState({
          user: null,
          accessToken: '',
          refreshToken: '',
        });
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  return { isAuthenticated, loading };
};

export default usePreload;
