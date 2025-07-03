'use client';

import Searchbar from './components/common/Searchbar';
import Navbar from './components/common/Navbar';
import SongTable from './components/common/SongTable';
import MediaPlayer from './components/common/MediaPlayer';
import { navLink } from './utils/links';
import AlbumCarousel from './components/common/AlbumCarousel';
import ListSong from './components/common/ListSong';
import SongCarousel from './components/common/SongCarousel';

export default function Home() {
  return (
    <div className="bg-gradient-to-br from-indigo-900 to-purple-800 text-white min-h-screen pb-32">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md py-4 ">
        <div className=" px-4 kontener mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            {/* Desktop Navigation */}
            <div className="hidden lg:flex overflow-x-auto">
              <div className="flex space-x-1 bg-white/10 rounded-full p-1">
                {navLink.map(({ id, label, icon, isActive }) => (
                  <button
                    key={id}
                    className={`px-6 py-2 rounded-full flex items-center gap-2 transition ${
                      isActive
                        ? 'bg-white text-indigo-900 font-medium'
                        : 'hover:bg-white/10'
                    }`}
                  >
                    {icon} {label}
                  </button>
                ))}
              </div>
            </div>
            <Searchbar />
          </div>
        </div>
      </header>

      <div className="mx-auto px-4 kontener">
        <main className="mb-16 grid grid-cols-1 lg:grid-cols-[65%_35%] xl:grid-cols-[73%_27%] lg:mb-0 md:px-3 xl:px-0">
          <div className="order-2 lg:order-1 lg:pr-5">
            <AlbumCarousel />
            <SongCarousel />
            <ListSong />
          </div>
          <div className="relative order-1 lg:order-2 ">
            <SongTable />
          </div>
        </main>

        <MediaPlayer />

        <Navbar />
      </div>
    </div>
  );
}
