import React, { useState } from 'react';
import { QuickActionType } from '../../types/network';
import { LINKED_NETWORKS } from '../../data/mockData';
import { Button } from '../common/Button';
import { X, ShieldAlert, Check, PhoneCall, Wifi, Send, Smartphone } from 'lucide-react';

interface ActionPlaceholderModalProps {
  actionType: QuickActionType | null;
  onClose: () => void;
}

export const ActionPlaceholderModal: React.FC<ActionPlaceholderModalProps> = ({
  actionType,
  onClose,
}) => {
  const [selectedNetworkId, setSelectedNetworkId] = useState<string>('airtel');
  const [selectedAmount, setSelectedAmount] = useState<number>(20);
  const [simType, setSimType] = useState<'physical' | 'esim'>('physical');
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  if (!actionType) return null;

  const config = {
    airtime: {
      title: 'Buy Airtime (Prototype)',
      icon: PhoneCall,
      description: 'Select an operator and top-up amount to preview the NetLink airtime recharge flow.',
      amounts: [5, 10, 20, 50, 100],
      actionLabel: 'Simulate Airtime Purchase',
    },
    data: {
      title: 'Buy Data Bundle (Prototype)',
      icon: Wifi,
      description: 'Browse available internet bundles across your connected Zambian SIM cards.',
      amounts: [10, 25, 50, 100, 250],
      actionLabel: 'Simulate Data Subscription',
    },
    'send-money': {
      title: 'Send Money (Prototype)',
      icon: Send,
      description: 'Cross-network mobile money simulation between Airtel Money, MTN MoMo, and Zamtel Kwacha.',
      amounts: [50, 100, 200, 500],
      actionLabel: 'Simulate Money Transfer',
    },
    'link-sim': {
      title: 'Link SIM or eSIM (Prototype)',
      icon: Smartphone,
      description: 'Add and monitor a secondary physical SIM or digital eSIM profile within NetLink.',
      amounts: [],
      actionLabel: 'Simulate SIM Link',
    },
  }[actionType];

  const Icon = config.icon;

  const handleSimulateAction = () => {
    const currentNet = LINKED_NETWORKS.find((n) => n.networkId === selectedNetworkId);
    if (actionType === 'link-sim') {
      setFeedbackMessage(
        `[Prototype Simulation] ${currentNet?.name} ${simType === 'esim' ? 'eSIM' : 'Physical SIM'} profile linked successfully to NetLink.`
      );
    } else {
      setFeedbackMessage(
        `[Prototype Simulation] ${config.actionLabel} for ${currentNet?.name} (K ${selectedAmount}) completed successfully in demo mode.`
      );
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-2xl p-5 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-200/60">
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 leading-tight">
                {config.title}
              </h3>
              <p className="text-[11px] text-slate-500">Demo interface preview</p>
            </div>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center cursor-pointer transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Prototype Disclaimer */}
        <div className="p-3 bg-amber-50 border border-amber-200/70 rounded-xl flex items-start gap-2.5 text-amber-900 text-xs leading-relaxed">
          <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <strong>Illustrative Prototype Only:</strong> This feature is a proposed workflow mockup. No bank or operator APIs are triggered, and real monetary payments are not processed.
          </div>
        </div>

        {feedbackMessage ? (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-3 text-center">
            <div className="w-10 h-10 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-5 h-5" />
            </div>
            <p className="text-xs text-emerald-800 font-medium leading-relaxed">
              {feedbackMessage}
            </p>
            <Button
              variant="primary"
              className="w-full text-xs"
              onClick={() => {
                setFeedbackMessage(null);
                onClose();
              }}
            >
              Done
            </Button>
          </div>
        ) : (
          <>
            {/* Operator Selection */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 block">
                Select Target Network:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {LINKED_NETWORKS.map((account) => {
                  const isSelected = selectedNetworkId === account.networkId;
                  return (
                    <button
                      key={account.networkId}
                      type="button"
                      onClick={() => setSelectedNetworkId(account.networkId)}
                      className={`p-2.5 rounded-xl border text-left flex items-center gap-2 cursor-pointer transition-all ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50/40 ring-1 ring-blue-600'
                          : 'border-slate-200 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${account.theme.lightTint} ${account.theme.accentText}`}
                      >
                        {account.monogram}
                      </div>
                      <div className="overflow-hidden">
                        <span className="text-xs font-bold text-slate-900 block truncate">
                          {account.shortName}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono block truncate">
                          {account.maskedPhoneNumber.slice(8)}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* If link-sim, show SIM hardware type selector */}
            {actionType === 'link-sim' && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 block">
                  Line Type:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setSimType('physical')}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold cursor-pointer ${
                      simType === 'physical'
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    Physical SIM Card
                  </button>
                  <button
                    type="button"
                    onClick={() => setSimType('esim')}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold cursor-pointer ${
                      simType === 'esim'
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    Digital eSIM Profile
                  </button>
                </div>
              </div>
            )}

            {/* Amount / Package preset selection */}
            {config.amounts.length > 0 && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 block">
                  Sample Amount (ZMW):
                </label>
                <div className="flex flex-wrap gap-2">
                  {config.amounts.map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setSelectedAmount(amt)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                        selectedAmount === amt
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                      }`}
                    >
                      K {amt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-2 flex gap-2">
              <Button variant="secondary" className="flex-1 text-xs" onClick={onClose}>
                Cancel
              </Button>
              <Button
                variant="primary"
                className="flex-1 text-xs"
                onClick={handleSimulateAction}
              >
                {config.actionLabel}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
