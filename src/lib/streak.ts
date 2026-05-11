import type { CompletionRecord } from '../types/habit';
import { today, shiftDate } from './date';

export function calculateStreak(habitId: string, completions: CompletionRecord[]): number {
  const completedDates = new Set(
    completions.filter((r) => r.habitId === habitId).map((r) => r.date)
  );

  let streak = 0;
  let cursor = today();

  while (completedDates.has(cursor)) {
    streak++;
    cursor = shiftDate(cursor, -1);
  }

  return streak;
}
