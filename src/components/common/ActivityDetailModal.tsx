import React from 'react';
import { DemoActivityRecord } from '../../types/network';
import { X, Wifi, PhoneCall, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { Button } from './Button';

interface ActivityDetailModalProps {
  activity: DemoActivityRecord | null;
  onClose: () => void;
}

export const ActivityDetailModal: React.FC<ActivityDetailModalProps> = ({
  activity,
  onClose,
}) => {
  if (!activity) return null;

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
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white w-full max-w-sm rounded-2xl p-5 shadow-2xl border border-slate-200 space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center border border-slate-200">
              {getCategoryIcon(activity.category)}
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">
                {activity.title}
              </h4>
              <p className="text-[11px] text-slate-500">{activity.networkName} Zambia</p>
            </div>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="w-7 h-7 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 flex items-center justify-center cursor-pointer transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-slate-500">Amount:</span>
            <span className="font-bold text-slate-900">{activity.amountFormatted}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Date/Time:</span>
            <span className="font-mono text-slate-700">{activity.timestamp}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Audit Ref:</span>
            <span className="font-mono text-slate-700">{activity.referenceNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Status:</span>
            <span className="text-emerald-700 font-semibold">Completed (Demo)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Note:</span>
            <span className="text-slate-700">{activity.note}</span>
          </div>
        </div>

        <Button
          variant="secondary"
          className="w-full text-xs"
          onClick={onClose}
        >
          Close Record
        </Button>
      </div>
    </div>
  );
};
