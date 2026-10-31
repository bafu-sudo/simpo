import React from 'react';
import { AppProvider, useApp, AppView } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { NotificationToast } from './components/common/NotificationToast';
import { AuthModal } from './components/common/AuthModal';
import { UpgradeModal } from './components/common/UpgradeModal';
import { DatabaseSetupModal } from './components/common/DatabaseSetupModal';
import { LandingPage } from './components/landing/LandingPage';
import { DashboardHome } from './components/dashboard/DashboardHome';
import { GeneratorView } from './components/dashboard/GeneratorView';
import { BrandProfilesView } from './components/dashboard/BrandProfilesView';
import { CalendarView } from './components/dashboard/CalendarView';
import { LibraryView } from './components/dashboard/LibraryView';
import { AnalyticsView } from './components/dashboard/AnalyticsView';
import { BillingView } from './components/dashboard/BillingView';
import {
  LayoutDashboard,
  Sparkles,
  Layers,
  Calendar,
  Bookmark,
  TrendingUp,
  CreditCard,
  Database,
  ChevronDown,
  LogOut,
  User,
  Plus,
} from 'lucide-react';

const AppContent: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    user,
    isAuthenticated,
    activeBrandProfile,
    brandProfiles,
    setActiveBrandProfile,
    creditsRemaining,
    creditsTotal,
    currentPlan,
    setUpgradeModalOpen,
    setDbSetupModalOpen,
    logout,
  } = useApp();

  const isLanding = currentView === 'landing';

  const navItems = [
    { id: 'dashboard' as AppView, label: 'Overview', icon: LayoutDashboard },
    { id: 'generator' as AppView, label: 'AI Generator', icon: Sparkles },
    { id: 'brand_profiles' as AppView, label: 'Brand Profiles', icon: Layers },
    { id: 'calendar' as AppView, label: 'Calendar', icon: Calendar },
    { id: 'library' as AppView, label: 'Content Library', icon: Bookmark },
    { id: 'analytics' as AppView, label: 'Analytics', icon: TrendingUp },
    { id: 'billing' as AppView, label: 'Billing & Plans', icon: CreditCard },
  ];

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col font-sans">
      <Navbar />

      {isLanding ? (
        <main className="flex-1">
          <LandingPage />
        </main>
      ) : (
        <div className="flex-1 flex max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 gap-8">
          {/* Desktop Left Sidebar (240px) */}
          <aside className="hidden lg:flex flex-col w-60 shrink-0 space-y-6">
            {/* Active Brand Selector Card */}
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                <span>Active Brand</span>
                <button
                  onClick={() => setCurrentView('brand_profiles')}
                  className="text-purple-400 hover:text-purple-300"
                >
                  Manage
                </button>
              </div>

              <div className="flex items-center gap-2.5">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center font-bold text-white text-xs shrink-0"
                  style={{ backgroundColor: activeBrandProfile?.colorAccent || '#8b5cf6' }}
                >
                  {activeBrandProfile?.name.charAt(0) || 'C'}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-bold text-white truncate">
                    {activeBrandProfile?.name || 'Default Brand'}
                  </div>
                  <div className="text-[10px] text-purple-400 truncate font-mono">
                    {activeBrandProfile?.handle || '@brand'}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Navigation */}
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentView(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-purple-600/20 text-purple-200 border border-purple-500/30 shadow-sm'
                        : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-purple-400' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* AI Credits Widget */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-2.5 mt-auto">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">AI Credits:</span>
                <span className="font-mono font-bold text-purple-300 tabular-nums">
                  {creditsRemaining} / {creditsTotal}
                </span>
              </div>
              <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden border border-slate-800">
                <div
                  className="bg-gradient-to-r from-purple-500 to-cyan-400 h-full rounded-full transition-all"
                  style={{
                    width: `${Math.min(100, (creditsRemaining / Math.max(1, creditsTotal)) * 100)}%`,
                  }}
                />
              </div>
              <button
                onClick={() => setUpgradeModalOpen(true)}
                className="w-full py-1.5 text-[11px] font-semibold text-purple-300 hover:text-white bg-purple-500/10 hover:bg-purple-500/20 rounded-lg border border-purple-500/20 transition-colors"
              >
                Top Up / Upgrade
              </button>
            </div>

            {/* Supabase Integration Button */}
            <button
              onClick={() => setDbSetupModalOpen(true)}
              className="p-3 rounded-xl bg-slate-900/40 hover:bg-slate-900/80 border border-slate-800 text-left transition-colors flex items-center gap-2.5 group"
            >
              <Database className="w-4 h-4 text-emerald-400 shrink-0" />
              <div className="min-w-0">
                <div className="text-[11px] font-bold text-white group-hover:text-emerald-300 transition-colors">
                  Supabase & RLS Guide
                </div>
                <div className="text-[10px] text-slate-400 truncate">PostgreSQL schema & keys</div>
              </div>
            </button>
          </aside>

          {/* Main Content Viewport */}
          <main className="flex-1 min-w-0 pb-16">
            {currentView === 'dashboard' && <DashboardHome />}
            {currentView === 'generator' && <GeneratorView />}
            {currentView === 'brand_profiles' && <BrandProfilesView />}
            {currentView === 'calendar' && <CalendarView />}
            {currentView === 'library' && <LibraryView />}
            {currentView === 'analytics' && <AnalyticsView />}
            {currentView === 'billing' && <BillingView />}
          </main>
        </div>
      )}

      {/* Global Modals & Toasts */}
      <AuthModal />
      <UpgradeModal />
      <DatabaseSetupModal />
      <NotificationToast />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
