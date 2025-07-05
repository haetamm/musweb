import Image from 'next/image';
import {
  FaPlay,
  FaHeart,
  FaEllipsisH,
  FaCalendarAlt,
  FaMusic,
} from 'react-icons/fa';

interface Song {
  id: string;
  title: string;
  performer: string;
}

interface Album {
  id: string;
  name: string;
  year: number;
  coverUrl: string | null;
  songs: Song[];
}

const AlbumDetailPage = () => {
  const album: Album = {
    id: 'album-wf5UNYs0aVQWtBFF',
    name: 'Viva la vida Revision',
    year: 2010,
    coverUrl: null,
    songs: [
      {
        id: 'song-prXDhhuhm17PgAVb',
        title: 'Life in Technicolor',
        performer: 'Coldplay',
      },
    ],
  };

  return (
    <div className=" text-white py-8 xl:mt-2 rounded-xl mb-13 lg:mb-0">
      <div className="px-2 lg:px-6 mx-auto">
        {/* Album Header */}
        <div className="flex flex-col md:flex-row gap-8 items-start md:items-end mb-10">
          {/* Album Cover - Placeholder if coverUrl is null */}
          <div className="w-48 h-48 md:w-64 md:h-64 bg-indigo-800/30  rounded-2xl shadow-xl flex items-center justify-center">
            {album.coverUrl ? (
              <Image
                src={album.coverUrl}
                alt={album.name}
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <FaMusic className="text-6xl text-purple-300" />
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
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Songs</h2>

          <div className="glass-card text-white bg-opacity-50 rounded-lg overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 px-4 py-3 border-b border-gray-700 text-sm font-medium">
              <div className="col-span-1">#</div>
              <div className="col-span-6">Title</div>
              <div className="col-span-4">Performer</div>
              <div className="col-span-1"></div>
            </div>

            {/* Song Rows */}
            {album.songs.map((song, index) => (
              <div
                key={song.id}
                className="grid grid-cols-12 gap-4 px-4 py-3 hover:bg-indigo-800 transition cursor-pointer items-center"
              >
                <div className="col-span-1 ">{index + 1}</div>
                <div className="col-span-6 font-medium">{song.title}</div>
                <div className="col-span-4 ">{song.performer}</div>
                <div className="col-span-1 flex justify-end">
                  <button className="hover:text-white transition">
                    <FaEllipsisH />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlbumDetailPage;
