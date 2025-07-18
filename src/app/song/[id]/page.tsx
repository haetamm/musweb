import ErrorMessage from '@/components/common/ErrorMessage';
import NotFoundMessage from '@/components/common/NotFoundMessage';
import { SongAction } from '@/lib/action/SongAction';
import { urlPage } from '@/utils/constans';
import { formatDurationToMinutes } from '@/utils/helper';
import Image from 'next/image';
import Link from 'next/link';
import {
  FaPlay,
  FaHeart,
  FaEllipsisH,
  FaCalendarAlt,
  FaMicrophone,
  FaMusic,
  FaCompactDisc,
  FaUser,
} from 'react-icons/fa';
import { IoMdTime } from 'react-icons/io';

const SongDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const { data: song, error, status } = await SongAction.getSongById(id);

  if (status === 404) {
    return <NotFoundMessage label="Song" />;
  }

  if (error || !song) {
    return <ErrorMessage message={error || 'Unknown error occurred'} />;
  }

  return (
    <div className="lg:px-10">
      <div className="text-white pt-6 xl:mt-2 rounded-xl mb-13 lg:mb-0">
        <div className="px-6 mx-auto max-w-7xl">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-600 bg-clip-text text-transparent">
              Song Details
            </h1>
            <button className="p-2 rounded-full hover:bg-gray-700 transition-colors duration-200">
              <FaEllipsisH className="text-xl" />
            </button>
          </div>

          {/* Song Info */}
          <div className="flex flex-col lg:flex-row gap-8 mb-10">
            {/* Album Art */}
            <div className="w-full lg:w-80 h-80 relative group overflow-hidden rounded-2xl shadow-2xl flex-shrink-0">
              {song?.coverUrl ? (
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
                  {song?.title}
                </h2>
                <p className="text-xl lg:text-2xl text-gray-300 mb-1 font-medium">
                  {song?.performer}
                </p>
                {song?.album?.title && (
                  <p className="text-lg text-gray-400 mb-6">
                    From the album{' '}
                    <span className="text-indigo-300 hover:underline cursor-pointer">
                      {song.album.title}
                    </span>
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
                    {song?.likes?.length || 0}{' '}
                    {song?.likes?.length === 1 ? 'like' : 'likes'}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <div className="bg-gray-800/40 p-4 rounded-xl backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-indigo-500/10 rounded-full">
                      <FaMicrophone className="text-indigo-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Performer</p>
                      <p className="font-medium">{song?.performer}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800/40 p-4 rounded-xl backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-purple-500/10 rounded-full">
                      <FaMusic className="text-purple-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Genre</p>
                      <p className="font-medium">{song?.genre}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800/40 p-4 rounded-xl backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-blue-500/10 rounded-full">
                      <FaCalendarAlt className="text-blue-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Year</p>
                      <p className="font-medium">{song?.year}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800/40 p-4 rounded-xl backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-amber-500/10 rounded-full">
                      <IoMdTime className="text-amber-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Duration</p>
                      <p className="font-medium">
                        {formatDurationToMinutes(song?.duration || '0')}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800/40 p-4 rounded-xl backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-emerald-500/10 rounded-full">
                      <FaCompactDisc className="text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Album</p>
                      {song?.album?.id ? (
                        <Link
                          href={`${urlPage.ALBUM}/${song.album.id}`}
                          className="hover:underline cursor-pointer text-emerald-300"
                        >
                          {song.album.title}
                        </Link>
                      ) : (
                        <span>-</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800/40 p-4 rounded-xl backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-pink-500/10 rounded-full">
                      <FaUser className="text-pink-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Uploaded By</p>
                      <p className="font-medium">{song?.uploader}</p>
                    </div>
                  </div>
                </div>
              </div>

              {song?.likes && song.likes.length > 0 && (
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
        </div>
      </div>
    </div>
  );
};

export default SongDetailPage;
