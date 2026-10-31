import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SUPABASE_SQL_SCHEMA } from '../../lib/constants';
import { getSupabaseConfig } from '../../lib/supabase';
import { X, Copy, Check, Database, ShieldCheck, Server, Key, ExternalLink } from 'lucide-react';

export const DatabaseSetupModal: React.FC = () => {
  const { dbSetupModalOpen, setDbSetupModalOpen, addToast } = useApp();
  const [copied, setCopied] = useState(false);
  const config = getSupabaseConfig();

  if (!dbSetupModalOpen) return null;

  const handleCopySchema = () => {
    navigator.clipboard.writeText(SUPABASE_SQL_SCHEMA);
    setCopied(true);
    addToast('success', 'SQL Schema Copied', 'Paste this into the Supabase SQL Editor.');
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-3xl max-h-[90vh] flex flex-col bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">Database & Supabase Integration</h3>
              <p className="text-xs text-slate-400">PostgreSQL schema, Row Level Security & connection details</p>
            </div>
          </div>
          <button
            onClick={() => setDbSetupModalOpen(false)}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Status Banner */}
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className={`inline-block w-2.5 h-2.5 rounded-full ${config.isConfigured ? 'bg-emerald-400 shadow-emerald-400/50 shadow-sm' : 'bg-cyan-400'}`}></span>
                <span className="text-sm font-semibold text-white">
                  {config.isConfigured ? 'Connected to Remote Supabase' : 'Running in Resilient Local Storage Mode'}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                {config.isConfigured
                  ? `Authenticated and synced with Supabase project endpoint (${config.url}).`
                  : 'CreatorFlow is completely operational! All changes persist locally. To sync across multiple devices, connect your Supabase project below.'}
              </p>
            </div>
            <a
              href="https://supabase.com/dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 rounded-lg border border-emerald-500/20 transition-colors shrink-0"
            >
              Supabase Dashboard
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Database Tables Checklist */}
          <div>
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2.5">
              Production PostgreSQL Tables & Schemas
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
              <div className="p-3 rounded-lg bg-slate-950/40 border border-slate-800 flex items-center justify-between">
                <span className="font-mono text-purple-300">public.profiles</span>
                <span className="text-slate-400">User records, credits & plans</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-950/40 border border-slate-800 flex items-center justify-between">
                <span className="font-mono text-purple-300">public.brand_profiles</span>
                <span className="text-slate-400">Tone, handles & platforms</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-950/40 border border-slate-800 flex items-center justify-between">
                <span className="font-mono text-purple-300">public.content_packs</span>
                <span className="text-slate-400">Hooks, scripts, captions, schedules</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-950/40 border border-slate-800 flex items-center justify-between">
                <span className="font-mono text-purple-300">public.calendar_entries</span>
                <span className="text-slate-400">Dates, platforms & publish status</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-950/40 border border-slate-800 flex items-center justify-between">
                <span className="font-mono text-purple-300">public.ai_usage</span>
                <span className="text-slate-400">Audit logs & token consumption</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-950/40 border border-slate-800 flex items-center justify-between">
                <span className="font-mono text-purple-300">public.subscriptions</span>
                <span className="text-slate-400">Tiers, renewals & limits</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-950/40 border border-slate-800 flex items-center justify-between md:col-span-2">
                <span className="font-mono text-purple-300">public.payment_records</span>
                <span className="text-slate-400">Transactional receipts, currencies & providers</span>
              </div>
            </div>
          </div>

          {/* Security & RLS notice */}
          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-purple-950/20 border border-purple-800/30 text-purple-200 text-xs leading-relaxed">
            <ShieldCheck className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-white">Row Level Security (RLS) Enforced:</span> Every table includes strict RLS policies verifying <code className="font-mono text-purple-300 bg-purple-900/40 px-1 py-0.5 rounded">auth.uid() = user_id</code> so users can only ever access and modify their own records.
            </div>
          </div>

          {/* SQL Migration Script Box */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Full PostgreSQL Migration Script
              </span>
              <button
                onClick={handleCopySchema}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-purple-600 hover:bg-purple-500 rounded-lg transition-colors shadow-sm"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied to Clipboard' : 'Copy SQL Schema'}
              </button>
            </div>
            <pre className="p-4 rounded-xl bg-[#070b14] border border-slate-800 text-[11px] font-mono text-slate-300 max-h-56 overflow-y-auto leading-relaxed">
              {SUPABASE_SQL_SCHEMA}
            </pre>
          </div>

          {/* Environment Variables Guide */}
          <div>
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Environment Variables (.env)
            </h4>
            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs font-mono text-slate-300 space-y-1">
              <div><span className="text-purple-400">VITE_SUPABASE_URL</span>="https://your-project.supabase.co"</div>
              <div><span className="text-purple-400">VITE_SUPABASE_ANON_KEY</span>="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."</div>
              <div><span className="text-purple-400">GEMINI_API_KEY</span>="AIzaSy..."</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-800 bg-slate-900/90 flex justify-end">
          <button
            onClick={() => setDbSetupModalOpen(false)}
            className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
