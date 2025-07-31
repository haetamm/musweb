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

export interface PlaylistSongRequest {
  id: string;
  songId: string;
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
  playlistWithSongs: PlaylistWithSongs[] | [];
  setPlaylists: (data: PlaylistResponse[]) => void;
  setplaylistDetailPage: (data: PlaylistDetailResponse) => void;
  setPlaylistSong: (id: string) => void;
  createPlaylist: (
    data: PlaylistFormData,
    songId: string | null
  ) => Promise<void>;
  getPlaylistWithSongs: () => Promise<void>;
  createPlaylistSong: (data: PlaylistSongRequest) => Promise<void>;
  deletePlaylistSong: (data: PlaylistSongRequest) => Promise<void>;
  updatePlaylist: (id: string, data: PlaylistFormData) => Promise<void>;
}

const usePlaylistStore = create<PlaylistState>((set, get) => ({
  loading: false,
  playlists: [],
  playlistDetailPage: null,
  playlistSong: null,
  playlistWithSongs: [],

  setPlaylists: (data: PlaylistResponse[]) => {
    set({ playlists: data });
  },

  setplaylistDetailPage: (data: PlaylistDetailResponse) => {
    set({ playlistDetailPage: data });
  },

  setPlaylistSong: (id: string) => {
    const { songs, songDetailPage } = useSongStore.getState();

    // 1. Cari di array songs
    const foundSong = songs.find((song) => song.id === id);
    if (foundSong) {
      set({
        playlistSong: {
          id: foundSong.id,
          title: foundSong.title,
          performer: foundSong.performer,
          coverUrl: foundSong.coverUrl,
        },
      });
      return;
    }

    // 2. coba dari songDetailPage
    if (songDetailPage && songDetailPage.id === id) {
      set({
        playlistSong: {
          id: songDetailPage.id,
          title: songDetailPage.title,
          performer: songDetailPage.performer,
          coverUrl: songDetailPage.coverUrl ?? '',
        },
      });
    }
  },

  createPlaylist: async (data: PlaylistFormData, songId: string | null) => {
    set({ loading: true });
    try {
      const playlist = await ClientPlaylistAction.createPlaylist(data, songId);

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

  updatePlaylist: async (id: string, data: PlaylistFormData) => {
    try {
      await ClientPlaylistAction.updatePlaylist(id, data);

      set((state) => {
        if (state.playlistDetailPage && state.playlistDetailPage.id === id) {
          return {
            playlistDetailPage: {
              ...state.playlistDetailPage,
              title: data.title,
            },
          };
        }
        return {};
      });
      useModalStore.getState().hideModal();
      showSuccessToast('The playlist has been updated successfully.', ``);
    } catch (err) {
      throw err;
    }
  },

  getPlaylistWithSongs: async () => {
    set({ loading: true });
    try {
      const playlists = await ClientPlaylistAction.getAllMyPlaylist();
      set({ playlistWithSongs: playlists });
    } catch (err) {
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  createPlaylistSong: async (data: PlaylistSongRequest) => {
    try {
      const playlistId = await ClientPlaylistAction.createPlaylistSong(data);

      const { playlistSong, playlistWithSongs } = get();

      if (playlistSong && playlistSong.id === data.songId) {
        const updatedPlaylists = playlistWithSongs.map((playlist) => {
          if (playlist.id === data.id) {
            return {
              ...playlist,
              songs: [...playlist.songs, playlistSong],
            };
          }
          return playlist;
        });

        set({ playlistWithSongs: updatedPlaylists });
      }

      showSuccessToast(
        'The song has been added to playlists.',
        `${urlPage.PLAYLIST_DETAIL}/${playlistId}`
      );
    } catch (err) {
      throw err;
    }
  },

  deletePlaylistSong: async (data: PlaylistSongRequest) => {
    try {
      await ClientPlaylistAction.deletePlaylistSong(data);
      const { playlistWithSongs, playlistDetailPage } = get();

      // Update playlistWithSongs
      const updatedPlaylists = playlistWithSongs.map((playlist) => {
        if (playlist.id === data.id) {
          return {
            ...playlist,
            songs: playlist.songs.filter((song) => song.id !== data.songId),
          };
        }
        return playlist;
      });

      // Update playlistDetailPage if it exists and matches the playlist ID
      let updatedPlaylistDetailPage = playlistDetailPage;
      if (playlistDetailPage && playlistDetailPage.id === data.id) {
        const deletedSong = playlistDetailPage.songs.find(
          (song) => song.id === data.songId
        );
        const updatedSongs = playlistDetailPage.songs.filter(
          (song) => song.id !== data.songId
        );
        updatedPlaylistDetailPage = {
          ...playlistDetailPage,
          songs: updatedSongs,
          songCount: updatedSongs.length.toString(), // Update songCount
          totalDuration: deletedSong
            ? (
                Number(playlistDetailPage.totalDuration) - deletedSong.duration
              ).toString()
            : playlistDetailPage.totalDuration, // Update totalDuration
        };
      }

      // Update both states
      set({
        playlistWithSongs: updatedPlaylists,
        playlistDetailPage: updatedPlaylistDetailPage,
      });

      showSuccessToast('The song has been deleted from the playlist.', '');
    } catch (err) {
      throw err;
    }
  },
}));

export default usePlaylistStore;
