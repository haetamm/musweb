'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { urlPage } from '@/utils/constans';
import { AlbumResponse } from '@/lib/action/AlbumAction';
import { formatDurationToMinutes } from '@/utils/helper';
import ActionButton from './ActionButton';

interface AlbumCardProps {
  album: AlbumResponse;
}

const AlbumCard: React.FC<AlbumCardProps> = ({ album }) => {
  const { id, title, coverUrl, songCount, totalDuration, userId } = album;

  return (
    <div className="relative aspect-square">
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent z-0" />

      {/* Tombol aksi */}
      <div className="absolute top-2 right-2 z-10">
        <ActionButton owner={userId} resourceId={id} type="album" />
      </div>
      <Image
        src={coverUrl || '/img/default.svg'}
        alt={`${title} Cover`}
        className="w-full h-full object-cover"
        width={240}
        height={240}
        style={{ aspectRatio: '1/1' }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-3 sm:p-4">
        <div>
          <Link
            href={`${urlPage.ALBUM}/${id}`}
            className="font-bold text-lg sm:text-xl "
          >
            {title}
          </Link>
          <p className="text-indigo-200 text-xs sm:text-sm">
            {`${songCount} Songs • ${formatDurationToMinutes(totalDuration)}`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AlbumCard;
