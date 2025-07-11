import Cookies from 'js-cookie';
import { create } from 'zustand';
import { urlPage } from '@/utils/constans';
import { AuthAction, LoginRequest } from '@/lib/action/AuthAction';
import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase/firebaseConfig';
import { UserResponse } from '@/lib/action/UserAction';
import { useModalStore } from './modal';

interface AuthState {
  accessToken: string;
  refreshToken: string;
  loading: boolean;
  user: UserResponse | null;
  loginUser: (data: LoginRequest) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logoutUser: () => Promise<void>;
}

const accessToken = Cookies.get('accessToken');
const refreshToken = Cookies.get('refreshToken');

const useAuthStore = create<AuthState>((set) => ({
  accessToken: accessToken || '',
  refreshToken: refreshToken || '',
  user: null,
  loading: false,

  loginUser: async (data: LoginRequest) => {
    set({ loading: true });
    try {
      const { accessToken, refreshToken } = await AuthAction.login(data);
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

  loginWithGoogle: async () => {
    set({ loading: true });
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();

      const { accessToken, refreshToken } =
        await AuthAction.loginWithGoogle(idToken);

      Cookies.set('accessToken', accessToken, { expires: 1 / 48 });
      Cookies.set('refreshToken', refreshToken, { expires: 7 });
      set({ accessToken, refreshToken });
      window.location.reload();
    } catch (error) {
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  logoutUser: async () => {
    try {
      if (refreshToken) {
        await AuthAction.logout({ refreshToken });
        await signOut(auth);
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        set({ accessToken: '', refreshToken: '' });
        useModalStore.getState().hideModal();
      }
    } catch (error) {
      throw error;
    }
  },
}));

export default useAuthStore;
