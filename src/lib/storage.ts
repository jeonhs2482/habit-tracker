import type { Habit, CompletionRecord } from '../types/habit';

const KEYS = {
  habits: 'ht:habits',
  completions: 'ht:completions',
} as const;

export function loadHabits(): Habit[] {
  const raw = localStorage.getItem(KEYS.habits);
  return raw ? (JSON.parse(raw) as Habit[]) : [];
}

export function saveHabits(habits: Habit[]): void {
  localStorage.setItem(KEYS.habits, JSON.stringify(habits));
}

export function loadCompletions(): CompletionRecord[] {
  const raw = localStorage.getItem(KEYS.completions);
  return raw ? (JSON.parse(raw) as CompletionRecord[]) : [];
}

export function saveCompletions(records: CompletionRecord[]): void {
  localStorage.setItem(KEYS.completions, JSON.stringify(records));
}
