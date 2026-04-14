-- Enable extensions
create extension if not exists "uuid-ossp";

-- Topics table
create table if not exists topics (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  category text,
  exercise_count integer default 0,
  difficulty_level integer default 1,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Exercises table
create table if not exists exercises (
  id uuid primary key default uuid_generate_v4(),
  topic_id uuid references topics(id) on delete cascade,
  part text not null, -- 'A', 'B', 'C', 'D'
  "order" integer not null,
  question text not null,
  options jsonb not null, -- Array of strings
  correct_answer integer not null,
  explanation text not null,
  difficulty integer not null default 1, -- 1=Easy, 2=Medium, 3=Hard
  xp_reward integer not null default 15,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- User profiles (extended)
create table if not exists user_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique,
  display_name text,
  avatar_url text,
  bio text,
  total_xp integer default 0,
  current_level integer default 1,
  streak integer default 0,
  last_activity timestamp with time zone,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- User progress
create table if not exists user_progress (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  exercise_id uuid not null references exercises(id) on delete cascade,
  is_completed boolean default false,
  score integer default 0,
  attempts integer default 0,
  selected_option integer,
  xp_earned integer default 0,
  last_attempt timestamp with time zone default now(),
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  unique(user_id, exercise_id)
);

-- Achievements table
create table if not exists achievements (
  id uuid primary key default uuid_generate_v4(),
  name text not null unique,
  description text,
  icon text,
  unlock_condition text, -- JSON description of condition
  xp_bonus integer default 0,
  created_at timestamp with time zone default now()
);

-- User achievements (track unlocks)
create table if not exists user_achievements (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  achievement_id uuid not null references achievements(id) on delete cascade,
  unlocked_at timestamp with time zone default now(),
  unique(user_id, achievement_id)
);

-- Leaderboard view (cached)
create or replace view leaderboard_view as
select 
  up.id,
  ap.id as user_id,
  ap.username,
  ap.display_name,
  ap.avatar_url,
  ap.current_level,
  ap.total_xp,
  count(distinct up.exercise_id) as exercises_completed,
  round(100.0 * count(case when up.is_completed then 1 end) / nullif(count(up.exercise_id), 0), 2) as accuracy_percent
from user_profiles ap
left join user_progress up on ap.id = up.user_id
group by ap.id, up.id
order by ap.total_xp desc;

-- Enable RLS on all tables
alter table user_profiles enable row level security;
alter table user_progress enable row level security;
alter table user_achievements enable row level security;

-- RLS Policies
-- User profiles - anyone can read public profiles
create policy "user_profiles_select" on user_profiles
  for select using (true);

-- User profiles - users can update their own profile
create policy "user_profiles_update" on user_profiles
  for update using (auth.uid() = id);

-- User progress - users can read their own
create policy "user_progress_select" on user_progress
  for select using (auth.uid() = user_id);

-- User progress - users can insert their own
create policy "user_progress_insert" on user_progress
  for insert with check (auth.uid() = user_id);

-- User progress - users can update their own
create policy "user_progress_update" on user_progress
  for update using (auth.uid() = user_id);

-- User achievements - users can read their own
create policy "user_achievements_select" on user_achievements
  for select using (auth.uid() = user_id);

-- Create indexes for performance
create index if not exists exercises_topic_id_idx on exercises(topic_id);
create index if not exists exercises_order_idx on exercises("order");
create index if not exists user_progress_user_id_idx on user_progress(user_id);
create index if not exists user_progress_exercise_id_idx on user_progress(exercise_id);
create index if not exists user_achievements_user_id_idx on user_achievements(user_id);
