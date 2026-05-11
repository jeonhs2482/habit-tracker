import { useHabits } from '../hooks/useHabits';
import { today } from '../lib/date';
import { AddHabitForm } from './AddHabitForm';
import { HabitList } from './HabitList';

export function Dashboard() {
  const { habitsWithStatus, addHabit, toggleCompletion, deleteHabit } = useHabits();

  const total = habitsWithStatus.length;
  const completed = habitsWithStatus.filter((h) => h.completedToday).length;

  const dateLabel = new Date(today() + 'T00:00:00').toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-lg mx-auto flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Habit Tracker</h1>
          <p className="text-sm text-gray-500 mt-1">{dateLabel}</p>
        </div>

        {total > 0 && (
          <div className="bg-indigo-50 rounded-xl p-4 flex items-center justify-between">
            <span className="text-sm text-indigo-700 font-medium">Today's progress</span>
            <span className="text-sm font-bold text-indigo-800">
              {completed} / {total} completed
            </span>
          </div>
        )}

        <AddHabitForm onAdd={addHabit} />

        <HabitList
          habits={habitsWithStatus}
          onToggle={toggleCompletion}
          onDelete={deleteHabit}
        />
      </div>
    </div>
  );
}
