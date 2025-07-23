'use client';

import React from 'react';
import { isActiveSubNav } from '@/utils/helper';
import { playlistNav } from '@/utils/links';
import SubNavLayout from '@/components/layout/SubNavLayout';

const PlaylistLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SubNavLayout nav={playlistNav} isActive={isActiveSubNav}>
        {children}
      </SubNavLayout>
    </>
  );
};

export default PlaylistLayout;
