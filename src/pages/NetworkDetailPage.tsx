import React, { useState } from 'react';
import { LinkedNetworkAccount } from '../types/network';
import { Button } from '../components/common/Button';
import {
  ArrowLeft,
  Smartphone,
  Wifi,
  PhoneCall,
  CreditCard,
  Hash,
  ShieldCheck,
  CheckCircle2,
  RefreshCw,
} from 'lucide-react';

interface NetworkDetailPageProps {
  account: LinkedNetworkAccount;
  onBack: () => void;
}

export const NetworkDetailPage: React.FC<NetworkDetailPageProps> = ({ account, onBack }) => {
  const [ussdFeedback, setUssdFeedback] = useState<string | null>(null);

  const simulateUssd = (code: string) => {
    setUssdFeedback(
      `[Simulated USSD ${code}] Response from ${account.name}: Balance is ${account.sampleBalanceFormatted}. Active bundle: ${account.sampleDataFormatted}. (Educational Prototype Mode)`
    );
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50">
      <div className="px-4 py-4 space-y-4">
        {/* Operator Hero Identity Card */}
          <div className={`${account.theme.cardBg || 'bg-slate-900'} ${account.theme.textColor || 'text-white'} rounded-3xl p-4 shadow-sm space-y-3`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-base shadow-xs select-none ${account.theme.monogramStyle || 'bg-white text-slate-900'}`}
                >
                  {account.monogram}
                </div>
                <div>
                  <h1 className="text-base font-bold leading-tight">
                    {account.name}
                  </h1>
                  <p className={`text-xs flex items-center gap-1 mt-0.5 ${account.theme.subtextColor || 'text-white/80'}`}>
                    <Smartphone className="w-3 h-3" />
                    <span>{account.simSlot}</span>
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className={`text-[10px] uppercase font-bold block ${account.theme.subtextColor || 'text-white/80'}`}>
                  Status
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-white/20 backdrop-blur-xs px-2 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                  Active
                </span>
              </div>
            </div>

            <div className={`rounded-xl p-2.5 ${account.theme.overlayBg || 'bg-black/15'} flex items-center justify-between text-xs`}>
              <span className={`font-medium ${account.theme.subtextColor || 'text-white/80'}`}>Phone Number:</span>
              <span className="font-mono font-bold">
                {account.maskedPhoneNumber}
              </span>
            </div>
          </div>

          {/* Sample Balance & Resource Meters */}
          <div className="grid grid-cols-2 gap-2.5">
            {/* Balance */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-3 shadow-2xs space-y-1">
              <div className="flex items-center gap-1 text-[11px] font-medium text-slate-500">
                <CreditCard className="w-3.5 h-3.5 text-blue-600" />
                <span>Sample Airtime</span>
              </div>
              <div className="text-lg font-bold text-slate-900 tabular-nums">
                {account.sampleBalanceFormatted}
              </div>
              <p className="text-[10px] text-slate-400">Illustrative figure</p>
            </div>

            {/* Data Allowance */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-3 shadow-2xs space-y-1">
              <div className="flex items-center gap-1 text-[11px] font-medium text-slate-500">
                <Wifi className="w-3.5 h-3.5 text-emerald-600" />
                <span>Sample Data</span>
              </div>
              <div className={`text-lg font-bold tabular-nums ${account.theme.accentText}`}>
                {account.sampleDataFormatted}
              </div>
              <p className="text-[10px] text-slate-400">{account.sampleExpiryNotice}</p>
            </div>
          </div>

          {/* USSD feedback notification banner if triggered */}
          {ussdFeedback && (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs space-y-2 text-blue-950 animate-in fade-in">
              <div className="flex items-start justify-between">
                <span className="font-bold">USSD Session Response</span>
                <button
                  onClick={() => setUssdFeedback(null)}
                  className="text-[10px] text-blue-700 underline font-semibold cursor-pointer"
                >
                  Dismiss
                </button>
              </div>
              <p className="text-[11px] leading-relaxed font-mono bg-white/70 p-2 rounded border border-blue-200/60">
                {ussdFeedback}
              </p>
            </div>
          )}

          {/* Available Prototype Actions */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-2xs space-y-3">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Available Prototype Actions
            </h2>

            <div className="space-y-2">
              <button
                type="button"
                onClick={() => simulateUssd('*114#')}
                className="w-full p-2.5 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-left flex items-center justify-between text-xs font-semibold text-slate-800 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                    <RefreshCw className="w-4 h-4" />
                  </div>
                  <div>
                    <span>Query Balance via USSD (*114#)</span>
                    <span className="text-[10px] text-slate-400 block font-normal">
                      Simulate network balance verification
                    </span>
                  </div>
                </div>
                <span className="text-blue-600 text-[11px]">Run</span>
              </button>

              <button
                type="button"
                onClick={() => simulateUssd('*115#')}
                className="w-full p-2.5 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-left flex items-center justify-between text-xs font-semibold text-slate-800 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <Hash className="w-4 h-4" />
                  </div>
                  <div>
                    <span>Open Operator Menu (*115#)</span>
                    <span className="text-[10px] text-slate-400 block font-normal">
                      Simulate self-care mobile service menu
                    </span>
                  </div>
                </div>
                <span className="text-emerald-600 text-[11px]">Run</span>
              </button>

              <button
                type="button"
                onClick={() => simulateUssd('*117#')}
                className="w-full p-2.5 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-left flex items-center justify-between text-xs font-semibold text-slate-800 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
                    <PhoneCall className="w-4 h-4" />
                  </div>
                  <div>
                    <span>Internet Bundle Catalog (*117#)</span>
                    <span className="text-[10px] text-slate-400 block font-normal">
                      Simulate daily & weekly bundle purchases
                    </span>
                  </div>
                </div>
                <span className="text-amber-700 text-[11px]">Run</span>
              </button>
            </div>
          </div>

          {/* Prototype Safeguard Notice */}
          <div className="p-3 bg-slate-100/90 border border-slate-200/80 rounded-xl text-[11px] text-slate-600 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Educational Mockup:</strong> In future versions of NetLink, this screen will facilitate automated USSD automation and direct SIM bundle activation on Android devices.
            </p>
          </div>

          {/* Return Button */}
          <Button variant="secondary" className="w-full text-xs" onClick={onBack}>
            ← Back to Line Overview
          </Button>
        </div>
      </div>
  );
};
