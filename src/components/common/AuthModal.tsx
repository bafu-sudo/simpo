import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { isSupabaseConfigured } from '../../lib/supabase';
import { X, Lock, Mail, User, Sparkles, Key, ArrowRight } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { authModalOpen, setAuthModalOpen, login, signup, resetPassword, loginDemoUser } = useApp();
  const [tab, setTab] = useState<'login' | 'signup' | 'forgot'>('login');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);

  if (!authModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (tab === 'login') {
      const ok = await login(email, password);
      if (ok) setAuthModalOpen(false);
    } else if (tab === 'signup') {
      const ok = await signup(email, password, fullName);
      if (ok) setAuthModalOpen(false);
    } else if (tab === 'forgot') {
      const ok = await resetPassword(email);
      if (ok) setTab('login');
    }
    setLoading(false);
  };

  const handleQuickDemo = (plan: 'free' | 'creator' | 'creator_pro') => {
    loginDemoUser(plan);
    setAuthModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-md flex flex-col bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90">
          <div>
            <span className="text-[11px] font-semibold text-purple-400 uppercase tracking-wider">
              {isSupabaseConfigured ? 'Supabase Authentication' : 'Account Access'}
            </span>
            <h3 className="text-base font-bold text-white">
              {tab === 'login' && 'Sign in to CreatorFlow'}
              {tab === 'signup' && 'Create your CreatorFlow account'}
              {tab === 'forgot' && 'Reset your password'}
            </h3>
          </div>
          <button
            onClick={() => setAuthModalOpen(false)}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        {tab !== 'forgot' && (
          <div className="flex border-b border-slate-800 bg-slate-950/40 text-xs font-semibold">
            <button
              onClick={() => setTab('login')}
              className={`flex-1 py-3 text-center transition-colors border-b-2 ${
                tab === 'login'
                  ? 'border-purple-500 text-white bg-slate-900/50'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setTab('signup')}
              className={`flex-1 py-3 text-center transition-colors border-b-2 ${
                tab === 'signup'
                  ? 'border-purple-500 text-white bg-slate-900/50'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              Register
            </button>
          </div>
        )}

        {/* Body Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {tab === 'signup' && (
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">Full Name / Brand Name</label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Alex Vance"
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="creator@example.com"
                className="w-full pl-9 pr-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>
          </div>

          {tab !== 'forgot' && (
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-medium text-slate-300">Password</label>
                {tab === 'login' && (
                  <button
                    type="button"
                    onClick={() => setTab('forgot')}
                    className="text-[11px] text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 mt-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-lg text-xs font-semibold tracking-wide transition-all shadow-md disabled:opacity-50"
          >
            {loading
              ? 'Authenticating...'
              : tab === 'login'
              ? 'Sign In to Workspace'
              : tab === 'signup'
              ? 'Create Free Account'
              : 'Send Recovery Link'}
          </button>

          {tab === 'forgot' && (
            <button
              type="button"
              onClick={() => setTab('login')}
              className="w-full text-center text-xs text-slate-400 hover:text-white pt-1"
            >
              Back to Sign In
            </button>
          )}
        </form>

        {/* Quick 1-Click Demo Accounts */}
        <div className="p-4 bg-slate-950/80 border-t border-slate-800">
          <div className="flex items-center gap-1.5 mb-2.5">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider">
              Instant 1-Click Demo Switcher
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => handleQuickDemo('free')}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-left transition-colors"
            >
              <div className="text-[11px] font-bold text-white">Free Plan</div>
              <div className="text-[10px] text-slate-400">3 AI packs/mo</div>
            </button>
            <button
              onClick={() => handleQuickDemo('creator')}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-purple-500/30 text-left transition-colors"
            >
              <div className="text-[11px] font-bold text-purple-300">Creator ($5)</div>
              <div className="text-[10px] text-slate-400">30 AI packs/mo</div>
            </button>
            <button
              onClick={() => handleQuickDemo('creator_pro')}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-cyan-500/30 text-left transition-colors"
            >
              <div className="text-[11px] font-bold text-cyan-300">Pro ($9)</div>
              <div className="text-[10px] text-slate-400">100 AI packs/mo</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
