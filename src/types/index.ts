export type PlanType = 'free' | 'creator' | 'creator_pro';

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  plan: PlanType;
  creditsRemaining: number;
  creditsTotal: number;
  creditsResetDate: string;
  createdAt: string;
}

export type PlatformType = 'instagram' | 'tiktok' | 'youtube_shorts' | 'linkedin' | 'twitter';

export interface BrandProfile {
  id: string;
  userId: string;
  name: string;
  handle: string;
  niche: string;
  targetAudience: string;
  tone: string;
  language: string;
  preferredPlatforms: PlatformType[];
  colorAccent: string;
  isDefault: boolean;
  createdAt: string;
}

export interface ContentHook {
  id: string;
  type: string; // e.g. "Negative Hook", "Curious Question", "Contrarian Take", "Insider Secret", "Transformation"
  text: string;
  retentionNote: string;
}

export interface VideoScript {
  durationSeconds: number;
  hook: string;
  problemSetup: string;
  valuePoints: {
    pointNumber: number;
    timestamp: string;
    talkingPoint: string;
    visualCue: string;
  }[];
  climaxOrTakeaway: string;
  callToAction: string;
}

export interface ContentPack {
  id: string;
  userId: string;
  brandProfileId?: string;
  topic: string;
  niche: string;
  targetAudience: string;
  tone: string;
  language: string;
  videoLength: string;
  primaryPlatforms: PlatformType[];
  
  // Deliverables
  hooks: ContentHook[];
  videoScript: VideoScript;
  instagramCaption: {
    caption: string;
    firstCommentHashtags: string;
  };
  tiktokCaption: {
    caption: string;
    soundSuggestion: string;
  };
  youtubeShorts: {
    title: string;
    description: string;
    pinnedComment: string;
  };
  callsToAction: {
    type: 'engagement' | 'save' | 'follow' | 'link_in_bio';
    label: string;
    text: string;
  }[];
  hashtags: {
    broad: string[];
    niche: string[];
    community: string[];
  };
  additionalContentIdeas: {
    title: string;
    angle: string;
    format: string;
  }[];
  publishingSchedule: {
    day: string; // Day 1, Day 2 etc
    dayName: string; // Monday, Tuesday etc
    optimalTime: string;
    platform: PlatformType;
    format: string;
    focus: string;
  }[];
  
  isFavorite: boolean;
  createdAt: string;
}

export interface CalendarEntry {
  id: string;
  userId: string;
  contentPackId?: string;
  title: string;
  platform: PlatformType;
  scheduledDate: string; // YYYY-MM-DD
  scheduledTime: string; // HH:mm
  status: 'draft' | 'scheduled' | 'published';
  notes?: string;
  hookPreview?: string;
  createdAt: string;
}

export interface AnalyticsMetric {
  id: string;
  userId: string;
  postTitle: string;
  platform: PlatformType;
  publishedDate: string;
  views: number;
  likes: number;
  comments: number;
  shares: number;
  followersGained: number;
  hookTypeUsed?: string;
}

export interface SubscriptionPlanInfo {
  id: PlanType;
  name: string;
  priceMonthly: number;
  description: string;
  creditsPerMonth: number;
  brandProfilesLimit: number;
  features: string[];
  isPopular?: boolean;
}
