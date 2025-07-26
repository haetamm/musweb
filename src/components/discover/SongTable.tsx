import { SongAction } from '@/lib/action/SongAction';
import React from 'react';
import SongTableList from './SongTableList';

const SongTable = async () => {
  const { data: result, error } = await SongAction.getSongByQuery('', 1, true);

  return (
    <div className="lg:sticky lg:top-[83px] lg:h-[calc(100vh-218px)] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mt-2 lg:mt-0 mb-2">
        <h2 className="text-lg font-bold">Tranding Right Nows</h2>
      </div>

      {/* Scrollable Song List */}
      <div className="flex-1 lg:overflow-auto no-scrollbar h-full">
        <SongTableList songsResult={result?.songs} error={error} />
      </div>

      <div className="mt-auto text-sm hidden lg:block pt-6">
        <p>Terms of Service | Privacy Policy | Cookie Policy</p>
        <p>© 2025 Musweb.</p>
      </div>
    </div>
  );
};

export default SongTable;
