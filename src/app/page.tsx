'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  FaSearch,
  FaHeart,
  FaEdit,
  FaTrash,
  FaPlay,
  FaPause,
  FaStepBackward,
  FaStepForward,
  FaEllipsisH,
  FaCompactDisc,
  FaList,
  FaUsers,
  FaVolumeUp,
  FaRandom,
  FaRedoAlt,
} from 'react-icons/fa';

// Sample data
const songs = [
  {
    id: 1,
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    album: 'After Hours',
    duration: '3:20',
    cover: 'https://picsum.photos/300/300',
  },
  {
    id: 2,
    title: 'Save Your Tears',
    artist: 'The Weeknd',
    album: 'After Hours',
    duration: '3:35',
    cover: 'https://picsum.photos/300/300',
  },
];

const albums = [
  {
    id: 1,
    title: 'Midnight Memories',
    cover: 'https://picsum.photos/200/600',
    songs: 12,
    duration: '45 min',
    likes: 245,
  },
  {
    id: 2,
    title: 'Sunny Days',
    cover: 'https://picsum.photos/300/600',
    songs: 10,
    duration: '38 min',
    likes: 189,
  },
  {
    id: 3,
    title: 'Wondering About Love',
    cover: 'https://picsum.photos/220/600',
    songs: 12,
    duration: '38 min',
    likes: 189,
  },
  {
    id: 4,
    title: 'Good Night',
    cover: 'https://picsum.photos/600/600',
    songs: 5,
    duration: '38 min',
    likes: 10,
  },
];

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [volume, setVolume] = useState(80);
  const [progress, setProgress] = useState(30);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const handleSongSelect = (song) => {
    setCurrentSong(song);
    setIsPlaying(true);
  };

  return (
    <div className="bg-gradient-to-br from-indigo-900 to-purple-800 text-white min-h-screen pb-32 lg:pb-20">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md py-4">
        <div className="mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            {/* Desktop Navigation */}
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

      <div className="mx-auto px-4 py-5">
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
                    onClick={() => handleSongSelect(song)}
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
          <div className="grid grid-cols-2 xs:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {albums.map((album) => (
              <div
                key={album.id}
                className="glass-card rounded-2xl overflow-hidden hover-grow transition-transform duration-300 aspect-square"
              >
                <div className="relative h-full">
                  <Image
                    src={album.cover}
                    alt={`${album.title} Cover`}
                    className="w-full h-full object-cover"
                    width={240}
                    height={240}
                    style={{ aspectRatio: '1/1' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-3 sm:p-4">
                    <div>
                      <h3 className="font-bold text-lg sm:text-xl">
                        {album.title}
                      </h3>
                      <p className="text-indigo-200 text-xs sm:text-sm">
                        {`${album.songs} Songs • ${album.duration}`}
                      </p>
                    </div>
                  </div>
                  <button className="absolute top-2 sm:top-3 right-2 sm:right-3 w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition">
                    <FaHeart className="text-white text-sm sm:text-base" />
                  </button>
                </div>
                <div className="p-3 sm:p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs sm:text-sm text-indigo-200">
                      {`${album.likes} likes`}
                    </span>
                    <div className="flex gap-1 sm:gap-2">
                      <button className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition">
                        <FaEdit className="text-xs sm:text-sm" />
                      </button>
                      <button className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition">
                        <FaTrash className="text-xs sm:text-sm" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>

        {/* Media Player */}
        <div
          className={`fixed left-4 right-4 bottom-12 lg:left-0 lg:right-0 lg:bottom-0 z-40
            bg-indigo-900/90 
            backdrop-blur-lg border border-white/30 lg:border-t lg:border-white/10 
            shadow-xl shadow-purple-900/20 rounded-t-[38px] lg:rounded-none
            px-4  transition-all duration-300`}
        >
          <div className=" mx-auto px-4 py-2 ">
            <div className="flex items-center gap-4">
              {/* Song Info */}
              <div className="hidden lg:flex items-center gap-3 flex-shrink-0 w-1/4">
                <Image
                  src={currentSong.cover}
                  alt={currentSong.title}
                  width={50}
                  height={50}
                  className="rounded-md"
                />
                <div className="hidden sm:block">
                  <p className="font-medium truncate">{currentSong.title}</p>
                  <p className="text-xs text-indigo-300">
                    {currentSong.artist}
                  </p>
                </div>
              </div>

              {/* Controls */}
              <div className="flex-1 flex flex-col items-center">
                <div className="flex items-center gap-4 mb-1">
                  <button className="text-indigo-300 hover:text-white">
                    <FaRandom className="text-sm" />
                  </button>
                  <button className="text-indigo-300 hover:text-white">
                    <FaStepBackward />
                  </button>
                  <button
                    className=" text-indigo-300 rounded-full p-2 "
                    onClick={togglePlay}
                  >
                    {isPlaying ? <FaPause /> : <FaPlay />}
                  </button>
                  <button className="text-indigo-300 hover:text-white">
                    <FaStepForward />
                  </button>
                  <button className="text-indigo-300 hover:text-white">
                    <FaRedoAlt className="text-sm" />
                  </button>
                </div>

                {/* Progress Bar */}
                <div className="w-full hidden lg:flex items-center gap-2">
                  <span className="text-xs text-indigo-300">1:25</span>
                  <div className="flex-1 h-1 bg-indigo-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-white rounded-full"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-indigo-300">
                    {currentSong.duration}
                  </span>
                </div>
              </div>

              {/* Volume */}
              <div className="hidden lg:flex items-center gap-2 w-1/4 justify-end">
                <FaVolumeUp className="text-indigo-300" />
                <div className="w-24 h-1 bg-indigo-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white rounded-full"
                    style={{ width: `${volume}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <div className="h-8 lg:hidden"></div>
        </div>

        {/* Mobile Navigation */}
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
