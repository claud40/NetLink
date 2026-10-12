import React from 'react';
import { LINKED_NETWORKS, DASHBOARD_OVERVIEW, DEMO_ACTIVITIES } from '../data/mockData';
import { LinkedNetworkAccount, QuickActionType, DemoActivityRecord } from '../types/network';
import { MyNetworksSection } from '../components/dashboard/MyNetworksSection';
import { QuickActions } from '../components/dashboard/QuickActions';
import { CompareBundlesBanner } from '../components/dashboard/CompareBundlesBanner';
import { DataSpendingOverview } from '../components/dashboard/DataSpendingOverview';
import { RecentActivity } from '../components/dashboard/RecentActivity';
import { Footer } from '../components/layout/Footer';

interface DashboardPageProps {
  onSelectNetwork: (account: LinkedNetworkAccount) => void;
  onSelectQuickAction: (action: QuickActionType | 'transactions' | 'compare' | 'more') => void;
  onViewAllActivity: () => void;
  onOpenCompare: () => void;
  onSelectActivity?: (activity: DemoActivityRecord) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  onSelectNetwork,
  onSelectQuickAction,
  onViewAllActivity,
  onOpenCompare,
  onSelectActivity,
}) => {
  return (
    <div className="flex-1 flex flex-col bg-slate-50">
      <div className="px-4 pt-3 pb-1 space-y-3.5">
        {/* 1. My Networks Section (Airtel, MTN, Zamtel, ZedMobile in their special brand colors) */}
        <MyNetworksSection
          networks={LINKED_NETWORKS}
          onSelectNetwork={onSelectNetwork}
        />

        {/* 2. Quick Tools Shortcuts */}
        <QuickActions onSelectAction={onSelectQuickAction} />

        {/* 3. Compare Data Bundles Feature Banner */}
        <CompareBundlesBanner onOpenCompare={onOpenCompare} />

        {/* 4. Data & Spending Overview */}
        <DataSpendingOverview
          overview={DASHBOARD_OVERVIEW}
          networks={LINKED_NETWORKS}
        />

        {/* 5. Recent Activity */}
        <RecentActivity
          activities={DEMO_ACTIVITIES}
          onViewAll={onViewAllActivity}
          onSelectActivity={onSelectActivity}
        />
      </div>

      <Footer />
    </div>
  );
};
