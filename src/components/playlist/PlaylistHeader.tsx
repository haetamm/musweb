import { FaUser } from 'react-icons/fa';
import { MdLibraryMusic } from 'react-icons/md';

const PlaylistHeader = ({ owner }: { owner: string }) => (
  <header className="flex justify-between items-center mt-2 mb-3 md:my-0 md:mb-8">
    <div className="flex items-center space-x-4">
      <MdLibraryMusic className="text-3xl text-purple-300" />
      <h1 className="text-2xl font-bold">Playlist Details</h1>
    </div>
    <button className="hidden md:flex items-center space-x-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition">
      <FaUser className="text-purple-300" />
      <span>{owner}</span>
    </button>
  </header>
);

export default PlaylistHeader;
