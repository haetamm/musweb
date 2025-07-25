import React, { ReactNode, Suspense } from 'react';
import MediaPlayer from './MediaPlayer';
import Navbar from './Navbar';
import NavbarBottom from './NavbarBottom';
import Searchbar from './Searchbar';
import { Toaster } from 'react-hot-toast';
import ButtonLoginOrLogout from './ButtonLoginOrLogout';
import Modal from './Modal';

type Props = {
  children: ReactNode;
};

const PageWrapper = ({ children }: Props) => {
  return (
    <>
      <div className="bg-gradient-to-br from-indigo-900 to-purple-800 text-white min-h-screen pb-32">
        <header className="sticky top-0 z-50 backdrop-blur-md py-2 lg:py-4">
          <div className="px-3 kontener mx-auto">
            <div className="flex w-full items-center lg:gap-5">
              <div className="flex-shrink-0">
                <Navbar />
              </div>
              <div className="flex-1 flex justify-end">
                <Suspense>
                  <Searchbar />
                </Suspense>
              </div>
              <ButtonLoginOrLogout />
            </div>
          </div>
        </header>
        <div className="mx-auto kontener">
          {children}
          <MediaPlayer />
          <NavbarBottom />
        </div>
      </div>
      <Modal />
      <Toaster position="bottom-right" reverseOrder={false} />
    </>
  );
};

export default PageWrapper;
