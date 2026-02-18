import { google } from "@ai-sdk/google";
import { streamText } from "ai";

// IMPORTANT: Set runtime to edge for streaming support on Vercel
// export const runtime = "edge"; // Switch to Node.js runtime for better compatibility

export async function POST(req: Request) {
    try {
        const { messages, context } = await req.json();

        const result = await streamText({
            model: google("gemini-1.5-flash"),
            messages: [
                {
                    role: "system",
                    content: `You are a friendly Senior Software Engineer helping a student with DSA (Data Structures and Algorithms).
          Current Problem: ${context?.problemTitle || "Not specified"}
          Difficulty: ${context?.difficulty || "Not specified"}
          User's Code: ${context?.userCode || "Not provided"}
          
          Guidelines:
          - Ask guiding questions instead of giving direct answers.
          - Break down complex problems into smaller steps.
          - Use Socratic method - help them think through it.
          - Be encouraging and patient.
          - If code is provided, analyze it for logic errors or edge cases.`,
                },
                ...messages,
            ],
        });

        return result.toTextStreamResponse();
    } catch (error) {
        console.error("AI Chat Error:", error);
        return new Response(JSON.stringify({ error: "Failed to process chat" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
