import { create } from 'zustand';
import { PlaylistResponse } from '@/lib/action/PlaylistAction';

interface AlbumState {
  loading: boolean;
  playlists: PlaylistResponse[];
  setPlaylists: (data: PlaylistResponse[]) => void;
}

const usePlaylistStore = create<AlbumState>((set) => ({
  loading: false,
  playlists: [],

  setPlaylists: (data: PlaylistResponse[]) => {
    set({ playlists: data });
  },
}));

export default usePlaylistStore;
