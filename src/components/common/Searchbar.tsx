'use client';

import React from 'react';
import { FaSearch } from 'react-icons/fa';

const Searchbar = () => {
  return (
    <div className="w-full lg:auto xl:max-w-[460px]">
      <div className="relative flex-1">
        <input
          type="text"
          placeholder="Search songs, albums..."
          className="w-full pl-10 pr-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border focus:outline-none border-white/20  placeholder-white"
        />
        <FaSearch className="absolute left-3 top-3.5 " />
      </div>
    </div>
  );
};

export default Searchbar;
