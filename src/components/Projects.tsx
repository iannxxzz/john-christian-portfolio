import { motion } from "motion/react"
import { useMemo, useState } from "react"

import { projectsData } from "@/constants"

import { SectionHeader } from "@/components/SectionHeader"
import { ProjectCard } from "@/components/ProjectCard"


export const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("Featured")

    const filters = useMemo(() => {
        const categories = projectsData.map(
        (project) => project.category
        )

        return ["Featured", ...new Set(categories)]
    }, [])

    const filteredProjects =
        activeFilter === "Featured"
        ? projectsData.filter(
            (project) => project.featured
        )
        : projectsData.filter(
            (project) => project.category === activeFilter
        )

    return (
        <motion.section
        id="projects"
        className="mt-30 scroll-mt-10"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        >
        <SectionHeader
            subtitle="Projects"
            title="My Featured Projects"
        />
        
            {/* Filter Bar */}
            <div className="mt-10 flex justify-start">
                <div className="flex flex-wrap gap-2 rounded-2xl border border-neutral-800 bg-neutral-900/50 p-2 backdrop-blur-sm">
                    {filters.map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`
                                rounded-xl
                                px-3 py-1.5
                                text-xs
                                font-medium
                                transition-all
                                duration-300
                                whitespace-nowrap
                                ${
                                    activeFilter === filter
                                        ? "bg-primary text-black shadow-lg shadow-primary/20"
                                        : "border border-neutral-700 bg-neutral-900 text-neutral-400 hover:border-primary hover:text-primary"
                                }
                            `}
                        >
                            {filter}
                        </button>
                    ))}
                </div>
            </div>

        {/* Animated Grid */}
        <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35 }}
            className="mt-10 grid gap-8 md:grid-cols-2"
        >
            {filteredProjects.map((project) => (
            <ProjectCard
                key={`${project.title}-${project.category}`}
                {...project}
            />
            ))}
        </motion.div>
        </motion.section>
    )
}