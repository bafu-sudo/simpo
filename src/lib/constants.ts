import { SubscriptionPlanInfo, PlatformType, BrandProfile, ContentPack, CalendarEntry, AnalyticsMetric } from '../types';

export const SUBSCRIPTION_PLANS: SubscriptionPlanInfo[] = [
  {
    id: 'free',
    name: 'Free',
    priceMonthly: 0,
    description: 'Perfect for exploring CreatorFlow and kickstarting your content rhythm.',
    creditsPerMonth: 3,
    brandProfilesLimit: 1,
    features: [
      '3 AI content packs monthly',
      '1 brand profile',
      '5 viral-style hooks per pack',
      'Video script & captions (IG/TikTok/YT)',
      'Basic calendar & content library',
      'Standard generation speed',
    ],
  },
  {
    id: 'creator',
    name: 'Creator',
    priceMonthly: 5,
    description: 'For active creators looking to maintain daily consistency across multiple channels.',
    creditsPerMonth: 30,
    brandProfilesLimit: 3,
    isPopular: true,
    features: [
      '30 AI content packs monthly',
      '3 brand profiles',
      'Complete multi-platform packs',
      'Interactive weekly & monthly calendar',
      'Direct rescheduling & status tracking',
      'Manual performance analytics & charts',
      'Priority Gemini processing speed',
    ],
  },
  {
    id: 'creator_pro',
    name: 'Creator Pro',
    priceMonthly: 9,
    description: 'For professional creators, agencies, and high-growth brands dominating social.',
    creditsPerMonth: 100,
    brandProfilesLimit: 10,
    features: [
      '100 AI content packs monthly',
      '10 brand profiles',
      'Advanced 7-day publishing schedules',
      'Export to Markdown, PDF, and JSON',
      'Custom tone & persona fine-tuning',
      'Full analytics & hook type attribution',
      'Fastest generation tier & VIP support',
    ],
  },
];

export const NICHES = [
  'Tech & AI Tools',
  'Personal Finance & Investing',
  'Fitness & Wellness',
  'Entrepreneurship & Startups',
  'Marketing & Content Creation',
  'Software Development',
  'Real Estate & Property',
  'Productivity & Life Design',
  'E-commerce & Dropshipping',
  'Education & Career Coaching',
  'Food & Culinary Arts',
  'Gaming & Entertainment',
];

export const TONES = [
  { id: 'engaging_authoritative', label: 'Authoritative & Expert', desc: 'Credible, sharp, direct value delivery' },
  { id: 'high_energy_hype', label: 'High Energy & Motivating', desc: 'Punchy, inspiring, fast-paced cadence' },
  { id: 'witty_casual', label: 'Witty & Conversational', desc: 'Relatable, humorous, casual storytelling' },
  { id: 'contrarian_provocative', label: 'Contrarian & Thought-Provoking', desc: 'Challenges common industry myths' },
  { id: 'educational_stepbystep', label: 'Step-by-Step Educational', desc: 'Clear, structured, highly actionable' },
  { id: 'vulnerable_story', label: 'Vulnerable & Personal', desc: 'Authentic lessons from personal failure and triumph' },
];

export const PLATFORMS: { id: PlatformType; name: string; color: string; icon: string }[] = [
  { id: 'instagram', name: 'Instagram Reels', color: '#E1306C', icon: 'Instagram' },
  { id: 'tiktok', name: 'TikTok', color: '#00F2FE', icon: 'Video' },
  { id: 'youtube_shorts', name: 'YouTube Shorts', color: '#FF0000', icon: 'Youtube' },
  { id: 'linkedin', name: 'LinkedIn', color: '#0A66C2', icon: 'Linkedin' },
  { id: 'twitter', name: 'X / Twitter', color: '#1DA1F2', icon: 'Twitter' },
];

export const LANGUAGES = [
  'English (US)',
  'English (UK)',
  'Spanish (Español)',
  'French (Français)',
  'German (Deutsch)',
  'Portuguese (Português)',
  'Italian (Italiano)',
  'Japanese (日本語)',
  'Hindi (हिंदी)',
];

export const VIDEO_LENGTHS = [
  { id: 'quick_bite', label: '15-30s Quick Bite', desc: 'Single punchy tip, high retention' },
  { id: 'standard_short', label: '30-60s Standard Short', desc: 'Sweet spot for TikTok & Reels' },
  { id: 'deep_dive', label: '60-90s Deep Dive', desc: 'Comprehensive tutorial or mini-breakdown' },
];

export const INITIAL_BRAND_PROFILE: BrandProfile = {
  id: 'brand_default_1',
  userId: 'usr_demo_123',
  name: 'Nexus Tech Lab',
  handle: '@nexustechlab',
  niche: 'Tech & AI Tools',
  targetAudience: 'Software builders, startup founders, and productivity enthusiasts seeking AI leverage.',
  tone: 'Authoritative & Expert',
  language: 'English (US)',
  preferredPlatforms: ['instagram', 'tiktok', 'youtube_shorts', 'linkedin'],
  colorAccent: '#8b5cf6',
  isDefault: true,
  createdAt: '2026-10-15T10:00:00Z',
};

export const INITIAL_CONTENT_PACK: ContentPack = {
  id: 'pack_sample_1',
  userId: 'usr_demo_123',
  brandProfileId: 'brand_default_1',
  topic: 'Stop using ChatGPT like a search engine: The 3-prompt framework that 10x your output',
  niche: 'Tech & AI Tools',
  targetAudience: 'Knowledge workers and creators looking for real productivity gains',
  tone: 'Authoritative & Expert',
  language: 'English (US)',
  videoLength: '30-60s Standard Short',
  primaryPlatforms: ['tiktok', 'instagram', 'youtube_shorts'],
  hooks: [
    {
      id: 'h1',
      type: 'Negative Hook',
      text: 'You are wasting 90% of AI\'s capability by treating it like Google. Here is what pros do instead.',
      retentionNote: 'Triggers instant fear of missing out and challenges common habitual behavior.'
    },
    {
      id: 'h2',
      type: 'Curious Question',
      text: 'Why do two people give ChatGPT the same task and one gets gold while the other gets generic fluff?',
      retentionNote: 'Sets up an immediate mystery that viewer needs resolved.'
    },
    {
      id: 'h3',
      type: 'Contrarian Take',
      text: 'Prompt engineering courses are dead. You only need this 3-step conversation rule.',
      retentionNote: 'High contrarian tension against existing saturated marketing.'
    },
    {
      id: 'h4',
      type: 'Insider Secret',
      text: 'The one prompting constraint senior AI engineers use that nobody talks about on Twitter.',
      retentionNote: 'Appeals to insider status and curiosity.'
    },
    {
      id: 'h5',
      type: 'Before/After Transformation',
      text: 'I went from rewriting AI garbage for 2 hours to shipping entire workflows in 4 minutes.',
      retentionNote: 'Clear measurable outcome anchored to time savings.'
    }
  ],
  videoScript: {
    durationSeconds: 45,
    hook: 'You are wasting 90% of AI\'s capability by treating it like Google. Stop asking single questions. Here is the 3-step conversation rule pros use.',
    problemSetup: 'Most people type: "Write me an email about X." The AI guesses in the dark and hands you boring corporate template soup.',
    valuePoints: [
      {
        pointNumber: 1,
        timestamp: '0:12',
        talkingPoint: 'Step 1: Role & Persona Inversion. Don\'t say write X. Tell it: "Act as a ruthless Y-Combinator partner auditing my pitch deck."',
        visualCue: 'Screen recording showing system prompt with dramatic red highlight.'
      },
      {
        pointNumber: 2,
        timestamp: '0:24',
        talkingPoint: 'Step 2: Negative Constraints. Always state what NOT to do. "No buzzwords, no passive voice, maximum 120 words."',
        visualCue: 'Handheld phone angle with text overlay: "BANNED: Synergies, Delve, Crucial".'
      },
      {
        pointNumber: 3,
        timestamp: '0:34',
        talkingPoint: 'Step 3: The Iterative Critique. Before accepting output, tell it: "Critique your answer against top 1% industry standards and rewrite."',
        visualCue: 'Split screen showing draft vs final polished output side by side.'
      }
    ],
    climaxOrTakeaway: 'When you make the AI refine its own logic, the quality jumps 5x with zero extra work.',
    callToAction: 'Save this post right now so you have the exact prompt cheat sheet next time you open your terminal.'
  },
  instagramCaption: {
    caption: `Most people are using AI backwards 🤖❌\n\nIf your AI outputs still feel robotic and hollow, you're treating it like a search engine instead of an iterative collaborator.\n\nSwipe through the 3-tier prompting framework that turns mediocre first drafts into production-ready assets in under 3 minutes:\n\n1️⃣ Role Inversion (Set extreme context)\n2️⃣ Negative Guardrails (Ban empty buzzwords)\n3️⃣ Self-Critique Loop (Prompt the AI to challenge its own answers)\n\nWhich mistake were you making the most? Drop 1, 2, or 3 below 👇`,
    firstCommentHashtags: '#creatorflow #aitools #contentcreation #productivityhacks #solopreneur #promptengineering #techcreator'
  },
  tiktokCaption: {
    caption: 'stop using AI like google. the 3-step rule that actually 10x your output ⚡️ save this before your next project #aitools #productivity #creators #techtok',
    soundSuggestion: 'Trending Minimal Electronic / Lo-Fi Beat with subtle bass drop at 0:12'
  },
  youtubeShorts: {
    title: 'Stop Using AI Like Google (The 3-Step Pro Framework)',
    description: 'Stop getting generic robotic outputs. In this 45-second breakdown, discover the 3-step iterative prompt framework that senior engineers use to get 10x better results.\n\nSubscribe for daily creator workflows!',
    pinnedComment: 'Which prompt step surprised you most? Drop your current AI challenge below and I’ll write your prompt!'
  },
  callsToAction: [
    {
      type: 'save',
      label: 'Save for later',
      text: 'Bookmark this post now so you have the exact prompt syntax ready for tomorrow morning.'
    },
    {
      type: 'engagement',
      label: 'Comment trigger',
      text: 'Comment "PROMPT" below and I\'ll send you my Notion template with all 20 tested constraints.'
    },
    {
      type: 'follow',
      label: 'Profile follow',
      text: 'Follow for daily breakdowns turning complex tech tools into unfair creator advantages.'
    },
    {
      type: 'link_in_bio',
      label: 'Bio link click',
      text: 'Grab the full free CreatorFlow 7-day content operating system from the link in our bio.'
    }
  ],
  hashtags: {
    broad: ['#contentcreation', '#socialmediatips', '#creatorflow', '#digitalmarketing', '#productivity'],
    niche: ['#aitoolsforcreators', '#promptengineering', '#techcreator', '#videoworkflow', '#microcontent'],
    community: ['#buildinpublic', '#creatorsunite', '#techcommunity', '#indiehackers']
  },
  additionalContentIdeas: [
    {
      title: '5 AI tools I actually pay for every month (and 3 I cancelled)',
      angle: 'Honest review & ROI breakdown for creator software',
      format: '60s Carousel & Video'
    },
    {
      title: 'How I turn 1 podcast recording into 14 shorts using AI transcription',
      angle: 'Repurposing workflow with concrete step-by-step pipeline',
      format: '45s Screen tutorial'
    },
    {
      title: 'The "Anti-AI" test: How to make sure your audience never tunes out',
      angle: 'Humanizing your content voice and maintaining authenticity',
      format: '30s High-energy talking head'
    },
    {
      title: 'Why 99% of creator courses won\'t work in 2026',
      angle: 'Industry prediction & shift towards hyper-specific niche expertise',
      format: '45s Contrarian monologue'
    },
    {
      title: 'My exact daily content batching calendar (1 idea → 7 days)',
      angle: 'Behind the scenes operational breakdown of scheduling',
      format: '60s Studio desk tour'
    }
  ],
  publishingSchedule: [
    {
      day: 'Day 1',
      dayName: 'Monday',
      optimalTime: '08:30 AM',
      platform: 'tiktok',
      format: 'Short Video (30s)',
      focus: 'Primary Hook 1 (Negative Hook) + Core Script'
    },
    {
      day: 'Day 2',
      dayName: 'Tuesday',
      optimalTime: '12:15 PM',
      platform: 'instagram',
      format: 'Reel + Carousel',
      focus: 'Visual Infographic slide deck on the 3 prompt steps'
    },
    {
      day: 'Day 3',
      dayName: 'Wednesday',
      optimalTime: '04:00 PM',
      platform: 'youtube_shorts',
      format: 'YouTube Short',
      focus: 'High-energy cut with pinned comment community prompt'
    },
    {
      day: 'Day 4',
      dayName: 'Thursday',
      optimalTime: '09:00 AM',
      platform: 'linkedin',
      format: 'Text + PDF Carousel',
      focus: 'Professional case study angle on team productivity'
    },
    {
      day: 'Day 5',
      dayName: 'Friday',
      optimalTime: '02:30 PM',
      platform: 'twitter',
      format: 'Thread (7 tweets)',
      focus: 'Deep dive breakdown of negative prompt constraints'
    },
    {
      day: 'Day 6',
      dayName: 'Saturday',
      optimalTime: '11:00 AM',
      platform: 'instagram',
      format: 'Story Poll & Q&A',
      focus: 'Audience prompt troubleshooting & live critique'
    },
    {
      day: 'Day 7',
      dayName: 'Sunday',
      optimalTime: '07:00 PM',
      platform: 'tiktok',
      format: 'Duet / Reaction Short',
      focus: 'Contrarian follow-up answering top comment from Monday'
    }
  ],
  isFavorite: true,
  createdAt: '2026-10-28T14:30:00Z',
};

export const INITIAL_CALENDAR_ENTRIES: CalendarEntry[] = [
  {
    id: 'cal_1',
    userId: 'usr_demo_123',
    contentPackId: 'pack_sample_1',
    title: 'Stop using AI like Google (TikTok)',
    platform: 'tiktok',
    scheduledDate: '2026-11-02',
    scheduledTime: '08:30',
    status: 'scheduled',
    hookPreview: 'You are wasting 90% of AI\'s capability by treating it like Google...',
    createdAt: '2026-10-28T14:35:00Z',
  },
  {
    id: 'cal_2',
    userId: 'usr_demo_123',
    contentPackId: 'pack_sample_1',
    title: '3-Step Prompt Framework (IG Reel)',
    platform: 'instagram',
    scheduledDate: '2026-11-03',
    scheduledTime: '12:15',
    status: 'scheduled',
    hookPreview: 'Most people are using AI backwards 🤖❌',
    createdAt: '2026-10-28T14:35:00Z',
  },
  {
    id: 'cal_3',
    userId: 'usr_demo_123',
    contentPackId: 'pack_sample_1',
    title: 'YouTube Short: 3-Step Pro Framework',
    platform: 'youtube_shorts',
    scheduledDate: '2026-11-04',
    scheduledTime: '16:00',
    status: 'scheduled',
    hookPreview: 'Why do two people give ChatGPT the same task and one gets gold?',
    createdAt: '2026-10-28T14:35:00Z',
  },
  {
    id: 'cal_4',
    userId: 'usr_demo_123',
    title: '5 AI tools I actually pay for (Deep Dive)',
    platform: 'youtube_shorts',
    scheduledDate: '2026-10-30',
    scheduledTime: '17:30',
    status: 'published',
    hookPreview: 'I test 40 AI tools a week. These are the only 5 that earn their keep.',
    createdAt: '2026-10-24T11:00:00Z',
  },
  {
    id: 'cal_5',
    userId: 'usr_demo_123',
    title: 'The Anti-AI Authenticity Blueprint',
    platform: 'instagram',
    scheduledDate: '2026-10-26',
    scheduledTime: '11:00',
    status: 'published',
    hookPreview: 'If your audience can tell an AI wrote your script, you have already lost.',
    createdAt: '2026-10-22T09:15:00Z',
  },
];

export const INITIAL_ANALYTICS: AnalyticsMetric[] = [
  {
    id: 'an_1',
    userId: 'usr_demo_123',
    postTitle: '5 AI Tools I Actually Pay For',
    platform: 'youtube_shorts',
    publishedDate: '2026-10-30',
    views: 48200,
    likes: 3840,
    comments: 290,
    shares: 615,
    followersGained: 420,
    hookTypeUsed: 'Insider Secret',
  },
  {
    id: 'an_2',
    userId: 'usr_demo_123',
    postTitle: 'The Anti-AI Authenticity Blueprint',
    platform: 'instagram',
    publishedDate: '2026-10-26',
    views: 32600,
    likes: 2410,
    comments: 185,
    shares: 512,
    followersGained: 285,
    hookTypeUsed: 'Contrarian Take',
  },
  {
    id: 'an_3',
    userId: 'usr_demo_123',
    postTitle: 'Why Prompt Engineering Is Dying in 2026',
    platform: 'tiktok',
    publishedDate: '2026-10-20',
    views: 64100,
    likes: 5890,
    comments: 440,
    shares: 1120,
    followersGained: 690,
    hookTypeUsed: 'Negative Hook',
  },
  {
    id: 'an_4',
    userId: 'usr_demo_123',
    postTitle: 'The 10-Minute Sunday Creator Setup',
    platform: 'instagram',
    publishedDate: '2026-10-14',
    views: 28400,
    likes: 1950,
    comments: 140,
    shares: 380,
    followersGained: 210,
    hookTypeUsed: 'Before/After Transformation',
  },
];

export const SUPABASE_SQL_SCHEMA = `-- ========================================================
-- CreatorFlow Database Schema & Row Level Security (RLS)
-- Run this in your Supabase SQL Editor to create all tables
-- ========================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. PROFILES TABLE
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  full_name text,
  avatar_url text,
  plan text default 'free' check (plan in ('free', 'creator', 'creator_pro')),
  credits_remaining integer default 3,
  credits_total integer default 3,
  credits_reset_date timestamp with time zone default (now() + interval '30 days'),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- 2. BRAND PROFILES TABLE
create table if not exists public.brand_profiles (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade not null,
  name text not null,
  handle text,
  niche text not null,
  target_audience text,
  tone text default 'Authoritative & Expert',
  language text default 'English (US)',
  preferred_platforms text[] default array['instagram', 'tiktok', 'youtube_shorts'],
  color_accent text default '#8b5cf6',
  is_default boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.brand_profiles enable row level security;

create policy "Users can view own brand profiles"
  on public.brand_profiles for select
  using (auth.uid() = user_id);

create policy "Users can insert own brand profiles"
  on public.brand_profiles for insert
  with check (auth.uid() = user_id);

create policy "Users can update own brand profiles"
  on public.brand_profiles for update
  using (auth.uid() = user_id);

create policy "Users can delete own brand profiles"
  on public.brand_profiles for delete
  using (auth.uid() = user_id);

-- 3. CONTENT PACKS TABLE
create table if not exists public.content_packs (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade not null,
  brand_id uuid references public.brand_profiles on delete set null,
  topic text not null,
  niche text not null,
  target_audience text,
  tone text not null,
  language text default 'English (US)',
  video_length text default '30-60s Standard Short',
  primary_platforms text[] not null,
  hooks jsonb not null default '[]'::jsonb,
  video_script jsonb not null default '{}'::jsonb,
  captions jsonb not null default '{}'::jsonb,
  calls_to_action jsonb not null default '[]'::jsonb,
  hashtags jsonb not null default '{}'::jsonb,
  additional_ideas jsonb not null default '[]'::jsonb,
  publishing_schedule jsonb not null default '[]'::jsonb,
  is_favorite boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.content_packs enable row level security;

create policy "Users can manage own content packs"
  on public.content_packs for all
  using (auth.uid() = user_id);

-- 4. CALENDAR ENTRIES TABLE
create table if not exists public.calendar_entries (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade not null,
  content_pack_id uuid references public.content_packs on delete set null,
  title text not null,
  platform text not null,
  scheduled_date date not null,
  scheduled_time time not null,
  status text default 'scheduled' check (status in ('draft', 'scheduled', 'published')),
  notes text,
  hook_preview text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.calendar_entries enable row level security;

create policy "Users can manage own calendar entries"
  on public.calendar_entries for all
  using (auth.uid() = user_id);

-- 5. AI USAGE TABLE
create table if not exists public.ai_usage (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade not null,
  action text not null,
  prompt_summary text,
  tokens_estimated integer,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.ai_usage enable row level security;

create policy "Users can view own AI usage"
  on public.ai_usage for select
  using (auth.uid() = user_id);

-- 6. SUBSCRIPTIONS TABLE
create table if not exists public.subscriptions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade not null unique,
  plan_id text not null check (plan_id in ('free', 'creator', 'creator_pro')),
  status text not null default 'active',
  current_period_end timestamp with time zone,
  cancel_at_period_end boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.subscriptions enable row level security;

create policy "Users can view own subscription"
  on public.subscriptions for select
  using (auth.uid() = user_id);

-- 7. PAYMENT RECORDS TABLE
create table if not exists public.payment_records (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade not null,
  amount numeric(10, 2) not null,
  currency text default 'USD',
  status text not null,
  provider text not null default 'stripe',
  transaction_id text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.payment_records enable row level security;

create policy "Users can view own payment records"
  on public.payment_records for select
  using (auth.uid() = user_id);

-- Auto-create profile trigger on auth.users sign-up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, plan, credits_remaining, credits_total)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'full_name', 'Creator'), 'free', 3, 3);
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
`;
