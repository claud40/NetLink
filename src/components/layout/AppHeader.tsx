import React from 'react';
import {
  Bell,
  User,
  ArrowLeft,
  Layers,
  Clock,
  Scale,
} from 'lucide-react';
import { NavTabId, LinkedNetworkAccount } from '../../types/network';
import { USER_PROFILE } from '../../data/mockData';
import { NetLinkLogo } from '../common/NetLinkLogo';

interface AppHeaderProps {
  currentTab: NavTabId;
  selectedNetwork: LinkedNetworkAccount | null;
  onBack: () => void;
  unreadNotificationCount: number;
  onOpenNotifications: () => void;
  onOpenProfile: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  currentTab,
  selectedNetwork,
  onBack,
  unreadNotificationCount,
  onOpenNotifications,
  onOpenProfile,
}) => {
  // If viewing a single network's details, show a dedicated unified detail header
  if (selectedNetwork) {
    return (
      <header className="shrink-0 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 py-2.5 z-30 select-none">
        <div className="flex items-center justify-between gap-2">
          {/* Back button */}
          <button
            onClick={onBack}
            type="button"
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-blue-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
            aria-label="Go back"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          {/* Center Title with Monogram */}
          <div className="flex items-center gap-2 overflow-hidden">
            <div
              className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-[10px] shrink-0 ${selectedNetwork.theme.lightTint} ${selectedNetwork.theme.accentText} border border-slate-200`}
            >
              {selectedNetwork.monogram}
            </div>
            <div className="truncate text-left">
              <span className="text-sm font-bold text-slate-900 block truncate leading-tight">
                {selectedNetwork.name}
              </span>
              <span className="text-[10px] text-slate-500 block truncate">
                {selectedNetwork.simSlot}
              </span>
            </div>
          </div>

          {/* Right Action: Notifications */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={onOpenNotifications}
              type="button"
              className="relative w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="View notifications"
            >
              <Bell className="w-4 h-4 text-slate-700" />
              {unreadNotificationCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-blue-600 rounded-full ring-2 ring-white" />
              )}
            </button>
          </div>
        </div>
      </header>
    );
  }

  // Primary Tab Header
  return (
    <header className="shrink-0 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 pt-3 pb-2.5 z-30 select-none">
      {/* Top Bar Row */}
      <div className="flex items-center justify-between gap-3">
        {/* Brand / Tab Identifier with Official NetLink Logo */}
        <div className="flex items-center gap-2.5">
          {currentTab === 'home' && (
            <NetLinkLogo size="md" />
          )}
          {currentTab === 'networks' && (
            <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shadow-xs shrink-0 ring-2 ring-emerald-100">
              <Layers className="w-4 h-4 stroke-[2.5]" />
            </div>
          )}
          {currentTab === 'activity' && (
            <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold text-sm shadow-xs shrink-0 ring-2 ring-amber-100">
              <Clock className="w-4 h-4 stroke-[2.5]" />
            </div>
          )}
          {currentTab === 'compare' && (
            <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-xs shrink-0 ring-2 ring-blue-100">
              <Scale className="w-4 h-4 stroke-[2.5]" />
            </div>
          )}
          {currentTab === 'profile' && (
            <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-xs shrink-0 ring-2 ring-indigo-100">
              <User className="w-4 h-4 stroke-[2.5]" />
            </div>
          )}

          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-base font-extrabold text-slate-900 tracking-tight leading-none">
                {currentTab === 'home'
                  ? 'NetLink'
                  : currentTab === 'networks'
                  ? 'My Networks'
                  : currentTab === 'activity'
                  ? 'Usage & History'
                  : currentTab === 'compare'
                  ? 'Compare'
                  : 'Profile'}
              </span>
              <span className="text-[10px] uppercase font-semibold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200/60 leading-none">
                ZM
              </span>
            </div>
            <span className="text-[10px] text-slate-500 font-medium">
              {currentTab === 'home'
                ? 'One app. All your networks.'
                : currentTab === 'networks'
                ? '4 Zambian carriers linked'
                : currentTab === 'activity'
                ? 'Multi-carrier audit trail'
                : currentTab === 'compare'
                ? 'Live tariff comparison'
                : 'Account settings & lines'}
            </span>
          </div>
        </div>

        {/* Right Tools: Notifications, Profile Avatar */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={onOpenNotifications}
            type="button"
            className="relative w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            aria-label="View notifications"
          >
            <Bell className="w-4 h-4 text-slate-700" />
            {unreadNotificationCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-blue-600 rounded-full ring-2 ring-white" />
            )}
          </button>

          {currentTab !== 'profile' && (
            <button
              onClick={onOpenProfile}
              type="button"
              className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-700 to-blue-500 text-white font-semibold text-xs flex items-center justify-center shadow-xs cursor-pointer hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ring-2 ring-white"
              aria-label="View profile tab"
            >
              <User className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Contextual Sub-bar: on Home matching design concept */}
      {currentTab === 'home' && (
        <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between">
          <div>
            <h1 className="text-sm font-bold text-slate-900 leading-tight">
              {USER_PROFILE.greeting}
            </h1>
            <p className="text-[11px] text-slate-500 leading-tight mt-0.5">
              {USER_PROFILE.welcomeSubtitle}
            </p>
          </div>
          <div className="text-[9px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200/60">
            Zambia · 4 Networks
          </div>
        </div>
      )}
    </header>
  );
};
