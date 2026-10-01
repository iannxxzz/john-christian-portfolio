import { motion } from "motion/react"

import { fadeUp, staggerContainer } from "@/lib/animations"

import { SectionHeader } from "@/components/SectionHeader"

import { Button } from "@/components/ui/button"

export const About = () => {
    return (
        <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer(0)}
            className="mt-30 scroll-mt-10"
            id="about"
        >
            <SectionHeader
                subtitle="About"
                title="Versatile IT professional focused on quality, problem-solving, and reliable solutions."
            />

            <motion.p
                variants={fadeUp}
                className="mt-4 text-neutral-300"
            >
                I am a Computer Science graduate and IT professional with
                experience in Software Quality Assurance, Application Support,
                Data Analysis, and Front-End Development. I focus on delivering
                reliable solutions through thorough testing, technical
                problem-solving, data-driven insights, and user-friendly
                interfaces.
            </motion.p>

            <motion.p
                variants={fadeUp}
                className="mt-2 text-neutral-300"
            >
                With over 3 years of professional IT experience, I have worked
                with manual testing, test case creation, User Acceptance
                Testing (UAT), application support, and data analysis using
                SQL, Power BI, and Excel. I am also expanding my skills in QA
                automation, data analytics, React, Tailwind CSS, and modern
                web development technologies.
            </motion.p>

            <motion.div
                variants={fadeUp}
                transition={{ delay: 0.3 }}
            >
                <Button className="mt-5">
                    <a href="#contact">Contact Me</a>
                </Button>
            </motion.div>
        </motion.section>
    )
}