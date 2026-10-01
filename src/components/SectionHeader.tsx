import { motion } from "motion/react"
import { fadeUp } from "@/lib/animations"
import { SparkleIcon } from "lucide-react"
    export const SectionHeader = ({
        title,
        subtitle,
    }: {
        title: string
        subtitle: string
    }) => {
        return (
            <>
                <motion.p
                    variants={fadeUp}
                    className="flex w-32 items-center justify-center gap-2 rounded-sm border border-neutral-600 py-1"
                >
                    <SparkleIcon size={15} />
                    {subtitle}
                </motion.p>

                <motion.h2
                    variants={fadeUp}
                    className="mt-5 text-4xl font-bold capitalize md:max-w-3xl"
                >
                    {title}
                </motion.h2>
            </>
        )
    }