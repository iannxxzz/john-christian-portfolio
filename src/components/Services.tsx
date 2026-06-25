import { motion } from "motion/react"

import { fadeUp, staggerContainer } from "@/lib/animations"
import { services } from "@/constants"

import { SectionHeader } from "@/components/SectionHeader"
import { ServicesCard } from "@//components/ServicesCard"

export const Services = () => {
    return (
        <motion.section initial="hidden" 
                        whileInView="visible" 
                        viewport={{once:true, amount: 0.3}} 
                        variants={staggerContainer(0)} 
                        className="mt-30 scroll-mt-10" 
                        id="services">
            <SectionHeader subtitle="Services" title="Build, test, and deliver with confidence." />
            <motion.div initial="hidden" whileInView="visible" viewport={{once: true, amount: 0.3}} variants={staggerContainer(0.5)}
                        className="grid md:grid-cols-2 gap-10 mt-10">
                            {services.map((services) => (
                                <motion.div key={services.title} variants={fadeUp}>
                                    <ServicesCard service={services} />
                                </motion.div>
                            ))}
            </motion.div>

        </motion.section>
    )
} 
