import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { NICHES, PLATFORMS } from '../../lib/constants';
import { ContentPack, PlatformType } from '../../types';
import {
  Search,
  Filter,
  Bookmark,
  Star,
  Copy,
  Trash2,
  Edit2,
  Calendar,
  Sparkles,
  ExternalLink,
  Download,
  Share2,
  Clock,
  ArrowRight,
  Eye,
  Check,
} from 'lucide-react';

export const LibraryView: React.FC = () => {
  const {
    contentPacks,
    activePack,
    setActivePack,
    setCurrentView,
    toggleFavoritePack,
    duplicatePack,
    deletePack,
    schedulePackToCalendar,
    updatePack,
    addToast,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNiche, setSelectedNiche] = useState<string>('all');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
  const [favoritesOnly, setFavoritesOnly] = useState(false);

  // Edit Modal State
  const [editingPack, setEditingPack] = useState<ContentPack | null>(null);
  const [editTopic, setEditTopic] = useState('');

  const filteredPacks = contentPacks.filter((pack) => {
    if (favoritesOnly && !pack.isFavorite) return false;
    if (selectedNiche !== 'all' && pack.niche !== selectedNiche) return false;
    if (
      selectedPlatform !== 'all' &&
      !pack.primaryPlatforms.includes(selectedPlatform as PlatformType)
    )
      return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const topicMatch = pack.topic.toLowerCase().includes(q);
      const hookMatch = pack.hooks.some((h) => h.text.toLowerCase().includes(q));
      const nicheMatch = pack.niche.toLowerCase().includes(q);
      if (!topicMatch && !hookMatch && !nicheMatch) return false;
    }

    return true;
  });

  const handleOpenEdit = (pack: ContentPack) => {
    setEditingPack(pack);
    setEditTopic(pack.topic);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPack || !editTopic.trim()) return;

    updatePack(editingPack.id, { topic: editTopic });
    setEditingPack(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-slate-900/90 via-purple-950/20 to-slate-900/90 border border-slate-800">
        <div>
          <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">
            Content Vault
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-0.5">Content Library</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
            Search, filter, favorite, duplicate, and push saved content packs to your social calendar.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setCurrentView('generator')}
            className="px-4 py-2.5 text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 rounded-xl transition-colors shadow-sm flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4" />
            <span>Generate New Pack</span>
          </button>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search topics, hooks, or niches..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={selectedNiche}
            onChange={(e) => setSelectedNiche(e.target.value)}
            className="p-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-300 focus:outline-none focus:border-purple-500"
          >
            <option value="all">All Niches</option>
            {NICHES.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>

          <select
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
            className="p-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-300 focus:outline-none focus:border-purple-500"
          >
            <option value="all">All Platforms</option>
            {PLATFORMS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>

          <button
            onClick={() => setFavoritesOnly(!favoritesOnly)}
            className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              favoritesOnly
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
            }`}
          >
            <Star className={`w-3.5 h-3.5 ${favoritesOnly ? 'fill-amber-400 text-amber-400' : ''}`} />
            <span>Starred</span>
          </button>
        </div>
      </div>

      {/* Library Cards Grid */}
      {filteredPacks.length === 0 ? (
        <div className="p-16 text-center rounded-2xl bg-slate-900/40 border border-slate-800 space-y-3">
          <Bookmark className="w-8 h-8 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-white">No Content Packs Match Your Filters</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Try adjusting your search query or reset the niche and platform dropdowns.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPacks.map((pack) => (
            <div
              key={pack.id}
              className="relative flex flex-col p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-purple-500/40 hover:bg-slate-900/90 transition-all shadow-md group"
            >
              {/* Star Button */}
              <button
                onClick={() => toggleFavoritePack(pack.id)}
                className="absolute top-5 right-5 p-1 text-slate-500 hover:text-amber-400 transition-colors"
                title={pack.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                <Star
                  className={`w-4 h-4 ${
                    pack.isFavorite ? 'fill-amber-400 text-amber-400' : 'text-slate-500'
                  }`}
                />
              </button>

              <div className="pr-8 mb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400">
                  {pack.niche}
                </span>
                <h3 className="text-sm font-bold text-white mt-1 line-clamp-2 leading-snug">
                  {pack.topic}
                </h3>
              </div>

              {/* Hook preview */}
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 mb-4 flex-1">
                <span className="text-[10px] font-semibold text-cyan-400 block mb-1">
                  Top Hook ({pack.hooks[0]?.type || 'Hook'}):
                </span>
                <p className="text-xs text-slate-300 italic line-clamp-3 leading-relaxed">
                  "{pack.hooks[0]?.text || 'No hook text available'}"
                </p>
              </div>

              {/* Metadata */}
              <div className="space-y-3 pt-3 border-t border-slate-800/80">
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>Tone: {pack.tone}</span>
                  <span className="font-mono">{new Date(pack.createdAt).toLocaleDateString()}</span>
                </div>

                <div className="flex flex-wrap gap-1">
                  {pack.primaryPlatforms.map((p) => (
                    <span
                      key={p}
                      className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300 font-medium"
                    >
                      {p}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="pt-2 flex items-center justify-between gap-1">
                  <button
                    onClick={() => {
                      setActivePack(pack);
                      setCurrentView('generator');
                    }}
                    className="px-3 py-1.5 rounded-lg bg-purple-600/30 hover:bg-purple-600/50 text-purple-200 border border-purple-500/40 text-xs font-semibold flex items-center gap-1 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Open Pack</span>
                  </button>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => schedulePackToCalendar(pack)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                      title="Push to 7-Day Calendar"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => duplicatePack(pack.id)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                      title="Duplicate Pack"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleOpenEdit(pack)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                      title="Edit Topic"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => deletePack(pack.id)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-900/40 text-slate-300 hover:text-rose-300 transition-colors"
                      title="Delete Pack"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Pack Modal */}
      {editingPack && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-md bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white">Edit Content Pack Title</h3>
            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Topic Title
                </label>
                <textarea
                  rows={3}
                  required
                  value={editTopic}
                  onChange={(e) => setEditTopic(e.target.value)}
                  className="w-full p-2.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-purple-500 leading-relaxed"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingPack(null)}
                  className="px-4 py-2 text-xs text-slate-300 hover:text-white bg-slate-800 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 rounded-lg"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
