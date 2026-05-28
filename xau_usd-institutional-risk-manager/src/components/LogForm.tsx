import React, { useState } from 'react';
import { LogEntry, SweepStatus, ResultOutcome, AppMetrics } from '../types';
import { isOutsideMacroWindow, generateId } from '../utils';

interface LogFormProps {
  onAdd: (entry: LogEntry) => void;
  metrics: AppMetrics;
}

export function LogForm({ onAdd, metrics }: LogFormProps) {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [sessionTime, setSessionTime] = useState('');
  const [asianHigh, setAsianHigh] = useState<number | ''>('');
  const [asianLow, setAsianLow] = useState<number | ''>('');
  const [sweepStatus, setSweepStatus] = useState<SweepStatus>('No Sweep');
  const [mssTimestamp, setMssTimestamp] = useState('');
  const [fvgPresence, setFvgPresence] = useState(false);
  const [resultOutcome, setResultOutcome] = useState<ResultOutcome>('No Setup');
  
  // Custom tracking for execution panels
  const [executedTrade, setExecutedTrade] = useState(false);

  // Time trap evaluation based on prompt logic Check
  const trapWarning =
    sessionTime && sweepStatus !== 'No Sweep' && isOutsideMacroWindow(sessionTime);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Logic: if they executed a trade or resultOutcome is an infraction, they Fail.
    const isInfraction =
      executedTrade || resultOutcome === 'Systemic Psychological Infraction';

    const dayNumber = isInfraction ? 0 : metrics.complianceStreak + 1;
    const finalOutcome = isInfraction
      ? 'Systemic Psychological Infraction'
      : resultOutcome;

    const entry: LogEntry = {
      id: generateId(),
      dayNumber,
      date,
      sessionTime,
      asianHigh,
      asianLow,
      sweepStatus,
      mssTimestamp,
      fvgPresence,
      resultOutcome: finalOutcome,
      infractionCheck: isInfraction ? 'Fail' : 'Pass',
      isTrapTime: !!trapWarning,
    };

    onAdd(entry);

    // Reset some fields
    setSessionTime('');
    setAsianHigh('');
    setAsianLow('');
    setSweepStatus('No Sweep');
    setMssTimestamp('');
    setFvgPresence(false);
    setResultOutcome('No Setup');
    setExecutedTrade(false);
  };

  const inputClass = "w-full bg-[#111] border border-[#222] text-[#E0E0E0] p-3 text-sm focus:border-[#C5A059] outline-none transition-colors rounded-none placeholder-[#444] font-mono";
  const labelClass = "block text-[10px] font-mono text-[#777] uppercase tracking-widest mb-2";

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#0A0A0A] border border-[#222] p-6 lg:p-8 shrink-0 flex flex-col gap-6"
    >
       <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-[#222] pb-4 gap-4">
        <h2 className="text-xl font-black tracking-widest uppercase text-white">
          Data Entry Panel
        </h2>
        <span className="text-[#C5A059] font-mono text-[10px] tracking-widest uppercase bg-[#C5A059]/10 px-3 py-1.5 border border-[#C5A059]/20 self-start sm:self-auto">
          Protocol Day {metrics.complianceStreak + 1}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className={labelClass}>
            Calendar Date
          </label>
          <input
            type="date"
            required
            aria-label="Calendar Date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={inputClass}
            style={{ colorScheme: 'dark' }}
          />
        </div>
        <div>
          <label className={labelClass}>
            Session Time (IST)
          </label>
          <input
            type="time"
            required
            aria-label="Session Time"
            value={sessionTime}
            onChange={(e) => setSessionTime(e.target.value)}
            className={inputClass}
            style={{ colorScheme: 'dark' }}
          />
        </div>
        <div>
          <label className={labelClass}>
            Asian High ($)
          </label>
          <input
            type="number"
            step="0.01"
            aria-label="Asian High"
            value={asianHigh}
            onChange={(e) => setAsianHigh(Number(e.target.value))}
            placeholder="2045.50"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>
            Asian Low ($)
          </label>
          <input
            type="number"
            step="0.01"
            aria-label="Asian Low"
            value={asianLow}
            onChange={(e) => setAsianLow(Number(e.target.value))}
            placeholder="2030.00"
            className={inputClass}
          />
        </div>
      </div>

      {trapWarning && (
        <div className="p-3 bg-[#1A0505] border border-red-900/50 text-red-500 rounded-none text-xs font-mono tracking-wider flex items-center">
          <span className="font-bold mr-2 text-red-600">LOGIC ALERT:</span> Sweep logged outside the 12:30 PM - 13:15 PM IST macro window. This indicates a low-probability trap.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className={labelClass}>
            Sweep Status
          </label>
          <select
            value={sweepStatus}
            aria-label="Sweep Status"
            onChange={(e) => setSweepStatus(e.target.value as SweepStatus)}
            className={inputClass}
          >
            <option value="No Sweep">No Sweep</option>
            <option value="Buy-Side Sweep">BSL Sweep</option>
            <option value="Sell-Side Sweep">SSL Sweep</option>
          </select>
        </div>

        <div>
          <label className={labelClass}>
            MSS Timestamp
          </label>
          <input
            type="time"
            aria-label="Market Structure Shift Time"
            value={mssTimestamp}
            onChange={(e) => setMssTimestamp(e.target.value)}
            className={inputClass + " disabled:opacity-50 disabled:cursor-not-allowed"}
            disabled={sweepStatus === 'No Sweep'}
            style={{ colorScheme: 'dark' }}
          />
        </div>

        <div className="flex flex-col justify-end pb-2">
          <label className="flex items-center space-x-3 cursor-pointer group p-3 border border-transparent hover:border-[#222] transition-colors">
            <input
              type="checkbox"
              aria-label="Fair Value Gap Presence"
              checked={fvgPresence}
              onChange={(e) => setFvgPresence(e.target.checked)}
              disabled={!mssTimestamp}
              className="w-4 h-4 text-[#C5A059] bg-[#111] rounded-sm border-[#777] focus:ring-[#C5A059] focus:ring-offset-0 disabled:opacity-50 outline-none"
            />
            <span className="text-[#777] text-[10px] font-mono tracking-widest uppercase group-hover:text-white transition-colors">
              FVG Confirmed
            </span>
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#222]">
        <div>
           <label className={labelClass}>
             Session Outcome
          </label>
          <select
            value={resultOutcome}
            aria-label="Real-Time Application Result"
            onChange={(e) => setResultOutcome(e.target.value as ResultOutcome)}
            className={inputClass}
          >
            <option value="No Setup">No Setup</option>
            <option value="Missed Entry">Missed Entry</option>
            <option value="Win (+1.5%)">Win (+1.5% RR)</option>
            <option value="Loss (-0.5%)">Loss (-0.5% Risk)</option>
          </select>
        </div>
        
        <div className="flex flex-col justify-end">
             <label className="flex items-start space-x-3 cursor-pointer bg-[#111] p-3 border border-[#222] hover:border-red-900/50 transition-colors group h-[46px]">
            <input
              type="checkbox"
              checked={executedTrade}
               aria-label="Execution Panel Interaction"
              onChange={(e) => setExecutedTrade(e.target.checked)}
              className="w-4 h-4 text-red-600 bg-[#111] rounded-sm border-[#777] focus:ring-red-600 focus:ring-offset-0 mt-0.5 outline-none"
            />
            <div className="flex flex-col flex-1 leading-none pt-[1px]">
               <span className="text-[#E0E0E0] font-mono text-[10px] uppercase tracking-widest group-hover:text-red-400 transition-colors">
                Execution Infraction
              </span>
              <span className="text-[#555] text-[9px] mt-1.5 font-mono tracking-wider">
                FLAG: I OPENED A LIVE/DEMO POSITION.
              </span>
            </div>
          </label>
        </div>
      </div>

      <div className="mt-2">
        <button
          type="submit"
          className="w-full bg-[#C5A059] hover:bg-[#D6B570] text-black p-4 font-black uppercase tracking-[0.2em] transition-colors text-sm"
        >
          Initialize Logbook : Commit Day {metrics.complianceStreak + 1}
        </button>
      </div>
    </form>
  );
}
