export type SweepStatus = 'Buy-Side Sweep' | 'Sell-Side Sweep' | 'No Sweep';

export type ResultOutcome =
  | 'Win (+1.5%)'
  | 'Loss (-0.5%)'
  | 'No Setup'
  | 'Missed Entry'
  | 'Systemic Psychological Infraction';

export type InfractionCheck = 'Pass' | 'Fail';

export interface LogEntry {
  id: string; // Internal UUID
  dayNumber: number; // Tracker Day X/90
  date: string; // YYYY-MM-DD
  sessionTime: string; // HH:mm format, IST assumed by user
  asianHigh: number | '';
  asianLow: number | '';
  sweepStatus: SweepStatus;
  mssTimestamp: string; // HH:mm
  fvgPresence: boolean;
  resultOutcome: ResultOutcome;
  infractionCheck: InfractionCheck;
  isTrapTime: boolean; // Flag if time falls outside 12:30-13:15
}

export interface AppMetrics {
  totalLoggedDays: number; // Current Count/90
  winningSetups: number;
  losingSetups: number;
  winRate: number; // 0-100
  simulatedBalance: number; // Starts at $5000, compounded
  complianceStreak: number; // Consecutive non-failed days
}
