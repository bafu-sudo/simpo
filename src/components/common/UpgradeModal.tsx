import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SUBSCRIPTION_PLANS } from '../../lib/constants';
import { PlanType } from '../../types';
import { X, Check, Sparkles, CreditCard, Shield, Lock } from 'lucide-react';

export const UpgradeModal: React.FC = () => {
  const { upgradeModalOpen, setUpgradeModalOpen, currentPlan, upgradePlan } = useApp();
  const [selectedPlan, setSelectedPlan] = useState<PlanType>(currentPlan === 'free' ? 'creator' : 'creator_pro');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!upgradeModalOpen) return null;

  const handleSelectAndUpgrade = async (plan: PlanType) => {
    setSelectedPlan(plan);
    if (plan === currentPlan) return;

    setIsProcessing(true);
    await upgradePlan(plan);
    setIsProcessing(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90">
          <div>
            <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">CreatorFlow Subscriptions</span>
            <h3 className="text-lg font-bold text-white mt-0.5">Scale Your Weekly Content Engine</h3>
          </div>
          <button
            onClick={() => setUpgradeModalOpen(false)}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <p className="text-sm text-slate-400 max-w-2xl">
            Choose the plan that fits your growth targets. Upgrade or downgrade at any time with instant credit allocation.
          </p>

          {/* Plan Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {SUBSCRIPTION_PLANS.map((plan) => {
              const isCurrent = currentPlan === plan.id;
              const isSelected = selectedPlan === plan.id;

              return (
                <div
                  key={plan.id}
                  className={`relative flex flex-col p-5 rounded-xl border transition-all ${
                    plan.isPopular
                      ? 'bg-slate-800/60 border-purple-500/50 shadow-lg shadow-purple-500/10'
                      : 'bg-slate-950/40 border-slate-800'
                  } ${isCurrent ? 'ring-2 ring-emerald-500/50' : ''}`}
                >
                  {plan.isPopular && (
                    <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-md">
                      Most Popular
                    </div>
                  )}

                  <div className="mb-4">
                    <h4 className="text-base font-bold text-white">{plan.name}</h4>
                    <p className="text-xs text-slate-400 mt-1 min-h-[32px]">{plan.description}</p>
                    <div className="mt-4 flex items-baseline gap-1">
                      <span className="text-3xl font-extrabold text-white tabular-nums">${plan.priceMonthly}</span>
                      <span className="text-xs text-slate-400">/ month</span>
                    </div>
                  </div>

                  <div className="py-3 border-y border-slate-800/80 mb-4 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">Monthly AI Packs:</span>
                      <span className="font-bold text-white tabular-nums">{plan.creditsPerMonth} packs</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">Brand Profiles:</span>
                      <span className="font-bold text-white tabular-nums">Up to {plan.brandProfilesLimit}</span>
                    </div>
                  </div>

                  <ul className="flex-1 space-y-2.5 text-xs text-slate-300 mb-6">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    disabled={isProcessing || isCurrent}
                    onClick={() => handleSelectAndUpgrade(plan.id)}
                    className={`w-full py-2.5 px-4 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                      isCurrent
                        ? 'bg-slate-800 text-slate-400 cursor-default border border-slate-700'
                        : plan.isPopular
                        ? 'bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white shadow-md'
                        : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                    }`}
                  >
                    {isCurrent ? 'Current Plan' : isProcessing && isSelected ? 'Processing...' : `Switch to ${plan.name}`}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Modular Billing Disclaimer */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/90 text-xs text-slate-400 flex items-start gap-3">
            <Shield className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-semibold text-slate-200">Commercial Readiness & Modular Payment Architecture:</span>
              <p className="leading-relaxed">
                CreatorFlow uses modular server-side payment hooks for Stripe, LemonSqueezy, and Paddle. Credit updates reflect immediately for sandbox and production testing. Live card charges require merchant credentials in <code className="text-cyan-300 font-mono">STRIPE_SECRET_KEY</code>.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-800 bg-slate-900/90 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span>Encrypted 256-bit checkout protocol</span>
          </div>
          <button
            onClick={() => setUpgradeModalOpen(false)}
            className="px-4 py-1.5 text-xs font-medium text-slate-300 hover:text-white"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
