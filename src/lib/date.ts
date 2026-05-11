export function toDateKey(date: Date = new Date()): string {
  return date.toLocaleDateString('en-CA');
}

export function today(): string {
  return toDateKey(new Date());
}

export function shiftDate(dateKey: string, days: number): string {
  const d = new Date(dateKey + 'T00:00:00');
  d.setDate(d.getDate() + days);
  return toDateKey(d);
}
