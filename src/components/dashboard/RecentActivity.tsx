import React from 'react';
import { DemoActivityRecord } from '../../types/network';
import { ArrowDownLeft, ArrowUpRight, Wifi, PhoneCall, ChevronRight } from 'lucide-react';

interface RecentActivityProps {
  activities: DemoActivityRecord[];
  onViewAll: () => void;
  onSelectActivity?: (activity: DemoActivityRecord) => void;
}

export const RecentActivity: React.FC<RecentActivityProps> = ({
  activities,
  onViewAll,
  onSelectActivity,
}) => {
  const getCategoryIcon = (category: DemoActivityRecord['category']) => {
    switch (category) {
      case 'data':
        return <Wifi className="w-4 h-4 text-emerald-600" />;
      case 'airtime':
        return <PhoneCall className="w-4 h-4 text-blue-600" />;
      case 'transfer':
        return <ArrowUpRight className="w-4 h-4 text-amber-600" />;
      default:
        return <ArrowDownLeft className="w-4 h-4 text-slate-600" />;
    }
  };

  return (
    <section className="space-y-2">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-1.5">
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Recent Activity
          </h2>
          <span className="text-[10px] text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200/60 font-semibold">
            Demo records
          </span>
        </div>
        <button
          onClick={onViewAll}
          type="button"
          className="text-xs font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center gap-0.5 cursor-pointer"
        >
          <span>View all</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="bg-white border border-slate-200/90 rounded-2xl divide-y divide-slate-100 shadow-2xs overflow-hidden">
        {activities.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectActivity && onSelectActivity(item)}
            className="p-3 flex items-center justify-between hover:bg-slate-50/70 transition-colors cursor-pointer"
            role="button"
            tabIndex={0}
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200/60">
                {getCategoryIcon(item.category)}
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 leading-tight">
                  {item.title}
                </h4>
                <div className="flex items-center gap-1.5 text-[10px] text-slate-500 mt-0.5">
                  <span className="font-semibold text-slate-700">{item.networkName}</span>
                  <span>·</span>
                  <span>{item.timestamp}</span>
                </div>
              </div>
            </div>

            <div className="text-right">
              <div
                className={`text-xs font-bold tabular-nums ${
                  item.isDebit ? 'text-slate-900' : 'text-emerald-600'
                }`}
              >
                {item.amountFormatted}
              </div>
              <span className="text-[9px] text-slate-400 block font-mono">
                {item.referenceNumber}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
