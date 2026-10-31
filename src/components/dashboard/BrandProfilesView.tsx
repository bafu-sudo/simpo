import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { NICHES, TONES, PLATFORMS, LANGUAGES, SUBSCRIPTION_PLANS } from '../../lib/constants';
import { BrandProfile, PlatformType } from '../../types';
import {
  Layers,
  Plus,
  Trash2,
  Edit2,
  Check,
  Star,
  Sparkles,
  ArrowRight,
  Globe,
  Sliders,
} from 'lucide-react';

export const BrandProfilesView: React.FC = () => {
  const {
    brandProfiles,
    activeBrandProfile,
    setActiveBrandProfile,
    createBrandProfile,
    updateBrandProfile,
    deleteBrandProfile,
    currentPlan,
    setUpgradeModalOpen,
  } = useApp();

  const planInfo = SUBSCRIPTION_PLANS.find((p) => p.id === currentPlan) || SUBSCRIPTION_PLANS[0];
  const isAtLimit = brandProfiles.length >= planInfo.brandProfilesLimit;

  // Modal / Form state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [name, setName] = useState('');
  const [handle, setHandle] = useState('');
  const [niche, setNiche] = useState(NICHES[0]);
  const [audience, setAudience] = useState('');
  const [tone, setTone] = useState(TONES[0].label);
  const [language, setLanguage] = useState(LANGUAGES[0]);
  const [platforms, setPlatforms] = useState<PlatformType[]>(['instagram', 'tiktok', 'youtube_shorts']);
  const [colorAccent, setColorAccent] = useState('#8b5cf6');
  const [isDefault, setIsDefault] = useState(false);

  const openCreateModal = () => {
    if (isAtLimit) {
      setUpgradeModalOpen(true);
      return;
    }
    setEditingId(null);
    setName('');
    setHandle('');
    setNiche(NICHES[0]);
    setAudience('');
    setTone(TONES[0].label);
    setLanguage(LANGUAGES[0]);
    setPlatforms(['instagram', 'tiktok', 'youtube_shorts']);
    setColorAccent('#8b5cf6');
    setIsDefault(brandProfiles.length === 0);
    setIsModalOpen(true);
  };

  const openEditModal = (profile: BrandProfile) => {
    setEditingId(profile.id);
    setName(profile.name);
    setHandle(profile.handle || '');
    setNiche(profile.niche);
    setAudience(profile.targetAudience);
    setTone(profile.tone);
    setLanguage(profile.language);
    setPlatforms(profile.preferredPlatforms);
    setColorAccent(profile.colorAccent || '#8b5cf6');
    setIsDefault(profile.isDefault);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (editingId) {
      updateBrandProfile(editingId, {
        name,
        handle,
        niche,
        targetAudience: audience,
        tone,
        language,
        preferredPlatforms: platforms,
        colorAccent,
        isDefault,
      });
    } else {
      createBrandProfile({
        name,
        handle,
        niche,
        targetAudience: audience,
        tone,
        language,
        preferredPlatforms: platforms,
        colorAccent,
        isDefault,
      });
    }
    setIsModalOpen(false);
  };

  const togglePlatform = (p: PlatformType) => {
    if (platforms.includes(p)) {
      if (platforms.length > 1) {
        setPlatforms(platforms.filter((item) => item !== p));
      }
    } else {
      setPlatforms([...platforms, p]);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-slate-900/90 via-purple-950/20 to-slate-900/90 border border-slate-800">
        <div>
          <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">
            Brand Architecture
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-0.5">Brand Profiles</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
            Save distinct personas, tone guidelines, niches, and audience definitions to auto-steer the AI generator.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="text-right">
            <div className="text-xs font-bold text-white font-mono tabular-nums">
              {brandProfiles.length} / {planInfo.brandProfilesLimit} Profiles
            </div>
            <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
              {planInfo.name} Tier Limit
            </div>
          </div>
          <button
            onClick={openCreateModal}
            className="px-4 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-xl shadow-md transition-all flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>New Brand Profile</span>
          </button>
        </div>
      </div>

      {/* Profiles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {brandProfiles.map((brand) => {
          const isActive = activeBrandProfile?.id === brand.id;

          return (
            <div
              key={brand.id}
              className={`relative flex flex-col p-6 rounded-2xl border transition-all ${
                isActive
                  ? 'bg-slate-900/90 border-purple-500/60 shadow-xl shadow-purple-500/10'
                  : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
              }`}
            >
              {brand.isDefault && (
                <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-[10px] font-semibold">
                  <Star className="w-3 h-3 fill-purple-400 text-purple-400" />
                  <span>Default</span>
                </div>
              )}

              <div className="flex items-start gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white text-base shadow-sm"
                  style={{ backgroundColor: brand.colorAccent || '#8b5cf6' }}
                >
                  {brand.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">{brand.name}</h3>
                  <p className="text-xs text-purple-400 font-mono">{brand.handle || '@brand'}</p>
                </div>
              </div>

              <div className="space-y-2.5 text-xs text-slate-300 flex-1 mb-6">
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-bold tracking-wider">
                    Niche & Focus
                  </span>
                  <span className="font-medium text-white">{brand.niche}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-bold tracking-wider">
                    Tone of Voice
                  </span>
                  <span className="font-medium text-white">{brand.tone}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-bold tracking-wider">
                    Target Persona
                  </span>
                  <p className="text-slate-300 text-[11px] line-clamp-2 leading-relaxed">
                    {brand.targetAudience}
                  </p>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-bold tracking-wider mb-1">
                    Preferred Channels
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {brand.preferredPlatforms.map((p) => (
                      <span
                        key={p}
                        className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300 border border-slate-700 font-medium"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-2">
                <button
                  onClick={() => setActiveBrandProfile(brand)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-purple-600/30 text-purple-200 border border-purple-500/40 cursor-default'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                  }`}
                >
                  {isActive ? 'Active Brand' : 'Set as Active'}
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => openEditModal(brand)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                    title="Edit Profile"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => deleteBrandProfile(brand.id)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-900/40 text-slate-300 hover:text-rose-300 transition-colors"
                    title="Delete Profile"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {/* Add Card placeholder if below limit */}
        {!isAtLimit && (
          <button
            onClick={openCreateModal}
            className="flex flex-col items-center justify-center p-8 rounded-2xl border border-dashed border-slate-800 hover:border-purple-500/50 bg-slate-900/20 hover:bg-slate-900/40 transition-all text-center group min-h-[300px]"
          >
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Plus className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">
              Add Brand Profile
            </h4>
            <p className="text-xs text-slate-400 mt-1 max-w-[200px]">
              Set up another brand, client voice, or side project.
            </p>
          </button>
        )}
      </div>

      {/* Brand Profile Creation / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
              <h3 className="text-base font-bold text-white">
                {editingId ? 'Edit Brand Profile' : 'Create Brand Profile'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Brand Name <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Nexus Tech Lab"
                    className="w-full p-2.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Handle</label>
                  <input
                    type="text"
                    value={handle}
                    onChange={(e) => setHandle(e.target.value)}
                    placeholder="@handle"
                    className="w-full p-2.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-purple-500 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Niche</label>
                  <select
                    value={niche}
                    onChange={(e) => setNiche(e.target.value)}
                    className="w-full p-2.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-purple-500"
                  >
                    {NICHES.map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Tone</label>
                  <select
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                    className="w-full p-2.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-purple-500"
                  >
                    {TONES.map((t) => (
                      <option key={t.id} value={t.label}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Target Audience Persona
                </label>
                <textarea
                  rows={2}
                  required
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                  placeholder="e.g. Startup founders, developers and productivity enthusiasts looking for AI leverage."
                  className="w-full p-2.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-purple-500 leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Language</label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full p-2.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-purple-500"
                  >
                    {LANGUAGES.map((l) => (
                      <option key={l} value={l}>
                        {l}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Color Accent
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={colorAccent}
                      onChange={(e) => setColorAccent(e.target.value)}
                      className="w-8 h-8 rounded-lg bg-transparent cursor-pointer border-0"
                    />
                    <span className="text-xs font-mono text-slate-300">{colorAccent}</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Preferred Channels
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {PLATFORMS.map((p) => {
                    const isSel = platforms.includes(p.id);
                    return (
                      <button
                        type="button"
                        key={p.id}
                        onClick={() => togglePlatform(p.id)}
                        className={`px-2.5 py-1 rounded text-xs transition-colors ${
                          isSel
                            ? 'bg-purple-600 text-white font-medium'
                            : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                        }`}
                      >
                        {p.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="isDefaultCheckbox"
                  checked={isDefault}
                  onChange={(e) => setIsDefault(e.target.checked)}
                  className="rounded bg-slate-950 border-slate-800 text-purple-600 focus:ring-0"
                />
                <label htmlFor="isDefaultCheckbox" className="text-xs text-slate-300">
                  Set as default brand profile
                </label>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs text-slate-300 hover:text-white bg-slate-800 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 rounded-lg shadow-md"
                >
                  {editingId ? 'Save Changes' : 'Create Profile'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
