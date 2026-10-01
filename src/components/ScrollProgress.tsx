import { motion, useScroll, useSpring } from "motion/react"

export const ScrollProgress = () => {
    const { scrollYProgress } = useScroll()

    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    })

    return (
        <motion.div
            aria-hidden="true"
            className="
                fixed
                top-0
                left-0
                right-0
                z-[9999]
                h-1
                origin-left
                bg-gradient-to-r
                from-primary
                via-gray-500
                to-primary
            "
            style={{ scaleX }}
        />
    )
}