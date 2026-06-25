import { motion } from "motion/react"
import { ArrowUpRight } from "lucide-react"

import type { ProjectType } from "@/types"

export const ProjectCard = ({
imgSrc,
projectLink,
tags,
title,
category,
description,
}: ProjectType) => {
return (
<motion.div
initial={{ opacity: 0, y: 15 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.35 }}
className="
group
h-[450px]
overflow-hidden
rounded-3xl
border
border-neutral-800
bg-neutral-900
flex
flex-col
transition-all
duration-300
hover:-translate-y-2
hover:border-primary/50
hover:shadow-xl
hover:shadow-primary/10
"
>
{/* Image Section */} <div className="h-[55%] overflow-hidden"> <img
       src={imgSrc}
       alt={title}
       className="
         h-full
         w-full
         object-cover
         transition-transform
         duration-700
         group-hover:scale-105
       "
     /> </div>

  {/* Content Section */}
  <div className="h-[45%] p-5 flex flex-col">
    <span className="w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
      {category}
    </span>

    <h3 className="mt-3 text-lg font-bold text-white">
      {title}
    </h3>

    <p className="mt-2 text-sm text-neutral-400 line-clamp-3">
      {description}
    </p>

    <div className="mt-4 mb-4 flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className="
            rounded-md
            border
            border-neutral-700
            px-2
            py-1
            text-xs
            text-neutral-300
            transition-colors
            hover:border-primary
            hover:text-primary
          "
        >
          {tag}
        </span>
      ))}
    </div>

    <a
      href={projectLink}
      target="_blank"
      rel="noopener noreferrer"
      className="
        mt-auto
        inline-flex
        w-fit
        items-center
        gap-2
        rounded-xl
        bg-primary
        px-4
        py-2
        text-sm
        font-semibold
        text-black
        transition-all
        duration-300
        hover:scale-105
        hover:shadow-lg
        hover:shadow-primary/30
      "
    >
      View Project
      <ArrowUpRight size={16} />
    </a>
  </div>
</motion.div>


)
}
