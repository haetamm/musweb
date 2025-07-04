import { FaCompactDisc, FaList, FaRegUser } from 'react-icons/fa';
import { urlPage } from './constans';

export const navLink = [
  { id: 1, to: urlPage.HOME, label: 'Home', icon: FaCompactDisc },
  { id: 2, to: urlPage.PLAYLIST, label: 'Playlists', icon: FaList },
  { id: 3, to: '#', label: 'Profile', icon: FaRegUser },
];
