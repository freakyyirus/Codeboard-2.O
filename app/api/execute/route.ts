import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { auth } from "@clerk/nextjs/server";
import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "@/lib/redis";

// Judge0 API (RapidAPI)
const JUDGE0_URL = "https://judge0-ce.p.rapidapi.com";

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Per-user rate limiter: 5 code executions per 60 seconds
const executeRateLimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, "60 s"),
    analytics: true,
    prefix: "ratelimit:execute",
});

// Language IDs for Judge0 CE
const JUDGE0_LANGUAGE_MAPPING: Record<string, number> = {
    javascript: 63,
    python: 71,
    cpp: 54, // C++ (GCC 9.2.0)
    java: 62, // Java (OpenJDK 13.0.1)
};

function getServiceSupabase() {
    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
}

export async function POST(req: Request) {
    try {
        // Rate limit per user
        const { userId } = await auth();
        const identifier = userId || req.headers.get("x-forwarded-for") || "anonymous";
        const { success, limit, remaining, reset } = await executeRateLimit.limit(identifier);

        if (!success) {
            const retryAfter = Math.ceil((reset - Date.now()) / 1000);
            return NextResponse.json(
                {
                    error: `Rate limit exceeded. You can run ${limit} executions per minute. Please wait ${retryAfter}s and try again.`,
                    retryAfter,
                },
                {
                    status: 429,
                    headers: {
                        "Retry-After": String(retryAfter),
                        "X-RateLimit-Limit": String(limit),
                        "X-RateLimit-Remaining": String(remaining),
                    },
                }
            );
        }

        const { code, language, stdin, problemId } = await req.json();

        const API_KEYS = [
            process.env.JUDGE0_API_KEY,
            process.env.JUDGE0_API_KEY_FALLBACK_1,
            process.env.JUDGE0_API_KEY_FALLBACK_2
        ].filter(Boolean) as string[];

        if (API_KEYS.length === 0) {
            return NextResponse.json({
                error: "Execution Error: JUDGE0_API_KEY is missing in server environment."
            }, { status: 500 });
        }

        const languageId = JUDGE0_LANGUAGE_MAPPING[language.toLowerCase()];
        if (!languageId) {
            return NextResponse.json({ error: "Unsupported language" }, { status: 400 });
        }

        if (problemId) {
            const supabase = getServiceSupabase();
            const { data: testCases, error } = await supabase
                .from('test_cases')
                .select('*')
                .eq('problem_id', problemId)
                .order('created_at', { ascending: true });

            if (error) {
                console.error("Failed to fetch test cases:", error);
                return NextResponse.json({ error: "Failed to fetch test cases" }, { status: 500 });
            }

            if (testCases && testCases.length > 0) {
                let lastResult = null;

                // Execute sequentially to avoid rate limits on free tier
                for (let i = 0; i < testCases.length; i++) {
                    const tc = testCases[i];
                    let response: Response | null = null;
                    let lastError = null;

                    for (let keyIdx = 0; keyIdx < API_KEYS.length; keyIdx++) {
                        const apiKey = API_KEYS[keyIdx];
                        try {
                            const res = await fetch(`${JUDGE0_URL}/submissions?base64_encoded=false&wait=true`, {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                    "x-rapidapi-host": process.env.JUDGE0_API_HOST || "judge0-ce.p.rapidapi.com",
                                    "x-rapidapi-key": apiKey,
                                },
                                body: JSON.stringify({
                                    source_code: code,
                                    language_id: languageId,
                                    stdin: tc.input,
                                    expected_output: tc.expected_output,
                                    cpu_time_limit: 2.0
                                }),
                            });

                            if (res.status === 429) {
                                console.warn(`Judge0 rate limit hit for key ${keyIdx + 1}, trying next after backoff...`);
                                await sleep(500 * Math.pow(2, keyIdx)); // 500ms, 1s, 2s backoff
                                continue;
                            }

                            response = res;
                            break;
                        } catch (e) {
                            lastError = e;
                            console.error("Fetch error or network issue:", e);
                            await sleep(500);
                            continue;
                        }
                    }

                    if (!response) {
                        return NextResponse.json({ error: "Judge0 rate limit exceeded across all available API keys. Please try again later." }, { status: 429 });
                    }

                    if (!response.ok) {
                        return NextResponse.json({ error: "Judge0 API Error" }, { status: response.status });
                    }

                    const result = await response.json();
                    lastResult = result;

                    // 3 = Accepted
                    if (result.status?.id !== 3) {
                        return NextResponse.json({
                            ...result,
                            failed_test_case: {
                                input: tc.is_hidden ? "Hidden" : tc.input,
                                expected_output: tc.is_hidden ? "Hidden" : tc.expected_output,
                                received_output: tc.is_hidden ? "Hidden" : result.stdout,
                                is_hidden: tc.is_hidden
                            },
                            total_passed: i,
                            total_test_cases: testCases.length,
                            is_final: true,
                            verdict: result.status?.description || "Wrong Answer"
                        });
                    }

                    // Small delay between test case executions to avoid rate limiting
                    if (i < testCases.length - 1) {
                        await sleep(500);
                    }
                }

                // If we reach here, all test cases passed!
                // Save to solves table if authenticated
                const { userId } = await auth();
                if (userId) {
                    await supabase.from('solves').insert({
                        user_id: userId,
                        problem_id: problemId,
                        platform: 'leetcode', // Assuming default platform for local problems
                        code_snippet: code,
                        time_taken: lastResult.time ? parseFloat(lastResult.time) : null
                    });
                }

                return NextResponse.json({
                    ...lastResult,
                    status: { id: 3, description: "Accepted" },
                    total_passed: testCases.length,
                    total_test_cases: testCases.length,
                    is_final: true,
                    verdict: "Accepted"
                });
            }
        }

        // Standard Single Execution (Scratchpad or no problemId)
        let singleResponse: Response | null = null;
        let lastSingleError = null;

        for (let keyIdx = 0; keyIdx < API_KEYS.length; keyIdx++) {
            const apiKey = API_KEYS[keyIdx];
            try {
                const res = await fetch(`${JUDGE0_URL}/submissions?base64_encoded=false&wait=true`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "x-rapidapi-host": process.env.JUDGE0_API_HOST || "judge0-ce.p.rapidapi.com",
                        "x-rapidapi-key": apiKey,
                    },
                    body: JSON.stringify({
                        source_code: code,
                        language_id: languageId,
                        stdin: stdin || "",
                    }),
                });

                if (res.status === 429) {
                    console.warn(`Judge0 rate limit hit for key ${keyIdx + 1} on scratchpad, trying next after backoff...`);
                    await sleep(500 * Math.pow(2, keyIdx));
                    continue;
                }

                singleResponse = res;
                break;
            } catch (e) {
                lastSingleError = e;
                console.error("Fetch error or network issue:", e);
                await sleep(500);
                continue;
            }
        }

        if (!singleResponse) {
            return NextResponse.json({ error: "Judge0 rate limit exceeded across all available API keys. Please try again later." }, { status: 429 });
        }

        if (!singleResponse.ok) {
            let errorMessage = "Judge0 API Error";
            if (singleResponse.status === 403 || singleResponse.status === 401) {
                errorMessage = "Invalid API Key or Subscription. Please check your RapidAPI Judge0 subscription.";
            }

            return NextResponse.json({ error: errorMessage }, { status: singleResponse.status });
        }

        const result = await singleResponse.json();
        return NextResponse.json(result);

    } catch (error) {
        console.error("Execution Error:", error);
        return NextResponse.json({
            error: `Failed to execute code: ${error instanceof Error ? error.message : String(error)}`
        }, { status: 500 });
    }
}
