import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Check if a time string (HH:MM) is between 12:30 and 13:15.
// Time is assumed to be IST from user prompt context.
export function isOutsideMacroWindow(timeStr: string): boolean {
  if (!timeStr) return false;
  const [h, m] = timeStr.split(':').map(Number);
  const totalMins = h * 60 + m;
  const startMins = 12 * 60 + 30; // 750
  const endMins = 13 * 60 + 15; // 795
  return totalMins < startMins || totalMins > endMins;
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}
