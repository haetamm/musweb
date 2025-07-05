'use client';

import { urlPage } from '@/utils/constans';
import { redirect } from 'next/navigation';

const Library = () => {
  redirect(urlPage.LIBRARY_SONG);
};
export default Library;
