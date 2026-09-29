import { Button } from "@/components/ui/button"
import { motion } from "motion/react"

import { socialLinks } from "@/constants"


export const Profile = () => {
return ( <aside
        className="max-w-3xl m-6 border border-neutral-700 bg-neutral-900/80 backdrop-blur-sm text-white p-6 rounded-3xl lg:sticky lg:top-7 lg:w-96">
            <div className="flex flex-col gap-6">

                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                        John Christian
                        </h1>
                        <p className="mt-2 text-[5px] sm:text-sm text-neutral-400">
                        Developer • QA • Data Analyst
                        </p>
                    </div>

                    <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4 }}
                            className="self-start flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1.5 text-xs font-medium text-green-400 whitespace-nowrap">
                            <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
                            </span>
                        Available
                    </motion.div>
                    
                  

                </div>

                {/* Image */}
                <div className="overflow-hidden rounded-3xl border border-neutral-800">
                <img
                    src="/avatar-1.jpg"
                    alt="John Christian"
                    className="w-full aspect-[4/5] object-cover"
                />
                </div>

                {/* Quick Info */}
                <div className="space-y-3 rounded-2xl border border-neutral-800 bg-neutral-950/50 p-4">

                <div className="flex items-center gap-3">
                    <span className="text-lg">📍</span>

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
                    <span className="text-lg">🟢</span>

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
                    <span className="text-lg">⚡</span>

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
                        className="group rounded-2xl border border-neutral-700 p-3 transition-all duration-300 hover:border-primary hover:bg-primary/10">
                        <Icon className="size-5 text-neutral-400 transition-colors group-hover:text-primary" />
                    </a>
                    )
                })}
                </div>
                    <Button asChild size="lg" className="rounded-2xl">
                    <a href="#contact">
                        Let's Work Together!
                    </a>
                    </Button>

            </div>
    </aside>


)
}
