'use client';

import React from 'react';
import Image from 'next/image';
import { Album } from '@/utils/types';

interface AlbumCardProps {
  album: Album;
}

const AlbumCard: React.FC<AlbumCardProps> = ({ album }) => {
  const { cover, title, duration, songs } = album;
  return (
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
    </div>
  );
};

export default AlbumCard;
