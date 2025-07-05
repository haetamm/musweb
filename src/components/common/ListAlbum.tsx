import { albums } from '@/utils/data';
import React from 'react';
import { FaPlus } from 'react-icons/fa6';
import AlbumCard from './AlbumCard';

const ListAlbum = () => {
  return (
    <>
      <h2 className="text-lg font-bold mt-4 lg:mt-0 mb-2">Your Albums:</h2>
      <div className="grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 gap-4 xl:gap-y-10">
        <div className="w-full h-full glass-card bg-gradient-to-br from-indigo-900 to-purple-800 shadow-lg flex items-center justify-center">
          <FaPlus className="text-7xl  text-purple-300/50" />
        </div>
        {albums.slice(0, 6).map((album) => (
          <div
            key={album.id}
            className="glass-card hover-grow transition-transform duration-300 aspect-square"
          >
            <AlbumCard album={album} />
          </div>
        ))}
      </div>
    </>
  );
};

export default ListAlbum;
