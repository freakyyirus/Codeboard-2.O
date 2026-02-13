Product Requirements Document: CodeBoard 2.0
1. EXECUTIVE SUMMARY
Product Name: CodeBoard
Version: 2.0
Date: February 2026
Status: Production Refactor
Objective: Transform CodeBoard from a functional MVP into a premium, Vercel-inspired competitive programming dashboard that aggregates stats from LeetCode, Codeforces, CodeChef, and GitHub.
Key Differentiator: While Codolio focuses on profile aggregation, CodeBoard adds AI-powered IDE, contest tracking, and habitual roadmap features with superior UX.
2. DESIGN SYSTEM (Vercel-Inspired)
2.1 Typography: Geist Font Family
css
Copy
/* Primary: Geist Sans - Clean, technical, modern */
--font-sans: 'Geist Sans', system-ui, sans-serif;

/* Monospace: Geist Mono - For code, numbers, ratings */
--font-mono: 'Geist Mono', ui-monospace, monospace;

/* Scale - Mathematical precision */
--text-xs: 0.75rem;    /* 12px - Labels, timestamps */
--text-sm: 0.875rem;   /* 14px - Body small, navigation */
--text-base: 1rem;     /* 16px - Body, descriptions */
--text-lg: 1.125rem;   /* 18px - Lead text */
--text-xl: 1.25rem;    /* 20px - Card titles */
--text-2xl: 1.5rem;    /* 24px - Section headers */
--text-3xl: 1.875rem;  /* 30px - Page titles */
--text-4xl: 2.25rem;   /* 36px - Hero text */

/* Weights */
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;

/* Tracking */
--tracking-tight: -0.02em;
--tracking-normal: 0;
--tracking-wide: 0.02em;
Implementation:
tsx
Copy
// app/layout.tsx
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';

// Apply to body
className={`${GeistSans.variable} ${GeistMono.variable} font-sans`}
2.2 Color Palette (Vercel Dark)
css
Copy
/* Background Hierarchy */
--background: #000000;           /* Pure black - Vercel style */
--background-secondary: #111111; /* Elevated cards */
--background-tertiary: #1a1a1a;  /* Inputs, hover states */

/* Accents */
--foreground: #ffffff;           /* Primary text */
--foreground-secondary: #888888; /* Muted text, labels */
--foreground-tertiary: #666666;  /* Disabled, placeholders */

/* Brand Colors (Minimal usage) */
--accent-blue: #0070f3;          /* Primary actions, links */
--accent-blue-light: #3291ff;    /* Hover states */
--accent-success: #0070f3;       /* Actually use blue for success (Vercel style) */
--accent-warning: #f5a623;       /* Warnings, streaks */
--accent-error: #ff0000;         /* Errors, hard difficulty */

/* Borders */
--border: #333333;               /* Subtle dividers */
--border-hover: #444444;         /* Hover states */

/* Platform Colors (Desaturated for dark mode) */
--leetcode: #ffa116;             /* Amber - kept for recognition */
--codeforces: #bfbfbf;           /* Gray - less aggressive than red */
--codechef: #5b4638;             /* Brown muted */
--github: #f0f0f0;               /* Off-white */
2.3 Spacing System (4px Grid)
css
Copy
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
2.4 Component Primitives
Buttons:
css
Copy
/* Primary */
bg-[#0070f3] text-white h-10 px-4 rounded-md font-medium
hover:bg-[#3291ff] active:scale-[0.98] transition-all duration-150

/* Secondary */
bg-[#1a1a1a] text-white border border-[#333] h-10 px-4 rounded-md
hover:border-[#444] hover:bg-[#222]

/* Ghost */
text-[#888] hover:text-white transition-colors
Cards:
css
Copy
bg-[#111] border border-[#333] rounded-lg p-6
hover:border-[#444] transition-colors duration-150
Inputs:
css
Copy
bg-[#111] border border-[#333] rounded-md h-10 px-3 text-sm
focus:border-[#0070f3] focus:ring-1 focus:ring-[#0070f3]
placeholder:text-[#666]
3. DASHBOARD LAYOUT (Codolio-Inspired + Vercel Polish)
3.1 Structure
plain
Copy
┌─────────────────────────────────────────────────────────────┐
│  Sidebar (240px)    │  Main Content Area (fluid)            │
│                     │                                       │
│  ┌─────────────┐    │  ┌─────────────────────────────────┐  │
│  │ Logo        │    │  │ Header: Title + Actions         │  │
│  ├─────────────┤    │  └─────────────────────────────────┘  │
│  │ Navigation  │    │                                       │
│  │ - Dashboard │    │  ┌──────────┐ ┌───────────────────┐  │
│  │ - Problems  │    │  │ Stats    │ │ Heatmap           │  │
│  │ - Contests  │    │  │ Cards    │ │ + Streak          │  │
│  │ - Studio    │    │  └──────────┘ └───────────────────┘  │
│  │ - Roadmap   │    │                                       │
│  ├─────────────┤    │  ┌─────────────────────────────────┐  │
│  │ Section     │    │  │ Rating Graph                    │  │
│  │ Dividers    │    │  └─────────────────────────────────┘  │
│  ├─────────────┤    │                                       │
│  │ User Card   │    │  ┌─────────────┐ ┌────────────────┐  │
│  └─────────────┘    │  │ Platforms   │ │ Topic Analysis │  │
│                     │  │ List        │ │                │  │
│                     │  └─────────────┘ └────────────────┘  │
└─────────────────────┴───────────────────────────────────────┘
3.2 Sidebar Component
Design:
Width: 240px fixed
Background: #000 (same as main)
Border-right: 1px solid #333
Padding: 16px 12px
Sections:
Logo Area (64px height)
CodeBoard icon (24px) + wordmark "CodeBoard"
Font: Geist Sans, 18px, font-weight 600
Main Navigation
Items: Dashboard, Problems, Contests, Studio, Roadmap
Icon: 20px, stroke-width 1.5
Active state: #0070f3 background (subtle, 10% opacity), text white
Hover: #1a1a1a background
Section Dividers
Label: 11px uppercase, #666, letter-spacing 0.05em
Items: Analytics, Community, Settings
User Mini-Card (Bottom)
Avatar: 32px circle
Name: 14px, white
Handle: 12px, #888
Implementation:
tsx
Copy
// components/layout/Sidebar.tsx
<aside className="fixed left-0 top-0 h-screen w-60 border-r border-[#333] bg-black flex flex-col">
  <div className="h-16 flex items-center px-4 gap-2">
    <CodeBoardIcon className="w-6 h-6 text-[#0070f3]" />
    <span className="font-semibold text-lg tracking-tight">CodeBoard</span>
  </div>
  
  <nav className="flex-1 px-3 py-4 space-y-1">
    {navItems.map(item => (
      <Link 
        key={item.label}
        href={item.href}
        className={cn(
          "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
          item.active 
            ? "bg-[#0070f3]/10 text-white" 
            : "text-[#888] hover:text-white hover:bg-[#1a1a1a]"
        )}
      >
        <item.icon className="w-5 h-5" strokeWidth={1.5} />
        {item.label}
      </Link>
    ))}
  </nav>
  
  <div className="p-3 border-t border-[#333]">
    <UserCard />
  </div>
</aside>
3.3 Stats Cards (Top Row)
Layout: 4-column grid on desktop, 2x2 on tablet, stack on mobile
Card Design:
css
Copy
bg-[#111] border border-[#333] rounded-lg p-5
Content Structure:
Total Questions
Label: "Total Questions" (12px, #888, uppercase)
Value: "84" (36px, Geist Mono, font-weight 600)
Change: "+12 this week" (12px, #0070f3)
Total Active Days
Label: "Active Days"
Value: "21"
Subtext: "Last 30 days"
Current Streak
Label: "Current Streak"
Value: "12" + 🔥 (flame icon, #f5a623)
Subtext: "Best: 24"
Contest Rating
Label: "Contest Rating"
Value: "1205"
Subtext: "CodeChef"
Implementation:
tsx
Copy
// components/dashboard/StatsCard.tsx
<div className="bg-[#111] border border-[#333] rounded-lg p-5 hover:border-[#444] transition-colors">
  <p className="text-xs text-[#888] uppercase tracking-wide mb-1">{label}</p>
  <p className="text-3xl font-mono font-semibold text-white">{value}</p>
  {subtext && <p className="text-xs text-[#666] mt-1">{subtext}</p>}
</div>
3.4 Activity Heatmap (GitHub-Style)
Design:
Grid: 52 weeks x 7 days
Cell size: 10px
Gap: 2px
Colors: #1a1a1a (0) → #0e4429 (1-2) → #006d32 (3-4) → #26a641 (5-6) → #39d353 (7+)
Position: Right side of stats row, spans 2 columns
Tooltip: On hover, show date and count
Implementation:
tsx
Copy
// components/dashboard/ActivityHeatmap.tsx
<div className="bg-[#111] border border-[#333] rounded-lg p-5">
  <div className="flex items-center justify-between mb-4">
    <h3 className="text-sm font-medium text-white">Activity</h3>
    <span className="text-xs text-[#888]">Last year</span>
  </div>
  <div className="grid grid-cols-52 gap-[2px]">
    {weeks.map((week, i) => (
      <div key={i} className="grid grid-rows-7 gap-[2px]">
        {week.map((day, j) => (
          <div
            key={j}
            className={cn("w-[10px] h-[10px] rounded-sm", getColor(day.count))}
            title={`${day.date}: ${day.count} problems`}
          />
        ))}
      </div>
    ))}
  </div>
</div>
3.5 Rating Graph (Centerpiece)
Design:
Height: 300px
Line color: #0070f3
Fill: Gradient from #0070f3 (20% opacity) to transparent
Axis: #333 lines, #666 labels
Grid: Dotted, #222
Data Points:
Show last 10 contests
X-axis: Contest dates
Y-axis: Rating
Hover: Tooltip with contest name, rating, rank, date
Implementation:
Use recharts or custom SVG (preferred for Vercel aesthetic):
tsx
Copy
// components/dashboard/RatingChart.tsx
<div className="bg-[#111] border border-[#333] rounded-lg p-6">
  <div className="flex items-center justify-between mb-6">
    <div>
      <h3 className="text-lg font-medium text-white">Rating Progress</h3>
      <p className="text-sm text-[#888]">CodeChef • Last 10 contests</p>
    </div>
    <div className="text-right">
      <p className="text-2xl font-mono font-semibold text-white">1205</p>
      <p className="text-xs text-[#0070f3]">+45 last contest</p>
    </div>
  </div>
  <div className="h-[250px]">
    {/* Chart implementation */}
  </div>
</div>
3.6 Platform Connections (Left Column)
Design:
List of platforms with connection status
Icon + Name + Status + Action
Platforms:
LeetCode (connected - green check)
CodeChef (connected - green check)
Codeforces (connected - green check)
HackerRank (warning - yellow triangle)
AtCoder (connected - green check)
GitHub (connected - green check)
Connected State:
Icon: Platform logo (20px)
Name: 14px, white
Handle: 12px, #888
Check: #0070f3 circle with white check
Disconnected State:
Icon: Grayscale
Name: #888
Action: "Connect" button (ghost style)
Implementation:
tsx
Copy
// components/dashboard/PlatformList.tsx
<div className="bg-[#111] border border-[#333] rounded-lg p-5">
  <h3 className="text-sm font-medium text-white mb-4">Connected Platforms</h3>
  <div className="space-y-3">
    {platforms.map(platform => (
      <div key={platform.name} className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <platform.icon className="w-5 h-5" />
          <div>
            <p className="text-sm font-medium text-white">{platform.name}</p>
            <p className="text-xs text-[#888]">@{platform.handle}</p>
          </div>
        </div>
        {platform.connected ? (
          <div className="w-5 h-5 rounded-full bg-[#0070f3] flex items-center justify-center">
            <Check className="w-3 h-3 text-white" />
          </div>
        ) : (
          <Button variant="ghost" size="sm">Connect</Button>
        )}
      </div>
    ))}
  </div>
  <Button variant="secondary" className="w-full mt-4">
    <Plus className="w-4 h-4 mr-2" />
    Add Platform
  </Button>
</div>
3.7 DSA Topic Analysis (Right Column)
Design:
Horizontal bar chart
Topic name on left, count on right
Bar fill: #0070f3
Topics:
Arrays
HashMap and Set
Math
Dynamic Programming
Graphs
Trees
Implementation:
tsx
Copy
// components/dashboard/TopicAnalysis.tsx
<div className="bg-[#111] border border-[#333] rounded-lg p-5">
  <h3 className="text-sm font-medium text-white mb-4">DSA Topic Analysis</h3>
  <div className="space-y-3">
    {topics.map(topic => (
      <div key={topic.name}>
        <div className="flex justify-between text-xs mb-1">
          <span className="text-[#888]">{topic.name}</span>
          <span className="text-white font-mono">{topic.count}</span>
        </div>
        <div className="h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#0070f3] rounded-full"
            style={{ width: `${(topic.count / maxCount) * 100}%` }}
          />
        </div>
      </div>
    ))}
  </div>
</div>
3.8 Contest Rankings (Side Panel)
Design:
Platform logo + Rating + Rank name
Example:
CodeChef: 1205 (max: 1205)
Codeforces: 636 (Newbie)
Visual:
Large number: 32px, Geist Mono
Platform: 12px, #888
Rank badge: Small pill with platform color
4. RESPONSIVE BREAKPOINTS
css
Copy
/* Mobile First */
--breakpoint-sm: 640px;   /* Stack everything */
--breakpoint-md: 768px;   /* 2-column stats */
--breakpoint-lg: 1024px;  /* Sidebar visible, 3-column */
--breakpoint-xl: 1280px;  /* Full layout */
--breakpoint-2xl: 1536px; /* Max container */
Mobile Behavior:
Sidebar becomes bottom navigation (5 icons)
Stats: 2x2 grid
Heatmap: Horizontal scroll
Charts: Simplified, touch-friendly tooltips
5. INTERACTIONS & ANIMATIONS
5.1 Micro-interactions (Vercel Style)
Hover States:
Cards: border-color transition to #444 (150ms)
Buttons: background-color shift (150ms)
Links: color to white (100ms)
Nav items: background to #1a1a1a (150ms)
Active States:
Buttons: scale(0.98) (100ms)
Cards: No scale (maintains stability)
Focus States:
Ring: 2px solid #0070f3, 2px offset
Only visible on keyboard navigation
5.2 Page Transitions
css
Copy
/* Next.js App Router - Minimal */
.page-transition {
  animation: fadeIn 150ms ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}
5.3 Loading States
Skeleton:
css
Copy
bg-[#1a1a1a] rounded-md animate-pulse
Spinner:
css
Copy
border-2 border-[#333] border-t-[#0070f3] rounded-full w-4 h-4 animate-spin
6. DATA REQUIREMENTS
6.1 Supabase Schema Updates
sql
Copy
-- Add to existing schema
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS total_solved INTEGER DEFAULT 0;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS active_days INTEGER DEFAULT 0;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS current_streak INTEGER DEFAULT 0;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS max_streak INTEGER DEFAULT 0;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS last_active_date DATE;

-- Platform connections
CREATE TABLE platform_connections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  platform TEXT NOT NULL CHECK (platform IN ('leetcode', 'codechef', 'codeforces', 'hackerrank', 'atcoder', 'github')),
  handle TEXT NOT NULL,
  rating INTEGER,
  problems_solved INTEGER,
  is_connected BOOLEAN DEFAULT TRUE,
  last_synced TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, platform)
);

-- Activity log for heatmap
CREATE TABLE activity_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  problems_solved INTEGER DEFAULT 0,
  contests_participated INTEGER DEFAULT 0,
  UNIQUE(user_id, date)
);

-- Rating history
CREATE TABLE rating_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  platform TEXT NOT NULL,
  contest_name TEXT,
  rating INTEGER,
  rank INTEGER,
  date TIMESTAMPTZ DEFAULT NOW()
);
7. IMPLEMENTATION ROADMAP
Phase 1: Foundation (Week 1)
[ ] Install Geist font
[ ] Update globals.css with Vercel color palette
[ ] Rebuild Sidebar component
[ ] Create layout shell
Phase 2: Dashboard Core (Week 2)
[ ] Stats cards component
[ ] Activity heatmap
[ ] Rating chart
[ ] Platform list
Phase 3: Data Integration (Week 3)
[ ] Connect to Supabase
[ ] Fetch real platform data
[ ] Implement caching (Upstash)
[ ] Add loading states
Phase 4: Polish (Week 4)
[ ] Responsive design
[ ] Dark mode refinement
[ ] Animation tuning
[ ] Performance optimization
8. SUCCESS METRICS
Lighthouse Score: 95+ (Performance, Accessibility, Best Practices)
First Contentful Paint: < 1.5s
Time to Interactive: < 3s
Bundle Size: < 200KB (initial JS)
