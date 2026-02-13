import { getProblemList } from "@/lib/leetcode"
import { ProblemTable } from "@/components/problems/ProblemTable"

// Mock if API fails (e.g. Rate Limit / No Redis)
const MOCK_PROBLEMS = [
    { id: "1", title: "Two Sum", slug: "two-sum", difficulty: "Easy", acceptance: "52.4", tags: ["Array", "Hash Table"], paid: false, url: "https://leetcode.com/problems/two-sum" },
    { id: "2", title: "Add Two Numbers", slug: "add-two-numbers", difficulty: "Medium", acceptance: "43.1", tags: ["Linked List", "Math"], paid: false, url: "https://leetcode.com/problems/add-two-numbers" },
    { id: "3", title: "Longest Substring Without Repeating Characters", slug: "longest-substring", difficulty: "Medium", acceptance: "35.2", tags: ["String", "Sliding Window"], paid: false, url: "https://leetcode.com/problems/longest-substring" },
    { id: "4", title: "Median of Two Sorted Arrays", slug: "median-of-two-sorted-arrays", difficulty: "Hard", acceptance: "42.0", tags: ["Array", "Binary Search"], paid: false, url: "https://leetcode.com/problems/median-of-two-sorted-arrays" },
    { id: "20", title: "Valid Parentheses", slug: "valid-parentheses", difficulty: "Easy", acceptance: "41.0", tags: ["Stack", "String"], paid: false, url: "https://leetcode.com/problems/valid-parentheses" },
]

export default async function ProblemsPage() {
    let problems = []

    try {
        problems = await getProblemList(20, 0)
        if (!problems || problems.length === 0) {
            console.log("LeetCode API returned empty, using mock.")
            problems = MOCK_PROBLEMS
        }
    } catch (e) {
        console.warn("Failed to fetch problems:", e)
        problems = MOCK_PROBLEMS
    }

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
                <div>
                    <h1 className="text-[32px] font-display font-semibold text-[var(--foreground)] tracking-tight">
                        Problem Set
                    </h1>
                    <p className="text-[var(--text-secondary)] text-[14px]">
                        Curated list of algorithm challenges.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="px-3 py-1.5 bg-[var(--surface)] border border-[var(--border)] rounded-[6px] text-[12px] font-mono text-[var(--text-secondary)]">
                        Algorithms
                    </div>
                </div>
            </div>

            <ProblemTable problems={problems} />
        </div>
    )
}
