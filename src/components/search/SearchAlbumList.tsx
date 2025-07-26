'use client';

import { AlbumResponse } from '@/lib/action/AlbumAction';
import useAlbumStore from '@/stores/album';
import { urlPage } from '@/utils/constans';
import { formatDurationToMinutes } from '@/utils/helper';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaPlay, FaMusic, FaClock } from 'react-icons/fa';
import ActionButton from '../common/ActionButton';

interface SearchAlbumListProps {
  albumResults: AlbumResponse[];
}

const SearchAlbumList: React.FC<SearchAlbumListProps> = ({ albumResults }) => {
  const { albums, setAlbums } = useAlbumStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setAlbums(albumResults);
    setLoading(false);
  }, [albumResults, setAlbums]);

  const skeletonArray = Array.from({ length: 6 });

  if (loading) {
    return (
      <>
        {skeletonArray.map((_, i) => (
          <div
            key={i}
            className="w-full min-h-38 flex flex-col lg:flex-row lg:gap-6 px-3 pt-6 pb-2 lg:p-4 rounded-xl border border-gray-700 glass-card animate-pulse"
          >
            {/* Skeleton Image */}
            <div className="w-24 h-24 lg:w-38 lg:h-38 bg-gray-700/40 rounded-lg flex-shrink-0" />

            {/* Skeleton Info */}
            <div className="flex-grow mt-3 lg:mt-0 space-y-3">
              <div className="h-6 bg-gray-700/50 rounded w-2/3" />
              <div className="h-4 bg-gray-700/30 rounded w-1/3" />
              <div className="h-3 bg-gray-700/20 rounded w-1/4" />
              <div className="mt-3 flex gap-4">
                <div className="h-4 w-24 bg-gray-700/30 rounded" />
                <div className="h-4 w-20 bg-gray-700/30 rounded" />
              </div>
            </div>

            {/* Skeleton Button */}
            <div className="self-end lg:self-center mt-3 lg:mt-0">
              <div className="w-8 h-8 bg-gray-700/30 rounded-full" />
            </div>
          </div>
        ))}
      </>
    );
  }

  return (
    <>
      {albums.map(
        ({
          id,
          coverUrl,
          title,
          year,
          songCount,
          totalDuration,
          artist,
          userId,
        }) => (
          <div
            key={id}
            className="relative group w-full min-h-38 flex flex-col lg:flex-row lg:gap-6 px-3 pt-6 pb-2 lg:px-4 lg:py-6 rounded-xl border border-gray-700 hover:border-indigo-500/30 transition-all duration-500 shadow-2xl hover:shadow-indigo-500/20 overflow-hidden"
          >
            {/* Album Cover */}
            <div className="relative w-24 h-24 lg:w-40 lg:h-40 flex-shrink-0 overflow-hidden rounded-lg border-2 border-gray-600/50 group-hover:border-indigo-500/50 transition-all duration-300">
              <Image
                src={coverUrl || '/img/default.svg'}
                alt={`${title} album cover`}
                width={10}
                height={10}
                className="object-cover w-full h-full"
              />
              <button className="absolute inset-0 m-auto bg-indigo-600/90 hover:bg-indigo-500 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110">
                <FaPlay className="text-lg" />
              </button>
            </div>

            {/* Album Info */}
            <div className="flex-grow flex flex-col justify-between mt-3 py-1 lg:mt-0">
              <div>
                <Link
                  href={`${urlPage.ALBUM}/${id}`}
                  className="text-2xl lg:text-3xl font-bold mb-1 bg-gradient-to-r from-indigo-300 to-cyan-300 bg-clip-text text-transparent"
                >
                  {title}
                </Link>
                <p className="text-lg text-gray-300 hover:text-cyan-200 transition-colors duration-300">
                  {artist}
                </p>
                <p className="text-sm text-indigo-400/80 mt-1">
                  Released: {year}
                </p>
              </div>

              {/* Album Stats */}
              <div className="mt-4 flex flex-wrap gap-4">
                <div className="flex items-center text-cyan-300/90">
                  <FaMusic className="mr-2 text-indigo-300" />
                  <span className="font-medium">{songCount} songs</span>
                </div>
                <div className="flex items-center text-cyan-300/90">
                  <FaClock className="mr-2 text-indigo-300" />
                  <span className="font-medium">
                    {formatDurationToMinutes(totalDuration)}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="absolute top-2 right-6 lg:static lg:self-center">
              <ActionButton owner={userId} resourceId={id} type="album" />
            </div>
          </div>
        )
      )}
    </>
  );
};

export default SearchAlbumList;
