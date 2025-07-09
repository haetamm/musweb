'use client';

import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const Searchbar = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-full lg:auto xl:max-w-[400px] p-1 bg-white/10 rounded-full">
      <div className="relative flex-1">
        <input
          type="text"
          placeholder="Search songs, albums..."
          className="w-full pl-10 pr-4 py-2 rounded-full focus:bg-white focus:text-indigo-800 focus:border-white/20 border-[1px] border-transparent focus:outline-none placeholder-white peer"
        />
        <FaSearch className="absolute left-3 top-3.5 text-white peer-focus:text-indigo-800" />
      </div>
    </div>
  );
};

export default Searchbar;
