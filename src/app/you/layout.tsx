'use client';

import React from 'react';
import { libraryNav } from '@/utils/links';
import { isActiveSubNav } from '@/utils/helper';
import SubNavLayout from '@/components/common/SubNavLayout';

const LibraryLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SubNavLayout nav={libraryNav} isActive={isActiveSubNav}>
        {children}
      </SubNavLayout>
    </>
  );
};

export default LibraryLayout;
