'use client';

import { isActive } from '@/utils/helper';
import { navLink } from '@/utils/links';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const NavbarBottom = () => {
  const pathname = usePathname();
  return (
    <>
      <nav className="max-w-[400px] mx-auto lg:hidden fixed bottom-4 left-4 right-4 bg-white/20 backdrop-blur-xl border border-white/30 shadow-xl shadow-purple-900/20 rounded-full z-100 py-1 px-6 transition-all duration-300 hover:bg-white/30 hover:border-white/40">
        <div className="flex justify-around items-center">
          {navLink.map(({ id, icon: Icon, to }) => (
            <Link
              key={id}
              href={to}
              className="relative flex flex-col items-center justify-center p-3.5 group transition-all duration-200"
            >
              <div
                className={`p-1 rounded-lg group-hover:bg-white/10 group-active:bg-white/20 transition-all duration-200 ${
                  isActive(to, pathname)
                    ? ' text-indigo-900 font-medium'
                    : 'hover:bg-white/10 text-white'
                }`}
              >
                <Icon className="h-6 w-6 shrink-0" />
              </div>
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
};

export default NavbarBottom;
