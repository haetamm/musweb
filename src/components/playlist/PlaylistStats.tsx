import { formatDurationToMinutes } from '@/utils/helper';
import { FaHeadphones, FaUser } from 'react-icons/fa';
import { MdLibraryMusic } from 'react-icons/md';
import StatCard from './StatCard';

const PlaylistStats = ({
  songCount,
  totalDuration,
  owner,
  collaborations,
}: {
  songCount: string;
  totalDuration: string;
  owner: string;
  collaborations: Array<{ fullname: string }>;
}) => (
  <section className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
    <div className="bg-white/5 rounded-lg p-6 flex items-center">
      <StatCard
        icon={<FaHeadphones className="text-2xl text-purple-300" />}
        label="Total Songs"
        value={songCount.toString()}
        bgColor="bg-purple-500/20"
      />
    </div>
    <div className="bg-white/5 rounded-lg p-6 flex items-center">
      <StatCard
        icon={<MdLibraryMusic className="text-2xl text-indigo-300" />}
        label="Playlist Duration"
        value={formatDurationToMinutes(totalDuration)}
        bgColor="bg-indigo-500/20"
      />
    </div>

    <div className="bg-white/5 rounded-lg p-6 flex-col justify-center">
      <StatCard
        icon={<FaUser className="text-2xl text-blue-300" />}
        label="Contributors"
        value={owner}
        bgColor="bg-blue-500/20"
        isSmall
      />

      {collaborations.length > 0 && (
        <div className="mt-4">
          <p className="text-sm text-purple-200 mb-2">Collaborators</p>
          <div className="flex flex-wrap gap-2">
            {collaborations.map(({ fullname }, index) => (
              <span
                key={index}
                className="bg-white/10 px-3 py-1 rounded-full text-sm flex items-center"
              >
                <FaUser className="mr-1 text-xs opacity-70" />
                {fullname}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  </section>
);

export default PlaylistStats;
