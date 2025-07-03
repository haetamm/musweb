import { albums } from '@/app/utils/data';
import Image from 'next/image';
import React from 'react';
import { FaHeart } from 'react-icons/fa';

const ListAlbum = () => {
  return (
    <div>
      <h2 className="text-lg font-bold mt-4 lg:mt-0 mb-2">Your Albums</h2>
      <div className="grid grid-cols-2 xs:grid-cols-3 md:grid-cols-3 xl:grid-cols-4 gap-4 xl:gap-y-10">
        {albums.map(({ id, cover, title, duration, songs }) => (
          <div
            key={id}
            className="glass-card rounded-2xl overflow-hidden hover-grow transition-transform duration-300 aspect-square"
          >
            <div className="relative ">
              <Image
                src={cover}
                alt={`${title} Cover`}
                className="w-full h-full object-cover"
                width={240}
                height={240}
                style={{ aspectRatio: '1/1' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-3 sm:p-4">
                <div>
                  <h3 className="font-bold text-lg sm:text-xl">{title}</h3>
                  <p className="text-indigo-200 text-xs sm:text-sm">
                    {`${songs} Songs • ${duration}`}
                  </p>
                </div>
              </div>
              <button className="absolute top-2 sm:top-3 right-2 sm:right-3 w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition">
                <FaHeart className="text-white text-sm sm:text-base" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListAlbum;
