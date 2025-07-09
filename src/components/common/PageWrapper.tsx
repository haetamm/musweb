'use client';
import React, { ReactNode } from 'react';
import MediaPlayer from './MediaPlayer';
import Navbar from './Navbar';
import NavbarBottom from './NavbarBottom';
import Searchbar from './Searchbar';
import Modal from './Modal';
import { useModalStore } from '@/stores/modal';
import { Toaster } from 'react-hot-toast';

type Props = {
  children: ReactNode;
};

const PageWrapper = ({ children }: Props) => {
  const { showGoogleLogin } = useModalStore();

  return (
    <>
      <div className="bg-gradient-to-br from-indigo-900 to-purple-800 text-white min-h-screen pb-32">
        <header className="sticky top-0 z-50 backdrop-blur-md py-4 ">
          <div className=" px-3 kontener mx-auto">
            <div className="flex w-full items-center lg:gap-10">
              <div className="flex-shrink-0">
                <Navbar />
              </div>

              <div className="flex-1 flex justify-start">
                <Searchbar />
              </div>

              <div className="flex-shrink-0 ml-4 lg:ml-0">
                <button
                  onClick={showGoogleLogin}
                  className="w-auto cursor-pointer bg-white/10 hover:bg-white/20 border border-white/20 px-6 py-2 rounded-full items-center justify-center"
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="mx-auto px-4 kontener">
          {children}
          <MediaPlayer />
          <NavbarBottom />
        </div>
      </div>
      <Modal />
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
};

export default PageWrapper;
