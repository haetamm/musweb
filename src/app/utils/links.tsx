import { FaCompactDisc, FaList, FaUsers } from 'react-icons/fa';

export const navLink = [
  {
    id: 1,
    label: 'Albums',
    icon: <FaCompactDisc />,
    isActive: true, // Active state for the "Albums" button
  },
  {
    id: 2,
    label: 'Playlists',
    icon: <FaList />,
    isActive: false,
  },
  {
    id: 3,
    label: 'Collaborations',
    icon: <FaUsers />,
    isActive: false,
  },
];
