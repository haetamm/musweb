'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaPlay } from 'react-icons/fa';
import { formatDurationToMinutes } from '@/utils/helper';
import { urlPage } from '@/utils/constans';
import { SongDetail } from '@/utils/types';
import useSongStore from '@/stores/song';
import ErrorMessageSection from '../layout/ErrorMessageSection';
import ActionButton from '../common/ActionButton';

interface Props {
  songsResult: SongDetail[] | undefined;
  error: string | undefined;
}

const SongTableList: React.FC<Props> = ({ songsResult, error }) => {
  const [loading, setLoading] = useState(true);
  const { songs, setSongs } = useSongStore();

  useEffect(() => {
    setSongs(songsResult ?? []);
    setLoading(false);
  }, [setSongs, songsResult]);

  const skeletons = Array.from({ length: 7 });

  return (
    <div className="space-y-1 divide-y divide-white/5 glass-card py-2">
      {error && (
        <ErrorMessageSection
          error={error}
          height="min-h-[218px] lg:min-h-[300px] "
        />
      )}

      {!error &&
        loading &&
        skeletons.map((_, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 px-3 py-2 animate-pulse"
          >
            <div className="w-14 h-14 bg-gray-700 rounded-md flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-3 bg-gray-700 rounded w-3/4" />
              <div className="h-2 bg-gray-700 rounded w-1/2" />
            </div>
            <div className="h-3 bg-gray-700 rounded w-10" />
          </div>
        ))}

      {!error &&
        !loading &&
        songs?.slice(0, 7).map((song) => (
          <div
            key={song.id}
            className="flex items-center gap-3 px-3 py-2 hover:bg-white/5 transition-colors"
          >
            {/* Album Cover */}
            <div className="relative shrink-0">
              <Image
                width={56}
                height={56}
                src={song.coverUrl || '/img/default.svg'}
                alt={`${song.title} cover`}
                className="w-14 h-14 object-cover"
              />
              <button className="absolute inset-0 m-auto w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <FaPlay className="text-white text-xs" />
              </button>
            </div>

            {/* Song Info */}
            <div className="flex-1 min-w-0">
              <Link
                href={`${urlPage.SONG}/${song.id}`}
                className="text-white font-medium truncate block"
              >
                {song.title}
              </Link>
              <p className="text-indigo-300 text-sm truncate">
                {song.performer}
              </p>
            </div>

            {/* Duration and Actions */}
            <div className="flex items-center gap-4 shrink-0">
              <span className="text-white/70 text-sm">
                {formatDurationToMinutes(song.duration)}
              </span>
              <ActionButton
                owner={song.userId}
                resourceId={song.id}
                type="song"
              />
            </div>
          </div>
        ))}
    </div>
  );
};

export default SongTableList;
