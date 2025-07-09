import Cookies from 'js-cookie';
import { create } from 'zustand';
import axiosInstance from '../utils/api';
import { urlPage } from '@/utils/constans';

export type LoginRequest = {
  email: string;
  password: string;
};

interface AuthState {
  accessToken: string;
  refreshToken: string;
  loading: boolean;
  loginUser: (data: LoginRequest) => Promise<void>;
}

const accessToken = Cookies.get('accessToken');
const refreshToken = Cookies.get('refreshToken');

const useAuthStore = create<AuthState>((set) => ({
  accessToken: accessToken || '',
  refreshToken: refreshToken || '',
  loading: false,

  loginUser: async (data: LoginRequest) => {
    set({ loading: true });
    try {
      const { data: response } = await axiosInstance.post(
        '/authentications',
        data
      );
      const { data: user } = response;
      const { accessToken, refreshToken } = user;
      Cookies.set('accessToken', accessToken, { expires: 1 / 48 });
      Cookies.set('refreshToken', refreshToken, { expires: 7 });
      set({ accessToken, refreshToken });
      window.location.assign(urlPage.HOME);
    } catch (error) {
      throw error;
    } finally {
      set({ loading: false });
    }
  },
}));

export default useAuthStore;
