-- ============================================================
-- CodeBoard 2.O — Phase 2 Migration: New Tables
-- Run this in Supabase SQL Editor
-- ============================================================

-- ─── Platform Connections ────────────────────────
CREATE TABLE IF NOT EXISTS platform_connections (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    platform text NOT NULL,
    username text NOT NULL,
    last_synced timestamptz DEFAULT now(),
    created_at timestamptz DEFAULT now(),
    UNIQUE(user_id, platform)
);

ALTER TABLE platform_connections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own connections"
    ON platform_connections FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own connections"
    ON platform_connections FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own connections"
    ON platform_connections FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own connections"
    ON platform_connections FOR DELETE
    USING (auth.uid() = user_id);

-- ─── Feedback Table ──────────────────────────────
CREATE TABLE IF NOT EXISTS feedback (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
    category text NOT NULL DEFAULT 'feedback',
    message text NOT NULL,
    created_at timestamptz DEFAULT now()
);

ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert feedback"
    ON feedback FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own feedback"
    ON feedback FOR SELECT
    USING (auth.uid() = user_id);

-- ─── Update skill_level enum (if using enum) ─────
-- If skill_level column uses a custom enum type:
-- ALTER TYPE skill_level ADD VALUE IF NOT EXISTS 'expert';
-- If it's just a varchar, no change needed.
