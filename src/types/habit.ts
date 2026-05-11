export interface Habit {
  id: string;
  name: string;
  createdAt: string;
}

export interface CompletionRecord {
  habitId: string;
  date: string;
}

export interface HabitWithStatus {
  habit: Habit;
  completedToday: boolean;
  streak: number;
}
