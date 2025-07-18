'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type NavItem = { name: string; href: string };

interface SubNavLayoutProps {
  nav: NavItem[];
  isActive: (href: string, pathname: string) => boolean;
  showHeader?: (pathname: string) => boolean;
  children: React.ReactNode;
}

const SubNavLayout = ({
  nav,
  isActive,
  showHeader = () => true,
  children,
}: SubNavLayoutProps) => {
  const pathname = usePathname();
  const displayHeader = showHeader(pathname);

  return (
    <>
      <div className="px-4">
        {displayHeader && (
          <div className="mb-2">
            <div className="px-2 lg:px-4 py-0 lg:py-2 flex gap-x-8 items-center">
              {nav.map((item) => (
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
        )}
        {children}
      </div>
    </>
  );
};

export default SubNavLayout;
