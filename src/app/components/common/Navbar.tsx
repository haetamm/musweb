import { navLink } from '@/app/utils/links';
import React from 'react';

const Navbar = () => {
  return (
    <>
      {/* mobile nav */}
      <nav className="lg:hidden fixed bottom-4 left-4 right-4 bg-white/20 backdrop-blur-xl border border-white/30 shadow-xl shadow-purple-900/20 rounded-full z-50 py-1 px-6 transition-all duration-300 hover:bg-white/30 hover:border-white/40">
        <div className="flex justify-around items-center">
          {navLink.map(({ id, icon }) => (
            <button
              key={id}
              className="relative flex flex-col items-center justify-center text-white p-2 group transition-all duration-200"
            >
              <div className="p-3 rounded-full group-hover:bg-white/10 group-active:bg-white/20 transition-all duration-200">
                {icon}
              </div>
            </button>
          ))}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
