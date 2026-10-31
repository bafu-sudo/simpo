import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PLATFORMS } from '../../lib/constants';
import { CalendarEntry, PlatformType } from '../../types';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  CheckCircle2,
  Trash2,
  Edit2,
  Filter,
  Check,
  X,
} from 'lucide-react';

export const CalendarView: React.FC = () => {
  const {
    calendarEntries,
    addCalendarEntry,
    updateCalendarEntry,
    deleteCalendarEntry,
    addToast,
  } = useApp();

  const [viewMode, setViewMode] = useState<'month' | 'week'>('month');
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  // Filter state
  const [platformFilter, setPlatformFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Entry detail / edit modal state
  const [selectedEntry, setSelectedEntry] = useState<CalendarEntry | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newDate, setNewDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [newTime, setNewTime] = useState<string>('10:00');
  const [newTitle, setNewTitle] = useState('');
  const [newPlatform, setNewPlatform] = useState<PlatformType>('instagram');
  const [newStatus, setNewStatus] = useState<'draft' | 'scheduled' | 'published'>('scheduled');
  const [newNotes, setNewNotes] = useState('');

  // Month navigation helpers
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  // Calendar Day Generation (Monthly)
  const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 is Sunday
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  // Filter entries
  const filteredEntries = calendarEntries.filter((e) => {
    if (platformFilter !== 'all' && e.platform !== platformFilter) return false;
    if (statusFilter !== 'all' && e.status !== statusFilter) return false;
    return true;
  });

  const getEntriesForDate = (dateStr: string) => {
    return filteredEntries.filter((e) => e.scheduledDate === dateStr);
  };

  const handleOpenCreateForDate = (dateStr: string) => {
    setNewDate(dateStr);
    setNewTitle('');
    setNewTime('09:30');
    setNewPlatform('tiktok');
    setNewStatus('scheduled');
    setNewNotes('');
    setIsCreateModalOpen(true);
  };

  const handleSaveNewEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    addCalendarEntry({
      title: newTitle,
      platform: newPlatform,
      scheduledDate: newDate,
      scheduledTime: newTime,
      status: newStatus,
      notes: newNotes,
    });

    setIsCreateModalOpen(false);
  };

  const handleToggleStatus = (entry: CalendarEntry) => {
    const nextStatus = entry.status === 'published' ? 'scheduled' : 'published';
    updateCalendarEntry(entry.id, { status: nextStatus });
    if (selectedEntry?.id === entry.id) {
      setSelectedEntry({ ...selectedEntry, status: nextStatus });
    }
    addToast(
      'success',
      nextStatus === 'published' ? 'Marked as Published' : 'Reverted to Scheduled'
    );
  };

  return (
    <div className="space-y-6">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-slate-900/90 via-purple-950/20 to-slate-900/90 border border-slate-800">
        <div>
          <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">
            Content Operations
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-0.5">Content Calendar</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
            Plan, reschedule, and track social distribution dates across all connected creator channels.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => handleOpenCreateForDate(new Date().toISOString().split('T')[0])}
            className="px-4 py-2 text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 rounded-xl transition-colors shadow-sm flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Schedule Post</span>
          </button>
        </div>
      </div>

      {/* Controls Bar: Navigation, Views, and Filters */}
      <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Navigation */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <button
              onClick={handlePrevMonth}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNextMonth}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <h2 className="text-sm sm:text-base font-bold text-white min-w-[150px]">
            {monthNames[month]} {year}
          </h2>
          <button
            onClick={handleToday}
            className="px-2.5 py-1 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 rounded-lg transition-colors"
          >
            Today
          </button>
        </div>

        {/* View Mode & Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Platform Filter */}
          <select
            value={platformFilter}
            onChange={(e) => setPlatformFilter(e.target.value)}
            className="p-1.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-300 focus:outline-none focus:border-purple-500"
          >
            <option value="all">All Channels</option>
            {PLATFORMS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="p-1.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-300 focus:outline-none focus:border-purple-500"
          >
            <option value="all">All Statuses</option>
            <option value="scheduled">Scheduled</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>

          {/* Month / Week Switcher */}
          <div className="flex items-center bg-slate-950 p-0.5 rounded-lg border border-slate-800 text-xs">
            <button
              onClick={() => setViewMode('month')}
              className={`px-3 py-1 rounded-md transition-colors ${
                viewMode === 'month' ? 'bg-purple-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Month
            </button>
            <button
              onClick={() => setViewMode('week')}
              className={`px-3 py-1 rounded-md transition-colors ${
                viewMode === 'week' ? 'bg-purple-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Week
            </button>
          </div>
        </div>
      </div>

      {/* Calendar Grid (Monthly) */}
      {viewMode === 'month' ? (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden shadow-xl">
          {/* Day of Week Headers */}
          <div className="grid grid-cols-7 border-b border-slate-800 bg-slate-950 text-center py-2.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            <span>Sun</span>
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
          </div>

          {/* Day Cells Grid */}
          <div className="grid grid-cols-7 auto-rows-[120px] divide-x divide-y divide-slate-800/80">
            {/* Prev month days */}
            {Array.from({ length: firstDayOfMonth }).map((_, idx) => {
              const prevDate = daysInPrevMonth - firstDayOfMonth + idx + 1;
              return (
                <div key={`prev_${idx}`} className="p-2 bg-slate-950/40 text-slate-600 text-xs">
                  <span className="font-mono">{prevDate}</span>
                </div>
              );
            })}

            {/* Current month days */}
            {Array.from({ length: daysInMonth }).map((_, idx) => {
              const dayNum = idx + 1;
              const dateStr = `${year}-${(month + 1).toString().padStart(2, '0')}-${dayNum
                .toString()
                .padStart(2, '0')}`;
              const isToday =
                new Date().toISOString().split('T')[0] === dateStr;
              const dayEntries = getEntriesForDate(dateStr);

              return (
                <div
                  key={`day_${dayNum}`}
                  onClick={(e) => {
                    // Only open if clicking empty area
                    if ((e.target as HTMLElement).closest('.entry-pill')) return;
                    handleOpenCreateForDate(dateStr);
                  }}
                  className={`p-2 flex flex-col justify-between hover:bg-slate-800/30 transition-colors cursor-pointer relative group ${
                    isToday ? 'bg-purple-950/15' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-mono font-bold w-6 h-6 rounded-full flex items-center justify-center ${
                        isToday
                          ? 'bg-purple-600 text-white shadow-sm'
                          : 'text-slate-300'
                      }`}
                    >
                      {dayNum}
                    </span>
                    <button
                      onClick={() => handleOpenCreateForDate(dateStr)}
                      className="opacity-0 group-hover:opacity-100 p-0.5 text-slate-400 hover:text-white transition-opacity"
                      title="Add Post"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Day Entry Pills */}
                  <div className="space-y-1 overflow-y-auto max-h-[80px] mt-1 pr-1">
                    {dayEntries.map((entry) => (
                      <div
                        key={entry.id}
                        onClick={() => setSelectedEntry(entry)}
                        className={`entry-pill px-2 py-1 rounded text-[10px] font-medium truncate flex items-center justify-between gap-1 shadow-sm transition-all hover:scale-[1.02] cursor-pointer ${
                          entry.status === 'published'
                            ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/60'
                            : 'bg-purple-950/80 text-purple-200 border border-purple-800/60'
                        }`}
                      >
                        <span className="truncate">{entry.title}</span>
                        <span className="font-mono text-[9px] text-slate-400 shrink-0">
                          {entry.scheduledTime}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Weekly View */
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden shadow-xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
            {Array.from({ length: 7 }).map((_, idx) => {
              const weekDate = new Date(currentDate);
              weekDate.setDate(currentDate.getDate() - currentDate.getDay() + idx);
              const dateStr = weekDate.toISOString().split('T')[0];
              const isToday = new Date().toISOString().split('T')[0] === dateStr;
              const dayEntries = getEntriesForDate(dateStr);

              return (
                <div
                  key={`week_${idx}`}
                  className={`p-4 rounded-xl border flex flex-col justify-between min-h-[350px] ${
                    isToday
                      ? 'bg-purple-950/20 border-purple-500/40'
                      : 'bg-slate-950/60 border-slate-800'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                      <div>
                        <div className="text-[11px] font-semibold text-slate-400 uppercase">
                          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][idx]}
                        </div>
                        <div className="text-sm font-bold text-white font-mono mt-0.5">
                          {weekDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </div>
                      </div>
                      <button
                        onClick={() => handleOpenCreateForDate(dateStr)}
                        className="p-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="space-y-2">
                      {dayEntries.length === 0 ? (
                        <div className="text-[11px] text-slate-500 italic py-4 text-center">
                          No posts
                        </div>
                      ) : (
                        dayEntries.map((e) => (
                          <div
                            key={e.id}
                            onClick={() => setSelectedEntry(e)}
                            className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-purple-500/40 transition-all cursor-pointer space-y-1 group"
                          >
                            <div className="flex items-center justify-between text-[10px]">
                              <span className="uppercase font-bold text-purple-400">
                                {e.platform}
                              </span>
                              <span className="font-mono text-slate-400">{e.scheduledTime}</span>
                            </div>
                            <p className="text-xs font-semibold text-white truncate">{e.title}</p>
                            <div className="flex items-center justify-between pt-1">
                              <span
                                className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ${
                                  e.status === 'published'
                                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                    : 'bg-slate-800 text-slate-300'
                                }`}
                              >
                                {e.status}
                              </span>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Selected Entry Detail Modal */}
      {selectedEntry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl p-6 space-y-4">
            <div className="flex items-start justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-purple-500/10 text-purple-300 border border-purple-500/20">
                  {selectedEntry.platform}
                </span>
                <h3 className="text-base font-bold text-white mt-2">{selectedEntry.title}</h3>
              </div>
              <button
                onClick={() => setSelectedEntry(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-400">Scheduled For:</span>
                <span className="font-mono text-white font-semibold">
                  {selectedEntry.scheduledDate} at {selectedEntry.scheduledTime}
                </span>
              </div>

              {selectedEntry.hookPreview && (
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">
                    Hook Preview
                  </span>
                  <p className="text-slate-200 italic">"{selectedEntry.hookPreview}"</p>
                </div>
              )}

              {selectedEntry.notes && (
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">
                    Content Focus & Notes
                  </span>
                  <p className="text-slate-200">{selectedEntry.notes}</p>
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
              <button
                onClick={() => handleToggleStatus(selectedEntry)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                  selectedEntry.status === 'published'
                    ? 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>
                  {selectedEntry.status === 'published'
                    ? 'Mark as Not Published'
                    : 'Mark as Published'}
                </span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    deleteCalendarEntry(selectedEntry.id);
                    setSelectedEntry(null);
                  }}
                  className="p-2 text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                  title="Delete Entry"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setSelectedEntry(null)}
                  className="px-4 py-2 text-xs text-slate-300 hover:text-white bg-slate-800 rounded-lg"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Entry Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-md bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">Schedule Social Post</h3>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveNewEntry} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Post Title / Hook <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. 3-Step AI Prompting Breakdown"
                  className="w-full p-2.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Platform</label>
                  <select
                    value={newPlatform}
                    onChange={(e) => setNewPlatform(e.target.value as PlatformType)}
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
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Status</label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as any)}
                    className="w-full p-2.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="scheduled">Scheduled</option>
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full p-2.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-purple-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Time</label>
                  <input
                    type="time"
                    required
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    className="w-full p-2.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-purple-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Notes & Details (Optional)
                </label>
                <textarea
                  rows={2}
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder="e.g. Add b-roll of computer screen at 0:12"
                  className="w-full p-2.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 text-xs text-slate-300 hover:text-white bg-slate-800 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 rounded-lg shadow-md"
                >
                  Schedule Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
