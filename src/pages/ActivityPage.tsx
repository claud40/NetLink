import React, { useState } from 'react';
import { DEMO_ACTIVITIES } from '../data/mockData';
import { DemoActivityRecord } from '../types/network';
import { Clock, Filter, Wifi, PhoneCall, ArrowUpRight, ArrowDownLeft, X, ShieldAlert } from 'lucide-react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';

import { ActivityDetailModal } from '../components/common/ActivityDetailModal';

export const ActivityPage: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'data' | 'airtime' | 'transfer'>('all');
  const [selectedActivity, setSelectedActivity] = useState<DemoActivityRecord | null>(null);

  const filteredActivities = DEMO_ACTIVITIES.filter((item) => {
    if (filter === 'all') return true;
    return item.category === filter;
  });

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
    <div className="flex-1 flex flex-col bg-slate-50">
      <div className="p-4 space-y-4">
        {/* Sub-header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Transaction Trail
            </h2>
            <p className="text-[11px] text-slate-500">
              Aggregated audit records across all 4 networks
            </p>
          </div>
          <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/60">
            Demo records
          </span>
        </div>

        {/* Filter Bar (Segmented button control) */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-200/70 rounded-xl overflow-x-auto">
          {(['all', 'data', 'airtime', 'transfer'] as const).map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all cursor-pointer whitespace-nowrap ${
                filter === cat
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat === 'all' ? 'All records' : cat}
            </button>
          ))}
        </div>

        {/* Records List */}
        <div className="bg-white border border-slate-200/90 rounded-2xl divide-y divide-slate-100 shadow-2xs overflow-hidden">
          {filteredActivities.length === 0 ? (
            <div className="p-6 text-center text-xs text-slate-500 space-y-1">
              <Clock className="w-6 h-6 text-slate-400 mx-auto" />
              <p>No sample records in this category.</p>
            </div>
          ) : (
            filteredActivities.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedActivity(item)}
                className="p-3.5 flex items-center justify-between hover:bg-slate-50/70 transition-colors cursor-pointer"
                role="button"
                tabIndex={0}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200/60">
                    {getCategoryIcon(item.category)}
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 leading-tight">
                      {item.title}
                    </h3>
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
                  <span className="text-[9px] text-slate-400 font-mono block">
                    {item.referenceNumber}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Prototype Audit Notice */}
        <div className="p-3 bg-slate-100/80 border border-slate-200/70 rounded-2xl flex items-start gap-2 text-[11px] text-slate-600">
          <ShieldAlert className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            All records displayed above are fictional illustrative mocks designed to demonstrate how NetLink centralizes multi-carrier transaction trails in Zambia.
          </p>
        </div>
      </div>

      {/* Detail Record Modal */}
      <ActivityDetailModal
        activity={selectedActivity}
        onClose={() => setSelectedActivity(null)}
      />
    </div>
  );
};
