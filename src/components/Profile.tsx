import { useEffect, useRef, useState } from "react"

import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "motion/react"

import { socialLinks } from "@/constants"

export const Profile = () => {
    const [isHovered, setIsHovered] = useState(false)
    const [isLocked, setIsLocked] = useState(false)

    const imageRef = useRef<HTMLDivElement>(null)

    // Reset the image when clicking outside of it
    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (
                imageRef.current &&
                !imageRef.current.contains(event.target as Node)
            ) {
                setIsLocked(false)
            }
        }

        document.addEventListener("mousedown", handleOutsideClick)

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick)
        }
    }, [])

    const handleImageClick = () => {
        setIsLocked(true)
    }

    return (
        <aside
            className="max-w-3xl m-6 border border-neutral-700 bg-neutral-900/80 backdrop-blur-sm text-white p-6 rounded-3xl lg:sticky lg:top-7 lg:w-96"
        >
            <div className="flex flex-col gap-6">

                {/* Header */}
                <div className="flex items-start justify-between gap-3">

                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                            John Christian
                        </h1>

                        <p className="mt-2 text-xs sm:text-sm text-neutral-400">
                            Developer • QA • Data Analyst
                        </p>
                    </div>

                    <motion.div
                        initial={{
                            opacity: 0,
                            scale: 0.9,
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                        }}
                        transition={{
                            duration: 0.4,
                        }}
                        className="self-start flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1.5 text-xs font-medium text-green-400 whitespace-nowrap"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />

                            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
                        </span>

                        Available
                    </motion.div>

                </div>

                {/* Interactive Profile Image */}
                <motion.div
                    ref={imageRef}
                    className="relative overflow-hidden rounded-3xl border border-neutral-800 aspect-[4/5] cursor-pointer"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onClick={handleImageClick}
                    animate={{
                        boxShadow:
                            isHovered || isLocked
                                ? "0 0 35px rgba(255,255,255,0.12)"
                                : "0 0 0px rgba(255,255,255,0)",
                    }}
                    transition={{
                        duration: 0.3,
                        ease: "easeOut",
                    }}
                >

                    {/* Normal / Hover Images */}
                    <AnimatePresence mode="sync">

                        {!isHovered ? (
                            <motion.img
                                key="normal"
                                src="/profile-1.jpg"
                                alt="John Christian"
                                className="absolute inset-0 w-full h-full object-cover"
                                animate={{
                                    opacity: 1,
                                    scale: isLocked ? 1.03 : 1,
                                    filter: isLocked
                                        ? "blur(8px)"
                                        : "blur(0px)",
                                }}
                                exit={{
                                    opacity: 0,
                                    scale: 1.03,
                                }}
                                transition={{
                                    duration: 0.3,
                                    ease: "easeOut",
                                }}
                            />
                        ) : (
                            <motion.img
                                key="hover"
                                src="/profile-2.jpg"
                                alt="John Christian wearing sunglasses"
                                className="absolute inset-0 w-full h-full object-cover"
                                animate={{
                                    opacity: 1,
                                    scale: isLocked ? 1.03 : 1,
                                    filter: isLocked
                                        ? "blur(8px)"
                                        : "blur(0px)",
                                }}
                                initial={{
                                    opacity: 0,
                                    scale: 0.97,
                                }}
                                exit={{
                                    opacity: 0,
                                    scale: 1.03,
                                }}
                                transition={{
                                    duration: 0.3,
                                    ease: "easeOut",
                                }}
                            />
                        )}

                    </AnimatePresence>

                    {/* Locked / Contact Overlay */}
                    <AnimatePresence>
                        {isLocked && (
                            <motion.div
                                initial={{
                                    opacity: 0,
                                }}
                                animate={{
                                    opacity: 1,
                                }}
                                exit={{
                                    opacity: 0,
                                }}
                                transition={{
                                    duration: 0.35,
                                }}
                                className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md"
                            >

                                <motion.a
                                    href="#contact"
                                    initial={{
                                        opacity: 0,
                                        y: 15,
                                        scale: 0.95,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                        scale: 1,
                                    }}
                                    exit={{
                                        opacity: 0,
                                        y: 15,
                                        scale: 0.95,
                                    }}
                                    transition={{
                                        duration: 0.35,
                                        delay: 0.1,
                                    }}
                                    onClick={(event) => {
                                        event.stopPropagation()
                                    }}
                                    className="group flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-black/60 px-6 py-4 text-center backdrop-blur-lg transition-all duration-300 hover:bg-black/80"
                                >

                                    <span className="text-sm font-medium text-white">
                                        Contact Me to See
                                    </span>

                                    <span className="text-lg font-bold text-white">
                                        More of Me
                                    </span>

                                    <span className="mt-1 text-xs text-neutral-400 transition-colors group-hover:text-white">
                                        Let's connect →
                                    </span>

                                </motion.a>

                            </motion.div>
                        )}
                    </AnimatePresence>

                </motion.div>

                {/* Quick Info */}
                <div className="space-y-3 rounded-2xl border border-neutral-800 bg-neutral-950/50 p-4">

                    <div className="flex items-center gap-3">

                        <span className="text-lg">
                            📍
                        </span>

                        <div>
                            <p className="text-xs text-neutral-500">
                                Location
                            </p>

                            <p className="text-sm font-medium">
                                Cebu, Philippines
                            </p>
                        </div>

                    </div>

                    <div className="flex items-center gap-3">

                        <span className="text-lg">
                            🟢
                        </span>

                        <div>
                            <p className="text-xs text-neutral-500">
                                Status
                            </p>

                            <p className="text-sm font-medium text-green-400">
                                Available for Work
                            </p>
                        </div>

                    </div>

                    <div className="flex items-center gap-3">

                        <span className="text-lg">
                            ⚡
                        </span>

                        <div>
                            <p className="text-xs text-neutral-500">
                                Response Time
                            </p>

                            <p className="text-sm font-medium">
                                Usually within 24 hours
                            </p>
                        </div>

                    </div>

                </div>

                {/* Social Links */}
                <div className="flex gap-3">

                    {socialLinks.map((social, i) => {
                        const Icon = social.icon

                        return (
                            <a
                                key={i}
                                href={social.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group rounded-2xl border border-neutral-700 p-3 transition-all duration-300 hover:border-primary hover:bg-primary/10"
                            >
                                <Icon className="size-5 text-neutral-400 transition-colors group-hover:text-primary" />
                            </a>
                        )
                    })}

                </div>

                {/* CTA */}
                <Button
                    asChild
                    size="lg"
                    className="rounded-2xl"
                >
                    <a href="#contact">
                        Let's Work Together!
                    </a>
                </Button>

            </div>
        </aside>
    )
}