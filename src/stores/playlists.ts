import { create } from 'zustand';
import {
  PlaylistDetailResponse,
  PlaylistResponse,
} from '@/lib/action/PlaylistAction';
import useSongStore from './song';
import { PlaylistFormData } from '@/utils/validation';
import { ClientPlaylistAction } from '@/lib/action/ClientPlaylistAction';
import { useModalStore } from './modal';
import { showSuccessToast } from '@/hooks/useHandleToast';
import { urlPage } from '@/utils/constans';

export interface PlaylistSong {
  id: string;
  title: string;
  performer: string;
  coverUrl: string;
}

export interface PlaylistWithSongs {
  id: string;
  title: string;
  owner: string;
  songCount: string;
  totalDuration: string;
  songs: PlaylistSong[] | [];
}

interface PlaylistState {
  loading: boolean;
  playlists: PlaylistResponse[];
  playlistDetailPage: PlaylistDetailResponse | null;
  playlistSong: PlaylistSong | null;
  setPlaylists: (data: PlaylistResponse[]) => void;
  setplaylistDetailPage: (data: PlaylistDetailResponse) => void;
  setPlaylistSong: (id: string) => void;
  createPlaylist: (
    data: PlaylistFormData,
    songId: string | null
  ) => Promise<void>;
}

const usePlaylistStore = create<PlaylistState>((set) => ({
  loading: false,
  playlists: [],
  playlistDetailPage: null,
  playlistSong: null,

  setPlaylists: (data: PlaylistResponse[]) => {
    set({ playlists: data });
  },

  setplaylistDetailPage: (data: PlaylistDetailResponse) => {
    set({ playlistDetailPage: data });
  },

  setPlaylistSong: (id: string) => {
    const { songs } = useSongStore.getState();
    const song = songs.find((song) => song.id === id);
    if (song) {
      set({
        playlistSong: {
          id: song.id,
          title: song.title,
          performer: song.performer,
          coverUrl: song.coverUrl,
        },
      });
    }
  },

  createPlaylist: async (data: PlaylistFormData, songId: string | null) => {
    set({ loading: true });
    try {
      const playlist = await ClientPlaylistAction.createPlaylist(data, songId);
      console.log(playlist);

      useModalStore.getState().hideModal();
      showSuccessToast(
        'The playlist has been created successfully.',
        `${urlPage.PLAYLIST_DETAIL}/${playlist.id}`
      );
    } catch (err) {
      throw err;
    } finally {
      set({ loading: false });
    }
  },
}));

export default usePlaylistStore;
