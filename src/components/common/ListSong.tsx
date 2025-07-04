import { songs } from '@/utils/data';
import Image from 'next/image';
import React from 'react';

const ListSong = () => {
  return (
    <div>
      <h2 className="text-lg font-bold mt-2 mb-2">More of what you like</h2>
      <div className="grid grid-cols-2 xs:grid-cols-3 md:grid-cols-3 xl:grid-cols-4 gap-4 gap-y-6 xl:gap-y-10">
        {songs.map(({ id, cover, title, artist }) => (
          <div
            key={id}
            className=" overflow-hidden transition-transform duration-300"
          >
            <div className="aspect-square">
              <Image
                src={cover}
                alt={`${title} Cover`}
                className="w-full h-full object-cover"
                width={240}
                height={240}
              />
            </div>
            <div className="p-2">
              <p className="font-medium truncate text-lg">{title}</p>
              <p className="text-sm text-gray-400 truncate">{artist}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListSong;
