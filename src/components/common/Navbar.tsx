import React, { useState } from 'react';
import { useApp, AppView } from '../../context/AppContext';
import { Sparkles, Database, User, LogOut, ChevronDown, Layers } from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    user,
    isAuthenticated,
    logout,
    setAuthModalOpen,
    setUpgradeModalOpen,
    setDbSetupModalOpen,
    activeBrandProfile,
  } = useApp();

  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const isDashboardArea = currentView !== 'landing';

  return (
    <header className="sticky top-0 z-40 w-full bg-[#070b14]/90 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single element) */}
        <button
          onClick={() => setCurrentView(isAuthenticated ? 'dashboard' : 'landing')}
          className="flex items-center gap-2.5 text-left whitespace-nowrap shrink-0 group focus:outline-none"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center shadow-md shadow-purple-500/20 group-hover:scale-105 transition-transform">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight text-white font-sans">
            Creator<span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Flow</span>
          </span>
        </button>

        {/* Zone 2: 4-5 single-line navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-300">
          {!isDashboardArea ? (
            <>
              <a href="#features" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
                Features
              </a>
              <a href="#how-it-works" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
                How It Works
              </a>
              <a href="#sample-pack" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
                Live Sample
              </a>
              <a href="#pricing" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
                Pricing
              </a>
              <a href="#faq" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
                FAQ
              </a>
            </>
          ) : (
            <>
              <button
                onClick={() => setCurrentView('dashboard')}
                className={`transition-colors whitespace-nowrap shrink-0 ${
                  currentView === 'dashboard' ? 'text-purple-400 font-semibold' : 'hover:text-white'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setCurrentView('generator')}
                className={`transition-colors whitespace-nowrap shrink-0 ${
                  currentView === 'generator' ? 'text-purple-400 font-semibold' : 'hover:text-white'
                }`}
              >
                AI Generator
              </button>
              <button
                onClick={() => setCurrentView('calendar')}
                className={`transition-colors whitespace-nowrap shrink-0 ${
                  currentView === 'calendar' ? 'text-purple-400 font-semibold' : 'hover:text-white'
                }`}
              >
                Content Calendar
              </button>
              <button
                onClick={() => setCurrentView('library')}
                className={`transition-colors whitespace-nowrap shrink-0 ${
                  currentView === 'library' ? 'text-purple-400 font-semibold' : 'hover:text-white'
                }`}
              >
                Content Library
              </button>
              <button
                onClick={() => setCurrentView('analytics')}
                className={`transition-colors whitespace-nowrap shrink-0 ${
                  currentView === 'analytics' ? 'text-purple-400 font-semibold' : 'hover:text-white'
                }`}
              >
                Analytics
              </button>
            </>
          )}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          {!isDashboardArea ? (
            isAuthenticated ? (
              <button
                onClick={() => setCurrentView('dashboard')}
                className="px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-lg shadow-md shadow-purple-600/20 transition-all whitespace-nowrap shrink-0"
              >
                Open Dashboard
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setAuthModalOpen(true)}
                  className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white transition-colors whitespace-nowrap shrink-0"
                >
                  Sign In
                </button>
                <button
                  onClick={() => setAuthModalOpen(true)}
                  className="px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 rounded-lg shadow-md shadow-purple-600/20 transition-all whitespace-nowrap shrink-0"
                >
                  Start Free
                </button>
              </div>
            )
          ) : (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-800/80 border border-slate-800 text-xs text-slate-200 transition-colors whitespace-nowrap shrink-0"
              >
                <div className="w-6 h-6 rounded-md bg-purple-600/30 border border-purple-500/30 flex items-center justify-center text-purple-300 font-bold text-[10px]">
                  {user?.fullName?.charAt(0) || 'C'}
                </div>
                <span className="hidden sm:inline font-medium text-slate-200 max-w-[100px] truncate">
                  {user?.fullName || 'Creator'}
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-purple-500/10 text-purple-300 border border-purple-500/20">
                  {user?.plan || 'free'}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl py-2 z-50 text-xs">
                  <div className="px-3.5 py-2 border-b border-slate-800">
                    <p className="font-semibold text-white truncate">{user?.fullName}</p>
                    <p className="text-[11px] text-slate-400 truncate">{user?.email}</p>
                    <div className="mt-2 flex items-center justify-between text-[11px] text-slate-300">
                      <span>AI Credits:</span>
                      <span className="font-mono text-purple-300 font-bold tabular-nums">
                        {user?.creditsRemaining} / {user?.creditsTotal}
                      </span>
                    </div>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        setCurrentView('brand_profiles');
                      }}
                      className="w-full px-3.5 py-1.5 text-left text-slate-300 hover:text-white hover:bg-slate-800/60 flex items-center gap-2"
                    >
                      <Layers className="w-3.5 h-3.5 text-slate-400" />
                      Brand Profiles
                    </button>
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        setDbSetupModalOpen(true);
                      }}
                      className="w-full px-3.5 py-1.5 text-left text-slate-300 hover:text-white hover:bg-slate-800/60 flex items-center gap-2"
                    >
                      <Database className="w-3.5 h-3.5 text-emerald-400" />
                      Supabase Database
                    </button>
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        setUpgradeModalOpen(true);
                      }}
                      className="w-full px-3.5 py-1.5 text-left text-purple-300 hover:text-purple-200 hover:bg-purple-900/20 flex items-center gap-2 font-medium"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                      Manage Plan & Credits
                    </button>
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        setCurrentView('landing');
                      }}
                      className="w-full px-3.5 py-1.5 text-left text-slate-300 hover:text-white hover:bg-slate-800/60 flex items-center gap-2"
                    >
                      View Landing Page
                    </button>
                  </div>

                  <div className="border-t border-slate-800 pt-1 mt-1">
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        logout();
                      }}
                      className="w-full px-3.5 py-1.5 text-left text-rose-400 hover:bg-rose-500/10 flex items-center gap-2"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
