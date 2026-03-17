import { NextRequest, NextResponse } from "next/server"
import { createGoogleGenerativeAI } from "@ai-sdk/google"
import { createAnthropic } from "@ai-sdk/anthropic"
import { createOpenRouter } from "@openrouter/ai-sdk-provider"
import { generateObject } from "ai"
import { z } from "zod"

export async function POST(request: NextRequest) {
    try {
        const { code, language, aiSettings } = await request.json()

        if (!code || !language) {
            return NextResponse.json(
                { error: "Code and language are required" },
                { status: 400 }
            )
        }

        // --- DYNAMIC AI PROVIDER LOGIC ---
        let modelBinding;
        
        const provider = aiSettings?.provider || 'system';
        // Fallback sequentially if models aren't provided
        const modelName = aiSettings?.model && aiSettings.model !== 'system-default' 
            ? aiSettings.model 
            : 'gemini-2.5-flash'; // core default
            
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
            modelBinding = anthropic(modelName === 'gemini-2.5-flash' ? 'claude-3-5-sonnet-20241022' : modelName);
        } else if (provider === 'openrouter') {
            const openrouter = createOpenRouter({
                apiKey: customKey || process.env.OPENROUTER_API_KEY,
            });
            modelBinding = openrouter(modelName === 'gemini-2.5-flash' ? 'anthropic/claude-3.5-sonnet' : modelName);
        } else {
             const google = createGoogleGenerativeAI({
                apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
            });
            modelBinding = google('gemini-2.5-flash');
        }

        const { object } = await generateObject({
            model: modelBinding,
            system: `You are an expert Senior Software Engineer performing a code review. 
            Analyze the provided code and return a structured JSON evaluation.
            Be strict but helpful. The score should reflect code quality, efficiency, edge case handling, and readability (0-100).
            Limit issues to the top 5 most important ones. Minimum 1 strength and 1 improvement required.`,
            prompt: `Review this ${language} code:\n\n${code}`,
            schema: z.object({
                score: z.number().min(0).max(100).describe("Overall code quality score from 0 to 100"),
                issues: z.array(z.object({
                    line: z.number().describe("The line number where the issue occurs"),
                    severity: z.enum(["error", "warning", "info", "suggestion"]),
                    message: z.string().describe("A concise description of the issue"),
                    suggestion: z.string().optional().describe("A suggestion on how to fix it")
                })).describe("List of specific issues found in the code"),
                summary: z.string().describe("A brief 1-2 sentence overall summary of the code review"),
                strengths: z.array(z.string()).describe("List of things done well in the code"),
                improvements: z.array(z.string()).describe("List of general architectural or logic improvements")
            })
        });

        return NextResponse.json(object)
    } catch (error: any) {
        console.error("AI Review Error:", error);
        return NextResponse.json(
            { error: "Failed to analyze code", details: error.message || error.toString() },
            { status: 500 }
        )
    }
}
