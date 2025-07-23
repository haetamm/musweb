import { urlPage } from '@/utils/constans';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import SongActionButton from './SongActionButton';
import { SongDetail } from '@/utils/types';

interface SongCardProps {
  song: SongDetail;
}

const SongCard: React.FC<SongCardProps> = ({ song }) => {
  const { id, title, coverUrl, performer, userId } = song;

  return (
    <div>
      <div className="relative aspect-square">
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent z-0" />

        {/* Tombol aksi */}
        <div className="absolute top-2 right-2 z-10">
          <SongActionButton owner={userId} songId={id} />
        </div>

        <Image
          src={coverUrl || '/img/default.svg'}
          alt={`${title} Cover`}
          className="w-full h-full object-cover"
          width={240}
          height={240}
        />
      </div>

      <div className="p-2">
        <div className="overflow-hidden text-ellipsis whitespace-nowrap">
          <Link
            href={`${urlPage.SONG}/${id}`}
            className="block font-medium text-lg xl:text-xl truncate"
          >
            {title}
          </Link>
        </div>

        <p className="text-sm text-gray-400 truncate">{performer}</p>
      </div>
    </div>
  );
};

export default SongCard;
