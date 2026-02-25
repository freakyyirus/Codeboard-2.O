import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { auth } from "@clerk/nextjs/server";

// Judge0 API (RapidAPI)
const JUDGE0_URL = "https://judge0-ce.p.rapidapi.com";

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
        const { code, language, stdin, problemId } = await req.json();

        if (!process.env.JUDGE0_API_KEY) {
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
                    const response = await fetch(`${JUDGE0_URL}/submissions?base64_encoded=false&wait=true`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "x-rapidapi-host": process.env.JUDGE0_API_HOST || "judge0-ce.p.rapidapi.com",
                            "x-rapidapi-key": process.env.JUDGE0_API_KEY,
                        },
                        body: JSON.stringify({
                            source_code: code,
                            language_id: languageId,
                            stdin: tc.input,
                            expected_output: tc.expected_output,
                            cpu_time_limit: 2.0
                        }),
                    });

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
        const response = await fetch(`${JUDGE0_URL}/submissions?base64_encoded=false&wait=true`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-rapidapi-host": process.env.JUDGE0_API_HOST || "judge0-ce.p.rapidapi.com",
                "x-rapidapi-key": process.env.JUDGE0_API_KEY,
            },
            body: JSON.stringify({
                source_code: code,
                language_id: languageId,
                stdin: stdin || "",
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            let errorMessage = "Execution failed";
            try {
                const errorJson = JSON.parse(errorText);
                errorMessage = errorJson.message || errorText;
            } catch {
                errorMessage = errorText;
            }
            if (response.status === 401 || response.status === 403) {
                errorMessage = "Invalid API Key or Subscription. Please check your RapidAPI Judge0 subscription.";
            }
            return NextResponse.json({ error: errorMessage }, { status: response.status });
        }

        const data = await response.json();
        return NextResponse.json(data);

    } catch (error) {
        console.error("Execution Error:", error);
        return NextResponse.json({
            error: `Failed to execute code: ${error instanceof Error ? error.message : String(error)}`
        }, { status: 500 });
    }
}
