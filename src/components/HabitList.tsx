import type { HabitWithStatus } from '../types/habit';
import { HabitCard } from './HabitCard';

interface Props {
  habits: HabitWithStatus[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function HabitList({ habits, onToggle, onDelete }: Props) {
  if (habits.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        <p className="text-4xl mb-3">📋</p>
        <p className="text-sm">No habits yet. Add one above to get started!</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {habits.map((item) => (
        <HabitCard
          key={item.habit.id}
          item={item}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
