import { NextResponse } from "next/server";

const JUDGE0_URL = "https://judge0-ce.p.rapidapi.com";

// Language IDs for Judge0 CE
const LANGUAGE_MAPPING: Record<string, number> = {
    javascript: 63,
    python: 71,
    cpp: 54, // C++ (GCC 9.2.0)
    java: 62, // Java (OpenJDK 13.0.1)
};

export async function POST(req: Request) {
    try {
        const { code, language, stdin } = await req.json();

        const languageId = LANGUAGE_MAPPING[language.toLowerCase()];
        if (!languageId) {
            return NextResponse.json({ error: "Unsupported language" }, { status: 400 });
        }

        // 1. Create Submission
        const response = await fetch(`${JUDGE0_URL}/submissions?base64_encoded=false&wait=true`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-rapidapi-host": process.env.JUDGE0_API_HOST || "judge0-ce.p.rapidapi.com",
                "x-rapidapi-key": process.env.JUDGE0_API_KEY || "",
            },
            body: JSON.stringify({
                source_code: code,
                language_id: languageId,
                stdin: stdin || "",
            }),
        });

        const data = await response.json();

        // With wait=true, Judge0 will try to return the result directly if it's fast enough.
        // Otherwise, we get a token. But RapidAPI Judge0 usually supports wait=true.

        return NextResponse.json(data);
    } catch (error) {
        console.error("Execution Error:", error);
        return NextResponse.json({ error: "Failed to execute code" }, { status: 500 });
    }
}
