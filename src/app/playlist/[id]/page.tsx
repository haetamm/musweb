import { playlist } from '@/utils/data';
import {
  FaPlay,
  FaHeart,
  FaEllipsisH,
  FaHeadphones,
  FaUser,
} from 'react-icons/fa';
import { MdLibraryMusic } from 'react-icons/md';

const PlaylistDetail = () => {
  return (
    <div className=" bg-gradient-to-br from-indigo-900 to-purple-800 pt-5 text-white mb-13 lg:mb-0">
      <div className="md:px-6 mx-auto">
        {/* Header */}
        <header className="hidden md:flex justify-between items-center mb-8">
          <div className=" flex items-center space-x-4">
            <MdLibraryMusic className="text-3xl text-purple-300" />
            <h1 className=" text-lg lg:text-xl font-bold">Playlist Details</h1>
          </div>
          <button className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition">
            <FaUser className="text-purple-300" />
            <span>{playlist.username}</span>
          </button>
        </header>

        {/* Playlist Info */}
        <section className="flex flex-col xs:flex-row items-center md:items-end space-y-6 xs:space-y-0 xs:space-x-8 mb-12">
          <div className="w-48 h-48 md:w-64 md:h-64 bg-indigo-800/30 rounded-xl shadow-lg flex items-center justify-center">
            <MdLibraryMusic className="text-7xl md:text-9xl text-purple-300/50" />
          </div>

          <div className="flex-1">
            <p className="text-sm text-purple-200 mb-2">PLAYLIST</p>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {playlist.name}
            </h1>
            <p className="text-purple-200 mb-6">
              Created by {playlist.username}
            </p>

            <div className="flex space-x-4">
              <button className="flex items-center justify-center bg-purple-500 hover:bg-purple-600 text-white px-8 py-3 rounded-full font-medium transition transform hover:scale-105">
                <FaPlay className="mr-2" />
                Play
              </button>
              <button className="flex items-center justify-center bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition">
                <FaHeart className="text-xl" />
              </button>
              <button className="flex items-center justify-center bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition">
                <FaEllipsisH className="text-xl" />
              </button>
            </div>
          </div>
        </section>

        {/* Songs List */}
        <section className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-2xl font-bold">Songs</h2>
            <p className="text-purple-200">
              {playlist.songs.length}{' '}
              {playlist.songs.length === 1 ? 'song' : 'songs'}
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10 text-purple-200 text-left">
                  <th className="pb-4">#</th>
                  <th className="pb-4">Title</th>
                  <th className="pb-4">Performer</th>
                  <th className="pb-4 text-right"></th>
                </tr>
              </thead>
              <tbody>
                {playlist.songs.map((song, index) => (
                  <tr
                    key={song.id}
                    className="border-b border-white/10 hover:bg-white/5 transition"
                  >
                    <td className="py-4">{index + 1}</td>
                    <td className="py-4 font-medium">{song.title}</td>
                    <td className="py-4 text-purple-200">{song.performer}</td>
                    <td className="py-4 text-right">
                      <button className="text-purple-300 hover:text-white transition">
                        <FaEllipsisH />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Stats */}
        <section className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/5 rounded-lg p-6 flex items-center space-x-4">
            <div className="bg-purple-500/20 p-4 rounded-full">
              <FaHeadphones className="text-2xl text-purple-300" />
            </div>
            <div>
              <p className="text-sm text-purple-200">Total Songs</p>
              <p className="text-2xl font-bold">{playlist.songs.length}</p>
            </div>
          </div>

          <div className="bg-white/5 rounded-lg p-6 flex items-center space-x-4">
            <div className="bg-indigo-500/20 p-4 rounded-full">
              <MdLibraryMusic className="text-2xl text-indigo-300" />
            </div>
            <div>
              <p className="text-sm text-purple-200">Playlist Duration</p>
              <p className="text-2xl font-bold">-</p>
            </div>
          </div>

          <div className="bg-white/5 rounded-lg p-6 flex items-center space-x-4">
            <div className="bg-blue-500/20 p-4 rounded-full">
              <FaUser className="text-2xl text-blue-300" />
            </div>
            <div>
              <p className="text-sm text-purple-200">Contributor</p>
              <p className="text-2xl font-bold">{playlist.username}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PlaylistDetail;
