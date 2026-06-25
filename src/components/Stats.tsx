import { motion } from "motion/react"
import { useEffect, useState } from "react"

import { fadeUp, staggerContainer } from "@/lib/animations"
import { statsData } from "@/constants"

const Counter = ({
    value,
    shouldStart,
    }: {
    value: number
    shouldStart: boolean
    }) => {
    const [count, setCount] = useState(0)

        useEffect(() => {
                if (!shouldStart) return

                let start = 0
                const duration = 1500
                const steps = 30
                const increment = value / steps

                const timer = setInterval(() => {
                start += increment

                if (start >= value) {
                    setCount(value)
                    clearInterval(timer)
                } else {
                    setCount(Math.floor(start))
                }
                }, duration / steps)

                return () => clearInterval(timer)
            }, [shouldStart, value])

            return <>{count}</>
    }

    export const Stats = () => {
    const [startAnimation, setStartAnimation] = useState(false)

    return (
        <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        onViewportEnter={() => setStartAnimation(true)}
        variants={staggerContainer(0.2)}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-20"
        >
        {statsData.map((stats, i) => {
            const number = Number(stats.number.replace(/\D/g, ""))
            const suffix = stats.number.replace(/[0-9]/g, "")

            return (
            <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                className="relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/40 p-8 text-center backdrop-blur-sm transition-all duration-300 hover:border-primary/50">
                {/* glow effect */}
                <div className="absolute inset-0 bg-primary/5 opacity-0 transition-opacity duration-300 hover:opacity-100" />

                <p className="relative text-5xl font-semibold text-primary lining-nums">
                <Counter value={number} shouldStart={startAnimation} />
                {suffix}
                </p>

                <p className="relative mt-2 text-neutral-300">
                {stats.label}
                </p>
            </motion.div>
            )
        })}
        </motion.section>
    )
    }