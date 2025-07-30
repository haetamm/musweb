const StatCard = ({
  icon,
  label,
  value,
  bgColor,
  isSmall = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  bgColor: string;
  isSmall?: boolean;
}) => (
  <div className="flex items-center space-x-4">
    <div className={`${bgColor} p-4 rounded-full`}>{icon}</div>
    <div>
      <p className={`text-sm text-purple-200`}>{label}</p>
      <p
        className={`${isSmall ? 'text-lg font-medium' : 'text-2xl font-bold'}`}
      >
        {value}
      </p>
    </div>
  </div>
);

export default StatCard;
