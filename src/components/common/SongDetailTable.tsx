import { urlPage } from '@/utils/constans';
import { formatDurationToMinutes } from '@/utils/helper';
import { SongDetail } from '@/utils/types';
import Link from 'next/link';
import React from 'react';
import { FaEllipsisH } from 'react-icons/fa';

interface SongDetailTableProps {
  songs: SongDetail[];
}

const SongDetailTable: React.FC<SongDetailTableProps> = ({ songs }) => {
  return (
    <section className="bg-white/5 backdrop-blur-sm rounded-xl xs:p-6">
      <div className="mb-6 flex justify-between items-center px-3 pt-3 xs:px-0 xs:pt-0">
        <h2 className="text-xl xl:text-2xl font-bold">Songs</h2>
        <p className="text-purple-200">
          {songs.length} {songs.length === 1 ? 'song' : 'songs'}
        </p>
      </div>

      <div className="overflow-x-auto pb-6">
        <table className="w-full text-sm md:text-lg">
          <thead>
            <tr className="border-b border-white/10 text-purple-200 text-left">
              <th className="pb-4 px-4 w-12">#</th>
              <th className="pb-4 px-2">Title</th>
              <th className="pb-4 px-2">Performer</th>
              <th className="pb-4 px-2 text-right pr-4">Duration</th>
              <th className="pb-4"></th>
            </tr>
          </thead>
          <tbody>
            {songs.map((song, index) => (
              <tr
                key={song.id}
                className="border-b border-white/10 hover:bg-white/5 transition group"
              >
                <td className="py-4 px-4 text-gray-400 group-hover:text-white">
                  {index + 1}
                </td>
                <td className="py-4 px-2 text-purple-200">
                  <Link
                    href={`${urlPage.SONG}/${song.id}`}
                    className="hover:underline cursor-pointer"
                  >
                    {song.title}
                  </Link>
                </td>
                <td className="py-4 px-2 text-purple-200">{song.performer}</td>
                <td className="py-4 px-2 text-right pr-4 text-gray-400">
                  {formatDurationToMinutes(song.duration)}
                </td>
                <td className="py-4 text-right">
                  <button className="text-purple-300 hover:text-white transition opacity-0 group-hover:opacity-100">
                    <FaEllipsisH />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default SongDetailTable;
