'use client';
import React, { ReactNode } from 'react';
import MediaPlayer from './MediaPlayer';
import Navbar from './Navbar';
import NavbarBottom from './NavbarBottom';
import Searchbar from './Searchbar';

type Props = {
  children: ReactNode;
};

const PageWrapper = ({ children }: Props) => {
  return (
    <div className="bg-gradient-to-br from-indigo-900 to-purple-800 text-white min-h-screen pb-32">
      <header className="sticky top-0 z-50 backdrop-blur-md py-4 ">
        <div className=" px-4 kontener mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <Navbar />
            <Searchbar />
          </div>
        </div>
      </header>

      <div className="mx-auto px-4 kontener">
        {children}
        <MediaPlayer />
        <NavbarBottom />
      </div>
    </div>
  );
};

export default PageWrapper;
