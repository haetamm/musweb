import { SongSearchResponse } from '@/lib/action/SongAction';
import { urlPage } from '@/utils/constans';
import { formatDurationToMinutes } from '@/utils/helper';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaHeart, FaEllipsisH, FaPlay } from 'react-icons/fa';
import { MdAccessTime } from 'react-icons/md';

interface SearchSongCardProps {
  song: SongSearchResponse;
}

const SearchSongCard: React.FC<SearchSongCardProps> = ({ song }) => {
  return (
    <div className="group w-full h-28 lg:h-38 flex items-center gap-4 rounded-lg">
      {/* Cover Image with Play Button */}
      <div className="relative w-24 h-24 lg:w-38 lg:h-38 flex-shrink-0 overflow-hidden rounded-md">
        <Image
          src={song.coverUrl || '/img/default.svg'}
          alt={`${song.title} cover`}
          width={64}
          height={64}
          className="object-cover w-full h-full"
        />
        <button className="absolute inset-0 m-auto bg-indigo-600/90 hover:bg-indigo-500 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110">
          <FaPlay className="text-lg" />
        </button>
      </div>

      {/* Song Info */}
      <div className="flex-grow min-w-0 pr-4">
        <div className="flex items-center justify-between">
          <div className="truncate">
            <Link
              href={`${urlPage.SONG}/${song.id}`}
              className="text-lg lg:text-xl xl:text-2xl font-bold truncate bg-gradient-to-r from-indigo-200 to-cyan-200 bg-clip-text text-transparent"
            >
              {song.title}
            </Link>
            <p className="text-sm lg:text-xl text-gray-300/80 hover:text-cyan-200 transition-colors duration-300 truncate">
              {song.performer}
            </p>
          </div>
          <div className="flex items-center space-x-4 ml-4">
            <span className="text-sm xl:text-lg text-cyan-300/80 flex items-center font-mono">
              <MdAccessTime className="mr-1 text-indigo-300" />
              {formatDurationToMinutes(song.duration)}
            </span>
          </div>
        </div>

        {/* Like and Menu Buttons */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center space-x-2">
            <button className="transition-all duration-300 flex items-center hover:scale-105 active:scale-95">
              <FaHeart className="mr-1 text-rose-500/90 hover:text-rose-400 text-lg" />
              <span className="text-lg font-medium text-rose-100/90">
                {song.likesCount}
              </span>
            </button>
          </div>
          <button className="text-gray-400 hover:text-indigo-300 transition-all duration-300 hover:scale-110">
            <FaEllipsisH className="text-lg" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchSongCard;
