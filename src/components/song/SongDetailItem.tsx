const SongDetailItem = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) => (
  <div className="bg-gray-800/40 p-4 rounded-xl backdrop-blur-sm">
    <div className="flex items-center gap-3">
      <div className="p-3 bg-white/5 rounded-full">{icon}</div>
      <div>
        <p className="text-gray-400 text-sm">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  </div>
);

export default SongDetailItem;
