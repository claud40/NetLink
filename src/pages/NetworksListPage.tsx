import React from 'react';
import { LINKED_NETWORKS } from '../data/mockData';
import { LinkedNetworkAccount } from '../types/network';
import { NetworkCardItem } from '../components/dashboard/NetworkCardItem';
import { Layers, ShieldCheck, Plus } from 'lucide-react';
import { Button } from '../components/common/Button';

interface NetworksListPageProps {
  onSelectNetwork: (account: LinkedNetworkAccount) => void;
  onOpenAddSimModal?: () => void;
}

export const NetworksListPage: React.FC<NetworksListPageProps> = ({
  onSelectNetwork,
  onOpenAddSimModal,
}) => {
  return (
    <div className="flex-1 flex flex-col bg-slate-50">
      <div className="p-4 space-y-4">
        {/* Page Top Action Bar */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Connected Multi-SIM Lines
            </h2>
            <p className="text-[11px] text-slate-500">
              Active Zambian SIM profiles in NetLink
            </p>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={onOpenAddSimModal}
            className="text-xs"
            icon={<Plus className="w-3.5 h-3.5" />}
          >
            Add SIM / Line
          </Button>
        </div>

        {/* Prototype info alert */}
        <div className="p-3 bg-blue-50 border border-blue-200/80 rounded-2xl flex items-start gap-2.5 text-xs text-blue-900">
          <Layers className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            NetLink organizes both physical SIMs and eSIMs across Airtel, MTN, Zamtel, and ZedMobile. Tap any card below to view line details or trigger simulated USSD actions.
          </p>
        </div>

        {/* Grid of Network Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {LINKED_NETWORKS.map((account) => (
            <NetworkCardItem
              key={account.networkId}
              account={account}
              onSelect={onSelectNetwork}
            />
          ))}
        </div>

        <div className="p-3 bg-white border border-slate-200/80 rounded-2xl text-[11px] text-slate-500 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-slate-400" />
            <span>Independent multi-carrier simulation</span>
          </div>
          <span className="font-semibold text-slate-700">4 / 4 Active</span>
        </div>
      </div>
    </div>
  );
};
