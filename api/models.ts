import type { VercelRequest, VercelResponse } from "@vercel/node"
import { GoogleGenAI } from "@google/genai"

const apiKey = process.env.GEMINI_API_KEY

if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured")
}

const ai = new GoogleGenAI({
    apiKey,
})

export default async function handler(
    request: VercelRequest,
    response: VercelResponse
) {
    try {
        const models = await ai.models.list()

        const availableModels = []

        for await (const model of models) {
            availableModels.push({
                name: model.name,
                displayName: model.displayName,
                supportedActions: model.supportedActions,
            })
        }

        return response.status(200).json({
            models: availableModels,
        })
    } catch (error) {
        console.error("Model list error:", error)

        return response.status(500).json({
            error:
                error instanceof Error
                    ? error.message
                    : "Unable to retrieve Gemini models.",
        })
    }
}