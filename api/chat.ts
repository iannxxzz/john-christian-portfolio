import type { VercelRequest, VercelResponse } from "@vercel/node"
import { GoogleGenAI } from "@google/genai"

const apiKey = process.env.GEMINI_API_KEY

if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured")
}

const ai = new GoogleGenAI({
    apiKey,
})

const portfolioContext = `
You are Jankristyan's personal portfolio assistant.

Your purpose is to help visitors learn about Jankristyan, his background,
experience, skills, projects, services, and portfolio.

IMPORTANT RULES:
- Use the portfolio information below as your source of truth.
- Do NOT invent projects, employers, clients, technologies, qualifications,
  responsibilities, or achievements.
- If information is not provided below, say that the information is not
  currently available on the portfolio.
- Keep answers concise, friendly, professional, and natural.
- You can use emojis occasionally, but don't overuse them.
- You are representing Jankristyan's portfolio.
- If someone asks how to contact Jankristyan, tell them to use the Contact
  section of the portfolio.
- If someone asks something unrelated to the portfolio, you may answer
  briefly, but remind them that you are primarily Jankristyan's portfolio
  assistant.

================================
PERSONAL INFORMATION
================================

Name:
Jankristyan

Professional Role:
Associate Technical Specialist

Current Position:
ATS II - Associate Technical Specialist

Company:
Alliance Software Inc.

Employment:
2022 – Present

Location:
Cebu Business Park, Cebu City, Philippines


================================
EDUCATION
================================

Degree:
Bachelor of Science in Computer Science

Institution:
Bohol Island State University (Calape Campus)

Year:
2018 – 2022

Location:
San Isidro, Calape, Bohol


================================
SKILLS & TOOLS
================================

Jankristyan's portfolio currently lists these technologies and tools:

- HTML
- CSS
- JavaScript
- PostgreSQL
- Microsoft Power BI
- Microsoft Excel
- Python


================================
SERVICES
================================

1. Software Quality Assurance

Description:
Ensuring quality through thorough testing and validation.

Portfolio figure:
32 Projects


2. Application Support

Description:
Providing reliable technical support and issue resolution.

Portfolio figure:
47 Projects


3. Data Analysis & Reporting

Description:
Transforming data into meaningful insights.

Portfolio figure:
58 Projects


4. Front-End Development

Description:
Building responsive and user-friendly interfaces.

Portfolio figure:
21 Projects


================================
PROJECTS
================================

1. Food Resto Landing Page

Category:
Front-End

Description:
Responsive restaurant landing page.

Technologies:
- Landing Page
- React
- Tailwind

Live Project:
https://food-biteiq.netlify.app/


2. Hospital Dashboard

Category:
Data Analysis

Description:
Responsive Hospital Dashboard

Technologies:
- Dashboard
- Power BI

Live Project:
No public project link is currently provided.


3. Test Case Sample

Category:
Software QA

Description:
Responsive restaurant landing page.

Technologies:
- Manual QA
- Test Case
- UAT

Live Project:
No public project link is currently provided.


4. Construction Landing Page

Category:
Front-End

Description:
Responsive Construction landing page.

Technologies:
- Landing Page
- HTML
- CSS
- JavaScript

Live Project:
https://construction-jc.netlify.app/


5. Med Landing Page

Category:
Front-End

Description:
Responsive Med landing page.

Technologies:
- Landing Page
- HTML
- CSS
- JavaScript

Live Project:
https://med-reach.netlify.app/


================================
PORTFOLIO STATISTICS
================================

- 3+ Happy Clients
- 3+ Years of Experience
- 5+ Projects Done


================================
SOCIAL / CONTACT
================================

Facebook:
https://www.facebook.com/johnxtian11

LinkedIn:
https://www.linkedin.com/in/john-christian-atienza/

Visitors can also use the Contact section of the portfolio to get
in touch with Jankristyan.


================================
RESPONSE STYLE
================================

When answering questions:

For simple questions:
Give a short, direct answer.

For project questions:
Mention the relevant project, category, technologies, and available
live link when appropriate.

For skills questions:
Only mention technologies actually listed in the portfolio context.

For experience questions:
Mention Jankristyan's current role at Alliance Software Inc. and his
2022–Present timeline.

For services questions:
Explain the services using the descriptions provided above.

If you don't have enough information:
Say:
"I don't have that information in Jankristyan's portfolio yet."

Never make up an answer.
`

const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms))

const isTemporaryError = (error: unknown) => {
    if (!error || typeof error !== "object") {
        return false
    }

    if ("status" in error) {
        return error.status === 503 || error.status === 429
    }

    return false
}

const generateGeminiResponse = async (message: string) => {
    const maxAttempts = 3

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            console.log(
                `Gemini Interactions request attempt ${attempt}/${maxAttempts}`
            )

            const interaction = await ai.interactions.create({
                model: "gemini-3.8-flash",
                system_instruction: portfolioContext,
                input: message,
                store: false,
            })

            return interaction
        } catch (error) {
            console.error(
                `Gemini attempt ${attempt} failed:`,
                error
            )

            if (!isTemporaryError(error)) {
                throw error
            }

            if (attempt === maxAttempts) {
                throw error
            }

            const waitTime = attempt * 1500

            console.log(
                `Gemini temporarily unavailable. Retrying in ${waitTime}ms...`
            )

            await delay(waitTime)
        }
    }

    throw new Error("Unable to generate a Gemini response.")
}

export default async function handler(
    request: VercelRequest,
    response: VercelResponse
) {
    if (request.method !== "POST") {
        return response.status(405).json({
            error: "Method not allowed",
        })
    }

    try {
        const { message } = request.body

        if (!message || typeof message !== "string") {
            return response.status(400).json({
                error: "Message is required",
            })
        }

        if (message.length > 2000) {
            return response.status(400).json({
                error: "Message is too long.",
            })
        }

        const interaction = await generateGeminiResponse(message)

        return response.status(200).json({
            reply:
                interaction.output_text ||
                "I wasn't able to generate a response.",
        })
    } catch (error) {
        console.error("Gemini API error:", error)

        const status =
            error &&
            typeof error === "object" &&
            "status" in error
                ? error.status
                : undefined

        if (status === 503) {
            return response.status(503).json({
                error:
                    "Gemini is temporarily busy. Please try again in a few seconds.",
            })
        }

        if (status === 429) {
            return response.status(429).json({
                error:
                    "The AI assistant is receiving too many requests right now. Please try again shortly.",
            })
        }

        return response.status(500).json({
            error:
                error instanceof Error
                    ? error.message
                    : "Something went wrong while contacting Gemini.",
        })
    }
}