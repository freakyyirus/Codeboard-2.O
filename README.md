# 🚀 CodeBoard 2.0

<div align="center">

  <h1>The Ultimate Developer Intelligence Platform</h1>
  
  <p>
    <strong>Track. Analyze. Grow.</strong>
    <br />
    A next-generation dashboard for developers to master data structures, algorithms, and project management.
  </p>

  <p>
    <a href="#features">Features</a> •
    <a href="#tech-stack">Tech Stack</a> •
    <a href="#getting-started">Getting Started</a>
  </p>

  <!-- 
    🖼️ PLACEHOLDER: Add a hero screenshot of your dashboard here!
    Example: ![Dashboard Hero](/public/dashboard-hero.png) 
  -->
  <img src="https://via.placeholder.com/1200x600/0f0f0f/444444?text=CodeBoard+Dashboard+Preview" alt="CodeBoard Dashboard" width="100%" />

</div>

---

## ⚡ Overview

**CodeBoard 2.0** is not just another dashboard; it's your personal command center for coding excellence. Seamlessly blending the utility of GitHub, the competitive edge of LeetCode, and the engagement of social platforms, CodeBoard provides actionable insights into your development journey.

Whether you're preparing for technical interviews, tracking open-source contributions, or managing personal projects, CodeBoard gives you the data you need in a stunning, distraction-free environment.

## ✨ Key Features

### 📊 Interactive Analytics Dashboard
Visualize your growth with precision. CodeBoard aggregates data from multiple sources to give you a complete picture of your skills.
- **Growth Trends**: Interactive area charts showing your problem-solving velocity over time. 
- **Skill Radar**: A hexagonal radar chart pinpoints your strengths (e.g., DP, Graphs) and weaknesses.
- **Activity Heatmap**: GitHub-style contribution tracking for consistency.
- **Platform Stats**: Real-time integration with LeetCode & Codeforces ratings.

<!-- 
  🖼️ PLACEHOLDER: Add a screenshot of the Analytics page here.
  <img src="/public/analytics-preview.png" alt="Analytics" width="100%" />
-->

### 🏆 Global Leaderboard
Compete with the best. Our real-time leaderboard gamifies your progress.
- **Animated Podium**: A premium, 3D-style podium showcasing the top 3 developers.
- **Rankings**: Filterable list of top performers by problems solved or rating.
- **Badges & Ranks**: Earn visual distinctions as you climb the ladder.

<!-- 
  🖼️ PLACEHOLDER: Add a screenshot of the Leaderboard page here. 
-->

### 💻 CodeBoard Studio
A powerful, built-in IDE for quick experiments and snippet management.
- **Monaco Editor**: The same engine that powers VS Code, right in your browser.
- **Multi-language Support**: Syntax highlighting for TypeScript, Python, C++, and more.
- **Dark Mode Optimized**: Designed to reduce eye strain during late-night coding sessions.

### 😺 Desktop Companion (Umaru)
A touch of personality for your workspace.
- **Interactive Pet**: A virtual companion that reacts to your typing speed and mouse movements.
- **Input Mirror**: Visualizes your keystrokes in real-time, adding life to your dashboard.

---

## 🛠️ Tech Stack

Built with cutting-edge technologies for performance and scale.

| Category | Technology |
|----------|------------|
| **Framework** | [Next.js 14](https://nextjs.org/) (App Router) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) |
| **Database** | [Supabase](https://supabase.com/) (PostgreSQL) |
| **Auth** | [Supabase Auth](https://supabase.com/auth) |
| **Charts** | [Recharts](https://recharts.org/) |
| **Editor** | [Monaco Editor](https://microsoft.github.io/monaco-editor/) |

---

## 🚀 Getting Started

Follow these steps to set up CodeBoard locally.

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

3. **Configure Environment Variables**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open in Browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the app in action.

---

## 📂 Project Structure

A quick look at the top-level directory structure.

```
codeboard/
├── app/                  # Next.js App Router (Pages & Layouts)
│   ├── auth/             # Authentication logic
│   ├── dashboard/        # Main app views (Analytics, Leaderboard)
│   └── login/            # Auth UI
├── components/           # Reusable UI Components
│   ├── analytics/        # Chart widgets & data visualizations
│   ├── dashboard/        # Dashboard-specific cards
│   ├── studio/           # IDE Editor components
│   └── ui/               # Shared primitives (Buttons, Inputs)
├── lib/                  # Utilities, Hooks, & API clients
└── public/               # Static assets & images
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

<div align="center">
  <p>Made with ❤️ by the CodeBoard Team</p>
</div>
