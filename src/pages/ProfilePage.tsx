import React from 'react';
import { USER_PROFILE, LINKED_NETWORKS } from '../data/mockData';
import { User, Shield, Smartphone, Sliders, Info, CheckCircle2 } from 'lucide-react';
import { Card } from '../components/common/Card';

interface ProfilePageProps {
  onOpenProjectNotice: () => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ onOpenProjectNotice }) => {
  return (
    <div className="flex-1 flex flex-col bg-slate-50">
      <div className="p-4 space-y-4">
        {/* Profile User Card */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-2xs space-y-3">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-700 to-blue-500 text-white font-bold text-lg flex items-center justify-center shadow-xs">
              {USER_PROFILE.avatarInitial}
            </div>
            <div>
              <h1 className="text-base font-bold text-slate-900 leading-tight">
                {USER_PROFILE.fullName}
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">{USER_PROFILE.location}</p>
              <div className="inline-flex items-center gap-1 text-[10px] text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200/60 mt-1 font-semibold">
                <Shield className="w-3 h-3" />
                <span>Multi-SIM Profile Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* Linked SIM Inventory */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Linked SIM Inventory ({LINKED_NETWORKS.length})
            </h2>
            <span className="text-[10px] text-slate-400">Android SIM Slot Allocation</span>
          </div>

          <div className="space-y-2">
            {LINKED_NETWORKS.map((account) => (
              <div
                key={account.networkId}
                className="p-2.5 rounded-xl border border-slate-100 bg-slate-50/60 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${account.theme.lightTint} ${account.theme.accentText}`}
                  >
                    {account.monogram}
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block leading-tight">
                      {account.name}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">
                      {account.maskedPhoneNumber}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-500 block font-medium">
                    {account.simSlot.split(' ')[0]}
                  </span>
                  <span className="text-[10px] font-semibold text-emerald-600 flex items-center gap-1 justify-end">
                    <CheckCircle2 className="w-3 h-3" />
                    Synced
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Application Preferences (Prototype Mockup) */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-2xs space-y-2.5">
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Prototype Preferences
          </h2>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-2 text-slate-700">
                <Smartphone className="w-4 h-4 text-blue-600" />
                <span>USSD Direct Dialer Automation</span>
              </div>
              <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Enabled
              </span>
            </div>

            <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-2 text-slate-700">
                <Sliders className="w-4 h-4 text-blue-600" />
                <span>Low Balance Push Notification</span>
              </div>
              <span className="text-[10px] text-slate-600 font-semibold bg-slate-100 px-2 py-0.5 rounded">
                Active (&lt; K 20)
              </span>
            </div>
          </div>
        </div>

        {/* Project Statement & Info Trigger */}
        <button
          onClick={onOpenProjectNotice}
          type="button"
          className="w-full p-3 rounded-2xl bg-blue-50 border border-blue-200 text-left flex items-center justify-between cursor-pointer hover:bg-blue-100/70 transition-colors"
        >
          <div className="flex items-center gap-2.5 text-xs text-blue-900">
            <Info className="w-4 h-4 text-blue-600 shrink-0" />
            <div>
              <span className="font-bold block">About NetLink Prototype v0.1</span>
              <span className="text-[11px] text-blue-700 block">
                Educational disclaimer, architecture, and regulatory statement
              </span>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};
