'use client';

import { SongDetailResponse } from '@/lib/action/SongAction';
import useSongStore from '@/stores/song';
import { urlPage } from '@/utils/constans';
import { formatDurationToMinutes } from '@/utils/helper';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import {
  FaCompactDisc,
  FaHeart,
  FaMicrophone,
  FaMusic,
  FaPlay,
  FaUser,
} from 'react-icons/fa6';
import { IoMdTime } from 'react-icons/io';
import SongDetailItem from './SongDetailItem';
import SongDetailPageSkeleton from './SongDetailPageSkeleton';
import NotFoundMessage from '../common/NotFoundMessage';

interface Props {
  songResult: SongDetailResponse;
}

const SongDetailPageSectionSection: React.FC<Props> = ({ songResult }) => {
  const { songDetailPage: song, setSongDetailPage } = useSongStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setSongDetailPage(songResult);
    setLoading(false);
  }, [setSongDetailPage, songResult]);

  if (loading) return <SongDetailPageSkeleton />;

  if (!song) {
    return <NotFoundMessage label="Song" />;
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 mb-10">
      <div className="w-full lg:w-80 h-80 relative group overflow-hidden rounded-2xl shadow-2xl flex-shrink-0">
        {song.coverUrl ? (
          <Image
            src={song.coverUrl}
            alt={`${song.title} cover`}
            width={320}
            height={320}
            className="w-full h-full object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105"
            priority
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center">
            <FaMusic className="text-9xl text-white opacity-50" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-4 flex items-center justify-center transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <FaPlay className="text-xl" />
          </button>
        </div>
      </div>

      {/* Song Details */}
      <div className="flex-1 flex flex-col justify-center">
        <div className="mb-6">
          <h2 className="text-4xl lg:text-5xl font-bold mb-2 tracking-tight">
            {song.title}
          </h2>
          <p className="text-xl lg:text-2xl text-gray-300 mb-1 font-medium">
            {song.performer}
          </p>
          {song.album?.title && (
            <p className="text-lg text-gray-400 mb-6">
              From the album{' '}
              <Link
                href={`${urlPage.ALBUM}/${song.album.id}`}
                className="text-indigo-300 hover:underline cursor-pointer"
              >
                {song.album.title}
              </Link>
            </p>
          )}
        </div>

        <div className="flex items-center gap-4 mb-8">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-4 flex items-center justify-center transition-colors duration-200 shadow-lg hover:shadow-indigo-500/30">
            <FaPlay className="text-xl" />
          </button>

          <button className="p-3.5 rounded-full border border-white/30 hover:bg-gray-700/50 flex items-center justify-center transition-colors duration-200 hover:border-red-500/50 group">
            <FaHeart className="text-xl text-red-500 group-hover:scale-110 transition-transform duration-200" />
          </button>

          <div className="flex items-center ml-2 bg-gray-800/50 px-4 py-2 rounded-full">
            <FaHeart className="text-red-500 mr-2 animate-pulse" />
            <span className="font-medium">
              {song.likes?.length || 0}{' '}
              {song.likes?.length === 1 ? 'like' : 'likes'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <SongDetailItem
            icon={<FaMicrophone className="text-indigo-400" />}
            label="Performer"
            value={song.performer}
          />
          <SongDetailItem
            icon={<FaMusic className="text-purple-400" />}
            label="Genre"
            value={song.genre}
          />
          <SongDetailItem
            icon={<FaCalendarAlt className="text-blue-400" />}
            label="Year"
            value={song.year}
          />
          <SongDetailItem
            icon={<IoMdTime className="text-amber-400" />}
            label="Duration"
            value={formatDurationToMinutes(song.duration || '0')}
          />
          <SongDetailItem
            icon={<FaCompactDisc className="text-emerald-400" />}
            label="Album"
            value={
              song.album?.id ? (
                <Link
                  href={`${urlPage.ALBUM}/${song.album.id}`}
                  className="hover:underline cursor-pointer text-emerald-300"
                >
                  {song.album.title}
                </Link>
              ) : (
                <span>-</span>
              )
            }
          />
          <SongDetailItem
            icon={<FaUser className="text-pink-400" />}
            label="Uploaded By"
            value={song.uploader}
          />
        </div>

        {song.likes && song.likes.length > 0 && (
          <div className="mt-6">
            <p className="text-gray-400 mb-3 text-sm uppercase tracking-wider">
              Liked by
            </p>
            <div className="flex flex-wrap gap-3">
              {song.likes.map(({ fullname }, index) => (
                <span
                  key={index}
                  className="bg-gradient-to-r from-gray-700 to-gray-800 px-4 py-2 rounded-full text-sm shadow-md flex items-center gap-2"
                >
                  <FaHeart className="text-red-400 text-xs" />
                  {fullname}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SongDetailPageSectionSection;
