import { Song } from '@/utils/types';
import React from 'react';
import { FaEllipsisH } from 'react-icons/fa';

interface SongDetailTableProps {
  songs: Song[];
}

const SongDetailTable: React.FC<SongDetailTableProps> = ({ songs }) => {
  return (
    <section className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold">Songs</h2>
        <p className="text-purple-200">
          {songs.length} {songs.length === 1 ? 'song' : 'songs'}
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10 text-purple-200 text-left">
              <th className="pb-4 pr-1 lg:px-2">#</th>
              <th className="pb-4">Title</th>
              <th className="pb-4">Performer</th>
              <th className="pb-4"></th>
            </tr>
          </thead>
          <tbody>
            {songs.map((song, index) => (
              <tr
                key={song.id}
                className="border-b border-white/10 hover:bg-white/5 transition"
              >
                <td className="py-4 lg:px-2">{index + 1}</td>
                <td className="py-4 font-medium">{song.title}</td>
                <td className="py-4 text-purple-200">{song.performer}</td>
                <td className="py-4 text-right">
                  <button className="text-purple-300 hover:text-white transition">
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
