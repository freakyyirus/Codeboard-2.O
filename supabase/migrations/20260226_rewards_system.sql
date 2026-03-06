-- User rewards tracking
CREATE TABLE public.user_rewards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT REFERENCES public.users(id) ON DELETE CASCADE,
  code_coins INTEGER DEFAULT 0,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_claim_date DATE,
  total_problems_solved INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Daily reward claims
CREATE TABLE public.daily_rewards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT REFERENCES public.users(id) ON DELETE CASCADE,
  claim_date DATE NOT NULL,
  coins_earned INTEGER NOT NULL,
  streak_day INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, claim_date)
);

-- Achievement badges
CREATE TABLE public.user_badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT REFERENCES public.users(id) ON DELETE CASCADE,
  badge_type VARCHAR(50) NOT NULL,
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, badge_type)
);

-- Badge definitions (reference table)
CREATE TABLE public.badges (
  id SERIAL PRIMARY KEY,
  badge_type VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  icon VARCHAR(50),
  requirement_type VARCHAR(50),
  requirement_value INTEGER,
  coin_cost INTEGER DEFAULT 0
);

-- Seed basic badges mapping the specifications provided
INSERT INTO public.badges (badge_type, name, description, icon, requirement_type, requirement_value, coin_cost) VALUES
('streak_7', '7-Day Streak', 'Maintain a 7-day streak', 'Fire', 'streak', 7, 0),
('streak_30', '30-Day Streak', 'Maintain a 30-day streak', 'Fire_Gold', 'streak', 30, 0),
('streak_100', '100-Day Streak', 'Maintain a 100-day streak', 'Fire_Diamond', 'streak', 100, 0),
('first_blood', 'First Blood', 'Solve your first problem', 'Bronze_Medal', 'problems_solved', 1, 0),
('problem_newbie', 'Problem Newbie', 'Solve 10 problems', 'Bronze_Medal', 'problems_solved', 10, 0),
('problem_soldier', 'Problem Soldier', 'Solve 50 problems', 'Bronze_Medal', 'problems_solved', 50, 0),
('problem_warrior', 'Problem Warrior', 'Solve 100 problems', 'Bronze_Medal', 'problems_solved', 100, 0),
('problem_legend', 'Problem Legend', 'Solve 500 problems', 'Bronze_Medal', 'problems_solved', 500, 0),
('easy_master', 'Easy Master', 'Solve 50 Easy', 'Trophy', 'easy_solved', 50, 0),
('medium_master', 'Medium Master', 'Solve 50 Medium', 'Trophy', 'medium_solved', 50, 0),
('hard_master', 'Hard Master', 'Solve 50 Hard', 'Trophy', 'hard_solved', 50, 0),
('early_adopter', 'Early Adopter', 'Join during beta', 'Users', 'social', 0, 0),
('mobile_master', 'Mobile Master', 'Login from mobile 7x', 'Smartphone', 'social', 7, 0),
('contestant', 'Contestant', 'Participate in 5 contests', 'Medal', 'social', 5, 0),
('analyst', 'Analyst', 'View 100 analytics pages', 'BarChart', 'social', 100, 0)
ON CONFLICT (badge_type) DO NOTHING;

-- RLS Policies
ALTER TABLE public.user_rewards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_rewards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.badges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own rewards" ON public.user_rewards FOR SELECT USING (true);
CREATE POLICY "Users can view own daily claims" ON public.daily_rewards FOR SELECT USING (true);
CREATE POLICY "Users can view own badges" ON public.user_badges FOR SELECT USING (true);
CREATE POLICY "Anyone can view badges" ON public.badges FOR SELECT USING (true);
