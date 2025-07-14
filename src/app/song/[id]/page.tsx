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
    <div className="glass-card text-white pt-6 xl:mt-2 rounded-xl mb-13 lg:mb-0">
      <div className="px-6 mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Song Details</h1>
          <button className="p-2 rounded-full hover:bg-gray-700">
            <FaEllipsisH className="text-xl" />
          </button>
        </div>

        {/* Song Info */}
        <div className="flex flex-col md:flex-row gap-8 mb-10">
          {/* Album Art */}
          <div className="w-full md:w-64 h-64 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg flex-shrink-0 flex items-center justify-center">
            {song?.coverUrl ? (
              <Image
                src={song.coverUrl}
                alt={`${song.title} cover`}
                width={256}
                height={256}
                className="w-full h-full object-cover rounded-lg"
                priority
              />
            ) : (
              <FaMusic className="text-8xl text-white opacity-70" />
            )}
          </div>

          {/* Song Details */}
          <div className="flex-1 flex flex-col justify-center">
            <h2 className="text-4xl font-bold mb-2">{song?.title}</h2>
            <p className="text-xl text-gray-300 mb-1">{song?.performer}</p>
            <p className="text-lg text-gray-400 mb-6">
              Album: {song?.album?.title || '-'}
            </p>

            <div className="flex items-center gap-4 mb-6">
              <button className="bg-indigo-600 hover:bg-indigo-800 text-white rounded-full p-4 flex items-center justify-center">
                <FaPlay className="text-xl" />
              </button>

              <button className="p-3.5 shrink-0 rounded-full border border-white/30 hover:bg-gray-700 flex items-center justify-center">
                <FaHeart className="text-xl text-red-500" />
              </button>

              <div className="flex items-center ml-2">
                <FaHeart className="text-red-500 mr-1" />
                <span>{song?.likes?.length || 0} likes</span>
              </div>
            </div>

            <div className="grid text-sm lg:text-lg grid-cols-2 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <FaMicrophone className="text-gray-400" />
                <div>
                  <p className="text-gray-400">Performer</p>
                  <p className="font-medium">{song?.performer}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <FaMusic className="text-gray-400" />
                <div>
                  <p className="text-gray-400">Genre</p>
                  <p className="font-medium">{song?.genre}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <FaCalendarAlt className="text-gray-400" />
                <div>
                  <p className="text-gray-400">Year</p>
                  <p className="font-medium">{song?.year}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <IoMdTime className="text-gray-400" />
                <div>
                  <p className="text-gray-400">Duration</p>
                  <p className="font-medium">
                    {formatDurationToMinutes(song?.duration || '0')}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <FaCompactDisc className="text-gray-400" />
                <div>
                  <p className="text-gray-400">Album</p>
                  {song?.album?.id ? (
                    <Link
                      href={`${urlPage.ALBUM}/${song.album.id}`}
                      className="hover:underline cursor-pointer"
                    >
                      {song.album.title}
                    </Link>
                  ) : (
                    <span>-</span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <FaCalendarAlt className="text-gray-400" />
                <div>
                  <p className="text-gray-400">Album Year</p>
                  <p className="font-medium">{song?.album?.year || '-'}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <FaUser className="text-gray-400" />
                <div>
                  <p className="text-gray-400">Uploaded By</p>
                  <p className="font-medium">{song?.uploader}</p>
                </div>
              </div>
            </div>

            {song?.likes && song.likes.length > 0 && (
              <div className="mt-6 text-sm lg:text-lg">
                <p className="text-gray-400 mb-2">Liked by:</p>
                <div className="flex flex-wrap gap-2">
                  {song.likes.map(({ fullname }, index) => (
                    <span
                      key={index}
                      className="bg-gray-700 px-3 py-1 rounded-full text-sm"
                    >
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
  );
};

export default SongDetailPage;
