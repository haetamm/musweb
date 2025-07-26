import { create } from 'zustand';
import {
  PlaylistDetailResponse,
  PlaylistResponse,
} from '@/lib/action/PlaylistAction';

interface AlbumState {
  loading: boolean;
  playlists: PlaylistResponse[];
  playlistDetailPage: PlaylistDetailResponse | null;
  setPlaylists: (data: PlaylistResponse[]) => void;
  setplaylistDetailPage: (data: PlaylistDetailResponse) => void;
}

const usePlaylistStore = create<AlbumState>((set) => ({
  loading: false,
  playlists: [],
  playlistDetailPage: null,

  setPlaylists: (data: PlaylistResponse[]) => {
    set({ playlists: data });
  },

  setplaylistDetailPage: (data: PlaylistDetailResponse) => {
    set({ playlistDetailPage: data });
  },
}));

export default usePlaylistStore;
