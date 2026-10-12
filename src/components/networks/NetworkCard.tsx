import React from 'react';
import { NetworkIdentity } from '../../types/network';
import { Card } from '../common/Card';
import { NetworkPlaceholderBadge } from './NetworkPlaceholderBadge';
import { formatPrefixList } from '../../utils/formatters';
import { ChevronRight, Radio, ShieldCheck } from 'lucide-react';

interface NetworkCardProps {
  network: NetworkIdentity;
  isSelected?: boolean;
  onSelect?: (network: NetworkIdentity) => void;
}

export const NetworkCard: React.FC<NetworkCardProps> = ({
  network,
  isSelected = false,
  onSelect,
}) => {
  const handleClick = () => {
    if (onSelect) {
      onSelect(network);
    }
  };

  return (
    <Card
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      className={`p-4 cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 transition-all duration-150 ${
        isSelected
          ? 'border-blue-500 bg-blue-50/20 ring-1 ring-blue-500/20'
          : 'hover:border-slate-300 hover:bg-slate-50/40'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <NetworkPlaceholderBadge network={network} size="md" />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-semibold text-slate-900 tracking-tight">
                {network.name}
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">{network.operatorType}</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
          <span className="hidden sm:inline">Details</span>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
        <div className="flex items-center gap-1.5 font-mono text-[11px] text-slate-600">
          <Radio className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span>Prefixes: {formatPrefixList(network.standardPrefixes)}</span>
        </div>

        <div className="flex items-center gap-1 text-[11px] text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
          <span>Prototype placeholder</span>
        </div>
      </div>
    </Card>
  );
};
