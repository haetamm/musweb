import Image from 'next/image';
import React from 'react';
import {
  FaSearch,
  FaHeart,
  FaEdit,
  FaTrash,
  FaPlay,
  FaEllipsisH,
  FaCompactDisc,
  FaList,
  FaUsers,
} from 'react-icons/fa';

// Sample data for songs and albums
const songs = [
  {
    id: 1,
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    album: 'After Hours',
    duration: '3:20',
  },
  {
    id: 2,
    title: 'Save Your Tears',
    artist: 'The Weeknd',
    album: 'After Hours',
    duration: '3:35',
  },
];

const albums = [
  {
    id: 1,
    title: 'Midnight Memories',
    cover: 'https://dummyimage.com/600x600/333/fff&text=Midnight+Memories',
    songs: 12,
    duration: '45 min',
    likes: 245,
  },
  {
    id: 2,
    title: 'Sunny Days',
    cover: 'https://dummyimage.com/600x600/333/fff&text=Sunny+Days',
    songs: 10,
    duration: '38 min',
    likes: 189,
  },

  {
    id: 3,
    title: 'Wondering About Love',
    cover: 'https://dummyimage.com/600x600/333/fff&text=Wondering+About+Love',
    songs: 12,
    duration: '38 min',
    likes: 189,
  },
  {
    id: 4,
    title: 'Good Night',
    cover: 'https://dummyimage.com/600x600/333/fff&text=Good+Night',
    songs: 5,
    duration: '38 min',
    likes: 10,
  },
];

export default function Home() {
  return (
    <div className="bg-gradient-to-br from-indigo-900 to-purple-800 text-white min-h-screen pb-20 lg:pb-0">
      <header className="sticky top-0 z-40 backdrop-blur-md py-4">
        <div className=" mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            {/* Desktop Navigation (hidden on mobile) */}
            <div className="hidden lg:flex overflow-x-auto">
              <div className="flex space-x-1 bg-white/10 rounded-full p-1">
                <button className="px-6 py-2 rounded-full bg-white text-indigo-900 font-medium flex items-center gap-2">
                  <FaCompactDisc /> Albums
                </button>
                <button className="px-6 py-2 rounded-full hover:bg-white/10 transition flex items-center gap-2">
                  <FaList /> Playlists
                </button>
                <button className="px-6 py-2 rounded-full hover:bg-white/10 transition flex items-center gap-2">
                  <FaUsers /> Collaborations
                </button>
              </div>
            </div>

            <div className="flex flex-row gap-3 w-full lg:w-auto">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search songs, albums..."
                  className="w-full pl-10 pr-4 py-2 rounded-full bg-indigo-800/50 border border-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-indigo-300"
                />
                <FaSearch className="absolute left-3 top-3.5 text-indigo-300" />
              </div>
              <button className="hidden xs:flex bg-white/10 hover:bg-white/20 border border-white/20 px-6 py-2 rounded-full items-center justify-center gap-2 transition">
                Search
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className=" mx-auto px-4 py-5">
        <main className="mb-16 lg:mb-0">
          {/* Recently Played Table */}
          <div className="glass-card rounded-2xl overflow-hidden mb-8">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="py-4 px-6 text-left">Title</th>
                  <th className="py-4 px-6 text-left">Artist</th>
                  <th className="py-4 px-6 text-left">Album</th>
                  <th className="py-4 px-6 text-left">Duration</th>
                  <th className="py-4 px-6 text-left"></th>
                </tr>
              </thead>
              <tbody>
                {songs.map((song) => (
                  <tr
                    key={song.id}
                    className="border-b border-white/5 hover:bg-white/5"
                  >
                    <td className="py-4 px-6">{song.title}</td>
                    <td className="py-4 px-6">{song.artist}</td>
                    <td className="py-4 px-6">{song.album}</td>
                    <td className="py-4 px-6">{song.duration}</td>
                    <td className="py-4 px-6">
                      <div className="flex gap-3">
                        <button className="text-indigo-300 hover:text-white">
                          <FaPlay />
                        </button>
                        <button className="text-indigo-300 hover:text-white">
                          <FaEllipsisH />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Albums Grid */}
          <h2 className="text-2xl font-bold mb-6">Your Albums</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {albums.map((album) => (
              <div
                key={album.id}
                className="glass-card rounded-2xl overflow-hidden hover-grow transition-transform duration-300"
              >
                <div className="relative">
                  <Image
                    src={album.cover}
                    alt={`${album.title} Cover`}
                    className="w-full h-60 object-cover"
                    width={240}
                    height={240}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4">
                    <div>
                      <h3 className="font-bold text-xl">{album.title}</h3>
                      <p className="text-indigo-200">{`${album.songs} Songs • ${album.duration}`}</p>
                    </div>
                  </div>
                  <button className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition">
                    <FaHeart className="text-white" />
                  </button>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-indigo-200">{`${album.likes} likes`}</span>
                    <div className="flex gap-2">
                      <button className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition">
                        <FaEdit className="text-sm" />
                      </button>
                      <button className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition">
                        <FaTrash className="text-sm" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>

        <nav className="lg:hidden fixed bottom-4 left-4 right-4 bg-white/20 backdrop-blur-lg border border-white/30 shadow-xl shadow-purple-900/20 rounded-full z-50 py-1 px-6 transition-all duration-300 hover:bg-white/30 hover:border-white/40">
          <div className="flex justify-around items-center">
            <button className="relative flex flex-col items-center justify-center text-white p-2 group transition-all duration-200">
              <div className="p-3 rounded-full group-hover:bg-white/10 group-active:bg-white/20 transition-all duration-200">
                <FaCompactDisc className="text-xl text-white group-hover:text-purple-200 transition-all duration-200" />
              </div>
              <span className="absolute -bottom-6 text-xs font-medium text-white/80 opacity-0 group-hover:opacity-100 transition-all duration-200">
                Albums
              </span>
            </button>

            <button className="relative flex flex-col items-center justify-center text-white p-2 group transition-all duration-200">
              <div className="p-3 rounded-full group-hover:bg-white/10 group-active:bg-white/20 transition-all duration-200">
                <FaList className="text-xl text-white group-hover:text-purple-200 transition-all duration-200" />
              </div>
              <span className="absolute -bottom-6 text-xs font-medium text-white/80 opacity-0 group-hover:opacity-100 transition-all duration-200">
                Playlists
              </span>
            </button>

            <button className="relative flex flex-col items-center justify-center text-white p-2 group transition-all duration-200">
              <div className="p-3 rounded-full group-hover:bg-white/10 group-active:bg-white/20 transition-all duration-200">
                <FaUsers className="text-xl text-white group-hover:text-purple-200 transition-all duration-200" />
              </div>
              <span className="absolute -bottom-6 text-xs font-medium text-white/80 opacity-0 group-hover:opacity-100 transition-all duration-200">
                Collab
              </span>
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
}
