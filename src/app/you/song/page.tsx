import SongCard from '@/components/common/SongCard';
import { songs } from '@/utils/data';
import React from 'react';
import { FaPlus } from 'react-icons/fa6';

const MySong = () => {
  return (
    <>
      <div className="lg:px-4 mb-13 lg:mb-0">
        <h2 className="text-lg font-bold mt-4 lg:mt-0 mb-2">Your Songs:</h2>
        <div className="grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 xl:gap-y-10">
          <div className="w-full h-[156px] xs:h-[192px] md:h-[172px] lg:h-[210px] xl:h-[192px] glass-card bg-gradient-to-br from-indigo-900 to-purple-800 shadow-lg flex items-center justify-center">
            <FaPlus className="text-7xl  text-purple-300/50" />
          </div>
          {songs.map((song) => (
            <SongCard key={song.id} song={song} />
          ))}
        </div>
      </div>
    </>
  );
};

export default MySong;
