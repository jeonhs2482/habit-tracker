import { useState, useEffect, useMemo } from 'react';
import type { Habit, CompletionRecord, HabitWithStatus } from '../types/habit';
import { loadHabits, saveHabits, loadCompletions, saveCompletions } from '../lib/storage';
import { calculateStreak } from '../lib/streak';
import { today } from '../lib/date';

export function useHabits(): {
  habitsWithStatus: HabitWithStatus[];
  addHabit: (name: string) => void;
  toggleCompletion: (habitId: string) => void;
  deleteHabit: (habitId: string) => void;
} {
  const [habits, setHabits] = useState<Habit[]>(loadHabits);
  const [completions, setCompletions] = useState<CompletionRecord[]>(loadCompletions);

  useEffect(() => { saveHabits(habits); }, [habits]);
  useEffect(() => { saveCompletions(completions); }, [completions]);

  const todayKey = today();

  const habitsWithStatus: HabitWithStatus[] = useMemo(
    () =>
      habits.map((habit) => ({
        habit,
        completedToday: completions.some(
          (r) => r.habitId === habit.id && r.date === todayKey
        ),
        streak: calculateStreak(habit.id, completions),
      })),
    [habits, completions, todayKey]
  );

  function addHabit(name: string) {
    const trimmed = name.trim();
    if (!trimmed) return;
    setHabits((prev) => [
      ...prev,
      { id: crypto.randomUUID(), name: trimmed, createdAt: todayKey },
    ]);
  }

  function toggleCompletion(habitId: string) {
    const existingIndex = completions.findIndex(
      (r) => r.habitId === habitId && r.date === todayKey
    );
    if (existingIndex >= 0) {
      setCompletions((prev) => prev.filter((_, i) => i !== existingIndex));
    } else {
      setCompletions((prev) => [...prev, { habitId, date: todayKey }]);
    }
  }

  function deleteHabit(habitId: string) {
    setHabits((prev) => prev.filter((h) => h.id !== habitId));
    setCompletions((prev) => prev.filter((r) => r.habitId !== habitId));
  }

  return { habitsWithStatus, addHabit, toggleCompletion, deleteHabit };
}
