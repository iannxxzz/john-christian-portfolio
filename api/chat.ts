import type { VercelRequest, VercelResponse } from "@vercel/node"

type OpenRouterResponse = {
    choices?: {
        message?: {
            content?: string
        }
    }[]
}

export default async function handler(
    req: VercelRequest,
    res: VercelResponse
) {
    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Method not allowed.",
        })
    }

    const apiKey = process.env.OPENROUTER_API_KEY

    if (!apiKey) {
        console.error("OPENROUTER_API_KEY is missing.")

        return res.status(500).json({
            error: "OpenRouter API key is not configured.",
        })
    }

    try {
        const { message } = req.body

        if (
            typeof message !== "string" ||
            !message.trim()
        ) {
            return res.status(400).json({
                error: "Message is required.",
            })
        }

        const response = await fetch(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    "Content-Type": "application/json",
                    "HTTP-Referer":
                        "https://john-christian-portfolio.vercel.app",
                    "X-Title":
                        "Jankristyan Portfolio Assistant",
                },
                body: JSON.stringify({
                    model: "openrouter/free",
                    messages: [
                        {
                            role: "system",
                            content: `
You are Jankristyan's portfolio assistant.

You are embedded inside Jankristyan's personal portfolio website.

Your job is to answer questions about:

- Jankristyan's skills
- projects
- experience
- services
- technologies
- education
- portfolio
- contact information
- professional background

Keep responses friendly, concise, and natural.

Do not make up information about Jankristyan.

If information is not available in the portfolio context, say that you don't have that information rather than inventing an answer.

You can casually refer to Jankristyan as "John" when appropriate.

You are a portfolio assistant, not a general-purpose chatbot.
                            `.trim(),
                        },
                        {
                            role: "user",
                            content: message.trim(),
                        },
                    ],
                }),
            }
        )

        const contentType =
            response.headers.get("content-type")

        if (!contentType?.includes("application/json")) {
            const text = await response.text()

            console.error(
                "Non-JSON response from OpenRouter:",
                text
            )

            return res.status(response.status).json({
                error:
                    "OpenRouter returned an unexpected response.",
            })
        }

        const data =
            (await response.json()) as OpenRouterResponse

        if (!response.ok) {
            console.error(
                "OpenRouter API error:",
                data
            )

            return res.status(response.status).json({
                error:
                    "OpenRouter request failed.",
            })
        }

        const reply =
            data.choices?.[0]?.message?.content

        if (
            typeof reply !== "string" ||
            !reply.trim()
        ) {
            console.error(
                "OpenRouter returned no usable reply:",
                data
            )

            return res.status(502).json({
                error:
                    "The AI returned an empty response.",
            })
        }

        return res.status(200).json({
            reply: reply.trim(),
        })
    } catch (error) {
        console.error(
            "Chat API error:",
            error
        )

        return res.status(500).json({
            error:
                "Something went wrong while contacting the AI.",
        })
    }
}