-- PRODUCTION SCHEMA V2 MIGRATION
-- Cleans up "Demo" schema and applies full "GOAT" Architecture

-- 1. DROP OLD DEMO TABLES (If they exist)
DROP TABLE IF EXISTS rating_history CASCADE;
DROP TABLE IF EXISTS activity_log CASCADE;
DROP TABLE IF EXISTS platform_connections CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;

-- 2. CREATE ENUMS
DO $$ BEGIN
    CREATE TYPE skill_level AS ENUM ('beginner', 'intermediate', 'advanced');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE platform AS ENUM ('leetcode', 'codeforces', 'codechef', 'geeksforgeeks', 'hackerrank');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE difficulty AS ENUM ('easy', 'medium', 'hard');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE ai_request_type AS ENUM ('debug', 'explain', 'hint', 'optimize');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE theme AS ENUM ('dark', 'light', 'system');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE keybinding AS ENUM ('vscode', 'vim', 'emacs');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE language AS ENUM ('cpp', 'python', 'java', 'javascript', 'typescript', 'go', 'rust');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE notification_type AS ENUM ('achievement', 'reminder', 'contest_alert', 'streak_warning', 'system');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;


-- 3. CREATE TABLES

-- USERS (Linked to auth.users)
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email varchar,
  username varchar UNIQUE,
  full_name varchar,
  avatar_url text,
  skill_level skill_level DEFAULT 'beginner',
  daily_goal integer DEFAULT 2,
  timezone varchar DEFAULT 'UTC',
  streak_count integer DEFAULT 0,
  longest_streak integer DEFAULT 0,
  last_active date,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- PROBLEMS (Global Repository)
CREATE TABLE IF NOT EXISTS problems (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  platform platform NOT NULL,
  external_id varchar NOT NULL,
  title varchar NOT NULL,
  title_slug varchar,
  description text,
  difficulty difficulty,
  tags varchar[],
  url varchar NOT NULL,
  rating integer,
  acceptance_rate decimal,
  is_premium boolean DEFAULT false,
  has_solution boolean DEFAULT false,
  cached_at timestamp with time zone DEFAULT now(),
  UNIQUE(platform, external_id)
);
CREATE INDEX IF NOT EXISTS idx_problems_platform ON problems(platform);
CREATE INDEX IF NOT EXISTS idx_problems_difficulty ON problems(difficulty);
CREATE INDEX IF NOT EXISTS idx_problems_tags ON problems USING gin(tags);

-- SOLVES (User History)
CREATE TABLE IF NOT EXISTS solves (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  problem_id uuid REFERENCES problems(id) ON DELETE CASCADE NOT NULL,
  platform platform NOT NULL,
  solved_at timestamp with time zone DEFAULT now(),
  time_taken integer, -- minutes
  code_snippet text,
  is_practice boolean DEFAULT true,
  notes text,
  UNIQUE(user_id, problem_id)
);
CREATE INDEX IF NOT EXISTS idx_solves_user ON solves(user_id);
CREATE INDEX IF NOT EXISTS idx_solves_date ON solves(solved_at);

-- CONTESTS (Calendar)
CREATE TABLE IF NOT EXISTS contests (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  platform platform NOT NULL,
  external_id varchar,
  name varchar NOT NULL,
  url varchar NOT NULL,
  start_time timestamp with time zone,
  duration_minutes integer,
  is_virtual boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_contests_start ON contests(start_time);

-- DSA SHEETS (Curated Lists)
CREATE TABLE IF NOT EXISTS dsa_sheets (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name varchar NOT NULL,
  description text,
  total_days integer,
  is_premium boolean DEFAULT false,
  is_official boolean DEFAULT false,
  created_by uuid REFERENCES users(id),
  created_at timestamp with time zone DEFAULT now()
);

-- SHEET PROBLEMS (Many-to-Many)
CREATE TABLE IF NOT EXISTS sheet_problems (
  sheet_id uuid REFERENCES dsa_sheets(id) ON DELETE CASCADE,
  problem_id uuid REFERENCES problems(id) ON DELETE CASCADE,
  day_number integer,
  topic varchar,
  order_index integer,
  PRIMARY KEY (sheet_id, problem_id)
);

-- USER SHEET PROGRESS
CREATE TABLE IF NOT EXISTS user_sheet_progress (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  sheet_id uuid REFERENCES dsa_sheets(id) ON DELETE CASCADE NOT NULL,
  current_day integer DEFAULT 1,
  completed_problems integer DEFAULT 0,
  total_problems integer,
  is_completed boolean DEFAULT false,
  started_at timestamp with time zone DEFAULT now(),
  completed_at timestamp with time zone,
  UNIQUE(user_id, sheet_id)
);

-- AI USAGE (Rate Limiting & History)
CREATE TABLE IF NOT EXISTS ai_usage (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  request_type ai_request_type NOT NULL,
  model varchar,
  tokens_used integer,
  latency_ms integer,
  created_at timestamp with time zone DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_ai_usage_user ON ai_usage(user_id);

-- NOTIFICATIONS
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  type notification_type NOT NULL,
  title varchar NOT NULL,
  message text,
  is_read boolean DEFAULT false,
  action_url varchar,
  created_at timestamp with time zone DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_notifications_user_read ON notifications(user_id, is_read);


-- 4. ENABLE RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE problems ENABLE ROW LEVEL SECURITY;
ALTER TABLE solves ENABLE ROW LEVEL SECURITY;
ALTER TABLE contests ENABLE ROW LEVEL SECURITY;
ALTER TABLE dsa_sheets ENABLE ROW LEVEL SECURITY;
ALTER TABLE sheet_problems ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_sheet_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- 5. RLS POLICIES

-- Users
CREATE POLICY "Public read profiles" ON users FOR SELECT USING (true);
CREATE POLICY "Update own profile" ON users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Insert own profile" ON users FOR INSERT WITH CHECK (auth.uid() = id);

-- Problems (Public)
CREATE POLICY "Public read problems" ON problems FOR SELECT USING (true);

-- Solves (Private)
CREATE POLICY "View own solves" ON solves FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Insert own solves" ON solves FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Update own solves" ON solves FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Delete own solves" ON solves FOR DELETE USING (auth.uid() = user_id);

-- Contests (Public)
CREATE POLICY "Public read contests" ON contests FOR SELECT USING (true);

-- DSA Sheets (Public Read)
CREATE POLICY "Public read sheets" ON dsa_sheets FOR SELECT USING (true);
CREATE POLICY "Public read sheet problems" ON sheet_problems FOR SELECT USING (true);

-- AI Usage (Private)
CREATE POLICY "View own AI usage" ON ai_usage FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Insert own AI usage" ON ai_usage FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Notifications (Private)
CREATE POLICY "View own notifications" ON notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Update own notifications" ON notifications FOR UPDATE USING (auth.uid() = user_id);


-- 6. FUNCTIONS & TRIGGERS (Gamification)

-- Function: Handle New User (Auto-create profile)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name, avatar_url)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger: On Auth User Created
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();


-- Function: Update Streak
CREATE OR REPLACE FUNCTION update_streak()
RETURNS TRIGGER AS $$
DECLARE
  last_solve_date date;
  current_streak integer;
BEGIN
  SELECT last_active, streak_count INTO last_solve_date, current_streak
  FROM users WHERE id = NEW.user_id;
  
  -- If first solve today
  IF last_solve_date IS NULL OR last_solve_date < CURRENT_DATE THEN
      IF last_solve_date = CURRENT_DATE - INTERVAL '1 day' THEN
         -- Streak continues
         UPDATE users SET streak_count = current_streak + 1, last_active = CURRENT_DATE, longest_streak = GREATEST(longest_streak, current_streak + 1) WHERE id = NEW.user_id;
      ELSE
         -- Streak reset (or new)
         UPDATE users SET streak_count = 1, last_active = CURRENT_DATE, longest_streak = GREATEST(longest_streak, 1) WHERE id = NEW.user_id;
      END IF;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql security definer;

CREATE OR REPLACE TRIGGER streak_trigger
  AFTER INSERT ON solves
  FOR EACH ROW
  EXECUTE FUNCTION update_streak();


-- Function: Check Daily Goal
CREATE OR REPLACE FUNCTION check_daily_goal()
RETURNS TRIGGER AS $$
DECLARE
  daily_count integer;
  user_goal integer;
BEGIN
  SELECT daily_goal INTO user_goal FROM users WHERE id = NEW.user_id;
  
  SELECT COUNT(*) INTO daily_count FROM solves
  WHERE user_id = NEW.user_id AND solved_at >= CURRENT_DATE;
    
  IF daily_count = user_goal THEN
    INSERT INTO notifications (user_id, type, title, message)
    VALUES (NEW.user_id, 'achievement', 'Daily Goal Reached! 🎯', format('You''ve solved %s problems today. Keep it up!', daily_count));
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql security definer;

CREATE OR REPLACE TRIGGER daily_goal_trigger
  AFTER INSERT ON solves
  FOR EACH ROW
  EXECUTE FUNCTION check_daily_goal();
