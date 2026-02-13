import { redis } from './redis'

const LEETCODE_API = "https://leetcode.com/graphql"

export async function getDailyProblem() {
    // 1. Check Cache
    const CACHE_KEY = "leetcode:daily"
    const cached = await redis.get(CACHE_KEY)
    if (cached) return cached

    const query = `
    query questionOfToday {
        activeDailyCodingChallengeQuestion {
            date
            link
            question {
                questionId
                title
                titleSlug
                difficulty
                topicTags {
                    name
                }
            }
        }
    }`

    try {
        const res = await fetch(LEETCODE_API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Referer": "https://leetcode.com"
            },
            body: JSON.stringify({ query }),
            next: { revalidate: 3600 }
        })

        if (!res.ok) throw new Error("LeetCode API Error")

        const data = await res.json()
        const challenge = data.data.activeDailyCodingChallengeQuestion

        const problem = {
            date: challenge.date,
            title: challenge.question.title,
            slug: challenge.question.titleSlug,
            difficulty: challenge.question.difficulty,
            tags: challenge.question.topicTags.map((t: any) => t.name),
            url: `https://leetcode.com${challenge.link}`
        }

        // 2. Cache (24 hours)
        await redis.set(CACHE_KEY, problem, { ex: 86400 })

        return problem
    } catch (error) {
        console.error("Failed to fetch LeetCode daily:", error)
        return null
    }
}

export async function getProblemList(limit = 20, skip = 0) {
    // 1. Check Cache
    const CACHE_KEY = `leetcode:list:${limit}:${skip}`
    const cached = await redis.get(CACHE_KEY)
    if (cached) return cached

    const query = `
    query problemsetQuestionList($categorySlug: String, $limit: Int, $skip: Int, $filters: QuestionListFilterInput) {
        problemsetQuestionList: questionList(
            categorySlug: $categorySlug
            limit: $limit
            skip: $skip
            filters: $filters
        ) {
            total: totalNum
            questions: data {
                acRate
                difficulty
                freqBar
                frontendQuestionId: questionFrontendId
                isFavorited
                paidOnly: isPaidOnly
                status
                title
                titleSlug
                topicTags {
                    name
                    id
                    slug
                }
                hasSolution
                hasVideoSolution
            }
        }
    }`

    try {
        const res = await fetch(LEETCODE_API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Referer": "https://leetcode.com"
            },
            body: JSON.stringify({
                query,
                variables: {
                    categorySlug: "",
                    limit,
                    skip,
                    filters: {}
                }
            }),
            next: { revalidate: 3600 }
        })

        if (!res.ok) throw new Error("LeetCode API Error")

        const data = await res.json()
        const questions = data.data.problemsetQuestionList.questions.map((q: any) => ({
            id: q.frontendQuestionId,
            title: q.title,
            slug: q.titleSlug,
            difficulty: q.difficulty,
            acceptance: q.acRate.toFixed(1),
            tags: q.topicTags.map((t: any) => t.name),
            paid: q.paidOnly,
            url: `https://leetcode.com/problems/${q.titleSlug}`
        }))

        // 2. Cache (1 hour)
        await redis.set(CACHE_KEY, questions, { ex: 3600 })

        return questions
    } catch (error) {
        console.error("Failed to fetch LeetCode list:", error)
        return []
    }
}

