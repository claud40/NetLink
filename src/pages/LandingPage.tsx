import React, { useState } from 'react';
import { ZAMBIAN_NETWORKS, APP_PROTOTYPE_NOTICE } from '../data/networks';
import { NetworkIdentity } from '../types/network';
import { NetworkCard } from '../components/networks/NetworkCard';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Footer } from '../components/layout/Footer';
import {
  Layers,
  Sparkles,
  Smartphone,
  WifiOff,
  Shield,
  Info,
  X,
  CheckCircle2,
} from 'lucide-react';

interface LandingPageProps {
  showInfoModal: boolean;
  onCloseInfoModal: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  showInfoModal,
  onCloseInfoModal,
}) => {
  const [selectedNetwork, setSelectedNetwork] = useState<NetworkIdentity | null>(null);

  return (
    <div className="flex-1 flex flex-col justify-between">
      <main className="px-4 py-6 sm:py-8 space-y-6">
        {/* Hero Section */}
        <section className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 border border-blue-200/60 rounded-full text-xs font-semibold text-blue-700">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Prototype Foundation v0.1</span>
          </div>

          <div className="space-y-1">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              NetLink
            </h1>
            <p className="text-base sm:text-lg font-semibold text-blue-600">
              {APP_PROTOTYPE_NOTICE.tagline}
            </p>
          </div>

          <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
            A unified mobile network management concept for Zambia. Designed to bring multi-SIM lines, airtime top-ups, and bundle subscriptions into one streamlined mobile experience.
          </p>
        </section>

        {/* Network Placeholders Section */}
        <section className="space-y-3 pt-2">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Supported Network Placeholders (4)
            </h2>
            <span className="text-xs text-slate-500">Zambia Mobile Ecosystem</span>
          </div>

          <div className="space-y-2.5">
            {ZAMBIAN_NETWORKS.map((network) => (
              <NetworkCard
                key={network.id}
                network={network}
                isSelected={selectedNetwork?.id === network.id}
                onSelect={(net) => setSelectedNetwork(net)}
              />
            ))}
          </div>

          <p className="text-[11px] text-slate-500 text-center italic pt-1">
            Tap any operator card above to inspect the architectural placeholder profile.
          </p>
        </section>

        {/* Project Foundation Pillars */}
        <section className="space-y-3 pt-4 border-t border-slate-100">
          <div className="px-1">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Architecture & Vision Highlights
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <Card variant="subtle" className="p-3.5 space-y-1.5">
              <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                <Smartphone className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-bold text-slate-900">Android-First Ergonomics</h3>
              <p className="text-[11px] text-slate-600 leading-snug">
                Engineered for one-handed thumb navigation, rapid balance checks, and daylight readability on Android devices.
              </p>
            </Card>

            <Card variant="subtle" className="p-3.5 space-y-1.5">
              <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Layers className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-bold text-slate-900">Unified Multi-SIM</h3>
              <p className="text-[11px] text-slate-600 leading-snug">
                Framework for managing dual-SIM and multi-line balances across Airtel, MTN, Zamtel, and ZedMobile.
              </p>
            </Card>

            <Card variant="subtle" className="p-3.5 space-y-1.5">
              <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
                <WifiOff className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-bold text-slate-900">USSD & Offline Ready</h3>
              <p className="text-[11px] text-slate-600 leading-snug">
                Designed to bridge automated USSD shortcuts (*115#, *117#, etc.) when mobile data is inactive or depleted.
              </p>
            </Card>

            <Card variant="subtle" className="p-3.5 space-y-1.5">
              <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center">
                <Shield className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-bold text-slate-900">Strict Independent Design</h3>
              <p className="text-[11px] text-slate-600 leading-snug">
                Neutral, non-proprietary placeholders avoiding trademark infringement or false claims of commercial integration.
              </p>
            </Card>
          </div>
        </section>
      </main>

      <Footer />

      {/* Network Details Modal / Drawer */}
      {selectedNetwork && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-network-title"
        >
          <div className="bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-2xl p-5 shadow-xl border border-slate-200 space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-base border border-slate-200 ${selectedNetwork.theme.lightTint} ${selectedNetwork.theme.accentText}`}
                >
                  {selectedNetwork.monogram}
                </div>
                <div>
                  <h3 id="modal-network-title" className="text-lg font-bold text-slate-900">
                    {selectedNetwork.name}
                  </h3>
                  <p className="text-xs text-slate-500">{selectedNetwork.operatorType}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedNetwork(null)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 flex items-center justify-center cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 space-y-1 text-xs">
              <div className="font-semibold text-slate-800">Phone Number Prefixes:</div>
              <div className="font-mono text-slate-600">
                {selectedNetwork.standardPrefixes.join('  ·  ')}
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <span className="font-semibold text-slate-800 block">
                Target Management Modules (Planned):
              </span>
              <ul className="space-y-1.5 text-slate-600">
                {selectedNetwork.supportedServices.map((service, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>{service}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-3 bg-amber-50/80 border border-amber-200/70 rounded-xl text-[11px] text-amber-900 leading-relaxed">
              <strong>Notice:</strong> {selectedNetwork.placeholderDisclaimer}
            </div>

            <Button
              variant="secondary"
              className="w-full"
              onClick={() => setSelectedNetwork(null)}
            >
              Close Details
            </Button>
          </div>
        </div>
      )}

      {/* Global Prototype Notice Modal */}
      {showInfoModal && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white w-full max-w-sm rounded-2xl p-5 shadow-xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-blue-600">
                <Info className="w-5 h-5" />
                <h3 className="text-base font-bold text-slate-900">Prototype Information</h3>
              </div>
              <button
                onClick={onCloseInfoModal}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 flex items-center justify-center cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 text-xs text-slate-600 leading-relaxed">
              <p>
                <strong className="text-slate-800">NetLink Foundation Stage:</strong> This prototype establishes the user interface styling system, mobile layout architecture, and operator identity placeholders for Zambia.
              </p>
              <p>
                As required by development safeguards, no active network connections, live USSD gateways, or real monetary transactions are included in this prototype.
              </p>
            </div>

            <div className="pt-2">
              <Button
                variant="primary"
                className="w-full"
                onClick={onCloseInfoModal}
              >
                Understood
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
