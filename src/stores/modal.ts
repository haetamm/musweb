import { create } from 'zustand';
import { MODAL_TYPES } from '@/utils/constans';

interface ModalState {
  isVisible: boolean;
  type: string;
  desc: string;
  callback: (() => void | Promise<void>) | null;
  loading: boolean;
  showModal: (
    type: string,
    callback?: (() => void | Promise<void>) | null
  ) => void;
  showLogout: (callback: () => void | Promise<void>) => void;
  showLogin: () => void;
  showGoogleLogin: () => void;
  showCreateSong: () => void;
  showUpdateSong: (callback: () => void | Promise<void>) => void;
  showCreateAlbum: () => void;
  showUpdateAlbum: () => void;
  showPlaylistForm: () => void;
  showDelete: (desc: string, callback: () => void | Promise<void>) => void;
  showUserGoogleForm: () => void;
  hideModal: () => void;
  executeCallback: () => Promise<void>;
}

export const useModalStore = create<ModalState>((set, get) => ({
  isVisible: false,
  type: '',
  desc: '',
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

  showDelete: (desc, callback) => {
    set({ desc });
    get().showModal(MODAL_TYPES.DELETE, callback);
  },

  showLogin: () => {
    get().showModal(MODAL_TYPES.LOGIN_FORM);
  },

  showGoogleLogin: () => {
    get().showModal(MODAL_TYPES.GOOGLE_LOGIN_FORM);
  },

  showCreateSong: () => {
    get().showModal(MODAL_TYPES.CREATE_SONG_FORM);
  },

  showUpdateSong: (callback) => {
    get().showModal(MODAL_TYPES.UPDATE_SONG_FORM, callback);
  },

  showCreateAlbum: () => {
    get().showModal(MODAL_TYPES.CREATE_ALBUM_FORM);
  },

  showUpdateAlbum: () => {
    get().showModal(MODAL_TYPES.UPDATE_ALBUM_FORM);
  },

  showPlaylistForm: () => {
    get().showModal(MODAL_TYPES.PLAYLIST_FORM);
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
      }
    }
  },
}));
