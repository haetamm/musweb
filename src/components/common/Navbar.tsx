'use client';

import { usePathname, useRouter } from 'next/navigation';
import { navLink } from '@/utils/links';
import { isActive } from '@/utils/helper';
import { useModalStore } from '@/stores/modal';
import usePreload from '@/hooks/usePreload';
import React from 'react';
import { urlPage } from '@/utils/constans';

export const protectedPaths = [urlPage.PLAYLIST, urlPage.LIBRARY];

const Navbar = () => {
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
    <div className="hidden lg:flex overflow-x-auto w-full">
      <div className="flex space-x-1 bg-white/10 rounded-full p-1">
        {navLink.map(({ id, to, label, icon: Icon }) => {
          const active = isActive(to, pathname);
          const baseClass =
            'px-6 py-2 rounded-full flex items-center gap-2 transition ';

          const activeClass = active
            ? 'bg-white text-indigo-900 font-medium'
            : 'hover:bg-white/10 text-white';

          return (
            <button
              key={id}
              onClick={() => handleClick(to)}
              className={`${baseClass} ${activeClass} cursor-pointer`}
            >
              <Icon className="h-6 w-6 shrink-0" />
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Navbar;
