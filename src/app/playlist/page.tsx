import PlaylistCard from '@/components/common/PlaylistCard';
import { playlists } from '@/utils/data';
import React from 'react';
import { FaPlus } from 'react-icons/fa6';

const Playlist = () => {
  return (
    <div className="mb-13 lg:mb-0 lg:px-4">
      <h2 className="text-lg font-bold mt-4 lg:mt-0 mb-2">Your Playlist:</h2>
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-6">
        <div className="w-full glass-card h-[152px] bg-gradient-to-br from-indigo-900 to-purple-800 rounded-xl shadow-lg flex items-center justify-center">
          <FaPlus className="text-7xl text-purple-300/50" />
        </div>
        {playlists.map((playlist) => (
          <PlaylistCard key={playlist.id} playlist={playlist} />
        ))}
      </div>
    </div>
  );
};

export default Playlist;
