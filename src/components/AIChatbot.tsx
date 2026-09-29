import { useState } from "react"

import { Bot, Send, X, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"

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
            {/* ================================================== */}
            {/* FLOATING CHAT BUTTON */}
            {/* ================================================== */}

            <AnimatePresence>
                {!open && (
                    <motion.div
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
                        className="fixed bottom-6 right-6 z-50"
                    >
                        {/* Button Aura */}
                        <motion.div
                            className="pointer-events-none absolute inset-0 rounded-full bg-white/10 blur-xl"
                            animate={{
                                scale: [1, 1.35, 1],
                                opacity: [0.2, 0.45, 0.2],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />

                        {/* Wave Ring */}
                        <motion.div
                            className="pointer-events-none absolute -inset-2 rounded-full border border-white/10"
                            animate={{
                                scale: [1, 1.25, 1.4],
                                opacity: [0.5, 0.15, 0],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeOut",
                            }}
                        />

                        <motion.button
                            onClick={() => setOpen(true)}
                            whileHover={{
                                scale: 1.06,
                            }}
                            whileTap={{
                                scale: 0.94,
                            }}
                            className="relative flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-black text-white shadow-2xl transition-colors duration-300 hover:bg-neutral-900"
                            aria-label="Open AI assistant"
                        >
                            <Bot size={24} />
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ================================================== */}
            {/* CHAT WINDOW */}
            {/* ================================================== */}

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 20,
                            scale: 0.94,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                        }}
                        exit={{
                            opacity: 0,
                            y: 20,
                            scale: 0.94,
                        }}
                        transition={{
                            duration: 0.3,
                            ease: "easeOut",
                        }}
                        className="fixed bottom-6 right-6 z-50"
                    >
                        {/* ================================================== */}
                        {/* ANIMATED EXTERNAL AURA */}
                        {/* ================================================== */}

                        <div className="pointer-events-none absolute -inset-10">
                            {/* Large blurred ambient glow */}
                            <motion.div
                                className="absolute left-1/2 top-1/2 h-40 w-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.06] blur-3xl"
                                animate={{
                                    scaleX: loading
                                        ? [1, 1.2, 0.9, 1.15, 1]
                                        : [1, 1.08, 0.96, 1],
                                    scaleY: loading
                                        ? [1, 0.85, 1.15, 0.9, 1]
                                        : [1, 0.95, 1.05, 1],
                                    rotate: loading
                                        ? [0, 3, -3, 2, 0]
                                        : [0, 1, -1, 0],
                                    opacity: loading
                                        ? [0.2, 0.45, 0.25, 0.5, 0.2]
                                        : [0.12, 0.22, 0.12, 0.2],
                                }}
                                transition={{
                                    duration: loading ? 2.2 : 7,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            />

                            {/* First wave */}
                            <motion.div
                                className="absolute inset-3 rounded-[2rem] border border-white/[0.08]"
                                animate={{
                                    scale: loading
                                        ? [1, 1.08, 1.15, 1.08, 1]
                                        : [1, 1.035, 1.07, 1.035, 1],
                                    opacity: loading
                                        ? [0.2, 0.5, 0.15, 0.45, 0.2]
                                        : [0.2, 0.3, 0.12, 0.28, 0.2],
                                }}
                                transition={{
                                    duration: loading ? 2.4 : 6,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            />

                            {/* Second wave */}
                            <motion.div
                                className="absolute inset-3 rounded-[2rem] border border-white/[0.05]"
                                animate={{
                                    scale: loading
                                        ? [1.05, 1.14, 1.22, 1.14, 1.05]
                                        : [1.05, 1.08, 1.12, 1.08, 1.05],
                                    opacity: loading
                                        ? [0.1, 0.4, 0.05, 0.35, 0.1]
                                        : [0.1, 0.2, 0.05, 0.18, 0.1],
                                }}
                                transition={{
                                    duration: loading ? 2.8 : 7,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: 0.8,
                                }}
                            />

                            {/* Third subtle wave */}
                            <motion.div
                                className="absolute inset-3 rounded-[2rem] border border-white/[0.035]"
                                animate={{
                                    scale: [1.08, 1.14, 1.08],
                                    opacity: [0.05, 0.16, 0.05],
                                }}
                                transition={{
                                    duration: 8,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: 1.5,
                                }}
                            />
                        </div>

                        {/* ================================================== */}
                        {/* CHAT PANEL */}
                        {/* ================================================== */}

                        <motion.div
                            className="relative flex h-[500px] w-[calc(100vw-2rem)] max-w-[350px] flex-col overflow-hidden rounded-3xl border border-white/10 bg-black/95 text-white shadow-2xl backdrop-blur-xl"
                            animate={{
                                boxShadow: loading
                                    ? [
                                          "0 0 30px rgba(255,255,255,0.04)",
                                          "0 0 55px rgba(255,255,255,0.10)",
                                          "0 0 30px rgba(255,255,255,0.04)",
                                      ]
                                    : "0 0 30px rgba(255,255,255,0.04)",
                            }}
                            transition={{
                                duration: 2.2,
                                repeat: loading ? Infinity : 0,
                                ease: "easeInOut",
                            }}
                        >
                            {/* ================================================== */}
                            {/* HEADER */}
                            {/* ================================================== */}

                            <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.02] px-4 py-3">
                                <div className="flex items-center gap-3">
                                    {/* Bot Icon */}
                                    <div className="relative">
                                        <motion.div
                                            className="absolute inset-0 rounded-full bg-white/10 blur-md"
                                            animate={{
                                                scale: loading
                                                    ? [1, 1.4, 1]
                                                    : [1, 1.1, 1],
                                                opacity: loading
                                                    ? [0.3, 0.7, 0.3]
                                                    : [0.2, 0.35, 0.2],
                                            }}
                                            transition={{
                                                duration: loading ? 1.5 : 4,
                                                repeat: Infinity,
                                                ease: "easeInOut",
                                            }}
                                        />

                                        <div className="relative flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white">
                                            <Bot size={18} />
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-sm font-semibold">
                                            Jankristyan AI
                                        </h3>

                                        <div className="flex items-center gap-1.5">
                                            <motion.span
                                                className="h-1.5 w-1.5 rounded-full bg-white"
                                                animate={{
                                                    opacity: [0.3, 1, 0.3],
                                                }}
                                                transition={{
                                                    duration: 2,
                                                    repeat: Infinity,
                                                }}
                                            />

                                            <p className="text-xs text-neutral-500">
                                                Portfolio Assistant
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <motion.button
                                    onClick={() => setOpen(false)}
                                    whileHover={{
                                        scale: 1.08,
                                    }}
                                    whileTap={{
                                        scale: 0.92,
                                    }}
                                    className="rounded-lg p-2 text-neutral-400 transition-colors hover:bg-white/10 hover:text-white"
                                    aria-label="Close AI assistant"
                                >
                                    <X size={18} />
                                </motion.button>
                            </div>

                            {/* ================================================== */}
                            {/* MESSAGES */}
                            {/* ================================================== */}

                            <div className="flex-1 space-y-3 overflow-y-auto p-4">
                                {messages.map((message, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{
                                            opacity: 0,
                                            y: 8,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                        }}
                                        transition={{
                                            duration: 0.25,
                                        }}
                                        className={`flex ${
                                            message.role === "user"
                                                ? "justify-end"
                                                : "justify-start"
                                        }`}
                                    >
                                        <div
                                            className={`max-w-[80%] rounded-2xl border px-3 py-2 text-sm leading-relaxed ${
                                                message.role === "user"
                                                    ? "rounded-br-sm border-white/10 bg-white text-black"
                                                    : "rounded-bl-sm border-white/10 bg-white/[0.06] text-neutral-200"
                                            }`}
                                        >
                                            {message.content}
                                        </div>
                                    </motion.div>
                                ))}

                                {/* Thinking Indicator */}
                                <AnimatePresence>
                                    {loading && (
                                        <motion.div
                                            initial={{
                                                opacity: 0,
                                                y: 8,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                y: 0,
                                            }}
                                            exit={{
                                                opacity: 0,
                                                y: 5,
                                            }}
                                            className="flex justify-start"
                                        >
                                            <div className="flex items-center gap-2 rounded-2xl rounded-bl-sm border border-white/10 bg-white/[0.06] px-3 py-2 text-sm text-neutral-400">
                                                <Loader2
                                                    size={15}
                                                    className="animate-spin text-white"
                                                />

                                                <span>
                                                    Thinking...
                                                </span>

                                                <div className="flex gap-1">
                                                    {[0, 1, 2].map(
                                                        (dot) => (
                                                            <motion.span
                                                                key={dot}
                                                                className="h-1 w-1 rounded-full bg-white"
                                                                animate={{
                                                                    opacity: [
                                                                        0.2,
                                                                        1,
                                                                        0.2,
                                                                    ],
                                                                }}
                                                                transition={{
                                                                    duration: 1,
                                                                    repeat: Infinity,
                                                                    delay:
                                                                        dot *
                                                                        0.15,
                                                                }}
                                                            />
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* ================================================== */}
                            {/* INPUT */}
                            {/* ================================================== */}

                            <div className="border-t border-white/10 bg-white/[0.02] p-3">
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
                                        className="min-w-0 flex-1 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white outline-none placeholder:text-neutral-600 transition-all duration-300 focus:border-white/20 focus:bg-white/[0.06] focus:ring-2 focus:ring-white/10 disabled:cursor-not-allowed disabled:opacity-50"
                                    />

                                    <motion.button
                                        onClick={sendMessage}
                                        disabled={
                                            !input.trim() || loading
                                        }
                                        whileHover={
                                            input.trim() && !loading
                                                ? {
                                                      scale: 1.05,
                                                  }
                                                : undefined
                                        }
                                        whileTap={
                                            input.trim() && !loading
                                                ? {
                                                      scale: 0.95,
                                                  }
                                                : undefined
                                        }
                                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-black transition-all duration-300 hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-30"
                                        aria-label="Send message"
                                    >
                                        <Send size={16} />
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}