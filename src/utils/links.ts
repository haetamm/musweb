import { FaCompactDisc } from 'react-icons/fa';
import { urlPage } from './constans';
import { MdFormatListBulletedAdd, MdOutlineLibraryMusic } from 'react-icons/md';

export const navLink = [
  { id: 1, to: urlPage.HOME, label: 'Home', icon: FaCompactDisc },
  {
    id: 2,
    to: urlPage.PLAYLIST,
    label: 'Playlist',
    icon: MdFormatListBulletedAdd,
  },
  {
    id: 3,
    to: urlPage.LIBRARY,
    label: 'Library',
    icon: MdOutlineLibraryMusic,
  },
];

export const libraryNav = [
  { name: 'Song', href: '/you/song' },
  { name: 'Album', href: '/you/album' },
  { name: 'Likes', href: '/you/likes' },
];

export const playlistNav = [
  { name: 'Playlist', href: '/playlist' },
  { name: 'Likes', href: '/playlist/likes' },
];
