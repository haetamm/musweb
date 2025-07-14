import { SongResponse } from '@/lib/action/SongAction';
import { urlPage } from '@/utils/constans';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface SongCardProps {
  song: SongResponse;
}

const SongCard: React.FC<SongCardProps> = ({ song }) => {
  const { id, title, coverUrl, performer } = song;

  return (
    <Link href={`${urlPage.SONG}/${id}`}>
      <div className="aspect-square">
        <Image
          src={coverUrl || '/img/default.png'}
          alt={`${title} Cover`}
          className="w-full h-full object-cover"
          width={240}
          height={240}
        />
      </div>
      <div className="p-2">
        <p className="font-medium truncate text-lg xl:text-xl">{title}</p>
        <p className="text-sm text-gray-400 truncate">{performer}</p>
      </div>
    </Link>
  );
};

export default SongCard;
