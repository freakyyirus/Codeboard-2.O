-- ─── Social Feed Tables ──────────────────────────

-- 1. Follows Relationship Table
CREATE TABLE IF NOT EXISTS follows (
    follower_id text NOT NULL,
    following_id text NOT NULL,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    PRIMARY KEY (follower_id, following_id)
);

ALTER TABLE follows ENABLE ROW LEVEL SECURITY;

-- Assuming public profile visibility for simple social feed. Wait for explicit profile constraints if needed.
CREATE POLICY "Users can see all followers and following"
    ON follows FOR SELECT
    USING (true);

CREATE POLICY "Users can follow others"
    ON follows FOR INSERT
    WITH CHECK (auth.uid()::text = follower_id);

CREATE POLICY "Users can unfollow"
    ON follows FOR DELETE
    USING (auth.uid()::text = follower_id);


-- 2. Social Posts Table (Achievements, Streaks, Solves)
CREATE TABLE IF NOT EXISTS social_posts (
    id uuid DEFAULT extensions.uuid_generate_v4() PRIMARY KEY,
    user_id text NOT NULL,
    type text NOT NULL CHECK (type IN ('solved', 'streak', 'achievement', 'discussion')),
    content text,
    metadata jsonb DEFAULT '{}'::jsonb, -- Store dynamic data like { problem_name: "Merge K Sorted", difficulty: "Hard" }
    likes_count integer DEFAULT 0,
    comments_count integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE social_posts ENABLE ROW LEVEL SECURITY;

-- For MVP, posts are public to all authenticated users
CREATE POLICY "Anyone can view posts"
    ON social_posts FOR SELECT
    USING (true);

CREATE POLICY "Users can create posts"
    ON social_posts FOR INSERT
    WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can update own posts"
    ON social_posts FOR UPDATE
    USING (auth.uid()::text = user_id);

CREATE POLICY "Users can delete own posts"
    ON social_posts FOR DELETE
    USING (auth.uid()::text = user_id);
