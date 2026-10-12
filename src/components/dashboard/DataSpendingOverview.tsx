import React from 'react';
import { HardDrive, CreditCard, PieChart } from 'lucide-react';
import { DashboardOverview, LinkedNetworkAccount } from '../../types/network';

interface DataSpendingOverviewProps {
  overview: DashboardOverview;
  networks: LinkedNetworkAccount[];
}

export const DataSpendingOverview: React.FC<DataSpendingOverviewProps> = ({
  overview,
  networks,
}) => {
  return (
    <section className="space-y-2">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-1.5">
          <PieChart className="w-4 h-4 text-blue-600" />
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Data & Spending Overview
          </h2>
        </div>
        <span className="text-[10px] text-slate-400 font-medium">Illustrative Demo</span>
      </div>

      <div className="bg-white border border-slate-200/90 rounded-2xl p-3.5 shadow-2xs space-y-3">
        {/* 2-Column KPI Cards */}
        <div className="grid grid-cols-2 gap-3 divide-x divide-slate-100">
          {/* Total Data Remaining */}
          <div className="space-y-0.5">
            <div className="flex items-center gap-1 text-[11px] font-medium text-slate-500">
              <HardDrive className="w-3.5 h-3.5 text-blue-600" />
              <span>Total Demo Data</span>
            </div>
            <div className="text-lg font-bold text-slate-900 tabular-nums">
              {overview.totalDataRemainingFormatted}
            </div>
            <div className="text-[10px] text-slate-400">
              Across all 4 linked SIMs
            </div>
          </div>

          {/* Sample Monthly Spend */}
          <div className="pl-3 space-y-0.5">
            <div className="flex items-center gap-1 text-[11px] font-medium text-slate-500">
              <CreditCard className="w-3.5 h-3.5 text-emerald-600" />
              <span>Sample Month Spend</span>
            </div>
            <div className="text-lg font-bold text-slate-900 tabular-nums">
              {overview.sampleMonthlySpendingFormatted}
            </div>
            <div className="text-[10px] text-slate-400">
              Airtime & data estimates
            </div>
          </div>
        </div>

        {/* Visual Data Distribution Bar Across the 4 Networks */}
        <div className="space-y-1.5 pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-semibold text-slate-700">Combined Data Allocation</span>
            <span className="text-slate-500 font-mono text-[10px]">
              {overview.totalDataRemainingFormatted} of {overview.totalDataQuotaGB} GB Total
            </span>
          </div>

          {/* Multi-segment distribution bar */}
          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden flex gap-0.5 p-0.5">
            {networks.map((net) => {
              const pct = (net.sampleDataRemainingGB / overview.totalDataRemainingGB) * 100;
              return (
                <div
                  key={net.networkId}
                  className={`h-full rounded-sm ${net.theme.barColor}`}
                  style={{ width: `${pct}%` }}
                  title={`${net.name}: ${net.sampleDataFormatted}`}
                />
              );
            })}
          </div>

          {/* Legend dots */}
          <div className="flex flex-wrap items-center justify-between gap-1.5 pt-1 text-[10px] text-slate-500">
            {networks.map((net) => (
              <div key={net.networkId} className="flex items-center gap-1">
                <span className={`w-2 h-2 rounded-full ${net.theme.barColor}`} />
                <span className="font-medium text-slate-600">{net.shortName}:</span>
                <span className="font-mono text-slate-500">{net.sampleDataFormatted.split(' ')[0]}G</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
