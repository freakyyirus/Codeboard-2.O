# CodeBoard 2.0 🚀

**The Ultimate Developer Growth Platform**

CodeBoard is a comprehensive dashboard designed for developers to track their progress, manage projects, practice DSA, and compete in contests—all in one place. It combines the utility of GitHub, the analytics of LeetCode, and the community of social platforms into a single, beautiful interface.

![Dashboard Preview](public/screenshot-desktop.png)

## ✨ Key Features

### 1. **Interactive Dashboard**
- **Activity Tracking**: GitHub-style contribution graph and daily activity heatmaps.
- **Skill Distribution**: Visual breakdown of DSA topics (Arrays, DP, Graphs, etc.).
- **Platform Stats**: Real-time integration with LeetCode, Codeforces, and GitHub ratings.
- **Metric Cards**: Quick view of total problems solved, coding hours, and current streak.

### 2. **Advanced Analytics** 📈
- **Growth Timeline**: Track your rating and problem-solving velocity over time.
- **Topic Radar**: Identify your strong and weak areas with a radar chart.
- **Productivity Insights**: AI-driven insights on your peak coding hours and consistency.
- **Weakness Spotlight**: Smart recommendations on topics you need to improve.

### 3. **Leaderboard & Community** 🏆
- **Global Rankings**: Compete with developers worldwide based on total problems solved.
- **Podium View**: Premium animated podium for top 3 performers.
- **Social Integration**: View profiles, follow others, and track peer progress.

### 4. **CodeBoard Studio** 💻
- **Built-in IDE**: Fully functional Monaco Editor with syntax highlighting for multiple languages.
- **Dark Mode Optimized**: A distraction-free coding environment.
- **Snippets & Notes**: Save your best solutions and algorithms for quick reference.

### 5. **Contest Central** 🗓️
- **Unified Calendar**: Track upcoming contests from LeetCode, Codeforces, AtCoder, and more.
- **Reminders**: Set alerts for contests you don't want to miss.

### 6. **Desktop Pet (Umaru) Integration** 😺
- **Interactive Companion**: A cute desktop pet that reacts to your typing and mouse movements.
- **Input Mirror**: Visualizes your keystrokes and clicks in real-time.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, Server Components)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Database & Auth**: [Supabase](https://supabase.com/)
- **Charts**: [Recharts](https://recharts.org/)
- **Editor**: [Monaco Editor](https://microsoft.github.io/monaco-editor/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/codeboard.git
   cd codeboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Environment Variables**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open locally**
   Visit [http://localhost:3000](http://localhost:3000).

---

## 📂 Project Structure

```
codeboard/
├── app/                  # Next.js App Router pages
│   ├── auth/             # Authentication & Callbacks
│   ├── dashboard/        # Main Dashboard routes (analytics, leaderboard, etc.)
│   ├── login/            # Login page
│   └── page.tsx          # Landing page
├── components/           # Reusable UI components
│   ├── analytics/        # Analytics-specific charts & widgets
│   ├── dashboard/        # Dashboard widgets (ActivityChart, ContributionGraph)
│   ├── leaderboard/      # Leaderboard podium & tables
│   ├── studio/           # CodeEditor & IDE components
│   └── ui/               # Shared UI elements (PremiumEffects, Buttons)
├── lib/                  # Utilities & Supabase clients
└── public/               # Static assets
```

## 🎨 Design Philosophy
CodeBoard follows a **"Dark Premium"** aesthetic.
- **Colors**: Deep blacks (`#0B0B0B`), subtle grays (`#1f1f1f`), and vibrant accents (Blue/Purple/Green).
- **Motion**: Smooth, non-intrusive micro-interactions using Framer Motion (`stiffness: 400`).
- **Typography**: Clean, readable sans-serif fonts optimized for code and data.

---

Made with ❤️ by CodeBoard Team.
