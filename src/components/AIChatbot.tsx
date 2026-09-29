import { useState } from "react"
import { Bot, Send, X, Loader2 } from "lucide-react"

type Message = {
    role: "user" | "assistant"
    content: string
}

export const AIChatbot = () => {
    const [open, setOpen] = useState(false)
    const [input, setInput] = useState("")
    const [loading, setLoading] = useState(false)

    const [messages, setMessages] = useState<Message[]>([
        {
            role: "assistant",
            content:
                "Hey! 👋 I'm Jankristyan's portfolio assistant. Ask me anything about his skills, projects, experience, or services!",
        },
    ])

    const sendMessage = async () => {
        const message = input.trim()

        if (!message || loading) return

        setInput("")

        setMessages((prev) => [
            ...prev,
            {
                role: "user",
                content: message,
            },
        ])

        setLoading(true)

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message,
                }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(
                    data.error || "Something went wrong."
                )
            }

            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content: data.reply,
                },
            ])
        } catch (error) {
            console.error("Chat error:", error)

            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content:
                        "Sorry! I'm having trouble connecting right now. Please try again in a few seconds. 😅",
                },
            ])
        } finally {
            setLoading(false)
        }
    }

    const handleKeyDown = (
        event: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (event.key === "Enter") {
            sendMessage()
        }
    }

    return (
        <>
            {/* Chat Button */}
            {!open && (
                <button
                    onClick={() => setOpen(true)}
                    className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform duration-200 hover:scale-105"
                    aria-label="Open AI assistant"
                >
                    <Bot size={24} />
                </button>
            )}

            {/* Chat Window */}
            {open && (
                <div className="fixed bottom-6 right-6 z-50 flex h-[500px] w-[350px] flex-col overflow-hidden rounded-2xl border bg-background shadow-2xl">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b px-4 py-3">
                        <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                <Bot size={18} />
                            </div>

                            <div>
                                <h3 className="text-sm font-semibold">
                                    Jankristyan AI
                                </h3>

                                <p className="text-xs text-muted-foreground">
                                    Portfolio Assistant
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={() => setOpen(false)}
                            className="rounded-md p-2 transition-colors hover:bg-muted"
                            aria-label="Close AI assistant"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 space-y-3 overflow-y-auto p-4">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`flex ${
                                    message.role === "user"
                                        ? "justify-end"
                                        : "justify-start"
                                }`}
                            >
                                <div
                                    className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${
                                        message.role === "user"
                                            ? "rounded-br-sm bg-primary text-primary-foreground"
                                            : "rounded-bl-sm bg-muted"
                                    }`}
                                >
                                    {message.content}
                                </div>
                            </div>
                        ))}

                        {loading && (
                            <div className="flex justify-start">
                                <div className="flex items-center gap-2 rounded-2xl rounded-bl-sm bg-muted px-3 py-2 text-sm">
                                    <Loader2
                                        size={15}
                                        className="animate-spin"
                                    />
                                    Thinking...
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Input */}
                    <div className="border-t p-3">
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(event) =>
                                    setInput(event.target.value)
                                }
                                onKeyDown={handleKeyDown}
                                placeholder="Ask about my portfolio..."
                                disabled={loading}
                                className="min-w-0 flex-1 rounded-lg border bg-background px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-primary/30"
                            />

                            <button
                                onClick={sendMessage}
                                disabled={!input.trim() || loading}
                                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
                                aria-label="Send message"
                            >
                                <Send size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}