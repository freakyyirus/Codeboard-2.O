-- User Notebooks Table for Code Notes & Journal
-- Migration: 20260411

CREATE TABLE IF NOT EXISTS user_notebooks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  content jsonb DEFAULT '{}',
  is_public boolean DEFAULT false,
  tags text[] DEFAULT '{}',
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- RLS
ALTER TABLE user_notebooks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own notebooks"
  ON user_notebooks FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create notebooks"
  ON user_notebooks FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own notebooks"
  ON user_notebooks FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own notebooks"
  ON user_notebooks FOR DELETE
  USING (auth.uid() = user_id);

-- Public notebooks can be viewed by anyone
CREATE POLICY "Anyone can view public notebooks"
  ON user_notebooks FOR SELECT
  USING (is_public = true);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_notebooks_user_id ON user_notebooks(user_id);
CREATE INDEX IF NOT EXISTS idx_notebooks_updated ON user_notebooks(updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_notebooks_public ON user_notebooks(is_public) WHERE is_public = true;