import { useEffect, useState } from "react"

import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

import {
    Bot,
    Send,
    X,
    Loader2,
} from "lucide-react"

import {
    motion,
    AnimatePresence,
} from "motion/react"

type Message = {
    role: "user" | "assistant"
    content: string
}

type ChatResponse = {
    reply?: string
    error?: string
}

export const AIChatbot = () => {
    const [open, setOpen] = useState(false)
    const [input, setInput] = useState("")
    const [loading, setLoading] = useState(false)
    const [showHint, setShowHint] = useState(false)

    const [messages, setMessages] = useState<Message[]>([
        {
            role: "assistant",
            content:
                "Hey! 👋 I'm Jankristyan's Portfolio Assistant. Ask me anything about his skills, projects, experience, services and status!",
        },
    ])

    useEffect(() => {
        if (open) {
            setShowHint(false)
            return
        }

        let hideTimeout: ReturnType<typeof setTimeout>
        let interval: ReturnType<typeof setInterval>

        const showHintMessage = () => {
            setShowHint(true)

            hideTimeout = setTimeout(() => {
                setShowHint(false)
            }, 3000)
        }

        const initialTimeout = setTimeout(() => {
            showHintMessage()

            interval = setInterval(() => {
                showHintMessage()
            }, 8000)
        }, 2000)

        return () => {
            clearTimeout(initialTimeout)
            clearTimeout(hideTimeout)
            clearInterval(interval)
        }
    }, [open])

    const sendMessage = async () => {
        const trimmedInput = input.trim()

        if (!trimmedInput || loading) {
            return
        }

        const userMessage: Message = {
            role: "user",
            content: trimmedInput,
        }

        setMessages((prev) => [
            ...prev,
            userMessage,
        ])

        setInput("")
        setLoading(true)

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message: trimmedInput,
                }),
            })

            const contentType =
                response.headers.get("content-type")

            let data: ChatResponse = {}

            if (
                contentType?.includes(
                    "application/json"
                )
            ) {
                data = await response.json()
            } else {
                const text = await response.text()

                console.error(
                    "Non-JSON response from /api/chat:",
                    text
                )

                throw new Error(
                    `Chat request failed with status ${response.status}.`
                )
            }

            if (!response.ok) {
                throw new Error(
                    data.error ||
                        "Something went wrong."
                )
            }

            if (
                typeof data.reply !== "string" ||
                !data.reply.trim()
            ) {
                throw new Error(
                    "The AI returned an empty response."
                )
            }

            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content: data.reply!.trim(),
                },
            ])
        } catch (error) {
            console.error(
                "Chat error:",
                error
            )

            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content:
                        error instanceof Error
                            ? error.message
                            : "Sorry, something went wrong. Please try again.",
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
            event.preventDefault()
            sendMessage()
        }
    }

    const handleOpen = () => {
        setShowHint(false)
        setOpen(true)
    }

    return (
        <>
            {/* Floating chatbot button */}
            <AnimatePresence>
                {!open && (
                    <motion.div
                        className="fixed bottom-6 right-6 z-50"
                        initial={{
                            opacity: 0,
                            scale: 0.8,
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                        }}
                        exit={{
                            opacity: 0,
                            scale: 0.8,
                        }}
                    >
                        {/* Ambient glow */}
                        <motion.div
                            aria-hidden="true"
                            className="absolute inset-[-14px] rounded-full bg-white/10 blur-xl"
                            animate={{
                                scale: loading
                                    ? [1, 1.25, 1]
                                    : [1, 1.08, 1],
                                opacity: loading
                                    ? [0.25, 0.55, 0.25]
                                    : [0.15, 0.3, 0.15],
                            }}
                            transition={{
                                duration: loading
                                    ? 1.1
                                    : 3,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />

                        {/* Wave ring 1 */}
                        <motion.div
                            aria-hidden="true"
                            className="absolute inset-[-6px] rounded-full border border-white/10"
                            animate={{
                                scale: [1, 1.25, 1],
                                opacity: [0.35, 0, 0.35],
                            }}
                            transition={{
                                duration: 2.5,
                                repeat: Infinity,
                                ease: "easeOut",
                            }}
                        />

                        {/* Wave ring 2 */}
                        <motion.div
                            aria-hidden="true"
                            className="absolute inset-[-6px] rounded-full border border-white/10"
                            animate={{
                                scale: [1, 1.4, 1],
                                opacity: [0.25, 0, 0.25],
                            }}
                            transition={{
                                duration: 2.5,
                                delay: 0.8,
                                repeat: Infinity,
                                ease: "easeOut",
                            }}
                        />

                        {/* Floating hint */}
                        <AnimatePresence>
                            {showHint && (
                                <motion.div
                                    initial={{
                                        opacity: 0,
                                        y: 8,
                                        scale: 0.95,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                        scale: 1,
                                    }}
                                    exit={{
                                        opacity: 0,
                                        y: 8,
                                        scale: 0.95,
                                    }}
                                    transition={{
                                        duration: 0.25,
                                        ease: "easeOut",
                                    }}
                                    className="absolute bottom-[calc(100%+12px)] right-0 whitespace-nowrap rounded-xl border border-white/10 bg-black px-3 py-2 text-xs font-medium text-white shadow-xl"
                                >
                                    Hey! Questions? Ask me! 👋

                                    <span
                                        aria-hidden="true"
                                        className="absolute -bottom-1.5 right-5 h-3 w-3 rotate-45 border-r border-b border-white/10 bg-black"
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Chatbot button */}
                        <motion.button
                            type="button"
                            onClick={handleOpen}
                            aria-label="Open AI portfolio assistant"
                            className="relative flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-black text-white shadow-2xl"
                            whileHover={{
                                scale: 1.06,
                            }}
                            whileTap={{
                                scale: 0.94,
                            }}
                        >
                            <Bot
                                size={22}
                                aria-hidden="true"
                            />
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Chat window */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 20,
                            scale: 0.96,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                        }}
                        exit={{
                            opacity: 0,
                            y: 20,
                            scale: 0.96,
                        }}
                        transition={{
                            duration: 0.2,
                        }}
                        className="fixed bottom-6 right-6 z-50 w-[calc(100vw-3rem)] max-w-[350px]"
                    >
                        {/* External ambient aura */}
                        <motion.div
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-[-18px] rounded-[28px] bg-white/[0.04] blur-2xl"
                            animate={{
                                scale: loading
                                    ? [1, 1.03, 1]
                                    : [1, 1.015, 1],
                                opacity: loading
                                    ? [0.4, 0.75, 0.4]
                                    : [0.2, 0.35, 0.2],
                            }}
                            transition={{
                                duration: loading
                                    ? 1.1
                                    : 3.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />

                        {/* Wave ring */}
                        <motion.div
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-[-8px] rounded-[28px] border border-white/[0.08]"
                            animate={{
                                scale: loading
                                    ? [1, 1.025, 1]
                                    : [1, 1.01, 1],
                                opacity: loading
                                    ? [0.3, 0.65, 0.3]
                                    : [0.15, 0.3, 0.15],
                            }}
                            transition={{
                                duration: loading
                                    ? 1
                                    : 3,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />

                        {/* Chat panel */}
                        <div
                            className="relative flex h-[500px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl"
                            role="dialog"
                            aria-label="Jankristyan AI Portfolio Assistant"
                            aria-modal="false"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                                <div className="flex items-center gap-3">
                                    <div
                                        aria-hidden="true"
                                        className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.06]"
                                    >
                                        <Bot
                                            size={18}
                                            className="text-white"
                                        />
                                    </div>

                                    <div>
                                        <p className="text-sm font-medium text-white">
                                            Jankristyan AI
                                        </p>

                                        <p className="text-[11px] text-white/40">
                                            Portfolio Assistant
                                        </p>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={() =>
                                        setOpen(false)
                                    }
                                    aria-label="Close AI portfolio assistant"
                                    className="flex h-8 w-8 items-center justify-center rounded-full text-white/50 transition-colors hover:bg-white/10 hover:text-white"
                                >
                                    <X
                                        size={17}
                                        aria-hidden="true"
                                    />
                                </button>
                            </div>

                            {/* Messages */}
                            <div
                                role="log"
                                aria-live="polite"
                                aria-label="AI conversation"
                                className="flex-1 space-y-3 overflow-y-auto p-4"
                            >
                                {messages.map(
                                    (
                                        message,
                                        index
                                    ) => (
                                        <motion.div
                                            key={`${message.role}-${index}`}
                                            initial={{
                                                opacity: 0,
                                                y: 8,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                y: 0,
                                            }}
                                            className={`flex ${
                                                message.role ===
                                                "user"
                                                    ? "justify-end"
                                                    : "justify-start"
                                            }`}
                                        >
                                            <div
                                                className={`max-w-[82%] min-w-0 rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                                                    message.role ===
                                                    "user"
                                                        ? "bg-white text-black"
                                                        : "border border-white/10 bg-white/[0.06] text-white/80"
                                                }`}
                                            >
                                                {message.role ===
                                                "assistant" ? (
                                                    <div className="min-w-0 break-words">
                                                        <ReactMarkdown
                                                            remarkPlugins={[
                                                                remarkGfm,
                                                            ]}
                                                            components={{
                                                                p: ({
                                                                    children,
                                                                }) => (
                                                                    <p className="mb-2 last:mb-0">
                                                                        {
                                                                            children
                                                                        }
                                                                    </p>
                                                                ),

                                                                strong: ({
                                                                    children,
                                                                }) => (
                                                                    <strong className="font-semibold text-white">
                                                                        {
                                                                            children
                                                                        }
                                                                    </strong>
                                                                ),

                                                                ol: ({
                                                                    children,
                                                                }) => (
                                                                    <ol className="my-2 ml-5 list-decimal space-y-2">
                                                                        {
                                                                            children
                                                                        }
                                                                    </ol>
                                                                ),

                                                                ul: ({
                                                                    children,
                                                                }) => (
                                                                    <ul className="my-2 ml-5 list-disc space-y-1.5">
                                                                        {
                                                                            children
                                                                        }
                                                                    </ul>
                                                                ),

                                                                li: ({
                                                                    children,
                                                                }) => (
                                                                    <li className="pl-1">
                                                                        {
                                                                            children
                                                                        }
                                                                    </li>
                                                                ),

                                                                a: ({
                                                                    href,
                                                                    children,
                                                                }) => (
                                                                    <a
                                                                        href={
                                                                            href
                                                                        }
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="break-all text-white underline underline-offset-2 transition-opacity hover:opacity-70"
                                                                    >
                                                                        {
                                                                            children
                                                                        }
                                                                    </a>
                                                                ),

                                                                code: ({
                                                                    children,
                                                                }) => (
                                                                    <code className="rounded bg-white/10 px-1.5 py-0.5 text-[0.9em] text-white">
                                                                        {
                                                                            children
                                                                        }
                                                                    </code>
                                                                ),
                                                            }}
                                                        >
                                                            {
                                                                message.content
                                                            }
                                                        </ReactMarkdown>
                                                    </div>
                                                ) : (
                                                    message.content
                                                )}
                                            </div>
                                        </motion.div>
                                    )
                                )}

                                {/* Thinking indicator */}
                                {loading && (
                                    <motion.div
                                        role="status"
                                        aria-label="AI is thinking"
                                        initial={{
                                            opacity: 0,
                                            y: 8,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                        }}
                                        className="flex justify-start"
                                    >
                                        <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.06] px-3 py-2 text-white/50">
                                            <Loader2
                                                size={14}
                                                className="animate-spin"
                                                aria-hidden="true"
                                            />

                                            <span className="sr-only">
                                                AI is thinking
                                            </span>

                                            <div
                                                aria-hidden="true"
                                                className="flex gap-1"
                                            >
                                                <motion.span
                                                    className="h-1 w-1 rounded-full bg-white/50"
                                                    animate={{
                                                        opacity: [
                                                            0.25,
                                                            1,
                                                            0.25,
                                                        ],
                                                    }}
                                                    transition={{
                                                        duration: 1,
                                                        repeat: Infinity,
                                                    }}
                                                />

                                                <motion.span
                                                    className="h-1 w-1 rounded-full bg-white/50"
                                                    animate={{
                                                        opacity: [
                                                            0.25,
                                                            1,
                                                            0.25,
                                                        ],
                                                    }}
                                                    transition={{
                                                        duration: 1,
                                                        delay: 0.2,
                                                        repeat: Infinity,
                                                    }}
                                                />

                                                <motion.span
                                                    className="h-1 w-1 rounded-full bg-white/50"
                                                    animate={{
                                                        opacity: [
                                                            0.25,
                                                            1,
                                                            0.25,
                                                        ],
                                                    }}
                                                    transition={{
                                                        duration: 1,
                                                        delay: 0.4,
                                                        repeat: Infinity,
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </div>

                            {/* Input */}
                            <div className="border-t border-white/10 p-3">
                                <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] p-1">
                                    <label
                                        htmlFor="ai-chat-input"
                                        className="sr-only"
                                    >
                                        Ask the AI portfolio assistant
                                    </label>

                                    <input
                                        id="ai-chat-input"
                                        type="text"
                                        value={input}
                                        onChange={(event) =>
                                            setInput(
                                                event.target.value
                                            )
                                        }
                                        onKeyDown={
                                            handleKeyDown
                                        }
                                        disabled={loading}
                                        placeholder="Ask me anything..."
                                        className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-white outline-none placeholder:text-white/30 disabled:opacity-50"
                                    />

                                    <motion.button
                                        type="button"
                                        onClick={
                                            sendMessage
                                        }
                                        aria-label="Send message"
                                        disabled={
                                            loading ||
                                            !input.trim()
                                        }
                                        whileHover={{
                                            scale: 1.04,
                                        }}
                                        whileTap={{
                                            scale: 0.94,
                                        }}
                                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-black transition-opacity disabled:cursor-not-allowed disabled:opacity-30"
                                    >
                                        <Send
                                            size={16}
                                            aria-hidden="true"
                                        />
                                    </motion.button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}