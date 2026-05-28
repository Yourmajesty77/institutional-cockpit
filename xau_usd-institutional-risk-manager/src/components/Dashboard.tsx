import { AppMetrics } from '../types';

interface DashboardProps {
  metrics: AppMetrics;
}

export function Dashboard({ metrics }: DashboardProps) {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 shrink-0">
      <div className="bg-[#0A0A0A] border border-[#222] p-5">
        <span className="text-[10px] font-mono text-[#777] uppercase tracking-widest">Protocol Progress</span>
        <p className="text-4xl font-black mt-2 text-white">
          {metrics.totalLoggedDays}
          <span className="text-xl text-[#444]">/90</span>
        </p>
        <div className="w-full bg-[#1A1A1A] h-1 mt-4">
          <div 
            className="bg-[#C5A059] h-full transition-all duration-500" 
            style={{ width: `${Math.min((metrics.totalLoggedDays / 90) * 100, 100)}%` }}
          />
        </div>
      </div>

      <div className="bg-[#0A0A0A] border border-[#222] p-5">
        <span className="text-[10px] font-mono text-[#777] uppercase tracking-widest">Compliance Streak</span>
        <p className="text-4xl font-black mt-2 text-[#C5A059]">
          {metrics.complianceStreak}
          <span className="text-xl text-[#444] ml-1">DAYS</span>
        </p>
        <p className="text-[10px] font-mono text-[#555] mt-2 uppercase tracking-widest">
          Zero Infractions
        </p>
      </div>

      <div className="bg-[#0A0A0A] border border-[#222] p-5">
        <span className="text-[10px] font-mono text-[#777] uppercase tracking-widest">Operational Win Rate</span>
        <p className="text-4xl font-black mt-2 text-white">
          {metrics.winRate.toFixed(1)}
          <span className="text-xl text-[#444] ml-1">%</span>
        </p>
        <p className="text-[10px] font-mono text-[#555] mt-2 uppercase tracking-widest">
          {metrics.winningSetups}W | {metrics.losingSetups}L
        </p>
      </div>

      <div className="bg-[#0A0A0A] border border-[#222] p-5 flex flex-col justify-between">
        <span className="text-[10px] font-mono text-[#777] uppercase tracking-widest">Virtual Portfolio</span>
        <p className={`text-4xl font-black mt-2 tracking-tight ${metrics.simulatedBalance > 5000 ? 'text-[#C5A059]' : 'text-white'}`}>
          <span className="text-2xl mr-1 text-[#444] font-medium">$</span>
          {metrics.simulatedBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>
        <p className="text-[10px] font-mono text-[#555] mt-2 uppercase tracking-widest">
          STARTING: $5000.00
        </p>
      </div>
    </section>
  );
}
