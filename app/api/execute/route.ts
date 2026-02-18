import { NextResponse } from "next/server";

// Judge0 API (RapidAPI)
const JUDGE0_URL = "https://judge0-ce.p.rapidapi.com";

// Piston API (Free Fallback)
const PISTON_URL = "https://emkc.org/api/v2/piston";

// Language IDs for Judge0 CE
const JUDGE0_LANGUAGE_MAPPING: Record<string, number> = {
    javascript: 63,
    python: 71,
    cpp: 54, // C++ (GCC 9.2.0)
    java: 62, // Java (OpenJDK 13.0.1)
};

export async function POST(req: Request) {
    try {
        const { code, language, stdin } = await req.json();

        // 1. Try Judge0 first (if API key is present)
        if (process.env.JUDGE0_API_KEY) {
            try {
                const languageId = JUDGE0_LANGUAGE_MAPPING[language.toLowerCase()];
                if (languageId) {
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

                    if (response.ok) {
                        const data = await response.json();
                        return NextResponse.json(data);
                    }
                }
            } catch (judge0Error) {
                console.warn("Judge0 execution failed, trying Piston...", judge0Error);
            }
        }

        // 2. Fallback to Piston API (Free, no key required)
        // Map language names for Piston
        const pistonLangMap: Record<string, string> = {
            javascript: "javascript",
            python: "python",
            cpp: "c++",
            java: "java"
        };

        const pistonLang = pistonLangMap[language.toLowerCase()];
        if (!pistonLang) {
            return NextResponse.json({ error: "Unsupported language" }, { status: 400 });
        }

        const pistonResponse = await fetch(`${PISTON_URL}/execute`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                language: pistonLang,
                version: "*",
                files: [{ content: code }],
                stdin: stdin || "",
            }),
        });

        if (!pistonResponse.ok) {
            throw new Error(`Piston API Error: ${pistonResponse.statusText}`);
        }

        const pistonData = await pistonResponse.json();

        // Transform Piston response to match Judge0 format for frontend compatibility
        return NextResponse.json({
            stdout: pistonData.run.stdout,
            stderr: pistonData.run.stderr,
            compile_output: pistonData.compile?.output || "",
            status: {
                description: pistonData.run.code === 0 ? "Accepted" : "Runtime Error"
            },
            time: (pistonData.run.duration / 1000).toFixed(3), // ms to s
            memory: 0 // Piston doesn't return memory usage in easy format
        });

    } catch (error) {
        console.error("Execution Error:", error);
        return NextResponse.json({ error: "Failed to execute code. Please try again." }, { status: 500 });
    }
}
