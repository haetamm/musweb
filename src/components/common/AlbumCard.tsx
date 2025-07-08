'use client';

import React from 'react';
import Image from 'next/image';
import { Album } from '@/utils/types';
import Link from 'next/link';
import { urlPage } from '@/utils/constans';

interface AlbumCardProps {
  album: Album;
}

const AlbumCard: React.FC<AlbumCardProps> = ({ album }) => {
  return (
    <Link href={`${urlPage.ALBUM}/${album.id}`} className="relative ">
      <Image
        src={album.coverUrl || '/default.png'}
        alt={`${album.name} Cover`}
        className="w-full h-full object-cover"
        width={240}
        height={240}
        style={{ aspectRatio: '1/1' }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-3 sm:p-4">
        <div>
          <h3 className="font-bold text-lg sm:text-xl">{album.name}</h3>
          <p className="text-indigo-200 text-xs sm:text-sm">
            {`${album.songs} Songs • ${album.duration}`}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default AlbumCard;
