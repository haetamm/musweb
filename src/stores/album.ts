import { create } from 'zustand';
import { AlbumResponse } from '@/lib/action/AlbumAction';
import { AlbumFormData } from '@/utils/validation';
import { ClientAlbumAction } from '@/lib/action/ClientAlbumAction';
import { showSuccessToast } from '@/hooks/useHandleToast';
import { urlPage } from '@/utils/constans';
import { useModalStore } from './modal';
import { AlbumSection } from '@/utils/types';

interface AlbumState {
  loading: boolean;
  albums: AlbumResponse[];
  albumDetail: AlbumResponse | null;
  setAlbums: (data: AlbumResponse[]) => void;
  createAlbum: (data: AlbumFormData) => void;
  updateAlbum: (id: string, data: AlbumFormData) => void;
  setAlbumDetail: (id: string) => void;
  searchAlbums: (query: string) => Promise<AlbumSection[]>;
}

const useAlbumStore = create<AlbumState>((set, get) => ({
  loading: false,
  albums: [],
  albumDetail: null,

  setAlbums: (data: AlbumResponse[]) => {
    set({ albums: data });
  },

  createAlbum: async (data: AlbumFormData) => {
    set({ loading: true });
    try {
      const response = await ClientAlbumAction.createAlbum(data);
      const newAlbum = response.album;
      set((state) => ({
        albums: [newAlbum, ...state.albums],
      }));
      useModalStore.getState().hideModal();
      showSuccessToast(
        'The album has been saved successfully',
        `${urlPage.ALBUM}/${newAlbum.id}`
      );
    } catch (err) {
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  updateAlbum: async (id: string, data: AlbumFormData) => {
    set({ loading: true });
    try {
      const response = await ClientAlbumAction.updateAlbum(id, data); // Returns Album

      const state = get();
      const existingAlbum = state.albums.find((album) => album.id === id);
      if (!existingAlbum) {
        return;
      }

      const updatedAlbum: AlbumResponse = {
        ...existingAlbum,
        ...response, // Overwrite with updated fields from API (id, title, artist, year)
      };

      // Update state pake set
      set({
        albums: state.albums.map((album) =>
          album.id === id ? updatedAlbum : album
        ),
      });
      useModalStore.getState().hideModal();
      showSuccessToast(
        'The album has been saved successfully',
        `${urlPage.ALBUM}/${response.id}`
      );
    } catch (err) {
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  setAlbumDetail: (id: string) => {
    set((state) => ({
      albumDetail: state.albums.find((album) => album.id === id) || null,
    }));
  },

  searchAlbums: async (query: string): Promise<AlbumSection[]> => {
    set({ loading: true });
    try {
      const data = await ClientAlbumAction.getAlbumByQuery(query);
      console.log(data);
      return data;
    } catch (err) {
      throw err;
    } finally {
      set({ loading: false });
    }
  },
}));

export default useAlbumStore;
