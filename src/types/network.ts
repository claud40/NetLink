/**
 * Types for NetLink Network Management Prototype
 */

export type NetworkId = 'airtel' | 'mtn' | 'zamtel' | 'zedmobile';

export type NavTabId = 'home' | 'networks' | 'activity' | 'profile';

export type QuickActionType = 'airtime' | 'data' | 'send-money' | 'link-sim';

export interface NetworkIdentity {
  id: NetworkId;
  name: string;
  shortName: string;
  monogram: string;
  country: string;
  operatorType: string;
  standardPrefixes: string[];
  supportedServices: string[];
  theme: {
    accentBg: string;
    accentText: string;
    borderTone: string;
    lightTint: string;
    ringColor?: string;
    badgeBg?: string;
  };
  placeholderDisclaimer: string;
}

export interface LinkedNetworkAccount {
  networkId: NetworkId;
  name: string;
  shortName: string;
  monogram: string;
  simSlot: string;
  maskedPhoneNumber: string;
  sampleBalanceKwacha: number;
  sampleBalanceFormatted: string;
  sampleAirtimeFormatted?: string;
  dataUsagePercentage?: number;
  sampleDataRemainingGB: number;
  sampleDataFormatted: string;
  sampleDataTotalGB: number;
  sampleVoiceMinutes: number;
  sampleSmsCount: number;
  sampleExpiryNotice: string;
  theme: {
    accentBg: string;
    accentText: string;
    borderTone: string;
    lightTint: string;
    ringColor: string;
    badgeBg: string;
    barColor: string;
    solidBadge?: string;
    cardTopAccent?: string;
    cardBg?: string;
    textColor?: string;
    subtextColor?: string;
    overlayBg?: string;
    dividerColor?: string;
    chevronBg?: string;
    barTrack?: string;
    barFill?: string;
    monogramStyle?: string;
  };
}

export interface DemoActivityRecord {
  id: string;
  networkId: NetworkId;
  networkName: string;
  title: string;
  category: 'airtime' | 'data' | 'transfer' | 'utility';
  amountFormatted: string;
  isDebit: boolean;
  timestamp: string;
  referenceNumber: string;
  note: string;
}

export interface DashboardOverview {
  totalDataRemainingGB: number;
  totalDataRemainingFormatted: string;
  totalDataQuotaGB: number;
  sampleMonthlySpendingKwacha: number;
  sampleMonthlySpendingFormatted: string;
  dataUsagePercentage: number;
  activeLinesCount: number;
}

export interface DemoNotification {
  id: string;
  title: string;
  message: string;
  networkId?: NetworkId;
  timestamp: string;
  unread: boolean;
  type: 'info' | 'warning' | 'alert';
}
