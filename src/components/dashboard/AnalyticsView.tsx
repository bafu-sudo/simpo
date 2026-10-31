import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PLATFORMS } from '../../lib/constants';
import { AnalyticsMetric, PlatformType } from '../../types';
import {
  TrendingUp,
  Eye,
  Heart,
  MessageCircle,
  Share2,
  Users,
  Plus,
  Trash2,
  BarChart3,
  Sparkles,
  ArrowUpRight,
  X,
} from 'lucide-react';

export const AnalyticsView: React.FC = () => {
  const { analyticsMetrics, logMetric, deleteMetric, contentPacks } = useApp();

  const [isLogModalOpen, setIsLogModalOpen] = useState(false);

  // Form State
  const [postTitle, setPostTitle] = useState('');
  const [platform, setPlatform] = useState<PlatformType>('tiktok');
  const [publishedDate, setPublishedDate] = useState(new Date().toISOString().split('T')[0]);
  const [views, setViews] = useState<number>(10000);
  const [likes, setLikes] = useState<number>(850);
  const [comments, setComments] = useState<number>(95);
  const [shares, setShares] = useState<number>(210);
  const [followersGained, setFollowersGained] = useState<number>(120);
  const [hookTypeUsed, setHookTypeUsed] = useState('Negative Hook');

  // Aggregated KPIs
  const totalViews = analyticsMetrics.reduce((sum, m) => sum + m.views, 0);
  const totalLikes = analyticsMetrics.reduce((sum, m) => sum + m.likes, 0);
  const totalComments = analyticsMetrics.reduce((sum, m) => sum + m.comments, 0);
  const totalShares = analyticsMetrics.reduce((sum, m) => sum + m.shares, 0);
  const totalFollowers = analyticsMetrics.reduce((sum, m) => sum + m.followersGained, 0);

  const engagementRate = totalViews > 0
    ? (((totalLikes + totalComments + totalShares) / totalViews) * 100).toFixed(1)
    : '0.0';

  const handleOpenLogModal = () => {
    setPostTitle(contentPacks[0]?.topic || '');
    setPlatform('tiktok');
    setPublishedDate(new Date().toISOString().split('T')[0]);
    setViews(15000);
    setLikes(1200);
    setComments(110);
    setShares(320);
    setFollowersGained(180);
    setHookTypeUsed('Negative Hook');
    setIsLogModalOpen(true);
  };

  const handleSaveMetric = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postTitle.trim()) return;

    logMetric({
      postTitle,
      platform,
      publishedDate,
      views: Number(views),
      likes: Number(likes),
      comments: Number(comments),
      shares: Number(shares),
      followersGained: Number(followersGained),
      hookTypeUsed,
    });

    setIsLogModalOpen(false);
  };

  // Platform Breakdown
  const platformStats: Record<string, number> = {};
  analyticsMetrics.forEach((m) => {
    platformStats[m.platform] = (platformStats[m.platform] || 0) + m.views;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-slate-900/90 via-purple-950/20 to-slate-900/90 border border-slate-800">
        <div>
          <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">
            Performance Intelligence
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-0.5">Content Analytics</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
            Track manual views, engagement rates, audience retention, and hook archetype attribution.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleOpenLogModal}
            className="px-4 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 rounded-xl transition-all shadow-md flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Log Post Performance</span>
          </button>
        </div>
      </div>

      {/* Aggregate KPI Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Total Views */}
        <div className="p-5 rounded-xl bg-slate-900/70 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Total Views</span>
            <Eye className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono tabular-nums mt-3">
            {totalViews.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">Across all platforms</div>
        </div>

        {/* Total Likes */}
        <div className="p-5 rounded-xl bg-slate-900/70 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Likes & Reactions</span>
            <Heart className="w-4 h-4 text-pink-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono tabular-nums mt-3">
            {totalLikes.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">{totalComments} comments</div>
        </div>

        {/* Total Shares */}
        <div className="p-5 rounded-xl bg-slate-900/70 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Shares / Reposts</span>
            <Share2 className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono tabular-nums mt-3">
            {totalShares.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">High virality signal</div>
        </div>

        {/* Followers Gained */}
        <div className="p-5 rounded-xl bg-slate-900/70 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Followers Gained</span>
            <Users className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono tabular-nums mt-3">
            +{totalFollowers.toLocaleString()}
          </div>
          <div className="text-[11px] text-emerald-400 mt-0.5">Audience compounding</div>
        </div>

        {/* Avg Engagement Rate */}
        <div className="p-5 rounded-xl bg-slate-900/70 border border-slate-800 col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Engagement Rate</span>
            <TrendingUp className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono tabular-nums mt-3">
            {engagementRate}%
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">Likes + shares + comments / views</div>
        </div>
      </div>

      {/* Visual Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Views Trend Chart (SVG) */}
        <div className="lg:col-span-8 p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-white">Views Velocity Trend</h2>
              <p className="text-xs text-slate-400">Post performance progression over time</p>
            </div>
            <span className="text-xs font-mono text-purple-400 font-semibold">
              {analyticsMetrics.length} Logged Entries
            </span>
          </div>

          {/* SVG Line / Bar visualization */}
          <div className="h-60 w-full pt-4 flex flex-col justify-end">
            <div className="h-full w-full flex items-end gap-3 sm:gap-6 border-b border-slate-800 pb-2">
              {analyticsMetrics.map((item, idx) => {
                const maxViews = Math.max(...analyticsMetrics.map((m) => m.views), 1);
                const heightPct = Math.max(12, Math.round((item.views / maxViews) * 100));

                return (
                  <div
                    key={item.id}
                    className="flex-1 flex flex-col items-center gap-2 group relative"
                  >
                    {/* Tooltip */}
                    <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-950 border border-slate-700 text-white text-[10px] rounded px-2 py-1 pointer-events-none whitespace-nowrap z-20 font-mono shadow-xl">
                      {item.views.toLocaleString()} views · {item.likes.toLocaleString()} likes
                    </div>

                    <div className="w-full max-w-[48px] bg-slate-950 rounded-t-lg overflow-hidden flex flex-col justify-end h-44">
                      <div
                        className="w-full bg-gradient-to-t from-purple-600 via-indigo-600 to-cyan-400 rounded-t-md transition-all duration-500 group-hover:brightness-125"
                        style={{ height: `${heightPct}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 truncate max-w-[65px] text-center">
                      {item.publishedDate.split('-').slice(1).join('/')}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Platform Share Breakdown */}
        <div className="lg:col-span-4 p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
          <div>
            <h2 className="text-sm font-bold text-white">Reach by Channel</h2>
            <p className="text-xs text-slate-400">Audience volume distribution</p>
          </div>

          <div className="space-y-3.5 pt-2">
            {PLATFORMS.map((plat) => {
              const platViews = platformStats[plat.id] || 0;
              const pct = totalViews > 0 ? Math.round((platViews / totalViews) * 100) : 0;

              return (
                <div key={plat.id} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-white">{plat.name}</span>
                    <span className="font-mono text-slate-300 tabular-nums">
                      {platViews.toLocaleString()} ({pct}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${pct}%`,
                        backgroundColor: plat.color || '#8b5cf6',
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-400 leading-relaxed">
            TikTok and YouTube Shorts currently capture over 64% of top-of-funnel views.
          </div>
        </div>
      </div>

      {/* Logged Posts Table */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden shadow-xl">
        <div className="p-5 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <h2 className="text-sm font-bold text-white">Manual Performance Log</h2>
          <span className="text-xs font-mono text-slate-400">{analyticsMetrics.length} Posts</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 text-[11px] uppercase font-bold tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Post Title</th>
                <th className="py-3 px-4">Channel</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4 text-right">Views</th>
                <th className="py-3 px-4 text-right">Likes</th>
                <th className="py-3 px-4 text-right">Comments</th>
                <th className="py-3 px-4 text-right">Shares</th>
                <th className="py-3 px-4 text-right">Followers</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {analyticsMetrics.map((item) => (
                <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-white max-w-[220px] truncate">
                    {item.postTitle}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-purple-500/10 text-purple-300 border border-purple-500/20">
                      {item.platform}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-400">{item.publishedDate}</td>
                  <td className="py-3.5 px-4 text-right font-mono font-bold text-white tabular-nums">
                    {item.views.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono text-slate-300 tabular-nums">
                    {item.likes.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono text-slate-300 tabular-nums">
                    {item.comments.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono text-slate-300 tabular-nums">
                    {item.shares.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono font-semibold text-emerald-400 tabular-nums">
                    +{item.followersGained.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => deleteMetric(item.id)}
                      className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
                      title="Remove entry"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Log Post Performance Modal */}
      {isLogModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">Log Post Performance</h3>
              <button
                onClick={() => setIsLogModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveMetric} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Post Title <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
                  placeholder="e.g. Stop Using AI Like Google"
                  className="w-full p-2.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Channel</label>
                  <select
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value as PlatformType)}
                    className="w-full p-2.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-purple-500"
                  >
                    {PLATFORMS.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Published Date
                  </label>
                  <input
                    type="date"
                    required
                    value={publishedDate}
                    onChange={(e) => setPublishedDate(e.target.value)}
                    className="w-full p-2.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-purple-500 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Views</label>
                  <input
                    type="number"
                    min={0}
                    required
                    value={views}
                    onChange={(e) => setViews(parseInt(e.target.value) || 0)}
                    className="w-full p-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white font-mono tabular-nums"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Likes</label>
                  <input
                    type="number"
                    min={0}
                    required
                    value={likes}
                    onChange={(e) => setLikes(parseInt(e.target.value) || 0)}
                    className="w-full p-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white font-mono tabular-nums"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Comments</label>
                  <input
                    type="number"
                    min={0}
                    required
                    value={comments}
                    onChange={(e) => setComments(parseInt(e.target.value) || 0)}
                    className="w-full p-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white font-mono tabular-nums"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Shares</label>
                  <input
                    type="number"
                    min={0}
                    required
                    value={shares}
                    onChange={(e) => setShares(parseInt(e.target.value) || 0)}
                    className="w-full p-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white font-mono tabular-nums"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Followers Gained
                  </label>
                  <input
                    type="number"
                    min={0}
                    required
                    value={followersGained}
                    onChange={(e) => setFollowersGained(parseInt(e.target.value) || 0)}
                    className="w-full p-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white font-mono tabular-nums"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Hook Type Used
                </label>
                <select
                  value={hookTypeUsed}
                  onChange={(e) => setHookTypeUsed(e.target.value)}
                  className="w-full p-2.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="Negative Hook">Negative Hook / FOMO</option>
                  <option value="Curious Question">Curious Question</option>
                  <option value="Contrarian Take">Contrarian Take</option>
                  <option value="Insider Secret">Insider Secret / Reveal</option>
                  <option value="Before/After Transformation">Before/After Transformation</option>
                </select>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsLogModalOpen(false)}
                  className="px-4 py-2 text-xs text-slate-300 hover:text-white bg-slate-800 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 rounded-lg shadow-md"
                >
                  Save Metrics
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
