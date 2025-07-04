'use client';

import { usePathname } from 'next/navigation';
import { navLink } from '@/utils/links';
import Link from 'next/link';
import { isActive } from '@/utils/helper';

const Navbar = () => {
  const pathname = usePathname();
  return (
    <div className="hidden lg:flex overflow-x-auto">
      <div className="flex space-x-1 bg-white/10 rounded-full p-1">
        {navLink.map(({ id, to, label, icon: Icon }) => (
          <Link
            key={id}
            href={to}
            className={`px-6 py-2 rounded-full flex items-center gap-2 transition ${
              isActive(to, pathname)
                ? 'bg-white text-indigo-900 font-medium'
                : 'hover:bg-white/10 text-white'
            }`}
          >
            <Icon />
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
