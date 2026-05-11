interface Props {
  streak: number;
}

export function StreakBadge({ streak }: Props) {
  const color =
    streak === 0
      ? 'bg-gray-100 text-gray-500'
      : streak >= 7
      ? 'bg-green-100 text-green-700'
      : 'bg-amber-100 text-amber-700';

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${color}`}>
      🔥 {streak} {streak === 1 ? 'day' : 'days'}
    </span>
  );
}
