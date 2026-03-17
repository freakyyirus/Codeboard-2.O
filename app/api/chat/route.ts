import { createGoogleGenerativeAI } from "@ai-sdk/google"
import { createAnthropic } from "@ai-sdk/anthropic"
import { createOpenRouter } from "@openrouter/ai-sdk-provider"
import { streamText } from "ai"

export const runtime = "edge"

export async function POST(req: Request) {
    try {
        const { messages, problemTitle, difficulty, userCode, aiSettings } = await req.json()

        let modelBinding;
        
        const provider = aiSettings?.provider || 'system';
        const modelName = aiSettings?.model && aiSettings.model !== 'system-default' 
            ? aiSettings.model 
            : 'gemini-1.5-flash';
            
        const customKey = aiSettings?.apiKey?.trim() || null;

        if (provider === 'google' || (provider === 'system' && process.env.GOOGLE_GENERATIVE_AI_API_KEY)) {
            const google = createGoogleGenerativeAI({
                apiKey: customKey || process.env.GOOGLE_GENERATIVE_AI_API_KEY,
            });
            modelBinding = google(modelName);
        } else if (provider === 'anthropic' || (provider === 'system' && process.env.ANTHROPIC_API_KEY)) {
            const anthropic = createAnthropic({
                apiKey: customKey || process.env.ANTHROPIC_API_KEY,
            });
            modelBinding = anthropic(modelName === 'gemini-1.5-flash' ? 'claude-3-haiku-20240307' : modelName);
        } else if (provider === 'openrouter') {
            const openrouter = createOpenRouter({
                apiKey: customKey || process.env.OPENROUTER_API_KEY,
            });
            modelBinding = openrouter(modelName === 'gemini-1.5-flash' ? 'anthropic/claude-3-haiku' : modelName);
        } else {
             const google = createGoogleGenerativeAI({
                apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
            });
            modelBinding = google('gemini-1.5-flash');
        }

        const result = await streamText({
            model: modelBinding,
            messages: [
                {
                    role: "system",
                    content: `You are a friendly Senior Software Engineer helping a student with DSA (Data Structures and Algorithms).
          Current Problem: ${problemTitle || "Not specified"}
          Difficulty: ${difficulty || "Not specified"}
          User's Code: ${userCode || "Not provided"}
          
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
