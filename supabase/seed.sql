-- 1. Create a Test User in Auth (Required for Foreign Key)
-- This uses a fixed UUID so we can hardcode it in the dashboard for testing.
INSERT INTO auth.users (
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    raw_user_meta_data,
    created_at,
    updated_at
)
VALUES (
    'e0b8d54c-53f7-43f6-8809-921385317307',
    'authenticated',
    'authenticated',
    'demo@codeboard.dev',
    extensions.crypt('password123', extensions.gen_salt('bf')),
    NOW(),
    '{"full_name":"Demo User"}',
    NOW(),
    NOW()
) ON CONFLICT (id) DO NOTHING;

-- 2. Populate Profile Data
INSERT INTO public.profiles (id, full_name, total_solved, active_days, current_streak, max_streak)
VALUES (
    'e0b8d54c-53f7-43f6-8809-921385317307',
    'Demo User',
    1284,
    24,
    12,
    45
) ON CONFLICT (id) DO UPDATE
SET 
    total_solved = EXCLUDED.total_solved,
    active_days = EXCLUDED.active_days,
    current_streak = EXCLUDED.current_streak;

-- 3. Populate Activity Log (Last 30 Days)
INSERT INTO public.activity_log (user_id, date, problems_solved)
SELECT 
    'e0b8d54c-53f7-43f6-8809-921385317307',
    CURRENT_DATE - (n || ' days')::interval,
    floor(random() * 5)::int
FROM generate_series(0, 30) n
ON CONFLICT (user_id, date) DO NOTHING;

-- 4. Populate Rating History
INSERT INTO public.rating_history (user_id, platform, contest_name, rating, rank, date)
VALUES
    ('e0b8d54c-53f7-43f6-8809-921385317307', 'Codeforces', 'Round #900', 1400, 1200, NOW() - INTERVAL '2 months'),
    ('e0b8d54c-53f7-43f6-8809-921385317307', 'Codeforces', 'Round #910', 1450, 900, NOW() - INTERVAL '1 month'),
    ('e0b8d54c-53f7-43f6-8809-921385317307', 'Codeforces', 'Round #920 (Div. 2)', 1520, 450, NOW() - INTERVAL '1 week')
ON CONFLICT DO NOTHING;

-- 5. Populate Platform Connections
INSERT INTO public.platform_connections (user_id, platform, handle, is_connected)
VALUES
    ('e0b8d54c-53f7-43f6-8809-921385317307', 'leetcode', 'demo_lc', true),
    ('e0b8d54c-53f7-43f6-8809-921385317307', 'codeforces', 'demo_cf', true),
    ('e0b8d54c-53f7-43f6-8809-921385317307', 'github', 'demo_git', true)
ON CONFLICT (user_id, platform) DO NOTHING;
