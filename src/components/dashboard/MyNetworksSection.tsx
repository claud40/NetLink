import React from 'react';
import { LinkedNetworkAccount } from '../../types/network';
import { NetworkCardItem } from './NetworkCardItem';
import { Layers } from 'lucide-react';

interface MyNetworksSectionProps {
  networks: LinkedNetworkAccount[];
  onSelectNetwork: (account: LinkedNetworkAccount) => void;
}

export const MyNetworksSection: React.FC<MyNetworksSectionProps> = ({
  networks,
  onSelectNetwork,
}) => {
  return (
    <section className="space-y-2.5">
      {/* Section Header */}
      <div className="flex items-center justify-between px-1">
        <div>
          <h2 className="text-sm font-bold text-slate-900 leading-tight">
            My Networks
          </h2>
          <p className="text-[10.5px] text-slate-500">
            {networks.length} linked carrier accounts
          </p>
        </div>
        <span className="text-[10px] text-slate-400 font-medium">
          Active Multi-SIM
        </span>
      </div>

      {/* 2-Column Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {networks.map((account) => (
          <NetworkCardItem
            key={account.networkId}
            account={account}
            onSelect={onSelectNetwork}
          />
        ))}
      </div>
    </section>
  );
};
