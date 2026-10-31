import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  Bookmark,
  Calendar,
  Zap,
  ArrowUpRight,
  Plus,
  Play,
  TrendingUp,
  Clock,
  Layers,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react';

export const DashboardHome: React.FC = () => {
  const {
    user,
    setCurrentView,
    contentPacks,
    calendarEntries,
    creditsRemaining,
    creditsTotal,
    currentPlan,
    activeBrandProfile,
    setActivePack,
    setUpgradeModalOpen,
  } = useApp();

  const totalGenerated = contentPacks.length;
  const totalSaved = contentPacks.filter((p) => p.isFavorite).length;
  const upcomingScheduled = calendarEntries.filter((c) => c.status === 'scheduled').length;
  const publishedPosts = calendarEntries.filter((c) => c.status === 'published').length;

  const recentPacks = contentPacks.slice(0, 3);
  const nextScheduledPosts = calendarEntries
    .filter((c) => c.status === 'scheduled')
    .sort((a, b) => a.scheduledDate.localeCompare(b.scheduledDate))
    .slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Welcome & Overview Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-slate-900/90 via-purple-950/20 to-slate-900/90 border border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-400">
            <span>Welcome back, {user?.fullName || 'Creator'}</span>
            <span aria-hidden="true">·</span>
            <span className="text-slate-400">Brand: {activeBrandProfile?.name || 'Default Lab'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Creator Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
            Turn your ideas into a week of high-converting social media content with 1 click.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setCurrentView('generator')}
            className="px-4 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 rounded-xl shadow-lg shadow-purple-600/20 transition-all flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Generate New Pack</span>
          </button>
        </div>
      </div>

      {/* Metric Cards Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Generated */}
        <div className="p-5 rounded-xl bg-slate-900/70 border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Total Packs</span>
            <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl sm:text-3xl font-bold text-white font-mono tabular-nums">
              {totalGenerated}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              Multi-platform packs compiled
            </div>
          </div>
        </div>

        {/* Saved Favorites */}
        <div className="p-5 rounded-xl bg-slate-900/70 border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Favorites Library</span>
            <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Bookmark className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl sm:text-3xl font-bold text-white font-mono tabular-nums">
              {totalSaved}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              Starred content packs
            </div>
          </div>
        </div>

        {/* Scheduled Posts */}
        <div className="p-5 rounded-xl bg-slate-900/70 border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Scheduled Posts</span>
            <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl sm:text-3xl font-bold text-white font-mono tabular-nums">
              {upcomingScheduled}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              {publishedPosts} published to date
            </div>
          </div>
        </div>

        {/* Credits Remaining */}
        <div className="p-5 rounded-xl bg-slate-900/70 border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">AI Credits Remaining</span>
            <button
              onClick={() => setUpgradeModalOpen(true)}
              className="text-[11px] font-semibold text-purple-400 hover:text-purple-300 transition-colors"
            >
              Get More
            </button>
          </div>
          <div className="mt-4">
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-3xl font-bold text-white font-mono tabular-nums">
                {creditsRemaining}
              </span>
              <span className="text-xs text-slate-400 font-mono">/ {creditsTotal} packs</span>
            </div>
            <div className="mt-2 w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-purple-500 to-cyan-400 h-full rounded-full transition-all"
                style={{ width: `${Math.min(100, (creditsRemaining / Math.max(1, creditsTotal)) * 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => setCurrentView('generator')}
          className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-purple-500/40 hover:bg-slate-800/60 transition-all text-left flex items-center gap-3 group"
        >
          <div className="w-9 h-9 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-white">Generate Pack</div>
            <div className="text-[11px] text-slate-400">AI content engine</div>
          </div>
        </button>

        <button
          onClick={() => setCurrentView('brand_profiles')}
          className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 hover:bg-slate-800/60 transition-all text-left flex items-center gap-3 group"
        >
          <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-white">Brand Profiles</div>
            <div className="text-[11px] text-slate-400">Tone & personas</div>
          </div>
        </button>

        <button
          onClick={() => setCurrentView('calendar')}
          className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/40 hover:bg-slate-800/60 transition-all text-left flex items-center gap-3 group"
        >
          <div className="w-9 h-9 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <Calendar className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-white">Calendar</div>
            <div className="text-[11px] text-slate-400">Plan publishing</div>
          </div>
        </button>

        <button
          onClick={() => setCurrentView('analytics')}
          className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 hover:bg-slate-800/60 transition-all text-left flex items-center gap-3 group"
        >
          <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-white">Analytics</div>
            <div className="text-[11px] text-slate-400">Track reach & ROI</div>
          </div>
        </button>
      </div>

      {/* Two Column Grid: Recent Packs & Upcoming Calendar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Generated Packs */}
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-white">Recent Content Packs</h2>
              <p className="text-xs text-slate-400">Packs compiled by the AI engine</p>
            </div>
            <button
              onClick={() => setCurrentView('library')}
              className="text-xs font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1 transition-colors"
            >
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {recentPacks.map((pack) => (
              <div
                key={pack.id}
                onClick={() => {
                  setActivePack(pack);
                  setCurrentView('generator');
                }}
                className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-purple-500/30 hover:bg-slate-950/90 transition-all cursor-pointer space-y-2 group"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-xs font-semibold text-white group-hover:text-purple-300 transition-colors line-clamp-1">
                    {pack.topic}
                  </h3>
                  <span className="text-[10px] text-slate-400 font-mono whitespace-nowrap">
                    {new Date(pack.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 italic line-clamp-1">
                  "{pack.hooks[0]?.text || 'Hook preview'}"
                </p>
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-1.5">
                    {pack.primaryPlatforms.slice(0, 3).map((plat) => (
                      <span
                        key={plat}
                        className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-800 text-slate-300"
                      >
                        {plat}
                      </span>
                    ))}
                  </div>
                  <span className="text-[11px] text-purple-400 font-medium group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                    Open Pack <ArrowUpRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Scheduled Posts */}
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-white">Upcoming Publishing Queue</h2>
              <p className="text-xs text-slate-400">Scheduled for social platforms</p>
            </div>
            <button
              onClick={() => setCurrentView('calendar')}
              className="text-xs font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1 transition-colors"
            >
              <span>Open Calendar</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {nextScheduledPosts.length === 0 ? (
              <div className="p-8 text-center rounded-xl bg-slate-950/40 border border-slate-800 text-xs text-slate-400">
                No upcoming posts scheduled. Generate a pack and schedule it to your calendar!
              </div>
            ) : (
              nextScheduledPosts.map((entry) => (
                <div
                  key={entry.id}
                  className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between gap-4"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-purple-500/10 text-purple-300 border border-purple-500/20">
                        {entry.platform}
                      </span>
                      <span className="text-xs font-mono text-slate-400">
                        {entry.scheduledDate} at {entry.scheduledTime}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-white truncate">{entry.title}</p>
                    {entry.hookPreview && (
                      <p className="text-[11px] text-slate-400 truncate italic">
                        "{entry.hookPreview}"
                      </p>
                    )}
                  </div>

                  <span className="px-2.5 py-1 rounded-md text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 whitespace-nowrap">
                    Scheduled
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
