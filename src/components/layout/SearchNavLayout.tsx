'use client';

import { searchNav } from '@/utils/links';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import React from 'react';

export const TitleSearchNavLayout = () => {
  const searchParams = useSearchParams();
  const q = searchParams.get('q');
  return (
    <div className="text-xl xl:text-2xl my-2 xl:my-4 hidden tracking-wide lg:block font-bold lg:pl-8">
      <div className="px-4">Search{q ? ` results for “${q}”` : ''}</div>
    </div>
  );
};

const SearchNavLayout = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const q = searchParams.get('q');

  const buildHref = (href: string) => {
    return q ? `${href}?q=${encodeURIComponent(q)}` : href;
  };

  const isActive = (href: string) => pathname === href;
  return (
    <>
      {/* Mobile Navigation */}
      <div className="block sticky top-[58px] z-50 backdrop-blur-md lg:hidden border-b border-slate-300/50">
        <div className="flex justify-between items-center">
          {searchNav.map((item) => (
            <div
              key={item.href}
              className={`w-full py-3 flex justify-center border-b-2 ${
                isActive(item.href) ? 'border-white' : 'border-transparent'
              }`}
            >
              <Link
                href={buildHref(item.href)}
                className={`text-sm font-bold ${
                  isActive(item.href) ? 'text-white' : 'text-slate-200'
                }`}
              >
                {item.name}
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Sidebar Navigation */}
      <div className="hidden lg:block sticky top-[130px] xl:top-[150px] h-[calc(100vh-280px)] lg:pl-8 overflow-y-auto">
        <div className="flex flex-col space-y-2 pr-4">
          {searchNav.map((item) => (
            <Link
              key={item.href}
              href={buildHref(item.href)}
              className={`py-2 px-4 rounded-lg transition-all border-l-2 ${
                isActive(item.href)
                  ? 'bg-white/10 text-white border-white'
                  : 'text-slate-200 hover:bg-white/5 border-transparent'
              }`}
            >
              <span className="font-medium text-lg">{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default SearchNavLayout;
