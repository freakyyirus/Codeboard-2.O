-- Portfolio Profiles
CREATE TABLE public.portfolio_profiles (
  user_id TEXT PRIMARY KEY REFERENCES public.users(id) ON DELETE CASCADE,
  headline VARCHAR(255) DEFAULT 'Full Stack Developer & Innovator',
  location VARCHAR(100),
  company VARCHAR(100),
  bio TEXT,
  theme_color VARCHAR(50) DEFAULT 'purple',
  custom_url_slug VARCHAR(255) UNIQUE,
  is_public BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Portfolio Skills
CREATE TABLE public.portfolio_skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT REFERENCES public.users(id) ON DELETE CASCADE,
  category VARCHAR(100) NOT NULL,
  name VARCHAR(100) NOT NULL,
  proficiency INTEGER DEFAULT 50,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Portfolio Projects
CREATE TABLE public.portfolio_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT REFERENCES public.users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  tags TEXT[],
  link VARCHAR(255),
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Portfolio Education
CREATE TABLE public.portfolio_education (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT REFERENCES public.users(id) ON DELETE CASCADE,
  institution VARCHAR(255) NOT NULL,
  degree VARCHAR(255) NOT NULL,
  coursework TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Portfolio Experience
CREATE TABLE public.portfolio_experience (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT REFERENCES public.users(id) ON DELETE CASCADE,
  role VARCHAR(255) NOT NULL,
  company VARCHAR(255) NOT NULL,
  duration VARCHAR(100) NOT NULL,
  description TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS Policies
ALTER TABLE public.portfolio_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_education ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_experience ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view portfolio profiles" ON public.portfolio_profiles FOR SELECT USING (true);
CREATE POLICY "Anyone can view portfolio skills" ON public.portfolio_skills FOR SELECT USING (true);
CREATE POLICY "Anyone can view portfolio projects" ON public.portfolio_projects FOR SELECT USING (true);
CREATE POLICY "Anyone can view portfolio education" ON public.portfolio_education FOR SELECT USING (true);
CREATE POLICY "Anyone can view portfolio experience" ON public.portfolio_experience FOR SELECT USING (true);

-- Allow all for other operations (auth enforced at server-action level)
CREATE POLICY "Full access profiles" ON public.portfolio_profiles USING (true);
CREATE POLICY "Full access skills" ON public.portfolio_skills USING (true);
CREATE POLICY "Full access projects" ON public.portfolio_projects USING (true);
CREATE POLICY "Full access education" ON public.portfolio_education USING (true);
CREATE POLICY "Full access experience" ON public.portfolio_experience USING (true);
