import { AlbumResponse } from '@/lib/action/AlbumAction';
import { urlPage } from '@/utils/constans';
import { formatDurationToMinutes } from '@/utils/helper';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaPlay, FaMusic, FaClock, FaEllipsisH } from 'react-icons/fa';

interface SearchAlbumCardProps {
  album: AlbumResponse;
}
const SearchAlbumCard: React.FC<SearchAlbumCardProps> = ({ album }) => {
  return (
    <div className="group w-full min-h-38 flex flex-col glass-card lg:flex-row lg:gap-6 px-3 pt-6 pb-2  lg:p-4 rounded-xl border border-gray-700 hover:border-indigo-500/30 transition-all duration-500 shadow-2xl hover:shadow-indigo-500/20 overflow-hidden">
      {/* Album Cover */}
      <div className="relative w-24 h-24 lg:w-38 lg:h-38 flex-shrink-0 overflow-hidden rounded-lg border-2 border-gray-600/50 group-hover:border-indigo-500/50 transition-all duration-300">
        <Image
          src={album.coverUrl || '/img/default-album.png'}
          alt={`${album.title} album cover`}
          width={10}
          height={10}
          className="object-cover w-full h-full"
        />
        <button className="absolute inset-0 m-auto bg-indigo-600/90 hover:bg-indigo-500 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110">
          <FaPlay className="text-lg" />
        </button>
      </div>

      {/* Album Info */}
      <div className="flex-grow flex flex-col justify-between mt-3 lg:mt-0">
        <div>
          <Link
            href={`${urlPage.ALBUM}/${album.id}`}
            className="text-2xl lg:text-3xl font-bold mb-1 bg-gradient-to-r from-indigo-300 to-cyan-300 bg-clip-text text-transparent"
          >
            {album.title}
          </Link>
          <p className="text-lg text-gray-300 hover:text-cyan-200 transition-colors duration-300">
            {album.artist}
          </p>
          <p className="text-sm text-indigo-400/80 mt-1">
            Released: {album.year}
          </p>
        </div>

        {/* Album Stats */}
        <div className="mt-4 flex flex-wrap gap-4">
          <div className="flex items-center text-cyan-300/90">
            <FaMusic className="mr-2 text-indigo-300" />
            <span className="font-medium">{album.songCount} songs</span>
          </div>
          <div className="flex items-center text-cyan-300/90">
            <FaClock className="mr-2 text-indigo-300" />
            <span className="font-medium">
              {formatDurationToMinutes(album.totalDuration)}
            </span>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="self-end lg:self-center">
        <button className="text-gray-400 hover:text-indigo-300 transition-all duration-300 p-2 rounded-full hover:bg-gray-700/50">
          <FaEllipsisH className="text-xl" />
        </button>
      </div>
    </div>
  );
};

export default SearchAlbumCard;
