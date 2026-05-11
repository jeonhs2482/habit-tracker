import type { HabitWithStatus } from '../types/habit';
import { StreakBadge } from './StreakBadge';

interface Props {
  item: HabitWithStatus;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function HabitCard({ item, onToggle, onDelete }: Props) {
  const { habit, completedToday, streak } = item;

  return (
    <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
      <input
        type="checkbox"
        checked={completedToday}
        onChange={() => onToggle(habit.id)}
        className="w-5 h-5 rounded accent-indigo-600 cursor-pointer"
      />
      <span
        className={`flex-1 text-base ${
          completedToday ? 'line-through text-gray-400' : 'text-gray-800'
        }`}
      >
        {habit.name}
      </span>
      <StreakBadge streak={streak} />
      <button
        onClick={() => onDelete(habit.id)}
        className="ml-1 text-gray-300 hover:text-red-400 transition-colors text-lg leading-none"
        aria-label="Delete habit"
      >
        ×
      </button>
    </div>
  );
}
