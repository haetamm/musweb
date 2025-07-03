import React from 'react';
import { FaSearch } from 'react-icons/fa';

const Searchbar = () => {
  return (
    <>
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
    </>
  );
};

export default Searchbar;
