import { NetworkIdentity } from '../types/network';

export const ZAMBIAN_NETWORKS: NetworkIdentity[] = [
  {
    id: 'airtel',
    name: 'Airtel Zambia',
    shortName: 'Airtel',
    monogram: 'AR',
    country: 'Zambia',
    operatorType: 'Mobile Network Operator',
    standardPrefixes: ['+260 97', '+260 77'],
    supportedServices: ['Voice & SMS', 'Data Bundles', 'Airtel Money (Simulation)', 'USSD Management'],
    theme: {
      accentBg: 'bg-rose-600',
      accentText: 'text-rose-600',
      borderTone: 'border-rose-100',
      lightTint: 'bg-rose-50/70',
    },
    placeholderDisclaimer:
      'Independent prototype placeholder. Not affiliated with, endorsed by, or integrated with Airtel Networks Zambia Plc.',
  },
  {
    id: 'mtn',
    name: 'MTN Zambia',
    shortName: 'MTN',
    monogram: 'MT',
    country: 'Zambia',
    operatorType: 'Mobile Network Operator',
    standardPrefixes: ['+260 96', '+260 76'],
    supportedServices: ['Voice & SMS', 'Data Bundles', 'MoMo (Simulation)', 'USSD Management'],
    theme: {
      accentBg: 'bg-amber-500',
      accentText: 'text-amber-700',
      borderTone: 'border-amber-100',
      lightTint: 'bg-amber-50/70',
    },
    placeholderDisclaimer:
      'Independent prototype placeholder. Not affiliated with, endorsed by, or integrated with MTN Zambia Limited.',
  },
  {
    id: 'zamtel',
    name: 'Zamtel',
    shortName: 'Zamtel',
    monogram: 'ZT',
    country: 'Zambia',
    operatorType: 'National Telecom Provider',
    standardPrefixes: ['+260 95', '+260 75'],
    supportedServices: ['Voice & SMS', 'Data Bundles', 'Zamtel Kwacha (Simulation)', 'Fixed & Mobile Broadband'],
    theme: {
      accentBg: 'bg-emerald-600',
      accentText: 'text-emerald-700',
      borderTone: 'border-emerald-100',
      lightTint: 'bg-emerald-50/70',
    },
    placeholderDisclaimer:
      'Independent prototype placeholder. Not affiliated with, endorsed by, or integrated with Zambia Telecommunications Company Ltd.',
  },
  {
    id: 'zedmobile',
    name: 'ZedMobile',
    shortName: 'ZedMobile',
    monogram: 'ZM',
    country: 'Zambia',
    operatorType: 'Mobile Network Operator (Beeline)',
    standardPrefixes: ['+260 79', '+260 99'],
    supportedServices: ['Voice & SMS', '4G/5G Data Bundles', 'Digital Wallet (Simulation)', 'Self-Care Services'],
    theme: {
      accentBg: 'bg-indigo-600',
      accentText: 'text-indigo-600',
      borderTone: 'border-indigo-100',
      lightTint: 'bg-indigo-50/70',
    },
    placeholderDisclaimer:
      'Independent prototype placeholder. Not affiliated with, endorsed by, or integrated with Beeline Telecoms Limited (ZedMobile).',
  },
];

export const APP_PROTOTYPE_NOTICE = {
  tagline: 'One app. All your networks.',
  disclaimer:
    'NetLink is an independent architectural prototype designed for mobile network organization in Zambia. No live operator systems, telecommunications APIs, or real payment gateways are connected.',
  version: 'v0.1.0-alpha',
  targetCountry: 'Zambia (ZM)',
};
