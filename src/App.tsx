/**
 * NetLink - Unified Mobile Network Management (Zambia)
 * Mobile-First Application with Unified Navigation & Design System
 */

import { useState, useRef, useEffect } from 'react';
import {
  NavTabId,
  LinkedNetworkAccount,
  QuickActionType,
  DemoNotification,
  DemoActivityRecord,
} from './types/network';
import { DEMO_NOTIFICATIONS, LINKED_NETWORKS } from './data/mockData';
import { AppShell } from './components/layout/AppShell';
import { AppHeader } from './components/layout/AppHeader';
import { BottomNav } from './components/layout/BottomNav';
import { DashboardPage } from './pages/DashboardPage';
import { NetworkDetailPage } from './pages/NetworkDetailPage';
import { NetworksListPage } from './pages/NetworksListPage';
import { ActivityPage } from './pages/ActivityPage';
import { CompareBundlesPage } from './pages/CompareBundlesPage';
import { ProfilePage } from './pages/ProfilePage';
import { ActionPlaceholderModal } from './components/dashboard/ActionPlaceholderModal';
import { NotificationDrawer } from './components/dashboard/NotificationDrawer';
import { ActivityDetailModal } from './components/common/ActivityDetailModal';
import { Info, X, ShieldAlert } from 'lucide-react';
import { Button } from './components/common/Button';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTabId>('home');
  const [navOriginTab, setNavOriginTab] = useState<NavTabId>('home');
  const [selectedNetwork, setSelectedNetwork] = useState<LinkedNetworkAccount | null>(null);
  const [activeQuickAction, setActiveQuickAction] = useState<QuickActionType | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<DemoActivityRecord | null>(null);
  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<DemoNotification[]>(DEMO_NOTIFICATIONS);

  const mainScrollRef = useRef<HTMLElement>(null);

  // Automatically scroll to the very top whenever navigating to a different page or line detail
  useEffect(() => {
    if (mainScrollRef.current) {
      mainScrollRef.current.scrollTop = 0;
    }
    window.scrollTo(0, 0);
  }, [activeTab, selectedNetwork]);

  const handleOpenNetwork = (account: LinkedNetworkAccount, fromTab: NavTabId) => {
    setSelectedNetwork(account);
    setNavOriginTab(fromTab);
  };

  const handleBack = () => {
    setSelectedNetwork(null);
    setActiveTab(navOriginTab);
  };

  const handleTabChange = (tab: NavTabId) => {
    setActiveTab(tab);
    setSelectedNetwork(null);
    setNavOriginTab(tab);
  };

  const handleQuickAction = (action: QuickActionType | 'transactions' | 'compare' | 'more') => {
    if (action === 'transactions') {
      setActiveTab('activity');
      setSelectedNetwork(null);
      setNavOriginTab('activity');
    } else if (action === 'compare') {
      setActiveTab('compare');
      setSelectedNetwork(null);
      setNavOriginTab('compare');
    } else if (action === 'more') {
      setActiveTab('profile');
      setSelectedNetwork(null);
      setNavOriginTab('profile');
    } else {
      setActiveQuickAction(action as QuickActionType);
    }
  };

  const handleMarkAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <AppShell>
      {/* Unified App Header (Fixed at top) */}
      <AppHeader
        currentTab={activeTab}
        selectedNetwork={selectedNetwork}
        onBack={handleBack}
        unreadNotificationCount={unreadCount}
        onOpenNotifications={() => setShowNotifications(true)}
        onOpenProfile={() => {
          setSelectedNetwork(null);
          setActiveTab('profile');
          setNavOriginTab('profile');
        }}
      />

      {/* Scrollable Viewport (Smooth scrolling with clean clearance for fixed nav) */}
      <main
        ref={mainScrollRef}
        className="flex-1 overflow-y-auto overscroll-contain bg-slate-50 min-h-0 pb-12"
      >
        {selectedNetwork ? (
          <NetworkDetailPage
            account={selectedNetwork}
            onBack={handleBack}
          />
        ) : activeTab === 'home' ? (
          <DashboardPage
            onSelectNetwork={(account) => handleOpenNetwork(account, 'home')}
            onSelectQuickAction={handleQuickAction}
            onOpenCompare={() => {
              setActiveTab('compare');
              setSelectedNetwork(null);
              setNavOriginTab('compare');
            }}
            onViewAllActivity={() => {
              setActiveTab('activity');
              setSelectedNetwork(null);
              setNavOriginTab('activity');
            }}
            onSelectActivity={(act) => setSelectedActivity(act)}
          />
        ) : activeTab === 'networks' ? (
          <NetworksListPage
            onSelectNetwork={(account) => handleOpenNetwork(account, 'networks')}
            onOpenAddSimModal={() => setActiveQuickAction('link-sim')}
          />
        ) : activeTab === 'activity' ? (
          <ActivityPage />
        ) : activeTab === 'compare' ? (
          <CompareBundlesPage
            onSelectBundleToBuy={(bundle) => {
              const matchedNet = LINKED_NETWORKS.find((n) => n.networkId === bundle.networkId);
              if (matchedNet) {
                handleOpenNetwork(matchedNet, 'compare');
              }
            }}
          />
        ) : (
          <ProfilePage onOpenProjectNotice={() => setShowInfoModal(true)} />
        )}
      </main>

      {/* Fixed Bottom Navigation (Docked at bottom) */}
      <BottomNav
        activeTab={selectedNetwork ? navOriginTab : activeTab}
        onTabChange={handleTabChange}
      />

      {/* Quick Action & Link SIM Modal */}
      <ActionPlaceholderModal
        actionType={activeQuickAction}
        onClose={() => setActiveQuickAction(null)}
      />

      {/* Activity Receipt Modal (works from Dashboard and everywhere) */}
      <ActivityDetailModal
        activity={selectedActivity}
        onClose={() => setSelectedActivity(null)}
      />

      {/* Notifications Drawer */}
      <NotificationDrawer
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
        notifications={notifications}
        onMarkAllAsRead={handleMarkAllNotificationsRead}
      />

      {/* Prototype Information Modal */}
      {showInfoModal && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white w-full max-w-sm rounded-2xl p-5 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-blue-600">
                <Info className="w-5 h-5" />
                <h3 className="text-base font-bold text-slate-900">About NetLink Prototype</h3>
              </div>
              <button
                onClick={() => setShowInfoModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 flex items-center justify-center cursor-pointer transition-colors"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 text-xs text-slate-600 leading-relaxed">
              <p>
                <strong className="text-slate-800">NetLink: One app. All your networks.</strong> Unifies multi-SIM line management for Airtel, MTN, Zamtel, and ZedMobile into one streamlined Android-first interface.
              </p>
              <div className="p-3 bg-amber-50 border border-amber-200/80 rounded-xl flex items-start gap-2 text-amber-900 text-[11px]">
                <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  All balances, phone numbers, and transactional records are illustrative mock data for prototyping purposes only. No real telecommunications connections or banking APIs are utilized.
                </span>
              </div>
            </div>

            <div className="pt-2">
              <Button
                variant="primary"
                className="w-full text-xs"
                onClick={() => setShowInfoModal(false)}
              >
                Close Notice
              </Button>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}
