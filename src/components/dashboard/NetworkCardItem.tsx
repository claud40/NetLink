import React from 'react';
import { ChevronRight, Smartphone, Wallet, Globe } from 'lucide-react';
import { LinkedNetworkAccount } from '../../types/network';

interface NetworkCardItemProps {
  account: LinkedNetworkAccount;
  onSelect: (account: LinkedNetworkAccount) => void;
}

export const NetworkCardItem: React.FC<NetworkCardItemProps> = ({ account, onSelect }) => {
  const textColor = account.theme.textColor || 'text-white';
  const subtextColor = account.theme.subtextColor || 'text-white/80';
  const overlayBg = account.theme.overlayBg || 'bg-black/15';
  const dividerColor = account.theme.dividerColor || 'border-white/20';
  const chevronBg = account.theme.chevronBg || 'bg-white/20 text-white';
  const barTrack = account.theme.barTrack || 'bg-black/25';
  const barFill = account.theme.barFill || 'bg-white';
  const dataPercentage = account.dataUsagePercentage ?? 50;

  return (
    <div
      onClick={() => onSelect(account)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(account);
        }
      }}
      className={`group relative ${account.theme.cardBg || 'bg-slate-900'} ${textColor} rounded-3xl p-3.5 shadow-sm hover:shadow-md active:scale-[0.99] transition-all duration-150 cursor-pointer text-left flex flex-col justify-between select-none focus-visible:outline-none focus-visible:ring-2 ${account.theme.ringColor || 'focus-visible:ring-white'} focus-visible:ring-offset-2`}
      aria-label={`Open ${account.name} details`}
    >
      {/* Top Header: Identity & SIM Tag */}
      <div>
        <div className="flex items-center justify-between gap-1 mb-2">
          {/* Operator Monogram Emblem & Name */}
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div
              className={`w-9 h-9 rounded-2xl flex items-center justify-center font-black text-xs select-none shadow-xs shrink-0 ${account.theme.monogramStyle || 'bg-white text-slate-900'}`}
            >
              {account.monogram}
            </div>
            <div className="overflow-hidden">
              <h3 className="text-sm font-extrabold leading-tight tracking-tight truncate">
                {account.name}
              </h3>
              <div className={`flex items-center gap-1 text-[10px] font-medium mt-0.5 truncate ${subtextColor}`}>
                <Smartphone className="w-2.5 h-2.5 shrink-0 opacity-80" />
                <span className="truncate">{account.simSlot}</span>
              </div>
            </div>
          </div>

          {/* Circular Open Indicator */}
          <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${chevronBg} transition-transform group-hover:translate-x-0.5`}>
            <ChevronRight className="w-4 h-4 stroke-[2.5]" />
          </div>
        </div>

        {/* Sample Balance Box */}
        <div className={`rounded-2xl p-2.5 my-2 ${overlayBg} backdrop-blur-xs space-y-0.5`}>
          <div className={`flex items-center gap-1.5 text-[9.5px] uppercase font-bold tracking-wider ${subtextColor}`}>
            <Wallet className="w-3 h-3 opacity-80" />
            <span>Sample Balance</span>
          </div>
          <div className="text-base sm:text-lg font-black tracking-tight tabular-nums">
            {account.sampleBalanceFormatted}
          </div>
        </div>

        {/* Airtime & Data Metrics Row */}
        <div className="grid grid-cols-2 items-center gap-2 pt-1 pb-2">
          {/* Airtime */}
          <div>
            <span className={`text-[9px] uppercase font-bold tracking-wider block ${subtextColor}`}>
              Airtime
            </span>
            <span className="text-xs sm:text-sm font-extrabold tabular-nums">
              {account.sampleAirtimeFormatted || account.sampleBalanceFormatted}
            </span>
          </div>

          {/* Data */}
          <div className={`pl-2 border-l ${dividerColor}`}>
            <span className={`text-[9px] uppercase font-bold tracking-wider block ${subtextColor}`}>
              Data
            </span>
            <span className="text-xs sm:text-sm font-extrabold tabular-nums">
              {account.sampleDataFormatted}
            </span>
          </div>
        </div>
      </div>

      {/* Data Usage Progress Bar */}
      <div className="pt-2 border-t border-white/15 space-y-1.5">
        <div className={`flex items-center justify-between text-[9.5px] font-bold ${subtextColor}`}>
          <div className="flex items-center gap-1">
            <Globe className="w-3 h-3 opacity-80" />
            <span>Data Usage</span>
          </div>
          <span className="tabular-nums font-extrabold">{dataPercentage}%</span>
        </div>

        {/* Mini progress bar */}
        <div className={`w-full h-1.5 rounded-full overflow-hidden ${barTrack}`}>
          <div
            className={`h-full rounded-full transition-all duration-300 ${barFill}`}
            style={{ width: `${Math.min(100, Math.max(0, dataPercentage))}%` }}
          />
        </div>
      </div>
    </div>
  );
};
