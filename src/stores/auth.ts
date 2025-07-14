import Cookies from 'js-cookie';
import { create } from 'zustand';
import { AuthAction, LoginRequest } from '@/lib/action/AuthAction';
import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase/firebaseConfig';
import { UserAction, UserResponse } from '@/lib/action/UserAction';
import { useModalStore } from './modal';

interface AuthState {
  accessToken: string;
  refreshToken: string;
  loading: boolean;
  user: UserResponse | null;
  loginUser: (data: LoginRequest) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logoutUser: () => Promise<void>;
  isAuthenticated: boolean;
  checkAuth: () => Promise<void>;
}

const accessToken = Cookies.get('accessToken');
const refreshToken = Cookies.get('refreshToken');

const useAuthStore = create<AuthState>((set) => ({
  accessToken: accessToken || '',
  refreshToken: refreshToken || '',
  user: null,
  loading: false,
  isAuthenticated: false,

  loginUser: async (data: LoginRequest) => {
    set({ loading: true });
    try {
      const { accessToken, refreshToken } = await AuthAction.login(data);
      Cookies.set('accessToken', accessToken, { expires: 1 / 48 });
      Cookies.set('refreshToken', refreshToken, { expires: 7 });
      set({ accessToken, refreshToken });
      const user = await UserAction.getUserCurrent();
      set({ user, isAuthenticated: true });
      useModalStore.getState().hideModal();
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
      const user = await UserAction.getUserCurrent();
      set({ user, isAuthenticated: true });
      useModalStore.getState().hideModal();
    } catch (error) {
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  logoutUser: async () => {
    try {
      await AuthAction.logout();
      await signOut(auth);
      Cookies.remove('accessToken');
      Cookies.remove('refreshToken');
      set({ accessToken: '', refreshToken: '', isAuthenticated: false });
      useModalStore.getState().hideModal();
    } catch (error) {
      throw error;
    }
  },

  checkAuth: async () => {
    if (!accessToken) {
      set({ isAuthenticated: false, user: null });
      return;
    }

    set({ loading: true });
    try {
      const user = await UserAction.getUserCurrent();
      set({
        user,
        isAuthenticated: true,
        loading: false,
      });
    } catch (error) {
      throw error;
    } finally {
      set({ loading: false });
    }
  },
}));

export default useAuthStore;
