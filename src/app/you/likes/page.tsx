import SongCard from '@/components/common/SongCard';
import { songs } from '@/utils/data';
import React from 'react';

const SongLikes = () => {
  return (
    <div className="mb-13 lg:mb-0 lg:px-4">
      <h2 className="text-lg font-bold mt-4 lg:mt-0 mb-2">Your liked songs:</h2>
      <div className="grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 gap-y-6 xl:gap-y-10">
        {songs.slice(0, 7).map((song) => (
          <SongCard key={song.id} song={song} />
        ))}
      </div>
    </div>
  );
};

export default SongLikes;
