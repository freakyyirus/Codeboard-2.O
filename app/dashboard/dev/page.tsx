import { getRepos, getPinnedRepos, getEvents } from "@/lib/github"

export default async function DevPage() {
  let repos: any[] = []
  let pinned: any[] = []
  let events: any[] = []
  let hasToken = !!process.env.GITHUB_TOKEN && !!process.env.GITHUB_USERNAME

  if (hasToken) {
    try {
      ;[repos, pinned, events] = await Promise.all([
        getRepos(),
        getPinnedRepos(),
        getEvents(),
      ])
    } catch {
      hasToken = false
    }
  }

  // Build language statistics
  const languageMap: Record<string, number> = {}
  let totalStars = 0
  repos.forEach((r: any) => {
    if (r.language) languageMap[r.language] = (languageMap[r.language] || 0) + 1
    totalStars += r.stargazers_count || 0
  })

  const languageData = Object.entries(languageMap)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)

  const commitCount = events
    .filter((e: any) => e.type === "PushEvent")
    .reduce((acc: number, ev: any) => acc + (ev.payload?.commits?.length || 0), 0)

  const recentEvents = events.slice(0, 12)

  /* If no GitHub token → show setup guide */
  if (!hasToken || repos.length === 0) {
    return (
      <div className="p-6 md:p-10 max-w-4xl mx-auto fade-in space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Developer Hub</h1>
          <p className="text-sm text-gray-500">Connect your GitHub to see repos, activity, and contribution insights.</p>
        </div>

        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl">⚙️</div>
            <div>
              <h2 className="text-lg font-semibold text-white">Setup GitHub Integration</h2>
              <p className="text-xs text-gray-500">Takes less than 2 minutes</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex gap-4 items-start">
              <span className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white shrink-0">1</span>
              <div>
                <p className="text-sm text-white font-medium">Create a GitHub Personal Access Token</p>
                <p className="text-xs text-gray-500 mt-0.5">
                  Go to{" "}
                  <a href="https://github.com/settings/tokens" target="_blank" rel="noopener noreferrer" className="text-white/70 underline hover:text-white">
                    github.com/settings/tokens
                  </a>{" "}
                  → Generate new token (classic) → Select <code className="text-xs bg-white/5 px-1 py-0.5 rounded">repo</code> and <code className="text-xs bg-white/5 px-1 py-0.5 rounded">read:user</code> scopes.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <span className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white shrink-0">2</span>
              <div>
                <p className="text-sm text-white font-medium">Add to your environment</p>
                <p className="text-xs text-gray-500 mt-0.5">Add these to your <code className="text-xs bg-white/5 px-1 py-0.5 rounded">.env.local</code> file:</p>
                <pre className="mt-2 bg-black/60 border border-white/10 rounded-lg p-3 text-xs text-gray-300 font-mono overflow-x-auto">
                  {`GITHUB_TOKEN=ghp_your_token_here
GITHUB_USERNAME=your_github_username`}
                </pre>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <span className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white shrink-0">3</span>
              <div>
                <p className="text-sm text-white font-medium">Restart your dev server</p>
                <p className="text-xs text-gray-500 mt-0.5">Run <code className="text-xs bg-white/5 px-1 py-0.5 rounded">npm run dev</code> again and refresh this page.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Preview cards — what they'll see after connecting */}
        <div>
          <p className="text-xs text-gray-600 uppercase font-semibold mb-3">Preview — What you&apos;ll see</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 opacity-40">
            {[
              { label: "Repositories", value: "—" },
              { label: "Total Stars", value: "—" },
              { label: "Commits (30d)", value: "—" },
              { label: "Languages", value: "—" },
            ].map(s => (
              <div key={s.label} className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
                <p className="text-xs text-gray-500">{s.label}</p>
                <p className="text-xl font-bold text-white mt-1">{s.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  /* Full Dev Page — GitHub connected */
  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto fade-in space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Developer Hub</h1>
        <p className="text-sm text-gray-500">Your GitHub repos, contributions, and activity — at a glance.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Repositories", value: repos.length },
          { label: "Total Stars", value: totalStars.toLocaleString() },
          { label: "Commits (30d)", value: commitCount },
          { label: "Languages", value: Object.keys(languageMap).length },
        ].map(s => (
          <div key={s.label} className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
            <p className="text-xs text-gray-500">{s.label}</p>
            <p className="text-2xl font-bold text-white mt-1">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Pinned Projects */}
      {pinned.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">📌 Pinned Projects</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {pinned.map((repo: any) => (
              <a
                key={repo.name}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/[0.03] border border-white/10 rounded-xl p-5 hover:bg-white/[0.06] transition-colors group"
              >
                <h3 className="text-sm font-semibold text-white group-hover:text-white/90 truncate">{repo.name}</h3>
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">{repo.description || "No description"}</p>
                <div className="flex items-center gap-3 mt-3">
                  {repo.primaryLanguage?.name && (
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-white/30" />
                      {repo.primaryLanguage.name}
                    </span>
                  )}
                  <span className="text-xs text-gray-500">⭐ {repo.stargazerCount || 0}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Language Chart */}
        <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-white mb-4">Language Distribution</h3>
          <div className="space-y-2.5">
            {languageData.slice(0, 8).map(lang => {
              const total = languageData.reduce((s, l) => s + l.value, 0)
              const pct = Math.round((lang.value / total) * 100)
              return (
                <div key={lang.name}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-300">{lang.name}</span>
                    <span className="text-gray-500 font-mono">{pct}%</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-white/30 rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white/[0.03] border border-white/10 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-white mb-4">Recent Activity</h3>
          <div className="space-y-3 max-h-[400px] overflow-y-auto">
            {recentEvents.length === 0 ? (
              <p className="text-sm text-gray-600 italic">No recent events.</p>
            ) : (
              recentEvents.map((ev: any, i: number) => (
                <div key={i} className="flex items-start gap-3 text-xs">
                  <div className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[10px] shrink-0">
                    {ev.type === "PushEvent" ? "📤" :
                      ev.type === "CreateEvent" ? "✨" :
                        ev.type === "PullRequestEvent" ? "🔀" :
                          ev.type === "IssuesEvent" ? "🐛" :
                            ev.type === "WatchEvent" ? "⭐" : "📝"}
                  </div>
                  <div className="min-w-0">
                    <span className="text-gray-300">
                      {ev.type.replace("Event", "")}
                    </span>
                    <span className="text-gray-600"> on </span>
                    <span className="text-gray-400 truncate">{ev.repo?.name || "unknown"}</span>
                    {ev.type === "PushEvent" && ev.payload?.commits?.length > 0 && (
                      <p className="text-gray-600 mt-0.5 truncate">
                        {ev.payload.commits[0]?.message}
                      </p>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* All Repos */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-4">All Repositories ({repos.length})</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {repos.slice(0, 12).map((repo: any) => (
            <a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/[0.03] border border-white/10 rounded-xl p-4 hover:bg-white/[0.06] transition-colors"
            >
              <h4 className="text-sm font-medium text-white truncate">{repo.name}</h4>
              <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{repo.description || "—"}</p>
              <div className="flex items-center gap-3 mt-2.5 text-xs text-gray-500">
                {repo.language && <span>{repo.language}</span>}
                <span>⭐ {repo.stargazers_count || 0}</span>
                {repo.fork && <span className="text-gray-700">Fork</span>}
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}