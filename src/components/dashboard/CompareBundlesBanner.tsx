import React from 'react';
import { Scale, ChevronRight } from 'lucide-react';

interface CompareBundlesBannerProps {
  onOpenCompare: () => void;
}

export const CompareBundlesBanner: React.FC<CompareBundlesBannerProps> = ({ onOpenCompare }) => {
  return (
    <div
      onClick={onOpenCompare}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpenCompare();
        }
      }}
      className="bg-gradient-to-r from-blue-50/90 via-indigo-50/70 to-blue-50/50 border border-blue-200/80 rounded-2xl p-3.5 flex items-center justify-between shadow-2xs hover:shadow-xs hover:border-blue-300 transition-all cursor-pointer group select-none active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
      aria-label="Open Compare Data Bundles"
    >
      <div className="flex items-center gap-3">
        {/* Blue Circle Icon with Balance Scales */}
        <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs shrink-0 ring-2 ring-blue-100 group-hover:scale-105 transition-transform">
          <Scale className="w-5 h-5 stroke-[2.2]" />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <h3 className="text-sm font-bold text-slate-900 leading-tight">
              Compare Data Bundles
            </h3>
            <span className="text-[9px] font-bold uppercase tracking-wider text-blue-700 bg-blue-100/80 px-1.5 py-0.5 rounded">
              Compare
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
            Find the best offers across all networks and save more.
          </p>
        </div>
      </div>

      <div className="w-6 h-6 rounded-full bg-white/80 border border-blue-100 flex items-center justify-center text-blue-600 group-hover:translate-x-0.5 transition-transform shrink-0">
        <ChevronRight className="w-4 h-4" />
      </div>
    </div>
  );
};
