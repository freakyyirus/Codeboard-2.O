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
            : 'google/gemini-2.5-flash';
            
        const customKey = aiSettings?.apiKey?.trim() || null;

        if (provider === 'google') {
            if (!customKey && !process.env.GOOGLE_GENERATIVE_AI_API_KEY) throw new Error("Google AI API Key is missing.");
            const google = createGoogleGenerativeAI({
                apiKey: customKey || process.env.GOOGLE_GENERATIVE_AI_API_KEY,
            });
            const cleanModel = modelName.replace('google/', '').replace('anthropic/', '');
            modelBinding = google(cleanModel || 'gemini-2.5-flash');
        } else if (provider === 'anthropic') {
            if (!customKey && !process.env.ANTHROPIC_API_KEY) throw new Error("Anthropic API Key is missing.");
            const anthropic = createAnthropic({
                apiKey: customKey || process.env.ANTHROPIC_API_KEY,
            });
            const cleanModel = modelName.replace('google/', '').replace('anthropic/', '');
            modelBinding = anthropic(cleanModel === 'gemini-2.5-flash' || cleanModel === 'gemini-1.5-flash' ? 'claude-3-haiku-20240307' : cleanModel);
        } else {
            // Default to OpenRouter or use it explicitly
            const openRouterKey = customKey || process.env.OPENROUTER_API_KEY;
            
            // If they don't have OpenRouter key but DO have Google (from old setup), fallback to Google to save them from a crash!
            if (!openRouterKey && process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
                const google = createGoogleGenerativeAI({ apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY });
                modelBinding = google('gemini-2.5-flash');
            } else if (!openRouterKey) {
                throw new Error("OpenRouter API Key is missing! Please enter your OpenRouter key in the AI Settings (⚙️ icon) to use the AI.");
            } else {
                const openrouter = createOpenRouter({ apiKey: openRouterKey });
                let finalModel = modelName;
                if (modelName === 'gemini-1.5-flash' || modelName === 'gemini-2.5-flash') finalModel = 'google/gemini-2.5-flash';
                if (modelName === 'claude-3-haiku-20240307') finalModel = 'anthropic/claude-3-haiku';
                if (modelName === 'claude-3-5-sonnet-20241022') finalModel = 'anthropic/claude-3.5-sonnet';
                modelBinding = openrouter(finalModel);
            }
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
