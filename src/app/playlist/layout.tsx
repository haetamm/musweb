'use client';

import React from 'react';
import { isActiveSubNav } from '@/utils/helper';
import { playlistNav } from '@/utils/links';
import SubNavLayout from '@/components/layout/SubNavLayout';

const PlaylistLayout = ({ children }: { children: React.ReactNode }) => {
  const showPlaylistHeader = (pathname: string) =>
    pathname === '/playlist' || pathname === '/playlist/likes';

  return (
    <>
      <SubNavLayout
        nav={playlistNav}
        isActive={isActiveSubNav}
        showHeader={showPlaylistHeader}
      >
        {children}
      </SubNavLayout>
    </>
  );
};

export default PlaylistLayout;
