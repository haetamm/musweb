import { FaEllipsisH, FaHeart, FaPlay } from 'react-icons/fa';
import { MdLibraryMusic } from 'react-icons/md';

const PlaylistInfo = ({ title, owner }: { title: string; owner: string }) => (
  <section className="flex flex-col xs:flex-row items-center md:items-end space-y-6 xs:space-y-0 xs:space-x-8 mb-12">
    <div className="w-full xs:w-48 h-48 md:w-64 md:h-64 bg-indigo-800/30 rounded-xl shadow-lg flex items-center justify-center">
      <MdLibraryMusic className="text-7xl md:text-9xl text-purple-300/50" />
    </div>

    <div className="flex-1 w-full px-2 xs:px-0">
      <p className="text-sm text-purple-200 mb-2">PLAYLIST</p>
      <h1 className="text-4xl md:text-6xl font-bold mb-4">{title}</h1>
      <p className="text-purple-200 mb-6">Created by {owner}</p>

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
);

export default PlaylistInfo;
