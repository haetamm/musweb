import { ClientSongAction } from '@/lib/action/ClientSongAction';
import { SongFormData } from '@/utils/validation';
import { create } from 'zustand';
import { useModalStore } from './modal';
import { SongDetail, SongMetadata } from '@/utils/types';
import { showSuccessToast } from '@/hooks/useHandleToast';
import { urlPage } from '@/utils/constans';

interface SongState {
  loading: boolean;
  loadingDetail: boolean;
  songs: SongDetail[];
  songDetail: SongMetadata | null;
  createSong: (data: SongFormData) => Promise<void>;
  getSongById: (id: string) => Promise<void>;
  updateSongById: (id: string, data: SongFormData) => Promise<void>;
  setSongs: (data: SongDetail[]) => void;
}

const useSongStore = create<SongState>((set) => ({
  loading: false,
  loadingDetail: false,
  songs: [],
  songDetail: null,

  setSongs: (data: SongDetail[]) => {
    set({ songs: data });
  },

  createSong: async (data: SongFormData) => {
    set({ loading: true });
    try {
      const response = await ClientSongAction.createSong(data);
      const newSong = response.song;

      set((state) => ({
        songs: [newSong, ...state.songs],
      }));

      useModalStore.getState().hideModal();
      showSuccessToast(
        'The song has been saved successfully.',
        `${urlPage.SONG}/${newSong.id}`
      );
    } catch (err) {
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  updateSongById: async (id: string, data: SongFormData) => {
    set({ loading: true });
    try {
      const response = await ClientSongAction.updateSong(id, data);
      const updatedSong = response.song;

      set((state) => ({
        songs: state.songs.map((song) => (song.id === id ? updatedSong : song)),
      }));

      useModalStore.getState().hideModal();
      showSuccessToast(
        'The song has been updated successfully.',
        `${urlPage.SONG}/${updatedSong.id}`
      );
    } catch (err) {
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  getSongById: async (songId: string) => {
    set({ loadingDetail: true });
    console.log('hallo');
    try {
      const { id, title, year, performer, genre, duration, albumId } =
        await ClientSongAction.getSongById(songId);
      const song = {
        id,
        title,
        year: year.toString(),
        performer,
        genre,
        duration: duration.toString(),
        albumId,
      };
      set({ songDetail: song });
    } catch (err) {
      throw err;
    } finally {
      set({ loadingDetail: false });
    }
  },
}));

export default useSongStore;
