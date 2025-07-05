import { songs } from '@/utils/data';
import React from 'react';
import SongCard from './SongCard';

const ListSong = () => {
  return (
    <div>
      <h2 className="text-lg font-bold mt-2 mb-2">More of what you like</h2>
      <div className="grid grid-cols-2 xs:grid-cols-3 md:grid-cols-3 xl:grid-cols-4 gap-4 gap-y-6 xl:gap-y-10">
        {songs.slice(0, 7).map((song) => (
          <SongCard key={song.id} song={song} />
        ))}
      </div>
    </div>
  );
};

export default ListSong;
