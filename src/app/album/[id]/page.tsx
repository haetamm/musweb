import SongDetailTable from '@/components/common/SongDetailTable';
import { albumDetail } from '@/utils/data';
import Image from 'next/image';
import {
  FaPlay,
  FaHeart,
  FaEllipsisH,
  FaCalendarAlt,
  FaMusic,
} from 'react-icons/fa';
import { MdLibraryMusic } from 'react-icons/md';

const AlbumDetailPage = () => {
  const album = albumDetail;

  return (
    <div className=" text-white py-8 xl:mt-2 rounded-xl mb-13 lg:mb-0">
      <div className="px-2 lg:px-6 mx-auto">
        {/* Album Header */}
        <div className="flex flex-col xs:flex-row gap-8 items-start md:items-end mb-10">
          {/* Album Cover - Placeholder if coverUrl is null */}
          <div className="w-full xs:w-48 h-48 md:w-64 md:h-64 bg-indigo-800/30  rounded-2xl shadow-xl flex items-center justify-center">
            {album.coverUrl ? (
              <Image
                src={album.coverUrl}
                alt={album.name}
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <MdLibraryMusic className="text-8xl text-purple-300" />
            )}
          </div>

          {/* Album Info */}
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              {album.name}
            </h1>
            <p className="text-xl text-gray-300 mb-4">Coldplay</p>

            <div className="flex items-center gap-4 text-gray-400 mb-6">
              <div className="flex items-center gap-1">
                <FaCalendarAlt />
                <span>{album.year}</span>
              </div>
              <div className="flex items-center gap-1">
                <FaMusic />
                <span>
                  {album.songs.length}{' '}
                  {album.songs.length === 1 ? 'song' : 'songs'}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button className="bg-indigo-600 hover:bg-indigo-800 text-white px-6 py-2 rounded-full flex items-center gap-2 transition">
                <FaPlay /> Play
              </button>
              <button className="bg-transparent border border-gray-600 hover:border-gray-500 text-white px-4 py-2 rounded-full flex items-center gap-2 transition">
                <FaHeart /> Save
              </button>
              <button className="bg-transparent border border-gray-600 hover:border-gray-500 text-white p-2 rounded-full transition">
                <FaEllipsisH />
              </button>
            </div>
          </div>
        </div>

        {/* Songs List */}
        <SongDetailTable songs={album.songs} />
      </div>
    </div>
  );
};

export default AlbumDetailPage;
