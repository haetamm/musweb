import { Song } from '@/utils/types';
import Image from 'next/image';
import React from 'react';

interface SongCardProps {
  song: Song;
}

const SongCard: React.FC<SongCardProps> = ({ song }) => {
  const { cover, title, performer } = song;

  return (
    <div>
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
        <p className="font-medium truncate text-lg xl:text-xl">{title}</p>
        <p className="text-sm text-gray-400 truncate">{performer}</p>
      </div>
    </div>
  );
};

export default SongCard;
