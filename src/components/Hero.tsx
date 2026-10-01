import { motion } from "motion/react"
import { useState } from "react"

import { fadeUp, staggerContainer } from "@/lib/animations"

import { Button } from "@/components/ui/button"

import { ResumeModal } from "@/components/ResumeModal"

import { SparkleIcon, FileText } from "lucide-react"

export const Hero = () => {
    const [resumeOpen, setResumeOpen] = useState(false)

    return (
        <>
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={staggerContainer(0)}
                className="pt-20"
                id="hero"
            >
                <motion.p
                    variants={fadeUp}
                    className="flex w-32 items-center justify-center gap-2 rounded-sm border border-neutral-600 py-1"
                >
                    <SparkleIcon size={15} />
                    <span>Introduction</span>
                </motion.p>

                <motion.h1
                  variants={fadeUp}
                  className="mt-4 max-w-4xl text-2xl font-semibold capitalize leading-tight md:text-5xl md:leading-[1.15] lg:text-6xl lg:leading-[1.15]">
                  I'm <span>Christian!</span> {" "}
                  <span className="md:whitespace-nowrap">a Software QA Tester</span>, 
                  <br className="hidden md:block" /> System/Data Analyst, and Front-End Developer.
              </motion.h1>

                <motion.div
                    variants={fadeUp}
                    className="mt-5 flex gap-2"
                >
                    <Button asChild>
                        <a href="#projects">My Projects</a>
                    </Button>

                    <Button
                        variant="outline"
                        onClick={() => setResumeOpen(true)}
                        className="gap-2"
                    >
                        <FileText className="h-4 w-4" />
                        View Resume
                    </Button>
                </motion.div>
            </motion.section>

            <ResumeModal
                open={resumeOpen}
                onClose={() => setResumeOpen(false)}
            />
        </>
    )
}