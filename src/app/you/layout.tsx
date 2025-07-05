'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { libraryNav } from '@/utils/links';
import { isActive } from '@/utils/helper';

const LibraryLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <>
      <div className="mb-2">
        <div className="px-2 lg:px-4 py-2 flex gap-x-8 items-center">
          {libraryNav.map((item) => (
            <div
              key={item.href}
              className={`py-1.5 border-b-2 ${
                isActive(item.href, pathname)
                  ? 'border-white'
                  : 'border-transparent'
              }`}
            >
              <Link
                href={item.href}
                className={`text-xl lg:text-2xl font-bold ${
                  isActive(item.href, pathname)
                    ? 'text-white'
                    : 'text-slate-200'
                }`}
              >
                {item.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
      {children}
    </>
  );
};

export default LibraryLayout;
