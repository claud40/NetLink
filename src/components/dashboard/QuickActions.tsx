import React from 'react';
import { Smartphone, Globe, Send, ReceiptText, ChevronRight } from 'lucide-react';
import { QuickActionType } from '../../types/network';

interface QuickActionsProps {
  onSelectAction: (action: QuickActionType | 'transactions') => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({ onSelectAction }) => {
  const actions: {
    id: QuickActionType | 'transactions';
    label: string;
    sublabel: string;
    icon: React.ComponentType<{ className?: string }>;
    cardBg: string;
    iconBg: string;
    chevronColor: string;
  }[] = [
    {
      id: 'airtime',
      label: 'Buy Airtime',
      sublabel: 'Top up your balance',
      icon: Smartphone,
      cardBg: 'bg-[#FFF0F0] border-red-200/80 hover:bg-[#FFE6E6]',
      iconBg: 'bg-red-200/80 text-red-700',
      chevronColor: 'text-red-500',
    },
    {
      id: 'data',
      label: 'Buy Data',
      sublabel: 'Get data bundles',
      icon: Globe,
      cardBg: 'bg-[#EFF6FF] border-blue-200/80 hover:bg-[#E0EEFE]',
      iconBg: 'bg-blue-200/80 text-blue-700',
      chevronColor: 'text-blue-500',
    },
    {
      id: 'send-money',
      label: 'Send Money',
      sublabel: 'Transfer funds',
      icon: Send,
      cardBg: 'bg-[#FEF9E7] border-amber-200/80 hover:bg-[#FEF3C7]',
      iconBg: 'bg-amber-200/80 text-amber-800',
      chevronColor: 'text-amber-600',
    },
    {
      id: 'transactions',
      label: 'Transactions',
      sublabel: 'View your history',
      icon: ReceiptText,
      cardBg: 'bg-[#FAF5FF] border-purple-200/80 hover:bg-[#F3E8FF]',
      iconBg: 'bg-purple-200/80 text-purple-700',
      chevronColor: 'text-purple-600',
    },
  ];

  return (
    <section className="space-y-2">
      <div className="flex items-center justify-between px-1">
        <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
          Quick Actions
        </h2>
        <span className="text-[10px] text-slate-400 font-medium">
          Multi-SIM Services
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {actions.map((act) => {
          const Icon = act.icon;
          return (
            <button
              key={act.id}
              onClick={() => onSelectAction(act.id)}
              type="button"
              className={`flex items-center justify-between p-2.5 rounded-2xl border ${act.cardBg} shadow-2xs active:scale-[0.98] transition-all cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600`}
              aria-label={act.label}
            >
              <div className="flex items-center gap-2 overflow-hidden">
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-2xs ${act.iconBg}`}
                >
                  <Icon className="w-4 h-4 stroke-[2.2]" />
                </div>
                <div className="overflow-hidden">
                  <span className="text-xs font-bold text-slate-900 block truncate leading-tight">
                    {act.label}
                  </span>
                  <span className="text-[10px] text-slate-500 block truncate leading-tight mt-0.5">
                    {act.sublabel}
                  </span>
                </div>
              </div>
              <ChevronRight className={`w-3.5 h-3.5 shrink-0 ${act.chevronColor}`} />
            </button>
          );
        })}
      </div>
    </section>
  );
};
