/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useLogs } from './hooks/useLogs';
import { Dashboard } from './components/Dashboard';
import { LogForm } from './components/LogForm';
import { LogTable } from './components/LogTable';
import { ShieldAlert } from 'lucide-react';

export default function App() {
  const { logs, metrics, addLog, deleteLog } = useLogs();

  return (
    <div className="h-full border-4 border-[#1A1A1A] bg-[#050505] text-[#E0E0E0] flex flex-col font-sans overflow-hidden">
      <header className="bg-[#0A0A0A] border-b border-[#222] p-6 flex flex-col md:flex-row md:justify-between md:items-end shrink-0 gap-4">
        <div className="flex flex-col">
          <span className="text-[#777] text-xs font-mono tracking-[0.3em] uppercase mb-1">
            Institutional Terminal // XAU-USD
          </span>
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter leading-none text-white">
            RISK MANAGER <span className="text-[#C5A059]">PROTOCOL</span>
          </h1>
        </div>
        <div className="text-left md:text-right">
          <span className="text-[#777] text-xs font-mono tracking-widest uppercase mb-1">
            Session Status
          </span>
          <div className="flex items-center gap-2 md:justify-end mt-1">
            <div className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse"></div>
            <p className="text-xl font-bold font-mono text-white">SYSTEM ACTIVE</p>
          </div>
        </div>
      </header>

      <div className="flex flex-1 min-h-0">
        <main className="flex-1 overflow-auto flex flex-col p-4 md:p-8 gap-8 bg-[#050505]">
          <Dashboard metrics={metrics} />
          
          <LogForm onAdd={addLog} metrics={metrics} />
          
          <section className="flex-1 flex flex-col min-h-0">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-mono text-xs tracking-widest uppercase text-[#555]">
                Execution Log History
              </h3>
              <div className="px-2 py-1 bg-[#C5A059]/10 text-[#C5A059] text-[10px] font-mono border border-[#C5A059]/20">
                VERIFIED DATA STATE
              </div>
            </div>
            <div className="flex-1 overflow-hidden flex flex-col min-h-[300px]">
              <LogTable logs={logs} onDelete={deleteLog} />
            </div>
          </section>
        </main>
      </div>

      <footer className="h-8 bg-[#C5A059] flex items-center px-6 justify-between text-black text-[10px] font-black uppercase tracking-[0.2em] shrink-0">
        <span className="hidden sm:inline">System State: Nominal</span>
        <span>Protocol 1-Trade-Per-Day Active</span>
        <span className="hidden md:inline">Locked: 12:30 - 13:15 IST Macro Window Only</span>
      </footer>
    </div>
  );
}
