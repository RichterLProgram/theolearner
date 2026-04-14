-- =============================================================================
-- MIGRATION: Add Weekly Chapter Structure
-- =============================================================================
-- This migration adds support for organizing exercises by weeks/chapters
-- All existing exercises are assigned to Week 1

-- Step 1: Create chapters table
create table if not exists chapters (
  id uuid primary key default uuid_generate_v4(),
  week_number integer not null,
  title text not null,
  description text,
  created_at timestamp with time zone default now(),
  unique(week_number)
);

-- Step 2: Add chapter_id to exercises table
alter table exercises add column if not exists chapter_id uuid references chapters(id) on delete cascade;

-- Step 3: Add index for performance
create index if not exists exercises_chapter_id_idx on exercises(chapter_id);

-- Step 4: Insert Week 1
insert into chapters (week_number, title, description) values
  (1, 'Woche 1 – Formale Sprachen', 'Verstehe die Grundlagen formaler Sprachen, regulärer Ausdrücke und Wortoperationen')
on conflict do nothing;

-- Step 5: Update all existing exercises to belong to Week 1
update exercises 
set chapter_id = (select id from chapters where week_number = 1)
where chapter_id is null;

-- Step 6: Create leaderboard view with chapter info (if needed for future)
create or replace view chapters_with_exercise_count as
select 
  c.id,
  c.week_number,
  c.title,
  c.description,
  count(e.id) as exercise_count,
  count(case when e.difficulty = 1 then 1 end) as easy_count,
  count(case when e.difficulty = 2 then 1 end) as medium_count,
  count(case when e.difficulty = 3 then 1 end) as hard_count
from chapters c
left join exercises e on c.id = e.chapter_id
group by c.id, c.week_number, c.title, c.description
order by c.week_number;

-- =============================================================================
-- HOW TO APPLY THIS MIGRATION IN SUPABASE:
-- =============================================================================
-- 1. Go to: https://supabase.com/dashboard/project/xrvgyixhnplxxhfctxia/sql/new
-- 2. Copy and paste ONLY the CREATE/ALTER/INSERT statements (lines 6-35)
-- 3. Click "Run" and wait for success ✅
-- 4. Done! The exercises are now organized by week.
-- =============================================================================
