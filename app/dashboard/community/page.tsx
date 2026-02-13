import { getTrendingRepos } from "@/lib/github"
import { Star, GitFork, User, ExternalLink } from "lucide-react"
import Link from "next/link"

export const dynamic = 'force-dynamic'

// Mock if API fails
const MOCK_REPOS = [
    { id: 1, full_name: "donnemartin/system-design-primer", description: "Learn how to design large-scale systems.", stars: 245000, language: "Python", url: "https://github.com/donnemartin/system-design-primer", owner_avatar: "" },
    { id: 2, full_name: "trekhleb/javascript-algorithms", description: "Algorithms and data structures implemented in JavaScript with explanations and links to further readings", stars: 182000, language: "JavaScript", url: "https://github.com/trekhleb/javascript-algorithms", owner_avatar: "" },
    { id: 3, full_name: "jwasham/coding-interview-university", description: "A complete computer science study plan to become a software engineer.", stars: 278000, language: "Markdown", url: "https://github.com/jwasham/coding-interview-university", owner_avatar: "" },
]

export default async function CommunityPage() {
    let repos = []

    try {
        repos = await getTrendingRepos()
        if (!repos || repos.length === 0) {
            console.log("GitHub API returned empty, using mock.")
            repos = MOCK_REPOS
        }
    } catch (e) {
        console.warn("Failed to fetch GitHub trending:", e)
        repos = MOCK_REPOS
    }

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
                <div>
                    <h1 className="text-[32px] font-display font-semibold text-[var(--foreground)] tracking-tight">
                        Community
                    </h1>
                    <p className="text-[var(--text-secondary)] text-[14px]">
                        Discover popular algorithms and open-source projects.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Link href="https://github.com/trending" target="_blank" className="flex items-center gap-2 px-3 py-1.5 bg-[var(--surface)] border border-[var(--border)] rounded-[6px] text-[12px] font-medium text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors">
                        View on GitHub <ExternalLink className="w-3 h-3" />
                    </Link>
                </div>
            </div>

            {/* Trending Repos Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {repos.map((repo: any) => (
                    <div key={repo.id} className="group bg-[var(--surface)] border border-[var(--border)] rounded-[8px] p-5 hover:border-[var(--text-secondary)] transition-all duration-200">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="font-mono text-[14px] text-[var(--primary)] group-hover:underline truncate max-w-[80%]">
                                <a href={repo.url} target="_blank" rel="noopener noreferrer">{repo.full_name}</a>
                            </h3>
                            <div className="flex items-center gap-1 text-[var(--text-tertiary)] text-[12px]">
                                <Star className="w-3.5 h-3.5" />
                                <span>{repo.stars.toLocaleString()}</span>
                            </div>
                        </div>
                        <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed line-clamp-2 h-[40px] mb-4">
                            {repo.description || "No description provided."}
                        </p>
                        <div className="flex items-center gap-4 text-[12px] text-[var(--text-tertiary)]">
                            {repo.language && (
                                <div className="flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-[var(--primary)]" />
                                    <span>{repo.language}</span>
                                </div>
                            )}
                            <div className="flex items-center gap-1">
                                <User className="w-3.5 h-3.5" />
                                <span>Updated recently</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
