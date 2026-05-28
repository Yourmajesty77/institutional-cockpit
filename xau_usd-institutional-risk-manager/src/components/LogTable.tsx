import { LogEntry } from '../types';
import { Trash2 } from 'lucide-react';
import { cn } from '../utils';

interface LogTableProps {
  logs: LogEntry[];
  onDelete: (id: string) => void;
}

export function LogTable({ logs, onDelete }: LogTableProps) {
  if (logs.length === 0) {
    return (
      <div className="flex-1 border border-[#222] bg-[#0A0A0A] flex flex-col items-center justify-center p-8 text-center text-[10px] text-[#777] font-mono tracking-widest uppercase">
        NO DATALOGS FOUND. INITIALIZE LOGBOOK TO AWAIT NOMINAL DATA.
      </div>
    );
  }

  return (
    <div className="flex-1 border border-[#222] bg-[#0A0A0A] overflow-y-auto">
      <table className="w-full font-mono text-[11px] text-left border-collapse">
        <thead className="bg-[#111] text-[#777] border-b border-[#222] sticky top-0 uppercase tracking-wider z-10">
          <tr>
            <th className="p-3 font-medium">ID</th>
            <th className="p-3 font-medium">Session (IST)</th>
            <th className="p-3 font-medium">Asian H/L</th>
            <th className="p-3 font-medium">Sweep Context</th>
            <th className="p-3 font-medium">MSS / FVG</th>
            <th className="p-3 font-medium">Outcome</th>
            <th className="p-3 font-medium">Compliance</th>
            <th className="p-3 font-medium text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#222] text-[#E0E0E0]">
          {logs.map((log) => (
            <tr
              key={log.id}
              className={cn(
                'hover:bg-[#111] transition-colors',
                log.infractionCheck === 'Fail' && 'bg-[#1A0505] hover:bg-[#2A0A0A]'
              )}
            >
              <td className="p-3 text-[#C5A059] font-bold">
                D-{log.dayNumber}/90
              </td>
              <td className="p-3">
                {log.date} <br />
                <span className="text-[#777]">{log.sessionTime}</span>
              </td>
              <td className="p-3">
                <span className="text-[#555]">H:</span> {log.asianHigh !== '' ? log.asianHigh : '--'} <br />
                <span className="text-[#555]">L:</span> {log.asianLow !== '' ? log.asianLow : '--'}
              </td>
              <td className="p-3">
                <span className={cn(
                  log.sweepStatus === 'Buy-Side Sweep' && 'text-orange-400',
                  log.sweepStatus === 'Sell-Side Sweep' && 'text-[#60A5FA]',
                  log.sweepStatus === 'No Sweep' && 'text-[#777]'
                )}>
                  {log.sweepStatus !== 'No Sweep' ? (log.sweepStatus === 'Buy-Side Sweep' ? 'BSL SWEEP' : 'SSL SWEEP') : 'NO SWEEP'}
                </span>
                {log.isTrapTime && (
                  <div className="text-[9px] text-red-500 font-bold mt-1 tracking-widest">
                    ⚠️ MACRO-TRAP
                  </div>
                )}
              </td>
              <td className="p-3">
                {log.mssTimestamp ? `YES (${log.mssTimestamp})` : 'NO'} <br />
                <span className="text-[#777]">{log.fvgPresence ? 'FVG: YES' : 'FVG: NO'}</span>
              </td>
              <td className="p-3">
                <OutcomeBadge outcome={log.resultOutcome} />
              </td>
              <td className="p-3">
                <span
                  className={cn(
                    'font-bold tracking-widest',
                    log.infractionCheck === 'Pass'
                      ? 'text-green-500'
                      : 'text-red-500'
                  )}
                >
                  {log.infractionCheck.toUpperCase()}
                </span>
              </td>
              <td className="p-3 text-right">
                <button
                  onClick={() => onDelete(log.id)}
                  className="text-[#555] hover:text-red-500 transition-colors p-1"
                  title="Delete Entry"
                >
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function OutcomeBadge({ outcome }: { outcome: string }) {
  const isWin = outcome.includes('Win');
  const isLoss = outcome.includes('Loss');
  const isInfraction = outcome.includes('Infraction');

  return (
    <span
      className={cn(
        'font-bold uppercase tracking-wider',
        isWin && 'text-[#C5A059]',
        isLoss && 'text-red-500',
        isInfraction && 'text-red-600',
        !isWin && !isLoss && !isInfraction && 'text-[#777]'
      )}
    >
      {isInfraction ? 'FAILED' : outcome.replace(' (+1.5%)', '').replace(' (-0.5%)', '')}
      {isWin && ' +1.5%'}
      {isLoss && ' -0.5%'}
    </span>
  );
}
