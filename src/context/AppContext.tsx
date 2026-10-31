import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  UserProfile,
  BrandProfile,
  ContentPack,
  CalendarEntry,
  AnalyticsMetric,
  PlanType,
  PlatformType,
} from '../types';
import {
  SUBSCRIPTION_PLANS,
  INITIAL_BRAND_PROFILE,
  INITIAL_CONTENT_PACK,
  INITIAL_CALENDAR_ENTRIES,
  INITIAL_ANALYTICS,
} from '../lib/constants';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export type AppView =
  | 'landing'
  | 'dashboard'
  | 'generator'
  | 'brand_profiles'
  | 'calendar'
  | 'library'
  | 'analytics'
  | 'billing';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  message?: string;
}

interface AppContextType {
  // Navigation & View
  currentView: AppView;
  setCurrentView: (view: AppView) => void;

  // User & Auth
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (email: string, password?: string) => Promise<boolean>;
  signup: (email: string, password?: string, fullName?: string) => Promise<boolean>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<boolean>;
  loginDemoUser: (plan?: PlanType) => void;

  // Brand Profiles
  brandProfiles: BrandProfile[];
  activeBrandProfile: BrandProfile | null;
  setActiveBrandProfile: (profile: BrandProfile | null) => void;
  createBrandProfile: (profile: Omit<BrandProfile, 'id' | 'userId' | 'createdAt'>) => boolean;
  updateBrandProfile: (id: string, updates: Partial<BrandProfile>) => boolean;
  deleteBrandProfile: (id: string) => boolean;

  // Content Packs
  contentPacks: ContentPack[];
  activePack: ContentPack | null;
  setActivePack: (pack: ContentPack | null) => void;
  isGenerating: boolean;
  generateContentPack: (params: {
    topic: string;
    niche: string;
    audience: string;
    platforms: PlatformType[];
    tone: string;
    language: string;
    videoLength: string;
    brandProfileId?: string;
  }) => Promise<ContentPack | null>;
  savePack: (pack: ContentPack) => void;
  toggleFavoritePack: (id: string) => void;
  updatePack: (id: string, updates: Partial<ContentPack>) => void;
  duplicatePack: (id: string) => void;
  deletePack: (id: string) => void;

  // Calendar
  calendarEntries: CalendarEntry[];
  addCalendarEntry: (entry: Omit<CalendarEntry, 'id' | 'userId' | 'createdAt'>) => void;
  updateCalendarEntry: (id: string, updates: Partial<CalendarEntry>) => void;
  deleteCalendarEntry: (id: string) => void;
  schedulePackToCalendar: (pack: ContentPack, startDate?: string) => void;

  // Analytics
  analyticsMetrics: AnalyticsMetric[];
  logMetric: (metric: Omit<AnalyticsMetric, 'id' | 'userId'>) => void;
  deleteMetric: (id: string) => void;

  // Subscriptions & Plans
  currentPlan: PlanType;
  creditsRemaining: number;
  creditsTotal: number;
  upgradePlan: (plan: PlanType) => Promise<boolean>;

  // Modals & Toasts
  authModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;
  upgradeModalOpen: boolean;
  setUpgradeModalOpen: (open: boolean) => void;
  dbSetupModalOpen: boolean;
  setDbSetupModalOpen: (open: boolean) => void;
  toasts: ToastMessage[];
  addToast: (type: 'success' | 'error' | 'info', title: string, message?: string) => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const DEMO_USER: UserProfile = {
  id: 'usr_demo_123',
  email: 'creator@creatorflow.io',
  fullName: 'Alex Vance',
  avatarUrl: '/src/assets/images/avatar_sarah_creator_1793455964268.jpg',
  plan: 'creator',
  creditsRemaining: 24,
  creditsTotal: 30,
  creditsResetDate: '2026-11-28',
  createdAt: '2026-10-01T12:00:00Z',
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<AppView>('landing');
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('cf_user');
    return saved ? JSON.parse(saved) : DEMO_USER;
  });

  const [brandProfiles, setBrandProfiles] = useState<BrandProfile[]>(() => {
    const saved = localStorage.getItem('cf_brands');
    return saved ? JSON.parse(saved) : [INITIAL_BRAND_PROFILE];
  });

  const [activeBrandProfile, setActiveBrandProfile] = useState<BrandProfile | null>(() => {
    return brandProfiles.find((b) => b.isDefault) || brandProfiles[0] || null;
  });

  const [contentPacks, setContentPacks] = useState<ContentPack[]>(() => {
    const saved = localStorage.getItem('cf_packs');
    return saved ? JSON.parse(saved) : [INITIAL_CONTENT_PACK];
  });

  const [activePack, setActivePack] = useState<ContentPack | null>(() => {
    return contentPacks[0] || null;
  });

  const [calendarEntries, setCalendarEntries] = useState<CalendarEntry[]>(() => {
    const saved = localStorage.getItem('cf_calendar');
    return saved ? JSON.parse(saved) : INITIAL_CALENDAR_ENTRIES;
  });

  const [analyticsMetrics, setAnalyticsMetrics] = useState<AnalyticsMetric[]>(() => {
    const saved = localStorage.getItem('cf_analytics');
    return saved ? JSON.parse(saved) : INITIAL_ANALYTICS;
  });

  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [upgradeModalOpen, setUpgradeModalOpen] = useState<boolean>(false);
  const [dbSetupModalOpen, setDbSetupModalOpen] = useState<boolean>(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync to LocalStorage
  useEffect(() => {
    if (user) localStorage.setItem('cf_user', JSON.stringify(user));
    else localStorage.removeItem('cf_user');
  }, [user]);

  useEffect(() => {
    localStorage.setItem('cf_brands', JSON.stringify(brandProfiles));
  }, [brandProfiles]);

  useEffect(() => {
    localStorage.setItem('cf_packs', JSON.stringify(contentPacks));
  }, [contentPacks]);

  useEffect(() => {
    localStorage.setItem('cf_calendar', JSON.stringify(calendarEntries));
  }, [calendarEntries]);

  useEffect(() => {
    localStorage.setItem('cf_analytics', JSON.stringify(analyticsMetrics));
  }, [analyticsMetrics]);

  // Setup Supabase auth listener if configured
  useEffect(() => {
    const client = supabase;
    if (!client || !isSupabaseConfigured) return;

    const checkSession = async () => {
      try {
        const { data: { session } } = await client.auth.getSession();
        if (session?.user) {
          // fetch profile
          const { data: profile } = await client
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

          if (profile) {
            setUser({
              id: profile.id,
              email: profile.email || session.user.email || '',
              fullName: profile.full_name || 'Creator',
              avatarUrl: profile.avatar_url || '',
              plan: profile.plan || 'free',
              creditsRemaining: profile.credits_remaining ?? 3,
              creditsTotal: profile.credits_total ?? 3,
              creditsResetDate: profile.credits_reset_date || new Date().toISOString().split('T')[0],
              createdAt: profile.created_at,
            });
          }
        }
      } catch (e) {
        console.warn('Supabase session load error:', e);
      }
    };

    checkSession();

    const { data: { subscription } } = client.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_OUT') {
        setUser(null);
      } else if (session?.user) {
        const { data: profile } = await client
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (profile) {
          setUser({
            id: profile.id,
            email: profile.email || session.user.email || '',
            fullName: profile.full_name || 'Creator',
            avatarUrl: profile.avatar_url || '',
            plan: profile.plan || 'free',
            creditsRemaining: profile.credits_remaining ?? 3,
            creditsTotal: profile.credits_total ?? 3,
            creditsResetDate: profile.credits_reset_date || new Date().toISOString().split('T')[0],
            createdAt: profile.created_at,
          });
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const addToast = (type: 'success' | 'error' | 'info', title: string, message?: string) => {
    const id = `toast_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Auth methods
  const login = async (email: string, password?: string): Promise<boolean> => {
    if (supabase && isSupabaseConfigured) {
      try {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password: password || 'CreatorFlow2026!',
        });
        if (error) throw error;
        addToast('success', 'Logged in successfully', `Welcome back to CreatorFlow!`);
        setCurrentView('dashboard');
        return true;
      } catch (err: any) {
        addToast('error', 'Login failed', err.message || 'Check your credentials.');
        return false;
      }
    } else {
      // Local demo mode
      const dummyUser: UserProfile = {
        id: `usr_${Date.now()}`,
        email,
        fullName: email.split('@')[0] || 'Creator',
        plan: 'creator',
        creditsRemaining: 30,
        creditsTotal: 30,
        creditsResetDate: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
        createdAt: new Date().toISOString(),
      };
      setUser(dummyUser);
      addToast('success', 'Logged in (Local Mode)', `Signed in as ${email}`);
      setCurrentView('dashboard');
      return true;
    }
  };

  const signup = async (email: string, password?: string, fullName?: string): Promise<boolean> => {
    if (supabase && isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.auth.signUp({
          email,
          password: password || 'CreatorFlow2026!',
          options: {
            data: { full_name: fullName || 'Creator' },
          },
        });
        if (error) throw error;
        addToast('success', 'Account created!', 'Check your email for confirmation or explore your dashboard.');
        if (data.user) {
          setUser({
            id: data.user.id,
            email,
            fullName: fullName || 'Creator',
            plan: 'free',
            creditsRemaining: 3,
            creditsTotal: 3,
            creditsResetDate: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
            createdAt: new Date().toISOString(),
          });
          setCurrentView('dashboard');
        }
        return true;
      } catch (err: any) {
        addToast('error', 'Signup error', err.message);
        return false;
      }
    } else {
      const newUser: UserProfile = {
        id: `usr_${Date.now()}`,
        email,
        fullName: fullName || email.split('@')[0] || 'Creator',
        plan: 'free',
        creditsRemaining: 3,
        creditsTotal: 3,
        creditsResetDate: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
        createdAt: new Date().toISOString(),
      };
      setUser(newUser);
      addToast('success', 'Welcome to CreatorFlow!', 'Your Free account includes 3 AI packs.');
      setCurrentView('dashboard');
      return true;
    }
  };

  const logout = async () => {
    if (supabase && isSupabaseConfigured) {
      await supabase.auth.signOut();
    }
    setUser(null);
    setCurrentView('landing');
    addToast('info', 'Logged out', 'You have been signed out successfully.');
  };

  const resetPassword = async (email: string): Promise<boolean> => {
    if (supabase && isSupabaseConfigured) {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin,
      });
      if (error) {
        addToast('error', 'Reset failed', error.message);
        return false;
      }
      addToast('success', 'Reset email sent', `Password recovery link dispatched to ${email}`);
      return true;
    } else {
      addToast('success', 'Recovery link sent (Local Mode)', `Check your inbox at ${email}`);
      return true;
    }
  };

  const loginDemoUser = (plan: PlanType = 'creator') => {
    const credits = plan === 'free' ? 3 : plan === 'creator' ? 30 : 100;
    const demo: UserProfile = {
      ...DEMO_USER,
      plan,
      creditsRemaining: credits - 2,
      creditsTotal: credits,
    };
    setUser(demo);
    setCurrentView('dashboard');
    addToast('success', 'Loaded Creator Account', `Active plan: ${plan.toUpperCase()} with ${credits - 2} credits.`);
  };

  // Brand Profiles limit & management
  const getPlanInfo = (plan: PlanType) => {
    return SUBSCRIPTION_PLANS.find((p) => p.id === plan) || SUBSCRIPTION_PLANS[0];
  };

  const createBrandProfile = (profileData: Omit<BrandProfile, 'id' | 'userId' | 'createdAt'>): boolean => {
    const planInfo = getPlanInfo(user?.plan || 'free');
    if (brandProfiles.length >= planInfo.brandProfilesLimit) {
      addToast(
        'error',
        'Profile Limit Reached',
        `Your ${planInfo.name} plan allows up to ${planInfo.brandProfilesLimit} brand profiles. Upgrade to add more.`
      );
      setUpgradeModalOpen(true);
      return false;
    }

    const newProfile: BrandProfile = {
      ...profileData,
      id: `brand_${Date.now()}`,
      userId: user?.id || 'usr_demo_123',
      createdAt: new Date().toISOString(),
    };

    setBrandProfiles((prev) => {
      const updated = profileData.isDefault
        ? prev.map((p) => ({ ...p, isDefault: false }))
        : prev;
      return [...updated, newProfile];
    });

    if (profileData.isDefault || !activeBrandProfile) {
      setActiveBrandProfile(newProfile);
    }

    addToast('success', 'Brand Profile Created', `Profile "${newProfile.name}" is now ready.`);
    return true;
  };

  const updateBrandProfile = (id: string, updates: Partial<BrandProfile>): boolean => {
    setBrandProfiles((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const updated = { ...p, ...updates };
          if (activeBrandProfile?.id === id) {
            setActiveBrandProfile(updated);
          }
          return updated;
        }
        if (updates.isDefault) {
          return { ...p, isDefault: false };
        }
        return p;
      })
    );
    addToast('success', 'Brand Profile Updated');
    return true;
  };

  const deleteBrandProfile = (id: string): boolean => {
    if (brandProfiles.length <= 1) {
      addToast('error', 'Cannot Delete', 'You must maintain at least one brand profile.');
      return false;
    }
    setBrandProfiles((prev) => prev.filter((p) => p.id !== id));
    if (activeBrandProfile?.id === id) {
      const remaining = brandProfiles.filter((p) => p.id !== id);
      setActiveBrandProfile(remaining[0] || null);
    }
    addToast('info', 'Profile Removed');
    return true;
  };

  // AI Content Generator
  const generateContentPack = async (params: {
    topic: string;
    niche: string;
    audience: string;
    platforms: PlatformType[];
    tone: string;
    language: string;
    videoLength: string;
    brandProfileId?: string;
  }): Promise<ContentPack | null> => {
    if (!user) {
      setAuthModalOpen(true);
      return null;
    }

    if (user.creditsRemaining <= 0) {
      addToast('error', 'No Credits Remaining', 'You have used all monthly AI credits for your current plan.');
      setUpgradeModalOpen(true);
      return null;
    }

    setIsGenerating(true);

    try {
      const brand = brandProfiles.find((b) => b.id === params.brandProfileId) || activeBrandProfile;

      const response = await fetch('/api/gemini/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...params,
          brandProfile: brand
            ? {
                name: brand.name,
                handle: brand.handle,
                tone: brand.tone,
                targetAudience: brand.targetAudience,
              }
            : null,
        }),
      });

      if (!response.ok) {
        const errorJson = await response.json();
        throw new Error(errorJson.error || 'Server error generating pack');
      }

      const result = await response.json();
      const generatedData = result.data;

      const newPack: ContentPack = {
        id: `pack_${Date.now()}`,
        userId: user.id,
        brandProfileId: brand?.id,
        topic: params.topic,
        niche: params.niche,
        targetAudience: params.audience,
        tone: params.tone,
        language: params.language,
        videoLength: params.videoLength,
        primaryPlatforms: params.platforms,
        hooks: generatedData.hooks,
        videoScript: generatedData.videoScript,
        instagramCaption: generatedData.instagramCaption,
        tiktokCaption: generatedData.tiktokCaption,
        youtubeShorts: generatedData.youtubeShorts,
        callsToAction: generatedData.callsToAction,
        hashtags: generatedData.hashtags,
        additionalContentIdeas: generatedData.additionalContentIdeas,
        publishingSchedule: generatedData.publishingSchedule,
        isFavorite: false,
        createdAt: new Date().toISOString(),
      };

      // Deduct credit
      setUser((prev) =>
        prev
          ? {
              ...prev,
              creditsRemaining: Math.max(0, prev.creditsRemaining - 1),
            }
          : null
      );

      setContentPacks((prev) => [newPack, ...prev]);
      setActivePack(newPack);

      addToast(
        'success',
        'Content Pack Generated!',
        `Full 9-part multi-platform pack ready. 1 credit deducted (${user.creditsRemaining - 1} remaining).`
      );

      return newPack;
    } catch (err: any) {
      console.error('Generation error:', err);
      addToast('error', 'Generation Error', err.message || 'Could not complete AI generation.');
      return null;
    } finally {
      setIsGenerating(false);
    }
  };

  const savePack = (pack: ContentPack) => {
    setContentPacks((prev) => {
      const exists = prev.some((p) => p.id === pack.id);
      if (exists) {
        return prev.map((p) => (p.id === pack.id ? pack : p));
      }
      return [pack, ...prev];
    });
    addToast('success', 'Saved to Content Library', `"${pack.topic.slice(0, 30)}..." saved.`);
  };

  const toggleFavoritePack = (id: string) => {
    setContentPacks((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const toggled = !p.isFavorite;
          addToast('info', toggled ? 'Added to Favorites' : 'Removed from Favorites');
          return { ...p, isFavorite: toggled };
        }
        return p;
      })
    );
  };

  const updatePack = (id: string, updates: Partial<ContentPack>) => {
    setContentPacks((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
    if (activePack?.id === id) {
      setActivePack((prev) => (prev ? { ...prev, ...updates } : null));
    }
    addToast('success', 'Content Pack Updated');
  };

  const duplicatePack = (id: string) => {
    const target = contentPacks.find((p) => p.id === id);
    if (!target) return;
    const duplicated: ContentPack = {
      ...target,
      id: `pack_${Date.now()}`,
      topic: `${target.topic} (Copy)`,
      createdAt: new Date().toISOString(),
      isFavorite: false,
    };
    setContentPacks((prev) => [duplicated, ...prev]);
    setActivePack(duplicated);
    addToast('success', 'Pack Duplicated', 'New duplicate created in library.');
  };

  const deletePack = (id: string) => {
    setContentPacks((prev) => prev.filter((p) => p.id !== id));
    if (activePack?.id === id) {
      const remaining = contentPacks.filter((p) => p.id !== id);
      setActivePack(remaining[0] || null);
    }
    addToast('info', 'Pack Deleted');
  };

  // Calendar
  const addCalendarEntry = (entryData: Omit<CalendarEntry, 'id' | 'userId' | 'createdAt'>) => {
    const newEntry: CalendarEntry = {
      ...entryData,
      id: `cal_${Date.now()}`,
      userId: user?.id || 'usr_demo_123',
      createdAt: new Date().toISOString(),
    };
    setCalendarEntries((prev) => [...prev, newEntry]);
    addToast('success', 'Post Scheduled', `Scheduled for ${entryData.scheduledDate} at ${entryData.scheduledTime}`);
  };

  const updateCalendarEntry = (id: string, updates: Partial<CalendarEntry>) => {
    setCalendarEntries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, ...updates } : e))
    );
    addToast('success', 'Schedule Updated');
  };

  const deleteCalendarEntry = (id: string) => {
    setCalendarEntries((prev) => prev.filter((e) => e.id !== id));
    addToast('info', 'Scheduled Post Removed');
  };

  const schedulePackToCalendar = (pack: ContentPack, startDate?: string) => {
    const baseDate = startDate ? new Date(startDate) : new Date();
    const newEntries: CalendarEntry[] = pack.publishingSchedule.map((item, idx) => {
      const postDate = new Date(baseDate);
      postDate.setDate(postDate.getDate() + idx);
      const dateStr = postDate.toISOString().split('T')[0];

      // Convert time string like "08:30 AM" to 24hr HH:mm
      let timeStr = '09:00';
      if (item.optimalTime) {
        const parts = item.optimalTime.match(/(\d+):(\d+)\s*(AM|PM)/i);
        if (parts) {
          let hrs = parseInt(parts[1], 10);
          const mins = parts[2];
          const ampm = parts[3].toUpperCase();
          if (ampm === 'PM' && hrs < 12) hrs += 12;
          if (ampm === 'AM' && hrs === 12) hrs = 0;
          timeStr = `${hrs.toString().padStart(2, '0')}:${mins}`;
        }
      }

      return {
        id: `cal_${Date.now()}_${idx}`,
        userId: user?.id || 'usr_demo_123',
        contentPackId: pack.id,
        title: `${pack.topic.slice(0, 36)} (${item.format})`,
        platform: item.platform,
        scheduledDate: dateStr,
        scheduledTime: timeStr,
        status: 'scheduled',
        hookPreview: pack.hooks[0]?.text || pack.topic,
        notes: item.focus,
        createdAt: new Date().toISOString(),
      };
    });

    setCalendarEntries((prev) => [...prev, ...newEntries]);
    addToast(
      'success',
      '7-Day Plan Scheduled!',
      `Added ${newEntries.length} calendar posts starting ${newEntries[0]?.scheduledDate}`
    );
    setCurrentView('calendar');
  };

  // Analytics
  const logMetric = (metricData: Omit<AnalyticsMetric, 'id' | 'userId'>) => {
    const newMetric: AnalyticsMetric = {
      ...metricData,
      id: `an_${Date.now()}`,
      userId: user?.id || 'usr_demo_123',
    };
    setAnalyticsMetrics((prev) => [newMetric, ...prev]);
    addToast('success', 'Performance Logged', `Logged metrics for "${metricData.postTitle}"`);
  };

  const deleteMetric = (id: string) => {
    setAnalyticsMetrics((prev) => prev.filter((m) => m.id !== id));
    addToast('info', 'Metric Entry Removed');
  };

  // Subscriptions & Upgrade
  const upgradePlan = async (targetPlan: PlanType): Promise<boolean> => {
    const planInfo = getPlanInfo(targetPlan);
    try {
      const res = await fetch('/api/billing/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId: targetPlan }),
      });
      const data = await res.json();

      setUser((prev) =>
        prev
          ? {
              ...prev,
              plan: targetPlan,
              creditsRemaining: planInfo.creditsPerMonth,
              creditsTotal: planInfo.creditsPerMonth,
            }
          : null
      );

      setUpgradeModalOpen(false);
      addToast(
        'success',
        `Subscribed to ${planInfo.name}!`,
        `${planInfo.creditsPerMonth} AI content packs refreshed. All tier limits unlocked.`
      );
      return true;
    } catch (err: any) {
      addToast('error', 'Checkout error', err.message);
      return false;
    }
  };

  const value: AppContextType = {
    currentView,
    setCurrentView,
    user,
    isAuthenticated: Boolean(user),
    login,
    signup,
    logout,
    resetPassword,
    loginDemoUser,
    brandProfiles,
    activeBrandProfile,
    setActiveBrandProfile,
    createBrandProfile,
    updateBrandProfile,
    deleteBrandProfile,
    contentPacks,
    activePack,
    setActivePack,
    isGenerating,
    generateContentPack,
    savePack,
    toggleFavoritePack,
    updatePack,
    duplicatePack,
    deletePack,
    calendarEntries,
    addCalendarEntry,
    updateCalendarEntry,
    deleteCalendarEntry,
    schedulePackToCalendar,
    analyticsMetrics,
    logMetric,
    deleteMetric,
    currentPlan: user?.plan || 'free',
    creditsRemaining: user?.creditsRemaining ?? 0,
    creditsTotal: user?.creditsTotal ?? 3,
    upgradePlan,
    authModalOpen,
    setAuthModalOpen,
    upgradeModalOpen,
    setUpgradeModalOpen,
    dbSetupModalOpen,
    setDbSetupModalOpen,
    toasts,
    addToast,
    removeToast,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
