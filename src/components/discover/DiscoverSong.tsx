import React from 'react';
import { SongAction } from '@/lib/action/SongAction';
import DiscoverSongList from './DiscoverSongList';

const DiscoverSong = async () => {
  const { data: result, error } = await SongAction.getSongByQuery('', 1, true);

  return (
    <>
      <DiscoverSongList songsResult={result?.songs} error={error} />
    </>
  );
};

export default DiscoverSong;
