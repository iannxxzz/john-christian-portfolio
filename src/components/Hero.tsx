import { motion } from "motion/react"
import { useState } from "react"
import { fadeUp, staggerContainer } from "@/lib/animations"
import { Button } from "@/components/ui/button"
import { SparkleIcon, FileText } from "lucide-react"
import { ResumeModal } from "@/components/ResumeModal"



export const Hero = () => {

    const [resumeOpen, setResumeOpen] = useState(false)
    return (
        <motion.section initial='hidden' whileInView='visible' viewport={{once: true, amount: 0.3}} variants={staggerContainer(0)} className="pt-20" id="hero">
            <motion.p variants={fadeUp} className="flex items-center justify-center py-1 gap-2 border border-neutral-600 rounded-sm w-32">
                <SparkleIcon size={15} /> <span>Introduction</span>
            </motion.p>
            <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl lg:text-6xl font-semibold capitalize mt-2 max-w-3xl md:leading-16">
                I'm <span className="">Christian</span> a Software QA Tester, Data Analyst and a Developer
            </motion.h1>
            <motion.div variants={fadeUp} className="mt-5 flex gap-2">
                <Button asChild>
                    <a href="#projects">My Projects</a>
                </Button>

                <Button variant="outline" onClick={() => setResumeOpen(true)} className="gap-2">
                    <FileText className="h-4 w-4" />
                    View Resume
                    
                </Button>
            </motion.div>
            <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} />

        </motion.section>
    )
}