import { likeDetail } from '@/utils/types';
import StatCard from './StatCard';
import { FaHeart, FaUser } from 'react-icons/fa';

const PlaylistLikes = ({ likes }: { likes: likeDetail[] }) => (
  <section className="mt-8 bg-white/5 rounded-lg p-6">
    <StatCard
      icon={<FaHeart className="text-2xl text-pink-300" />}
      label="Liked By"
      value={`${likes.length} ${likes.length === 1 ? 'person' : 'people'}`}
      bgColor="bg-pink-500/20"
      isSmall
    />

    <div className="flex flex-wrap gap-3 mt-3">
      {likes.map(({ fullname }, index) => (
        <div
          key={index}
          className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full"
        >
          <FaUser className="text-xs opacity-70" />
          <span className="text-sm">{fullname}</span>
        </div>
      ))}
    </div>
  </section>
);

export default PlaylistLikes;
