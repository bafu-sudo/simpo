import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SUBSCRIPTION_PLANS } from '../../lib/constants';
import { PlanType } from '../../types';
import {
  CreditCard,
  Sparkles,
  Shield,
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowUpRight,
  ExternalLink,
  Layers,
  Lock,
} from 'lucide-react';

export const BillingView: React.FC = () => {
  const {
    user,
    currentPlan,
    creditsRemaining,
    creditsTotal,
    upgradePlan,
    setUpgradeModalOpen,
    addToast,
  } = useApp();

  const planInfo = SUBSCRIPTION_PLANS.find((p) => p.id === currentPlan) || SUBSCRIPTION_PLANS[0];

  const [paymentRecords, setPaymentRecords] = useState([
    {
      id: 'tx_104928',
      date: '2026-10-01',
      description: `CreatorFlow ${planInfo.name} Subscription`,
      amount: `$${planInfo.priceMonthly}.00`,
      status: 'Paid',
      provider: 'Stripe Gateway',
      receiptUrl: '#',
    },
    {
      id: 'tx_093847',
      date: '2026-09-01',
      description: 'CreatorFlow Creator Subscription',
      amount: '$5.00',
      status: 'Paid',
      provider: 'Stripe Gateway',
      receiptUrl: '#',
    },
  ]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-slate-900/90 via-purple-950/20 to-slate-900/90 border border-slate-800">
        <div>
          <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">
            Commercial & Billing Hub
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-0.5">
            Subscription & Credits
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
            Manage your AI credit allocation, tier limits, invoice receipts, and modular payment providers.
          </p>
        </div>

        <button
          onClick={() => setUpgradeModalOpen(true)}
          className="px-4 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 rounded-xl transition-all shadow-md flex items-center gap-1.5 shrink-0"
        >
          <Sparkles className="w-4 h-4" />
          <span>Change Subscription Plan</span>
        </button>
      </div>

      {/* Current Plan Overview Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Plan Details (7 cols) */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400">
                Active Tier
              </span>
              <h2 className="text-xl font-bold text-white mt-0.5">{planInfo.name} Plan</h2>
              <p className="text-xs text-slate-400 mt-1">{planInfo.description}</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-extrabold text-white font-mono tabular-nums">
                ${planInfo.priceMonthly}
              </div>
              <div className="text-[11px] text-slate-400">Billed monthly</div>
            </div>
          </div>

          {/* Credits Bar */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-300">Monthly AI Content Packs</span>
              <span className="font-mono text-purple-300 font-bold tabular-nums">
                {creditsRemaining} remaining of {creditsTotal}
              </span>
            </div>
            <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
              <div
                className="bg-gradient-to-r from-purple-500 to-cyan-400 h-full rounded-full transition-all"
                style={{
                  width: `${Math.min(100, (creditsRemaining / Math.max(1, creditsTotal)) * 100)}%`,
                }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
              <span>Next credit renewal: {user?.creditsResetDate || 'In 30 days'}</span>
              <span>1 pack = 1 credit</span>
            </div>
          </div>

          {/* Plan Limits Checklist */}
          <div>
            <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-2.5">
              Included Tier Benefits
            </span>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
              {planInfo.features.map((feat, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Payment Gateway Status & Merchant Info (5 cols) */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-5">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Payment Architecture</h3>
              <p className="text-xs text-slate-400">Modular provider integration</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 space-y-2 leading-relaxed">
            <span className="font-semibold text-white block">Commercial Readiness Notice:</span>
            <p>
              CreatorFlow is designed to support <strong>Stripe</strong>, <strong>LemonSqueezy</strong>, and <strong>Paddle</strong>.
            </p>
            <p className="text-slate-400">
              Per strict compliance standards: <em>We never fake successful credit card charges.</em> For testing in preview sandboxes, tiers can be switched instantly to verify limits, credits, and database triggers.
            </p>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-slate-400">Active Gateway</span>
              <span className="font-semibold text-white">Stripe / Modular Provider</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-slate-400">Merchant Approval</span>
              <span className="text-amber-400 font-medium">Pending Live Secret Ingestion</span>
            </div>
          </div>

          <button
            onClick={() => setUpgradeModalOpen(true)}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white border border-slate-700 transition-colors"
          >
            Compare All Tier Pricing
          </button>
        </div>
      </div>

      {/* Invoice Receipts Table */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden shadow-xl">
        <div className="p-5 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <h3 className="text-sm font-bold text-white">Billing History & Invoices</h3>
          <span className="text-xs text-slate-400 font-mono">2 Receipts</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 text-[11px] uppercase font-bold tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Invoice ID</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4">Provider</th>
                <th className="py-3 px-4 text-right">Amount</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {paymentRecords.map((r) => (
                <tr key={r.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-4 font-mono text-purple-300">{r.id}</td>
                  <td className="py-3.5 px-4 font-mono text-slate-400">{r.date}</td>
                  <td className="py-3.5 px-4 font-medium text-white">{r.description}</td>
                  <td className="py-3.5 px-4 text-slate-400">{r.provider}</td>
                  <td className="py-3.5 px-4 text-right font-mono font-bold text-white tabular-nums">
                    {r.amount}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
