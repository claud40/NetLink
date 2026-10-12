import React from 'react';
import { NetworkIdentity } from '../../types/network';

interface NetworkPlaceholderBadgeProps {
  network: NetworkIdentity;
  size?: 'sm' | 'md' | 'lg';
}

export const NetworkPlaceholderBadge: React.FC<NetworkPlaceholderBadgeProps> = ({
  network,
  size = 'md',
}) => {
  const sizeConfig = {
    sm: {
      container: 'w-8 h-8 rounded-lg text-xs',
      indicator: 'w-1.5 h-1.5',
    },
    md: {
      container: 'w-11 h-11 rounded-xl text-sm',
      indicator: 'w-2 h-2',
    },
    lg: {
      container: 'w-14 h-14 rounded-2xl text-base',
      indicator: 'w-2.5 h-2.5',
    },
  }[size];

  return (
    <div
      className={`relative inline-flex items-center justify-center font-bold tracking-wider select-none shrink-0 border border-slate-200/90 bg-slate-50 text-slate-800 shadow-2xs ${sizeConfig.container}`}
      aria-label={`${network.name} placeholder icon`}
    >
      <span className="font-semibold text-slate-800">{network.monogram}</span>
      {/* Subtle corner indicator dot designating operator identity tag */}
      <span
        className={`absolute -top-0.5 -right-0.5 rounded-full ring-2 ring-white ${sizeConfig.indicator} ${network.theme.accentBg}`}
        aria-hidden="true"
      />
    </div>
  );
};
