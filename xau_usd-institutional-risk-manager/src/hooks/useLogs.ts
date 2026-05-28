import { useState, useEffect, useMemo } from 'react';
import { LogEntry, AppMetrics } from '../types';

const STORAGE_KEY = 'xau_instituional_logs';
const INITIAL_BALANCE = 5000;

export function useLogs() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setLogs(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse logs', e);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
    }
  }, [logs, isLoaded]);

  const addLog = (entry: LogEntry) => {
    setLogs((prev) => {
      // If there's an infraction, the streak and day number reset, but should we append or clear?
      // "notify them that their 90-day protocol clock resets to Day 0."
      // We will just append the log, and the calculation will handle the day numbering.
      return [...prev, entry];
    });
  };

  const clearLogs = () => {
    if (confirm('Are you sure you want to clear all data? This cannot be undone.')) {
      setLogs([]);
    }
  };

  const deleteLog = (id: string) => {
      setLogs((prev) => prev.filter((log) => log.id !== id));
  };


  const metrics: AppMetrics = useMemo(() => {
    let winningSetups = 0;
    let losingSetups = 0;
    let simulatedBalance = INITIAL_BALANCE;
    let currentStreakDays = 0;
    let totalLoggedDays = 0;

    for (const log of logs) {
      if (log.infractionCheck === 'Fail' || log.resultOutcome === 'Systemic Psychological Infraction') {
        currentStreakDays = 0;
        totalLoggedDays = 0; // The 90-day clock resets to Day 0
      } else {
        currentStreakDays += 1;
        totalLoggedDays += 1;
      }

      if (log.resultOutcome === 'Win (+1.5%)') {
        winningSetups += 1;
        simulatedBalance += simulatedBalance * 0.015;
      } else if (log.resultOutcome === 'Loss (-0.5%)') {
        losingSetups += 1;
        simulatedBalance -= simulatedBalance * 0.005;
      }
    }

    const totalTrades = winningSetups + losingSetups;
    const winRate = totalTrades > 0 ? (winningSetups / totalTrades) * 100 : 0;

    return {
      totalLoggedDays,
      winningSetups,
      losingSetups,
      winRate,
      simulatedBalance,
      complianceStreak: currentStreakDays,
    };
  }, [logs]);

  return {
    logs,
    addLog,
    metrics,
    clearLogs,
    deleteLog
  };
}
