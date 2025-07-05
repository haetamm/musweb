'use client';

import { useState } from 'react';
import {
  FaPlay,
  FaPause,
  FaHeart,
  FaRegHeart,
  FaEllipsisH,
  FaCalendarAlt,
  FaMicrophone,
  FaMusic,
} from 'react-icons/fa';
import { IoMdTime } from 'react-icons/io';

interface Song {
  id: string;
  title: string;
  year: number;
  performer: string;
  genre: string;
  duration: number;
}

const SongDetailPage = () => {
  const song: Song = {
    id: 'song-LzIvZG4HeJsEW1ln',
    title: 'Rindu in echnicolo',
    year: 2008,
    performer: 'Coldplay',
    genre: 'Pop',
    duration: 120,
  };

  const [isPlaying, setIsPlaying] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // Format duration from seconds to MM:SS
  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className=" glass-card text-white py-6 xl:mt-2 rounded-xl mb-13 lg:mb-0">
      <div className="px-6 mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Song Details</h1>
          <button className="p-2 rounded-full hover:bg-gray-700">
            <FaEllipsisH className="text-xl" />
          </button>
        </div>

        {/* Song Info */}
        <div className="flex flex-col md:flex-row gap-8 mb-10">
          {/* Album Art */}
          <div className="w-full md:w-64 h-64 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg flex-shrink-0 flex items-center justify-center">
            <FaMusic className="text-8xl text-white opacity-70" />
          </div>

          {/* Song Details */}
          <div className="flex-1 flex flex-col justify-center">
            <h2 className="text-4xl font-bold mb-2">{song.title}</h2>
            <p className="text-xl text-gray-300 mb-6">{song.performer}</p>

            <div className="flex items-center gap-4 mb-6">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="bg-indigo-600 hover:bg-indigo-800 text-white rounded-full p-4 flex items-center justify-center"
              >
                {isPlaying ? (
                  <FaPause className="text-xl" />
                ) : (
                  <FaPlay className="text-xl" />
                )}
              </button>

              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="p-3 rounded-full border border-gray-600 hover:bg-gray-700"
              >
                {isFavorite ? (
                  <FaHeart className="text-xl text-red-500" />
                ) : (
                  <FaRegHeart className="text-xl" />
                )}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <FaMicrophone className="text-gray-400" />
                <div>
                  <p className="text-sm text-gray-400">Artist</p>
                  <p className="font-medium">{song.performer}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <FaMusic className="text-gray-400" />
                <div>
                  <p className="text-sm text-gray-400">Genre</p>
                  <p className="font-medium">{song.genre}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <FaCalendarAlt className="text-gray-400" />
                <div>
                  <p className="text-sm text-gray-400">Year</p>
                  <p className="font-medium">{song.year}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <IoMdTime className="text-gray-400" />
                <div>
                  <p className="text-sm text-gray-400">Duration</p>
                  <p className="font-medium">{formatDuration(song.duration)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SongDetailPage;
