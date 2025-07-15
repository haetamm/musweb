import { SongAction, SongResponse } from '@/lib/action/SongAction';
import { create } from 'zustand';

interface SongState {
  loading: boolean;
  songs: SongResponse[];
  getSongsByUserCurrent: () => Promise<void>;
}

const useSongStore = create<SongState>((set) => ({
  loading: false,
  songs: [],

  getSongsByUserCurrent: async () => {
    set({ loading: true });
    const { data } = await SongAction.getSongByCurrentUser();
    if (data?.songs) {
      set({ songs: data.songs });
    }

    set({ loading: false });
  },
}));

export default useSongStore;
