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
          relative
          overflow-hidden
          rounded-3xl
          border
          border-neutral-800
          bg-neutral-900
          h-[300px]
          cursor-pointer
          "
          >
  {/* Background Image */} <img
      src={imgSrc}
      alt={`${title} project preview`}
      className="
        absolute
        inset-0
        h-full
        w-full
        object-cover
        transition-all
        duration-500
        group-hover:scale-110
        group-hover:blur-md
        group-hover:brightness-50
      "
    />


    {/* Category Badge */}
    <div
      className="
        absolute
        top-4
        left-4
        z-10
        rounded-full
        bg-black/60
        px-3
        py-1
        text-xs
        font-medium
        text-primary
        backdrop-blur-md
        
      "
    >
      {category}
    </div>

    {/* Content Overlay */}
    <div
      className="
        absolute
        inset-0
        z-20
        flex
        flex-col
        justify-end
        p-6
        opacity-0
        translate-y-6
        transition-all
        duration-500
        group-hover:opacity-100
        group-hover:translate-y-0
      "
    >
      <h3 className="text-xl font-bold text-white">
        {title}
      </h3>

      <p className="mt-2 text-sm text-neutral-200 line-clamp-3">
        {description}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md border border-white/20 bg-white/10 px-2 py-1 text-xs text-white backdrop-blur-sm"
          >
            {tag}
          </span>
        ))}
      </div>

      {projectLink && (
        <a
              href={projectLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${title} project`}
              className="mt-5 inline-flex w-fit items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-black transition-all hover:scale-105"
          >
              View Project
              <ArrowUpRight size={16} />
        </a>
)}
    </div>
  </motion.div>

  )
  }
