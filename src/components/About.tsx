import { motion } from "motion/react"

import { fadeUp, staggerContainer } from "@/lib/animations"

import { SectionHeader } from "@/components/SectionHeader"
import { Button } from "@/components/ui/button"

export const About = () => {
    return (
        <motion.section initial="hidden" whileInView="visible" viewport={{once:true, amount: 0.3}} variants={staggerContainer(0)} className="mt-30 scroll-mt-10" id="about">
            <SectionHeader subtitle="About" title="Versatile IT professional, dedicated to solving problems and delivering reliable solutions." />
            <motion.p variants={fadeUp} className="mt-4 text-neutral-300">
                Experienced in Software QA, Application Support, Data Analysis, and Front-End Development. 
                Passionate about delivering quality solutions.
            </motion.p>

            <motion.p variants={fadeUp} className="mt-2 text-neutral-300">
                In my 4 years of experience as IT professional, I have gained experience in Software QA, Application Support, 
                Data Analysis, and Front-End Development. I have experience in manual testing, UAT, application support for international clients, 
                and data analysis using SQL, Power BI, and Excel. Passionate about continuous learning, 
                I am currently expanding my skills in QA Automation, data analytics, and modern web technologies.
            </motion.p>

            <motion.div variants={fadeUp} transition={{delay: 0.3}}>
                <Button className="mt-5">
                    <a href="#contact">Contact Me</a></Button>
            </motion.div>
        </motion.section>
    )
} 
