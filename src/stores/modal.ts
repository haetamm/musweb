import { create } from 'zustand';
import { MODAL_TYPES } from '@/utils/constans';

interface ModalState {
  isVisible: boolean;
  type: string;
  callback: (() => void | Promise<void>) | null;
  loading: boolean;
  showModal: (
    type: string,
    callback?: (() => void | Promise<void>) | null
  ) => void;
  showLogout: (callback: () => void | Promise<void>) => void;
  showLogin: () => void;
  showGoogleLogin: () => void;
  showDelete: (callback: () => void | Promise<void>) => void;
  showUserGoogleForm: () => void;
  hideModal: () => void;
  executeCallback: () => Promise<void>;
}

export const useModalStore = create<ModalState>((set, get) => ({
  isVisible: false,
  type: '',
  callback: null,
  loading: false,

  // Generic show modal function
  showModal: (type, callback = null) => {
    set({
      isVisible: true,
      type,
      callback,
      loading: false,
    });
  },

  showLogout: (callback) => {
    get().showModal(MODAL_TYPES.LOGOUT, callback);
  },

  showDelete: (callback) => {
    get().showModal(MODAL_TYPES.DELETE, callback);
  },

  showLogin: () => {
    get().showModal(MODAL_TYPES.LOGIN_FORM);
  },

  showGoogleLogin: () => {
    get().showModal(MODAL_TYPES.GOOGLE_LOGIN_FORM);
  },

  showUserGoogleForm: () => {
    get().showModal(MODAL_TYPES.USER_GOOGLE_FORM);
  },

  hideModal: () => {
    set({
      isVisible: false,
      type: '',
      callback: null,
      loading: false,
    });
  },

  executeCallback: async () => {
    const { callback, ...currentState } = get();
    if (callback) {
      try {
        set({ ...currentState, loading: true });
        await callback();
      } catch (error) {
        console.error('Failed to execute callback:', error);
      } finally {
        set({
          ...currentState,
          loading: false,
          isVisible: false,
        });
      }
    }
  },
}));
