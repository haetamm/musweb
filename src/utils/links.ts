import { FaCompactDisc, FaList, FaUsers } from 'react-icons/fa';
import { urlPage } from './constans';

export const navLink = [
  { id: 1, to: urlPage.HOME, label: 'Albums', icon: FaCompactDisc },
  { id: 2, to: urlPage.PLAYLIST, label: 'Playlists', icon: FaList },
  { id: 3, to: '#', label: 'Collaborations', icon: FaUsers },
];
