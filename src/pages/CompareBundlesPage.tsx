import React, { useState } from 'react';
import { COMPARABLE_BUNDLES } from '../data/mockData';
import { ComparableBundle, NetworkId } from '../types/network';
import { Scale, Filter, Check, ArrowUpDown, Sparkles, ChevronRight, Zap } from 'lucide-react';
import { Button } from '../components/common/Button';

interface CompareBundlesPageProps {
  onSelectBundleToBuy?: (bundle: ComparableBundle) => void;
}

export const CompareBundlesPage: React.FC<CompareBundlesPageProps> = ({
  onSelectBundleToBuy,
}) => {
  const [validityFilter, setValidityFilter] = useState<'All' | 'Daily' | 'Weekly' | 'Monthly'>('All');
  const [operatorFilter, setOperatorFilter] = useState<NetworkId | 'all'>('all');
  const [sortBy, setSortBy] = useState<'price' | 'value' | 'data'>('value');
  const [selectedBundle, setSelectedBundle] = useState<ComparableBundle | null>(null);

  // Filtering
  const filtered = COMPARABLE_BUNDLES.filter((item) => {
    if (validityFilter !== 'All' && item.validity !== validityFilter) return false;
    if (operatorFilter !== 'all' && item.networkId !== operatorFilter) return false;
    return true;
  });

  // Sorting
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'price') return a.priceKwacha - b.priceKwacha;
    if (sortBy === 'data') return b.dataGB - a.dataGB;
    // 'value' = lowest cost per GB first
    const costPerGBA = a.priceKwacha / a.dataGB;
    const costPerGBB = b.priceKwacha / b.dataGB;
    return costPerGBA - costPerGBB;
  });

  const getOperatorBadgeStyle = (networkId: NetworkId) => {
    switch (networkId) {
      case 'airtel':
        return 'bg-[#E11400] text-white';
      case 'mtn':
        return 'bg-[#FFCC00] text-slate-950 font-bold';
      case 'zamtel':
        return 'bg-[#059669] text-white';
      case 'zedmobile':
        return 'bg-[#0284C7] text-white';
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 min-h-full">
      <div className="p-4 space-y-4">
        {/* Header Banner */}
        <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white rounded-2xl p-4 shadow-sm space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center backdrop-blur-xs">
              <Scale className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-base font-bold leading-tight">Compare Data Bundles</h1>
              <p className="text-[11px] text-blue-100">Live side-by-side tariff comparison for Zambia</p>
            </div>
          </div>
          <div className="pt-1 flex items-center gap-2 text-[10px] text-blue-100 bg-white/10 rounded-xl px-2.5 py-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
            <span>Zamtel and ZedMobile currently provide the lowest cost per GB for 24h & 30d plans.</span>
          </div>
        </div>

        {/* Validity Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-200/80 rounded-xl overflow-x-auto">
          {(['All', 'Daily', 'Weekly', 'Monthly'] as const).map((period) => (
            <button
              key={period}
              type="button"
              onClick={() => setValidityFilter(period)}
              className={`flex-1 py-1.5 px-3 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap text-center ${
                validityFilter === period
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {period === 'All' ? 'All Periods' : period}
            </button>
          ))}
        </div>

        {/* Operator Filter Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5">
          <button
            type="button"
            onClick={() => setOperatorFilter('all')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
              operatorFilter === 'all'
                ? 'bg-slate-900 text-white border-slate-900'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            All 4 Networks
          </button>
          {(['airtel', 'mtn', 'zamtel', 'zedmobile'] as const).map((netId) => {
            const isSelected = operatorFilter === netId;
            return (
              <button
                key={netId}
                type="button"
                onClick={() => setOperatorFilter(netId)}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg border transition-all cursor-pointer capitalize ${
                  isSelected
                    ? `${getOperatorBadgeStyle(netId)} border-transparent ring-2 ring-blue-500/30`
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {netId === 'zedmobile' ? 'ZedMobile' : netId}
              </button>
            );
          })}
        </div>

        {/* Sort selector */}
        <div className="flex items-center justify-between text-xs px-1 text-slate-500">
          <span>Showing {sorted.length} offers</span>
          <div className="flex items-center gap-1">
            <span className="text-[11px]">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-xs font-bold text-slate-800 bg-white border border-slate-200 rounded-lg px-2 py-1 cursor-pointer focus:outline-none"
            >
              <option value="value">Best Value (K/GB)</option>
              <option value="price">Lowest Price</option>
              <option value="data">Highest Data</option>
            </select>
          </div>
        </div>

        {/* Comparison Cards Stack */}
        <div className="space-y-2.5">
          {sorted.map((bundle) => {
            const isBestValue = bundle.highlightTag === 'Best Value';
            return (
              <div
                key={bundle.id}
                onClick={() => setSelectedBundle(bundle)}
                className={`bg-white border rounded-2xl p-3.5 shadow-2xs hover:shadow-sm transition-all cursor-pointer relative ${
                  isBestValue ? 'border-emerald-300 ring-1 ring-emerald-400/30' : 'border-slate-200/90'
                }`}
              >
                {/* Highlight Tag */}
                {bundle.highlightTag && (
                  <div className="absolute -top-2 right-4">
                    <span
                      className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full shadow-2xs ${
                        bundle.highlightTag === 'Best Value'
                          ? 'bg-emerald-600 text-white'
                          : bundle.highlightTag === 'Most Data'
                          ? 'bg-blue-600 text-white'
                          : 'bg-amber-500 text-slate-950 font-bold'
                      }`}
                    >
                      {bundle.highlightTag}
                    </span>
                  </div>
                )}

                <div className="flex items-start justify-between gap-3">
                  {/* Left: Operator Badge & Bundle Name */}
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] uppercase font-bold shrink-0 ${getOperatorBadgeStyle(
                        bundle.networkId
                      )}`}
                    >
                      {bundle.networkName}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 leading-tight">
                        {bundle.dataAmount}
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">{bundle.validity} Pack</p>
                    </div>
                  </div>

                  {/* Right: Price & Cost per GB */}
                  <div className="text-right">
                    <div className="text-base font-extrabold text-slate-900 tabular-nums">
                      {bundle.priceFormatted}
                    </div>
                    <div className="text-[10px] font-semibold text-slate-500 tabular-nums">
                      {bundle.costPerGBFormatted}
                    </div>
                  </div>
                </div>

                <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="text-[10px]">Valid for {bundle.validityDays} day(s)</span>
                  <span className="text-blue-600 font-semibold inline-flex items-center gap-0.5 hover:underline">
                    View & Subscribe
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Bundle Detail Modal */}
      {selectedBundle && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white w-full max-w-sm rounded-2xl p-5 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold inline-block mb-1.5 ${getOperatorBadgeStyle(
                    selectedBundle.networkId
                  )}`}
                >
                  {selectedBundle.networkName}
                </span>
                <h3 className="text-base font-bold text-slate-900">{selectedBundle.bundleName}</h3>
              </div>
              <button
                onClick={() => setSelectedBundle(null)}
                className="w-7 h-7 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80 space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Data Allowance:</span>
                <span className="font-bold text-slate-900">{selectedBundle.dataAmount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Price (ZMW):</span>
                <span className="font-bold text-slate-900">{selectedBundle.priceFormatted}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Unit Cost:</span>
                <span className="font-mono text-emerald-700 font-bold">{selectedBundle.costPerGBFormatted}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Validity Period:</span>
                <span className="text-slate-700">{selectedBundle.validity} ({selectedBundle.validityDays} days)</span>
              </div>
            </div>

            <div className="p-2.5 bg-blue-50 border border-blue-200/60 rounded-xl text-[11px] text-blue-900">
              In live NetLink, selecting this plan initiates automated USSD code activation directly on your {selectedBundle.networkName} SIM.
            </div>

            <div className="flex gap-2 pt-1">
              <Button
                variant="secondary"
                className="flex-1 text-xs"
                onClick={() => setSelectedBundle(null)}
              >
                Close
              </Button>
              <Button
                variant="primary"
                className="flex-1 text-xs"
                onClick={() => {
                  if (onSelectBundleToBuy) onSelectBundleToBuy(selectedBundle);
                  setSelectedBundle(null);
                }}
              >
                Simulate Purchase
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
