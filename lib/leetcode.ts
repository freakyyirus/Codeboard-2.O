import { unstable_cache } from 'next/cache';

const LEETCODE_API_ENDPOINT = 'https://leetcode.com/graphql';

interface LeetCodeStats {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  ranking: number;
  acceptanceRate: number;
  username: string;
}

const LEETCODE_QUERY = `
  query userProblemsSolved($username: String!) {
    allQuestionsCount {
      difficulty
      count
    }
    matchedUser(username: $username) {
      submitStats {
        acSubmissionNum {
          difficulty
          count
          submissions
        }
      }
      profile {
        ranking
        reputation
      }
    }
  }
`;

export async function fetchLeetCodeStats(username: string): Promise<LeetCodeStats | null> {
  if (!username) return null;

  try {
    const response = await fetch(LEETCODE_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'CodeBoard/2.0',
      },
      body: JSON.stringify({
        query: LEETCODE_QUERY,
        variables: { username },
      }),
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!response.ok) {
      console.error(`LeetCode API Error: ${response.statusText}`);
      return null;
    }

    const data = await response.json();

    if (data.errors) {
      console.error('LeetCode GraphQL Errors:', data.errors);
      return null;
    }

    const matchedUser = data.data?.matchedUser;

    if (!matchedUser) return null;

    const stats = matchedUser.submitStats.acSubmissionNum;
    const profile = matchedUser.profile;

    return {
      username,
      totalSolved: stats.find((s: any) => s.difficulty === 'All')?.count || 0,
      easySolved: stats.find((s: any) => s.difficulty === 'Easy')?.count || 0,
      mediumSolved: stats.find((s: any) => s.difficulty === 'Medium')?.count || 0,
      hardSolved: stats.find((s: any) => s.difficulty === 'Hard')?.count || 0,
      ranking: profile?.ranking || 0,
      acceptanceRate: 0, // Calculate if needed from total submissions
    };

  } catch (error) {
    console.error('Failed to fetch LeetCode stats:', error);
    return null;
  }
}

// Cached version for high-performance dashboard rendering
export const getCachedLeetCodeStats = unstable_cache(
  async (username: string) => fetchLeetCodeStats(username),
  ['leetcode-stats'],
  { revalidate: 3600, tags: ['leetcode'] }
);

// Fetch LeetCode Daily Challenge
const DAILY_PROBLEM_QUERY = `
  query questionOfToday {
    activeDailyCodingChallengeQuestion {
      date
      link
      question {
        title
        titleSlug
        difficulty
        topicTags {
          name
        }
      }
    }
  }
`;

export async function getDailyProblem() {
  try {
    const response = await fetch(LEETCODE_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'CodeBoard/2.0',
      },
      body: JSON.stringify({ query: DAILY_PROBLEM_QUERY }),
      next: { revalidate: 3600 }
    });

    if (!response.ok) return null;

    const data = await response.json();
    const challenge = data.data?.activeDailyCodingChallengeQuestion;

    if (!challenge) return null;

    return {
      title: challenge.question.title,
      titleSlug: challenge.question.titleSlug,
      difficulty: challenge.question.difficulty,
      link: challenge.link,
      topicTags: challenge.question.topicTags,
      date: challenge.date,
    };
  } catch (error) {
    console.error('Failed to fetch daily problem:', error);
    return null;
  }
}
