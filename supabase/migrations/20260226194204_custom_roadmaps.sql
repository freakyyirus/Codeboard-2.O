-- ─── Roadmaps Table ──────────────────────────────
CREATE TABLE IF NOT EXISTS user_roadmaps (
    id text PRIMARY KEY,
    user_id text NOT NULL,
    title text NOT NULL,
    description text,
    icon text,
    color text,
    category text DEFAULT 'Custom',
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE user_roadmaps ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert their own roadmaps"
    ON user_roadmaps FOR INSERT
    WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can view own roadmaps"
    ON user_roadmaps FOR SELECT
    USING (auth.uid()::text = user_id);

CREATE POLICY "Users can update own roadmaps"
    ON user_roadmaps FOR UPDATE
    USING (auth.uid()::text = user_id);

CREATE POLICY "Users can delete own roadmaps"
    ON user_roadmaps FOR DELETE
    USING (auth.uid()::text = user_id);

-- ─── Roadmap Steps Table ──────────────────────────
CREATE TABLE IF NOT EXISTS roadmap_steps (
    id text PRIMARY KEY,
    roadmap_id text REFERENCES user_roadmaps(id) ON DELETE CASCADE,
    title text NOT NULL,
    description text,
    status text DEFAULT 'pending',
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE roadmap_steps ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert steps for own roadmaps"
    ON roadmap_steps FOR INSERT
    WITH CHECK (EXISTS (
        SELECT 1 FROM user_roadmaps
        WHERE user_roadmaps.id = roadmap_steps.roadmap_id
        AND user_roadmaps.user_id = auth.uid()::text
    ));

CREATE POLICY "Users can view steps of own roadmaps"
    ON roadmap_steps FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM user_roadmaps
        WHERE user_roadmaps.id = roadmap_steps.roadmap_id
        AND user_roadmaps.user_id = auth.uid()::text
    ));

CREATE POLICY "Users can update steps of own roadmaps"
    ON roadmap_steps FOR UPDATE
    USING (EXISTS (
        SELECT 1 FROM user_roadmaps
        WHERE user_roadmaps.id = roadmap_steps.roadmap_id
        AND user_roadmaps.user_id = auth.uid()::text
    ));

CREATE POLICY "Users can delete steps of own roadmaps"
    ON roadmap_steps FOR DELETE
    USING (EXISTS (
        SELECT 1 FROM user_roadmaps
        WHERE user_roadmaps.id = roadmap_steps.roadmap_id
        AND user_roadmaps.user_id = auth.uid()::text
    ));
