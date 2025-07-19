'use client';

import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { urlPage } from '@/utils/constans';

const Searchbar = () => {
  const [mounted, setMounted] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    const queryFromUrl = searchParams.get('q') || '';
    setQuery(decodeURIComponent(queryFromUrl));
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query.trim()) return;

    const encodedQuery = encodeURIComponent(query);
    const searchUrl = `${urlPage.SEARCH}?q=${encodedQuery}`;

    if (pathname?.startsWith(urlPage.SEARCH)) {
      router.replace(`${pathname}?q=${encodedQuery}`);
    } else {
      router.push(searchUrl);
    }
  };

  if (!mounted) return null;

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full lg:auto xl:max-w-[400px] lg:p-1 bg-white/10 rounded-full"
    >
      <div className="relative flex-1">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search songs, albums, playlists"
          className={`w-full pl-10 pr-4 py-2 rounded-full border-[1px] focus:outline-none placeholder-white
          ${query ? 'bg-white text-indigo-800 border-white/20' : 'border-transparent'}
        `}
        />
        <FaSearch
          className={`absolute left-3 top-3.5 transition-colors
            ${query ? 'text-indigo-800' : 'text-white'}
          `}
        />
      </div>
    </form>
  );
};

export default Searchbar;
