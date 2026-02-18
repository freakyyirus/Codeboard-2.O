import { NextResponse } from "next/server";

// Judge0 API (RapidAPI)
const JUDGE0_URL = "https://judge0-ce.p.rapidapi.com";

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

        if (!process.env.JUDGE0_API_KEY) {
            return NextResponse.json({
                error: "Execution Error: JUDGE0_API_KEY is missing in server environment."
            }, { status: 500 });
        }

        const languageId = JUDGE0_LANGUAGE_MAPPING[language.toLowerCase()];
        if (!languageId) {
            return NextResponse.json({ error: "Unsupported language" }, { status: 400 });
        }

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
            console.error(`Judge0 API Error (${response.status}):`, errorText);

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
