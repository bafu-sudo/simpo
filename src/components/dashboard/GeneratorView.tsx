import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { NICHES, TONES, PLATFORMS, LANGUAGES, VIDEO_LENGTHS } from '../../lib/constants';
import { PlatformType, ContentPack } from '../../types';
import {
  Sparkles,
  Copy,
  Check,
  Bookmark,
  Calendar,
  Layers,
  RefreshCw,
  Video,
  Instagram,
  Youtube,
  Share2,
  Download,
  Clock,
  ArrowRight,
  Eye,
  CheckCircle2,
  FileText,
} from 'lucide-react';

export const GeneratorView: React.FC = () => {
  const {
    activeBrandProfile,
    brandProfiles,
    generateContentPack,
    isGenerating,
    activePack,
    savePack,
    schedulePackToCalendar,
    addToast,
    creditsRemaining,
    setUpgradeModalOpen,
  } = useApp();

  // Generator Form Inputs
  const [topic, setTopic] = useState('');
  const [niche, setNiche] = useState(activeBrandProfile?.niche || NICHES[0]);
  const [audience, setAudience] = useState(activeBrandProfile?.targetAudience || 'Digital creators & ambitious professionals');
  const [selectedPlatforms, setSelectedPlatforms] = useState<PlatformType[]>(
    activeBrandProfile?.preferredPlatforms || ['instagram', 'tiktok', 'youtube_shorts']
  );
  const [tone, setTone] = useState(activeBrandProfile?.tone || TONES[0].label);
  const [language, setLanguage] = useState(activeBrandProfile?.language || LANGUAGES[0]);
  const [videoLength, setVideoLength] = useState(VIDEO_LENGTHS[1].label);
  const [selectedBrandId, setSelectedBrandId] = useState(activeBrandProfile?.id || '');

  // Tab for Deliverable views
  const [activeTab, setActiveTab] = useState<
    'hooks' | 'script' | 'captions' | 'ctas' | 'hashtags' | 'additional_ideas' | 'schedule'
  >('hooks');

  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [editableScript, setEditableScript] = useState<string>('');

  const handleBrandChange = (brandId: string) => {
    setSelectedBrandId(brandId);
    const brand = brandProfiles.find((b) => b.id === brandId);
    if (brand) {
      setNiche(brand.niche);
      setAudience(brand.targetAudience);
      setTone(brand.tone);
      setLanguage(brand.language);
      setSelectedPlatforms(brand.preferredPlatforms);
      addToast('info', 'Brand Profile Applied', `Loaded voice and parameters from "${brand.name}".`);
    }
  };

  const togglePlatform = (p: PlatformType) => {
    if (selectedPlatforms.includes(p)) {
      if (selectedPlatforms.length > 1) {
        setSelectedPlatforms(selectedPlatforms.filter((item) => item !== p));
      }
    } else {
      setSelectedPlatforms([...selectedPlatforms, p]);
    }
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) {
      addToast('error', 'Topic Required', 'Please enter a topic or core idea.');
      return;
    }

    const pack = await generateContentPack({
      topic,
      niche,
      audience,
      platforms: selectedPlatforms,
      tone,
      language,
      videoLength,
      brandProfileId: selectedBrandId || undefined,
    });

    if (pack) {
      setActiveTab('hooks');
    }
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    addToast('success', 'Copied to Clipboard');
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const exportAsMarkdown = () => {
    if (!activePack) return;
    const md = `# CreatorFlow Content Pack
**Topic:** ${activePack.topic}
**Niche:** ${activePack.niche} | **Tone:** ${activePack.tone} | **Length:** ${activePack.videoLength}
**Generated Date:** ${new Date(activePack.createdAt).toLocaleDateString()}

---

## 1. Five Viral-Style Hooks
${activePack.hooks.map((h, i) => `### Hook ${i + 1} (${h.type})\n"${h.text}"\n*Retention Note: ${h.retentionNote}*\n`).join('\n')}

---

## 2. Complete Video Script (${activePack.videoScript.durationSeconds}s)
**Hook:** ${activePack.videoScript.hook}

**Problem Setup:** ${activePack.videoScript.problemSetup}

**Key Value Points:**
${activePack.videoScript.valuePoints.map((v) => `- [${v.timestamp}] Step ${v.pointNumber}: ${v.talkingPoint} (Visual: ${v.visualCue})`).join('\n')}

**Takeaway / Climax:** ${activePack.videoScript.climaxOrTakeaway}

**Call To Action:** ${activePack.videoScript.callToAction}

---

## 3. Captions
### Instagram Caption
${activePack.instagramCaption.caption}

*First Comment Tags:* ${activePack.instagramCaption.firstCommentHashtags}

### TikTok Caption
${activePack.tiktokCaption.caption}
*Sound Suggestion:* ${activePack.tiktokCaption.soundSuggestion}

### YouTube Shorts
**Title:** ${activePack.youtubeShorts.title}
**Description:** ${activePack.youtubeShorts.description}
**Pinned Comment:** ${activePack.youtubeShorts.pinnedComment}

---

## 4. Calls to Action
${activePack.callsToAction.map((c) => `- **${c.label} (${c.type}):** "${c.text}"`).join('\n')}

---

## 5. Hashtag Clusters
- **Broad Reach:** ${activePack.hashtags.broad.join(' ')}
- **Niche Targeted:** ${activePack.hashtags.niche.join(' ')}
- **Community:** ${activePack.hashtags.community.join(' ')}

---

## 6. Additional Content Angles
${activePack.additionalContentIdeas.map((idea, i) => `${i + 1}. **${idea.title}** (${idea.format})\n   *Angle:* ${idea.angle}`).join('\n\n')}

---

## 7. Suggested 7-Day Publishing Schedule
${activePack.publishingSchedule.map((s) => `- **${s.day} (${s.dayName} at ${s.optimalTime})** [${s.platform.toUpperCase()}]: ${s.focus} (${s.format})`).join('\n')}
`;

    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `creatorflow_${activePack.topic.slice(0, 25).replace(/\s+/g, '_')}.md`;
    a.click();
    URL.revokeObjectURL(url);
    addToast('success', 'Exported Markdown File');
  };

  return (
    <div className="space-y-8">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-slate-900/90 via-purple-950/20 to-slate-900/90 border border-slate-800">
        <div>
          <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">
            AI Content Studio
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-0.5">
            1 Idea → Full Weekly Content Pack
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
            Input a concept and generate 5 psychological hooks, short-form scripts, captions, and an automated publishing plan.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-lg bg-slate-950/70 border border-slate-800 text-xs text-slate-300 font-mono">
            Credits: <span className="text-purple-300 font-bold tabular-nums">{creditsRemaining}</span>
          </div>
          {creditsRemaining <= 1 && (
            <button
              onClick={() => setUpgradeModalOpen(true)}
              className="px-3 py-1.5 text-xs font-semibold text-purple-300 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 rounded-lg transition-colors"
            >
              Upgrade
            </button>
          )}
        </div>
      </div>

      {/* Main Form Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Generator Form (5 Cols) */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              Content Parameters
            </h2>
            {brandProfiles.length > 0 && (
              <select
                value={selectedBrandId}
                onChange={(e) => handleBrandChange(e.target.value)}
                className="text-xs bg-slate-950 border border-slate-800 text-purple-300 rounded-lg px-2.5 py-1 focus:outline-none focus:border-purple-500"
              >
                <option value="">No Brand Selected</option>
                {brandProfiles.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))}
              </select>
            )}
          </div>

          <form onSubmit={handleGenerate} className="space-y-4">
            {/* Core Topic Input */}
            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                Core Idea / Topic <span className="text-rose-400">*</span>
              </label>
              <textarea
                required
                rows={3}
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. Why most people waste 90% of AI capabilities by treating ChatGPT like a search engine..."
                className="w-full p-3 text-xs bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors leading-relaxed"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                A single lesson, myth, question, or story is all the AI needs.
              </p>
            </div>

            {/* Niche & Audience Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-1.5">Niche</label>
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
                <label className="block text-xs font-semibold text-slate-200 mb-1.5">Tone of Voice</label>
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

            {/* Target Audience */}
            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                Target Audience Persona
              </label>
              <input
                type="text"
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                placeholder="e.g. Early-stage founders, creators, productivity seekers"
                className="w-full p-2.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
              />
            </div>

            {/* Target Platforms */}
            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                Target Platforms
              </label>
              <div className="flex flex-wrap gap-1.5">
                {PLATFORMS.map((p) => {
                  const isSelected = selectedPlatforms.includes(p.id);
                  return (
                    <button
                      type="button"
                      key={p.id}
                      onClick={() => togglePlatform(p.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        isSelected
                          ? 'bg-purple-600/30 text-purple-200 border border-purple-500/50 shadow-sm'
                          : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                      }`}
                    >
                      {p.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Video Length & Language */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                  Target Length
                </label>
                <select
                  value={videoLength}
                  onChange={(e) => setVideoLength(e.target.value)}
                  className="w-full p-2.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-purple-500"
                >
                  {VIDEO_LENGTHS.map((vl) => (
                    <option key={vl.id} value={vl.label}>
                      {vl.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-1.5">Language</label>
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
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isGenerating}
              className="w-full py-3.5 px-4 mt-2 bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-bold rounded-xl text-xs tracking-wide shadow-lg shadow-purple-600/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-white" />
                  <span>Generating 9-Part Content Pack...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-white" />
                  <span>Generate Complete Content Pack</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Column: Output Deliverables (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          {!activePack ? (
            <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-slate-800 space-y-3">
              <div className="w-12 h-12 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center mx-auto">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">No Pack Generated Yet</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                Type in an idea on the left and click "Generate Complete Content Pack" to produce 5 hooks, scripts, captions, and an automated publishing plan.
              </p>
            </div>
          ) : (
            <div className="rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden shadow-xl backdrop-blur-md">
              {/* Output Header with Actions */}
              <div className="p-5 border-b border-slate-800 bg-slate-900/90 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400">
                    Active Content Pack
                  </span>
                  <h3 className="text-sm font-bold text-white truncate mt-0.5">{activePack.topic}</h3>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => savePack(activePack)}
                    title="Save to Library"
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
                  >
                    <Bookmark className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => schedulePackToCalendar(activePack)}
                    title="Push to 7-Day Calendar"
                    className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-sm"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Schedule 7-Day Plan</span>
                  </button>
                  <button
                    onClick={exportAsMarkdown}
                    title="Export as Markdown"
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Deliverable Sub-Navigation Tabs */}
              <div className="flex overflow-x-auto border-b border-slate-800 bg-slate-950/60 p-1.5 gap-1 text-xs font-medium">
                <button
                  onClick={() => setActiveTab('hooks')}
                  className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                    activeTab === 'hooks' ? 'bg-purple-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  5 Hooks
                </button>
                <button
                  onClick={() => setActiveTab('script')}
                  className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                    activeTab === 'script' ? 'bg-purple-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Video Script
                </button>
                <button
                  onClick={() => setActiveTab('captions')}
                  className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                    activeTab === 'captions' ? 'bg-purple-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Captions
                </button>
                <button
                  onClick={() => setActiveTab('ctas')}
                  className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                    activeTab === 'ctas' ? 'bg-purple-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Calls to Action
                </button>
                <button
                  onClick={() => setActiveTab('hashtags')}
                  className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                    activeTab === 'hashtags' ? 'bg-purple-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Hashtags
                </button>
                <button
                  onClick={() => setActiveTab('additional_ideas')}
                  className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                    activeTab === 'additional_ideas' ? 'bg-purple-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  5 Derivative Ideas
                </button>
                <button
                  onClick={() => setActiveTab('schedule')}
                  className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                    activeTab === 'schedule' ? 'bg-purple-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Publishing Plan
                </button>
              </div>

              {/* Tab Contents */}
              <div className="p-6">
                {/* 1. Five Viral-Style Hooks */}
                {activeTab === 'hooks' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white uppercase tracking-wider">
                        5 Psychology-Backed Hooks
                      </span>
                      <span className="text-[11px] text-slate-400">Tested short-form retention architectures</span>
                    </div>

                    <div className="space-y-3">
                      {activePack.hooks.map((h, idx) => (
                        <div
                          key={h.id || idx}
                          className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-purple-500/30 transition-all space-y-2 group"
                        >
                          <div className="flex items-center justify-between">
                            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-purple-500/10 text-purple-300 border border-purple-500/20">
                              Hook {idx + 1} · {h.type}
                            </span>
                            <button
                              onClick={() => copyToClipboard(h.text, `hook_${idx}`)}
                              className="text-slate-400 hover:text-white transition-colors p-1"
                              title="Copy Hook"
                            >
                              {copiedKey === `hook_${idx}` ? (
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </div>
                          <p className="text-xs sm:text-sm text-white font-semibold leading-relaxed">
                            "{h.text}"
                          </p>
                          <p className="text-[11px] text-slate-400 italic">
                            Psychology: {h.retentionNote}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 2. Complete Video Script */}
                {activeTab === 'script' && (
                  <div className="space-y-5">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                      <div>
                        <span className="text-xs font-bold text-white uppercase tracking-wider">
                          Complete Short Video Script
                        </span>
                        <p className="text-[11px] text-slate-400">
                          Target Duration: ~{activePack.videoScript.durationSeconds}s · Includes Visual Cues
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          copyToClipboard(
                            `Hook: ${activePack.videoScript.hook}\n\nProblem Setup: ${activePack.videoScript.problemSetup}\n\n${activePack.videoScript.valuePoints
                              .map((v) => `[${v.timestamp}] ${v.talkingPoint} (Visual: ${v.visualCue})`)
                              .join('\n')}\n\nTakeaway: ${activePack.videoScript.climaxOrTakeaway}\n\nCTA: ${activePack.videoScript.callToAction}`,
                            'full_script'
                          )
                        }
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 rounded-lg border border-slate-700"
                      >
                        {copiedKey === 'full_script' ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                        <span>Copy Script</span>
                      </button>
                    </div>

                    <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-800/30 space-y-1">
                      <span className="text-[11px] font-bold text-purple-300 uppercase tracking-wider">
                        0:00 - 0:03 Opening Hook Line
                      </span>
                      <p className="text-xs font-medium text-white italic">
                        "{activePack.videoScript.hook}"
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        0:03 - 0:08 Problem / Tension Setup
                      </span>
                      <p className="text-xs text-slate-200 leading-relaxed">
                        {activePack.videoScript.problemSetup}
                      </p>
                    </div>

                    <div className="space-y-3">
                      <span className="text-xs font-bold text-white uppercase tracking-wider">
                        Timestamped Core Value Points
                      </span>
                      {activePack.videoScript.valuePoints.map((v) => (
                        <div
                          key={v.pointNumber}
                          className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5"
                        >
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-semibold text-cyan-400">
                              Step {v.pointNumber}
                            </span>
                            <span className="font-mono text-slate-400">{v.timestamp}</span>
                          </div>
                          <p className="text-xs text-white leading-relaxed">{v.talkingPoint}</p>
                          <div className="pt-1 text-[11px] text-purple-300 font-mono">
                            Visual Cue: {v.visualCue}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                      <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                          Punchy Takeaway
                        </span>
                        <p className="text-xs text-white mt-1 leading-relaxed">
                          {activePack.videoScript.climaxOrTakeaway}
                        </p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                        <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                          Call To Action
                        </span>
                        <p className="text-xs text-white mt-1 leading-relaxed">
                          {activePack.videoScript.callToAction}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. Captions */}
                {activeTab === 'captions' && (
                  <div className="space-y-6">
                    {/* Instagram Caption */}
                    <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Instagram className="w-4 h-4 text-pink-400" />
                          <span className="text-xs font-bold text-white">Instagram Reels Caption</span>
                        </div>
                        <button
                          onClick={() => copyToClipboard(activePack.instagramCaption.caption, 'ig_cap')}
                          className="text-slate-400 hover:text-white p-1"
                        >
                          {copiedKey === 'ig_cap' ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                      <pre className="text-xs text-slate-200 whitespace-pre-wrap font-sans leading-relaxed">
                        {activePack.instagramCaption.caption}
                      </pre>
                      <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-400">
                        <span className="font-semibold text-purple-400">First Comment Tags: </span>
                        {activePack.instagramCaption.firstCommentHashtags}
                      </div>
                    </div>

                    {/* TikTok Caption */}
                    <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Video className="w-4 h-4 text-cyan-400" />
                          <span className="text-xs font-bold text-white">TikTok Caption & Sound</span>
                        </div>
                        <button
                          onClick={() => copyToClipboard(activePack.tiktokCaption.caption, 'tt_cap')}
                          className="text-slate-400 hover:text-white p-1"
                        >
                          {copiedKey === 'tt_cap' ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                      <p className="text-xs text-slate-200 leading-relaxed font-sans">
                        {activePack.tiktokCaption.caption}
                      </p>
                      <div className="text-[11px] text-cyan-400">
                        Sound Suggestion: {activePack.tiktokCaption.soundSuggestion}
                      </div>
                    </div>

                    {/* YouTube Shorts */}
                    <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Youtube className="w-4 h-4 text-red-400" />
                          <span className="text-xs font-bold text-white">YouTube Shorts Title & Meta</span>
                        </div>
                        <button
                          onClick={() =>
                            copyToClipboard(
                              `Title: ${activePack.youtubeShorts.title}\n\nDescription: ${activePack.youtubeShorts.description}\n\nPinned Comment: ${activePack.youtubeShorts.pinnedComment}`,
                              'yt_meta'
                            )
                          }
                          className="text-slate-400 hover:text-white p-1"
                        >
                          {copiedKey === 'yt_meta' ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase font-bold text-slate-400">Optimized Title:</span>
                        <p className="text-xs font-bold text-white">{activePack.youtubeShorts.title}</p>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase font-bold text-slate-400">Description:</span>
                        <p className="text-xs text-slate-300 leading-relaxed">{activePack.youtubeShorts.description}</p>
                      </div>
                      <div className="text-[11px] text-purple-300">
                        Pinned Comment: {activePack.youtubeShorts.pinnedComment}
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. Calls to Action */}
                {activeTab === 'ctas' && (
                  <div className="space-y-4">
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      4 High-Intent Call-to-Action Variations
                    </span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {activePack.callsToAction.map((cta, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2"
                        >
                          <div className="flex items-center justify-between">
                            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                              {cta.label}
                            </span>
                            <button
                              onClick={() => copyToClipboard(cta.text, `cta_${idx}`)}
                              className="text-slate-400 hover:text-white p-1"
                            >
                              {copiedKey === `cta_${idx}` ? (
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </div>
                          <p className="text-xs text-white leading-relaxed">"{cta.text}"</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 5. Hashtags */}
                {activeTab === 'hashtags' && (
                  <div className="space-y-5">
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      Tiered Hashtag Clusters
                    </span>

                    <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-purple-400">Broad Reach (High Volume)</span>
                        <button
                          onClick={() => copyToClipboard(activePack.hashtags.broad.join(' '), 'tags_broad')}
                          className="text-slate-400 hover:text-white p-1"
                        >
                          {copiedKey === 'tags_broad' ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {activePack.hashtags.broad.map((t) => (
                          <span
                            key={t}
                            className="px-2.5 py-1 rounded-md text-xs bg-slate-900 border border-slate-800 text-slate-300"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-cyan-400">Niche Targeted (Specific Value)</span>
                        <button
                          onClick={() => copyToClipboard(activePack.hashtags.niche.join(' '), 'tags_niche')}
                          className="text-slate-400 hover:text-white p-1"
                        >
                          {copiedKey === 'tags_niche' ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {activePack.hashtags.niche.map((t) => (
                          <span
                            key={t}
                            className="px-2.5 py-1 rounded-md text-xs bg-slate-900 border border-slate-800 text-slate-300"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-emerald-400">Community & Creator Tribe</span>
                        <button
                          onClick={() => copyToClipboard(activePack.hashtags.community.join(' '), 'tags_comm')}
                          className="text-slate-400 hover:text-white p-1"
                        >
                          {copiedKey === 'tags_comm' ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {activePack.hashtags.community.map((t) => (
                          <span
                            key={t}
                            className="px-2.5 py-1 rounded-md text-xs bg-slate-900 border border-slate-800 text-slate-300"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* 6. Five Additional Derivative Ideas */}
                {activeTab === 'additional_ideas' && (
                  <div className="space-y-4">
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      5 Derivative Content Ideas for Your Next Posts
                    </span>

                    <div className="space-y-3">
                      {activePack.additionalContentIdeas.map((idea, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-white">
                              {idx + 1}. {idea.title}
                            </span>
                            <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300 border border-slate-700">
                              {idea.format}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 leading-relaxed">
                            <span className="text-purple-300 font-semibold">Strategic Angle: </span>
                            {idea.angle}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 7. Suggested Publishing Schedule */}
                {activeTab === 'schedule' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold text-white uppercase tracking-wider">
                          Strategic 7-Day Distribution Plan
                        </span>
                        <p className="text-[11px] text-slate-400">
                          Recommended timing and cross-platform sequencing
                        </p>
                      </div>
                      <button
                        onClick={() => schedulePackToCalendar(activePack)}
                        className="px-3.5 py-1.5 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Push to Calendar</span>
                      </button>
                    </div>

                    <div className="space-y-2.5">
                      {activePack.publishingSchedule.map((s, idx) => (
                        <div
                          key={idx}
                          className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-xs text-white">
                                {s.day} · {s.dayName}
                              </span>
                              <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-purple-500/10 text-purple-300 border border-purple-500/20">
                                {s.platform}
                              </span>
                              <span className="text-xs font-mono text-cyan-400">
                                {s.optimalTime}
                              </span>
                            </div>
                            <p className="text-xs text-slate-300 leading-relaxed">{s.focus}</p>
                          </div>
                          <span className="px-2 py-1 rounded text-[11px] bg-slate-800 text-slate-300 border border-slate-700 whitespace-nowrap self-start sm:self-center">
                            {s.format}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
