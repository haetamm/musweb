import React from 'react';
import { SongAction } from '@/lib/action/SongAction';
import DiscoverSongList from './DiscoverSongList';

const DiscoverSong = async () => {
  const { data: result, error } = await SongAction.getSongByQuery('', 1, true);

  return (
    <div>
      <h2 className="text-lg font-bold mt-2 mb-2">More of what you like</h2>
      <DiscoverSongList songsResult={result?.songs} error={error} />
    </div>
  );
};

export default DiscoverSong;
