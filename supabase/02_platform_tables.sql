-- 1. Create platform_stats table
CREATE TABLE IF NOT EXISTS public.platform_stats (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT NOT NULL, 
    platform TEXT NOT NULL, 
    easy_solved INTEGER DEFAULT 0,
    medium_solved INTEGER DEFAULT 0,
    hard_solved INTEGER DEFAULT 0,
    total_solved INTEGER DEFAULT 0,
    rating INTEGER DEFAULT 0,
    global_rank TEXT,
    last_synced TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id, platform)
);

-- 2. Create recent_submissions table (for the activity feed)
CREATE TABLE IF NOT EXISTS public.recent_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT NOT NULL,
    platform TEXT NOT NULL,
    problem_title TEXT NOT NULL,
    problem_url TEXT,
    difficulty TEXT,
    status TEXT, 
    timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
    UNIQUE(user_id, platform, problem_title, timestamp)
);

-- 3. Enable RLS on new tables
ALTER TABLE public.platform_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recent_submissions ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies for new tables
CREATE POLICY "Users can view their own platform stats" 
ON public.platform_stats FOR SELECT 
USING (auth.uid()::text = user_id);

CREATE POLICY "Service role has full access to platform_stats" 
ON public.platform_stats FOR ALL 
USING (auth.role() = 'service_role');

CREATE POLICY "Users can view their own recent submissions" 
ON public.recent_submissions FOR SELECT 
USING (auth.uid()::text = user_id);

CREATE POLICY "Service role has full access to recent_submissions" 
ON public.recent_submissions FOR ALL 
USING (auth.role() = 'service_role');
