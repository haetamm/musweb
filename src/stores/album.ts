import { create } from 'zustand';
import { AlbumDetailResponse, AlbumResponse } from '@/lib/action/AlbumAction';
import { AlbumFormData } from '@/utils/validation';
import { ClientAlbumAction } from '@/lib/action/ClientAlbumAction';
import { showSuccessToast } from '@/hooks/useHandleToast';
import { urlPage } from '@/utils/constans';
import { useModalStore } from './modal';
import { AlbumSection } from '@/utils/types';
import { formatDurationToMinutes } from '@/utils/helper';

type AlbumMiniDetail = {
  id: string;
  title: string;
  artist: string;
  year: string;
};

interface AlbumState {
  loading: boolean;
  albums: AlbumResponse[];
  albumDetail: AlbumMiniDetail | null;
  albumDetailPage: AlbumDetailResponse | null;
  setAlbums: (data: AlbumResponse[]) => void;
  setAlbumDetailPage: (data: AlbumDetailResponse) => void;
  resetAlbumDetail: () => void;
  createAlbum: (data: AlbumFormData) => void;
  updateAlbum: (id: string, data: AlbumFormData) => void;
  deleteAlbumById: (id: string) => Promise<void>;
  deleteSongFromAlbum: (id: string, songId: string) => Promise<void>;
  setAlbumDetail: (id: string) => void;
  searchAlbums: (query: string) => Promise<AlbumSection[]>;
}

const useAlbumStore = create<AlbumState>((set, get) => ({
  loading: false,
  albums: [],
  albumDetail: null,
  albumDetailPage: null,

  setAlbums: (data: AlbumResponse[]) => {
    set({ albums: data });
  },

  setAlbumDetailPage: (data: AlbumDetailResponse) => {
    const formatted = {
      ...data,
      totalDuration: formatDurationToMinutes(data.totalDuration),
    };

    set({ albumDetailPage: formatted });
  },

  setAlbumDetail: (id: string) => {
    const { albums, albumDetailPage } = get();

    const fromAlbums = albums.find((album) => album.id === id);
    if (fromAlbums) {
      set({
        albumDetail: {
          id: fromAlbums.id,
          title: fromAlbums.title,
          artist: fromAlbums.artist,
          year: fromAlbums.year,
        },
      });
      return;
    }

    if (albumDetailPage && albumDetailPage.id === id) {
      set({
        albumDetail: {
          id: albumDetailPage.id,
          title: albumDetailPage.title,
          artist: albumDetailPage.artist,
          year: albumDetailPage.year,
        },
      });
      return;
    }

    set({ albumDetail: null });
  },

  resetAlbumDetail: () => {
    set({ albumDetail: null });
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
      const response = await ClientAlbumAction.updateAlbum(id, data);

      set((state) => ({
        albums: state.albums.map((album) =>
          album.id === id ? { ...album, ...response } : album
        ),
        albumDetailPage:
          state.albumDetailPage?.id === id
            ? { ...state.albumDetailPage, ...response }
            : state.albumDetailPage,
      }));

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

  deleteAlbumById: async (id: string) => {
    set({ loading: true });
    try {
      await ClientAlbumAction.deleteAlbumById(id);

      set((state) => ({
        albums: state.albums.filter((album) => album.id !== id),
        albumDetailPage: null,
      }));

      useModalStore.getState().hideModal();
      showSuccessToast('The album has been deleted successfully', ``);
    } catch (err) {
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  deleteSongFromAlbum: async (id: string, songId: string) => {
    set({ loading: true });

    try {
      await ClientAlbumAction.deleteSongFromAlbum(id, songId);

      set((state) => {
        const currentDetail = state.albumDetailPage;

        if (!currentDetail) return {};

        // Filter lagu yang dihapus
        const updatedSongs = currentDetail.songs.filter(
          (song) => song.id !== songId
        );

        // Hitung ulang total duration (dalam detik), dan jumlah lagu
        const totalDurationInSeconds = updatedSongs.reduce(
          (total, song) => total + song.duration,
          0
        );
        const songCount = updatedSongs.length;

        return {
          albumDetailPage: {
            ...currentDetail,
            songs: updatedSongs,
            songCount: songCount.toString(),
            totalDuration: formatDurationToMinutes(totalDurationInSeconds),
          },
        };
      });

      useModalStore.getState().hideModal();
      showSuccessToast('Lagu berhasil dihapus dari album.', '');
    } catch (err) {
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  searchAlbums: async (query: string): Promise<AlbumSection[]> => {
    set({ loading: true });
    try {
      const data = await ClientAlbumAction.getAlbumByQuery(query);
      return data;
    } catch (err) {
      throw err;
    } finally {
      set({ loading: false });
    }
  },
}));

export default useAlbumStore;
