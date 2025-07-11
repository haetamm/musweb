'use client';

import usePreload from '@/hooks/usePreload';
import { useModalStore } from '@/stores/modal';
import { isActive } from '@/utils/helper';
import { navLink } from '@/utils/links';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import { protectedPaths } from './Navbar';

const NavbarBottom = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { showGoogleLogin } = useModalStore();
  const { isAuthenticated } = usePreload();

  const handleClick = (to: string) => {
    if (protectedPaths.includes(to) && !isAuthenticated) {
      showGoogleLogin();
    } else {
      router.push(to);
    }
  };
  return (
    <>
      <nav className="max-w-[400px] mx-auto lg:hidden fixed bottom-4 left-4 right-4 bg-white/20 backdrop-blur-xl border border-white/30 shadow-xl shadow-purple-900/20 rounded-full z-100 py-1 px-6 transition-all duration-300 hover:bg-white/30 hover:border-white/40">
        <div className="flex justify-around items-center">
          {navLink.map(({ id, icon: Icon, to }) => {
            const active = isActive(to, pathname);

            const activeClass = active
              ? 'bg-white text-indigo-900 font-medium'
              : 'hover:bg-white/10 text-white';

            const baseClass =
              'p-1 rounded-lg group-hover:bg-white/10 group-active:bg-white/20 transition-all duration-200';

            return (
              <div
                key={id}
                onClick={() => {
                  handleClick(to);
                }}
                className="relative flex flex-col items-center justify-center p-3.5 group transition-all duration-200"
              >
                <div className={`${baseClass} ${activeClass}`}>
                  <Icon className="h-6 w-6 shrink-0" />
                </div>
              </div>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default NavbarBottom;
