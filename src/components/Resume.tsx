import { motion } from "motion/react"

import { fadeUp, staggerContainer } from "@/lib/animations"
import { education, experience, tools } from "@/constants"

import { SectionHeader } from "@/components/SectionHeader"
import { ExpCard } from "@/components/ExpCard"
import { ToolCard } from "@/components/ToolCard"


export const Resume = () => {
    return (
        <motion.section initial="hidden" 
                        whileInView="visible" 
                        viewport={{once:true, amount: 0.3}} 
                        variants={staggerContainer(0)} 
                        className="mt-30 scroll-mt-10" 
                        id="resume">
            <SectionHeader subtitle="Resume" title="Education and Professional Experience" />
            <motion.p variants={fadeUp} className="mt-4 text-neutral-300">
                With a Bachelor’s Degree in Computer Science and hands-on experience in Software QA, Data Analysis, 
                and Application Support, I have developed strong technical and problem-solving skills across different IT domains. 
                I have worked with international clients, providing effective solutions to ensure system reliability, data accuracy, 
                and quality software delivery. 
                I am committed to continuous learning and delivering efficient, high-quality results in every project I handle. 
            </motion.p>
            <div className="grid gap-x-10 my-16 md:grid-cols-2">
                <motion.div variants={fadeUp} className="mb-16 md:mb-0">
                    <h2 className="text-3xl font-semibold mb-8">Education</h2>
                    <div className="space-y-8 border-l border-neutral-800 pl-6">
                        {education.map((item, i) => (
                            <ExpCard key={i} item={item} />
                        ))}
                    </div>
                </motion.div>

                <motion.div variants={fadeUp}>
                    <h2 className="text-3xl font-semibold mb-8">Work Experience</h2>
                    <div className="space-y-8 border-l pl-6">
                        {experience.map((item, i) => (
                            <ExpCard key={i} item={item} />
                        ))}
                    </div>
                </motion.div>
            </div>

            <div className="my-16">
                <motion.h2 variants={fadeUp} className="text-3xl font-semibold mb-5 capitalize">
                    Top Tools
                </motion.h2>
                <motion.div initial="hidden"
                            whileInView="visible"
                            viewport={{once: true, amount: 0.3}}
                            variants={staggerContainer(0.5)}
                            className=" grid grid-cols-3 gap-5 sm:grid-cols-4 md:grid-cols-5">
                        {tools.map((tool, i) => (
                            <ToolCard key={i} tool={tool} />
                        ))}
                </motion.div>
            </div>

        </motion.section>
    )
} 
